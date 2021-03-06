const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: String,
    date: Date,
    time: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
