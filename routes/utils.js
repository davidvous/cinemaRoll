const csrf = require('csurf');
const csurfProtection = csrf({cookie:true})

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

module.exports = {csurfProtection, asyncHandler};
