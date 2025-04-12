const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());

// middleware for verify.js verification of access token
app.use("/auth", require("./auth/verify"))

// middleware for dashboarrd.js to access dashboard
app.use("/auth", require("./auth/dashboard"))


app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
