const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require("../models/Users");

const verifyJwt = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    
    if (!authHeader) return res.sendStatus(403);

    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
      
      if (err) return res.sendStatus(403); //invalid token
      
      req.body = decoded;
      next();
    });
  };
  
function checkRole(roleId) {
    return async function(req, res, next) {
      
      const user = await User.findByPk(req.body.id);
      if (user && user.role_id === roleId) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    };
  }


module.exports = {verifyJwt, checkRole};