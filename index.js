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
  );

router.get(
  '/users',
  asyncHandler(async (req, res, next) => {
    res.json(await u.getUsers());
  })
);

router.get(
  '/courses',
  asyncHandler(async (req, res, next) => {
    res.json(await c.getCourses());
  })
);

router.get(
  '/comments',
  asyncHandler(async (req, res, next) => {
    res.json(await cm.getComments());
  })
);

app.use(router);

const hostname = 'localhost';
const port = 3333;
const server = app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port);
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.on('message', function(message) {
    socket.broadcast.emit('message', message);
  });
});
