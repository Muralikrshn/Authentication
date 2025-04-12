const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(userid) {
  const payload = {
    user: userid
  };
  const secretKey = process.env.secret;
  const options = {
    expiresIn: '1h'
  }

  const jwtToken = jwt.sign(payload, secretKey, options);

  return jwtToken;
}

module.exports = generateToken;