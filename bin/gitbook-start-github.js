#! /usr/bin/env node

var modulo_repo = require("./create_repo")
var fs = require('fs');
var path = require('path');
var child = require("child_process");

    /*
    Funcionamiento:
        1. primero crea el repo
        2. añade la tarea al gulpfile
        3. copia gulpfile a tu directorio
        4. añade el remoto de github para que puedas subir cambios
    */


modulo_repo.pedirdatos();


function initialize(directorio) {
    
    console.log("\nmodulo initialize");

    modulo_repo.pedirdatos();
    
    var contenido='\ngulp.task("deploy-github", function () {'+ 
        '\n\tvar github = require("gitbook-start-github-alex-moi");'+
        '\n\tvar url = paquete.repository.url;'+
        
        '\n\n\ github.deploy();'+
        '\n});\n\n';

    
    fs.existsSync(path.join(process.cwd(), 'node_modules','gitbook-start-alex-moi-nitesh','gulpfile.js')) ? console.log("Existe") : console.log("No existe");
    
    
    //añadimos la tarea
    fs.writeFileSync(path.join(process.cwd(), 'node_modules','gitbook-start-alex-moi-nitesh','gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("Añadiendo tarea gulp")
    });
    
    
    //copiamos gulpfile a nuestro directorio
    fs.copyFile(path.join(process.cwd(), 'node_modules','gitbook-start-alex-moi-nitesh','gulpfile.js'), path.join(process.cwd(), directorio , 'gulpfile.js'),function(err){
        if(err)
          console.log(err);
         console.log("Tarea gulp GITHUB añadida a gulpfile")
    });


};

function deploy() {

    console.log("Comenzando el deploy en GITHUB");
   
    
    child.exec('git add . ; git commit -m "First commit"; git push origin master;', function(error, stdout, stderr){
        if(error)
          console.log(error)
        
        console.log(stderr);
        console.log(stdout);
    })

};

module.exports = {
  initialize,
  deploy
}