require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const passphrase = process.env.PHRASE || "Matcher!"
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useUnifiedTopology: true})

app.get("/", (req, res) => {
  res.send(passphrase);
});

app.listen(port, () => {
    console.log(`Listening on localhost:${port}`)
})

async function main () {
try {
  await client.connect();
} catch (e) {
  console.error(e);
}
}

main().catch(console.error)