const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt =require('bcrypt')
const hash = bcrypt.hashSync(process.env.USER, 10)
const createUsers = require('../service/users')
const TodoService = require('../service/list');
const completeTodo = require('../service/completed_list')
const jwt = require("jsonwebtoken");


router.post('/signUp', async (req, res) => {
  await createUsers.createUser(req.body)
  .then((data) => {
     if(data.length) {
        res.send(true)
     } else {
        res.send(false)
     }  
   })
})

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
   details.isPending = true;
   await TodoService.createList(details) // It create new todo list
   .then( async (result) => {
      if(result.length) {
         const todo = await TodoService.getTodoById(result[0])
         res.send({
            data:todo
         })
      } else {
         res.send("Somthing is went wrong!")
      }  
    })

});

router.delete('/delete/:id' , async (req ,res)=>{
  await knex("list").del(req.params.id) // It delete respective todo list by id
   .then(()=>{
      res.send("data deleted")
   })

})

router.put('/update/:id' , async (req ,res)=>{
   await knex("list").where("id", req.params.id).update({ // It update respective todo list by id
      todo: req.body.todo
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

router.post('/completed/todo/:todoId', async(req, res) => {
   const todoId = req.params.todoId
   await TodoService.completeTodo(todoId)
   .then(data => {
      res.send({
         data: data
      })
     
   })
})
// router.post("/login/user", async (req, res) => {
//    bcrypt.hash(req.body.password, 10)
//    .then(hashedPassword => {
//       return knex("users").insert({
//          name:req.body.name,
//          last_name:req.body.last_name,
//          userName:req.body.userName,
//          email: req.body.email,
//          password: hashedPassword
//       })
//       .then(users => {
//          res.send("user created")
//       })
//       .catch(error => console.log(error))
//    })
// })
// router.get("/users", (req, res) => {
//    knex("users")
//    .then(users => {
//       res.json(users)
//    })
// })


router.post("/login", (req, res) => {
    knex("users")
   .where({email: req.body.email},{ password:req.body.password})
   .first()
   .then(user => {
      if(!user){
         res.status(401).json({
            error:"invalid username or password"
         })
      }
      else{
         return bcrypt
         .compare(req.body.password, user.password)
         .then(() => {
               jwt.sign({user},'secret',(err,token) => {
                  res.json({token})
               })
            })
         }
   })
})

   router.post("/verify", (req, res) => {
      const token = req.headers['authorization'].split(" ")[1]
      jwt.verify(token, 'secret', (error, data) => {
         if(error){
            res.status(401).json({
               message: "Unauthorized Access!"
            })
         } else {
            const {user} = data;
            knex('list')
            .where({users_id : user.id})
            .then(todo => {
               res.status(200).json({
                  message: "welcome to your site",
                   todo,
                  user,
               })
            })
            .catch(function (err) {
               console.error(err);
            });
         }
      })
   })

module.exports = router;