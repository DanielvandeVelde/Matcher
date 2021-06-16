const User = require("../models/user.js")

const controller = {
    likeUser: (req, res) => {
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
    },
      
    showMatches: (req, res) => {
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
}

module.exports = controller