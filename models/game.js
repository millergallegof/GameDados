/* import of required packages */
const mongoose = require('mongoose');
const uuid = require('uuid');
const mongooseSoftDelete = require('mongoose-delete');

/* Schema variable creation - Model */
const Schema = mongoose.Schema;

/**
* [Creation of the Schema for the use and storage of elements in the database, using moongose specific methods.]
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

/* the logical log deletion plugin is used */
gameSchema.plugin(mongooseSoftDelete);

/* the module is exported for use in future files */
module.exports = Game = mongoose.model('Game', gameSchema)