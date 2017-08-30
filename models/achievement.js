"use strict";
var calculateScore = require('../lib/score-helper');

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
      dogClass: { 
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "n/a",
        validate: {
          notEmpty: {
            msg: "Achievement's dog class is required"
          },
          len: {
            args: [1, 128],
            msg: "Achievement's dog class should be from 1 to 128 characters length"
          }
        }
      },
      round: { 
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "n/a",
        validate: {
          notEmpty: {
            msg: "Achievement winning round is required"
          },
          len: {
            args: [1, 128],
            msg: "Achievement winning round should be from 1 to 128 characters length"
          }
        }
      },
      category: { 
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "n/a",
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
        defaultValue: 0,
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
      freezeTableName: true,
      hooks: {
        beforeValidate: function(achievement, options) {
          updateScore(achievement);
        },
        beforeDestroy: function(achievement, options) {
          return achievement.getDog().then(function(dog) {
            if (!dog) throw new Error("Can't find the dog with id: " + achievement.dog_id);
            let score = dog.score;
            score -= achievement.score;
            dog.setDataValue("score", score);
            return dog.save().then(function(dog) {
              return sequelize.Promise.resolve();
            }).catch ( function(error){
              return sequelize.Promise.reject(error);
            });
          }).catch ( function(error){
            return sequelize.Promise.reject(error);
          });
        },
        beforeCreate: function(achievement, options) {
          return achievement.getDog().then(function(dog) {
            if (!dog) throw new Error("Can't find the dog with id: " + achievement.dog_id);
            let score = dog.score;
            score += achievement.score;
            dog.setDataValue("score", score);
            return dog.save().then(function(dog) {
              return sequelize.Promise.resolve();
            }).catch ( function(error){
              return sequelize.Promise.reject(error);
            });
          }).catch ( function(error){
            return sequelize.Promise.reject(error);
          });
        }
      }
    }
  );

  var updateScore = achievement => {
    if (achievement.isNewRecord || achievement.changed("rank")) {
      achievement.setDataValue("score", calculateScore(achievement.rank));
    }
  }

  // Class methods, new from Seq v4
  Achievement.associate = function(models) {
    Achievement.belongsTo(models.dog, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Achievement.belongsTo(models.contest, {
      foreignKey: {
        allowNull: false
      }
    });
    Achievement.belongsTo(models.judge, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Instance methods, from Seq v4
  // TODO: update the algorithm to calculate score
  //Achievement.prototype.calculateScore = function() {
  //  this.setDataValue("score",  10);
  //};

  return Achievement;
};
