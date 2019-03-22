const seq = require('../sequelize');
const Sequelize = require('sequelize');
const sequelize = seq.sequelize;

const enums = require('./enums');
const RoleEnum = enums.RoleEnum;

const Users = sequelize.define('users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userRole: {
    type: RoleEnum,
    allowNull: false,
  },
  userIsMute: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  userMuteReason: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  userPseudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//
const getUsers = async () => {
  return Users.findAll({
    order: [['userId', 'DESC']],
  }).then(users => users);
};

const addUser = async user => {
  try {
    return Users.create(user).then(user => user);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  Users,
  getUsers,
  addUser,
};
