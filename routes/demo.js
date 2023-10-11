// routes/sample.js

const express = require('express');
const router = express.Router();
const {verifyJwt, checkRole} = require('../middleware/roleAccess');


router.get('/sample', (req, res) => {
  res.json({ message: 'This is a sample response' });
});

router.get('/user', verifyJwt, checkRole(2), (req, res) => {
  res.json({ message: 'This is a user sample response' });
});

router.get('/admin', verifyJwt, checkRole(3), (req, res) => {
  res.json({ message: 'This is an admin sample response' });
});


module.exports = router;