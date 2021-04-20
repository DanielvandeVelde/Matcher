require('dotenv').config();

const express = require("express");
const exphbs = require("express-handlebars");
const { MongoClient } = require('mongodb');
const path = require("path");
const session = require("express-session");
const passport = require("passport")
const bodyParser = require("body-parser");
const Strategy = require('passport-local').Strategy;

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DATABASE_URI;
const secret = process.env.SECRET;

app.engine('.hbs', exphbs({extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(session ({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(uri, { useUnifiedTopology: true}, (err, client) => {
  if(err) { 
    throw err;
  }

  const db = client.db('matcher');
  const users = db.collection('users');
  app.locals.users = users;
})

app.get("/", (req, res) => {
  const users = [
    {name: "Name 1"}, 
    {name: "Name 2"},
    {name: "Name 3"}, 
    {name: "Name 4"},
    {name: "Name 5"}, 
    {name: "Name 6"},
  ];

  res.render('home', { users });
});

app.get("/profile", (req, res) => {
  res.render("profile")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))