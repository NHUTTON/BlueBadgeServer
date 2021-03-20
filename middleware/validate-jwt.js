const jwt = require("jsonwebtoken");
const {UserModel} = require('../models');
/*
this is the validation that is required to pass throught to access the "protected areas" of our database. ie: login info/user posts/games list etc..

we require this in our app.js by moving it first in line aboveg our games and list endpoint show on the right side of my screen.
*/
const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") { 
        next(); 
    } else if (req.headers.authorization && req.headers.authorization.includes("Bearer")) {
        const {authorization} = req.headers; 
        const payload = authorization  
      
            ? jwt.verify( 
                authorization.includes("Bearer")   //<------this is requiring the use of Bearer in our session token ad a secondary check for additional secuirty
                ? authorization.split(" ")[1]
                : authorization,
                process.env.JWT_SECRET,
            )
            : undefined;
    
    
            if (payload) {
                let foundUser = await UserModel.findOne({where: {id: payload.id}});
                if (foundUser) { 
         
                    req.user = foundUser;
                    next();
                } else {
                    res.status(400).send({message: "Not Authorized"});
                }
            } else {
                res.status(401).send({message: "Not Authorized"});
            }
    } else {
        res.status(403).send({message: "Forbidden"});
    }
}

module.exports = validateJWT;