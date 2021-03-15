const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    listName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return List;
};

