var analyzerApp = angular.module('analyzerApp', 
  ['ngResource', 'googlechart', 'ngRoute', 'ngCookies', 'lvl.directives.dragdrop']);


analyzerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/upload', {
        templateUrl: 'static/web/partials/upload.html',
        controller: 'FileUploadCtrl'
      }).
      when('/', {
        templateUrl: 'static/web/partials/dataset-template.html',
        controller: 'DatasetCtrl'
      }).
      when('/api-token', {
        templateUrl: 'static/web/partials/api_token.html',
        controller: 'ApiTokenCtrl'
      }).
      when('/api-docs', {
        templateUrl: 'static/web/partials/api_docs.html',
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

analyzerApp.config(['$httpProvider',  
  function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  }

])

analyzerApp.run(
  function($http, $cookies){
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
});


