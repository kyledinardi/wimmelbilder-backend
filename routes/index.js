const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();
router.get('/characters', controller.checkCharacter);
router.post('/high-scores', controller.createHighScore);
router.get('/high-scores', controller.getHighScores);
module.exports = router;
