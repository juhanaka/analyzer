
google.load("visualization", "1", {packages:["corechart"]***REMOVED******REMOVED***;

analyzerApp.controller('DatasetCtrl', function($scope, $resource, $http***REMOVED*** {
  var Dataset = $resource('http://localhost:8000/api/v0/datasets/:dataset_id', {dataset_id:'@dataset_id'***REMOVED******REMOVED***
  var Variable = $resource('http://localhost:8000/api/v0/datasets/:dataset_id/variables/:variable_id',
    {dataset_id: '@dataset_id', variable_id:'@variable_id'***REMOVED******REMOVED***
  $scope.view = 'plot';
  $scope.datasets = Dataset.query(***REMOVED***;
  $scope.xVariables = [];
  $scope.yVariables = [];
  $scope.chartType = 'LineChart';
  $scope.ttest = null;

  $scope.calculateRegression = function(***REMOVED*** {

    $scope.regression = null;
    if ($scope.xVariables.length > 1 || $scope.yVariables.length > 1***REMOVED*** {
      alert('No support for multivariate regression. Please select one explanatory variable and one response variable.'***REMOVED***
      return null
***REMOVED***
    var url = 'http://localhost:8000/analysis/linear-regression/';
    var params = {'dataset': $scope.selected_dataset.pk, 'x': $scope.xVariables[0].id, 'y':$scope.yVariables[0].id***REMOVED***;

    $http({method: 'GET', url: url, params: params***REMOVED******REMOVED***.
      success(function(data, status, headers, config***REMOVED*** {
        $scope.regression = data;
        $scope.chartData(true***REMOVED***
  ***REMOVED******REMOVED***
  ***REMOVED***

  $scope.calculateTTest = function(***REMOVED*** {
    $scope.ttest = null;
    if (!$scope.yVariables.length == 1***REMOVED*** {
      alert('Please insert only one variable.'***REMOVED***
      return null
***REMOVED***
    var url = 'http://localhost:8000/analysis/one-sample-ttest/';
    var params = {'dataset': $scope.selected_dataset.pk, 'variable': $scope.yVariables[0].id, 'mean': $scope.ttest_mean***REMOVED***
    $http({method: 'GET', url: url, params: params***REMOVED******REMOVED***.
      success(function(data, status, headers, config***REMOVED*** {
        $scope.ttest = data;
  ***REMOVED******REMOVED***
  ***REMOVED***

  $scope.chartShowable = function(***REMOVED*** {
    if (!($scope.xVariables.length || $scope.yVariables.length***REMOVED******REMOVED***
      return false
    else {
      if ($scope.chartType == 'Histogram' && $scope.yVariables.length***REMOVED*** {
        return true
  ***REMOVED*** else if ($scope.yVariables.length && $scope.xVariables.length***REMOVED*** {
        return true
  ***REMOVED*** else {
        return false
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  $scope.selectDataset = function(dataset***REMOVED*** {
    $scope.dataset_id = dataset.pk;
    $scope.selected_dataset = Dataset.get({dataset_id: $scope.dataset_id***REMOVED******REMOVED***;

    $scope.selected_dataset.$promise.then(function(result***REMOVED*** {
      $scope.variables = Variable.query({dataset_id: result.pk***REMOVED******REMOVED***
***REMOVED******REMOVED***
  ***REMOVED***

  $scope.dropped = function(dragEl, dropEl***REMOVED*** {
    var drop = angular.element(dropEl***REMOVED***;
    var drag = angular.element(dragEl***REMOVED***;

    if (drop[0].attributes[0].value == 'y-variables'***REMOVED*** {
      $scope.$apply(function($scope***REMOVED*** {
        $scope.yVariables.push(drag.scope(***REMOVED***.variable***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED*** else if (drop[0].attributes[0].value == 'x-variables'***REMOVED*** {
      $scope.$apply(function($scope***REMOVED*** {
        $scope.xVariables.push(drag.scope(***REMOVED***.variable***REMOVED***
  ***REMOVED******REMOVED***
***REMOVED***

    $scope.chartData(***REMOVED***
  ***REMOVED***

  $scope.removePlotVariableY = function(variable***REMOVED*** {
    $scope.yVariables.splice($scope.yVariables.indexOf(variable***REMOVED***, 1***REMOVED***;
    $scope.chartData(true***REMOVED***;
  ***REMOVED***

  $scope.removePlotVariableX = function(variable***REMOVED*** {
    $scope.xVariables.splice($scope.xVariables.indexOf(variable***REMOVED***, 1***REMOVED***;
    $scope.chartData(true***REMOVED***
  ***REMOVED***

  $scope.changeChartType = function(value***REMOVED*** {
    $scope.chartType = value;
  ***REMOVED***

  $scope.chartData = function(applyOrNot***REMOVED*** {
    var data = new google.visualization.DataTable(***REMOVED***

    _.map(_.union($scope.xVariables, $scope.yVariables***REMOVED***, function(variable***REMOVED*** {
      if (variable.datatype == 'float' || variable.datatype == 'integer'***REMOVED*** {
        var columnType = 'number'
  ***REMOVED*** else if (variable.datatype == 'date'***REMOVED*** {
        var columnType = 'date'
  ***REMOVED*** else {
        columnType = variable.datatype;
  ***REMOVED***
      
      data.addColumn(columnType, variable.name***REMOVED***
***REMOVED******REMOVED***

    for (i=0; i < $scope.yVariables[0]['values'].length; i++***REMOVED*** {
      var row = []

      _.map(_.union($scope.xVariables, $scope.yVariables***REMOVED***, function(variable***REMOVED*** {
        if (variable.datatype == 'date'***REMOVED*** {
          value = new Date(variable.values[i]***REMOVED***
    ***REMOVED*** else {
          var value = variable.values[i]
    ***REMOVED***
        row.push(value***REMOVED***
  ***REMOVED******REMOVED***
      data.addRow(row***REMOVED***
***REMOVED***

    var chart = {
      "type" : $scope.chartType,
      "displayed" : true,
      "cssStyle": "height:300px; width:1100px",
      "data" : data,
      "options" : {
        "chartArea": {left:'7%', top:'7%', height:'80%'***REMOVED***, 
        "colors": ['#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'],
  ***REMOVED***,
***REMOVED***

    if ($scope.regression***REMOVED*** {
      chart.options.trendlines = {0: {***REMOVED******REMOVED***
***REMOVED***

    if (applyOrNot***REMOVED*** {
      $scope.chart = chart; 
***REMOVED*** else {
      $scope.$apply(function($scope***REMOVED*** {
        $scope.chart = chart; 
  ***REMOVED******REMOVED***
***REMOVED***   
  ***REMOVED***

  $scope.$watch('chartType', function(newValue, oldValue***REMOVED*** {
    $scope.chartData(true***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED******REMOVED***

analyzerApp.controller('FileUploadCtrl', function($scope, $cookies***REMOVED*** {
  $scope.name = "Test"
  $scope.setFiles = function(element***REMOVED*** {
  $scope.$apply(function($scope***REMOVED*** {
    $scope.files = element.files[0]
    $scope.progressVisible = false
    $scope.upload_done = false
***REMOVED******REMOVED***;
  ***REMOVED***;

  $scope.uploadFile = function(cookies***REMOVED*** {
      var fd = new FormData(***REMOVED***
      fd.append("file", $scope.files***REMOVED***
      fd.append("name", $scope.name***REMOVED***
      var xhr = new XMLHttpRequest(***REMOVED***
      xhr.upload.addEventListener("progress", uploadProgress, false***REMOVED***
      xhr.upload.addEventListener("load", uploadComplete, false***REMOVED***
      xhr.upload.addEventListener("error", uploadFailed, false***REMOVED***
      xhr.upload.addEventListener("abort", uploadCanceled, false***REMOVED***
      xhr.open("POST", "http://localhost:8000/api/v0/datasets/"***REMOVED***
      xhr.setRequestHeader("X-CSRFToken", $cookies.csrftoken***REMOVED***
      $scope.progressVisible = true
      xhr.send(fd***REMOVED***
  ***REMOVED***

  function uploadProgress(evt***REMOVED*** {
      $scope.$apply(function(***REMOVED***{
          if (evt.lengthComputable***REMOVED*** {
              $scope.progress = Math.round(evt.loaded * 100 / evt.total***REMOVED***
      ***REMOVED*** else {
              $scope.progress = 'unable to compute'
      ***REMOVED***
  ***REMOVED******REMOVED***
  ***REMOVED***

  function uploadComplete(evt***REMOVED*** {
      /* This event is raised when the server send back a response */
      $scope.$apply(function(***REMOVED*** {
        $scope.upload_done = true;
  ***REMOVED******REMOVED***
  ***REMOVED***

  function uploadFailed(evt***REMOVED*** {
      alert("There was an error attempting to upload the file."***REMOVED***
  ***REMOVED***

  function uploadCanceled(evt***REMOVED*** {
      $scope.$apply(function(***REMOVED***{
          $scope.progressVisible = false
  ***REMOVED******REMOVED***
      alert("The upload has been canceled by the user or the browser dropped the connection."***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;

analyzerApp.controller('ApiTokenCtrl', function($scope, $http***REMOVED*** {
  var url = 'http://localhost:8000/api/v0/api-token-auth';
  $scope.getToken = function(***REMOVED*** {
    $http({method: 'GET', url: url***REMOVED******REMOVED***.
      success(function(data, status, headers, config***REMOVED*** {
        $scope.token = data;
  ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;