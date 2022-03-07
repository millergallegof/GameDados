
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const modulGame = require('../models/game')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('game', {});
});

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




  // console.log(req.body.name);
})

module.exports = router;
