const User = require("../models/user.js")

const controller = {
    home: (req, res) => {
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
    },

    offline: (req, res) => {
        res.render("offline")
    },

    register: (req, res) => {
        res.render("register")
    },

    login: (req, res) => {
        res.render("login")
    },

    logout: async (req, res) => {
        req.logout()
        req.session.destroy()
        res.redirect("/")
    }
}

module.exports = controller