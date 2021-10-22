const express = require('express');
const { check, validationResult } = require('express-validator');


const {csurfProtection, asyncHandler} = require('./utils')
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');


const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
  const { authenticated, user } = res.locals;
  res.json({authenticated, user});
}));


module.exports = router;
