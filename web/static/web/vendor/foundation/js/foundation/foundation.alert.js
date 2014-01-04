;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '5.0.0',

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (***REMOVED***{***REMOVED***
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.alert'***REMOVED***.on('click.fndtn.alert', '[data-alert] a.close', function (e***REMOVED*** {
          var alertBox = $(this***REMOVED***.closest("[data-alert]"***REMOVED***,
              settings = alertBox.data('alert-init'***REMOVED***;

        e.preventDefault(***REMOVED***;
        alertBox[settings.animation](settings.speed, function (***REMOVED*** {
          $(this***REMOVED***.trigger('closed'***REMOVED***.remove(***REMOVED***;
          settings.callback(***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
