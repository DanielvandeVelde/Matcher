require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const passphrase = process.env.PHRASE || "Matcher!"

app.get("/", (req, res) => {
  res.send(passphrase);
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})