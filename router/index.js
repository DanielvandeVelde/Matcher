const express = require("express")
const router = express.Router()
const auth = require("../controllers/authController.js")
const route = require("../controllers/routeController.js")
const user = require("../controllers/profileController.js")
const matcher = require("../controllers/matchController.js")

// plain routes
router.get("/", route.home)
router.get("/offline", route.offline)
router.get("/register", route.register)
router.get("/login", route.login)
router.get("/logout", route.logout)

// authentication
router.post("/register", auth.doRegister)
router.post("/login", auth.doLogin)

// dynamic profiles
router.get("/profile/:username", user.profile)
router.get("/edit/:username", user.editProfile)
router.post("/edit", user.updateProfile)

// matching
router.post("/likes", matcher.likeUser)
router.get("/matches", matcher.showMatches)

module.exports = router
