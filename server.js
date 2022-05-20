// Each booking is an object with the following properties:

// | Name         | Type   | Example           |
// | ------------ | ------ | ----------------- |
// | id           | number | 1                 |
// | roomId       | number | 123               |
// | title        | string | "Mr"              |
// | firstName    | string | "John"            |
// | surname      | string | "Doe"             |
// | email        | string | "johndoe@doe.com" |
// | checkInDate  | string | "2017-11-21"      |
// | checkOutDate | string | "2017-11-23"      |

// - Dates are in the format YYYY-MM-DD

// - The `id` field must be assigned on the server, not by the client.

// ## Want to run your code on the internet?

// If you want to share your server with other people the easiest way to do this is to use Glitch

// - [ ] Make sure you're logged in to https://glitch.com/
// - [ ] Remix this server on glitch - https://glitch.com/~cyf-hotel-start
// - [ ] Name your new server `yourname-hotel-server`
// - [ ] Make sure you're logged in so that it saves
// - [ ] Check that it is working by making a request to `/`
// - [ ] Take time to read the comments
// - [ ] Copy the code you've written to Glitch

// Don't post on slack, unless there's a thread announced specifically for it.
// Instead, attach the URLs as links when you "mark done" your assignment in Google Classroom.
// You might want to download your project for safekeeping. (Tools: Git, Import, and Export: Download Project)

// # Level 2 - simple validation

// For this level, your server must reject requests to create bookings if:

// - any property of the booking object is missing or empty.

// In this case your server should return a status code of 400, and should NOT store the booking in the bookings array.

// # Level 3 (Optional, advanced) - search by date

// For this level your API must also allow a client to:

// Search for bookings which span a date (given by the client).

// It should accept requests of the following format:

// `/bookings/search?date=2019-05-20`

// Hint: use the `moment` library to make this easier.

// # Level 4 (Optional, advanced) - advanced validation

// In this level, bookings should also be rejected if:

// - email address is not valid (hint: use a library to do this - [search here](https://www.npmjs.com/))
// - checkoutDate is not after checkinDate (hint: use the `moment` library to check this)

// # Level 5 (Optional, easy) - free-text search

// For this level your API must also allow a client to:

// Search for bookings which match a given search term.

// It should accept requests of the following format:

// `/bookings/search?term=jones`

// It should match if the term occurs in _any_ of `email`, `firstName`, or `surname` fields.

// # Level 6 (Optional) - make your React app use your new server

// For this level, change your react hotel front-end to use your own back-end API that you have designed here in this challenge. Adjust it so that all the functionality works.

// # Spoiler: Correct Routes

// | method | example path                     | behaviour                                   |
// | ------ | -------------------------------- | ------------------------------------------- |
// | GET    | /bookings                        | return all bookings                         |
// | GET    | /bookings/17                     | get one booking by id                       |
// | GET    | /bookings/search?term=jones      | get all bookings matching a search term     |
// | POST   | /bookings                        | create a new booking                        |
// | DELETE | /bookings/17                     | delete a booking by id                      |
// | GET    | /bookings/search?date=2019-05-20 | return all bookings spanning the given date |

// At this first level, your API must allow a client to:

// 1. Create a new booking
// 1. Read all bookings
// 1. Read one booking, specified by an ID
// 1. Delete a booking, specified by an ID

// If the booking to be read cannot be found by id, return a 404.

// If the booking for deletion cannot be found by id, return a 404.

// All booking content should be passed as JSON.

// See the later spoiler section "Correct Routes" if you are not sure of the correct routes.
const express = require("express");
const cors = require("cors");
// const moment = require("moment");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// app.use(moment());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

//read all bookings
app.get("/bookings", (req, res) => {
  res.send(bookings);
});

const findBooking = (id) =>
  bookings.find((booking) => booking.id === Number(id));

app.get("/bookings/:id", (req, res) => {
  if (findBooking(req.params.id)) {
    findBooking(req.params.id);
  } else {
    res
      .status(404)
      .json({ msg: `This booking ${req.params.id}  does not exist` });
  }
  res.send(findBooking(req.params.id));
});

app.post("/bookings", (req, res) => {
  // const { id, firstName, surname } = req.body;

  let newBooking = {
    id: bookings.length + 1,
    title: req.body.title,
    firstName: req.body.firstName,
    surname: req.body.surname,
    email: req.body.email,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
  };

  if (
    !newBooking.title ||
    !newBooking.firstName ||
    !newBooking.surname ||
    !req.body.email ||
    !checkInDate ||
    !checkOutDate
  ) {
    res.status(400).json({ msg: "Fill in the missing fields" });
  } else {
    bookings.push(newBooking);
    res.json(bookings);
  }
});

app.delete("/bookings/:id", (req, res) => {
  const found = bookings.some(
    (booking) => booking.id === parseInt(req.params.id)
  );

  if (found) {
    res.json({
      msg: `Member deleted`,
      bookings: bookings.filter(
        (booking) => booking.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(404).json({
      msg: `The booking with the id ${req.params.id} cannot be found`,
    });
  }
});

const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
