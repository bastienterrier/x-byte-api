const seq = require('../sequelize');
const Sequelize = require('sequelize');
const sequelize = seq.sequelize;
const enums = require('./enums');
const statusEnum = enums.StatusEnum;

const u = require('./users');
const Users = u.Users;

const a = require('./articles');
const Articles = a.Articles;

const Comments = sequelize.define('comments', {
  commentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  commentStatus: {
    type: statusEnum,
    allowNull: false,
  },
  commentWriter: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: 'userId',
    },
  },
  commentArticle: {
    type: Sequelize.INTEGER,
    references: {
      model: Articles,
      key: 'articleId',
    },
  },
});

module.exports = {
  Comments,
};
