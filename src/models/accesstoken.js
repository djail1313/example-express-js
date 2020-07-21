"use strict";

const jwt = require("jsonwebtoken");
const moment = require("moment");

const UnauthorizedException = require("@exceptions/unauthorizedException");

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define(
    "AccessToken",
    {
      userId: DataTypes.INTEGER,
      expiresIn: DataTypes.DATE,
      isRevoked: DataTypes.BOOLEAN,
      revokedDate: DataTypes.DATE,
      lastUsed: DataTypes.DATE,
    },
    {}
  );
  AccessToken.associate = async function (models) {
    AccessToken.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  AccessToken.produceToken = async function (user) {
    let date = moment();
    let expiredLengthInSeconds = 60 * 60 * 24 * 30; // 1 month
    let expiredDate = date.add(expiredLengthInSeconds, "seconds");

    await revokeAllAccessTokenUser(user, date);

    let accessToken = await createAccessToken(user, expiredDate, false, date);

    return {
      object: accessToken,
      accessToken: await generateAccessToken(
        accessToken,
        user,
        expiredLengthInSeconds
      ),
    };
  };

  AccessToken.verifyToken = async function (token) {
    try {
      let decodedToken = jwt.verify(token, process.env.APP_KEY);
      let data = await AccessToken.findByPk(decodedToken.tokenId);
      if (!data) {
        throw UnauthorizedException();
      }
      if (data.isRevoked) {
        throw UnauthorizedException();
      }
      return data;
    } catch (error) {
      throw UnauthorizedException();
    }
  };

  const revokeAllAccessTokenUser = async (user, date) => {
    await AccessToken.update(
      {
        isRevoked: true,
        revokedDate: date,
      },
      {
        where: {
          userId: user.id,
          isRevoked: false,
        },
      }
    );
  };

  const createAccessToken = async (user, expiresIn, isRevoked, lastUsed) => {
    return await AccessToken.create({
      userId: user.id,
      expiresIn: expiresIn,
      isRevoked: isRevoked,
      lastUsed: lastUsed,
    });
  };

  const generateAccessToken = async (
    accessToken,
    user,
    expiredLengthInSeconds
  ) => {
    let payload = {
      tokenId: accessToken.id,
      userId: user.id,
    };
    return jwt.sign(payload, process.env.APP_KEY, {
      expiresIn: expiredLengthInSeconds,
      issuer: user.email,
    });
  };

  return AccessToken;
};
