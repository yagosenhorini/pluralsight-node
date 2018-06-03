const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
let port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, () => {
  debug(`Library App listening the port ${chalk.green(port)}`);
  console.log(`Library App listening the port ${chalk.green(port)}`);
});
