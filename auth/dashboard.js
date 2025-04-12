const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middlewares/authorization")

router.get("/dashboard", authorization, async (req, res) => {
  try {
    const userid = req.userid;
    const userAccount = await pool.query("SELECT * FROM users WHERE id = $1", [userid]);
    res.status(200).json(userAccount.rows[0])
  } catch (err) {
    res.status(401).json(err.message)
  }
})

module.exports = router;