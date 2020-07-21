var knex = require('../knex');

module.exports = {
    createList: (details) => {
        console.log(details)
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
    getTodo: (id) => {
      return knex("list").where("users_id", id)
    },
    completeTodo: (todoId) => {
      return knex("list").update({
        isPending: false
      }).where('id', todoId)
    },
    getTodoById: (todo_id) => {
      return knex("list").where("id", todo_id)
    }
}