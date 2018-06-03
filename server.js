const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
let port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Node Library App', list: ['a','b'] });
});

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () => {
  debug(`Library App listening the port ${chalk.green(port)}`);
  console.log(`Library App listening the port ${chalk.green(port)}`);
});
