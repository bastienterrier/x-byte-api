const express = require('express');
const asyncHandler = require('express-async-handler');

const app = express();
const router = express.Router();

const seq = require('./sequelize');
const sequelize = seq.sequelize;

const a = require('./tables/articles');
const Articles = a.Articles;

const u = require('./tables/users');
const Users = u.Users;

const c = require('./tables/courses');
const Courses = c.Courses;

const cm = require('./tables/comments');
const Comments = cm.Comments;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//
const getArticles = async () => {
  return Articles.findAll({
    order: [['articleId', 'DESC']],
  }).then(articles => articles);
};

//
const getUsers = async () => {
  return Users.findAll({
    order: [['userId', 'DESC']],
  }).then(users => users);
};

//
const getCourses = async () => {
  return Courses.findAll({
    order: [['courseId', 'DESC']],
  }).then(courses => courses);
};

//
const getComments = async () => {
  return Comments.findAll({
    order: [['commentId', 'DESC']],
  }).then(comments => comments);
};

router.get('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get(
  '/articles',
  asyncHandler(async (req, res, next) => {
    res.json(await getArticles());
  })
);

router.get(
  '/users',
  asyncHandler(async (req, res, next) => {
    res.json(await getUsers());
  })
);

router.get(
  '/courses',
  asyncHandler(async (req, res, next) => {
    res.json(await getCourses());
  })
);

router.get(
  '/comments',
  asyncHandler(async (req, res, next) => {
    res.json(await getComments());
  })
);

app.use(router);

const hostname = 'localhost';
const port = 3333;
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port);
});
