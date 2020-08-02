var knex = require('../knex');

module.exports = {
    createList: (details) => {
        return knex('list').insert(details);
    },
    createList2: (detailsTrush) => {
      return knex('trush').insert(detailsTrush);
  },
    deleteTodo: (id) => {
      return knex("list").where("id", id).del()
    },
    updateTodo:(id)=>{
       return knex("list").where("id",id).update({ 
        todo: req.body.todo,
     })
    },
    getTodo: (id) => {
      return knex("list").where("users_id",id)
    },
    completeTodo: (todoId) => {
      return knex("list").update({
        isPending: false
      }).where('id', todoId)
    },
    getTodoById: (todo_id) =>{
      return knex("list").where("id",todo_id)
    }
}