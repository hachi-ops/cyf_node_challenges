const express = require("express");

const app = express();

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/", function (req, res) {
  res.send("Hello!");
});

const users = require("./lists.json");

app.get("/users", function (req, res) {
  res.send(users);
});

app.get("/users/:name", (req, res) => {
  const user = details.find((u) => u.name === req.params.name);
  res.send(req.params.name);
  if (user) return res.send(user);
  res.status(404).send("sorry, not found");
});
