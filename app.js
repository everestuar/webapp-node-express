const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000
const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');

app.use(morgan('tiny')) // limitar salida
app.use(express.static(path.join(__dirname + '/public/'))); //para servir contenido estático, sino lo encuentra entonces procede a la siguiente línea

app.set('views', './src/views');    // para indicar donde estan las views
app.set('view engine', 'ejs');      // motor a utilizar para las views y buscar templates

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });    // res.send('Hello from my app')
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`) // template strings
});

