const { DataTypes } = require("sequelize");
const db = require("../db");

const Games = db.define("game", {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    platform: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    owner: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Games