const express = require('express');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

router.post(
  '/characters',
  
  asyncHandler(async (req, res, next) => {
    const character = await prisma.character.findFirst({
      where: { name: req.body.character, illustration: req.body.illustration },
    });

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
    const scoreList = await prisma.highScore.findMany({
      orderBy: { score: 'desc' },
    });

    res.json({ scoreList });
  }),
);

router.post(
  '/high-scores',
  body('name', 'Name must not be empty').trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: 'Error: Name must not be empty' });
    }

    await prisma.highScore.create({
      data: {
        name: req.body.name,
        score: req.body.timerValue,
        illustration: req.body.illustration,
      },
    });

    return res.json({ msg: 'High score successfully saved to database' });
  }),
);

module.exports = router;
