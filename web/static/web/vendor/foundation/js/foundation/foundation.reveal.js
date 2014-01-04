;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.0.0',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animation_speed: 250,
      close_on_background_click: true,
      close_on_esc: true,
      dismiss_modal_class: 'close-reveal-modal',
      bg_class: 'reveal-modal-bg',
      open: function(***REMOVED***{***REMOVED***,
      opened: function(***REMOVED***{***REMOVED***,
      close: function(***REMOVED***{***REMOVED***,
      closed: function(***REMOVED***{***REMOVED***,
      bg : $('.reveal-modal-bg'***REMOVED***,
      css : {
        open : {
          'opacity': 0,
          'visibility': 'visible',
          'display' : 'block'
    ***REMOVED***,
        close : {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      Foundation.inherit(this, 'delay'***REMOVED***;

      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (scope***REMOVED*** {
      var self = this;

      $('[data-reveal-id]', this.scope***REMOVED***
        .off('.reveal'***REMOVED***
        .on('click.fndtn.reveal', function (e***REMOVED*** {
          e.preventDefault(***REMOVED***;

          if (!self.locked***REMOVED*** {
            var element = $(this***REMOVED***,
                ajax = element.data('reveal-ajax'***REMOVED***;

            self.locked = true;

            if (typeof ajax === 'undefined'***REMOVED*** {
              self.open.call(self, element***REMOVED***;
        ***REMOVED*** else {
              var url = ajax === true ? element.attr('href'***REMOVED*** : ajax;

              self.open.call(self, element, {url: url***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED***;

      $(this.scope***REMOVED***
        .off('.reveal'***REMOVED***
        .on('click.fndtn.reveal', this.close_targets(***REMOVED***, function (e***REMOVED*** {

          e.preventDefault(***REMOVED***;

          if (!self.locked***REMOVED*** {
            var settings = $('[data-reveal].open'***REMOVED***.data('reveal-init'***REMOVED***,
                bg_clicked = $(e.target***REMOVED***[0] === $('.' + settings.bg_class***REMOVED***[0];

            if (bg_clicked && !settings.close_on_background_click***REMOVED*** {
              return;
        ***REMOVED***

            self.locked = true;
            self.close.call(self, bg_clicked ? $('[data-reveal].open'***REMOVED*** : $(this***REMOVED***.closest('[data-reveal]'***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***;

      if($('[data-reveal]', this.scope***REMOVED***.length > 0***REMOVED*** {
        $(this.scope***REMOVED***
          // .off('.reveal'***REMOVED***
          .on('open.fndtn.reveal', this.settings.open***REMOVED***
          .on('opened.fndtn.reveal', this.settings.opened***REMOVED***
          .on('opened.fndtn.reveal', this.open_video***REMOVED***
          .on('close.fndtn.reveal', this.settings.close***REMOVED***
          .on('closed.fndtn.reveal', this.settings.closed***REMOVED***
          .on('closed.fndtn.reveal', this.close_video***REMOVED***;
  ***REMOVED*** else {
        $(this.scope***REMOVED***
          // .off('.reveal'***REMOVED***
          .on('open.fndtn.reveal', '[data-reveal]', this.settings.open***REMOVED***
          .on('opened.fndtn.reveal', '[data-reveal]', this.settings.opened***REMOVED***
          .on('opened.fndtn.reveal', '[data-reveal]', this.open_video***REMOVED***
          .on('close.fndtn.reveal', '[data-reveal]', this.settings.close***REMOVED***
          .on('closed.fndtn.reveal', '[data-reveal]', this.settings.closed***REMOVED***
          .on('closed.fndtn.reveal', '[data-reveal]', this.close_video***REMOVED***;
  ***REMOVED***

      $('body'***REMOVED***.on('keyup.fndtn.reveal', function ( event ***REMOVED*** {
        var open_modal = $('[data-reveal].open'***REMOVED***,
            settings = open_modal.data('reveal-init'***REMOVED***;
        if ( event.which === 27  && settings.close_on_esc***REMOVED*** { // 27 is the keycode for the Escape key
          open_modal.foundation('reveal', 'close'***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;

      return true;
***REMOVED***,

    open : function (target, ajax_settings***REMOVED*** {
      if (target***REMOVED*** {
        if (typeof target.selector !== 'undefined'***REMOVED*** {
          var modal = $('#' + target.data('reveal-id'***REMOVED******REMOVED***;
    ***REMOVED*** else {
          var modal = $(this.scope***REMOVED***;

          ajax_settings = target;
    ***REMOVED***
  ***REMOVED*** else {
        var modal = $(this.scope***REMOVED***;
  ***REMOVED***

      if (!modal.hasClass('open'***REMOVED******REMOVED*** {
        var open_modal = $('[data-reveal].open'***REMOVED***;

        if (typeof modal.data('css-top'***REMOVED*** === 'undefined'***REMOVED*** {
          modal.data('css-top', parseInt(modal.css('top'***REMOVED***, 10***REMOVED******REMOVED***
            .data('offset', this.cache_offset(modal***REMOVED******REMOVED***;
    ***REMOVED***

        modal.trigger('open'***REMOVED***;

        if (open_modal.length < 1***REMOVED*** {
          this.toggle_bg(***REMOVED***;
    ***REMOVED***

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url***REMOVED*** {
          this.hide(open_modal, this.settings.css.close***REMOVED***;
          this.show(modal, this.settings.css.open***REMOVED***;
    ***REMOVED*** else {
          var self = this,
              old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR***REMOVED*** {
              if ( $.isFunction(old_success***REMOVED*** ***REMOVED*** {
                old_success(data, textStatus, jqXHR***REMOVED***;
          ***REMOVED***

              modal.html(data***REMOVED***;
              $(modal***REMOVED***.foundation('section', 'reflow'***REMOVED***;

              self.hide(open_modal, self.settings.css.close***REMOVED***;
              self.show(modal, self.settings.css.open***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;

          $.ajax(ajax_settings***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    close : function (modal***REMOVED*** {

      var modal = modal && modal.length ? modal : $(this.scope***REMOVED***,
          open_modals = $('[data-reveal].open'***REMOVED***;

      if (open_modals.length > 0***REMOVED*** {
        this.locked = true;
        modal.trigger('close'***REMOVED***;
        this.toggle_bg(***REMOVED***;
        this.hide(open_modals, this.settings.css.close***REMOVED***;
  ***REMOVED***
***REMOVED***,

    close_targets : function (***REMOVED*** {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click***REMOVED*** {
        return base + ', .' + this.settings.bg_class;
  ***REMOVED***

      return base;
***REMOVED***,

    toggle_bg : function (***REMOVED*** {
      if ($('.' + this.settings.bg_class***REMOVED***.length === 0***REMOVED*** {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class***REMOVED******REMOVED***
          .appendTo('body'***REMOVED***;
  ***REMOVED***

      if (this.settings.bg.filter(':visible'***REMOVED***.length > 0***REMOVED*** {
        this.hide(this.settings.bg***REMOVED***;
  ***REMOVED*** else {
        this.show(this.settings.bg***REMOVED***;
  ***REMOVED***
***REMOVED***,

    show : function (el, css***REMOVED*** {
      // is modal
      if (css***REMOVED*** {
        if (el.parent('body'***REMOVED***.length === 0***REMOVED*** {
          var placeholder = el.wrap('<div style="display: none;" />'***REMOVED***.parent(***REMOVED***;
          el.on('closed.fndtn.reveal.wrapped', function(***REMOVED*** {
            el.detach(***REMOVED***.appendTo(placeholder***REMOVED***;
            el.unwrap(***REMOVED***.unbind('closed.fndtn.reveal.wrapped'***REMOVED***;
      ***REMOVED******REMOVED***;

          el.detach(***REMOVED***.appendTo('body'***REMOVED***;
    ***REMOVED***

        if (/pop/i.test(this.settings.animation***REMOVED******REMOVED*** {
          css.top = $(window***REMOVED***.scrollTop(***REMOVED*** - el.data('offset'***REMOVED*** + 'px';
          var end_css = {
            top: $(window***REMOVED***.scrollTop(***REMOVED*** + el.data('css-top'***REMOVED*** + 'px',
            opacity: 1
      ***REMOVED***;

          return this.delay(function (***REMOVED*** {
            return el
              .css(css***REMOVED***
              .animate(end_css, this.settings.animation_speed, 'linear', function (***REMOVED*** {
                this.locked = false;
                el.trigger('opened'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED******REMOVED***
              .addClass('open'***REMOVED***;
      ***REMOVED***.bind(this***REMOVED***, this.settings.animation_speed / 2***REMOVED***;
    ***REMOVED***

        if (/fade/i.test(this.settings.animation***REMOVED******REMOVED*** {
          var end_css = {opacity: 1***REMOVED***;

          return this.delay(function (***REMOVED*** {
            return el
              .css(css***REMOVED***
              .animate(end_css, this.settings.animation_speed, 'linear', function (***REMOVED*** {
                this.locked = false;
                el.trigger('opened'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED******REMOVED***
              .addClass('open'***REMOVED***;
      ***REMOVED***.bind(this***REMOVED***, this.settings.animation_speed / 2***REMOVED***;
    ***REMOVED***

        return el.css(css***REMOVED***.show(***REMOVED***.css({opacity: 1***REMOVED******REMOVED***.addClass('open'***REMOVED***.trigger('opened'***REMOVED***;
  ***REMOVED***

      // should we animate the background?
      if (/fade/i.test(this.settings.animation***REMOVED******REMOVED*** {
        return el.fadeIn(this.settings.animation_speed / 2***REMOVED***;
  ***REMOVED***

      return el.show(***REMOVED***;
***REMOVED***,

    hide : function (el, css***REMOVED*** {
      // is modal
      if (css***REMOVED*** {
        if (/pop/i.test(this.settings.animation***REMOVED******REMOVED*** {
          var end_css = {
            top: - $(window***REMOVED***.scrollTop(***REMOVED*** - el.data('offset'***REMOVED*** + 'px',
            opacity: 0
      ***REMOVED***;

          return this.delay(function (***REMOVED*** {
            return el
              .animate(end_css, this.settings.animation_speed, 'linear', function (***REMOVED*** {
                this.locked = false;
                el.css(css***REMOVED***.trigger('closed'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED******REMOVED***
              .removeClass('open'***REMOVED***;
      ***REMOVED***.bind(this***REMOVED***, this.settings.animation_speed / 2***REMOVED***;
    ***REMOVED***

        if (/fade/i.test(this.settings.animation***REMOVED******REMOVED*** {
          var end_css = {opacity: 0***REMOVED***;

          return this.delay(function (***REMOVED*** {
            return el
              .animate(end_css, this.settings.animation_speed, 'linear', function (***REMOVED*** {
                this.locked = false;
                el.css(css***REMOVED***.trigger('closed'***REMOVED***;
          ***REMOVED***.bind(this***REMOVED******REMOVED***
              .removeClass('open'***REMOVED***;
      ***REMOVED***.bind(this***REMOVED***, this.settings.animation_speed / 2***REMOVED***;
    ***REMOVED***

        return el.hide(***REMOVED***.css(css***REMOVED***.removeClass('open'***REMOVED***.trigger('closed'***REMOVED***;
  ***REMOVED***

      // should we animate the background?
      if (/fade/i.test(this.settings.animation***REMOVED******REMOVED*** {
        return el.fadeOut(this.settings.animation_speed / 2***REMOVED***;
  ***REMOVED***

      return el.hide(***REMOVED***;
***REMOVED***,

    close_video : function (e***REMOVED*** {
      var video = $(this***REMOVED***.find('.flex-video'***REMOVED***,
          iframe = video.find('iframe'***REMOVED***;

      if (iframe.length > 0***REMOVED*** {
        iframe.attr('data-src', iframe[0].src***REMOVED***;
        iframe.attr('src', 'about:blank'***REMOVED***;
        video.hide(***REMOVED***;
  ***REMOVED***
***REMOVED***,

    open_video : function (e***REMOVED*** {
      var video = $(this***REMOVED***.find('.flex-video'***REMOVED***,
          iframe = video.find('iframe'***REMOVED***;

      if (iframe.length > 0***REMOVED*** {
        var data_src = iframe.attr('data-src'***REMOVED***;
        if (typeof data_src === 'string'***REMOVED*** {
          iframe[0].src = iframe.attr('data-src'***REMOVED***;
    ***REMOVED*** else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
    ***REMOVED***
        video.show(***REMOVED***;
  ***REMOVED***
***REMOVED***,

    cache_offset : function (modal***REMOVED*** {
      var offset = modal.show(***REMOVED***.height(***REMOVED*** + parseInt(modal.css('top'***REMOVED***, 10***REMOVED***;

      modal.hide(***REMOVED***;

      return offset;
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.reveal'***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
