const router = require('express').Router();
const UserModel = require('../models/userModel');
const {UniqueConstraintError} = require('sequelize/lib/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//New User
router.post('/register', async (req, res) => {
    /*this is the server side portion that creates the token that we are accessing in the client side and storing it in our browser to allow access to the protected parts of our database --this is for the register component, the login portion is further down witha very similar structure
    */
    const {username, password} = req.body.user;
    
    try {
        const User = await UserModel.create({
            username,

            password: bcrypt.hashSync(password, 13)
        })

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.status(201).json({
            message: "User successfully created.",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username already in use"
            });
        } else {
            res.status(500).json({
                error: `Failed to create user ${err}`
            })
        }
    }
});

//User login
router.post('/login', async (req, res) => {   //<------heres where we are using our user model to input username and password into our user model {request body} sent by the user.
    const {username, password} = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                username: username
            }
        });

        if (loginUser) {

            let passwordComp = await bcrypt.compare(password, loginUser.password)

            if (passwordComp) {  //<----- this is checking to make sure our password and login combination works and if it does it is suppling our session token from our dependencies
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET,  {expiresIn: 60*60*24});  

                res.status(200).json({    
                    message: "Login Successful!",
                    username: loginUser,
                    sessionToken: token      //<---- supplying our session token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect username or password."
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect username or password"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;