const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

const details = require("./lists.json");

app.get("/details", function (request, response) {
  response.json(details);
});
