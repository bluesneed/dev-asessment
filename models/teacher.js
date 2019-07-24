'use strict';
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('teacher', {
        email: {
            type: DataTypes.STRING(254),
            allowNull: false,
            primaryKey: true
        }
    }, {
        tableName: 'teacher'
    });
    Teacher.associate = function (models) {
        Teacher.belongsToMany(models.student, {
            through: 'registration',
            as: 'students',
            otherKey: 'studentEmail',
            foreignKey: 'teacherEmail',
        });
    };
    return Teacher

};
