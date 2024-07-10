const { Schema, model } = require('mongoose');

const HighScoreSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  score: { type: String, required: true },
  illustration: { type: String, required: true },
});

module.exports = model('HighScore', HighScoreSchema);
