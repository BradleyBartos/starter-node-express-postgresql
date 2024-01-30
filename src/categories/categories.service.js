const knex = require("../db/connections.js");

function list() {
  return knex("categories").select("*");
}

module.exports = {
  list,
};
