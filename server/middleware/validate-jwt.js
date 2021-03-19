const jwt = require("jsonwebtoken");
const {UserModel} = require('../models');

const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") { //checking method request to see if it comes as OPTIONS instead of POST, GET, etc. part of preflighted request
        next(); //if preflight request, pass it the next parameter
    } else if (req.headers.authorization && req.headers.authorization.includes("Bearer")) { //check header of incoming reuest and that string includes the word Bearer
        const {authorization} = req.headers; //object deconstruction to pull vlaue of authorization header
        // console.log("authorization-->", authorization);
        const payload = authorization  
            /*
                verify(): first parameter is token, second is the JWT_SECRET
            */
            ? jwt.verify( //ternary that verifies if authorization contains truthy value, if not then stores undef in payload var
                /*
                    if token includes Bearer, extrapolate and return just the token from string
                */
                authorization.includes("Bearer")  
                ? authorization.split(" ")[1]
                : authorization,
                process.env.JWT_SECRET,
            )
            : undefined;
    
            // console.log("payload -->", payload);
    
            if (payload) { //if payload is truthy, findOne to look for user that matches ID
                let foundUser = await UserModel.findOne({where: {id: payload.id}});
                // console.log("foundUser -->", foundUser);
    
                /*
                    if a user is found, store in foundUser
                */
                if (foundUser) { 
                    // console.log("request -->", req);
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