/* import of required packages */
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

/* import of the Schema that was created for creation and storage of information */
const modulGame = require('../models/game')

/**
* [implementation of get request, to display a given pug 
  type page, using the methods in the expresspackage]
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
router.get('/', function (req, res, next) {
  res.render('game', {});
});

/**
* [implementation of a post request to send information and create a new element and store it in a database.]
*
*
* @throws sending information not found in the default Schema
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since Version 1
*
*
*/
router.post('/', function (req, res, next) {

  let { nameGamer1 } = req.body;
  let { nameGamer2 } = req.body;
  let { nameGamer3 } = req.body;
  let { apuesta } = req.body;

  try {
    modulGame.create(
      {
        "type": apuesta,
        "gamers": [
          { "name": nameGamer1, "numDado": Math.round(Math.random() * 6), "id": uuid.v4() },
          { "name": nameGamer2, "numDado": Math.round(Math.random() * 6), "id": uuid.v4() },
          { "name": nameGamer3, "numDado": Math.round(Math.random() * 6), "id": uuid.v4() }
        ]
      },
      (error, game) => {
        res.redirect('/startGame')
      }
    )
    console.log('Juego creado correctamente');
  } catch (error) {
    console.log(error);
  }

})

/* module import */
module.exports = router;
