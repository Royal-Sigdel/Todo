const express = require('express');
const connectMDB = require('./config/database');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Connect to database
connectMDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to Pug
app.set('view engine', 'pug');

// Routes
app.use('/', require('./routes/EasyTodosRoutes'));

// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000')
});


