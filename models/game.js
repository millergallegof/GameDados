//CREACION DE ESQUEMA JUGADORES JUEGO DADOS
const mongoose = require('mongoose');
const uuid = require('uuid');

//creacion variable esquema
const Schema = mongoose.Schema;

//uso de plugin de eliminacion
const mongooseSoftDelete = require('mongoose-delete');

// console.log(uuid.v4());

//Creacion del Schema
const gameSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: uuid.v4()
    },
    type: {
        type: Number,
        min: 10000,
        max: 100000,
        requeried: [false, 'ingrese tipo de apuesta']
    },
    gamers: [
        {
            name: {
                type: String,
                trim: true,
                require: [true, 'es requerido el nombre del gamer']
            },
            numDado: {
                type: Number,
                default: 0
            },
            id: {
                type: String,
                unique: true,
                default: uuid.v4()
            }

        }

    ],
    inProgress: {
        type: Boolean,
        default: false,
    },
    winner: {
        id: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            trim: true,
        }

    }
}, { timestamps: true });

//plugin borrado de datos
gameSchema.plugin(mongooseSoftDelete);

module.exports = Game = mongoose.model('Game', gameSchema)