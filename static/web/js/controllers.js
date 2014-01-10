google.load("visualization", "1", {packages:["corechart"]});

analyzerApp.controller('DatasetCtrl', function($scope, $resource, $http) {
  var Dataset = $resource('http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/api/v0/datasets/:dataset_id', {dataset_id:'@dataset_id'})
  var Variable = $resource('http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/api/v0/datasets/:dataset_id/variables/:variable_id',
    {dataset_id: '@dataset_id', variable_id:'@variable_id'})
  $scope.view = 'plot';
  $scope.datasets = Dataset.query();
  $scope.xVariables = [];
  $scope.yVariables = [];
  $scope.chartType = 'LineChart';
  $scope.ttest = null;

  $scope.calculateRegression = function() {

    $scope.regression = null;
    if ($scope.xVariables.length > 1 || $scope.yVariables.length > 1) {
      alert('No support for multivariate regression. Please select one explanatory variable and one response variable.')
      return null
    }
    var url = 'http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/analysis/linear-regression/';
    var params = {'dataset': $scope.selected_dataset.pk, 'x': $scope.xVariables[0].id, 'y':$scope.yVariables[0].id};

    $http({method: 'GET', url: url, params: params}).
      success(function(data, status, headers, config) {
        $scope.regression = data;
        $scope.chartData(true)
      })
  }

  $scope.calculateTTest = function() {
    $scope.ttest = null;
    if (!$scope.yVariables.length == 1) {
      alert('Please insert only one variable.')
      return null
    }
    var url = 'http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/analysis/one-sample-ttest/';
    var params = {'dataset': $scope.selected_dataset.pk, 'variable': $scope.yVariables[0].id, 'mean': $scope.ttest_mean}
    $http({method: 'GET', url: url, params: params}).
      success(function(data, status, headers, config) {
        $scope.ttest = data;
      })
  }

  $scope.chartShowable = function() {
    if (!($scope.xVariables.length || $scope.yVariables.length))
      return false
    else {
      if ($scope.chartType == 'Histogram' && $scope.yVariables.length) {
        return true
      } else if ($scope.yVariables.length && $scope.xVariables.length) {
        return true
      } else {
        return false
      }
    }
  }

  $scope.selectDataset = function(dataset) {
    $scope.dataset_id = dataset.pk;
    $scope.selected_dataset = Dataset.get({dataset_id: $scope.dataset_id});

    $scope.selected_dataset.$promise.then(function(result) {
      $scope.variables = Variable.query({dataset_id: result.pk})
    })
  }

  $scope.dropped = function(dragEl, dropEl) {
    var drop = angular.element(dropEl);
    var drag = angular.element(dragEl);

    if (drop[0].attributes[0].value == 'y-variables') {
      $scope.$apply(function($scope) {
        $scope.yVariables.push(drag.scope().variable)
      })
    } else if (drop[0].attributes[0].value == 'x-variables') {
      $scope.$apply(function($scope) {
        $scope.xVariables.push(drag.scope().variable)
      })
    }

    $scope.chartData()
  }

  $scope.removePlotVariableY = function(variable) {
    $scope.yVariables.splice($scope.yVariables.indexOf(variable), 1);
    $scope.chartData(true);
  }

  $scope.removePlotVariableX = function(variable) {
    $scope.xVariables.splice($scope.xVariables.indexOf(variable), 1);
    $scope.chartData(true)
  }

  $scope.changeChartType = function(value) {
    $scope.chartType = value;
  }

  $scope.chartData = function(applyOrNot) {
    var data = new google.visualization.DataTable()

    _.map(_.union($scope.xVariables, $scope.yVariables), function(variable) {
      if (variable.datatype == 'float' || variable.datatype == 'integer') {
        var columnType = 'number'
      } else if (variable.datatype == 'date') {
        var columnType = 'date'
      } else {
        columnType = variable.datatype;
      }
      
      data.addColumn(columnType, variable.name)
    })

    for (i=0; i < $scope.yVariables[0]['values'].length; i++) {
      var row = []

      _.map(_.union($scope.xVariables, $scope.yVariables), function(variable) {
        if (variable.datatype == 'date') {
          value = new Date(variable.values[i])
        } else {
          var value = variable.values[i]
        }
        row.push(value)
      })
      data.addRow(row)
    }

    var chart = {
      "type" : $scope.chartType,
      "displayed" : true,
      "cssStyle": "height:300px; width:1100px",
      "data" : data,
      "options" : {
        "chartArea": {left:'7%', top:'7%', height:'80%'}, 
        "colors": ['#4ECDC4', '#C7F464', '#FF6B6B', '#C44D58'],
      },
    }

    if ($scope.regression) {
      chart.options.trendlines = {0: {}}
    }

    if (applyOrNot) {
      $scope.chart = chart; 
    } else {
      $scope.$apply(function($scope) {
        $scope.chart = chart; 
      })
    }   
  }

  $scope.$watch('chartType', function(newValue, oldValue) {
    $scope.chartData(true);
  });
})

analyzerApp.controller('FileUploadCtrl', function($scope, $cookies) {
  $scope.name = "Test"
  $scope.setFiles = function(element) {
  $scope.$apply(function($scope) {
    $scope.files = element.files[0]
    $scope.progressVisible = false
    $scope.upload_done = false
    });
  };

  $scope.uploadFile = function(cookies) {
      var fd = new FormData()
      fd.append("file", $scope.files)
      fd.append("name", $scope.name)
      var xhr = new XMLHttpRequest()
      xhr.upload.addEventListener("progress", uploadProgress, false)
      xhr.upload.addEventListener("load", uploadComplete, false)
      xhr.upload.addEventListener("error", uploadFailed, false)
      xhr.upload.addEventListener("abort", uploadCanceled, false)
      xhr.open("POST", "http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/api/v0/datasets/")
      xhr.setRequestHeader("X-CSRFToken", $cookies.csrftoken)
      $scope.progressVisible = true
      xhr.send(fd)
  }

  function uploadProgress(evt) {
      $scope.$apply(function(){
          if (evt.lengthComputable) {
              $scope.progress = Math.round(evt.loaded * 100 / evt.total)
          } else {
              $scope.progress = 'unable to compute'
          }
      })
  }

  function uploadComplete(evt) {
      /* This event is raised when the server send back a response */
      $scope.$apply(function() {
        $scope.upload_done = true;
      })
  }

  function uploadFailed(evt) {
      console.log(evt);
      alert("There was an error attempting to upload the file.")
  }

  function uploadCanceled(evt) {
      $scope.$apply(function(){
          $scope.progressVisible = false
      })
      alert("The upload has been canceled by the user or the browser dropped the connection.")
  }
});

analyzerApp.controller('ApiTokenCtrl', function($scope, $http) {
  var url = 'http://ec2-54-201-213-15.us-west-2.compute.amazonaws.com:80/api/v0/api-token-auth';
  $scope.getToken = function() {
    $http({method: 'GET', url: url}).
      success(function(data, status, headers, config) {
        $scope.token = data;
      });
  }
});
