const seq = require('../sequelize');
const Sequelize = require('sequelize');
const sequelize = seq.sequelize;

const enums = require('./enums');

const Users = sequelize.define('users', {
  userId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userRole: {
    type: enums.RoleEnum,
    allowNull: false,
  },
  userStatus: {
    type: enums.UserStatusEnum,
    allowNull: false,
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

const deleteUser = async user => {
  // set userStatus to 'banned'
  try {
    return Users.update(
      {
        userStatus: 'banned',
      },
      {
        where: {
          userId: user.userId,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

const updateUser = async user => {
  try {
    return Users.update(user, {
      where: {
        userId: user.userId,
      },
    }).then(user => user);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  Users,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
