const express = require('express');
const db = require('../db');
const _ = require('lodash');
const router = express.Router();

router.post('/bad/sql', async (req, res, next) => {
  try {
    var result = await db.selectUserBadWay({body: req.body});

    res.json(result);
  }
  catch(e) {
    console.log(e)

    res.sendStatus(500);
  }
});

router.post('/good/sql', async (req, res, next) => {
  try {
    var result = await db.selectUserGoodWay({body: req.body});

    res.json(result);
  }
  catch(e) {
    console.log(e)

    res.sendStatus(500);
  }
});

module.exports = router;