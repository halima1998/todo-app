const Knex = require('./knex');
const express = require('express');
const app = express();

app.listen(3000, ()=> {
    console.log("server is running on 3000")
})
