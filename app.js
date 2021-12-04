const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const connectionString = process.env.DATABASE_CONNECTION_STRING;

const app = express();

const store = new MongoDBStore({
    uri: connectionString,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({
   extended: false
 }));
 app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))


app.set('view engine', 'ejs');
app.set('views', 'views');

// Controllers

// Routes
// const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const weatherRoutes = require('./routes/weather');
app.use(flash());

app.use('/auth', authRoutes);
app.use('/weather', weatherRoutes);



app.use(express.static(path.join(__dirname, 'public')));

// app.use(errorController.get404);

mongoose.connect(connectionString)
    .then(result => {
        app.listen(3000);
        console.log('Connected to database');
    })
   .catch(err => console.log(err));