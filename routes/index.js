var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Day = require('../models/day')
var Sequelize = require('sequelize')

router.get('/api/options', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.json({
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  res.render('index');
})

router.post('/api/days/:dayNum/:option', function(req, res, next) {
  console.log("HEY")
  console.log(req.body);
  var option = req.params.option;

  Day.findOrCreate({
    where: {
      number : req.params.dayNum
    }
  })
    .then(function(day) {
      console.log(day)
      day.addHotels(req.body.id) //setRestaurants
    })
})

// router.get('/api/days/:id/restaurants') {

// }



module.exports = router;
