"use strict";

module.exports = function(sequelize, DataTypes) {
  var Breed = sequelize.define('breed', {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          },
          len: {
            args: [1, 128],
            msg: "Name should be from 1 to 128 characters length"
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
  Breed.associate = function(models) {
    Breed.hasMany(models.dog, {});
    
    Breed.belongsToMany(Breed, {
      through: models.breed_collection,
      as: "subBreeds"
    });
  };

  return Breed;
};
