'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'student'
  });
};
