const express = require('express');
const db = require('../db');
const _ = require('lodash');
const router = express.Router();
const {exec} = require('child_process');


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

// os injection
router.post('/bad/os/injection', async (req, res, next) => {
  var start = new Date().getTime();

  try {
    exec(`touch ${req.body.fileName}`, (error, stdout, stderr) => {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        else {
          var end = new Date().getTime();

          res.json({type: 'success', fileName: req.body.fileName, time: end - start});
        }
    });
  }
  catch(e) {
    console.log(e)

    res.sendStatus(500);
  }
});

router.post('/good/os/injection', async (req, res, next) => {
  var start = new Date().getTime();
  var {fileName} = req.body;
  if (!/[;]/g.test(fileName)) {
    try {
      exec(`touch ${fileName}`, (error, stdout, stderr) => {
          if (error !== null) {
              console.log('exec error: ' + error);
          }
          else {
            var end = new Date().getTime();
  
            res.json({type: 'success', fileName: req.body.fileName, time: end - start});
          }
      });
    }
    catch(e) {
      console.log(e)
  
      res.sendStatus(500);
    }
  }
  else {
    res.json({type: 'fail', fileName: 'injection', time: 0});
  }
});

module.exports = router;