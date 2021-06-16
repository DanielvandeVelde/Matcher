const User = require("../models/user.js")

const controller = {
    profile: (req, res) => {
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
    },
      
    editProfile: (req, res) => {
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
    },
      
    updateProfile: (req, res) => {
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
}

module.exports = controller