require("dotenv").config()

const express = require("express")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const compression = require("compression")

const app = express()
const port = process.env.PORT || 3000
const uri = process.env.DATABASE_URI
const secret = process.env.SECRET

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connection made"))
  .catch(err => console.error(err))

app.engine(
  ".hbs",
  exphbs({
    helpers: require("./helpers/handlebars.js"),
    extname: ".hbs",
  })
)
app.set("view engine", ".hbs")
app.use(compression())
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

const router = require("./router/index.js")
app.use("/", router)

const User = require("./models/user.js")
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.listen(port, () => console.log(`Listening on localhost:${port}`))
