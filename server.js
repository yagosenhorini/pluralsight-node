var express = require('express');

var app = express();

app.get('/', (req, res)=>{
    res.send('Hello from my library app');
});

port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('Library App using the port ' +port);
});