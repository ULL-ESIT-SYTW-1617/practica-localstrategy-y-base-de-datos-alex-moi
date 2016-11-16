
# Sistemas y Tecnologías Web. Gitbook Start Acceso Restringido. Plugins

Este paquete es un plugin del paquete ```gitbook-start-alex-moi-nitesh```.
Ofrece la posibilidad de desplegar en **heroku** nuestra aplicación a través de la **API de Heroku** y utilizando autenticación a través de **GitHub**.

## Instalación

**Debemos tener** instalado el paquete principal en **global**. Con esto hecho no es necesario instalar el paquete *plugin heroku* puesto que al ejecutar la aplicación de la forma que se expone a continuación, ésta lo instala por nosotros.
Por tanto, ejecutamos desde el directorio de nuestro gitbook:
```shell
gitbook-start-alex-moi-nitesh -d heroku-token-oauth
```

Para más información sobre las opciones que permite el paquete principal, acuda a su documentación en [gitbook-start-alex-moi-nitesh](https://github.com/ULL-ESIT-SYTW-1617/nueva-funcionalidad-para-el-paquete-npm-plugins-alex-moi).

## Descripción del paquete

El paquete cuenta con dos métodos, **intialize()** y **deploy()**. El primero, al ser invocado por el paquete principal [gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh) añadirá una tarea gulp al gulpfile.js de la aplicación. Esta tarea se llamará **deploy-heroku-oauth** e invocará el método **deploy()** que se encargará de desplegar la aplicación en **heroku**.


## Funcionamiento
Después de haber ejecutado el comando del paso de **Instalación**, se instalará el paquete **gitbook-start-heroku-token-oauth-alex-moi** automaticamente y ya podremos desplegar en heroku.
Es recomendable, que previamente haya instalado el paquete **gitbook-start-github-alex-moi** puesto que le creará el repositorio con un book automáticamente. Más información sobre este paquete en este 
[enlace paquete github-alex-moi](https://www.npmjs.com/package/gitbook-start-github-alex-moi)

##### Datos a tener encuenta
Durante el proceso de instalación `gitbook-start-alex-moi-nitesh -d heroku-token-oauth` , nos pedirá por pantalla los siguientes datos:
* nombre de la app
* token del usuario de heroku
* repositorio de Github formato http
* id_client
* secret_client
* organizacion

El token de heroku lo puede encontrar en su cuenta personal de heroku (Account->Baje hasta el final->Api Key)

Para obtener el id_client y el secret_client, deberá crear en github una aplicación. Para ello, acuda a **settings** en su cuenta de Github, en la parte izquierda por el final encontraremos **OAuth applications**, pinche ahí y podremos crear una nueva aplicación. Una vez vaya a crear una aplicación, siga los siguientes pasos:
1. Ponga un nombre a la aplicación
2. Ponga en Homepage URL una dirección igual a esta pero con el nombre de su app: **https://nombre_de_su_app.herokuapp.com/login**
3. Añada una descripción si quiere
4. Ponga en Authorization callback URL una dirección igual a esta pero con el nombre de su app: **https://nombre_de_su_app.herokuapp.com/respuesta**
5. Registre su aplicación

Después de ello, podremos encontrar nuestro id_client y nuestro secret_client.

En organizacion introduzca la organizacion con la cual va a controlar el acceso a su book.

Posteriormente siga los siguientes pasos:
	
1. `heroku git:remote -a <nombre_app>`
2. `gulp deploy-heroku-oauth`
3. Acuda a la url de la aplicación: `https://nombre_app.herokuapp.com/`


##Versiones de los paquetes
* Paquete principal **gitbook-start-alex-moi-nitesh** falta por poner
* Paquete **gitbook-start-heroku-token-oauth-alex-moi** falta por poner

## Enlaces importantes

*  [Página en NPM gitbook-start-heroku-token-oauth-alex-moi Plugin](https://www.npmjs.com/package/gitbook-start-heroku-token-oauth-alex-moi)
*  [Página en NPM gitbook-start-alex-moi-nitesh](https://www.npmjs.com/package/gitbook-start-alex-moi-nitesh)
*  [Repositorio GitHub](https://github.com/ULL-ESIT-SYTW-1617/autenticacion-oauth-con-passport-alex-moi.git)
*  [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicapassport.html)
*  [Campus Virtual](https://campusvirtual.ull.es/1617/course/view.php?id=1175)

## Autores

* Alexander Cole Mora | [Página Personal](http://alu0100767421.github.io/)
* Moisés Yanes Carballo | [Página Personal](http://alu0100782851.github.io/)