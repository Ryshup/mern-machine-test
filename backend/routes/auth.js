const express = require('express');
const Login = require('../models/Login');
const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  const user = await Login.findOne({ f_userName, f_Pwd });
  if (user) {
    return res.json({ message: 'Login successful' });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
