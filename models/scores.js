"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Scores.belongsTo(models.Users);
    }

    static async score(getBody, getUserId) {
      try {
        return await this.create({
          score: +getBody.score,
          UserId: getUserId,
        });
      } catch (error) {
        Promise.reject(error);
      }
    }
  }
  Scores.init(
    {
      score: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Scores",
    }
  );
  return Scores;
};
