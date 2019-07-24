'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all(
            [
                queryInterface.createTable("teacher", {
                    email: {
                        type: Sequelize.STRING(254),
                        allowNull: false,
                        primaryKey: true
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                }),
                queryInterface.createTable("student", {
                    email: {
                        type: Sequelize.STRING(254),
                        allowNull: false,
                        primaryKey: true
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                }),

                queryInterface.createTable("registration", {
                    teacherEmail: {
                        type: Sequelize.STRING(254),
                        allowNull: false,
                        primaryKey: true,
                        references: {
                            model: 'teacher',
                            key: 'email'
                        }
                    },
                    studentEmail: {
                        type: Sequelize.STRING(254),
                        allowNull: false,
                        primaryKey: true,
                        references: {
                            model: 'student',
                            key: 'email'
                        }
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    }
                })])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.dropTable('teacher'),
            queryInterface.dropTable('student'),
            queryInterface.dropTable('registration')

        ])

    }
};
