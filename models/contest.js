"use strict";

module.exports = function(sequelize, DataTypes) {
  var Contest = sequelize.define('contest', {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Contest name is required"
          },
          len: {
            args: [1, 128],
            msg: "Contest name should be from 1 to 128 characters length"
          }
        }
      },
      startDate: { 
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Start date is required"
          }
        }
      },
      year: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Year is required"
          }
        }
      },
      address: { 
        type: DataTypes.STRING, 
        allowNull: true
      },
      note: { 
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { 
      underscored: true,
      freezeTableName: true,
      hooks: {
        beforeCreate: function(contest, options) {
          updateContestDateAndYear(contest);
        },
        beforeUpdate: function(contest, options) {
          updateContestDateAndYear(contest);
        }
      }
    }
  );

  var updateContestDateAndYear = function(contest) {
    contest.setDataValue("startDate", parseContestDate(contest.startDate));
    contest.setDataValue("year", getContestYear(contest.startDate));
  }

  var getContestYear = function(startDate) {
    return typeof startDate === "object" ? startDate.getFullYear() : null;
  }

  var parseContestDate = function(startDate) {
    return typeof startDate === "string" ? new Date(startDate) : null;
  }

  // Class methods, new from Seq v4
  Contest.associate = function(models) {
    Contest.hasMany(models.achievement, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Contest.belongsToMany(models.dog, {
      through: models.achievement,
      as: "dogs"
    });
  };

  return Contest;
};
