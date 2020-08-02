var knex = require('../knex');

module.exports = {
    createList: (details) => {
        console.log(details)
        return knex('trush').insert(details);
    },
    getTodoById: (todo_id) =>{
        return knex("trush").where("id",todo_id)
      }
}