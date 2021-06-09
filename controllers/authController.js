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
          console.log(err)
          return res.render("register", { err: err })
        }
  
        passport.authenticate("local")(req, res, () => {
          res.redirect("/")
        })
      }
    )
  },
  
  doLogin: (req, res) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/")
    })
  }
}

module.exports = controller
