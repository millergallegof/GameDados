const express = require('express');
const router = express.Router();


const modulGame = require('../models/game')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('startGame', {});
});

router.get('/consulta', async (req, res, next) => {
  const gameData = await modulGame.find({}).lean()
  let ids = []
  gameData.forEach(data => {
    ids.push(data._id)
  })
  console.log(ids);
  res.render('consulta', { infopug: gameData, id: ids });

});

router.get('/start/:id', async (req, res, next) => {
  const data = await modulGame.findById(req.params.id).lean()
  res.render('gameAccion', { id: data });

});

router.patch('/start/:id', async (req, res, next) => {

  const gameData = await modulGame.find({}).lean()
  let ids = []
  gameData.forEach(data => {
    data.gamers.forEach(dato => {
      ids.push(dato)
    })
  })
  const dato1 = []
  var idGamer = "";
  var nameGamer = "";
  for (let index = 0; index < ids.length; index++) {
    if (index === 0) {
    } else if (index === 1) {
      if (ids[index].numDado >= ids[index - 1].numDado) {

        dato1.push(Object.values(ids[index]))
      } else {
        let arrayDatos = Object.values(ids[index - 1])
        arrayDatos.forEach(datoArray => {
          dato1.push(datoArray)
        })

      }
    } else {
      if (ids[index].numDado >= dato1[1]) {
        idGamer = Object.values(ids[index])[2]
        nameGamer = Object.values(ids[index])[0]
      } else {
        idGamer = dato1[2];
        nameGamer = dato1[0]
      }
    }
  }

  await modulGame.findByIdAndUpdate(req.params.id,
    {
      $set: {
        inProgress: true,
        winner: { id: idGamer, name: nameGamer }
      }
    });

  res.redirect('/startGame');
});

router.get('/ganadores', async (req, res, next) => {
  const gameData = await modulGame.find({}).lean()
  let ids = []
  gameData.forEach(data => {
    ids.push(data.winner)
  })
  console.log(ids);
  res.render('ganadores', {apuestas: gameData, winner: ids});

});

module.exports = router;
