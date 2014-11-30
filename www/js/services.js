angular.module('starter.services', [])

/**
 * CatalougeService that returns all catalogue links.
 */
.factory('CatalougeService', ['$http', function($http) {
  return {
    getCategoryList: function () {
      //Returns all data (Category Lists)      
      return $http.get('data/catalouge.json');
    },
    getCategoryDetails: function (id) {
      //Returns data of a specific category
    }
  }
}])
.factory('MyVideosService', ['$http', function($http) {
  return {
    getMyVideos: function () {
      //Returns all my videos      
      return $http.get('data/myvideos.json');
    }
  }
}]);