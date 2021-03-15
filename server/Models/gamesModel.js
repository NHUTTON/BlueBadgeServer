const { DataTypes } = require("sequelize");
const db = require("../db");

const Games = db.define("game", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Games