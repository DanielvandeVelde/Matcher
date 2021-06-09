const mongoose = require("mongoose")
const passport = require("passport")
const User = require("../models/user.js")
const userController = {}

userController.home = (req, res) => {
  if (!req.user) {
    return res.render("home")
  }

  const request = {
    loc: {
      $near: {
        $maxDistance: 250000, //250km
        $geometry: {
          type: "Point",
          coordinates: req.user.loc.coordinates,
        },
      },
    },
    username: { $ne: req.user.username },
    looking: { $in: [req.user.gender, "No preference"] },
  }

  //If no preference, gender query is not needed
  if (req.user.looking !== "No preference") {
    request["gender"] = req.user.looking
  }

  User.find(request).exec((err, data) => {
    const content = [req.user].concat(data)
    return res.render("overview", { user: req.user, content: content })
  })
}

userController.offline = (req, res) => {
  res.render("offline")
}

userController.register = (req, res) => {
  res.render("register")
}

userController.doRegister = (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      looking: req.body.looking,
      loc: {
        type: "Point",
        coordinates: [Number(req.body.lng), Number(req.body.lat)],
      },
      likes: [],
    }),
    req.body.password,
    err => {
      if (err) {
        console.log(err)
        return res.render("register", { err: err })
      }

      passport.authenticate("local")(req, res, () => {
        res.redirect("/")
      })
    }
  )
}

userController.login = (req, res) => {
  res.render("login")
}

userController.doLogin = (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (!user && info) { res.send(info.message) }
    req.logIn(user, function(err) {
      if(user) {
        //session needs to be set manually in a custom callback -http://www.passportjs.org/docs/authenticate/
        req.session.user = user
        res.send("logged in")
      }
    });
  })(req, res, next);
};


userController.logout = async (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect("/")
}

userController.profile = (req, res) => {
  User.findOne({ username: req.params.username }, (err, profile) => {
    if (err) {
      return res.redirect("/")
    }

    const data = {
      profile: profile,
      user: req.user,
    }

    if (req.user) {
      data["owner"] = req.params.username === req.user.username
      data["likes"] = req.user.likes.filter(
        like => like === req.params.username
      )
      data["liked"] = profile.likes.filter(like => like === req.user.username)
    }

    return res.render("profile", data)
  })
}

userController.editProfile = (req, res) => {
  let userProfile = false
  let lng
  let lat

  if (req.user) {
    userProfile = req.params.username === req.user.username
    lng = req.user.loc.coordinates[0]
    lat = req.user.loc.coordinates[1]
  }

  if (userProfile) {
    return res.render("edit", {
      user: req.user,
      lng: lng,
      lat: lat,
    })
  } else {
    res.redirect("/profile/" + req.params.username)
  }
}

userController.updateProfile = (req, res) => {
  if (req.user) {
    const update = {
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      looking: req.body.looking,
      loc: {
        type: "Point",
        coordinates: [Number(req.body.lng), Number(req.body.lat)],
      },
    }
    const filter = { username: req.user.username }
    User.findOneAndUpdate(filter, update, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        return res.redirect("/profile/" + req.user.username)
      }
    })
  } else {
    return res.redirect("/")
  }
}

userController.likeUser = (req, res) => {
  const update = {}

  if (req.body.feeling === "love") {
    update["$push"] = { likes: [req.body.username] }
  } else if (req.body.feeling === "hate") {
    update["$pull"] = { likes: req.body.username }
  }

  const filter = { username: req.user.username }
  User.findOneAndUpdate(filter, update, (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      return res.redirect("/profile/" + req.body.username)
    }
  })
}

userController.showMatches = (req, res) => {
  if (req.user) {
    User.find({ likes: req.user.username }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        const content = [req.user].concat(result)
        return res.render("matches", { user: req.user, content: content })
      }
    })
  } else {
    return res.redirect("/")
  }
}

module.exports = userController
