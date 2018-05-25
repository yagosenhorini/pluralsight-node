var express = require('express');
<<<<<<< HEAD
var chalk = require('chalk');
var debug = require('debug')('app');

var app = express();


=======

var app = express();

>>>>>>> dabe69d71ca20e9c41794d436f34dffefbe81030
app.get('/', (req, res)=>{
    res.send('Hello from my library app');
});

port = process.env.PORT || 3000;

app.listen(port, ()=>{
<<<<<<< HEAD
    debug(`Library App listening the port ${chalk.green(port)}`);
=======
    console.log('Library App using the port ' +port);
>>>>>>> dabe69d71ca20e9c41794d436f34dffefbe81030
});