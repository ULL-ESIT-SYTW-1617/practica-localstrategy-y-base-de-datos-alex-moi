var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var User = mongoose.model('User');


var DatosSchema = mongoose.Schema({
    creador: { type: Schema.ObjectId, ref: "User" },                            /* Creador de la tarea */
    tarea : String,                                                             /* Titulo de la tarea */
    informacion : String,                                                       /* Descripcion de la tarea */
    fecha :  Date,                                                              /* Fecha de la tarea */
    estado : String                                                             /* Terminada o pendiente */
});



// create the model for users and expose it to our app
module.exports = mongoose.model('Datos', DatosSchema);