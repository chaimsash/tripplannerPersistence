var dataModule = (function() {

  var publicAPI = {
    allPromises: $.ajax({
      method: 'GET',
      url: '/api/options'
    })
    //   .then(function(options) {
    //     hotels = options.templateHotels;
    //     restaurants = options.templateRestaurants;
    //     activities = options.templateActivities;
    //   })
    // }
  }

  return publicAPI;
}());



