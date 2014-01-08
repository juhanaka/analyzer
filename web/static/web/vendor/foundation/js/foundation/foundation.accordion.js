;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.0.1',

    settings : {
      active_class: 'active',
      toggleable: true
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.accordion'***REMOVED***.on('click.fndtn.accordion', '[data-accordion] > dd > a', function (e***REMOVED*** {
        var accordion = $(this***REMOVED***.parent(***REMOVED***,
            target = $('#' + this.href.split('#'***REMOVED***[1]***REMOVED***,
            siblings = $('> dd > .content', target.closest('[data-accordion]'***REMOVED******REMOVED***,
            settings = accordion.parent(***REMOVED***.data('accordion-init'***REMOVED***,
            active = $('> dd > .content.' + settings.active_class, accordion.parent(***REMOVED******REMOVED***;

        e.preventDefault(***REMOVED***;

        if (active[0] == target[0] && settings.toggleable***REMOVED*** {
          return target.toggleClass(settings.active_class***REMOVED***;
    ***REMOVED***

        siblings.removeClass(settings.active_class***REMOVED***;
        target.addClass(settings.active_class***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***,

    off : function (***REMOVED*** {***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
