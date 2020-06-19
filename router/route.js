const express = require('express');
const router = express.Router();
const knex = require('../knex');
const createUser = require('../service/users')
const TodoService = require('../service/list');
const completeTodo = require('../service/completed_list');

router.post('/singUp' , async (req, res) => {
  await createUser(req.body) //  creating new user.
  .then((data) => {
     if(data.length) {
        res.send("New user is created!")
     } else {
        res.send("Somthing is went wrong!")
     }  
   })
});

// demo route
router.get('/complete_todo', async (req, res) => {
   await completeTodo.createCompleted_list()
   .then(data => {
      res.send(data)
   })
})

router.get('/get/all/users', async (req, res) => {
   await knex("users") // get all users from database
   .then((data) => {
      res.send(data)
   })
})

router.post('/add/todo' , async(req, res) => {
   const details = req.body;
   details.isPending = true
   await TodoService.createList(details) // It create new todo list
   .then((result) => {
      if(result.length) {
         res.send("data inserted!")
      } else {
         res.send("Somthing is went wrong!")
      }  
    })

});

router.delete('/delet/todo/:id' , async (req ,res)=>{
  await knex("list").where("id", req.params.id).del() // It delete respective todo list by id
   .then(()=>{
      res.send("data deleted")
   })

})

router.put('/update/todo/:id' , async (req ,res)=>{
   await knex("list").where("id", req.params.id).update({ // It update respective todo list by id
      todo: req.body.todo,
      description: req.body.description
   })
    .then(()=>{
       res.send("data update")
    })
 })

 router.get('/get/all/todo/:users_id' , async (req ,res)=>{
   await knex("list").where("users_id", req.params.users_id) // get all todo list of respective user by user_id
   .then((allTodo) => {
      res.send(allTodo)
   })
 });
 
 router.post('/completed_list' , async(req, res) =>{
   await TodoService.createCompleted_list(req.body) // It create new completed list
   .then((result) => {
      if(result.length) {
         res.send("data inserted!")
      } else {
         res.send("Somthing is went wrong!")
      }  
    })

});

router.post('/completed/todo/:todoId', async(req, res) => {
   const todoId = req.params.todoId
   await TodoService.completeTodo(todoId)
   .then(data => {
      res.send({
         data: data
      })
   })
})

module.exports = router;