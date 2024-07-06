const express = require('express');
const asyncHandler = require('express-async-handler');
const Character = require('../models/Character');

const router = express.Router();

router.post(
  '/characters',
  asyncHandler(async (req, res, next) => {
    const character = await Character.findOne({
      name: req.body.character,
      illustration: req.body.illustration,
    }).exec();

    if (
      req.body.selectedCoords.x >= character.minX &&
      req.body.selectedCoords.x <= character.maxX &&
      req.body.selectedCoords.y >= character.minY &&
      req.body.selectedCoords.y <= character.maxY
    ) {
      res.json({ found: true });
    } else {
      res.json({ found: false });
    }
  }),
);

module.exports = router;
