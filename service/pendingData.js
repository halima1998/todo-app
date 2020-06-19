var knex = require('../knex');

module.exports = {
    createUser:(details) => {
    return knex("users").insert(details);
   }

}