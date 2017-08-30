"use strict";

module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('entry', {
      id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
  Entry.associate = function(models) {
    Entry.hasMany(models.achievement, {
      onDelete: "SET NULL"
    });
    Entry.belongsTo(models.dog, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Entry.belongsTo(models.contest, {
      onDelete: "SET NULL"
    });
  };

  return Entry;
};
