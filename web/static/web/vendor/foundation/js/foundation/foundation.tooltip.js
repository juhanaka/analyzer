;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.tooltip = {
    name : 'tooltip',

    version : '5.0.0',

    settings : {
      additional_inheritable_classes : [],
      tooltip_class : '.tooltip',
      append_to: 'body',
      touch_close_text: 'Tap To Close',
      disable_for_touch: false,
      tip_template : function (selector, content***REMOVED*** {
        return '<span data-selector="' + selector + '" class="' 
          + Foundation.libs.tooltip.settings.tooltip_class.substring(1***REMOVED*** 
          + '">' + content + '<span class="nub"></span></span>';
  ***REMOVED***
***REMOVED***,

    cache : {***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      var self = this;

      if (Modernizr.touch***REMOVED*** {
        $(this.scope***REMOVED***
          .off('.tooltip'***REMOVED***
          .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
            '[data-tooltip]', function (e***REMOVED*** {
            var settings = $.extend({***REMOVED***, self.settings, self.data_options($(this***REMOVED******REMOVED******REMOVED***;
            if (!settings.disable_for_touch***REMOVED*** {
              e.preventDefault(***REMOVED***;
              $(settings.tooltip_class***REMOVED***.hide(***REMOVED***;
              self.showOrCreateTip($(this***REMOVED******REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***
          .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
            this.settings.tooltip_class, function (e***REMOVED*** {
            e.preventDefault(***REMOVED***;
            $(this***REMOVED***.fadeOut(150***REMOVED***;
      ***REMOVED******REMOVED***;
  ***REMOVED*** else {
        $(this.scope***REMOVED***
          .off('.tooltip'***REMOVED***
          .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip', 
            '[data-tooltip]', function (e***REMOVED*** {
            var $this = $(this***REMOVED***;

            if (/enter|over/i.test(e.type***REMOVED******REMOVED*** {
              self.showOrCreateTip($this***REMOVED***;
        ***REMOVED*** else if (e.type === 'mouseout' || e.type === 'mouseleave'***REMOVED*** {
              self.hide($this***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED***,

    showOrCreateTip : function ($target***REMOVED*** {
      var $tip = this.getTip($target***REMOVED***;

      if ($tip && $tip.length > 0***REMOVED*** {
        return this.show($target***REMOVED***;
  ***REMOVED***

      return this.create($target***REMOVED***;
***REMOVED***,

    getTip : function ($target***REMOVED*** {
      var selector = this.selector($target***REMOVED***,
          tip = null;

      if (selector***REMOVED*** {
        tip = $('span[data-selector="' + selector + '"]' + this.settings.tooltip_class***REMOVED***;
  ***REMOVED***

      return (typeof tip === 'object'***REMOVED*** ? tip : false;
***REMOVED***,

    selector : function ($target***REMOVED*** {
      var id = $target.attr('id'***REMOVED***,
          dataSelector = $target.attr('data-tooltip'***REMOVED*** || $target.attr('data-selector'***REMOVED***;

      if ((id && id.length < 1 || !id***REMOVED*** && typeof dataSelector != 'string'***REMOVED*** {
        dataSelector = 'tooltip' + Math.random(***REMOVED***.toString(36***REMOVED***.substring(7***REMOVED***;
        $target.attr('data-selector', dataSelector***REMOVED***;
  ***REMOVED***

      return (id && id.length > 0***REMOVED*** ? id : dataSelector;
***REMOVED***,

    create : function ($target***REMOVED*** {
      var $tip = $(this.settings.tip_template(this.selector($target***REMOVED***, $('<div></div>'***REMOVED***.html($target.attr('title'***REMOVED******REMOVED***.html(***REMOVED******REMOVED******REMOVED***,
          classes = this.inheritable_classes($target***REMOVED***;

      $tip.addClass(classes***REMOVED***.appendTo(this.settings.append_to***REMOVED***;
      if (Modernizr.touch***REMOVED*** {
        $tip.append('<span class="tap-to-close">'+this.settings.touch_close_text+'</span>'***REMOVED***;
  ***REMOVED***
      $target.removeAttr('title'***REMOVED***.attr('title',''***REMOVED***;
      this.show($target***REMOVED***;
***REMOVED***,

    reposition : function (target, tip, classes***REMOVED*** {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden'***REMOVED***.show(***REMOVED***;

      width = target.data('width'***REMOVED***;
      nub = tip.children('.nub'***REMOVED***;
      nubHeight = nub.outerHeight(***REMOVED***;
      nubWidth = nub.outerHeight(***REMOVED***;

      objPos = function (obj, top, right, bottom, left, width***REMOVED*** {
        return obj.css({
          'top' : (top***REMOVED*** ? top : 'auto',
          'bottom' : (bottom***REMOVED*** ? bottom : 'auto',
          'left' : (left***REMOVED*** ? left : 'auto',
          'right' : (right***REMOVED*** ? right : 'auto',
          'width' : (width***REMOVED*** ? width : 'auto'
    ***REMOVED******REMOVED***.end(***REMOVED***;
  ***REMOVED***;

      objPos(tip, (target.offset(***REMOVED***.top + target.outerHeight(***REMOVED*** + 10***REMOVED***, 'auto', 'auto', target.offset(***REMOVED***.left, width***REMOVED***;

      if (this.small(***REMOVED******REMOVED*** {
        objPos(tip, (target.offset(***REMOVED***.top + target.outerHeight(***REMOVED*** + 10***REMOVED***, 'auto', 'auto', 12.5, $(this.scope***REMOVED***.width(***REMOVED******REMOVED***;
        tip.addClass('tip-override'***REMOVED***;
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset(***REMOVED***.left***REMOVED***;
  ***REMOVED*** else {
        var left = target.offset(***REMOVED***.left;
        if (Foundation.rtl***REMOVED*** {
          left = target.offset(***REMOVED***.left + target.offset(***REMOVED***.width - tip.outerWidth(***REMOVED***;
    ***REMOVED***
        objPos(tip, (target.offset(***REMOVED***.top + target.outerHeight(***REMOVED*** + 10***REMOVED***, 'auto', 'auto', left, width***REMOVED***;
        tip.removeClass('tip-override'***REMOVED***;
        if (classes && classes.indexOf('tip-top'***REMOVED*** > -1***REMOVED*** {
          objPos(tip, (target.offset(***REMOVED***.top - tip.outerHeight(***REMOVED******REMOVED***, 'auto', 'auto', left, width***REMOVED***
            .removeClass('tip-override'***REMOVED***;
    ***REMOVED*** else if (classes && classes.indexOf('tip-left'***REMOVED*** > -1***REMOVED*** {
          objPos(tip, (target.offset(***REMOVED***.top + (target.outerHeight(***REMOVED*** / 2***REMOVED*** - nubHeight*2.5***REMOVED***, 'auto', 'auto', (target.offset(***REMOVED***.left - tip.outerWidth(***REMOVED*** - nubHeight***REMOVED***, width***REMOVED***
            .removeClass('tip-override'***REMOVED***;
    ***REMOVED*** else if (classes && classes.indexOf('tip-right'***REMOVED*** > -1***REMOVED*** {
          objPos(tip, (target.offset(***REMOVED***.top + (target.outerHeight(***REMOVED*** / 2***REMOVED*** - nubHeight*2.5***REMOVED***, 'auto', 'auto', (target.offset(***REMOVED***.left + target.outerWidth(***REMOVED*** + nubHeight***REMOVED***, width***REMOVED***
            .removeClass('tip-override'***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      tip.css('visibility', 'visible'***REMOVED***.hide(***REMOVED***;
***REMOVED***,

    small : function (***REMOVED*** {
      return matchMedia(Foundation.media_queries.small***REMOVED***.matches;
***REMOVED***,

    inheritable_classes : function (target***REMOVED*** {
      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'].concat(this.settings.additional_inheritable_classes***REMOVED***,
          classes = target.attr('class'***REMOVED***,
          filtered = classes ? $.map(classes.split(' '***REMOVED***, function (el, i***REMOVED*** {
            if ($.inArray(el, inheritables***REMOVED*** !== -1***REMOVED*** {
              return el;
        ***REMOVED***
      ***REMOVED******REMOVED***.join(' '***REMOVED*** : '';

      return $.trim(filtered***REMOVED***;
***REMOVED***,

    show : function ($target***REMOVED*** {
      var $tip = this.getTip($target***REMOVED***;

      this.reposition($target, $tip, $target.attr('class'***REMOVED******REMOVED***;
      $tip.fadeIn(150***REMOVED***;
***REMOVED***,

    hide : function ($target***REMOVED*** {
      var $tip = this.getTip($target***REMOVED***;

      $tip.fadeOut(150***REMOVED***;
***REMOVED***,

    // deprecate reload
    reload : function (***REMOVED*** {
      var $self = $(this***REMOVED***;

      return ($self.data('fndtn-tooltips'***REMOVED******REMOVED*** ? $self.foundationTooltips('destroy'***REMOVED***.foundationTooltips('init'***REMOVED*** : $self.foundationTooltips('init'***REMOVED***;
***REMOVED***,

    off : function (***REMOVED*** {
      $(this.scope***REMOVED***.off('.fndtn.tooltip'***REMOVED***;
      $(this.settings.tooltip_class***REMOVED***.each(function (i***REMOVED*** {
        $('[data-tooltip]'***REMOVED***.get(i***REMOVED***.attr('title', $(this***REMOVED***.text(***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***.remove(***REMOVED***;
***REMOVED***,

    reflow : function (***REMOVED*** {***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
