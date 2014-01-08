var analyzerApp = angular.module('analyzerApp', 
  ['ngResource', 'googlechart', 'ngRoute', 'ngCookies', 'lvl.directives.dragdrop']***REMOVED***;


analyzerApp.config(['$routeProvider',
  function($routeProvider***REMOVED*** {
    $routeProvider.
      when('/upload', {
        templateUrl: 'static/web/partials/upload.html',
        controller: 'FileUploadCtrl'
  ***REMOVED******REMOVED***.
      when('/', {
        templateUrl: 'static/web/partials/dataset-template.html',
        controller: 'DatasetCtrl'
  ***REMOVED******REMOVED***.
      when('/api-token', {
        templateUrl: 'static/web/partials/api_token.html',
        controller: 'ApiTokenCtrl'
  ***REMOVED******REMOVED***.
      otherwise({
        redirectTo: '/'
  ***REMOVED******REMOVED***;
  ***REMOVED***]***REMOVED***;

analyzerApp.config(['$httpProvider',  
  function($httpProvider***REMOVED*** {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  ***REMOVED***

]***REMOVED***

analyzerApp.run(
  function($http, $cookies***REMOVED***{
    $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;
***REMOVED******REMOVED***;


