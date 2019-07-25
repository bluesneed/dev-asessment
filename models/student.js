'use strict';
module.exports = function(sequelize, DataTypes) {
  const Student = sequelize.define('student', {
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'student'
  });
  Student.associate = function (models) {
    Student.belongsToMany(models.teacher, {
      through: 'registration',
      as: 'teacher',
      otherKey: 'teacherEmail',
      foreignKey: 'studentEmail',
    });
  };

  return Student
};
