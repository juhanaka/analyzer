;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  var Modernizr = Modernizr || false;

  Foundation.libs.joyride = {
    name : 'joyride',

    version : '5.0.0',

    defaults : {
      expose               : false,      // turn on or off the expose feature
      modal                : true,      // Whether to cover page with modal during the tour
      tip_location          : 'bottom',  // 'top' or 'bottom' in relation to parent
      nub_position          : 'auto',    // override on a per tooltip bases
      scroll_speed          : 1500,       // Page scrolling speed in milliseconds, 0 = no scroll animation
      scroll_animation     : 'linear',   // supports 'swing' and 'linear', extend with jQuery UI.
      timer                : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      start_timer_on_click    : true,      // true or false - true requires clicking the first button start the timer
      start_offset          : 0,         // the index of the tooltip you want to start on (index of the li***REMOVED***
      next_button           : true,      // true or false to control whether a next button is used
      tip_animation         : 'fade',    // 'pop' or 'fade' in each tip
      pause_after           : [],        // array of indexes where to pause the tour after
      exposed              : [],        // array of expose elements
      tip_animation_fade_speed: 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookie_monster        : false,     // true or false to control whether cookies are used
      cookie_name           : 'joyride', // Name the cookie you'll use
      cookie_domain         : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookie_expires        : 365,       // set when you would like the cookie to expire.
      tip_container         : 'body',    // Where will the tip be attached
      tip_location_patterns : {
        top: ['bottom'],
        bottom: [], // bottom should not need to be repositioned
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom']
  ***REMOVED***,
      post_ride_callback     : function (***REMOVED***{***REMOVED***,    // A method to call once the tour closes (canceled or complete***REMOVED***
      post_step_callback     : function (***REMOVED***{***REMOVED***,    // A method to call after each step
      pre_step_callback      : function (***REMOVED***{***REMOVED***,    // A method to call before each step
      pre_ride_callback      : function (***REMOVED***{***REMOVED***,    // A method to call before the tour starts (passed index, tip, and cloned exposed element***REMOVED***
      post_expose_callback   : function (***REMOVED***{***REMOVED***,    // A method to call after an element has been exposed
      template : { // HTML segments for tip layout
        link    : '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper : '<div class="joyride-content-wrapper"></div>',
        button  : '<a href="#" class="small button joyride-next-tip"></a>',
        modal   : '<div class="joyride-modal-bg"></div>',
        expose  : '<div class="joyride-expose-wrapper"></div>',
        expose_cover: '<div class="joyride-expose-cover"></div>'
  ***REMOVED***,
      expose_add_class : '' // One or more space-separated class names to be added to exposed element
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      Foundation.inherit(this, 'throttle delay'***REMOVED***;

      this.settings = this.defaults;

      this.bindings(method, options***REMOVED***
***REMOVED***,

    events : function (***REMOVED*** {
      var self = this;

      $(this.scope***REMOVED***
        .off('.joyride'***REMOVED***
        .on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;

          if (this.settings.$li.next(***REMOVED***.length < 1***REMOVED*** {
            this.end(***REMOVED***;
      ***REMOVED*** else if (this.settings.timer > 0***REMOVED*** {
            clearTimeout(this.settings.automate***REMOVED***;
            this.hide(***REMOVED***;
            this.show(***REMOVED***;
            this.startTimer(***REMOVED***;
      ***REMOVED*** else {
            this.hide(***REMOVED***;
            this.show(***REMOVED***;
      ***REMOVED***

    ***REMOVED***.bind(this***REMOVED******REMOVED***

        .on('click.fndtn.joyride', '.joyride-close-tip', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;
          this.end(***REMOVED***;
    ***REMOVED***.bind(this***REMOVED******REMOVED***;

      $(window***REMOVED***
        .off('.joyride'***REMOVED***
        .on('resize.fndtn.joyride', self.throttle(function (***REMOVED*** {
          if ($('[data-joyride]'***REMOVED***.length > 0 && self.settings.$next_tip***REMOVED*** {
            if (self.settings.exposed.length > 0***REMOVED*** {
              var $els = $(self.settings.exposed***REMOVED***;

              $els.each(function (***REMOVED*** {
                var $this = $(this***REMOVED***;
                self.un_expose($this***REMOVED***;
                self.expose($this***REMOVED***;
          ***REMOVED******REMOVED***;
        ***REMOVED***

            if (self.is_phone(***REMOVED******REMOVED*** {
              self.pos_phone(***REMOVED***;
        ***REMOVED*** else {
              self.pos_default(false, true***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***, 100***REMOVED******REMOVED***;
***REMOVED***,

    start : function (***REMOVED*** {
      var self = this,
          $this = $('[data-joyride]', this.scope***REMOVED***,
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!$this.length > 0***REMOVED*** return;

      if (!this.settings.init***REMOVED*** this.events(***REMOVED***;

      this.settings = $this.data('joyride-init'***REMOVED***;

      // non configureable settings
      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tip_container***REMOVED***;
      this.settings.body_offset = $(this.settings.tip_container***REMOVED***.position(***REMOVED***;
      this.settings.$tip_content = this.settings.$content_el.find('> li'***REMOVED***;
      this.settings.paused = false;
      this.settings.attempts = 0;

      // can we create cookies?
      if (typeof $.cookie !== 'function'***REMOVED*** {
        this.settings.cookie_monster = false;
  ***REMOVED***

      // generate the tips and insert into dom.
      if (!this.settings.cookie_monster || this.settings.cookie_monster && $.cookie(this.settings.cookie_name***REMOVED*** === null***REMOVED*** {
        this.settings.$tip_content.each(function (index***REMOVED*** {
          var $this = $(this***REMOVED***;
          this.settings = $.extend({***REMOVED***, self.defaults, self.data_options($this***REMOVED******REMOVED***

          // Make sure that settings parsed from data_options are integers where necessary
          for (var i = int_settings_count - 1; i >= 0; i--***REMOVED*** {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10***REMOVED***;
      ***REMOVED***
          self.create({$li : $this, index : index***REMOVED******REMOVED***;
    ***REMOVED******REMOVED***;

        // show first tip
        if (!this.settings.start_timer_on_click && this.settings.timer > 0***REMOVED*** {
          this.show('init'***REMOVED***;
          this.startTimer(***REMOVED***;
    ***REMOVED*** else {
          this.show('init'***REMOVED***;
    ***REMOVED***

  ***REMOVED***
***REMOVED***,

    resume : function (***REMOVED*** {
      this.set_li(***REMOVED***;
      this.show(***REMOVED***;
***REMOVED***,

    tip_template : function (opts***REMOVED*** {
      var $blank, content;

      opts.tip_class = opts.tip_class || '';

      $blank = $(this.settings.template.tip***REMOVED***.addClass(opts.tip_class***REMOVED***;
      content = $.trim($(opts.li***REMOVED***.html(***REMOVED******REMOVED*** +
        this.button_text(opts.button_text***REMOVED*** +
        this.settings.template.link +
        this.timer_instance(opts.index***REMOVED***;

      $blank.append($(this.settings.template.wrapper***REMOVED******REMOVED***;
      $blank.first(***REMOVED***.attr('data-index', opts.index***REMOVED***;
      $('.joyride-content-wrapper', $blank***REMOVED***.append(content***REMOVED***;

      return $blank[0];
***REMOVED***,

    timer_instance : function (index***REMOVED*** {
      var txt;

      if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0***REMOVED*** || this.settings.timer === 0***REMOVED*** {
        txt = '';
  ***REMOVED*** else {
        txt = $(this.settings.template.timer***REMOVED***[0].outerHTML;
  ***REMOVED***
      return txt;
***REMOVED***,

    button_text : function (txt***REMOVED*** {
      if (this.settings.next_button***REMOVED*** {
        txt = $.trim(txt***REMOVED*** || 'Next';
        txt = $(this.settings.template.button***REMOVED***.append(txt***REMOVED***[0].outerHTML;
  ***REMOVED*** else {
        txt = '';
  ***REMOVED***
      return txt;
***REMOVED***,

    create : function (opts***REMOVED*** {
      var buttonText = opts.$li.attr('data-button'***REMOVED*** || opts.$li.attr('data-text'***REMOVED***,
        tipClass = opts.$li.attr('class'***REMOVED***,
        $tip_content = $(this.tip_template({
          tip_class : tipClass,
          index : opts.index,
          button_text : buttonText,
          li : opts.$li
    ***REMOVED******REMOVED******REMOVED***;

      $(this.settings.tip_container***REMOVED***.append($tip_content***REMOVED***;
***REMOVED***,

    show : function (init***REMOVED*** {
      var $timer = null;

      // are we paused?
      if (this.settings.$li === undefined
        || ($.inArray(this.settings.$li.index(***REMOVED***, this.settings.pause_after***REMOVED*** === -1***REMOVED******REMOVED*** {

        // don't go to the next li if the tour was paused
        if (this.settings.paused***REMOVED*** {
          this.settings.paused = false;
    ***REMOVED*** else {
          this.set_li(init***REMOVED***;
    ***REMOVED***

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0***REMOVED*** {
          if (init***REMOVED*** { //run when we first start
            this.settings.pre_ride_callback(this.settings.$li.index(***REMOVED***, this.settings.$next_tip***REMOVED***;
            if (this.settings.modal***REMOVED*** {
              this.show_modal(***REMOVED***;
        ***REMOVED***
      ***REMOVED***

          this.settings.pre_step_callback(this.settings.$li.index(***REMOVED***, this.settings.$next_tip***REMOVED***;

          if (this.settings.modal && this.settings.expose***REMOVED*** {
            this.expose(***REMOVED***;
      ***REMOVED***

          this.settings.tip_settings = $.extend({***REMOVED***, this.settings, this.data_options(this.settings.$li***REMOVED******REMOVED***;

          this.settings.timer = parseInt(this.settings.timer, 10***REMOVED***;

          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];

          // scroll if not modal
          if (!/body/i.test(this.settings.$target.selector***REMOVED******REMOVED*** {
            this.scroll_to(***REMOVED***;
      ***REMOVED***

          if (this.is_phone(***REMOVED******REMOVED*** {
            this.pos_phone(true***REMOVED***;
      ***REMOVED*** else {
            this.pos_default(true***REMOVED***;
      ***REMOVED***

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator'***REMOVED***;

          if (/pop/i.test(this.settings.tip_animation***REMOVED******REMOVED*** {

            $timer.width(0***REMOVED***;

            if (this.settings.timer > 0***REMOVED*** {

              this.settings.$next_tip.show(***REMOVED***;

              this.delay(function (***REMOVED*** {
                $timer.animate({
                  width: $timer.parent(***REMOVED***.width(***REMOVED***
            ***REMOVED***, this.settings.timer, 'linear'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED***, this.settings.tip_animation_fade_speed***REMOVED***;

        ***REMOVED*** else {
              this.settings.$next_tip.show(***REMOVED***;

        ***REMOVED***


      ***REMOVED*** else if (/fade/i.test(this.settings.tip_animation***REMOVED******REMOVED*** {

            $timer.width(0***REMOVED***;

            if (this.settings.timer > 0***REMOVED*** {

              this.settings.$next_tip
                .fadeIn(this.settings.tip_animation_fade_speed***REMOVED***
                .show(***REMOVED***;

              this.delay(function (***REMOVED*** {
                $timer.animate({
                  width: $timer.parent(***REMOVED***.width(***REMOVED***
            ***REMOVED***, this.settings.timer, 'linear'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED***, this.settings.tip_animation_fadeSpeed***REMOVED***;

        ***REMOVED*** else {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed***REMOVED***;
        ***REMOVED***
      ***REMOVED***

          this.settings.$current_tip = this.settings.$next_tip;

        // skip non-existant targets
    ***REMOVED*** else if (this.settings.$li && this.settings.$target.length < 1***REMOVED*** {

          this.show(***REMOVED***;

    ***REMOVED*** else {

          this.end(***REMOVED***;

    ***REMOVED***
  ***REMOVED*** else {

        this.settings.paused = true;

  ***REMOVED***

***REMOVED***,

    is_phone : function (***REMOVED*** {
      return matchMedia(Foundation.media_queries.small***REMOVED***.matches &&
        !matchMedia(Foundation.media_queries.medium***REMOVED***.matches;
***REMOVED***,

    hide : function (***REMOVED*** {
      if (this.settings.modal && this.settings.expose***REMOVED*** {
        this.un_expose(***REMOVED***;
  ***REMOVED***

      if (!this.settings.modal***REMOVED*** {
        $('.joyride-modal-bg'***REMOVED***.hide(***REMOVED***;
  ***REMOVED***

      // Prevent scroll bouncing...wait to remove from layout
      this.settings.$current_tip.css('visibility', 'hidden'***REMOVED***;
      setTimeout($.proxy(function(***REMOVED*** {
        this.hide(***REMOVED***;
        this.css('visibility', 'visible'***REMOVED***;
  ***REMOVED***, this.settings.$current_tip***REMOVED***, 0***REMOVED***;
      this.settings.post_step_callback(this.settings.$li.index(***REMOVED***,
        this.settings.$current_tip***REMOVED***;
***REMOVED***,

    set_li : function (init***REMOVED*** {
      if (init***REMOVED*** {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset***REMOVED***;
        this.set_next_tip(***REMOVED***;
        this.settings.$current_tip = this.settings.$next_tip;
  ***REMOVED*** else {
        this.settings.$li = this.settings.$li.next(***REMOVED***;
        this.set_next_tip(***REMOVED***;
  ***REMOVED***

      this.set_target(***REMOVED***;
***REMOVED***,

    set_next_tip : function (***REMOVED*** {
      this.settings.$next_tip = $(".joyride-tip-guide"***REMOVED***.eq(this.settings.$li.index(***REMOVED******REMOVED***;
      this.settings.$next_tip.data('closed', ''***REMOVED***;
***REMOVED***,

    set_target : function (***REMOVED*** {
      var cl = this.settings.$li.attr('data-class'***REMOVED***,
          id = this.settings.$li.attr('data-id'***REMOVED***,
          $sel = function (***REMOVED*** {
            if (id***REMOVED*** {
              return $(document.getElementById(id***REMOVED******REMOVED***;
        ***REMOVED*** else if (cl***REMOVED*** {
              return $('.' + cl***REMOVED***.first(***REMOVED***;
        ***REMOVED*** else {
              return $('body'***REMOVED***;
        ***REMOVED***
      ***REMOVED***;

      this.settings.$target = $sel(***REMOVED***;
***REMOVED***,

    scroll_to : function (***REMOVED*** {
      var window_half, tipOffset;

      window_half = $(window***REMOVED***.height(***REMOVED*** / 2;
      tipOffset = Math.ceil(this.settings.$target.offset(***REMOVED***.top - window_half + this.settings.$next_tip.outerHeight(***REMOVED******REMOVED***;

      if (tipOffset > 0***REMOVED*** {
        $('html, body'***REMOVED***.animate({
          scrollTop: tipOffset
    ***REMOVED***, this.settings.scroll_speed, 'swing'***REMOVED***;
  ***REMOVED***
***REMOVED***,

    paused : function (***REMOVED*** {
      return ($.inArray((this.settings.$li.index(***REMOVED*** + 1***REMOVED***, this.settings.pause_after***REMOVED*** === -1***REMOVED***;
***REMOVED***,

    restart : function (***REMOVED*** {
      this.hide(***REMOVED***;
      this.settings.$li = undefined;
      this.show('init'***REMOVED***;
***REMOVED***,

    pos_default : function (init, resizing***REMOVED*** {
      var half_fold = Math.ceil($(window***REMOVED***.height(***REMOVED*** / 2***REMOVED***,
          tip_position = this.settings.$next_tip.offset(***REMOVED***,
          $nub = this.settings.$next_tip.find('.joyride-nub'***REMOVED***,
          nub_width = Math.ceil($nub.outerWidth(***REMOVED*** / 2***REMOVED***,
          nub_height = Math.ceil($nub.outerHeight(***REMOVED*** / 2***REMOVED***,
          toggle = init || false;

      // tip must not be "display: none" to calculate position
      if (toggle***REMOVED*** {
        this.settings.$next_tip.css('visibility', 'hidden'***REMOVED***;
        this.settings.$next_tip.show(***REMOVED***;
  ***REMOVED***

      if (typeof resizing === 'undefined'***REMOVED*** {
        resizing = false;
  ***REMOVED***

      if (!/body/i.test(this.settings.$target.selector***REMOVED******REMOVED*** {

          if (this.bottom(***REMOVED******REMOVED*** {
            var leftOffset = this.settings.$target.offset(***REMOVED***.left;
            if (Foundation.rtl***REMOVED*** {
              leftOffset = this.settings.$target.offset(***REMOVED***.width - this.settings.$next_tip.width(***REMOVED*** + leftOffset;
        ***REMOVED***
            this.settings.$next_tip.css({
              top: (this.settings.$target.offset(***REMOVED***.top + nub_height + this.settings.$target.outerHeight(***REMOVED******REMOVED***,
              left: leftOffset***REMOVED******REMOVED***;

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'top'***REMOVED***;

      ***REMOVED*** else if (this.top(***REMOVED******REMOVED*** {
            var leftOffset = this.settings.$target.offset(***REMOVED***.left;
            if (Foundation.rtl***REMOVED*** {
              leftOffset = this.settings.$target.offset(***REMOVED***.width - this.settings.$next_tip.width(***REMOVED*** + leftOffset;
        ***REMOVED***
            this.settings.$next_tip.css({
              top: (this.settings.$target.offset(***REMOVED***.top - this.settings.$next_tip.outerHeight(***REMOVED*** - nub_height***REMOVED***,
              left: leftOffset***REMOVED******REMOVED***;

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom'***REMOVED***;

      ***REMOVED*** else if (this.right(***REMOVED******REMOVED*** {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset(***REMOVED***.top,
              left: (this.outerWidth(this.settings.$target***REMOVED*** + this.settings.$target.offset(***REMOVED***.left + nub_width***REMOVED******REMOVED******REMOVED***;

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'left'***REMOVED***;

      ***REMOVED*** else if (this.left(***REMOVED******REMOVED*** {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset(***REMOVED***.top,
              left: (this.settings.$target.offset(***REMOVED***.left - this.outerWidth(this.settings.$next_tip***REMOVED*** - nub_width***REMOVED******REMOVED******REMOVED***;

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'right'***REMOVED***;

      ***REMOVED***

          if (!this.visible(this.corners(this.settings.$next_tip***REMOVED******REMOVED*** && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length***REMOVED*** {

            $nub.removeClass('bottom'***REMOVED***
              .removeClass('top'***REMOVED***
              .removeClass('right'***REMOVED***
              .removeClass('left'***REMOVED***;

            this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];

            this.settings.attempts++;

            this.pos_default(***REMOVED***;

      ***REMOVED***

  ***REMOVED*** else if (this.settings.$li.length***REMOVED*** {

        this.pos_modal($nub***REMOVED***;

  ***REMOVED***

      if (toggle***REMOVED*** {
        this.settings.$next_tip.hide(***REMOVED***;
        this.settings.$next_tip.css('visibility', 'visible'***REMOVED***;
  ***REMOVED***

***REMOVED***,

    pos_phone : function (init***REMOVED*** {
      var tip_height = this.settings.$next_tip.outerHeight(***REMOVED***,
          tip_offset = this.settings.$next_tip.offset(***REMOVED***,
          target_height = this.settings.$target.outerHeight(***REMOVED***,
          $nub = $('.joyride-nub', this.settings.$next_tip***REMOVED***,
          nub_height = Math.ceil($nub.outerHeight(***REMOVED*** / 2***REMOVED***,
          toggle = init || false;

      $nub.removeClass('bottom'***REMOVED***
        .removeClass('top'***REMOVED***
        .removeClass('right'***REMOVED***
        .removeClass('left'***REMOVED***;

      if (toggle***REMOVED*** {
        this.settings.$next_tip.css('visibility', 'hidden'***REMOVED***;
        this.settings.$next_tip.show(***REMOVED***;
  ***REMOVED***

      if (!/body/i.test(this.settings.$target.selector***REMOVED******REMOVED*** {

        if (this.top(***REMOVED******REMOVED*** {

            this.settings.$next_tip.offset({top: this.settings.$target.offset(***REMOVED***.top - tip_height - nub_height***REMOVED******REMOVED***;
            $nub.addClass('bottom'***REMOVED***;

    ***REMOVED*** else {

          this.settings.$next_tip.offset({top: this.settings.$target.offset(***REMOVED***.top + target_height + nub_height***REMOVED******REMOVED***;
          $nub.addClass('top'***REMOVED***;

    ***REMOVED***

  ***REMOVED*** else if (this.settings.$li.length***REMOVED*** {
        this.pos_modal($nub***REMOVED***;
  ***REMOVED***

      if (toggle***REMOVED*** {
        this.settings.$next_tip.hide(***REMOVED***;
        this.settings.$next_tip.css('visibility', 'visible'***REMOVED***;
  ***REMOVED***
***REMOVED***,

    pos_modal : function ($nub***REMOVED*** {
      this.center(***REMOVED***;
      $nub.hide(***REMOVED***;

      this.show_modal(***REMOVED***;
***REMOVED***,

    show_modal : function (***REMOVED*** {
      if (!this.settings.$next_tip.data('closed'***REMOVED******REMOVED*** {
        var joyridemodalbg =  $('.joyride-modal-bg'***REMOVED***;
        if (joyridemodalbg.length < 1***REMOVED*** {
          $('body'***REMOVED***.append(this.settings.template.modal***REMOVED***.show(***REMOVED***;
    ***REMOVED***

        if (/pop/i.test(this.settings.tip_animation***REMOVED******REMOVED*** {
            joyridemodalbg.show(***REMOVED***;
    ***REMOVED*** else {
            joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    expose : function (***REMOVED*** {
      var expose,
          exposeCover,
          el,
          origCSS,
          origClasses,
          randId = 'expose-'+Math.floor(Math.random(***REMOVED****10000***REMOVED***;

      if (arguments.length > 0 && arguments[0] instanceof $***REMOVED*** {
        el = arguments[0];
  ***REMOVED*** else if(this.settings.$target && !/body/i.test(this.settings.$target.selector***REMOVED******REMOVED***{
        el = this.settings.$target;
  ***REMOVED***  else {
        return false;
  ***REMOVED***

      if(el.length < 1***REMOVED***{
        if(window.console***REMOVED***{
          console.error('element not valid', el***REMOVED***;
    ***REMOVED***
        return false;
  ***REMOVED***

      expose = $(this.settings.template.expose***REMOVED***;
      this.settings.$body.append(expose***REMOVED***;
      expose.css({
        top: el.offset(***REMOVED***.top,
        left: el.offset(***REMOVED***.left,
        width: el.outerWidth(true***REMOVED***,
        height: el.outerHeight(true***REMOVED***
  ***REMOVED******REMOVED***;

      exposeCover = $(this.settings.template.expose_cover***REMOVED***;

      origCSS = {
        zIndex: el.css('z-index'***REMOVED***,
        position: el.css('position'***REMOVED***
  ***REMOVED***;

      origClasses = el.attr('class'***REMOVED*** == null ? '' : el.attr('class'***REMOVED***;

      el.css('z-index',parseInt(expose.css('z-index'***REMOVED******REMOVED***+1***REMOVED***;

      if (origCSS.position == 'static'***REMOVED*** {
        el.css('position','relative'***REMOVED***;
  ***REMOVED***

      el.data('expose-css',origCSS***REMOVED***;
      el.data('orig-class', origClasses***REMOVED***;
      el.attr('class', origClasses + ' ' + this.settings.expose_add_class***REMOVED***;

      exposeCover.css({
        top: el.offset(***REMOVED***.top,
        left: el.offset(***REMOVED***.left,
        width: el.outerWidth(true***REMOVED***,
        height: el.outerHeight(true***REMOVED***
  ***REMOVED******REMOVED***;

      if (this.settings.modal***REMOVED*** this.show_modal(***REMOVED***;

      this.settings.$body.append(exposeCover***REMOVED***;
      expose.addClass(randId***REMOVED***;
      exposeCover.addClass(randId***REMOVED***;
      el.data('expose', randId***REMOVED***;
      this.settings.post_expose_callback(this.settings.$li.index(***REMOVED***, this.settings.$next_tip, el***REMOVED***;
      this.add_exposed(el***REMOVED***;
***REMOVED***,

    un_expose : function (***REMOVED*** {
      var exposeId,
          el,
          expose ,
          origCSS,
          origClasses,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $***REMOVED*** {
        el = arguments[0];
  ***REMOVED*** else if(this.settings.$target && !/body/i.test(this.settings.$target.selector***REMOVED******REMOVED***{
        el = this.settings.$target;
  ***REMOVED***  else {
        return false;
  ***REMOVED***

      if(el.length < 1***REMOVED***{
        if (window.console***REMOVED*** {
          console.error('element not valid', el***REMOVED***;
    ***REMOVED***
        return false;
  ***REMOVED***

      exposeId = el.data('expose'***REMOVED***;
      expose = $('.' + exposeId***REMOVED***;

      if (arguments.length > 1***REMOVED*** {
        clearAll = arguments[1];
  ***REMOVED***

      if (clearAll === true***REMOVED*** {
        $('.joyride-expose-wrapper,.joyride-expose-cover'***REMOVED***.remove(***REMOVED***;
  ***REMOVED*** else {
        expose.remove(***REMOVED***;
  ***REMOVED***

      origCSS = el.data('expose-css'***REMOVED***;

      if (origCSS.zIndex == 'auto'***REMOVED*** {
        el.css('z-index', ''***REMOVED***;
  ***REMOVED*** else {
        el.css('z-index', origCSS.zIndex***REMOVED***;
  ***REMOVED***

      if (origCSS.position != el.css('position'***REMOVED******REMOVED*** {
        if(origCSS.position == 'static'***REMOVED*** {// this is default, no need to set it.
          el.css('position', ''***REMOVED***;
    ***REMOVED*** else {
          el.css('position', origCSS.position***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      origClasses = el.data('orig-class'***REMOVED***;
      el.attr('class', origClasses***REMOVED***;
      el.removeData('orig-classes'***REMOVED***;

      el.removeData('expose'***REMOVED***;
      el.removeData('expose-z-index'***REMOVED***;
      this.remove_exposed(el***REMOVED***;
***REMOVED***,

    add_exposed: function(el***REMOVED***{
      this.settings.exposed = this.settings.exposed || [];
      if (el instanceof $ || typeof el === 'object'***REMOVED*** {
        this.settings.exposed.push(el[0]***REMOVED***;
  ***REMOVED*** else if (typeof el == 'string'***REMOVED*** {
        this.settings.exposed.push(el***REMOVED***;
  ***REMOVED***
***REMOVED***,

    remove_exposed: function(el***REMOVED***{
      var search, count;
      if (el instanceof $***REMOVED*** {
        search = el[0]
  ***REMOVED*** else if (typeof el == 'string'***REMOVED***{
        search = el;
  ***REMOVED***

      this.settings.exposed = this.settings.exposed || [];
      count = this.settings.exposed.length;

      for (var i=0; i < count; i++***REMOVED*** {
        if (this.settings.exposed[i] == search***REMOVED*** {
          this.settings.exposed.splice(i, 1***REMOVED***;
          return;
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    center : function (***REMOVED*** {
      var $w = $(window***REMOVED***;

      this.settings.$next_tip.css({
        top : ((($w.height(***REMOVED*** - this.settings.$next_tip.outerHeight(***REMOVED******REMOVED*** / 2***REMOVED*** + $w.scrollTop(***REMOVED******REMOVED***,
        left : ((($w.width(***REMOVED*** - this.settings.$next_tip.outerWidth(***REMOVED******REMOVED*** / 2***REMOVED*** + $w.scrollLeft(***REMOVED******REMOVED***
  ***REMOVED******REMOVED***;

      return true;
***REMOVED***,

    bottom : function (***REMOVED*** {
      return /bottom/i.test(this.settings.tip_settings.tip_location***REMOVED***;
***REMOVED***,

    top : function (***REMOVED*** {
      return /top/i.test(this.settings.tip_settings.tip_location***REMOVED***;
***REMOVED***,

    right : function (***REMOVED*** {
      return /right/i.test(this.settings.tip_settings.tip_location***REMOVED***;
***REMOVED***,

    left : function (***REMOVED*** {
      return /left/i.test(this.settings.tip_settings.tip_location***REMOVED***;
***REMOVED***,

    corners : function (el***REMOVED*** {
      var w = $(window***REMOVED***,
          window_half = w.height(***REMOVED*** / 2,
          //using this to calculate since scroll may not have finished yet.
          tipOffset = Math.ceil(this.settings.$target.offset(***REMOVED***.top - window_half + this.settings.$next_tip.outerHeight(***REMOVED******REMOVED***,
          right = w.width(***REMOVED*** + w.scrollLeft(***REMOVED***,
          offsetBottom =  w.height(***REMOVED*** + tipOffset,
          bottom = w.height(***REMOVED*** + w.scrollTop(***REMOVED***,
          top = w.scrollTop(***REMOVED***;

      if (tipOffset < top***REMOVED*** {
        if (tipOffset < 0***REMOVED*** {
          top = 0;
    ***REMOVED*** else {
          top = tipOffset;
    ***REMOVED***
  ***REMOVED***

      if (offsetBottom > bottom***REMOVED*** {
        bottom = offsetBottom;
  ***REMOVED***

      return [
        el.offset(***REMOVED***.top < top,
        right < el.offset(***REMOVED***.left + el.outerWidth(***REMOVED***,
        bottom < el.offset(***REMOVED***.top + el.outerHeight(***REMOVED***,
        w.scrollLeft(***REMOVED*** > el.offset(***REMOVED***.left
      ];
***REMOVED***,

    visible : function (hidden_corners***REMOVED*** {
      var i = hidden_corners.length;

      while (i--***REMOVED*** {
        if (hidden_corners[i]***REMOVED*** return false;
  ***REMOVED***

      return true;
***REMOVED***,

    nub_position : function (nub, pos, def***REMOVED*** {
      if (pos === 'auto'***REMOVED*** {
        nub.addClass(def***REMOVED***;
  ***REMOVED*** else {
        nub.addClass(pos***REMOVED***;
  ***REMOVED***
***REMOVED***,

    startTimer : function (***REMOVED*** {
      if (this.settings.$li.length***REMOVED*** {
        this.settings.automate = setTimeout(function (***REMOVED*** {
          this.hide(***REMOVED***;
          this.show(***REMOVED***;
          this.startTimer(***REMOVED***;
    ***REMOVED***.bind(this***REMOVED***, this.settings.timer***REMOVED***;
  ***REMOVED*** else {
        clearTimeout(this.settings.automate***REMOVED***;
  ***REMOVED***
***REMOVED***,

    end : function (***REMOVED*** {
      if (this.settings.cookie_monster***REMOVED*** {
        $.cookie(this.settings.cookie_name, 'ridden', { expires: this.settings.cookie_expires, domain: this.settings.cookie_domain ***REMOVED******REMOVED***;
  ***REMOVED***

      if (this.settings.timer > 0***REMOVED*** {
        clearTimeout(this.settings.automate***REMOVED***;
  ***REMOVED***

      if (this.settings.modal && this.settings.expose***REMOVED*** {
        this.un_expose(***REMOVED***;
  ***REMOVED***

      this.settings.$next_tip.data('closed', true***REMOVED***;

      $('.joyride-modal-bg'***REMOVED***.hide(***REMOVED***;
      this.settings.$current_tip.hide(***REMOVED***;
      this.settings.post_step_callback(this.settings.$li.index(***REMOVED***, this.settings.$current_tip***REMOVED***;
      this.settings.post_ride_callback(this.settings.$li.index(***REMOVED***, this.settings.$current_tip***REMOVED***;
      $('.joyride-tip-guide'***REMOVED***.remove(***REMOVED***;
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.joyride'***REMOVED***;
      $(window***REMOVED***.off('.joyride'***REMOVED***;
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg'***REMOVED***.off('.joyride'***REMOVED***;
      $('.joyride-tip-guide, .joyride-modal-bg'***REMOVED***.remove(***REMOVED***;
      clearTimeout(this.settings.automate***REMOVED***;
      this.settings = {***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
