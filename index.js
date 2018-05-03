const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);

const server = http.createServer(app).listen(1230, 'localhost', function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log(`App listening at http://${host}:${port}`);
});
