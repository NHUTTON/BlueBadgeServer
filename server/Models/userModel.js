const {DataTypes} = require('sequelize');
const db = require('../db');

const User = db.define('user', {
    //still need to meet To-Do list reqs 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;