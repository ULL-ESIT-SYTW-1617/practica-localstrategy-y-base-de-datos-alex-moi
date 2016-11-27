
var fs = require('fs');
var path = require('path');
var child = require("child_process");


function initialize(directorio) {
    console.log("\n============ INSTALANDO DEPENDENCIAS GITBOOK-START-IAAS-BBDD ============")
    console.log("\nEspere mientras el proceso termina ...")


    var contenido='\ngulp.task("deploy-iaas-bbdd", function () {'+ 
        '\n\tvar iaas_bbdd = require("gitbook-start-iaas-bbdd-alex-moi");'+
        '\n\tvar url = paquete.repository.url;'+
        '\n\tvar iaas_ip = paquete.iaas.IP;'+
        '\n\tvar iaas_path = paquete.iaas.PATH;'+
        
        '\n\n\tiaas_bbdd.deploy();'+
        '\n});\n\n';


        //añadimos la tarea
        fs.writeFileSync(path.resolve(process.cwd(),'gulpfile.js'), contenido,  {'flag':'a'},  function(err) {
            if (err) {
                    return console.error(err);
            }
        });
            
        fs.copyFile(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'server.js'), path.join(process.cwd(), 'app.js'), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        
        fs.copyFile(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'mongod'), path.join(process.cwd(), 'mongod'), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        
        fs.copyDir(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'app'), path.join(process.cwd(), 'app'), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        
        fs.copyDir(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'config'), path.join(process.cwd(), 'config'), function (err) {
            if (err) {
                return console.error(err);
            }
        }); 
        
        fs.copyDir(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'public'), path.join(process.cwd(), 'public'), function (err) {
            if (err) {
                return console.error(err);
            }
        });         
        
        fs.copyDir(path.join(process.cwd(), 'node_modules', 'gitbook-start-iaas-bbdd-alex-moi', 'views'), path.join(process.cwd(), 'views'), function (err) {
            if (err) {
                return console.error(err);
            }
        });
        
};

function deploy() {

    child.exec('node app.js', function(error, stdout, stderr){
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