;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.clearing = {
    name : 'clearing',

    version: '5.0.0',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><img src="//:0">' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
          '<a href="#" class="clearing-main-next"><span></span></a></div>'
  ***REMOVED***,

      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : '.clearing-close',

      // event initializers and locks
      init : false,
      locked : false
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      var self = this;
      Foundation.inherit(this, 'throttle loaded'***REMOVED***;

      this.bindings(method, options***REMOVED***;

      if ($(this.scope***REMOVED***.is('[data-clearing]'***REMOVED******REMOVED*** {
        this.assemble($('li', this.scope***REMOVED******REMOVED***;
  ***REMOVED*** else {
        $('[data-clearing]', this.scope***REMOVED***.each(function (***REMOVED*** {
          self.assemble($('li', this***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***,

    events : function (scope***REMOVED*** {
      var self = this;

      $(this.scope***REMOVED***
        .off('.clearing'***REMOVED***
        .on('click.fndtn.clearing', 'ul[data-clearing] li',
          function (e, current, target***REMOVED*** {
            var current = current || $(this***REMOVED***,
                target = target || current,
                next = current.next('li'***REMOVED***,
                settings = current.closest('[data-clearing]'***REMOVED***.data('clearing-init'***REMOVED***,
                image = $(e.target***REMOVED***;

            e.preventDefault(***REMOVED***;

            if (!settings***REMOVED*** {
              self.init(***REMOVED***;
              settings = current.closest('[data-clearing]'***REMOVED***.data('clearing-init'***REMOVED***;
        ***REMOVED***

            // if clearing is open and the current image is
            // clicked, go to the next image in sequence
            if (target.hasClass('visible'***REMOVED*** && 
              current[0] === target[0] && 
              next.length > 0 && self.is_open(current***REMOVED******REMOVED*** {
              target = next;
              image = $('img', target***REMOVED***;
        ***REMOVED***

            // set current and target to the clicked li if not otherwise defined.
            self.open(image, current, target***REMOVED***;
            self.update_paddles(target***REMOVED***;
      ***REMOVED******REMOVED***

        .on('click.fndtn.clearing', '.clearing-main-next',
          function (e***REMOVED*** { self.nav(e, 'next'***REMOVED*** ***REMOVED******REMOVED***
        .on('click.fndtn.clearing', '.clearing-main-prev',
          function (e***REMOVED*** { self.nav(e, 'prev'***REMOVED*** ***REMOVED******REMOVED***
        .on('click.fndtn.clearing', this.settings.close_selectors,
          function (e***REMOVED*** { Foundation.libs.clearing.close(e, this***REMOVED*** ***REMOVED******REMOVED***
        .on('keydown.fndtn.clearing',
          function (e***REMOVED*** { self.keydown(e***REMOVED*** ***REMOVED******REMOVED***;

      $(window***REMOVED***.off('.clearing'***REMOVED***.on('resize.fndtn.clearing',
        function (***REMOVED*** { self.resize(***REMOVED*** ***REMOVED******REMOVED***;

      this.swipe_events(scope***REMOVED***;
***REMOVED***,

    swipe_events : function (scope***REMOVED*** {
      var self = this;

      $(this.scope***REMOVED***
        .on('touchstart.fndtn.clearing', '.visible-img', function(e***REMOVED*** {
          if (!e.touches***REMOVED*** { e = e.originalEvent; ***REMOVED***
          var data = {
                start_page_x: e.touches[0].pageX,
                start_page_y: e.touches[0].pageY,
                start_time: (new Date(***REMOVED******REMOVED***.getTime(***REMOVED***,
                delta_x: 0,
                is_scrolling: undefined
          ***REMOVED***;

          $(this***REMOVED***.data('swipe-transition', data***REMOVED***;
          e.stopPropagation(***REMOVED***;
    ***REMOVED******REMOVED***
        .on('touchmove.fndtn.clearing', '.visible-img', function(e***REMOVED*** {
          if (!e.touches***REMOVED*** { e = e.originalEvent; ***REMOVED***
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1***REMOVED*** return;

          var data = $(this***REMOVED***.data('swipe-transition'***REMOVED***;

          if (typeof data === 'undefined'***REMOVED*** {
            data = {***REMOVED***;
      ***REMOVED***

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined'***REMOVED*** {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x***REMOVED*** < Math.abs(e.touches[0].pageY - data.start_page_y***REMOVED*** ***REMOVED***;
      ***REMOVED***

          if (!data.is_scrolling && !data.active***REMOVED*** {
            e.preventDefault(***REMOVED***;
            var direction = (data.delta_x < 0***REMOVED*** ? 'next' : 'prev';
            data.active = true;
            self.nav(e, direction***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***
        .on('touchend.fndtn.clearing', '.visible-img', function(e***REMOVED*** {
          $(this***REMOVED***.data('swipe-transition', {***REMOVED******REMOVED***;
          e.stopPropagation(***REMOVED***;
    ***REMOVED******REMOVED***;
***REMOVED***,

    assemble : function ($li***REMOVED*** {
      var $el = $li.parent(***REMOVED***;

      if ($el.parent(***REMOVED***.hasClass('carousel'***REMOVED******REMOVED*** return;
      $el.after('<div id="foundationClearingHolder"></div>'***REMOVED***;

      var holder = $('#foundationClearingHolder'***REMOVED***,
          settings = $el.data('clearing-init'***REMOVED***,
          grid = $el.detach(***REMOVED***,
          data = {
            grid: '<div class="carousel">' + grid[0].outerHTML + '</div>',
            viewing: settings.templates.viewing
      ***REMOVED***,
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
            data.grid + '</div></div>';

      return holder.after(wrapper***REMOVED***.remove(***REMOVED***;
***REMOVED***,

    open : function ($image, current, target***REMOVED*** {
      var root = target.closest('.clearing-assembled'***REMOVED***,
          container = $('div', root***REMOVED***.first(***REMOVED***,
          visible_image = $('.visible-img', container***REMOVED***,
          image = $('img', visible_image***REMOVED***.not($image***REMOVED***;

      if (!this.locked(***REMOVED******REMOVED*** {
        // set the image to the selected thumbnail
        image
          .attr('src', this.load($image***REMOVED******REMOVED***
          .css('visibility', 'hidden'***REMOVED***;

        this.loaded(image, function (***REMOVED*** {
          image.css('visibility', 'visible'***REMOVED***;
          // toggle the gallery
          root.addClass('clearing-blackout'***REMOVED***;
          container.addClass('clearing-container'***REMOVED***;
          visible_image.show(***REMOVED***;
          this.fix_height(target***REMOVED***
            .caption($('.clearing-caption', visible_image***REMOVED***, $image***REMOVED***
            .center(image***REMOVED***
            .shift(current, target, function (***REMOVED*** {
              target.siblings(***REMOVED***.removeClass('visible'***REMOVED***;
              target.addClass('visible'***REMOVED***;
        ***REMOVED******REMOVED***;
    ***REMOVED***.bind(this***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***,

    close : function (e, el***REMOVED*** {
      e.preventDefault(***REMOVED***;

      var root = (function (target***REMOVED*** {
            if (/blackout/.test(target.selector***REMOVED******REMOVED*** {
              return target;
        ***REMOVED*** else {
              return target.closest('.clearing-blackout'***REMOVED***;
        ***REMOVED***
      ***REMOVED***($(el***REMOVED******REMOVED******REMOVED***, container, visible_image;

      if (el === e.target && root***REMOVED*** {
        container = $('div', root***REMOVED***.first(***REMOVED***;
        visible_image = $('.visible-img', container***REMOVED***;
        this.settings.prev_index = 0;
        $('ul[data-clearing]', root***REMOVED***
          .attr('style', ''***REMOVED***.closest('.clearing-blackout'***REMOVED***
          .removeClass('clearing-blackout'***REMOVED***;
        container.removeClass('clearing-container'***REMOVED***;
        visible_image.hide(***REMOVED***;
  ***REMOVED***

      return false;
***REMOVED***,

    is_open : function (current***REMOVED*** {
      return current.parent(***REMOVED***.prop('style'***REMOVED***.length > 0;
***REMOVED***,

    keydown : function (e***REMOVED*** {
      var clearing = $('ul[data-clearing]', '.clearing-blackout'***REMOVED***;

      if (e.which === 39***REMOVED*** this.go(clearing, 'next'***REMOVED***;
      if (e.which === 37***REMOVED*** this.go(clearing, 'prev'***REMOVED***;
      if (e.which === 27***REMOVED*** $('a.clearing-close'***REMOVED***.trigger('click'***REMOVED***;
***REMOVED***,

    nav : function (e, direction***REMOVED*** {
      var clearing = $('ul[data-clearing]', '.clearing-blackout'***REMOVED***;

      e.preventDefault(***REMOVED***;
      this.go(clearing, direction***REMOVED***;
***REMOVED***,

    resize : function (***REMOVED*** {
      var image = $('img', '.clearing-blackout .visible-img'***REMOVED***;

      if (image.length***REMOVED*** {
        this.center(image***REMOVED***;
  ***REMOVED***
***REMOVED***,

    // visual adjustments
    fix_height : function (target***REMOVED*** {
      var lis = target.parent(***REMOVED***.children(***REMOVED***,
          self = this;

      lis.each(function (***REMOVED*** {
          var li = $(this***REMOVED***,
              image = li.find('img'***REMOVED***;

          if (li.height(***REMOVED*** > image.outerHeight(***REMOVED******REMOVED*** {
            li.addClass('fix-height'***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***
        .closest('ul'***REMOVED***
        .width(lis.length * 100 + '%'***REMOVED***;

      return this;
***REMOVED***,

    update_paddles : function (target***REMOVED*** {
      var visible_image = target
        .closest('.carousel'***REMOVED***
        .siblings('.visible-img'***REMOVED***;

      if (target.next(***REMOVED***.length > 0***REMOVED*** {
        $('.clearing-main-next', visible_image***REMOVED***
          .removeClass('disabled'***REMOVED***;
  ***REMOVED*** else {
        $('.clearing-main-next', visible_image***REMOVED***
          .addClass('disabled'***REMOVED***;
  ***REMOVED***

      if (target.prev(***REMOVED***.length > 0***REMOVED*** {
        $('.clearing-main-prev', visible_image***REMOVED***
          .removeClass('disabled'***REMOVED***;
  ***REMOVED*** else {
        $('.clearing-main-prev', visible_image***REMOVED***
          .addClass('disabled'***REMOVED***;
  ***REMOVED***
***REMOVED***,

    center : function (target***REMOVED*** {
      if (!this.rtl***REMOVED*** {
        target.css({
          marginLeft : -(target.outerWidth(***REMOVED*** / 2***REMOVED***,
          marginTop : -(target.outerHeight(***REMOVED*** / 2***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED*** else {
        target.css({
          marginRight : -(target.outerWidth(***REMOVED*** / 2***REMOVED***,
          marginTop : -(target.outerHeight(***REMOVED*** / 2***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
      return this;
***REMOVED***,

    // image loading and preloading

    load : function ($image***REMOVED*** {
      if ($image[0].nodeName === "A"***REMOVED*** {
        var href = $image.attr('href'***REMOVED***;
  ***REMOVED*** else {
        var href = $image.parent(***REMOVED***.attr('href'***REMOVED***;
  ***REMOVED***

      this.preload($image***REMOVED***;

      if (href***REMOVED*** return href;
      return $image.attr('src'***REMOVED***;
***REMOVED***,

    preload : function ($image***REMOVED*** {
      this
        .img($image.closest('li'***REMOVED***.next(***REMOVED******REMOVED***
        .img($image.closest('li'***REMOVED***.prev(***REMOVED******REMOVED***;
***REMOVED***,

    img : function (img***REMOVED*** {
      if (img.length***REMOVED*** {
        var new_img = new Image(***REMOVED***,
            new_a = $('a', img***REMOVED***;

        if (new_a.length***REMOVED*** {
          new_img.src = new_a.attr('href'***REMOVED***;
    ***REMOVED*** else {
          new_img.src = $('img', img***REMOVED***.attr('src'***REMOVED***;
    ***REMOVED***
  ***REMOVED***
      return this;
***REMOVED***,

    // image caption

    caption : function (container, $image***REMOVED*** {
      var caption = $image.data('caption'***REMOVED***;

      if (caption***REMOVED*** {
        container
          .html(caption***REMOVED***
          .show(***REMOVED***;
  ***REMOVED*** else {
        container
          .text(''***REMOVED***
          .hide(***REMOVED***;
  ***REMOVED***
      return this;
***REMOVED***,

    // directional methods

    go : function ($ul, direction***REMOVED*** {
      var current = $('.visible', $ul***REMOVED***,
          target = current[direction](***REMOVED***;

      if (target.length***REMOVED*** {
        $('img', target***REMOVED***
          .trigger('click', [current, target]***REMOVED***;
  ***REMOVED***
***REMOVED***,

    shift : function (current, target, callback***REMOVED*** {
      var clearing = target.parent(***REMOVED***,
          old_index = this.settings.prev_index || target.index(***REMOVED***,
          direction = this.direction(clearing, current, target***REMOVED***,
          left = parseInt(clearing.css('left'***REMOVED***, 10***REMOVED***,
          width = target.outerWidth(***REMOVED***,
          skip_shift;

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      if (target.index(***REMOVED*** !== old_index && !/skip/.test(direction***REMOVED******REMOVED***{
        if (/left/.test(direction***REMOVED******REMOVED*** {
          this.lock(***REMOVED***;
          clearing.animate({left : left + width***REMOVED***, 300, this.unlock(***REMOVED******REMOVED***;
    ***REMOVED*** else if (/right/.test(direction***REMOVED******REMOVED*** {
          this.lock(***REMOVED***;
          clearing.animate({left : left - width***REMOVED***, 300, this.unlock(***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED*** else if (/skip/.test(direction***REMOVED******REMOVED*** {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index(***REMOVED*** - this.settings.up_count;
        this.lock(***REMOVED***;

        if (skip_shift > 0***REMOVED*** {
          clearing.animate({left : -(skip_shift * width***REMOVED******REMOVED***, 300, this.unlock(***REMOVED******REMOVED***;
    ***REMOVED*** else {
          clearing.animate({left : 0***REMOVED***, 300, this.unlock(***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***

      callback(***REMOVED***;
***REMOVED***,

    direction : function ($el, current, target***REMOVED*** {
      var lis = $('li', $el***REMOVED***,
          li_width = lis.outerWidth(***REMOVED*** + (lis.outerWidth(***REMOVED*** / 4***REMOVED***,
          up_count = Math.floor($('.clearing-container'***REMOVED***.outerWidth(***REMOVED*** / li_width***REMOVED*** - 1,
          target_index = lis.index(target***REMOVED***,
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index***REMOVED******REMOVED*** {
        if ((target_index > up_count***REMOVED***
          && target_index > this.settings.prev_index***REMOVED*** {
          response = 'right';
    ***REMOVED*** else if ((target_index > up_count - 1***REMOVED***
          && target_index <= this.settings.prev_index***REMOVED*** {
          response = 'left';
    ***REMOVED*** else {
          response = false;
    ***REMOVED***
  ***REMOVED*** else {
        response = 'skip';
  ***REMOVED***

      this.settings.prev_index = target_index;

      return response;
***REMOVED***,

    adjacent : function (current_index, target_index***REMOVED*** {
      for (var i = target_index + 1; i >= target_index - 1; i--***REMOVED*** {
        if (i === current_index***REMOVED*** return true;
  ***REMOVED***
      return false;
***REMOVED***,

    // lock management

    lock : function (***REMOVED*** {
      this.settings.locked = true;
***REMOVED***,

    unlock : function (***REMOVED*** {
      this.settings.locked = false;
***REMOVED***,

    locked : function (***REMOVED*** {
      return this.settings.locked;
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.clearing'***REMOVED***;
      $(window***REMOVED***.off('.fndtn.clearing'***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {
      this.init(***REMOVED***;
***REMOVED***
  ***REMOVED***;

***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
