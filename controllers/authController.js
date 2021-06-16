const mongoose = require("mongoose")
const passport = require("passport")
const User = require("../models/user.js")

const controller = {
  doRegister: (req, res) => {
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
          res.send(err.message)
        }
  
        controller.doLogin(req, res);
      }
    )
  },
  
  doLogin: (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (!user && info) { res.send(info.message) }
      req.logIn(user, function(err) {
        if(user) {
          //session needs to be set manually in a custom callback -http://www.passportjs.org/docs/authenticate/
          req.session.user = user
          res.send("logged in")
        }
      })
    })(req, res, next);
  }
}

module.exports = controller
