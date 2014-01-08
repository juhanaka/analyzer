/*jslint unparam: true, browser: true, indent: 2 */
;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.0.1',

    settings : {
      active_class: 'active'
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.tab'***REMOVED***.on('click.fndtn.tab', '[data-tab] > dd > a', function (e***REMOVED*** {
        e.preventDefault(***REMOVED***;

        var tab = $(this***REMOVED***.parent(***REMOVED***,
            target = $('#' + this.href.split('#'***REMOVED***[1]***REMOVED***,
            siblings = tab.siblings(***REMOVED***,
            settings = tab.closest('[data-tab]'***REMOVED***.data('tab-init'***REMOVED***;

        tab.addClass(settings.active_class***REMOVED***;
        siblings.removeClass(settings.active_class***REMOVED***;
        target.siblings(***REMOVED***.removeClass(settings.active_class***REMOVED***.end(***REMOVED***.addClass(settings.active_class***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***,

    off : function (***REMOVED*** {***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
