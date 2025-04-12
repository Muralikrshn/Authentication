const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    const token = req.header('authorization');
    const secretKey = process.env.secret;

    // checking errors
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    const payload = jwt.verify(token, secretKey);
    // console.log(payload)
    req.userid = payload.user;

    next();
  } catch (err) {
    return res.status(403).send(err.message)
  }

}