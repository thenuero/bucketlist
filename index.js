//In this file, I'll only be creating a rest apis with express js
const express = require ('express');
const path = require ('path');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const listsRoute = require('./Routes/Lists');
const usersRoute = require('./Routes/Users');
const cors = require('cors');

//Create the app
const app = express();

//Using middleware
//app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/list', listsRoute);
app.use('/user', usersRoute);

app.get('/',(req,res) =>{
  res.sendFile(path.join(__dirname,'public','bucketlist.html'));
})

//Connect to Database
mongoose.connect(process.env.ATLAS_URI,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
  () => console.log('Connected to DB...'));

app.listen(PORT,() =>{
  console.log(`Listening on ${PORT}`);
})
