"use strict";

const md5 = require("md5");

module.exports = (sequelize, DataTypes) => {
  const PROTECTED_ATTRIBUTES = ["password"];
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  User.prototype.toJSON = function () {
    let attributes = Object.assign({}, this.get());
    for (let key of PROTECTED_ATTRIBUTES) {
      delete attributes[key];
    }
    return attributes;
  };

  User.hashPassword = function (password) {
    return md5(password);
  };

  User.prototype.checkPassword = function (password) {
    return md5(password) == this.password;
  };

  return User;
};
