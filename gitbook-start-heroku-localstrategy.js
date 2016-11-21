#! /usr/bin/env node


var fs = require('fs');
var path = require('path');
var child = require("child_process");
var fs2 = require('fs-extended');
var prompt = require("prompt");
var heroku = require('heroku-client');





function initialize(directorio) {
   
   
    console.log("\n============ INSTALANDO DEPENDENCIAS ============")
    console.log("\nEspere mientras el proceso termina ...")

    var contenido='\ngulp.task("deploy-heroku-local", function () {'+ 
        '\n\tvar heroku = require("gitbook-start-heroku-localstrategy-alex-moi");'+
        '\n\tvar url = paquete.repository.url;'+
        
        '\n\n\ heroku.deploy();'+
        '\n});\n\n';


    //Copia el server.js
    fs2.copyFile(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-alex-moi','server.js'),path.join(process.cwd(), 'server.js'),function(err){
        if(err)
        console.log(err);
     });

      fs.copyDir(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-alex-moi','views'),path.join(process.cwd(), 'views'),function(err){
        if(err)
        console.log(err);
     });
     
     fs.copyDir(path.join(process.cwd(),'node_modules','gitbook-start-heroku-localstrategy-alex-moi','public'),path.join(process.cwd(), 'public'),function(err){
        if(err)
        console.log(err);
     });
     
    //añadimos la tarea
    fs.writeFileSync(path.resolve(process.cwd(),'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }
        
           
    });
    
    datos(directorio);
    
};



function datos(directorio){
     //pedimos por pantall el nombre de la app y el token
      var git = require('simple-git')(path.join(process.cwd()));
      //console.log("hfhfhfhfhf   " + path.join(process.cwd()));
       prompt.get([{
              name: 'nombre_app',
              required: true
            },{
              name: 'token_app',
              required: true
            },{
                name: 'repositorio'
            },{
                name: 'usuario',
                require: true
            },{
                name: 'password',
                require: true
                
            }], function (err, result) {
            // 
            // Log the results. 
            // 
            console.log('Sus datos son:');
            console.log('  nombre: ' + result.nombre_app);
            console.log('  token: ' + result.token_app);
            console.log('  repositorio: ' + result.repositorio);
            console.log('  usuario: ' + result.usuario);
            console.log('  password: ' + result.password);
           
            //variable con el contenido de config.json
            var json = '{\n "Heroku":{\n\t"nombre_app": "'+result.nombre_app+'",\n\t "token_app": "'+result.token_app+'"\n\t}\n}';
            //'{\n "Config":{\n\t"usuario": "'+result.usuario+'",\n\t "password": "'+result.password+'"\n\t}\n}';
            var configuracion ='['+
            '\n\t{'+
            '\n\t\t"usuario": "usuario1",'+
            '\n\t\t"pass": "usuario1"'+
            '\n\t},'
            '\n\t{'+
            '\n\t\t"usuario": "usuario2",'+
            '\n\t\t   "pass": "usuario2"'+
            '\n\t}'+
            '['
            
            fs.mkdirSync(path.join(process.cwd(), ".token_heroku"));
            fs.writeFileSync(path.join(process.cwd(),".token_heroku","token.json"),json);
            fs.writeFileSync(path.join(process.cwd(),"aplicacion.json"),configuracion);
            
            var token = require(path.join(process.cwd(), ".token_heroku","token.json"));
            var pack= require(path.join(process.cwd(), 'package.json'));
           
            var her = new heroku({ token : token.Heroku.token_app });
        
                her.post('/apps', {body: {name: token.Heroku.nombre_app}} ).then(app => {
                
                    //git.init().addRemote('heroku', result.repositorio).add('.').commit('Primer commit').push('heroku','master');
                      
                      
                      
                });

          });
          
}

function deploy() {

    

    console.log("Comenzando el deploy en HEROKU");
   
    
    
    child.exec('git add . ; git commit -m "subiendo a heroku"; git push heroku master;', function(error, stdout, stderr){
        if(error)
          console.log(error)
        
        console.log(stderr);
        console.log(stdout);
      });


   
};

module.exports = {
  initialize,
  deploy
}