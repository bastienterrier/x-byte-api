const express = require('express');
const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');

const app = express();
const router = express.Router();

require('dotenv').config({ path: 'config.env' });

const con = {
  host: 'localhost',
  user: 'root',
  password: process.env.SQL_PASSWD,
  database: 'x_byte',
  port: 3306,
};

const sequelize = new Sequelize(con.database, con.user, con.password, {
  host: con.host,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Article = sequelize.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const getArticles = async () => {
  return Article.findAll({
    order: [['id', 'DESC']],
  }).then(articles => {
    return articles;
  });
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

app.use(router);

const hostname = 'localhost';
const port = 3333;
app.listen(port, hostname, function() {
  console.log('Server running at http://' + hostname + ':' + port);
});
