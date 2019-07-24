'use strict';
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('registration', {
    teacherEmail: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'teacher',
        key: 'email'
      }
    },
    studentEmail: {
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
  })
};
