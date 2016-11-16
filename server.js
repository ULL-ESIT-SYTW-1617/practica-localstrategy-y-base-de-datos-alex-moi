
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


var apli = require(path.resolve(process.cwd(),"aplicacion.json"));

var nombre_app = apli.Config.nombre_app ;
var id_client= apli.Config.id_client;
var secret_client= apli.Config.secret_client;
var organizacion = apli.Config.organizacion;




console.log(nombre_app);
passport.use(new passgithub({
    clientID: id_client,
    clientSecret: secret_client,
    callbackURL: `https://${nombre_app}.herokuapp.com/respuesta`
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


function Organizacion (req, res, next) {
  var client = github.client({id: id_client, secret: secret_client});
  client.get(`/users/${req.user.username}/orgs`, {}, function (err, status, body, headers) {
   
    for(var j=0; j<body.length ; j++){
      //res.send(body[0].login);
      if(body[j].login === organizacion)
        return next();
    }
  
    res.render('error', {error: 'No dispones de permisos para leer el book'})
  });
}



app.get('/login',  (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')
  res.render('login')
})



app.get('/github', passport.authenticate('github'));



app.get('/respuesta',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  });


app.get('/invitado', (req, res) => {
  app.get('/gh-pages',express.static('gh-pages'))
  res.sendFile(path.join(__dirname, 'gh-pages', 'index.html'));
})


app.get('/assets/*',express.static('assets'));
app.get('*', loginin('/login'), Organizacion ,express.static('gh-pages'));
app.use((req, res) => res.render('error', {error: 'No te olvides de publicar el libro!!!!'}));


// launch ======================================================================
app.listen(port);

console.log('The magic happens on port localhost:' + port);