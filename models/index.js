const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//const Dishes = require('./dishes');

const url = 'mongodb://localhost:27017/coursera';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to database server');
}).catch((err)=>{
    console.log(err);
});