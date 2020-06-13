var knex = require('../knex');

module.exports = {
    createList: (details) => {
        return knex('list').insert(details);
    },
    deleteTodo: (id) => {
      return knex("list").where("id", id).del()
    },
    updateTodo:(id)=>{
       return knex("list").where("id",id).update({ 
        todo: req.body.todo,
        description: req.body.description
     })
    },
    grtTodo: (id) => {
      return knex("list").where("users_id",id)
    }
}