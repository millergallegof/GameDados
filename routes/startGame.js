/* import of required packages */
const express = require('express');
const router = express.Router();

/* import of the Schema that was created for creation and storage of information */
const modulGame = require('../models/game')

/**
* [implementation of get request, to display a given 
  pug type page, using the methods in the expresspackage]
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
  res.render('startGame', {});
});

/**
* [implementation of get request, where information of type json 
  is searched and sent to the pug tab with name query, where the information will be displayed]
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
router.get('/consulta', async (req, res, next) => {
  try {
    const gameData = await modulGame.find({}).lean()
    let ids = []
    gameData.forEach(data => {
      ids.push(data._id)
    })
    console.log(ids);
    res.render('consulta', { infopug: gameData, id: ids });
  } catch (err) {
    console.log(err);
  }

});

/**
* [implementation of get request, to display given pug type page, 
  information is sent to pug gameAction pug file]
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
router.get('/start/:id', async (req, res, next) => {
  const data = await modulGame.findById(req.params.id).lean()
  res.render('gameAccion', { id: data });

});

/**
* [implementation of patch request which is used to update 
  certain information of the element, the data is traversed 
  to segment the information and manage it in different areas. ]
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
router.patch('/start/:id', async (req, res, next) => {
  try {
    const gameData = await modulGame.findById(req.params.id, {}).lean()
    let ids = []
    let juegos = [gameData]
    /* scrolls through the data stored in the database */
    juegos.forEach(data => {
      data.gamers.forEach(dato => {
        ids.push(dato)
      })
    })
    var dato1 = []
    var idGamer = "";
    var nameGamer = "";
    /* a conditional is created to compare the winner of the game */
    for (let index = 0; index < ids.length; index++) {
      if (index === 0) {
      } else if (index === 1) {
        if (ids[index].numDado >= ids[index - 1].numDado) {
          dato1.push(Object.values(ids[index]))
        } else {
          dato1 = Object.values(ids[index - 1])
        }
      } else {
        if (ids[index].numDado >= dato1[1]) {
          idGamer = Object.values(ids[index])[2]
          nameGamer = Object.values(ids[index])[0]
        } else {
          dato1 = Object.values(dato1)
          idGamer = dato1[2];
          nameGamer = dato1[0]
        }
      }
    }

    /* moongose method is used to search and update a database element */
    await modulGame.findByIdAndUpdate(req.params.id,
      {
        $set: {
          inProgress: true,
          winner: { id: idGamer, name: nameGamer }
        }
      });

    res.redirect('/startGame');
  } catch (error) {
    console.log(error);
  }
});

/**
* [implementation of get request, to display information 
  in the pug file named winners, where it displays such information]
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
router.get('/ganadores', async (req, res, next) => {
  try {
    const gameData = await modulGame.find({}).lean()
    let ids = []
    gameData.forEach(data => {
      ids.push(data.winner)
    })
    res.render('ganadores', { apuestas: gameData, winner: ids });
  } catch (error) {
    console.log(error);
  }
});

/* module import */
module.exports = router;