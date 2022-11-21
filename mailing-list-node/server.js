const express = require("express");

const app = express();

app.use(express.json());

const PORT = 4000;

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

app.post("/names", (req, res) => {
  console.log("POST /names route");
  // console.log(req.body);
  // res.send();
});
