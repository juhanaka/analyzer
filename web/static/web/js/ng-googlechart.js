(function (document, window***REMOVED*** {
    'use strict';

    angular.module('googlechart', []***REMOVED***

        .constant('googleChartApiConfig', {
            version: '1',
            optionalSettings: {
                packages: ['corechart']
        ***REMOVED***
    ***REMOVED******REMOVED***

        .provider('googleJsapiUrl', function (***REMOVED*** {
            var protocol = '';
            var url = '//www.google.com/jsapi';

            this.setProtocol = function(newProtocol***REMOVED*** {
                protocol = newProtocol;
        ***REMOVED***;

            this.setUrl = function(newUrl***REMOVED*** {
                url = newUrl;
        ***REMOVED***;

            this.$get = function(***REMOVED*** {
                return (protocol ? protocol : ''***REMOVED*** + url;
        ***REMOVED***;
    ***REMOVED******REMOVED***

        .factory('googleChartApiProxy', ['$rootScope', '$q', 'googleChartApiConfig', 'googleJsapiUrl', function ($rootScope, $q, apiConfig, googleJsapiUrl***REMOVED*** {
            var apiReady = $q.defer(***REMOVED***,
                onLoad = function (***REMOVED*** {
                    // override callback function
                    var settings = {
                        callback: function (***REMOVED*** {
                            var oldCb = apiConfig.optionalSettings.callback;
                            $rootScope.$apply(function (***REMOVED*** {
                                apiReady.resolve(***REMOVED***;
                        ***REMOVED******REMOVED***;

                            if (angular.isFunction(oldCb***REMOVED******REMOVED*** {
                                oldCb.call(this***REMOVED***;
                        ***REMOVED***
                    ***REMOVED***
                ***REMOVED***;

                    settings = angular.extend({***REMOVED***, apiConfig.optionalSettings, settings***REMOVED***;

                    window.google.load('visualization', apiConfig.version, settings***REMOVED***;
            ***REMOVED***;

            jQuery.getScript(googleJsapiUrl, onLoad***REMOVED***;

            return function (fn, context***REMOVED*** {
                var args = Array.prototype.slice.call(arguments, 2***REMOVED***;
                return function (***REMOVED*** {
                    apiReady.promise.then(function (***REMOVED*** {
                        fn.apply(context, args.concat(Array.prototype.slice.call(arguments***REMOVED******REMOVED******REMOVED***;
                ***REMOVED******REMOVED***;
            ***REMOVED***;
        ***REMOVED***;
    ***REMOVED***]***REMOVED***

        .directive('googleChart', ['$timeout', '$window', '$rootScope', 'googleChartApiProxy', function ($timeout, $window, $rootScope, apiProxy***REMOVED*** {
            return {
                restrict: 'A',
                scope: {
                    chart: '=chart',
                    onReady: '&',
                    select: '&'
            ***REMOVED***,
                link: function ($scope, $elm, $attr***REMOVED*** {
                    // Watches, to refresh the chart when its data, title or dimensions change
                    $scope.$watch('chart', function (***REMOVED*** {
                        draw(***REMOVED***;
                ***REMOVED***, true***REMOVED***; // true is for deep object equality checking

                    // Redraw the chart if the window is resized
                    $rootScope.$on('resizeMsg', function (e***REMOVED*** {
                        $timeout(function (***REMOVED*** {
                            // Not always defined yet in IE so check
                            if($scope.chartWrapper***REMOVED*** {
                                $scope.chartWrapper.draw(***REMOVED***;
                        ***REMOVED***
                    ***REMOVED******REMOVED***;
                ***REMOVED******REMOVED***;

                    function applyFormat(formatType, formatClass, dataTable***REMOVED*** {

                        if (typeof($scope.chart.formatters[formatType]***REMOVED*** != 'undefined'***REMOVED*** {
                            if ($scope.formatters[formatType] == null***REMOVED*** {
                                $scope.formatters[formatType] = new Array(***REMOVED***;

                                if (formatType === 'color'***REMOVED*** {
                                    for (var cIdx = 0; cIdx < $scope.chart.formatters[formatType].length; cIdx++***REMOVED*** {
                                        var colorFormat = new formatClass(***REMOVED***;

                                        for (var i = 0; i < $scope.chart.formatters[formatType][cIdx].formats.length; i++***REMOVED*** {
                                            var data = $scope.chart.formatters[formatType][cIdx].formats[i];

                                            if (typeof(data.fromBgColor***REMOVED*** != 'undefined' && typeof(data.toBgColor***REMOVED*** != 'undefined'***REMOVED***
                                                colorFormat.addGradientRange(data.from, data.to, data.color, data.fromBgColor, data.toBgColor***REMOVED***;
                                            else
                                                colorFormat.addRange(data.from, data.to, data.color, data.bgcolor***REMOVED***;
                                    ***REMOVED***

                                        $scope.formatters[formatType].push(colorFormat***REMOVED***
                                ***REMOVED***
                            ***REMOVED*** else {

                                    for (var i = 0; i < $scope.chart.formatters[formatType].length; i++***REMOVED*** {
                                        $scope.formatters[formatType].push(new formatClass(
                                            $scope.chart.formatters[formatType][i]***REMOVED***
                                        ***REMOVED***;
                                ***REMOVED***
                            ***REMOVED***
                        ***REMOVED***


                            //apply formats to dataTable
                            for (var i = 0; i < $scope.formatters[formatType].length; i++***REMOVED*** {
                                if ($scope.chart.formatters[formatType][i].columnNum < dataTable.getNumberOfColumns(***REMOVED******REMOVED***
                                    $scope.formatters[formatType][i].format(dataTable, $scope.chart.formatters[formatType][i].columnNum***REMOVED***;
                        ***REMOVED***


                            //Many formatters require HTML tags to display special formatting
                            if (formatType === 'arrow' || formatType === 'bar' || formatType === 'color'***REMOVED***
                                $scope.chart.options.allowHtml = true;
                    ***REMOVED***
                ***REMOVED***

                    function draw(***REMOVED*** {
                        if (!draw.triggered && ($scope.chart != undefined***REMOVED******REMOVED*** {
                            draw.triggered = true;
                            $timeout(function (***REMOVED*** {
                                draw.triggered = false;

                                if (typeof($scope.formatters***REMOVED*** === 'undefined'***REMOVED***
                                    $scope.formatters = {***REMOVED***;

                                var dataTable;
                                if ($scope.chart.data instanceof google.visualization.DataTable***REMOVED***
                                    dataTable = $scope.chart.data;
                                else
                                    dataTable = new google.visualization.DataTable($scope.chart.data, 0.5***REMOVED***;

                                if (typeof($scope.chart.formatters***REMOVED*** != 'undefined'***REMOVED*** {
                                    applyFormat("number", google.visualization.NumberFormat, dataTable***REMOVED***;
                                    applyFormat("arrow", google.visualization.ArrowFormat, dataTable***REMOVED***;
                                    applyFormat("date", google.visualization.DateFormat, dataTable***REMOVED***;
                                    applyFormat("bar", google.visualization.BarFormat, dataTable***REMOVED***;
                                    applyFormat("color", google.visualization.ColorFormat, dataTable***REMOVED***;
                            ***REMOVED***


                                var chartWrapperArgs = {
                                    chartType: $scope.chart.type,
                                    dataTable: dataTable,
                                    view: $scope.chart.view,
                                    options: $scope.chart.options,
                                    containerId: $elm[0]
                            ***REMOVED***;

                                if ($scope.chartWrapper == null***REMOVED*** {
                                    $scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs***REMOVED***;
                                    google.visualization.events.addListener($scope.chartWrapper, 'ready', function (***REMOVED*** {
                                        $scope.chart.displayed = true;
                                        $scope.$apply(function (scope***REMOVED*** {
                                            scope.onReady({chartWrapper: scope.chartWrapper***REMOVED******REMOVED***;
                                    ***REMOVED******REMOVED***;
                                ***REMOVED******REMOVED***;
                                    google.visualization.events.addListener($scope.chartWrapper, 'error', function (err***REMOVED*** {
                                        console.log("Chart not displayed due to error: " + err.message***REMOVED***;
                                ***REMOVED******REMOVED***;
                                    google.visualization.events.addListener($scope.chartWrapper, 'select', function (***REMOVED*** {
                                        var selectedItem = $scope.chartWrapper.getChart(***REMOVED***.getSelection(***REMOVED***[0];
                                        if (selectedItem***REMOVED*** {
                                            $scope.$apply(function (***REMOVED*** {
                                                $scope.select({selectedItem: selectedItem***REMOVED******REMOVED***;
                                        ***REMOVED******REMOVED***;
                                    ***REMOVED***
                                ***REMOVED******REMOVED***;
                            ***REMOVED***
                                else {
                                    $scope.chartWrapper.setChartType($scope.chart.type***REMOVED***;
                                    $scope.chartWrapper.setDataTable(dataTable***REMOVED***;
                                    $scope.chartWrapper.setView($scope.chart.view***REMOVED***;
                                    $scope.chartWrapper.setOptions($scope.chart.options***REMOVED***;
                            ***REMOVED***


                                $timeout(function (***REMOVED*** {
                                    $scope.chartWrapper.draw(***REMOVED***;
                            ***REMOVED******REMOVED***;
                        ***REMOVED***, 0, true***REMOVED***;
                    ***REMOVED***
                ***REMOVED***

                    draw = apiProxy(draw, this***REMOVED***;
            ***REMOVED***
        ***REMOVED***;
    ***REMOVED***]***REMOVED***

        .run(['$rootScope', '$window', function ($rootScope, $window***REMOVED*** {
            angular.element($window***REMOVED***.bind('resize', function (***REMOVED*** {
                $rootScope.$emit('resizeMsg'***REMOVED***;
        ***REMOVED******REMOVED***;
    ***REMOVED***]***REMOVED***;

***REMOVED******REMOVED***(document, window***REMOVED***;

