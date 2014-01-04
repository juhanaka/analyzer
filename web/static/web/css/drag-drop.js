var module = angular.module("lvl.directives.dragdrop", ['lvl.services']***REMOVED***;

module.directive('lvlDraggable', ['$rootScope', 'uuid', function($rootScope, uuid***REMOVED*** {
            return {
                restrict: 'A',
                link: function(scope, el, attrs, controller***REMOVED*** {
                        angular.element(el***REMOVED***.attr("draggable", "true"***REMOVED***;
                    
                    var id = angular.element(el***REMOVED***.attr("id"***REMOVED***;
                    if (!id***REMOVED*** {
                        id = uuid.new(***REMOVED***
                        angular.element(el***REMOVED***.attr("id", id***REMOVED***;
                ***REMOVED***
                    
                    el.bind("dragstart", function(e***REMOVED*** {
                        e.dataTransfer.setData('text', id***REMOVED***;

                        $rootScope.$emit("LVL-DRAG-START"***REMOVED***;
                ***REMOVED******REMOVED***;
                    
                    el.bind("dragend", function(e***REMOVED*** {
                        $rootScope.$emit("LVL-DRAG-END"***REMOVED***;
                ***REMOVED******REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***]***REMOVED***;

module.directive('lvlDropTarget', ['$rootScope', 'uuid', function($rootScope, uuid***REMOVED*** {
            return {
                restrict: 'A',
                scope: {
                    onDrop: '&'
            ***REMOVED***,
                link: function(scope, el, attrs, controller***REMOVED*** {
                    var id = angular.element(el***REMOVED***.attr("id"***REMOVED***;
                    if (!id***REMOVED*** {
                        id = uuid.new(***REMOVED***
                        angular.element(el***REMOVED***.attr("id", id***REMOVED***;
                ***REMOVED***
                               
                    el.bind("dragover", function(e***REMOVED*** {
                      if (e.preventDefault***REMOVED*** {
                        e.preventDefault(***REMOVED***; // Necessary. Allows us to drop.
                  ***REMOVED***
                      
                      e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
                      return false;
                ***REMOVED******REMOVED***;
                    
                    el.bind("dragenter", function(e***REMOVED*** {
                      // this / e.target is the current hover target.
                      angular.element(e.target***REMOVED***.addClass('lvl-over'***REMOVED***;
                ***REMOVED******REMOVED***;
                    
                    el.bind("dragleave", function(e***REMOVED*** {
                      angular.element(e.target***REMOVED***.removeClass('lvl-over'***REMOVED***;  // this / e.target is previous target element.
                ***REMOVED******REMOVED***;
                    
                    el.bind("drop", function(e***REMOVED*** {
                      if (e.preventDefault***REMOVED*** {
                        e.preventDefault(***REMOVED***; // Necessary. Allows us to drop.
                  ***REMOVED***

                      if (e.stopPropogation***REMOVED*** {
                        e.stopPropogation(***REMOVED***; // Necessary. Allows us to drop.
                  ***REMOVED***
                            var data = e.dataTransfer.getData("text"***REMOVED***;
                        var dest = document.getElementById(id***REMOVED***;
                        var src = document.getElementById(data***REMOVED***;
                        
                        scope.onDrop({dragEl: src, dropEl: dest***REMOVED******REMOVED***;
                ***REMOVED******REMOVED***;

                    $rootScope.$on("LVL-DRAG-START", function(***REMOVED*** {
                        var el = document.getElementById(id***REMOVED***;
                        angular.element(el***REMOVED***.addClass("lvl-target"***REMOVED***;
                ***REMOVED******REMOVED***;
                    
                    $rootScope.$on("LVL-DRAG-END", function(***REMOVED*** {
                        var el = document.getElementById(id***REMOVED***;
                        angular.element(el***REMOVED***.removeClass("lvl-target"***REMOVED***;
                        angular.element(el***REMOVED***.removeClass("lvl-over"***REMOVED***;
                ***REMOVED******REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***
        ] ***REMOVED***;