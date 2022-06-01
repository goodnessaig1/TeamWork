/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
module.exports =  (req, res, next) => {
    
    
    const { email, firstname, password } = req.body;
  
    // eslint-disable-next-line no-shadow
    function validEmail(email) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
  
    if (req.path === "/create-user") {
      console.log(!email.length);
      if (![email, firstname, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      // eslint-disable-next-line no-else-return
      } else if (!validEmail(email)) {
        return res.status(401).json({ message: "Invalid Email"});
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      // eslint-disable-next-line no-else-return
      } else if (!validEmail(email)) {
        return res.status(403).json("Invalid Email");
      }
    }
  
    next();
  };