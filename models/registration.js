'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registration', {
    teacher: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'teacher',
        key: 'email'
      }
    },
    student: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'student',
        key: 'email'
      }
    }
  }, {
    tableName: 'registration'
  });
};
