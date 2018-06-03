const express = require('express');
const fs = require('fs');
const multer  = require('multer');
const leaderRouter = express.Router();
const Leaders = require('../models/leaders');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        fs.mkdir(dir, err => cb(null, dir));
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });


leaderRouter.route('/')
.get((req, res,next)=>{
    Leaders.find({})
    .then((leaders) => {
        res.status(200).json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('image'), (req, res, next) =>{
    Leaders.create({
        name: req.body.name,
        image: req.file.path,
        designation: req.body.designation,
        abbr: req.body.abbr,
        description: req.body.description,
        featured: req.body.featured
    }).then((leader) => {
        res.status(400).json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res)=>{
    res.status(403).send('PUT operation not supported on /leaders');
})
.delete((req, res)=>{
    res.status(403).send('Delete operation not supported on /leaders');
});

leaderRouter.route('/:leaderId')
.get((req, res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.status(200).json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res)=>{
    res.status(403).send(`POST operation not supported on /leaders/${req.params.leaderId}`);
})
.put((req, res, next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.status(200).json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader) => {
        res.status(200).json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;