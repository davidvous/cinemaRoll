const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const {csurfProtection, asyncHandler} = require('./utils')
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');


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

  // create user object with fields to re-render if there are errors
  const prefillUser = db.User.build({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

  if (errors.length > 0) {
    return res.render('signup', { user: prefillUser, errors, csrfToken: req.csrfToken()});
  } else {

    // check if the e-mail is available
    emailPresent = await db.User.count( { where: { email: req.body.email } })
    if (emailPresent) {
      errors.push("A user with this e-mail already exists.")
      return res.render('signup', { user: prefillUser, errors, csrfToken: req.csrfToken()});
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    console.log("BEFORE: I got to this line with no error.");
    const user = await db.User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passwordHash: hashedPassword,
    });
    console.log("AFTER: I got to this line with no error.");
    console.log(user);
    console.log("I got to this line with no error.");
    loginUser(req, res, user);
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
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (user) {
      const isPasswords = await bcrypt.compare(
        req.body.password,
        user.passwordHash.toString(),
      );
      if (isPasswords) {
        loginUser(req, res, user);
        return res.redirect("/");
      }
    }
  }
  errors.push("Email address or password incorrect.");
  return res.render("login", { errors, csrfToken: req.csrfToken() });
}))

router.get('/login', csurfProtection,  (req, res, next) =>{
  return res.render("login",{csrfToken: req.csrfToken()});
})

router.post('/logout', asyncHandler(async (req, res, next) => {
  logoutUser(req);
  return res.redirect("/");
}))




module.exports = router;
