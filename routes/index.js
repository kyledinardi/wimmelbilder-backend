const express = require('express');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Character = require('../models/Character');
const HighScore = require('../models/HighScore');

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

router.get(
  '/high-scores',
  asyncHandler(async (req, res, next) => {
    const scoreList = await HighScore.find().sort({ score: 1 }).exec();
    res.json({ scoreList });
  }),
);

router.post(
  '/high-scores',
  body('name', 'Name must not be empty').trim().escape().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Error: Name must not be empty' });
    }

    const highScore = new HighScore({
      name: req.body.name,
      date: req.body.date,
      score: req.body.timerValue,
      illustration: req.body.illustration,
    });

    await highScore.save();
    return res.json({ msg: 'High score successfully saved to database' });
  }),
);

module.exports = router;
