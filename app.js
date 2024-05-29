const express = require('express');
const connectMDB = require('./config/database');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();


connectMDB();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'pug');


app.use('/', require('./routes/EasyTodosRoutes'));


app.listen(3000, function () {
    console.log('Listening on port 3000')
});


