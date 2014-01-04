var module;

try {
    module = angular.module('lvl.services'***REMOVED***;  
***REMOVED*** catch (e***REMOVED*** {
    module  = angular.module('lvl.services', []***REMOVED***;
***REMOVED***

module.factory('uuid', function(***REMOVED*** {
    var svc = {
        new: function(***REMOVED*** {
            function _p8(s***REMOVED*** {
                var p = (Math.random(***REMOVED***.toString(16***REMOVED***+"000000000"***REMOVED***.substr(2,8***REMOVED***;
                return s ? "-" + p.substr(0,4***REMOVED*** + "-" + p.substr(4,4***REMOVED*** : p ;
        ***REMOVED***
            return _p8(***REMOVED*** + _p8(true***REMOVED*** + _p8(true***REMOVED*** + _p8(***REMOVED***;
    ***REMOVED***,
        
        empty: function(***REMOVED*** {
          return '00000000-0000-0000-0000-000000000000';
    ***REMOVED***
***REMOVED***;
    
    return svc;
***REMOVED******REMOVED***;