"use strict";

module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define('entry', {
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

  return Entry;
};
