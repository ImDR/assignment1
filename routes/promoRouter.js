const express = require('express');
const fs = require('fs');
const promoRouter = express.Router();
const multer  = require('multer');
const Promotions = require('../models/promotions');

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

promoRouter.route('/')
.get((req, res, next)=>{
    Promotions.find({})
    .then((promotions) => {
        res.status(200).json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(upload.single('image'), (req, res, next)=>{
    Promotions.create({
        name: req.body.name,
        image: req.file.path,
        label: req.body.label,
        price: req.body.price,
        description: req.body.description,
        featured: req.body.featured
    }).then((promotion) => {
        res.status(200).json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res)=>{
    res.status(403).send('PUT operation not supported on /promotions');
})
.delete((req, res)=>{
    res.status(403).send('Delete operation not supported on /promotions');
});

promoRouter.route('/:promoId')
.get((req, res, next)=>{
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.status(200).json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res)=>{
    res.status(403).send(`POST operation not supported on /promotions/${req.params.promoId}`);
})
.put((req, res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.status(200).json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promotion) => {
        res.status(200).json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;