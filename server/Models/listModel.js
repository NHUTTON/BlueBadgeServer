const { DataTypes } = require("sequelize");
const db = require("../db");

const List = db.define("list", {
  listName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = List;
