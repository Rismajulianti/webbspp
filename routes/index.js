var express = require('express');
var router = express.Router();
const moment = require('moment');

const db = require('../bin/db');

const sess = (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  }

  return next();
}

router.get('/', sess, (req, res, next) => {
  db.query('SELECT * FROM sppsiswa', (error, results, fields) => {
    if (error) throw error;

    res.render('index', { data: results, moment });
  })
});

router.get('/login', (req, res, next) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  }

  res.render('login', { title: 'SPP' });
});


module.exports = router;
