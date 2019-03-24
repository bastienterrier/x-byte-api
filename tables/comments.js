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

//
const getComments = async () => {
  return Comments.findAll({
    order: [['commentId', 'DESC']],
  }).then(comments => comments);
};

const addComment = async comment => {
  try {
    return Comments.create(comment).then(comment => comment);
  } catch (e) {
    throw e;
  }
};

const deleteComment = async comment => {
  // set commentStatus to 'removed'
  try {
    return Comments.update(
      {
        commentStatus: 'removed',
      },
      {
        where: {
          commentId: comment.commentId,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  Comments,
  getComments,
  addComment,
  deleteComment,
};
