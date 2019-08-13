var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Hello world')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About me')
})


module.exports = router

// app.get('/', function(req, res) {
//   var drinks = [
//       { name: 'Bloody Mary', drunkness: 3 },
//       { name: 'Martini', drunkness: 5 },
//       { name: 'Scotch', drunkness: 10 }
//   ];
//   var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

//   res.render('pages/index', {
//     drinks: drinks,
//     tagline: tagline
// });
// });

