const router = require('express').Router();
const {UserModel} = require('../Models');
const {UniqueConstraintError} = require('sequelize/lib/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//New User
router.post('/register', async (req, res) => {
    //in postman, structured as {"user": {"username": "name", "password": "PW"}}
    const {username, password} = req.body.user;
    
    try {
        const User = await UserModel.create({
            username,
            /*
                bcrypt: takes algorithm (salt) and returns hash value
                .hashSync(A,B)
                    A. the string we want hashed (password = req.body.user.password)
                    B. string or number, this defaults to 10, = # of times we want to salt the password
            */
            password: bcrypt.hashSync(password, 13)
        })

        /* 
            token:
                1. header: type of token and algorithm to encode/decode
                2. payload: what is being sent with token (username, password)
                3. signature: used to encode/decode
            .sign(A, B, C)
                A. Payload: User.id is primary key and # assigned to user when created in database
                B. signature: this can be ANYTHING
                C. When token expires
        */
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
router.post('/login', async (req, res) => {
    const {username, password} = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                username: username
            }
        });

        if (loginUser) {
            /*
                bcrypt.compare(s, hash, callback, progressCallback)
                    s: string, data to compare
                    hash: string, the hash compared to
                    callback: callback receiving error otherwise successful
                    progress: callback called succesfully

                    only use the first two: 
                        password - password value from current req.body.user
                        loginUser.password: hashed password from database (set this variable in the first part of the try)
            */
            let passwordComp = await bcrypt.compare(password, loginUser.password)

            if (passwordComp) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

                res.status(200).json({
                    message: "Login Successful!",
                    username: loginUser,
                    sessionToken: token
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