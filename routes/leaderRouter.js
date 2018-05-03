const express = require('express');

const leaderRouter = express.Router();

leaderRouter.route('/')
.get((req, res)=>{
    res.send('Will send all the leaders to you.');
})
.post((req, res)=>{
    res.send(`New leader created with name: ${req.body.name} and about: ${req.body.about}`);
})
.put((req, res)=>{
    res.status(403).send('PUT operation not supported on /leaders');
})
.delete((req, res)=>{
    res.status(403).send('Delete operation not supported on /leaders');
});

leaderRouter.route('/:leaderId')
.get((req, res)=>{
    res.send(`Will send details of the leader: ${req.params.leaderId} to you.`);
})
.post((req, res)=>{
    res.status(403).send(`POST operation not supported on /leaders/${req.params.leaderId}`);
})
.put((req, res)=>{
    res.write(`Updating the leader: ${req.params.leaderId} \n`);
    res.write(`name: ${req.body.name} and about: ${req.body.about}`);
    res.end();
})
.delete((req, res)=>{
    res.send(`Deleting leader: ${req.params.leaderId}`);
});

module.exports = leaderRouter;