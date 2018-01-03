"use strict";

module.exports = function(sequelize, DataTypes) {
  var DogShow = sequelize.define('dog_show', {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "DogShow name is required"
          },
          len: {
            args: [1, 128],
            msg: "DogShow name should be from 1 to 128 characters length"
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
        beforeValidate: function(dogShow, options) {
          updateDogShowDateAndYear(dogShow);
        }
      }
    }
  );

  var updateDogShowDateAndYear = function(dogShow) {
    if (dogShow.isNewRecord || dogShow.changed("startDate")) {
      var dateObj = parseDogShowDate(dogShow.startDate);
      if (dateObj !== null) {
        dogShow.setDataValue("startDate", dateObj);
        var year = getDogShowYear(dateObj);
        if (year !== null) {
          dogShow.setDataValue("year", year);
        }
      }
    }
  }

  var getDogShowYear = function(startDate) {
    return typeof startDate === "object" ? startDate.getFullYear() : null;
  }

  var parseDogShowDate = function(startDate) {
    return typeof startDate === "string" ? new Date(startDate) : null;
  }

  // Class methods, new from Seq v4
  DogShow.associate = function(models) {
    DogShow.hasMany(models.achievement, {
      foreignKey: {
        allowNull: false
      }
    });
    DogShow.belongsToMany(models.dog, {
      through: models.achievement
    });
  };

  return DogShow;
};
