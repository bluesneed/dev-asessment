'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher', {
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'teacher'
  });
};
