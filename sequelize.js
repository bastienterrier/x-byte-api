const Sequelize = require('sequelize');
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

module.exports = {
  sequelize,
};
