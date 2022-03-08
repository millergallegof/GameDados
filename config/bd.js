/* import of required packages */
const mongoose = require('mongoose');
/* rutra where the database is to be created */
const mongodb = 'mongodb://localhost/createGame';

/**
* [function in which the connection to the database 
    is established by means of the moongose package ]
*
*
* @throws If presented by the project
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since Version 1
*
*
*/
const conexionBD = async () => {
    try {
        const baseDatos = await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err))
    } catch {
        console.log('Se presento un error');
    }
}

/* module import */
module.exports = conexionBD;