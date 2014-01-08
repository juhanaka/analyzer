;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.abide = {
    name : 'abide',

    version : '5.0.0',

    settings : {
      focus_on_invalid : true,
      timeout : 1000,
      patterns : {
        alpha: /[a-zA-Z]+/,
        alpha_numeric : /[a-zA-Z0-9]+/,
        integer: /-?\d+/,
        number: /-?(?:\d+|\d{1,3***REMOVED***(?:,\d{3***REMOVED******REMOVED***+***REMOVED***?(?:\.\d+***REMOVED***?/,

        // generic password: upper-case, lower-case, number/special character, and min 8 characters
        password : /(?=^.{8,***REMOVED***$***REMOVED***((?=.*\d***REMOVED***|(?=.*\W+***REMOVED******REMOVED***(?![.\n]***REMOVED***(?=.*[A-Z]***REMOVED***(?=.*[a-z]***REMOVED***.*$/,

        // amex, visa, diners
        card : /^(?:4[0-9]{12***REMOVED***(?:[0-9]{3***REMOVED******REMOVED***?|5[1-5][0-9]{14***REMOVED***|6(?:011|5[0-9][0-9]***REMOVED***[0-9]{12***REMOVED***|3[47][0-9]{13***REMOVED***|3(?:0[0-5]|[68][0-9]***REMOVED***[0-9]{11***REMOVED***|(?:2131|1800|35\d{3***REMOVED******REMOVED***\d{11***REMOVED******REMOVED***$/,
        cvv : /^([0-9]***REMOVED***{3,4***REMOVED***$/,

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|***REMOVED***~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61***REMOVED***[a-zA-Z0-9]***REMOVED***?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61***REMOVED***[a-zA-Z0-9]***REMOVED***?***REMOVED****$/,

        url: /(https?|ftp|file|ssh***REMOVED***:\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(%[\da-f]{2***REMOVED******REMOVED***|[!\$&'\(\***REMOVED***\*\+,;=]|:***REMOVED****@***REMOVED***?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]***REMOVED***\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]***REMOVED***\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]***REMOVED***\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]***REMOVED******REMOVED***|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED****([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED******REMOVED******REMOVED***\.***REMOVED***+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED****([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED******REMOVED******REMOVED***\.?***REMOVED***(:\d****REMOVED***?***REMOVED***(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(%[\da-f]{2***REMOVED******REMOVED***|[!\$&'\(\***REMOVED***\*\+,;=]|:|@***REMOVED***+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(%[\da-f]{2***REMOVED******REMOVED***|[!\$&'\(\***REMOVED***\*\+,;=]|:|@***REMOVED*******REMOVED*******REMOVED***?***REMOVED***?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(%[\da-f]{2***REMOVED******REMOVED***|[!\$&'\(\***REMOVED***\*\+,;=]|:|@***REMOVED***|[\uE000-\uF8FF]|\/|\?***REMOVED*******REMOVED***?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]***REMOVED***|(%[\da-f]{2***REMOVED******REMOVED***|[!\$&'\(\***REMOVED***\*\+,;=]|:|@***REMOVED***|\/|\?***REMOVED*******REMOVED***?/,
        // abc.de
        domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61***REMOVED***[a-zA-Z0-9]***REMOVED***?\.***REMOVED***+[a-zA-Z]{2,6***REMOVED***$/,

        datetime: /([0-2][0-9]{3***REMOVED******REMOVED***\-([0-1][0-9]***REMOVED***\-([0-3][0-9]***REMOVED***T([0-5][0-9]***REMOVED***\:([0-5][0-9]***REMOVED***\:([0-5][0-9]***REMOVED***(Z|([\-\+]([0-1][0-9]***REMOVED***\:00***REMOVED******REMOVED***/,
        // YYYY-MM-DD
        date: /(?:19|20***REMOVED***[0-9]{2***REMOVED***-(?:(?:0[1-9]|1[0-2]***REMOVED***-(?:0[1-9]|1[0-9]|2[0-9]***REMOVED***|(?:(?!02***REMOVED***(?:0[1-9]|1[0-2]***REMOVED***-(?:30***REMOVED******REMOVED***|(?:(?:0[13578]|1[02]***REMOVED***-31***REMOVED******REMOVED***/,
        // HH:MM:SS
        time : /(0[0-9]|1[0-9]|2[0-3]***REMOVED***(:[0-5][0-9]***REMOVED***{2***REMOVED***/,
        dateISO: /\d{4***REMOVED***[\/\-]\d{1,2***REMOVED***[\/\-]\d{1,2***REMOVED***/,
        // MM/DD/YYYY
        month_day_year : /(0[1-9]|1[012]***REMOVED***[- \/.](0[1-9]|[12][0-9]|3[01]***REMOVED***[- \/.](19|20***REMOVED***\d\d/,

        // #FFF or #FFFFFF
        color: /^#?([a-fA-F0-9]{6***REMOVED***|[a-fA-F0-9]{3***REMOVED******REMOVED***$/
  ***REMOVED***
***REMOVED***,

    timer : null,

    init : function (scope, method, options***REMOVED*** {
      this.bindings(method, options***REMOVED***;
***REMOVED***,

    events : function (scope***REMOVED*** {
      var self = this,
          form = $(scope***REMOVED***.attr('novalidate', 'novalidate'***REMOVED***,
          settings = form.data('abide-init'***REMOVED***;

      form
        .off('.abide'***REMOVED***
        .on('submit.fndtn.abide validate.fndtn.abide', function (e***REMOVED*** {
          var is_ajax = /ajax/i.test($(this***REMOVED***.attr('data-abide'***REMOVED******REMOVED***;
          return self.validate($(this***REMOVED***.find('input, textarea, select'***REMOVED***.get(***REMOVED***, e, is_ajax***REMOVED***;
    ***REMOVED******REMOVED***
        .find('input, textarea, select'***REMOVED***
          .off('.abide'***REMOVED***
          .on('blur.fndtn.abide change.fndtn.abide', function (e***REMOVED*** {
            self.validate([this], e***REMOVED***;
      ***REMOVED******REMOVED***
          .on('keydown.fndtn.abide', function (e***REMOVED*** {
            var settings = $(this***REMOVED***.closest('form'***REMOVED***.data('abide-init'***REMOVED***;
            clearTimeout(self.timer***REMOVED***;
            self.timer = setTimeout(function (***REMOVED*** {
              self.validate([this], e***REMOVED***;
        ***REMOVED***.bind(this***REMOVED***, settings.timeout***REMOVED***;
      ***REMOVED******REMOVED***;
***REMOVED***,

    validate : function (els, e, is_ajax***REMOVED*** {
      var validations = this.parse_patterns(els***REMOVED***,
          validation_count = validations.length,
          form = $(els[0]***REMOVED***.closest('form'***REMOVED***,
          submit_event = /submit/.test(e.type***REMOVED***;

      for (var i=0; i < validation_count; i++***REMOVED*** {
        if (!validations[i] && (submit_event || is_ajax***REMOVED******REMOVED*** {
          if (this.settings.focus_on_invalid***REMOVED*** els[i].focus(***REMOVED***;
          form.trigger('invalid'***REMOVED***;
          $(els[i]***REMOVED***.closest('form'***REMOVED***.attr('data-invalid', ''***REMOVED***;
          return false;
    ***REMOVED***
  ***REMOVED***

      if (submit_event || is_ajax***REMOVED*** {
        form.trigger('valid'***REMOVED***;
  ***REMOVED***

      form.removeAttr('data-invalid'***REMOVED***;

      if (is_ajax***REMOVED*** return false;

      return true;
***REMOVED***,

    parse_patterns : function (els***REMOVED*** {
      var count = els.length,
          el_patterns = [];

      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        el_patterns.push(this.pattern(els[i]***REMOVED******REMOVED***;
  ***REMOVED***

      return this.check_validation_and_apply_styles(el_patterns***REMOVED***;
***REMOVED***,

    pattern : function (el***REMOVED*** {
      var type = el.getAttribute('type'***REMOVED***,
          required = typeof el.getAttribute('required'***REMOVED*** === 'string';

      if (this.settings.patterns.hasOwnProperty(type***REMOVED******REMOVED*** {
        return [el, this.settings.patterns[type], required];
  ***REMOVED***

      var pattern = el.getAttribute('pattern'***REMOVED*** || '';

      if (this.settings.patterns.hasOwnProperty(pattern***REMOVED*** && pattern.length > 0***REMOVED*** {
        return [el, this.settings.patterns[pattern], required];
  ***REMOVED*** else if (pattern.length > 0***REMOVED*** {
        return [el, new RegExp(pattern***REMOVED***, required];
  ***REMOVED***

      pattern = /.*/;

      return [el, pattern, required];
***REMOVED***,

    check_validation_and_apply_styles : function (el_patterns***REMOVED*** {
      var count = el_patterns.length,
          validations = [];

      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        var el = el_patterns[i][0],
            required = el_patterns[i][2],
            value = el.value,
            is_equal = el.getAttribute('data-equalto'***REMOVED***,
            is_radio = el.type === "radio",
            valid_length = (required***REMOVED*** ? (el.value.length > 0***REMOVED*** : true;

        if (is_radio && required***REMOVED*** {
          validations.push(this.valid_radio(el, required***REMOVED******REMOVED***;
    ***REMOVED*** else if (is_equal && required***REMOVED*** {
          validations.push(this.valid_equal(el, required***REMOVED******REMOVED***;
    ***REMOVED*** else {
          if (el_patterns[i][1].test(value***REMOVED*** && valid_length ||
            !required && el.value.length < 1***REMOVED*** {
            $(el***REMOVED***.removeAttr('data-invalid'***REMOVED***.parent(***REMOVED***.removeClass('error'***REMOVED***;
            validations.push(true***REMOVED***;
      ***REMOVED*** else {
            $(el***REMOVED***.attr('data-invalid', ''***REMOVED***.parent(***REMOVED***.addClass('error'***REMOVED***;
            validations.push(false***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      return validations;
***REMOVED***,

    valid_radio : function (el, required***REMOVED*** {
      var name = el.getAttribute('name'***REMOVED***,
          group = document.getElementsByName(name***REMOVED***,
          count = group.length,
          valid = false;

      for (var i=0; i < count; i++***REMOVED*** {
        if (group[i].checked***REMOVED*** valid = true;
  ***REMOVED***

      for (var i=0; i < count; i++***REMOVED*** {
        if (valid***REMOVED*** {
          $(group[i]***REMOVED***.removeAttr('data-invalid'***REMOVED***.parent(***REMOVED***.removeClass('error'***REMOVED***;
    ***REMOVED*** else {
          $(group[i]***REMOVED***.attr('data-invalid', ''***REMOVED***.parent(***REMOVED***.addClass('error'***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return valid;
***REMOVED***,

    valid_equal: function(el, required***REMOVED*** {
      var from  = document.getElementById(el.getAttribute('data-equalto'***REMOVED******REMOVED***.value,
          to    = el.value,
          valid = (from === to***REMOVED***;

      if (valid***REMOVED*** {
        $(el***REMOVED***.removeAttr('data-invalid'***REMOVED***.parent(***REMOVED***.removeClass('error'***REMOVED***;
  ***REMOVED*** else {
        $(el***REMOVED***.attr('data-invalid', ''***REMOVED***.parent(***REMOVED***.addClass('error'***REMOVED***;
  ***REMOVED***

      return valid;
***REMOVED***
  ***REMOVED***;
***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
