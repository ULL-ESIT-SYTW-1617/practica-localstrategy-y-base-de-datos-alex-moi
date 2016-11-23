
# Sistemas y Tecnologías Web. Gitbook Start Acceso Restringido. Plugins

Este paquete es un plugin del paquete ```gitbook-start-alex-moi-nitesh```.
Ofrece la posibilidad de desplegar en **heroku** nuestra aplicación a través de la **API de Heroku** y utilizando autenticación **local** utilizando la **API Dropbox**.

## Instalación

**Debemos tener** instalado el paquete principal en **global**. Con esto hecho no es necesario instalar el paquete *plugin heroku* puesto que al ejecutar la aplicación de la forma que se expone a continuación, ésta lo instala por nosotros.
Por tanto, ejecutamos desde el directorio de nuestro gitbook:
```shell
gitbook-start-alex-moi-nitesh -d heroku-localstrategy
```

Para más información sobre las opciones que permite el paquete principal, acuda a su documentación en [gitbook-start-alex-moi-nitesh](https://github.com/ULL-ESIT-SYTW-1617/nueva-funcionalidad-para-el-paquete-npm-plugins-alex-moi).

## Descripción del paquete

El paquete cuenta con dos métodos, **intialize()** y **deploy()**. El primero, al ser invocado por el paquete principal [gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh) añadirá una tarea gulp al gulpfile.js de la aplicación. Esta tarea se llamará **deploy-heroku-oauth** e invocará el método **deploy()** que se encargará de desplegar la aplicación en **heroku**.


## Funcionamiento
Después de haber ejecutado el comando del paso de **Instalación**, se instalará el paquete **gitbook-start-heroku-localstrategy-alex-moi** automaticamente y ya podremos desplegar en heroku.
Es recomendable, que previamente haya instalado el paquete **gitbook-start-github-alex-moi** puesto que le creará el repositorio con un book automáticamente. Más información sobre este paquete en este 
[enlace paquete github-alex-moi](https://www.npmjs.com/package/gitbook-start-github-alex-moi)

##### Datos a tener encuenta
Durante el proceso de instalación `gitbook-start-alex-moi-nitesh -d heroku-localstrategy` , nos pedirá por pantalla los siguientes datos:
* nombre de la app
* token del usuario de heroku
* token aplicacion en Dropbox

El token de heroku lo puede encontrar en su cuenta personal de heroku (Account->Baje hasta el final->Api Key)

Para obtener el token de la aplicación de Dropbox, acuda a [Api Dropbox](https://www.dropbox.com/developers/apps). Ahí debe de crear una nueva app **Create App** y siga los siguientes pasos:
1. Elija Dropbox Api
2. Elija App folder
3. Introduzca un nombre para su app
4. Pinche en Generate access token y se le generrá el token 

Posteriormente siga los siguientes pasos:
	
1. `heroku git:remote -a <nombre_app>`
2. `gulp deploy-heroku-local`
3. Acuda a la url de la aplicación: `https://nombre_app.herokuapp.com/`


##Versiones de los paquetes
* Paquete principal **gitbook-start-alex-moi-nitesh** 
* Paquete **gitbook-start-heroku-token-oauth-alex-moi** 

## Enlaces importantes

*  [Página en NPM gitbook-start-heroku-token-oauth-alex-moi Plugin](https://www.npmjs.com/package/gitbook-start-heroku-token-oauth-alex-moi)
*  [Página en NPM gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh)
*  [Repositorio GitHub](https://github.com/ULL-ESIT-SYTW-1617/autenticacion-oauth-con-passport-alex-moi.git)
*  [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicapassport.html)
*  [Campus Virtual](https://campusvirtual.ull.es/1617/course/view.php?id=1175)

## Autores

* Alexander Cole Mora | [Página Personal](http://alu0100767421.github.io/)
* Moisés Yanes Carballo | [Página Personal](http://alu0100782851.github.io/)