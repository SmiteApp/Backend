const db = require("../database/dbConfig.js")

module.exports = {
    add,
    findBy,
    getAll,
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return ({message: "user created"})
}

function findBy(filter) {
    return db("users").where(filter)
}

function getAll() {
    return db("users")
}