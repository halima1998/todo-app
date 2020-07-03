const express = require('express');
var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var route = require('./router/route.js');
const { response } = require('express');
const cors = require('cors');
const bcrypt =require('bcrypt');
// jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
//     console.log(token);
//   });
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000'}));

app.use('/', route);
// app.use('/',app);
app.listen(8080, () => {
    console.log("server is running on 8080")
})
