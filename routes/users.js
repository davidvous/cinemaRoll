const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const {csurfProtection, asyncHandler} = require('./utils')
const db = require('../db/models');


const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


const signupValidation = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
    .isLength({ max: 50})
    .withMessage('First Name must not be more than 50 characters long'),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Last Name')
    .isLength({ max: 50})
    .withMessage('Last Name must not be more than 50 characters long'),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address')
    .isLength({ max: 150})
    .withMessage('Email address must not be more than 255 characters long'),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for password')
    .isLength({ max: 50})
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .withMessage('Password should contain at least 1 lowercase letter, uppercase letter, number, and special character'),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password')
    .custom((val, { req }) => val === req.body.password)
    .withMessage('Password and password confirm do not match'),

]


router.get("/signup", csurfProtection, function(req, res, next) {
  const csrfToken = req.csrfToken()
  res.render('signup', {csrfToken, user: {}});
})


router.post("/signup", csurfProtection, signupValidation, asyncHandler(async function(req, res) {

  const errors = validationResult(req).errors.map(e => e.msg);

  if (errors.length > 0) {
    const user = db.User.build({
      email: req.body.email,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
    });
    return res.render('signup', { user, errors, csrfToken: req.csrfToken()});
  } else {
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await db.User.create({
      email: req.body.email,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      password_encrypted: hashedPassword,
    });
    
    return res.redirect('/');
  }

}));



const loginValidation = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for password')
]


router.post('/login', csurfProtection, loginValidation, asyncHandler (async (req, res, next) =>{

  const errors = validationResult(req).errors.map(e => e.msg);

  if (errors.length > 0) {
    return res.render('login', {errors, csrfToken: req.csrfToken()});}
  else {
    const user = await db.User.findOne({where: {email:req.body.email}})
    if (user){
      const isPasswords = await bcrypt.compare(req.body.password, user.password_encrypted.toString())
      if (isPasswords) {
        return res.redirect('/'); 
      }
      else{
        errors.push("Email address or password incorrect.")
        return res.render('login', {errors, csrfToken: req.csrfToken()});
      }
    }
    
  }
  //return res.render("login",{csrfToken: req.csrfToken()});
}))

router.get('/login', csurfProtection,  (req, res, next) =>{
  return res.render("login",{csrfToken: req.csrfToken()});
})


module.exports = router;
