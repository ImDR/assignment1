const express = require('express');

const dishRouter = express.Router();

dishRouter.route('/')
.get((req, res)=>{
    res.send('Will send all the dishes to you.');
})
.post((req, res)=>{
    res.send(`New dish created with name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res)=>{
    res.status(403).send('PUT operation not supported on /dishes');
})
.delete((req, res)=>{
    res.status(403).send('Delete operation not supported on /dishes');
});

dishRouter.route('/:dishId')
.get((req, res)=>{
    res.send(`Will send details of the dish: ${req.params.dishId} to you.`);
})
.post((req, res)=>{
    res.send(`POST operation not supported on /dishes/${req.params.dishId}`);
})
.put((req, res)=>{
    res.write(`Updating the dish: ${req.params.dishId} \n`);
    res.write(`name: ${req.body.name} and description: ${req.body.description}`);
    res.end();
})
.delete((req, res)=>{
    res.send(`Deleting dish: ${req.params.dishId}`);
});

module.exports = dishRouter;