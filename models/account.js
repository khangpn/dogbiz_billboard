"use strict";

var bcrypt = require('bcrypt');
/*
* id, createdAt, updatedAt will be generated automatichally
*/
module.exports = function(sequelize, DataTypes) {
  var encryptPassword = function(account){
    if (account.changed('password')) {
      account.password = account.password_confirm = bcrypt.hashSync(account.password, 8);
    }
    return account;
  }

  var Account = sequelize.define("account", {
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email format is invalid"
          },
          notEmpty: {
            msg: "Email is required"
          }
        }
      },
      is_admin: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required"
          },
          len: {
            args: [8, 128],
            msg: "Password should be from 8 to 128 characters length"
          }
        }
      },
      password_confirm: { 
        type: DataTypes.VIRTUAL,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password confirmation is required"
          },
          len: {
            args: [8, 128],
            msg: "Password confirmation should be from 8 to 128 characters length"
          }
        }
      }
    }, 
    { 
      underscored: true,
      freezeTableName: true,
      hooks: {
        beforeCreate: function(account, options) {
          // account is passed by ref.
          encryptPassword(account);
        },
        beforeUpdate: function(account, options) {
          encryptPassword(account);
        }
      }
    }
  );

  // Class methods, new from Seq v4
  Account.associate = function(models) {
    Account.hasOne(models.token, {
      onDelete: "CASCADE",
      hooks: true, // for onDelete
      foreignKey: {
        allowNull: false
      }
    });
    Account.hasOne(models.admin, {
      onDelete: "CASCADE"
    });
  };

  // Instance method, from Seq v4
  Account.prototype.checkPasswordMatch = function(p, cb) {
    bcrypt.compare(p, this.password, 
      function(err, result) {
      if (err) return cb(err);
      return cb(null, result);
    });
  };
  Account.prototype.authenticate = function(auth, cb) {
    if (this.name !== auth.name){
      return cb(false);
    }

    bcrypt.compare(auth.password, this.password, 
      function(err, result) {
      if (err) return cb(err);
      return cb(null, result);
    });
  };

  return Account;
};
