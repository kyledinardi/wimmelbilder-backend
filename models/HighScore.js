const { Schema, model } = require('mongoose');

const HighScoreSchema = new Schema({
  name: { type: String, required: true },
  score: { type: String, required: true },
});

module.exports = model('HighScore', HighScoreSchema);
