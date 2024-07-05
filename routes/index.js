const express = require('express');
const characterCoords = require('../helper/characterCoords');

const router = express.Router();

router.post('/characters', (req, res, next) => {
  const correctCoords =
    characterCoords[req.body.illustration][req.body.character];

  if (
    req.body.selectedCoords.x >= correctCoords.minX &&
    req.body.selectedCoords.x <= correctCoords.maxX &&
    req.body.selectedCoords.y >= correctCoords.minY &&
    req.body.selectedCoords.y <= correctCoords.maxY
  ) {
    res.json({ found: true });
  } else {
    res.json({ found: false });
  }
});

module.exports = router;
