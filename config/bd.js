
const mongoose = require('mongoose');

// rutra donde se va a crear la base de datos
const mongodb = 'mongodb://localhost/createGame';

const conexionBD = async () => {
    try {
        const baseDatos = await mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err))
    } catch {
        console.log('Se presento un error');
    }
}

module.exports = conexionBD;