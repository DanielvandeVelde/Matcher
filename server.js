const express = require('express')
const app = express()
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const MongoClient = require('mongodb').MongoClient
var {
  Liquid
} = require('liquidjs')
var engine = new Liquid({
  root: ['views/layouts', 'views/pages/'],
  extname: '.liquid'
})

// register liquid engine
app.engine('liquid', engine.express())
app.set('views', './pages') // specify the views directory
app.set('view engine', 'liquid') // set liquid to default


const bodyParser = require('body-parser')
const multer = require('multer')
const urlencodedParser = bodyParser.urlencoded({
  extended: false
})

require('dotenv').config()

const sessionID = 'sessionID'
const url = process.env.DB_URL
const port = process.env.PORT || 3000
let users_db = null
const mongoSession = new MongoDBSession({
  uri: url,
  collection: process.env.C_NAME
})

mongoSession.on('error', (err) => {
  console.log('MongoDB-session error:' + err)
})

const upload = multer({ // verzorgt het storen van de geuploade afbeeldingen in de aangegeven folder
  storage: multer.diskStorage({
    destination: (req, file, data) => {
      data(null, 'public/uploads')
    },
    filename: (req, file, data) => {
      data(null, Date.now() + '.jpg') // verander filename
    }
  })
})

app.set('views', './views')
app.use(express.static('public'))
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
app.use(session({
  name: sessionID,
  secret: process.env.SESSION_SECRET,
  store: mongoSession,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: false
  }
}))

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('MongoDB-client connect error:' + err)
  } else {
    users_db = client.db(process.env.DB_NAME).collection('users')
  }
})

// REDIRECTION FUNCTIONALITY BASED ON SESSION (whether the user is logged in)
const userRedirect = (req, res, next, toUrl) => { // mss een try/catch gebruiken?
  if (!req.session.sessionID && toUrl == 'login') {
    res.redirect('/{toUrl}') // als er geen actieve sessionID is en de user op /login zit, redirect dan naar /login
  } else if (req.session.sessionID && toUrl == 'profile') {
    res.redirect('/{toUrl}') // als er een actieve sessionID is en de user dus is ingelogd, redirect dan naar /profile
  } else {
    next() // voer functie uit die hierna staat aangegeven
  }
}

// app.get('/', (req, res) => { // tried refactoring all of this into seperate functions but that didn't work due to the passing of the request/response object
//   console.log('render home')
//   renderHome(req, res)
// })

function checkSession(req, res) {
  return new Promise((resolve, reject) => {
    if (req.session.sessionID) {
      resolve('true')
    } else {
      resolve('false')
    }
  })
}

function redirectUrl(req, res, action) {
  try {
    checkSession(req, res).then(session => {
      if (session == 'true' && action == 'login') {
        res.redirect('/profile')
      } else if (action == 'login') {
        res.render('pages/login', {
          title: 'Login page'
        })
      } else if (session == 'true' && action == 'logout') {
        logOut(req, res)
      } else if (action == 'logout') {
        res.redirect('/login')
      } else if (session == 'true' && action == 'profile') {
        renderProfile(req, res)
      } else if (action == 'profile') {
        res.redirect('/login')
      }
    })
  } catch (err) {
    console.error(err)
  }
}

app
.get('/', (req, res) => {
  return renderHome(req, res)
})
.get('/login', (req, res) => {
  redirectUrl(req, res, 'login')
})
.post('/logout', (req, res) => {
  redirectUrl(req, res, 'logout')
})
.get('/profile', (req, res) => {
  redirectUrl(req, res, 'profile')
})
.get('/remove', urlencodedParser, (req, res) => { // wanneer je op de url /remove zit, render dan de remove-functie
  renderRemove(req, res)
})
.post('/login', urlencodedParser, (req, res) => {
  loginProfile(req, res)
})
.post('/signup', urlencodedParser, (req, res) => {
  registerProfile(req, res)
})
.post('/profile', upload.single('editImage'), urlencodedParser, (req, res) => {
  editProfile(req, res)
})
.post('/remove', urlencodedParser, (req, res) => {
  removeProfile(req, res)
})


function renderHome(req, res) {
  if (!req.session.sessionID) {
    res.redirect('/login')
  } else {
    res.redirect('/profile')
  }
}

function renderRemove(req, res) { // wanneer je op de url /remove zit, render dan de remove-functie
  res.render('pages/remove')
}

function loginProfile(req, res) {
  if (req.body.emailLogin && req.body.passwordLogin) {
    users_db.findOne({
      email: req.body.emailLogin.toLowerCase()
    }, (err, user) => {
      if (err) {
        console.log('MongoDB loginprofile findoneError:' + err)
      }
      if (user && user.password === req.body.passwordLogin) {
        req.session.sessionID = user._id
        res.redirect('/profile')
      } else {
        res.render('pages/login', {
          data: req.body
        })
      }
    })
  } else {
    res.render('pages/login', {
      data: req.body
    })
  }
}

function registerProfile(req, res) {
  users_db.findOne({
    username: req.body.userSignup
  }, (err, user) => {
    if (err) {
      console.log('registerprofileerror')

      console.log('MongoDB registerprofile findone Error:' + err)
    }
    if (user) {
      console.log('rp-user render login partial')

      res.render('pages/login', {
        data: req.body
      })
    } else {
      const user = {
        username: req.body.userSignup,
        email: req.body.emailSignup.toLowerCase(),
        password: req.body.passwordSignup,
        description: '',
        age: '',
        location: '',
        avatar: ''
      }

      console.log(user)
      users_db.insert([user], (err) => {
        if (err) {
          console.log('MongoDB registerprofie insertone Error:' + err)
        } else {
          res.render('pages/signup-completed', {
            data: req.body
          })
        }
      })
    }
  })
}

function renderProfile(req, res) {
  users_db.findOne({
    _id: req.session.sessionID
  }, (err, user) => {
    if (err) {
      console.log('MongoDB renderprofile Error:' + err)
    }
    if (user) {
      res.render('pages/profile', {
        'userInfo': user,
        title: 'Profile'
      })
    } else {
      console.log('Client ID not found')
    }
  })
}

function editProfile(req, res) {
  users_db.findOne({
    _id: req.session.sessionID
  }, (err, user) => {
    if (err) {
      console.log('MongoDB editprofile findone Error:' + err)
    }
    if (req.body.editUser != user.username) {
      users_db.findOne({
        username: req.body.editUser
      }, (err, username) => {
        if (err) {
          console.log('MongoDB editprofile Error:' + err)
        }
        if (username) {
          res.render('pages/profile', {
            'userInfo': user,
            data: req.body
          })
        } else if (req.file) {
          const img = 'uploads/' + req.file.path.split('/').pop()
          users_db.updateMany({
            _id: req.session.sessionID
          }, {
            $set: {
              'username': req.body.editUser,
              'age': req.body.editAge,
              'location': req.body.editLocation,
              'description': req.body.editDescription,
              'avatar': img
            }
          })
          res.redirect('/login')
        } else {
          users_db.updateMany({
            _id: req.session.sessionID
          }, {
            $set: {
              'username': req.body.editUser,
              'age': req.body.editAge,
              'location': req.body.editLocation,
              'description': req.body.editDescription
            }
          })
          res.redirect('/login')
        }
      })
    } else if (req.file) {
      const img = 'uploads/' + req.file.path.split('/').pop() // takes only the relative path out of the array
      users_db.updateMany({
        _id: req.session.sessionID
      }, {
        $set: {
          'age': req.body.editAge,
          'location': req.body.editLocation,
          'description': req.body.editDescription,
          'avatar': img
        }
      })
      res.redirect('/login')
    } else {
      users_db.updateMany({
        _id: req.session.sessionID
      }, {
        $set: {
          'age': req.body.editAge,
          'location': req.body.editLocation,
          'description': req.body.editDescription
        }
      })
      res.redirect('/login')
    }

  })
}

function removeProfile(req, res) { // look up profile in MongoDB-db by id
  users_db.findOne({
    _id: req.session.sessionID
  }, (err, user) => {
    if (err) {
      console.log('MongoDB removeprofile Error:' + err)
    }
    if (user) {
      if (req.body.removePassword == user.password) {
        users_db.deleteOne({
          '_id': req.session.sessionID
        })
        req.session.destroy((err) => {
          if (err) {
            console.log('Err deleting user:' + err)
          }

          res.clearCookie(sessionID)
          res.redirect('/login')
        })
      } else {
        res.render('pages/remove', {
          data: 'Password incorrect.'
        })
      }

    } else {
      res.redirect('/')
    }
  })
}

function logOut(req, res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/profile')
    }

    res.clearCookie(sessionID)
    res.redirect('/login')
  })
}