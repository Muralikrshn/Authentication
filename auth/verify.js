const authorization = require("../middlewares/authorization");
const pool = require("../db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokengenerator")
const validInfo = require("../middlewares/validInfo")

const router = require("express").Router();

// Handling register routes
router.post("/register", validInfo, async (req, res) => {
  console.log(req.body);
  const {name, email, password} = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if (user.rowCount > 0) {
      return res.status(401).json("User already exists")
    }

    // hashing the password to send user to the database
    const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const putUser = await pool.query("INSERT INTO users (name,email,password) VALUES ($1,$2,$3)RETURNING *",[name, email,hashedPassword]);

    const access_token = await generateToken(putUser.rows[0].id);

    res.status(200).json({access_token, isRegistered:true})
    // if (putUser.rowCount > 0){
    //   res.status(200).json("User registered successfully");
    // }
  } catch (err) {
    return res.status(500).json(err.message)
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    // check token validity
    console.log(req.user);

    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if (checkUser.rowCount === 0) {
      return res.status(401).json("User does not exist")
    }

    // res.json(checkUser)
    const isMatch = await bcrypt.compare(password, checkUser.rows[0].password);
    if (!isMatch) {
      return res.status(401).json("Email or Password is incorrect");
    }

    const access_token = generateToken(checkUser.rows[0].id);

    res.status(200).json({access_token, "name":checkUser.rows[0].name, "id":checkUser.rows[0].id})
  } catch (err) {
    console.log(err.message)
  }
})


router.get("/verify", authorization, (req, res) => {
  try {
    res.json(req.userid)
  } catch (err) {
    res.status(401).json(err.message)
  }
})

module.exports = router;