const express = require("express");

const app = express();

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

app.get("/", function (req, res) {
  res.send("Hello!");
});

const users = require("./lists.json");

app.get("/users", function (req, res) {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  res.send(user);
  if (user) return res.send(user);
  res.status(404).send("sorry, not found");
});
