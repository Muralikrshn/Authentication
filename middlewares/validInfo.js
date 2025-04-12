
function checkEmail(email){
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

module.exports = (req, res, next) => {
  const {name, email, password} = req.body;
  if (req.path === "/register"){
    if (![name, email, password].every(Boolean)) {
      return res.status(401).send("Missing Credentials");
    } else if (!checkEmail(email)){
      return res.status(401).send("Invalid Email");

    }
    next();
  } 
  else if (req.path === "/login"){
    if (![email, password].every(Boolean)) {
      return res.status(401).send("Missing Credentials");
    } else if (!checkEmail(email)){
      return res.status(401).send("Invalid Email");

    }

    next();
  } 
}