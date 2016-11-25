// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;

// load up the user model
var User       = require('../app/models/user');

var path = require('path');
var bcrypt = require("bcrypt-nodejs")
var Dropbox2 = require("node-dropbox")
var config = require(path.resolve(process.cwd(),".datos_dropbox.json"));
var api = Dropbox2.api(config.token_dropbox);


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

/*ALEX
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
    cb(null, user);
});

    passport.use(new LocalStrategy(
        function(username,password,cb,err){
            var existe= false;
            var j;
            
             api.getFile('/'+config.ruta_dropbox+'.json', (err,response,body) => {

                for(var i=0; i<body.length;i++){
                   if(username === body[i].usuario){
                     existe = true;
                     console.log(existe);
                     j = i;
                     console.log(i)
                   }
                 }
                 
                  if(!existe)
                    return cb(null,false);
                    
                  var pass_encritada = bcrypt.compareSync(password, body[j].pass);
                  
                  
                  //if(hash === body[j].pass)
                  if(pass_encritada)
                      return cb(null, username);
                  else
                     return cb(null,false);
                      
            });
    }));
*/



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.email' :  email }, function(err, user) {
                
                // if there are any errors, return the error
                if (err)
                    return done(err);
                
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.
            User.findOne({'local.email': email}, function(err, existingUser) {

                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if there's already a user with that email
                if (existingUser) 
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));

                //  If we're logged in, we're connecting a new local account.
                if(req.user) {
                    var user            = req.user;
                    user.local.email    = email;
                    user.local.username = req.body.username1;
                    user.local.name     = req.body.nombre1;
                    user.local.password = user.generateHash(password);
                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                } 
                //  We're not logged in, so we're creating a brand new user.
                else {
                    // create the user
                    var newUser            = new User();

                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.local.username = req.body.username1;
                    newUser.local.name     = req.body.nombre1;
                    newUser.local.edad     = req.body.edad;
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};