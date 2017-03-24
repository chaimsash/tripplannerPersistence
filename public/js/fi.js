var dataModule = (function() {
  // var dayNum = 1 + '';
  var publicAPI = {
    allPromises: $.ajax({
      method: 'GET',
      url: '/api/options'
    }),
    allDays: $.ajax({
      method: 'GET',
      url: '/api/days'
    }),
    oneDay: $.ajax({
      method: 'GET',
      url: '/api/days/'
    })
  };

  return publicAPI;
}());
