"use strict";

module.exports = function(sequelize, DataTypes) {
  var BreedCollection = sequelize.define('breed_collection', {
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
  BreedCollection.associate = function(models) {
    BreedCollection.belongsTo(models.breed, {
      foreignKey: {
        allowNull: false
      }
    });
    BreedCollection.belongsTo(models.breed, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return BreedCollection;
};
