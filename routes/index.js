/* import of required packages */
const express = require('express');
const router = express.Router();

/**
* [implementation of get request, to display a given pug type page, using the methods in the express package]
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
  res.render('index', {});
});

/* module import */
module.exports = router;
