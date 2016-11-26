
# Sistemas y Tecnologías Web. Gitbook Start LocalStrategy y MongoDB. Plugin

Este paquete es un plugin del paquete ```gitbook-start-alex-moi-nitesh```.
Ofrece la posibilidad de desplegar una aplicación basada en autenticación local mediante el uso de passport y MongoDB, la aplicación tiene como objetivo contener un gitbook al cual solo podrán acceder aquellos usuarios que estén registrados en la misma.

## Instalación

**Debemos tener** instalado el paquete principal en **global** y creada la estructura de directorios(opción **-c** [paquete principal](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh)). Con esto hecho **NO** es necesario instalar el paquete *plugin iaas-bbdd* puesto que al ejecutar la aplicación de la forma que se expone a continuación, ésta lo instala por nosotros.

Para poner en funcionamiento este paquete vaya a la sección de ejecución donde se explican los pasos.


## Descripción del paquete

El paquete cuenta con dos métodos, **intialize()** y **deploy()**. El primero, al ser invocado por el paquete principal [gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh) el cual añadirá una tarea gulp al gulpfile.js de la aplicación. Esta tarea se llamará **deploy-iaas-bbdd** e invocará el método **deploy()** que se encargará de arrancar el server en la maquina del iaas.


### SSH  keys
Para conectarnos a la máquina del iaas, tenenmos que tener configurado la [vpn de la ULL](http://www.ull.es/stic/tag/vpn/), y poder configurar un alias para conectarnos más rápidamente por **ssh**.
Para ello crearemos en `~/.ssh` un fichero `config` con el siguiente contenido:
```
Host sytw
	HostName dir_ip_máquina
	User usuario
```
Con esto podremos conectarnos sin ningún problema a la máquina.
También es necesario tener generado en la máquina del iaas las claves para utilizar repositorios Github. Puede encontrar la documentación apropiada [en este link](https://help.github.com/articles/generating-an-ssh-key/).

##Ejecución

Lo primero será, en nuestra máquina local, instalar el paquete principal en global y seguir los **pasos de ejecución** explicados [aquí](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh).

A continuación, ejecutaremos el paquete del iaas-ull-es para subir nuestro Gitbook a la máquina del IaaS.
//Explicacion de los pasos a seguir para hacer el despliegue en iaas

Ejecutamos desde el directorio de nuestro gitbook (asegúrese de haber instalado todas las dependencias antes con `npm install`:
```shell
gitbook-start-alex-moi-nitesh -d iaas-ull-es --iaas_ip <direccion_ip> --iaas_path /home/nombre_usuario/ruta
```

**Es importante que no ponga '/' al final de la ruta** y en **nombre_usuario el usuario de su maquina (generalmente usuario)**


Si no ha introducido en el package.json->repository.url una direccion de un repositorio, póngala(version http).

A conitnuación, ejecute lo siguiente:

1. `gulp build` le creará en la carpeta gh-pages el libro
2. Suba sus cambios a github `git add .` `git commit -m "cambios"` `git push origin master`
3. `gulp deploy-iaas` le creara en su maquina iaas su libro

Si en algun momento hace algún cambio en su libro, vuelva a ejecutar los anteriores comandos.


Una vez hemos realizado los pasos anteriores, es decir, una vez hemos subido nuestro Gitbook al IaaS tendremos nuestro directorio Gitbook allí. Por tanto, **nos movemos a dicho directorio** y ejecutamos los comandos que se exponen a continuación:

 1. npm install -g gitbook-start-alex-moi-nitesh
 2. npm install
 2. gulp build
 3. gitbook-start-alex-moi-nitesh -d iaas-bbdd
 4. Desde el mismo terminal ejecutar: mongod (véase sección Observaciones)
 5. Desde otro terminal: gulp deploy-iaas-bbdd

#####**Observaciones:** 
>- Debe tener instalado la base de datos mongoDB en su maquina, en caso contrario siga [estos pasos](http://www.mongodbspain.com/es/2014/08/30/install-mongodb-on-ubuntu-14-04/) (Sólo será necesario realizar los 4 primeros pasos).


##Versiones de los paquetes
* Paquete principal **gitbook-start-alex-moi-nitesh** versión **v1.2.59**
* Paquete **gitbook-start-iaas-bbdd-moi** versión **v0.0.24**

## Enlaces importantes

*  [Página en NPM gitbook-start-heroku-localstrategy-alex-moi Plugin](https://www.npmjs.com/package/gitbook-start-heroku-localstrategy-alex-moi)
*  [Página en NPM gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh)
*  [Repositorio GitHub](https://github.com/ULL-ESIT-SYTW-1617/passport-y-localstrategy-alex-moi.git)
*  [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicapassportlocal.html)
*  [Campus Virtual](https://campusvirtual.ull.es/1617/course/view.php?id=1175)

## Autores

* Alexander Cole Mora | [Página Personal](http://alu0100767421.github.io/)
* Moisés Yanes Carballo | [Página Personal](http://alu0100782851.github.io/)