"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      paranoid: true,
    }
  );
  Task.associate = function (models) {
    // associations can be defined here
  };

  // Simple pagination, for complex pagination. I have to create my own paginator module
  sequelizePaginate.paginate(Task);

  return Task;
};
