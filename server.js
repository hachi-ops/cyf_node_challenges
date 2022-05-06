const express = require("express");

const app = express();

// req is the Request object, res is the Response object
// (these are just variable names, they can be anything but it's a convention to call them req and res)
app.get("/", function (req, res) {
  res.send("Hello World!");
});

const lists = new Map();
const mailingList = mailingList.json();
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

// add some fake data

app.get("/lists", (req, res) => {
  const listsArray = Array.from(lists.keys()); // Why is this like this? Try it out in your console.
  res.send(listsArray);
});
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
