const knex = require("../db/connections.js");

function create(supplier) {
  knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// for validation only
function read(supplier_id) {
  return knex("suppliers").select("*").where({ supplier_id }).first();
}

function update(updatedSupplier) {
  return knex("suppliers")
    .select("*")
    .where({ supplier_id: updatedSupplier.supplier_id })
    .update(updatedSupplier, "*");
}

function destroy(supplier_id) {
  return knex("suppliers").where({ supplier_id }).del();
}

module.exports = {
  create,
  read,
  update,
  destroy,
};
