const Sequelize = require("sequelize");

/**
 * @type {import('sequelize').Sequelize}
 */
exports.sequelize = new Sequelize({
  host: "localhost",
  port: "3306",
  username: "root",
  dialect: "mysql",
  database: "miniour",
});
