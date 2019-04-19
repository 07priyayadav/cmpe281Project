var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// get login page
router.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

// get dashboard page
router.get('/dashboard', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'dashboard.html'));
});

module.exports = router;
