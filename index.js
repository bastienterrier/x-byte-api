const express = require('express');
const asyncHandler = require('express-async-handler');

const app = express();
bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
const router = express.Router();

const seq = require('./sequelize');
const sequelize = seq.sequelize;

// Database Tables
const a = require('./tables/articles');
const u = require('./tables/users');
const c = require('./tables/courses');
const cm = require('./tables/comments');

const utils = require('./resources/utils');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

router.get('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Articles
router
  .route('/articles')
  .get(
    asyncHandler(async (req, res, next) => {
      res.json(await a.getArticles());
    })
  )
  .post(
    asyncHandler(async (req, res, next) => {
      try {
        const article = {
          articleTitle: req.body.articleTitle,
          articlePreface: req.body.articlePreface,
          articleContent: req.body.articleContent,
          articleStatus: req.body.articleStatus,
          articleWriter: req.body.articleWriter,
          articleCourse: req.body.articleCourse,
        };
        res.status(200);
        res.json(await a.addArticle(utils.nullifyEmptyProperties(article)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .delete(
    asyncHandler(async (req, res, next) => {
      try {
        const article = {
          articleId: req.body.articleId,
        };
        res.status(200);
        res.json(await a.deleteArticle(utils.nullifyEmptyProperties(article)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .put(
    asyncHandler(async (req, res, next) => {
      try {
        const article = {
          articleId: req.body.articleId,
          articleTitle: req.body.articleTitle,
          articlePreface: req.body.articlePreface,
          articleContent: req.body.articleContent,
          articleStatus: req.body.articleStatus,
        };
        res.status(200);
        res.json(await a.updateArticle(utils.removeEmptyProperties(article)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  );

// Users
router
  .route('/users')
  .get(
    asyncHandler(async (req, res, next) => {
      res.json(await u.getUsers());
    })
  )
  .post(
    asyncHandler(async (req, res, next) => {
      try {
        const user = {
          userRole: 'reader',
          userStatus: 'active',
          userPseudo: req.body.userPseudo,
          userPassword: req.body.userPassword,
        };
        res.status(200);
        res.json(await u.addUser(utils.nullifyEmptyProperties(user)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .delete(
    asyncHandler(async (req, res, next) => {
      try {
        const user = {
          userId: req.body.userId,
        };
        res.status(200);
        res.json(await u.deleteUser(utils.nullifyEmptyProperties(user)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .put(
    asyncHandler(async (req, res, next) => {
      try {
        const user = {
          userId: req.body.userId,
          userRole: req.body.userRole,
          userStatus: req.body.userStatus,
          userPseudo: req.body.userPseudo,
          userPassword: req.body.userPassword,
        };
        res.status(200);
        res.json(await u.updateUser(utils.removeEmptyProperties(user)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  );

// Courses
router
  .route('/courses')
  .get(
    asyncHandler(async (req, res, next) => {
      res.json(await c.getCourses());
    })
  )
  .post(
    asyncHandler(async (req, res, next) => {
      try {
        const course = {
          courseName: req.body.courseName,
          courseDescription: req.body.courseDescription,
          courseStatus: 'waitingForValidation',
          courseWriter: req.body.courseWriter,
        };
        res.status(200);
        res.json(await c.addCourse(utils.nullifyEmptyProperties(course)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .delete(
    asyncHandler(async (req, res, next) => {
      try {
        const course = {
          courseId: req.body.courseId,
        };
        res.status(200);
        res.json(await c.deleteCourse(utils.nullifyEmptyProperties(course)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .put(
    asyncHandler(async (req, res, next) => {
      try {
        const course = {
          courseId: req.body.courseId,
          courseDescription: req.body.courseDescription,
          courseStatus: req.body.courseStatus,
        };
        res.status(200);
        res.json(await c.updateCourse(utils.removeEmptyProperties(course)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  );

// Comments
router
  .route('/comments')
  .get(
    asyncHandler(async (req, res, next) => {
      res.json(await cm.getComments());
    })
  )
  .post(
    asyncHandler(async (req, res, next) => {
      try {
        const comment = {
          comment: req.body.comment,
          commentStatus: 'waitingForValidation',
          commentWriter: req.body.commentWriter,
          commentArticle: req.body.commentArticle,
        };
        res.status(200);
        res.json(await cm.addComment(utils.nullifyEmptyProperties(comment)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .delete(
    asyncHandler(async (req, res, next) => {
      try {
        const comment = {
          commentId: req.body.commentId,
        };
        res.status(200);
        res.json(await cm.deleteComment(utils.nullifyEmptyProperties(comment)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  )
  .put(
    asyncHandler(async (req, res, next) => {
      try {
        const comment = {
          commentId: req.body.commentId,
          comment: req.body.comment,
          commentStatus: req.body.commentStatus,
        };
        res.status(200);
        res.json(await cm.updateComment(utils.removeEmptyProperties(comment)));
      } catch (e) {
        res.status(412);
        res.json(e);
      }
    })
  );

app.use(router);

const hostname = 'localhost';
const port = 3333;
const server = app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port);
});

/*
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.broadcast.emit('message', message);
  });
});
*/
