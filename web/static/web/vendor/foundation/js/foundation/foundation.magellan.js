;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.magellan = {
    name : 'magellan',

    version : '5.0.0',

    settings : {
      active_class: 'active',
      threshold: 0
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.fixed_magellan = $("[data-magellan-expedition]"***REMOVED***;
      this.set_threshold(***REMOVED***;
      this.last_destination = $('[data-magellan-destination]'***REMOVED***.last(***REMOVED***;
      this.events(***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      var self = this;

      $(this.scope***REMOVED***
        .off('.magellan'***REMOVED***
        .on('arrival.fndtn.magellan', '[data-magellan-arrival]', function (e***REMOVED*** {
          var $destination = $(this***REMOVED***,
              $expedition = $destination.closest('[data-magellan-expedition]'***REMOVED***,
              active_class = $expedition.attr('data-magellan-active-class'***REMOVED***
                || self.settings.active_class;

            $destination
              .closest('[data-magellan-expedition]'***REMOVED***
              .find('[data-magellan-arrival]'***REMOVED***
              .not($destination***REMOVED***
              .removeClass(active_class***REMOVED***;
            $destination.addClass(active_class***REMOVED***;
    ***REMOVED******REMOVED***;

      this.fixed_magellan
        .off('.magellan'***REMOVED***
        .on('update-position.fndtn.magellan', function(***REMOVED*** {
          var $el = $(this***REMOVED***;
    ***REMOVED******REMOVED***
        .trigger('update-position'***REMOVED***;

      $(window***REMOVED***
        .off('.magellan'***REMOVED***
        .on('resize.fndtn.magellan', function(***REMOVED*** {
          this.fixed_magellan.trigger('update-position'***REMOVED***;
    ***REMOVED***.bind(this***REMOVED******REMOVED***
        .on('scroll.fndtn.magellan', function(***REMOVED*** {
          var windowScrollTop = $(window***REMOVED***.scrollTop(***REMOVED***;
          self.fixed_magellan.each(function(***REMOVED*** {
            var $expedition = $(this***REMOVED***;
            if (typeof $expedition.data('magellan-top-offset'***REMOVED*** === 'undefined'***REMOVED*** {
              $expedition.data('magellan-top-offset', $expedition.offset(***REMOVED***.top***REMOVED***;
        ***REMOVED***
            if (typeof $expedition.data('magellan-fixed-position'***REMOVED*** === 'undefined'***REMOVED*** {
              $expedition.data('magellan-fixed-position', false***REMOVED***;
        ***REMOVED***
            var fixed_position = (windowScrollTop + self.settings.threshold***REMOVED*** > $expedition.data("magellan-top-offset"***REMOVED***;
            var attr = $expedition.attr('data-magellan-top-offset'***REMOVED***;

            if ($expedition.data("magellan-fixed-position"***REMOVED*** != fixed_position***REMOVED*** {
              $expedition.data("magellan-fixed-position", fixed_position***REMOVED***;
              if (fixed_position***REMOVED*** {
                $expedition.addClass('fixed'***REMOVED***;
                $expedition.css({position:"fixed", top:0***REMOVED******REMOVED***;
          ***REMOVED*** else {
                $expedition.removeClass('fixed'***REMOVED***;
                $expedition.css({position:"", top:""***REMOVED******REMOVED***;
          ***REMOVED***
              if (fixed_position && typeof attr != 'undefined' && attr != false***REMOVED*** {
                $expedition.css({position:"fixed", top:attr + "px"***REMOVED******REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;


      if (this.last_destination.length > 0***REMOVED*** {
        $(window***REMOVED***.on('scroll.fndtn.magellan', function (e***REMOVED*** {
          var windowScrollTop = $(window***REMOVED***.scrollTop(***REMOVED***,
              scrolltopPlusHeight = windowScrollTop + $(window***REMOVED***.height(***REMOVED***,
              lastDestinationTop = Math.ceil(self.last_destination.offset(***REMOVED***.top***REMOVED***;

          $('[data-magellan-destination]'***REMOVED***.each(function (***REMOVED*** {
            var $destination = $(this***REMOVED***,
                destination_name = $destination.attr('data-magellan-destination'***REMOVED***,
                topOffset = $destination.offset(***REMOVED***.top - $destination.outerHeight(true***REMOVED*** - windowScrollTop;
            if (topOffset <= self.settings.threshold***REMOVED*** {
              $("[data-magellan-arrival='" + destination_name + "']"***REMOVED***.trigger('arrival'***REMOVED***;
        ***REMOVED***
            // In large screens we may hit the bottom of the page and dont reach the top of the last magellan-destination, so lets force it
            if (scrolltopPlusHeight >= $(self.scope***REMOVED***.height(***REMOVED*** && lastDestinationTop > windowScrollTop && lastDestinationTop < scrolltopPlusHeight***REMOVED*** {
              $('[data-magellan-arrival]'***REMOVED***.last(***REMOVED***.trigger('arrival'***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***,

    set_threshold : function (***REMOVED*** {
      if (typeof this.settings.threshold !== 'number'***REMOVED*** {
        this.settings.threshold = (this.fixed_magellan.length > 0***REMOVED*** ?
          this.fixed_magellan.outerHeight(true***REMOVED*** : 0;
  ***REMOVED***
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.magellan'***REMOVED***;
      $(window***REMOVED***.off('.fndtn.magellan'***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
