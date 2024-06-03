const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  ageUnit: String,
  breed: String
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
