var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var handler = require('./lib/request-handler');
var util = require('./lib/utility.js');
var cors = require('cors');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());
app.use(cors());



/////////////////////////////////////////////////////////////////
//AUTHENTICATION
//express session
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true,
}));


//endpoint for client request for current session's validity
//if current session logged in: respond with logged in user's information to client (status code: 200)
//if current session is not logged in: response with (status:code 401)
app.get('/login', util.checkUser);

//endpoint for user attempting to login with {username, password}
app.post('/login', handler.userLogin);

//handles user logout action
app.get('/logout', handler.userLogout);

/////////////////////////////////////////////////////////////////
app.post('/queryGoogle', handler.queryGoogle);

/////////////////////////////////////////////////////////////////

//handles user signup action
app.post('/signup/:username', handler.userSignup);

app.post('/queryGoogle', handler.queryGoogle);


//endpoints for adding and deleteing 'monitored keywords' for a particular user with :username
/////////////////////////////////////////////////////////////////
app.put('/user/:username/keywords', handler.insertWordMonitor);

app.delete('/user/:username/keywords', handler.deleteWordMonitor);
/////////////////////////////////////////////////////////////////

//server up static files
app.use(express.static(path.join(__dirname + '/../client')));

//handles bill search
app.post('/searchterm', handler.termSearch);

// gets meetups from meetup.com api.
app.get('/getMeetups', handler.getMeetups);

module.exports = app;
