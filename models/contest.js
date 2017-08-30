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
        beforeValidate: function(contest, options) {
          updateContestDateAndYear(contest);
        }
      }
    }
  );

  var updateContestDateAndYear = function(contest) {
    if (contest.isNewRecord || contest.changed("startDate")) {
      var dateObj = parseContestDate(contest.startDate);
      if (dateObj !== null) {
        contest.setDataValue("startDate", dateObj);
        var year = getContestYear(dateObj);
        if (year !== null) {
          contest.setDataValue("year", year);
        }
      }
    }
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
      foreignKey: {
        allowNull: false
      }
    });
    Contest.hasMany(models.entry, {
      foreignKey: {
        allowNull: false
      }
    });
    Contest.belongsToMany(models.dog, {
      through: models.entry
    });
  };

  return Contest;
};
