"use strict";

module.exports = function(sequelize, DataTypes) {
  var Achievement = sequelize.define('achievement', {
      rank: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Rank is required"
          }
        }
      },
      category: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Achievement category is required"
          },
          len: {
            args: [1, 128],
            msg: "Achievement category should be from 1 to 128 characters length"
          }
        }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Score is required"
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
  Achievement.associate = function(models) {
    Achievement.belongsTo(models.dog, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Achievement.belongsTo(models.contest, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Instance methods, from Seq v4
  // TODO: update the algorithm to calculate score
  Achievement.prototype.calculateScore = function() {
    this.setDataValue("score",  10);
  };

  return Achievement;
};
