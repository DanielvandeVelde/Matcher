const express = require('express')
const app = express()
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const MongoClient = require('mongodb').MongoClient
const { Liquid } = require('liquidjs')
const engine = new Liquid({
  root: ['views/layouts', 'views/pages/'],
  extname: '.liquid'})
const bodyParser = require('body-parser')
const multer = require('multer')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sessionID = 'sessionID'
let users_db = null

require('dotenv').config()
const url = process.env.DB_URL
const port = process.env.PORT || 3000
const mongoSession = new MongoDBSession({
  uri: url,
  collection: process.env.C_NAME })

const upload = multer({ // verzorgt het storen van de geuploade afbeeldingen in de aangegeven folder
  storage: multer.diskStorage({
    destination: (req, file, data) => {
      data(null, 'public/uploads')
    },
    filename: (req, file, data) => {
      data(null, Date.now() + '.jpg') // verander filename
    }})})

MongoClient.connect(url, (err, client) => {
  if (err) { console.log('MongoDB-client connect error:' + err) }
  else { users_db = client.db(process.env.DB_NAME).collection('users')}})

mongoSession.on('error', (err) => { console.log('MongoDB-session error:' + err) })  // error'afhandeling' mongodb

app
  .engine('liquid', engine.express()) // register liquid engine
  .set('views', './pages') // specify the views directory
  .set('view engine', 'liquid') // set liquid to default
  .set('views', './views')
  .use(express.static('public'))
  .use(session({
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
  .get('/', (req, res) => { return renderHome(req, res) })   // wanneer je op de url /${url}} zit, voer dan deze functie uit of render dan deze pagina
  .get('/login', (req, res) => { redirectUrl(req, res, 'login') })
  .post('/logout', (req, res) => { redirectUrl(req, res, 'logout') })
  .get('/profile', (req, res) => { redirectUrl(req, res, 'profile') })
  .get('/remove', urlencodedParser, (req, res) => { res.render('pages/remove')})
  .post('/login', urlencodedParser, (req, res) => { loginProfile(req, res) }) // wanneer er iets wordt gepost op deze url, voer dan deze functie uit
  .post('/signup', urlencodedParser, (req, res) => { registerProfile(req, res) })
  .post('/profile', upload.single('editImage'), urlencodedParser, (req, res) => { editProfile(req, res) })
  .post('/remove', urlencodedParser, (req, res) => { removeProfile(req, res) })
  .listen(port, () => { console.log(`Running on port ${port}`) }) // specificeer poort

function renderHome(req, res) { // render homepage
  if (!req.session.sessionID) {
    res.redirect('/login')
  } else {
    res.render('pages/home', {
      title: 'Homepage'
    })

    // res.render('pages/home', {
    //   title: 'Homepage',
    //   matches: userData.matches
    // })
  }
}

function redirectUrl(req, res, action) { // check session, then redirect based on y/n logged in
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
      } else if (session == 'true' && action == 'profile') {
        renderProfile(req, res)
      } else {
        res.redirect('/login')
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function checkSession(req, res) { // check for active session
  return new Promise((resolve, reject) => {
    if (req.session.sessionID) {
      resolve('true')
    } else {
      resolve('false')
    }
  })
}

function renderProfile(req, res) { // find user in db and render profile page with data
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

function logOut(req, res) { //  remove session and clear sessionID
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/profile')
    }

    res.clearCookie(sessionID)
    res.redirect('/login')
  })
}

function loginProfile(req, res) { // check if email+username exist in db, login
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

function registerProfile(req, res) { // check if the username is already taken, then insert new profile into db
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

function editProfile(req, res) { // look up profile in MongoDB-db by _id and update entry
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

function removeProfile(req, res) { // look up profile in MongoDB-db by id and delete entry
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