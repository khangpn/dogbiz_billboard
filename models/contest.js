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
      freezeTableName: true
    }
  );

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
