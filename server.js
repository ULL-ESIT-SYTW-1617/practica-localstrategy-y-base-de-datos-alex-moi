// server.js

// set up ======================================================================
// get all the tools we need

var port     = process.env.PORT || 8080;
var express = require("express");
var app      = express();
var path = require('path');
var passport = require('passport');
var passgithub = require('passport-github').Strategy;
var github = require ('octonode');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var loginin = require('connect-ensure-login').ensureLoggedIn;

var paque = require(path.resolve(process.cwd(),".token_heroku","token.json"));

var id_client= "--insert-github-client-id-here--";
var secret_client= "--insert-github-client-secret-here--";
var organizacion = "--insert-github-organizacion";

var nombre_app = paque.Heroku.token_app;

passport.use(new passgithub({
    clientID: id_client,
    clientSecret: secret_client,
    callbackURL: `https://${nombre_app}.herokuapp.com/`
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
        process.nextTick(function () {
       
          return done(null, profile);
        });
   }));
   
 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'));

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

function middlewareOrganization (req, res, next) {
  var cliente = github.client({id: id_client, secret: secret_client})

  cliente.get(`/users/${req.user.username}/orgs`, {}, function (err, status, body, headers) {
    for(let org of body) {
      if (org.login === organizacion) {
        return next()
      }
    }
    res.render('error', {error: 'No dispones de permisos para leer el book'})
  });
}




app.get('/', function(req, res) {
	res.render('index.ejs');
});
app.get('/login', passport.authenticate('github'));

app.get('/login/return',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/book');
  });


app.get('*', loginin('/login'), middlewareOrganization,express.static('gh-pages'));

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port localhost:' + port);