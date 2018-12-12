const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser');
const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://test:gD7E~hA%40#z@ds229474.mlab.com:29474/user-events";
const api = require('./server/routes/api');

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// router.get("/getEvents", (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });
//
//
// router.post("/putEvent", (req, res) => {
//   let data = new Data();
//
//   const { id, event } = req.body;
//
//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   data.id = id;
//   data.title = event[0];
//   data.date = event[1];
//   data.time = event[2];
//   data.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

app.use("/api", api);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
