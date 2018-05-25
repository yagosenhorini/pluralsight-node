var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');

var app = express();

app.get('/', (req, res)=>{
    res.send('Hello from my library app');
});

port = process.env.PORT || 3000;

app.listen(port, ()=>{
    debug(`Library App listening the port ${chalk.green(port)}`);
    console.log(`Library App listening the port ${chalk.green(port)}`);
});