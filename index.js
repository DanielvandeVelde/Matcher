require('dotenv').config();

const express = require("express");
const exphbs = require("express-handlebars");
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DATABASE_URI;

app.engine('.hbs', exphbs({extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static('public'))

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

MongoClient.connect(uri, { useUnifiedTopology: true}, (err, client) => {
  if(err) { 
    throw err;
  }

  const db = client.db('matcher');
  const users = db.collection('users');
  app.locals.users = users;
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))