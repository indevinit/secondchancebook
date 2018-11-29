const express = require( 'express');
const cors = require ('cors');
const mongoose = require( 'mongoose');
const bodyparser = require( 'body-parser');
const session= require('express-session');
const app = express();
const controller = require('./controller/controller');

app.use(bodyparser.json());


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
 
app.use(
    cors({
      origin: ["http://localhost:3000" , "https://client-secondchancebook.herokuapp.com"],
      methods:["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],    
      credentials: true //allow setting of cookies
    })
  );
mongoose.connect("mongodb://indevinit:restart14@ds243502.mlab.com:43502/secondchancebook")   
app.use(session({
  secret: 'supersecretstring12345!',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: (60000*30) },
  
}))


controller(app);


app.listen( process.env.PORT || 8000, ()=>{console.log('Listening...')})
