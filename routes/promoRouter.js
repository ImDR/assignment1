const express = require('express');

const promoRouter = express.Router();

promoRouter.route('/')
.get((req, res)=>{
    res.send('Will send all the promotions to you.');
})
.post((req, res)=>{
    res.send(`New promotion created with name: ${req.body.name} and description: ${req.body.description}`);
})
.put((req, res)=>{
    res.status(403).send('PUT operation not supported on /promotions');
})
.delete((req, res)=>{
    res.status(403).send('Delete operation not supported on /promotions');
});

promoRouter.route('/:promoId')
.get((req, res)=>{
    res.send(`Will send details of the promotion: ${req.params.promoId} to you.`);
})
.post((req, res)=>{
    res.send(`POST operation not supported on /promotions/${req.params.promoId}`);
})
.put((req, res)=>{
    res.write(`Updating the promotion: ${req.params.promoId} \n`);
    res.write(`name: ${req.body.name} and description: ${req.body.description}`);
    res.end();
})
.delete((req, res)=>{
    res.send(`Deleting promotion: ${req.params.promoId}`);
});

module.exports = promoRouter;