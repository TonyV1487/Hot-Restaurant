// Dependencies
// ===========================================================
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// setup the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const rsvp = [
  {
    customerName: "Jon",
    phoneNumber: "555-555-5555",
    customerEmail: "jon@gmail.com",
    customerId: "1"
  },
  {
    customerName: "Tim",
    phoneNumber: "444-444-4444",
    customerEmail: "tim@gmail.com",
    customerId: "2"
  }
];

const waitlist = [
  {
    customerName: "Tony",
    phoneNumber: "555-555-5555",
    customerEmail: "tony@gmail.com",
    customerId: "3"
  },
  {
    customerName: "Mark",
    phoneNumber: "444-444-4444",
    customerEmail: "mark@gmail.com",
    customerId: "4"
  }
];

// Data
// ===========================================================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/view.html"));
});

// Show current tables
app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

// Request information for reservation
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/form.html"));
});

// API Routes
// Show current tables
app.get("/api/tables", (req, res) => {
  return res.json(rsvp);
});

// Show waitlist
app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
  // getting the raw data from the client
  // format for my database
  if (rsvp.length < 4) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
});

app.post("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
