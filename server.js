// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require('./config/db.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('express-session')({
    secret: 'hellyeah',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(express.static('public'));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
var User = require('./models/user.js');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Register routes
app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/votes.js'));

app.use((req, res) => {
   res.sendStatus(404);     
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
