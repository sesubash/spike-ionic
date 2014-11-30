angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $ionicPopover) {
  console.log('MainCtrl');
  
   $ionicPopover.fromTemplateUrl('templates/popover.html', function(popover) {
    $scope.popover = popover;
  });
})

.controller('CatalougeCtrl', ['$scope','$ionicSideMenuDelegate', 'CatalougeService', '$state', '$rootScope', function($scope, $ionicSideMenuDelegate, CatalougeService, $state, $rootScope) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //Store all the catalouge items 
  $scope.catalougeItems = [];
  //Section heading
  $scope.itemHeading;

  //Call service to fetch all category listing
  CatalougeService.getCategoryList().then(function (response) {
    console.log(response.data);
    $rootScope.catalougeItems = $scope.catalougeItems = response.data;
    $scope.itemHeading = response.data[0].title;
  }, function (err) {
      console.log(err);
  });

  $scope.clicker = function(item){
    $ionicSideMenuDelegate.canDragContent(false);
      $state.go('tab.catalouge.item', { catId: item.id });
  };

}])
.controller('CatalougeItemCtrl', ['$scope', '$stateParams', '$rootScope', '$ionicScrollDelegate',function($scope, $stateParams, $rootScope, $ionicScrollDelegate) {
  var catalougeItemId = $stateParams.catId;
  
  var itemCount = $rootScope.catalougeItems.length;
  var item;

  for (var i = 0; i < itemCount; i++) {
    item = $rootScope.catalougeItems[i];

    if (catalougeItemId == item.id) {
      console.log('Item found');
      break;
    }
  }

if (item != undefined) {
    $scope.items = item;
  }


  $scope.getSubcats = function () {
    return item.subcat;
  };

  $scope.getSubcatData = function (subCatItem) {
    return subCatItem.data;
  };

  $scope.getItemHeight = function(item, index) {
    //Make evenly indexed items be 10px taller, for the sake of example
    return (index % 2) === 0 ? 50 : 60;
  };

  $scope.onDragUp = function () {
        console.log("onDragUp: " + $ionicScrollDelegate.getScrollPosition().top);
        $ionicScrollDelegate.scrollBy(0,20);
      };
      $scope.onDragDown = function () {
        console.log("onDragDown: " + $ionicScrollDelegate.getScrollPosition().top);
        $ionicScrollDelegate.scrollBy(0,-20);
      };

}])
.controller('MyVideosCtrl', ['$scope', 'MyVideosService', function($scope, MyVideosService) {

  $scope.numberOfItemsToDisplay = 10; // number of item to load each time

  //Call service to fetch all category listing
  /*MyVideosService.getMyVideos().then(function (response) {
    $scope.catalougeItems = response.data;
  }, function (err) {
      console.log(err);
  });*/

$scope.catalougeItems = getData(); 
      
      function getData() {
        var a = [];
        for (var i=1; i< 1000; i++) {
            a.push(i);
        }
            
        return a;
      }

  $scope.addMoreItem = function(done) {    
    if ($scope.catalougeItems.length > $scope.numberOfItemsToDisplay)
      $scope.numberOfItemsToDisplay += 10; // load 5 more items
      done(); // need to call this when finish loading more data
  };

  $scope.pauseAll = function () {
    alert("Pause All");
  };

  $scope.edit = function () {
      alert("edit");
  };

}])
.controller('MyVideosCtrlGallery', ['$scope', 'MyVideosService', function($scope, MyVideosService) {

  $scope.numberOfItemsToDisplay = 10; // number of item to load each time

  //Call service to fetch all category listing
  /*MyVideosService.getMyVideos().then(function (response) {
    $scope.catalougeItems = response.data;
  }, function (err) {
      console.log(err);
  });*/

$scope.catalougeItems = getData(); 
      
      function getData() {
        var a = [];
        for (var i=1; i< 1000; i++) {
            a.push(i);
        }
            
        return a;
      }

  $scope.addMoreItem = function(done) {    
    if ($scope.catalougeItems.length > $scope.numberOfItemsToDisplay)
      $scope.numberOfItemsToDisplay += 10; // load 5 more items
      
      $scope.$broadcast('scroll.infiniteScrollComplete');
      //done(); // need to call this when finish loading more data
  };

  $scope.pauseAll = function () {
    alert("Pause All");
  };

  $scope.edit = function () {
      alert("edit");
  };

}])
.controller('HomeCtrl', function($scope) {})
.controller('SearchCtrl', function($scope) {})
.controller('ContentController', function($scope) {});