"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Scores);
      Users.hasOne(models.Comments);
    }

    static #hashPassword(pass) {
      return bcrypt.hashSync(pass, 10);
    }

    static #hashConfirmPassword(ConfirmPass) {
      return bcrypt.hashSync(ConfirmPass, 10);
    }

    static #comparePassword(pass, dbPass) {
      return bcrypt.compareSync(pass, dbPass);
    }

    static #generateToken(payload) {
      const secret = "My secret";
      return jwt.sign(payload, secret);
    }

    static async signUp(getBody) {
      const encrypt = this.#hashPassword(getBody.password);
      const encryptConfirm = this.#hashConfirmPassword(getBody.confirm_password);
      try {
        await this.create({
          user_name: getBody.user_name,
          email: getBody.email,
          password: encrypt,
          confirm_password: encryptConfirm,
        });
      } catch (error) {
        Promise.reject(error);
      }
    }

    static async signIn(getBody) {
      try {
        const query = {
          where: {
            user_name: getBody.user_name,
            email: getBody.email,
          },
        };

        let user = await this.findOne(query);

        const userData = {
          id: user.dataValues.id,
          user_name: user.dataValues.user_name,
          email: user.dataValues.email,
        };

        let resultObj = {
          success: false,
          alert: "",
          token: "",
        };

        if (!user) {
          resultObj.alert = "User not found!";
        } else {
          let dbPassword = user.dataValues.password;
          let isPasswordValid = this.#comparePassword(getBody.password, dbPassword);

          if (!isPasswordValid) {
            resultObj.alert = "Invalid Password!";
          } else {
            resultObj.token = this.#generateToken(userData);
            resultObj.success = true;
            resultObj.data = userData;
          }
        }
        return Promise.resolve(resultObj);
      } catch (error) {
        Promise.reject(error);
      }
    }

    static async changePass(getBody) {
      const encrypt = this.#hashPassword(getBody.password);
      const encryptConfirm = this.#hashConfirmPassword(getBody.confirm_password);
      try {
        const query = {
          where: { email: getBody.email },
        };
        const newData = {
          password: encrypt,
          confirm_password: encryptConfirm,
        };

        return await this.update(newData, query);
      } catch (error) {
        Promise.reject(error);
      }
    }
  }
  Users.init(
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirm_password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
