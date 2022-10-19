"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comments.belongsTo(models.Users);
    }

    static async createComment(getBody, getUserId) {
      try {
        return await this.create({
          comment: getBody.comment,
          login_date: Date.now(),
          UserId: getUserId,
        });
      } catch (error) {
        Promise.reject(error);
      }
    }

    static async deleteComment(getUserId) {
      try {
        const query = {
          where: { UserId: getUserId },
        };
        return await this.destroy(query);
      } catch (error) {
        Promise.reject(error);
      }
    }
  }
  Comments.init(
    {
      comment: DataTypes.STRING,
      login_date: DataTypes.DATEONLY,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
