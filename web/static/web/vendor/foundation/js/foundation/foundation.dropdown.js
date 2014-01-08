;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.0.0',

    settings : {
      active_class: 'open',
      is_hover: false,
      opened: function(***REMOVED***{***REMOVED***,
      closed: function(***REMOVED***{***REMOVED***
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      Foundation.inherit(this, 'throttle'***REMOVED***;

      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (scope***REMOVED*** {
      var self = this;

      $(this.scope***REMOVED***
        .off('.dropdown'***REMOVED***
        .on('click.fndtn.dropdown', '[data-dropdown]', function (e***REMOVED*** {
          var settings = $(this***REMOVED***.data('dropdown-init'***REMOVED***;
          e.preventDefault(***REMOVED***;

          if (!settings.is_hover || Modernizr.touch***REMOVED*** self.toggle($(this***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***
        .on('mouseenter.fndtn.dropdown', '[data-dropdown], [data-dropdown-content]', function (e***REMOVED*** {
          var $this = $(this***REMOVED***;
          clearTimeout(self.timeout***REMOVED***;

          if ($this.data('dropdown'***REMOVED******REMOVED*** {
            var dropdown = $('#' + $this.data('dropdown'***REMOVED******REMOVED***,
                target = $this;
      ***REMOVED*** else {
            var dropdown = $this;
                target = $("[data-dropdown='" + dropdown.attr('id'***REMOVED*** + "']"***REMOVED***;
      ***REMOVED***

          var settings = target.data('dropdown-init'***REMOVED***;
          if (settings.is_hover***REMOVED*** self.open.apply(self, [dropdown, target]***REMOVED***;
    ***REMOVED******REMOVED***
        .on('mouseleave.fndtn.dropdown', '[data-dropdown], [data-dropdown-content]', function (e***REMOVED*** {
          var $this = $(this***REMOVED***;
          self.timeout = setTimeout(function (***REMOVED*** {
            if ($this.data('dropdown'***REMOVED******REMOVED*** {
              var settings = $this.data('dropdown-init'***REMOVED***;
              if (settings.is_hover***REMOVED*** self.close.call(self, $('#' + $this.data('dropdown'***REMOVED******REMOVED******REMOVED***;
        ***REMOVED*** else {
              var target = $('[data-dropdown="' + $(this***REMOVED***.attr('id'***REMOVED*** + '"]'***REMOVED***,
                  settings = target.data('dropdown-init'***REMOVED***;
              if (settings.is_hover***REMOVED*** self.close.call(self, $this***REMOVED***;
        ***REMOVED***
      ***REMOVED***.bind(this***REMOVED***, 150***REMOVED***;
    ***REMOVED******REMOVED***
        .on('click.fndtn.dropdown', function (e***REMOVED*** {
          var parent = $(e.target***REMOVED***.closest('[data-dropdown-content]'***REMOVED***;

          if ($(e.target***REMOVED***.data('dropdown'***REMOVED*** || $(e.target***REMOVED***.parent(***REMOVED***.data('dropdown'***REMOVED******REMOVED*** {
            return;
      ***REMOVED***
          if (!($(e.target***REMOVED***.data('revealId'***REMOVED******REMOVED*** && 
            (parent.length > 0 && ($(e.target***REMOVED***.is('[data-dropdown-content]'***REMOVED*** || 
              $.contains(parent.first(***REMOVED***[0], e.target***REMOVED******REMOVED******REMOVED******REMOVED*** {
            e.stopPropagation(***REMOVED***;
            return;
      ***REMOVED***

          self.close.call(self, $('[data-dropdown-content]'***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***
        .on('opened.fndtn.dropdown', '[data-dropdown-content]', this.settings.opened***REMOVED***
        .on('closed.fndtn.dropdown', '[data-dropdown-content]', this.settings.closed***REMOVED***;

      $(window***REMOVED***
        .off('.dropdown'***REMOVED***
        .on('resize.fndtn.dropdown', self.throttle(function (***REMOVED*** {
          self.resize.call(self***REMOVED***;
    ***REMOVED***, 50***REMOVED******REMOVED***.trigger('resize'***REMOVED***;
***REMOVED***,

    close: function (dropdown***REMOVED*** {
      var self = this;
      dropdown.each(function (***REMOVED*** {
        if ($(this***REMOVED***.hasClass(self.settings.active_class***REMOVED******REMOVED*** {
          $(this***REMOVED***
            .css(Foundation.rtl ? 'right':'left', '-99999px'***REMOVED***
            .removeClass(self.settings.active_class***REMOVED***;
          $(this***REMOVED***.trigger('closed'***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***,

    open: function (dropdown, target***REMOVED*** {
        this
          .css(dropdown
            .addClass(this.settings.active_class***REMOVED***, target***REMOVED***;
        dropdown.trigger('opened'***REMOVED***;
***REMOVED***,

    toggle : function (target***REMOVED*** {
      var dropdown = $('#' + target.data('dropdown'***REMOVED******REMOVED***;
      if (dropdown.length === 0***REMOVED*** {
        // No dropdown found, not continuing
        return;
  ***REMOVED***

      this.close.call(this, $('[data-dropdown-content]'***REMOVED***.not(dropdown***REMOVED******REMOVED***;

      if (dropdown.hasClass(this.settings.active_class***REMOVED******REMOVED*** {
        this.close.call(this, dropdown***REMOVED***;
  ***REMOVED*** else {
        this.close.call(this, $('[data-dropdown-content]'***REMOVED******REMOVED***
        this.open.call(this, dropdown, target***REMOVED***;
  ***REMOVED***
***REMOVED***,

    resize : function (***REMOVED*** {
      var dropdown = $('[data-dropdown-content].open'***REMOVED***,
          target = $("[data-dropdown='" + dropdown.attr('id'***REMOVED*** + "']"***REMOVED***;

      if (dropdown.length && target.length***REMOVED*** {
        this.css(dropdown, target***REMOVED***;
  ***REMOVED***
***REMOVED***,

    css : function (dropdown, target***REMOVED*** {
      var offset_parent = dropdown.offsetParent(***REMOVED***,
          position = target.offset(***REMOVED***;

      position.top -= offset_parent.offset(***REMOVED***.top;
      position.left -= offset_parent.offset(***REMOVED***.left;

      if (this.small(***REMOVED******REMOVED*** {
        dropdown.css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: position.top + target.outerHeight(***REMOVED***
    ***REMOVED******REMOVED***;
        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%'***REMOVED***;
  ***REMOVED*** else {
        if (!Foundation.rtl && $(window***REMOVED***.width(***REMOVED*** > dropdown.outerWidth(***REMOVED*** + target.offset(***REMOVED***.left***REMOVED*** {
          var left = position.left;
          if (dropdown.hasClass('right'***REMOVED******REMOVED*** {
            dropdown.removeClass('right'***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else {
          if (!dropdown.hasClass('right'***REMOVED******REMOVED*** {
            dropdown.addClass('right'***REMOVED***;
      ***REMOVED***
          var left = position.left - (dropdown.outerWidth(***REMOVED*** - target.outerWidth(***REMOVED******REMOVED***;
    ***REMOVED***

        dropdown.attr('style', ''***REMOVED***.css({
          position : 'absolute',
          top: position.top + target.outerHeight(***REMOVED***,
          left: left
    ***REMOVED******REMOVED***;
  ***REMOVED***

      return dropdown;
***REMOVED***,

    small : function (***REMOVED*** {
      return matchMedia(Foundation.media_queries.small***REMOVED***.matches &&
        !matchMedia(Foundation.media_queries.medium***REMOVED***.matches;
***REMOVED***,

    off: function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.dropdown'***REMOVED***;
      $('html, body'***REMOVED***.off('.fndtn.dropdown'***REMOVED***;
      $(window***REMOVED***.off('.fndtn.dropdown'***REMOVED***;
      $('[data-dropdown-content]'***REMOVED***.off('.fndtn.dropdown'***REMOVED***;
      this.settings.init = false;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
