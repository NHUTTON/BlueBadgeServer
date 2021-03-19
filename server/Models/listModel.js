const { DataTypes } = require("sequelize");
const db = require("../db");

const List = db.define("list", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner: {
   type: DataTypes.INTEGER,
  }
});

module.exports = List;
