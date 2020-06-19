const express = require('express');
var bodyParser=require('body-parser');
var route = require('./router/route.js');
const { response } = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.get('/', (req,res)=>{
//     res.send("hello")
// });
app.use('/', route);
app.listen(3000, ()=> {
    console.log("server is running on 3000")
})
