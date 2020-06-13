var knex = require('../knex');

module.exports = {
    createUser:(details) => {
    return knex("users").insert(details);
},
getUsers: () =>{
    return knex("users")
}
}