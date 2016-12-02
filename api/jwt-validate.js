require('dotenv').config()    //reads config file (.env)
const jwt = require('express-jwt')  //

module.exports = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'), // Secret is base64 encoded
  audience: process.env.AUTH0_ID
})

// module.exports = function (req, res, next) {
//   // get the jwt token from request
//   // verif the token against our secret
//   // if valid - continue
//   // otherwise - access denied!! 403
// }
