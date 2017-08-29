"use strict";

module.exports = function(sequelize, DataTypes) {
  var Judge = sequelize.define('judge', {
      fullname: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Fullname is required"
          },
          len: {
            args: [8, 128],
            msg: "Fullname should be from 8 to 128 characters length"
          }
        }
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
  Judge.associate = function(models) {
    Judge.hasMany(models.achievement, {
      as: "marks"
    });
  };

  return Judge;
};
