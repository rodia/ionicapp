var api_key = 'e372a5cede47dde4758d868675848a02';
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AppSearch', function($scope, $http) {
  //http://api.themoviedb.org/3/search/

  var element = document.getElementById("search");
  var keyword = element.text;

  if (keyword != '') {
    $http.get('http://api.themoviedb.org/3/search/' + keyword + '?api_key=' + api_key).then(function(resp) {
      $scope.playlists = resp.data.results;
    }, function(err) {
      console.error('ERR', err);
    });
  }
})

.controller('AppGenres', function($scope, $http) {

  $http.get('http://api.themoviedb.org/3/discover/movie?api_key=' + api_key).then(function(resp) {
    $scope.genres = resp.data.results;
  }, function(err) {
    console.error('ERR', err);
  });
})

.controller('PlaylistsCtrl', function($scope, $http) {

  $http.get('http://api.themoviedb.org/3/discover/movie?api_key=' + api_key).then(function(resp) {
    $scope.playlists = resp.data.results;
  }, function(err) {
    console.error('ERR', err);
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams, $http) {

  console.log($stateParams.playlistId);

  $http.get('http://api.themoviedb.org/3/movie/' + $stateParams.playlistId + '?api_key=' + api_key).then(function(resp) {
    $scope.playlist = resp.data;
  }, function(err) {
    console.error('ERR', err);
  });
});
