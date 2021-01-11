const db = require("../database/dbConfig");

function get() {
  return db("users");
}
function getById(id) {
  return db("users").where({ id }).first();
}


function add(user) {
  return db("users").insert(user)
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => getById(id));
}

function remove(id) {
  return db("users").where("id", id).del();
}


module.exports = {
  get,
  getById,
  add,
  update,
  remove,
};