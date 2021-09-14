const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000
const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');

app.use(morgan('tiny')) // limitar salida
app.use(express.static(path.join(__dirname + '/public/'))); //para servir contenido estático, sino lo encuentra entonces procede a la siguiente línea
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'globomantics'})); //usado para encoded de la cookie

require('./src/config/passport.js')(app)

app.set('views', './src/views');    // para indicar donde estan las views
app.set('view engine', 'ejs');      // motor a utilizar para las views y buscar templates

app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render('index', { title: 'Globomantics', data: ['a', 'b', 'c'] });    // res.send('Hello from my app')
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.green(PORT)}`) // template strings
});

