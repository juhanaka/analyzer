;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.0.0',

    settings : {***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.events(***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.offcanvas'***REMOVED***
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          $(this***REMOVED***.closest('.off-canvas-wrap'***REMOVED***.toggleClass('move-right'***REMOVED***;
    ***REMOVED******REMOVED***
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          $(".off-canvas-wrap"***REMOVED***.removeClass("move-right"***REMOVED***;
    ***REMOVED******REMOVED***
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          $(this***REMOVED***.closest(".off-canvas-wrap"***REMOVED***.toggleClass("move-left"***REMOVED***;
    ***REMOVED******REMOVED***
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          $(".off-canvas-wrap"***REMOVED***.removeClass("move-left"***REMOVED***;
    ***REMOVED******REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
