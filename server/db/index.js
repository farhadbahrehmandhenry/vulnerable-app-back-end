const mysql = require('mysql');
var _ = require('lodash');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'rootpassword',
  user: 'root',
  host: 'localhost',
  port: '3306',
  database: 'vulnerable'
});

var db = {};

db.selectUserBadWay = ({body}) => {
  return new Promise((resolve, reject)  => {
    pool.query(`SELECT * FROM users WHERE userId = ${body.userId}`, (err, results) => {
      if (err) return reject(err);
      else return resolve(results);
    });
  });
};

db.selectUserGoodWay = ({body}) => {
  return new Promise((resolve, reject)  => {
    pool.query('SELECT * FROM users WHERE userId = ?', [body.userId], (err, results) => {
      if (err) return reject(err);
      else return resolve(results);
    });
  });
};

module.exports = db;