const seq = require('../sequelize');
const Sequelize = require('sequelize');
const sequelize = seq.sequelize;
const enums = require('./enums');
const statusEnum = enums.StatusEnum;

const u = require('./users');
const Users = u.Users;

const c = require('./courses');
const Courses = c.Courses;

const Articles = sequelize.define('articles', {
  articleId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  articleTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  articlePreface: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  articleContent: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  articleStatus: {
    type: statusEnum,
    allowNull: false,
  },
  articleWriter: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'userId',
    },
  },
  articleCourse: {
    type: Sequelize.INTEGER,
    references: {
      model: Courses,
      key: 'courseId',
    },
  },
});

module.exports = {
  Articles,
};
