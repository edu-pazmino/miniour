const Sequelize = require("sequelize");

/**
 * @type {import('sequelize').Sequelize}
 */
exports.sequelize = new Sequelize({
  host: "127.0.0.1",
  // port: "3306",
  username: "root",
  dialect: "mysql",
  database: "miniour",
});
