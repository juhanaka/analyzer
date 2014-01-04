;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version: '5.0.1',

    settings : {
      index : 0,
      sticky_class : 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      is_hover: true,
      mobile_show_parent_link: false,
      scrolltop : true // jump to top when sticky nav menu toggle is clicked
***REMOVED***,

    init : function (section, method, options***REMOVED*** {
      Foundation.inherit(this, 'addCustomRule register_media throttle'***REMOVED***;
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar'***REMOVED***;

      this.bindings(method, options***REMOVED***;

      $('[data-topbar]', this.scope***REMOVED***.each(function (***REMOVED*** {
        var topbar = $(this***REMOVED***,
            settings = topbar.data('topbar-init'***REMOVED***,
            section = $('section', this***REMOVED***,
            titlebar = $('> ul', this***REMOVED***.first(***REMOVED***;

        topbar.data('index', 0***REMOVED***;

        var topbarContainer = topbar.parent(***REMOVED***;
        if(topbarContainer.hasClass('fixed'***REMOVED*** || topbarContainer.hasClass(settings.sticky_class***REMOVED******REMOVED*** {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.stick_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight(***REMOVED******REMOVED***;
          topbar.data('stickyoffset', topbarContainer.offset(***REMOVED***.top***REMOVED***;
    ***REMOVED*** else {
          topbar.data('height', topbar.outerHeight(***REMOVED******REMOVED***;
    ***REMOVED***

        if (!settings.assembled***REMOVED*** self.assemble(topbar***REMOVED***;

        if (settings.is_hover***REMOVED*** {
          $('.has-dropdown', topbar***REMOVED***.addClass('not-click'***REMOVED***;
    ***REMOVED*** else {
          $('.has-dropdown', topbar***REMOVED***.removeClass('not-click'***REMOVED***;
    ***REMOVED***

        // Pad body when sticky (scrolled***REMOVED*** or fixed.
        self.addCustomRule('.f-topbar-fixed { padding-top: ' + topbar.data('height'***REMOVED*** + 'px ***REMOVED***'***REMOVED***;

        if (topbarContainer.hasClass('fixed'***REMOVED******REMOVED*** {
          $('body'***REMOVED***.addClass('f-topbar-fixed'***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;

***REMOVED***,

    toggle: function (toggleEl***REMOVED*** {
      var self = this;

      if (toggleEl***REMOVED*** {
        var topbar = $(toggleEl***REMOVED***.closest('[data-topbar]'***REMOVED***;
  ***REMOVED*** else {
        var topbar = $('[data-topbar]'***REMOVED***;
  ***REMOVED***

      var settings = topbar.data('topbar-init'***REMOVED***;

      var section = $('section, .section', topbar***REMOVED***;

      if (self.breakpoint(***REMOVED******REMOVED*** {
        if (!self.rtl***REMOVED*** {
          section.css({left: '0%'***REMOVED******REMOVED***;
          $('>.name', section***REMOVED***.css({left: '100%'***REMOVED******REMOVED***;
    ***REMOVED*** else {
          section.css({right: '0%'***REMOVED******REMOVED***;
          $('>.name', section***REMOVED***.css({right: '100%'***REMOVED******REMOVED***;
    ***REMOVED***

        $('li.moved', section***REMOVED***.removeClass('moved'***REMOVED***;
        topbar.data('index', 0***REMOVED***;

        topbar
          .toggleClass('expanded'***REMOVED***
          .css('height', ''***REMOVED***;
  ***REMOVED***

      if (settings.scrolltop***REMOVED*** {
        if (!topbar.hasClass('expanded'***REMOVED******REMOVED*** {
          if (topbar.hasClass('fixed'***REMOVED******REMOVED*** {
            topbar.parent(***REMOVED***.addClass('fixed'***REMOVED***;
            topbar.removeClass('fixed'***REMOVED***;
            $('body'***REMOVED***.addClass('f-topbar-fixed'***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if (topbar.parent(***REMOVED***.hasClass('fixed'***REMOVED******REMOVED*** {
          if (settings.scrolltop***REMOVED*** {
            topbar.parent(***REMOVED***.removeClass('fixed'***REMOVED***;
            topbar.addClass('fixed'***REMOVED***;
            $('body'***REMOVED***.removeClass('f-topbar-fixed'***REMOVED***;

            window.scrollTo(0,0***REMOVED***;
      ***REMOVED*** else {
              topbar.parent(***REMOVED***.removeClass('expanded'***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
        if(topbar.parent(***REMOVED***.hasClass(self.settings.sticky_class***REMOVED******REMOVED*** {
          topbar.parent(***REMOVED***.addClass('fixed'***REMOVED***;
    ***REMOVED***

        if(topbar.parent(***REMOVED***.hasClass('fixed'***REMOVED******REMOVED*** {
          if (!topbar.hasClass('expanded'***REMOVED******REMOVED*** {
            topbar.removeClass('fixed'***REMOVED***;
            topbar.parent(***REMOVED***.removeClass('expanded'***REMOVED***;
            self.update_sticky_positioning(***REMOVED***;
      ***REMOVED*** else {
            topbar.addClass('fixed'***REMOVED***;
            topbar.parent(***REMOVED***.addClass('expanded'***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    timer : null,

    events : function (bar***REMOVED*** {
      var self = this;
      $(this.scope***REMOVED***
        .off('.topbar'***REMOVED***
        .on('click.fndtn.topbar', '[data-topbar] .toggle-topbar', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          self.toggle(this***REMOVED***;
    ***REMOVED******REMOVED***
        .on('click.fndtn.topbar', '[data-topbar] li.has-dropdown', function (e***REMOVED*** {
          var li = $(this***REMOVED***,
              target = $(e.target***REMOVED***,
              topbar = li.closest('[data-topbar]'***REMOVED***,
              settings = topbar.data('topbar-init'***REMOVED***;

          if(target.data('revealId'***REMOVED******REMOVED*** {
            self.toggle(***REMOVED***;
            return;
      ***REMOVED***

          if (self.breakpoint(***REMOVED******REMOVED*** return;
          if (settings.is_hover && !Modernizr.touch***REMOVED*** return;

          e.stopImmediatePropagation(***REMOVED***;

          if (li.hasClass('hover'***REMOVED******REMOVED*** {
            li
              .removeClass('hover'***REMOVED***
              .find('li'***REMOVED***
              .removeClass('hover'***REMOVED***;

            li.parents('li.hover'***REMOVED***
              .removeClass('hover'***REMOVED***;
      ***REMOVED*** else {
            li.addClass('hover'***REMOVED***;

            if (target[0].nodeName === 'A' && target.parent(***REMOVED***.hasClass('has-dropdown'***REMOVED******REMOVED*** {
              e.preventDefault(***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***
        .on('click.fndtn.topbar', '[data-topbar] .has-dropdown>a', function (e***REMOVED*** {
          if (self.breakpoint(***REMOVED******REMOVED*** {

            e.preventDefault(***REMOVED***;

            var $this = $(this***REMOVED***,
                topbar = $this.closest('[data-topbar]'***REMOVED***,
                section = topbar.find('section, .section'***REMOVED***,
                dropdownHeight = $this.next('.dropdown'***REMOVED***.outerHeight(***REMOVED***,
                $selectedLi = $this.closest('li'***REMOVED***;

            topbar.data('index', topbar.data('index'***REMOVED*** + 1***REMOVED***;
            $selectedLi.addClass('moved'***REMOVED***;

            if (!self.rtl***REMOVED*** {
              section.css({left: -(100 * topbar.data('index'***REMOVED******REMOVED*** + '%'***REMOVED******REMOVED***;
              section.find('>.name'***REMOVED***.css({left: 100 * topbar.data('index'***REMOVED*** + '%'***REMOVED******REMOVED***;
        ***REMOVED*** else {
              section.css({right: -(100 * topbar.data('index'***REMOVED******REMOVED*** + '%'***REMOVED******REMOVED***;
              section.find('>.name'***REMOVED***.css({right: 100 * topbar.data('index'***REMOVED*** + '%'***REMOVED******REMOVED***;
        ***REMOVED***

            topbar.css('height', $this.siblings('ul'***REMOVED***.outerHeight(true***REMOVED*** + topbar.data('height'***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;
      
      $(window***REMOVED***.off('.topbar'***REMOVED***.on('resize.fndtn.topbar', self.throttle(function (***REMOVED*** {
        self.resize.call(self***REMOVED***;
  ***REMOVED***, 50***REMOVED******REMOVED***.trigger('resize'***REMOVED***;

      $('body'***REMOVED***.off('.topbar'***REMOVED***.on('click.fndtn.topbar touchstart.fndtn.topbar', function (e***REMOVED*** {
        var parent = $(e.target***REMOVED***.closest('li'***REMOVED***.closest('li.hover'***REMOVED***;

        if (parent.length > 0***REMOVED*** {
          return;
    ***REMOVED***

        $('[data-topbar] li'***REMOVED***.removeClass('hover'***REMOVED***;
  ***REMOVED******REMOVED***;

      // Go up a level on Click
      $(this.scope***REMOVED***.on('click.fndtn.topbar', '[data-topbar] .has-dropdown .back', function (e***REMOVED*** {
        e.preventDefault(***REMOVED***;

        var $this = $(this***REMOVED***,
            topbar = $this.closest('[data-topbar]'***REMOVED***,
            section = topbar.find('section, .section'***REMOVED***,
            settings = topbar.data('topbar-init'***REMOVED***,
            $movedLi = $this.closest('li.moved'***REMOVED***,
            $previousLevelUl = $movedLi.parent(***REMOVED***;

        topbar.data('index', topbar.data('index'***REMOVED*** - 1***REMOVED***;

        if (!self.rtl***REMOVED*** {
          section.css({left: -(100 * topbar.data('index'***REMOVED******REMOVED*** + '%'***REMOVED******REMOVED***;
          section.find('>.name'***REMOVED***.css({left: 100 * topbar.data('index'***REMOVED*** + '%'***REMOVED******REMOVED***;
    ***REMOVED*** else {
          section.css({right: -(100 * topbar.data('index'***REMOVED******REMOVED*** + '%'***REMOVED******REMOVED***;
          section.find('>.name'***REMOVED***.css({right: 100 * topbar.data('index'***REMOVED*** + '%'***REMOVED******REMOVED***;
    ***REMOVED***

        if (topbar.data('index'***REMOVED*** === 0***REMOVED*** {
          topbar.css('height', ''***REMOVED***;
    ***REMOVED*** else {
          topbar.css('height', $previousLevelUl.outerHeight(true***REMOVED*** + topbar.data('height'***REMOVED******REMOVED***;
    ***REMOVED***

        setTimeout(function (***REMOVED*** {
          $movedLi.removeClass('moved'***REMOVED***;
    ***REMOVED***, 300***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***,

    resize : function (***REMOVED*** {
      var self = this;
      $('[data-topbar]'***REMOVED***.each(function (***REMOVED*** {
        var topbar = $(this***REMOVED***,
            settings = topbar.data('topbar-init'***REMOVED***;

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class***REMOVED***;
        var stickyOffset;

        if (!self.breakpoint(***REMOVED******REMOVED*** {
          var doToggle = topbar.hasClass('expanded'***REMOVED***;
          topbar
            .css('height', ''***REMOVED***
            .removeClass('expanded'***REMOVED***
            .find('li'***REMOVED***
            .removeClass('hover'***REMOVED***;

            if(doToggle***REMOVED*** {
              self.toggle(topbar***REMOVED***;
        ***REMOVED***
    ***REMOVED***

        if(stickyContainer.length > 0***REMOVED*** {
          if(stickyContainer.hasClass('fixed'***REMOVED******REMOVED*** {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed'***REMOVED***;

            stickyOffset = stickyContainer.offset(***REMOVED***.top;
            if($(document.body***REMOVED***.hasClass('f-topbar-fixed'***REMOVED******REMOVED*** {
              stickyOffset -= topbar.data('height'***REMOVED***;
        ***REMOVED***

            topbar.data('stickyoffset', stickyOffset***REMOVED***;
            stickyContainer.addClass('fixed'***REMOVED***;
      ***REMOVED*** else {
            stickyOffset = stickyContainer.offset(***REMOVED***.top;
            topbar.data('stickyoffset', stickyOffset***REMOVED***;
      ***REMOVED***
    ***REMOVED***

  ***REMOVED******REMOVED***;
***REMOVED***,

    breakpoint : function (***REMOVED*** {
      return !matchMedia(Foundation.media_queries['topbar']***REMOVED***.matches;
***REMOVED***,

    assemble : function (topbar***REMOVED*** {
      var self = this,
          settings = topbar.data('topbar-init'***REMOVED***,
          section = $('section', topbar***REMOVED***,
          titlebar = $('> ul', topbar***REMOVED***.first(***REMOVED***;

      // Pull element out of the DOM for manipulation
      section.detach(***REMOVED***;

      $('.has-dropdown>a', section***REMOVED***.each(function (***REMOVED*** {
        var $link = $(this***REMOVED***,
            $dropdown = $link.siblings('.dropdown'***REMOVED***,
            url = $link.attr('href'***REMOVED***;

        if (settings.mobile_show_parent_link && url && url.length > 1***REMOVED*** {
          var $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="' + url + '">' + $link.text(***REMOVED*** +'</a></li>'***REMOVED***;
    ***REMOVED*** else {
          var $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>'***REMOVED***;
    ***REMOVED***

        // Copy link to subnav
        if (settings.custom_back_text == true***REMOVED*** {
          $('h5>a', $titleLi***REMOVED***.html(settings.back_text***REMOVED***;
    ***REMOVED*** else {
          $('h5>a', $titleLi***REMOVED***.html('&laquo; ' + $link.html(***REMOVED******REMOVED***;
    ***REMOVED***
        $dropdown.prepend($titleLi***REMOVED***;
  ***REMOVED******REMOVED***;

      // Put element back in the DOM
      section.appendTo(topbar***REMOVED***;

      // check for sticky
      this.sticky(***REMOVED***;

      this.assembled(topbar***REMOVED***;
***REMOVED***,

    assembled : function (topbar***REMOVED*** {
      topbar.data('topbar-init', $.extend({***REMOVED***, topbar.data('topbar-init'***REMOVED***, {assembled: true***REMOVED******REMOVED******REMOVED***;
***REMOVED***,

    height : function (ul***REMOVED*** {
      var total = 0,
          self = this;

      $('> li', ul***REMOVED***.each(function (***REMOVED*** { total += $(this***REMOVED***.outerHeight(true***REMOVED***; ***REMOVED******REMOVED***;

      return total;
***REMOVED***,

    sticky : function (***REMOVED*** {
      var $window = $(window***REMOVED***,
          self = this;

      $(window***REMOVED***.on('scroll', function(***REMOVED*** {
        self.update_sticky_positioning(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***,

    update_sticky_positioning: function(***REMOVED*** {
      var klass = '.' + this.settings.sticky_class;
      var $window = $(window***REMOVED***;

      if ($(klass***REMOVED***.length > 0***REMOVED*** {
        var distance = this.settings.sticky_topbar.data('stickyoffset'***REMOVED***;
        if (!$(klass***REMOVED***.hasClass('expanded'***REMOVED******REMOVED*** {
          if ($window.scrollTop(***REMOVED*** > (distance***REMOVED******REMOVED*** {
            if (!$(klass***REMOVED***.hasClass('fixed'***REMOVED******REMOVED*** {
              $(klass***REMOVED***.addClass('fixed'***REMOVED***;
              $('body'***REMOVED***.addClass('f-topbar-fixed'***REMOVED***;
        ***REMOVED***
      ***REMOVED*** else if ($window.scrollTop(***REMOVED*** <= distance***REMOVED*** {
            if ($(klass***REMOVED***.hasClass('fixed'***REMOVED******REMOVED*** {
              $(klass***REMOVED***.removeClass('fixed'***REMOVED***;
              $('body'***REMOVED***.removeClass('f-topbar-fixed'***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.topbar'***REMOVED***;
      $(window***REMOVED***.off('.fndtn.topbar'***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
