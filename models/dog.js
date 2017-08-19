"use strict";

module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define('dog', {
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
      birthday: { 
        type: DataTypes.DATEONLY, 
        allowNull: false
      },
      gender: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false //true: male, false: female
      },
      parents: { 
        type: DataTypes.STRING, 
        allowNull: true
      },
      address: { 
        type: DataTypes.STRING, 
        allowNull: true
      },
      photo: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      score: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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
  Dog.associate = function(models) {
    Dog.belongsTo(models.breed, {
      onDelete: "SET NULL"
    });
    Dog.hasMany(models.achievement, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Dog;
};
