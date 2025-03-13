const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.checkCharacter = asyncHandler(async (req, res, next) => {
  const { name, illustration, x, y } = req.query;

  const character = await prisma.character.findFirst({
    where: { name, illustration },
  });

  const found =
    x >= character.minX &&
    x <= character.maxX &&
    y >= character.minY &&
    y <= character.maxY;

  return res.json({ found });
});

exports.createHighScore = [
  body('name').trim(),

  asyncHandler(async (req, res, next) => {
    const { name, score, illustration } = req.body;
    await prisma.highScore.create({ data: { name, score, illustration } });
    return res.json({ msg: 'High score successfully created' });
  }),
];

exports.getHighScores = asyncHandler(async (req, res, next) => {
  const highScores = await prisma.highScore.findMany({
    orderBy: { score: 'asc' },
  });

  return res.json({ highScores });
});
