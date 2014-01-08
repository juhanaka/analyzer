;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  var noop = function(***REMOVED*** {***REMOVED***;

  var Orbit = function(el, settings***REMOVED*** {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class***REMOVED******REMOVED*** {
      return this;
***REMOVED***

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        timer,
        locked = false,
        adjust_height_after = false;

    slides_container.children(***REMOVED***.first(***REMOVED***.addClass(settings.active_slide_class***REMOVED***;

    self.update_slide_number = function(index***REMOVED*** {
      if (settings.slide_number***REMOVED*** {
        number_container.find('span:first'***REMOVED***.text(parseInt(index***REMOVED***+1***REMOVED***;
        number_container.find('span:last'***REMOVED***.text(slides_container.children(***REMOVED***.length***REMOVED***;
  ***REMOVED***
      if (settings.bullets***REMOVED*** {
        bullets_container.children(***REMOVED***.removeClass(settings.bullets_active_class***REMOVED***;
        $(bullets_container.children(***REMOVED***.get(index***REMOVED******REMOVED***.addClass(settings.bullets_active_class***REMOVED***;
  ***REMOVED***
***REMOVED***;

    self.update_active_link = function(index***REMOVED*** {
      var link = $('a[data-orbit-link="'+slides_container.children(***REMOVED***.eq(index***REMOVED***.attr('data-orbit-slide'***REMOVED***+'"]'***REMOVED***;
      link.parents('ul'***REMOVED***.find('[data-orbit-link]'***REMOVED***.removeClass(settings.bullets_active_class***REMOVED***;
      link.addClass(settings.bullets_active_class***REMOVED***;
***REMOVED***;

    self.build_markup = function(***REMOVED*** {
      slides_container.wrap('<div class="'+settings.container_class+'"></div>'***REMOVED***;
      container = slides_container.parent(***REMOVED***;
      slides_container.addClass(settings.slides_container_class***REMOVED***;
      
      if (settings.navigation_arrows***REMOVED*** {
        container.append($('<a href="#"><span></span></a>'***REMOVED***.addClass(settings.prev_class***REMOVED******REMOVED***;
        container.append($('<a href="#"><span></span></a>'***REMOVED***.addClass(settings.next_class***REMOVED******REMOVED***;
  ***REMOVED***

      if (settings.timer***REMOVED*** {
        timer_container = $('<div>'***REMOVED***.addClass(settings.timer_container_class***REMOVED***;
        timer_container.append('<span>'***REMOVED***;
        timer_container.append($('<div>'***REMOVED***.addClass(settings.timer_progress_class***REMOVED******REMOVED***;
        timer_container.addClass(settings.timer_paused_class***REMOVED***;
        container.append(timer_container***REMOVED***;
  ***REMOVED***

      if (settings.slide_number***REMOVED*** {
        number_container = $('<div>'***REMOVED***.addClass(settings.slide_number_class***REMOVED***;
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>'***REMOVED***;
        container.append(number_container***REMOVED***;
  ***REMOVED***

      if (settings.bullets***REMOVED*** {
        bullets_container = $('<ol>'***REMOVED***.addClass(settings.bullets_container_class***REMOVED***;
        container.append(bullets_container***REMOVED***;
        bullets_container.wrap('<div class="orbit-bullets-container"></div>'***REMOVED***;
        slides_container.children(***REMOVED***.each(function(idx, el***REMOVED*** {
          var bullet = $('<li>'***REMOVED***.attr('data-orbit-slide', idx***REMOVED***;
          bullets_container.append(bullet***REMOVED***;
    ***REMOVED******REMOVED***;
  ***REMOVED***

      if (settings.stack_on_small***REMOVED*** {
        container.addClass(settings.stack_on_small_class***REMOVED***;
  ***REMOVED***

      self.update_slide_number(0***REMOVED***;
      self.update_active_link(0***REMOVED***;
***REMOVED***;

    self._goto = function(next_idx, start_timer***REMOVED*** {
      // if (locked***REMOVED*** {return false;***REMOVED***
      if (next_idx === idx***REMOVED*** {return false;***REMOVED***
      if (typeof timer === 'object'***REMOVED*** {timer.restart(***REMOVED***;***REMOVED***
      var slides = slides_container.children(***REMOVED***;

      var dir = 'next';
      locked = true;
      if (next_idx < idx***REMOVED*** {dir = 'prev';***REMOVED***
      if (next_idx >= slides.length***REMOVED*** {next_idx = 0;***REMOVED***
      else if (next_idx < 0***REMOVED*** {next_idx = slides.length - 1;***REMOVED***
      
      var current = $(slides.get(idx***REMOVED******REMOVED***;
      var next = $(slides.get(next_idx***REMOVED******REMOVED***;

      current.css('zIndex', 2***REMOVED***;
      current.removeClass(settings.active_slide_class***REMOVED***;
      next.css('zIndex', 4***REMOVED***.addClass(settings.active_slide_class***REMOVED***;

      slides_container.trigger('before-slide-change.fndtn.orbit'***REMOVED***;
      settings.before_slide_change(***REMOVED***;
      self.update_active_link(next_idx***REMOVED***;
      
      var callback = function(***REMOVED*** {
        var unlock = function(***REMOVED*** {
          idx = next_idx;
          locked = false;
          if (start_timer === true***REMOVED*** {timer = self.create_timer(***REMOVED***; timer.start(***REMOVED***;***REMOVED***
          self.update_slide_number(idx***REMOVED***;
          slides_container.trigger('after-slide-change.fndtn.orbit',[{slide_number: idx, total_slides: slides.length***REMOVED***]***REMOVED***;
          settings.after_slide_change(idx, slides.length***REMOVED***;
    ***REMOVED***;
        if (slides_container.height(***REMOVED*** != next.height(***REMOVED*** && settings.variable_height***REMOVED*** {
          slides_container.animate({'height': next.height(***REMOVED******REMOVED***, 250, 'linear', unlock***REMOVED***;
    ***REMOVED*** else {
          unlock(***REMOVED***;
    ***REMOVED***
  ***REMOVED***;

      if (slides.length === 1***REMOVED*** {callback(***REMOVED***; return false;***REMOVED***

      var start_animation = function(***REMOVED*** {
        if (dir === 'next'***REMOVED*** {animate.next(current, next, callback***REMOVED***;***REMOVED***
        if (dir === 'prev'***REMOVED*** {animate.prev(current, next, callback***REMOVED***;***REMOVED***        
  ***REMOVED***;

      if (next.height(***REMOVED*** > slides_container.height(***REMOVED*** && settings.variable_height***REMOVED*** {
        slides_container.animate({'height': next.height(***REMOVED******REMOVED***, 250, 'linear', start_animation***REMOVED***;
  ***REMOVED*** else {
        start_animation(***REMOVED***;
  ***REMOVED***
***REMOVED***;
    
    self.next = function(e***REMOVED*** {
      e.stopImmediatePropagation(***REMOVED***;
      e.preventDefault(***REMOVED***;
      self._goto(idx + 1***REMOVED***;
***REMOVED***;
    
    self.prev = function(e***REMOVED*** {
      e.stopImmediatePropagation(***REMOVED***;
      e.preventDefault(***REMOVED***;
      self._goto(idx - 1***REMOVED***;
***REMOVED***;

    self.link_custom = function(e***REMOVED*** {
      e.preventDefault(***REMOVED***;
      var link = $(this***REMOVED***.attr('data-orbit-link'***REMOVED***;
      if ((typeof link === 'string'***REMOVED*** && (link = $.trim(link***REMOVED******REMOVED*** != ""***REMOVED*** {
        var slide = container.find('[data-orbit-slide='+link+']'***REMOVED***;
        if (slide.index(***REMOVED*** != -1***REMOVED*** {self._goto(slide.index(***REMOVED******REMOVED***;***REMOVED***
  ***REMOVED***
***REMOVED***;

    self.link_bullet = function(e***REMOVED*** {
      var index = $(this***REMOVED***.attr('data-orbit-slide'***REMOVED***;
      if ((typeof index === 'string'***REMOVED*** && (index = $.trim(index***REMOVED******REMOVED*** != ""***REMOVED*** {
        self._goto(parseInt(index***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***

    self.timer_callback = function(***REMOVED*** {
      self._goto(idx + 1, true***REMOVED***;
***REMOVED***
    
    self.compute_dimensions = function(***REMOVED*** {
      var current = $(slides_container.children(***REMOVED***.get(idx***REMOVED******REMOVED***;
      var h = current.height(***REMOVED***;
      if (!settings.variable_height***REMOVED*** {
        slides_container.children(***REMOVED***.each(function(***REMOVED***{
          if ($(this***REMOVED***.height(***REMOVED*** > h***REMOVED*** { h = $(this***REMOVED***.height(***REMOVED***; ***REMOVED***
    ***REMOVED******REMOVED***;
  ***REMOVED***
      slides_container.height(h***REMOVED***;
***REMOVED***;

    self.create_timer = function(***REMOVED*** {
      var t = new Timer(
        container.find('.'+settings.timer_container_class***REMOVED***, 
        settings, 
        self.timer_callback
      ***REMOVED***;
      return t;
***REMOVED***;

    self.stop_timer = function(***REMOVED*** {
      if (typeof timer === 'object'***REMOVED*** timer.stop(***REMOVED***;
***REMOVED***;

    self.toggle_timer = function(***REMOVED*** {
      var t = container.find('.'+settings.timer_container_class***REMOVED***;
      if (t.hasClass(settings.timer_paused_class***REMOVED******REMOVED*** {
        if (typeof timer === 'undefined'***REMOVED*** {timer = self.create_timer(***REMOVED***;***REMOVED***
        timer.start(***REMOVED***;     
  ***REMOVED***
      else {
        if (typeof timer === 'object'***REMOVED*** {timer.stop(***REMOVED***;***REMOVED***
  ***REMOVED***
***REMOVED***;

    self.init = function(***REMOVED*** {
      self.build_markup(***REMOVED***;
      if (settings.timer***REMOVED*** {timer = self.create_timer(***REMOVED***; timer.start(***REMOVED***;***REMOVED***
      animate = new FadeAnimation(settings, slides_container***REMOVED***;
      if (settings.animation === 'slide'***REMOVED*** 
        animate = new SlideAnimation(settings, slides_container***REMOVED***;        
      container.on('click', '.'+settings.next_class, self.next***REMOVED***;
      container.on('click', '.'+settings.prev_class, self.prev***REMOVED***;
      container.on('click', '[data-orbit-slide]', self.link_bullet***REMOVED***;
      container.on('click', self.toggle_timer***REMOVED***;
      if (settings.swipe***REMOVED*** {
        container.on('touchstart.fndtn.orbit', function(e***REMOVED*** {
          if (!e.touches***REMOVED*** {e = e.originalEvent;***REMOVED***
          var data = {
            start_page_x: e.touches[0].pageX,
            start_page_y: e.touches[0].pageY,
            start_time: (new Date(***REMOVED******REMOVED***.getTime(***REMOVED***,
            delta_x: 0,
            is_scrolling: undefined
      ***REMOVED***;
          container.data('swipe-transition', data***REMOVED***;
          e.stopPropagation(***REMOVED***;
    ***REMOVED******REMOVED***
        .on('touchmove.fndtn.orbit', function(e***REMOVED*** {
          if (!e.touches***REMOVED*** { e = e.originalEvent; ***REMOVED***
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1***REMOVED*** return;

          var data = container.data('swipe-transition'***REMOVED***;
          if (typeof data === 'undefined'***REMOVED*** {data = {***REMOVED***;***REMOVED***

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined'***REMOVED*** {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x***REMOVED*** < Math.abs(e.touches[0].pageY - data.start_page_y***REMOVED*** ***REMOVED***;
      ***REMOVED***

          if (!data.is_scrolling && !data.active***REMOVED*** {
            e.preventDefault(***REMOVED***;
            var direction = (data.delta_x < 0***REMOVED*** ? (idx+1***REMOVED*** : (idx-1***REMOVED***;
            data.active = true;
            self._goto(direction***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***
        .on('touchend.fndtn.orbit', function(e***REMOVED*** {
          container.data('swipe-transition', {***REMOVED******REMOVED***;
          e.stopPropagation(***REMOVED***;
    ***REMOVED******REMOVED***
  ***REMOVED***
      container.on('mouseenter.fndtn.orbit', function(e***REMOVED*** {
        if (settings.timer && settings.pause_on_hover***REMOVED*** {
          self.stop_timer(***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***
      .on('mouseleave.fndtn.orbit', function(e***REMOVED*** {
        if (settings.timer && settings.resume_on_mouseout***REMOVED*** {
          timer.start(***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
      
      $(document***REMOVED***.on('click', '[data-orbit-link]', self.link_custom***REMOVED***;
      $(window***REMOVED***.on('resize', self.compute_dimensions***REMOVED***;
      $(window***REMOVED***.on('load', self.compute_dimensions***REMOVED***;
      $(window***REMOVED***.on('load', function(***REMOVED***{
        container.prev('.preloader'***REMOVED***.css('display', 'none'***REMOVED***;
  ***REMOVED******REMOVED***;
      slides_container.trigger('ready.fndtn.orbit'***REMOVED***;
***REMOVED***;

    self.init(***REMOVED***;
  ***REMOVED***;

  var Timer = function(el, settings, callback***REMOVED*** {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.'+settings.timer_progress_class***REMOVED***,
        start, 
        timeout,
        left = -1;

    this.update_progress = function(w***REMOVED*** {
      var new_progress = progress.clone(***REMOVED***;
      new_progress.attr('style', ''***REMOVED***;
      new_progress.css('width', w+'%'***REMOVED***;
      progress.replaceWith(new_progress***REMOVED***;
      progress = new_progress;
***REMOVED***;

    this.restart = function(***REMOVED*** {
      clearTimeout(timeout***REMOVED***;
      el.addClass(settings.timer_paused_class***REMOVED***;
      left = -1;
      self.update_progress(0***REMOVED***;
***REMOVED***;

    this.start = function(***REMOVED*** {
      if (!el.hasClass(settings.timer_paused_class***REMOVED******REMOVED*** {return true;***REMOVED***
      left = (left === -1***REMOVED*** ? duration : left;
      el.removeClass(settings.timer_paused_class***REMOVED***;
      start = new Date(***REMOVED***.getTime(***REMOVED***;
      progress.animate({'width': '100%'***REMOVED***, left, 'linear'***REMOVED***;
      timeout = setTimeout(function(***REMOVED*** {
        self.restart(***REMOVED***;
        callback(***REMOVED***;
  ***REMOVED***, left***REMOVED***;
      el.trigger('timer-started.fndtn.orbit'***REMOVED***
***REMOVED***;

    this.stop = function(***REMOVED*** {
      if (el.hasClass(settings.timer_paused_class***REMOVED******REMOVED*** {return true;***REMOVED***
      clearTimeout(timeout***REMOVED***;
      el.addClass(settings.timer_paused_class***REMOVED***;
      var end = new Date(***REMOVED***.getTime(***REMOVED***;
      left = left - (end - start***REMOVED***;
      var w = 100 - ((left / duration***REMOVED*** * 100***REMOVED***;
      self.update_progress(w***REMOVED***;
      el.trigger('timer-stopped.fndtn.orbit'***REMOVED***;
***REMOVED***;
  ***REMOVED***;
  
  var SlideAnimation = function(settings, container***REMOVED*** {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]'***REMOVED***.length === 1***REMOVED***;
    var margin = is_rtl ? 'marginRight' : 'marginLeft';
    var animMargin = {***REMOVED***;
    animMargin[margin] = '0%';

    this.next = function(current, next, callback***REMOVED*** {
      current.animate({marginLeft:'-100%'***REMOVED***, duration***REMOVED***;
      next.animate(animMargin, duration, function(***REMOVED*** {
        current.css(margin, '100%'***REMOVED***;
        callback(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***;

    this.prev = function(current, prev, callback***REMOVED*** {
      current.animate({marginLeft:'100%'***REMOVED***, duration***REMOVED***;
      prev.css(margin, '-100%'***REMOVED***;
      prev.animate(animMargin, duration, function(***REMOVED*** {
        current.css(margin, '100%'***REMOVED***;
        callback(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***;
  ***REMOVED***;

  var FadeAnimation = function(settings, container***REMOVED*** {
    var duration = settings.animation_speed;
    var is_rtl = ($('html[dir=rtl]'***REMOVED***.length === 1***REMOVED***;
    var margin = is_rtl ? 'marginRight' : 'marginLeft';

    this.next = function(current, next, callback***REMOVED*** {
      next.css({'margin':'0%', 'opacity':'0.01'***REMOVED******REMOVED***;
      next.animate({'opacity':'1'***REMOVED***, duration, 'linear', function(***REMOVED*** {
        current.css('margin', '100%'***REMOVED***;
        callback(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***;

    this.prev = function(current, prev, callback***REMOVED*** {
      prev.css({'margin':'0%', 'opacity':'0.01'***REMOVED******REMOVED***;
      prev.animate({'opacity':'1'***REMOVED***, duration, 'linear', function(***REMOVED*** {
        current.css('margin', '100%'***REMOVED***;
        callback(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***;
  ***REMOVED***;


  Foundation.libs = Foundation.libs || {***REMOVED***;

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '5.0.0',

    settings: {
      animation: 'slide',
      timer_speed: 10000,
      pause_on_hover: true,
      resume_on_mouseout: false,
      animation_speed: 500,
      stack_on_small: false,
      navigation_arrows: true,
      slide_number: true,
      slide_number_text: 'of',
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning',
      bullets: true,
      timer: true,
      variable_height: false,
      swipe: true,
      before_slide_change: noop,
      after_slide_change: noop
***REMOVED***,

    init: function (scope, method, options***REMOVED*** {
      var self = this;

      if (typeof method === 'object'***REMOVED*** {
        $.extend(true, self.settings, method***REMOVED***;
  ***REMOVED***

      if ($(scope***REMOVED***.is('[data-orbit]'***REMOVED******REMOVED*** {
        var $el = $(scope***REMOVED***;
        var opts = self.data_options($el***REMOVED***;
        new Orbit($el, $.extend({***REMOVED***,self.settings, opts***REMOVED******REMOVED***;
  ***REMOVED***

      $('[data-orbit]', scope***REMOVED***.each(function(idx, el***REMOVED*** {
        var $el = $(el***REMOVED***;
        var opts = self.data_options($el***REMOVED***;
        new Orbit($el, $.extend({***REMOVED***,self.settings, opts***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***
  ***REMOVED***;

    
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
