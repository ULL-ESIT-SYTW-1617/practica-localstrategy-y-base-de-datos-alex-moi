#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs-extended');
var ejs = require("ejs");
var path = require("path");
var child = require("child_process");
var gitconfig = require('git-config');

//Variables para el package.json
var author, email;
var name        = argv.n || '';
var repo_url    = argv.u || '';
var directorio  = argv.c;
var help        = argv.h;


//Despliegue en iaas
var deploy      = argv.d;
var ip_iaas     = argv.iaas_ip    || '';
var path_iaas   = argv.iaas_path  || '';


function crear_estructura(dir){
      
      //creamos el directorio raiz
      fs.createDir(path.join(process.cwd(), dir), function(err){
        if(err)
          console.log(err);
    	});
      
      //creamos el directorio txt
      fs.createDir(path.join(process.cwd(), dir , 'txt'), function(err){
        if(err)
          console.log(err);
    	});
    	
    	//creamos el directorio scripts
    	fs.createDir(path.join(process.cwd(), dir , 'scripts'), function(err){
        if(err)
          console.log(err);
    	});
    	
    	//copiamos lo que hay en txt y lo ponemos en el txt creado
      fs.copyDir(path.join(__dirname, '..', 'template', 'txt'), path.join(process.cwd(), dir , 'txt'), function (err) {
      	if (err)
          console.error(err)
    	});
      
      //copiamos lo que hay en scripts y lo ponemos en el spripts creado
      fs.copyDir(path.join(__dirname, '..','template', 'scripts'), path.join(process.cwd(), dir , 'scripts'), function (err) {
      	if (err)
          console.error(err)
    	});

      //copiamos gulpfile
      fs.copyFile(path.join(__dirname,'..','gulpfile.js'), path.join(process.cwd(), dir , 'gulpfile.js'),function(err){
        if(err)
          console.log(err);
      });
    
      //copiamos el book
      fs.copyFile(path.join(__dirname,'..','template','book.json'),path.join(process.cwd(), dir , 'book.json'),function(err){
        if(err)
        console.log(err);
      });
      
      //copiamos server.js
      fs.copyFile(path.join(__dirname,'..','template','server.js'),path.join(process.cwd(), dir , 'server.js'),function(err){
        if(err)
        console.log(err);
      }); 
      
      //copiamos .gitignore
      fs.copyFileSync(path.join(__dirname,'..','template','.npmignore'), path.join(process.cwd(), dir , '.gitignore'),function(err){
        if(err)
          console.log(err);
      });
      
      
      //Coger usuario y email de git
      gitconfig(function(err,config){
          if(err) console.log(err);
          
          author  = config.user.name  || argv.n;
          email   = config.user.email || '';

          
          //renderizando package.json
          ejs.renderFile(path.join(__dirname,'..','template','package.ejs'),{ autor: author, autore: email, nombre: name, repourl: repo_url, ip_iaas_ull: ip_iaas , path_iaas_ull: path_iaas}, 
            function(err,data){
                if(err) {
                    console.error(err);
                }
                if(data) {
                    fs.writeFile(path.join(process.cwd(),nombre_dir,'package.json'), data);
                }
            });
      });
}


function desplegar(nombre_dir, paquete){
      crear_estructura(nombre_dir);
      
      child.exec('npm install -g gitbook-start-'+paquete+'-alex-moi', function(error, stdout, stderr){
        if(error)
          console.log(error)
        
        console.log(stderr);
        console.log(stdout);
      })
      
      child.exec('npm install --save-dev gitbook-start-'+paquete+'-alex-moi', function(error, stdout, stderr){
        if(error)
          console.log(error)
        
        console.log(stderr);
        console.log(stdout);
      })
  
      //añadir las tareas al gulp
      var servicio = require(path.join(__dirname,'../..','gitbook-start-'+paquete+'-alex-moi','gitbook-start-'+paquete+''));
      servicio.initialize(nombre_dir);
          
          
      /*//renderizando package.json
      ejs.renderFile(path.join(__dirname,'..','template','package.ejs'),{ autor: author , nombre: name, repourl: repo_url, ip_iaas_ull: ip_iaas , path_iaas_ull: path_iaas}, 
        function(err,data){
            if(err) {
                console.error(err);
            }
            if(data) {
                fs.writeFile(path.join(process.cwd(),nombre_dir,'package.json'), data);
            }
        });*/
}


if(help){
  console.log("\nAyuda GitBook-Start-Alex-Moi-Nitesh:"
              +"\n\nLos argumentos aceptados son:"
              +"\n -a: Especificar el autor del gitbook"
              +"\n -n: Especificar el nombre del gitbook"
              +"\n -c: Especificar el nombre del directorio"
              +"\n -u: Especificar la url del repositorio git"
              +"\n -h: Help (Ayuda)"
              +"\n -d: Deploy en IaaS(iaas.ull.es)"
              +"\n --iaas_ip: Especificar la IP del IaaS"
              +"\n --iaas_path: Especificar la PATH de IaaS\n");

}
else{
  
  var nombre_dir;
  if(directorio) 
      nombre_dir = directorio
  else                           
      nombre_dir = "Book";
  
  
  //OPCION 1: Crear estructura para gitbook
  if(directorio && !deploy){
      crear_estructura(nombre_dir);
  }

  if(deploy) 
  {  
    
    if( Array.isArray( deploy ) == false)
    {
      
      switch (deploy) {
        case 'iaas-ull-es':
            if(ip_iaas && path_iaas){ 
                desplegar(nombre_dir, 'iaas-ull-es')               
            }
            else
                  console.log("Especifique la ip y el path del iaas")
            break;
            
        case 'heroku':
            desplegar(nombre_dir, 'heroku')  
            break;
            
        case 'heroku-token':
            desplegar(nombre_dir, 'heroku-token')   
            break;
            
        case 'github':
            desplegar(nombre_dir, 'github') 
            break;
            
        default:
          console.log("La opcion " + deploy + " no es valida");
      }
    }
    
    else if( Array.isArray( deploy ) == true)
    {
        //OPCION 5: deploy en mas de un servicio
        var leng = deploy.length

        if(leng >1){
          
          //Comprobar que los valores del array son los correctos
          var valido=true;
          for (var i=0; i<leng;i++){
            if(deploy[i]!='iaas-ull-es' && deploy[i]!='heroku' && deploy[i]!='github' ){
                    console.log("Al menos uno de los argumentos pasados es incorrecto revise la documentacion")
                    valido=false;
            }
          }
          
          //Desplegar si se han introducido diferentes despliegues
          var array=[]
          if(valido == true)
            for (var i = 0; i < leng; i++) {
                if( !(deploy[i] in array ) ){
                    array.push(deploy[i])
                    array[deploy[i]]++;
                    desplegar(nombre_dir, deploy[i])
                }
                else
                {
                    console.log("Error se han introducido despliegues repetidos")
                }
            }
        }
    }
  }
  
}