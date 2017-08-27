"use strict";

module.exports = function(sequelize, DataTypes) {
  var Breed = sequelize.define('breed', {
      fci: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true
      },
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
      section: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
          len: {
            args: [0, 128],
            msg: "Section should be less than 128 characters length"
          }
        }
      },
      country: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
          len: {
            args: [0, 32],
            msg: "Country should be less than 32 characters length"
          }
        }
      },
      url: { 
        type: DataTypes.STRING, 
        allowNull: true,
        isUrl: true,
        validate: {
          len: {
            args: [0, 128],
            msg: "URL should be less than 128 characters length"
          }
        }
      },
      image: { 
        type: DataTypes.STRING, 
        allowNull: true,
        isUrl: true,
        validate: {
          len: {
            args: [0, 128],
            msg: "Image should be less than 128 characters length"
          }
        }
      },
      pdf: { 
        type: DataTypes.STRING, 
        allowNull: true,
        isUrl: true,
        validate: {
          len: {
            args: [0, 128],
            msg: "PDF should be less than 128 characters length"
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
