var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Day = require('../models/day')
var Sequelize = require('sequelize')

router.get('/api/options', function (req, res, next) {
  Promise.all([
      Hotel.findAll(),
      Restaurant.findAll(),
      Activity.findAll()
    ])
    .spread(function (dbHotels, dbRestaurants, dbActivities) {
      res.json({
        templateHotels: dbHotels,
        templateRestaurants: dbRestaurants,
        templateActivities: dbActivities
      });
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
  res.render('index');
})

router.post('/api/days/:dayNum/:option', function (req, res, next) {
  var option;
  if (req.params.option === 'hotel') {
    option = 'set' + req.params.option[0].toUpperCase() + req.params.option.slice(1);
  } else if (req.params.option === 'activity') {
    option = 'add' + req.params.option[0].toUpperCase() + req.params.option.slice(1, -1) + 'ies';
  } else {
    option = 'add' + req.params.option[0].toUpperCase() + req.params.option.slice(1) + 's';
  }

  Day.findOrCreate({
      where: {
        number: req.params.dayNum
      }
    })
    .then(function (day) {
      day[0][option](req.body.id); //setRestaurants
    });
});

router.delete('/api/days/:dayNum/:option', function (req, res, next) {
  var option;
  if (req.params.option === 'hotel') {
    option = 'get' + req.params.option[0].toUpperCase() + req.params.option.slice(1);
  } else if (req.params.option === 'activity') {
    option = 'get' + req.params.option[0].toUpperCase() + req.params.option.slice(1, -1) + 'ies';
  } else {
    option = 'get' + req.params.option[0].toUpperCase() + req.params.option.slice(1) + 's';
  }

  Day.findOne({
      where: {
        number: req.params.dayNum
      }
    })
    .then(function (day) {
      day[option]({
          where: {
            id: req.body.id
          }
        })
        .then(function (attractions) {
          attractions[0].destroy();
        });
    });
});

router.get('/api/days/', function (req, res, next) {
  Day.findAll({
      include: [{
        model: Activity,
        through: {
          attributes: ['day_activity']
        }
      }, {
        model: Restaurant,
        through: {
          attributes: ['day_restaurant']
        }
      }]
    })
    .then(function (days) {
      res.json(days);
    });
});



module.exports = router;
