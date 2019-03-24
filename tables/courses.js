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

//
const getCourses = async () => {
  return Courses.findAll({
    order: [['courseId', 'DESC']],
  }).then(courses => courses);
};

const addCourse = async course => {
  try {
    return Courses.create(course).then(course => course);
  } catch (e) {
    throw e;
  }
};

const deleteCourse = async course => {
  // set courseStatus to 'removed'
  try {
    return Courses.update(
      {
        courseStatus: 'removed',
      },
      {
        where: {
          courseId: course.courseId,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

module.exports = {
  Courses,
  getCourses,
  addCourse,
  deleteCourse,
};
