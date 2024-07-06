const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  minX: { type: Number, required: true },
  maxX: { type: Number, required: true },
  minY: { type: Number, required: true },
  maxY: { type: Number, required: true },
  illustration: { type: String, required: true },
});

module.exports = model('Character', CharacterSchema);
