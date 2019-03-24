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

//
const getArticles = async () => {
  return Articles.findAll({
    order: [['articleId', 'DESC']],
  }).then(articles => articles);
};

const addArticle = async article => {
  try {
    return Articles.create(article).then(article => article);
  } catch (e) {
    throw e;
  }
};

const deleteArticle = async article => {
  // set articleStatus to 'removed'
  try {
    return Articles.update(
      {
        articleStatus: 'removed',
      },
      {
        where: {
          articleId: article.articleId,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  Articles,
  getArticles,
  addArticle,
  deleteArticle,
};
