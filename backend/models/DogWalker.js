const mongoose = require('mongoose');

const dogWalkerSchema = new mongoose.Schema({
  name: String,
  experience: Number,
  available: Boolean
});

const DogWalker = mongoose.model('DogWalker', dogWalkerSchema); // Corrected model name
module.exports = DogWalker;
