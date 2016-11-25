module.exports = function(app, passport) {


/* Traemos los esquemas para trabajar con ellos */
const User  = require('../app/models/user');
const Datos = require('../app/models/datosuser');

var path = require('path');
var bcrypt = require("bcrypt-nodejs");
var Dropbox = require("dropbox");
var Dropbox2 = require("node-dropbox");
var config = require(path.resolve(process.cwd(),".datos_dropbox.json"));
var api = Dropbox2.api(config.token_dropbox);


// normal routes ===============================================================

	// show the home page (will also have our login links)
/*	app.get('/', function(req, res) {
		res.render('index.ejs');
	});*/



	// PROFILE SECTION =========================
    app.get('/home', (req,res) =>{
      res.render('home', { user: req.user })
    })

	// LOGOUT ==============================
    app.get('/salir',
        (req,res)=>{
            req.logout();
            res.redirect('login')
    });
    
    
    app.get('/respuesta',
      (req, res) => {
        res.redirect('/');
    });
    
    app.get('/error',
        function(req, res) {
            res.render('error', {error: 'Usuario y contraseña incorrecta'})
    });

    
    app.get('/modificacion', (req,res) =>{
      res.render('modificacion')
    })
    
    app.get('/modificacion/password', function(req,res){
        var user = req.query.username;
        var pass = req.query.password;
        var contenido;
        
        var hash = bcrypt.hashSync(pass);
        //var pass_encritada = bcrypt.compareSync(pass, hash);
        //console.log("Usuario!!!!!!!!!!!!!!!  "+ user );
        // console.log("Contraseñaa!!!!!!!!!!  "+ hash);
      
        api.getFile('/'+config.ruta_dropbox+'.json', (err,response,body) => {
           
            for(var i=0; i<body.length;i++){
               if(user === body[i].usuario){
                  body[i].pass = hash;
               }
             }
            console.log(body)
            contenido= JSON.stringify(body,null,' ');
            console.log(contenido)
         
            api.removeFile('/'+config.ruta_dropbox+'.json', function(err, response, body){
                var  dbx = new Dropbox({ accessToken: config.token_dropbox });
                dbx.filesUpload({path: '/'+config.ruta_dropbox+'.json', contents: contenido});
                res.redirect('/home')
          })
        });
      
    
    });
        
    
    
    

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login',  (req, res) => {
          if (req.isAuthenticated()) return res.redirect('/error')
          res.render('index')
        })
        
        app.post('/login', 
          passport.authenticate('local', { failureRedirect: '/error' }),
          function(req, res) {
            res.redirect('/home');
        });
/*
		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('loginMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
*/


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

/*	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));
*/

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/home');
		});
	});


// =============================================================================
// TRABAJANDO CON LA BBDD ======================================================
// =============================================================================
	app.get('/anadir', function(req, res) {
		console.log("entra");
		
		User.find({nombre: req.user.local.email},(err,file)=>{
		    
		    var datos = new Datos({
			    creador: req.user._id, 
			    tarea: req.query.nombre, 
			    informacion: req.query.informacion,
			    fecha : req.query.fecha,
			    estado : "pendiente"
		    });
		    console.log("Creador: " + datos.creador);
		    
		    datos.save(function(err){
		      if(err) return console.log(err);
		    });

		    res.redirect('/profile');
		 })
	});
	
	
	app.get('/pendi', function(req, res) {
		var user = req.user;
		console.log("Console 2: " + user.local.email);
		console.log(req.user._id);
		
		Datos.find({creador: req.user._id, estado: 'pendiente'},function(err, datos) {
	        if(err) {
	            res.send(err);
	        }
	        res.json(datos);
    	});
		
	});
	
	
	app.get('/termi', function(req, res) {
		var user = req.user;
		
		Datos.find({creador: req.user._id, estado: 'terminada'},function(err, datos) {
	        if(err) {
	            res.send(err);
	        }

	        res.json(datos);
    	});
		
	});
	
	app.get('/update', function(req, res) {
		var user = req.user;
		console.log("nametarea: " +req.query.nametarea)

		Datos.update({tarea: req.query.nametarea}, {$set: {estado: 'terminada'}},function(err, datos) {
		    if(err) throw err;
		    
		    res.redirect('/profile');
		});
		
	});
	
	app.get('/eliminar',function(req, res){
		Datos.findOneAndRemove({tarea: req.query.nametarea1})
	    .exec(function(err, curso, count)
		{
		    res.redirect('/profile');
		});

	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}