const seq = require('../sequelize');
const Sequelize = require('sequelize');
const sequelize = seq.sequelize;
const enums = require('./enums');
const statusEnum = enums.StatusEnum;

const u = require('./users');
const Users = u.Users;

const Courses = sequelize.define('courses', {
  courseId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  courseDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  courseStatus: {
    type: statusEnum,
    allowNull: false,
  },
  courseWriter: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'userId',
    },
  },
});

module.exports = {
  Courses,
};
