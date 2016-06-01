app.factory('DataFactory', ['$http', function($http) {
  console.log('dataFactory running');

  //PRIVATE
  var favorites;

  function getFav() {
    var promise = $http.get('/favorites/db').then(function(response) {
      console.log('Async data returned: ', response.data);
      favorites = response.data;
    });
    return promise;
  }

  function addFav(newFav) {
    var promise = $http.post('/favorites', newFav).then(function(response) {
      if(response.status ==201) {
        console.log("Favorite saved");
        return getFav();
      } else {
        console.log('Nope', response.data);

      }
    });
    return promise;
  }

  function deleteFav(favID) {
    var promise = $http.delete('/favorites/' + favID).then(function(response) {

    });
    return promise;
  }
  //PUBLIC
  var publicApi = {
    factoryAddFav: function(newFavorite) {
      return addFav(newFavorite);
    },
    factoryRefreshFav: function() {
      return getFav();
    },
    factoryGetFavorites: function() {
      //return our array
      return favorites;
    },
    factoryDelFav: function(favID) {
      return deleteFav(favID);
    }
  };
  return publicApi;
}]);
