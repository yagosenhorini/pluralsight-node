const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const app = express();
const sql = require('mssql');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

const bookRouter = require('./src/routes/bookRoutes')(nav);

let port = process.env.PORT || 3000;

const config ={
  user: 'acervo',
  password: '@minu182',
  server: 'acervomakeup.cfvz4znt58oa.sa-east-1.rds.amazonaws.com',
  database: 'ps_library',

  options:{
    encrypt: true
  }
};
sql.connect(config).catch(err => console.log("erro! " + debug(err)));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'Node Library App',
      nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }]
    }
  );
});


app.listen(port, () => {
  debug(`Library App listening the port ${chalk.green(port)}`);
  console.log(`Library App listening the port ${chalk.green(port)}`);
});
