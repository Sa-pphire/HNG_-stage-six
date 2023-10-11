const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const User = require("../models/Users");

const verifyJwt = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    
    if (!authHeader) return res.json({
      "status": 400,
      "success": false,
      "Error": "Bad request"
    });;

    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
      
      if (err) return res.json({
        "status": 400,
        "success": false,
        "Error": err.message
      });
      
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
        if (err) return res.json({
          "status": 403,
          "success": false,
          "Error": err.message
        });;
      }
    };
  }


module.exports = {verifyJwt, checkRole};