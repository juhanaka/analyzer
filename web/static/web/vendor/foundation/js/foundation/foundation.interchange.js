;(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '5.0.0',

    cache : {***REMOVED***,

    images_loaded : false,
    nodes_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default' : Foundation.media_queries.small,
        small : Foundation.media_queries.small,
        medium : Foundation.media_queries.medium,
        large : Foundation.media_queries.large,
        xlarge : Foundation.media_queries.xlarge,
        xxlarge: Foundation.media_queries.xxlarge,
        landscape : 'only screen and (orientation: landscape***REMOVED***',
        portrait : 'only screen and (orientation: portrait***REMOVED***',
        retina : 'only screen and (-webkit-min-device-pixel-ratio: 2***REMOVED***,' + 
          'only screen and (min--moz-device-pixel-ratio: 2***REMOVED***,' + 
          'only screen and (-o-min-device-pixel-ratio: 2/1***REMOVED***,' + 
          'only screen and (min-device-pixel-ratio: 2***REMOVED***,' + 
          'only screen and (min-resolution: 192dpi***REMOVED***,' + 
          'only screen and (min-resolution: 2dppx***REMOVED***'
  ***REMOVED***,

      directives : {
        replace: function (el, path, trigger***REMOVED*** {
          // The trigger argument, if called within the directive, fires
          // an event named after the directive on the element, passing
          // any parameters along to the event that you pass to trigger.
          //
          // ex. trigger(***REMOVED***, trigger([a, b, c]***REMOVED***, or trigger(a, b, c***REMOVED***
          //
          // This allows you to bind a callback like so:
          // $('#interchangeContainer'***REMOVED***.on('replace', function (e, a, b, c***REMOVED*** {
          //   console.log($(this***REMOVED***.html(***REMOVED***, a, b, c***REMOVED***;
          // ***REMOVED******REMOVED***;

          if (/IMG/.test(el[0].nodeName***REMOVED******REMOVED*** {
            var orig_path = el[0].src;

            if (new RegExp(path, 'i'***REMOVED***.test(orig_path***REMOVED******REMOVED*** return;

            el[0].src = path;

            return trigger(el[0].src***REMOVED***;
      ***REMOVED***
          var last_path = el.data('interchange-last-path'***REMOVED***;

          if (last_path == path***REMOVED*** return;

          return $.get(path, function (response***REMOVED*** {
            el.html(response***REMOVED***;
            el.data('interchange-last-path', path***REMOVED***;
            trigger(***REMOVED***;
      ***REMOVED******REMOVED***;

    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    init : function (scope, method, options***REMOVED*** {
      Foundation.inherit(this, 'throttle'***REMOVED***;

      this.data_attr = 'data-' + this.settings.load_attr;

      this.bindings(method, options***REMOVED***;
      this.load('images'***REMOVED***;
      this.load('nodes'***REMOVED***;
***REMOVED***,

    events : function (***REMOVED*** {
      var self = this;

      $(window***REMOVED***
        .off('.interchange'***REMOVED***
        .on('resize.fndtn.interchange', self.throttle(function (***REMOVED*** {
          self.resize.call(self***REMOVED***;
    ***REMOVED***, 50***REMOVED******REMOVED***;

      return this;
***REMOVED***,

    resize : function (***REMOVED*** {
      var cache = this.cache;

      if(!this.images_loaded || !this.nodes_loaded***REMOVED*** {
        setTimeout($.proxy(this.resize, this***REMOVED***, 50***REMOVED***;
        return;
  ***REMOVED***

      for (var uuid in cache***REMOVED*** {
        if (cache.hasOwnProperty(uuid***REMOVED******REMOVED*** {
          var passed = this.results(uuid, cache[uuid]***REMOVED***;

          if (passed***REMOVED*** {
            this.settings.directives[passed
              .scenario[1]](passed.el, passed.scenario[0], function (***REMOVED*** {
                if (arguments[0] instanceof Array***REMOVED*** { 
                  var args = arguments[0];
            ***REMOVED*** else { 
                  var args = Array.prototype.slice.call(arguments, 0***REMOVED***;
            ***REMOVED***

                passed.el.trigger(passed.scenario[1], args***REMOVED***;
          ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

***REMOVED***,

    results : function (uuid, scenarios***REMOVED*** {
      var count = scenarios.length;

      if (count > 0***REMOVED*** {
        var el = this.S('[data-uuid="' + uuid + '"]'***REMOVED***;

        for (var i = count - 1; i >= 0; i--***REMOVED*** {
          var mq, rule = scenarios[i][2];
          if (this.settings.named_queries.hasOwnProperty(rule***REMOVED******REMOVED*** {
            mq = matchMedia(this.settings.named_queries[rule]***REMOVED***;
      ***REMOVED*** else {
            mq = matchMedia(rule***REMOVED***;
      ***REMOVED***
          if (mq.matches***REMOVED*** {
            return {el: el, scenario: scenarios[i]***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      return false;
***REMOVED***,

    load : function (type, force_update***REMOVED*** {
      if (typeof this['cached_' + type] === 'undefined' || force_update***REMOVED*** {
        this['update_' + type](***REMOVED***;
  ***REMOVED***

      return this['cached_' + type];
***REMOVED***,

    update_images : function (***REMOVED*** {
      var images = this.S('img[' + this.data_attr + ']'***REMOVED***,
          count = images.length,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cache = {***REMOVED***;
      this.cached_images = [];
      this.images_loaded = (count === 0***REMOVED***;

      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        loaded_count++;
        if (images[i]***REMOVED*** {
          var str = images[i].getAttribute(data_attr***REMOVED*** || '';

          if (str.length > 0***REMOVED*** {
            this.cached_images.push(images[i]***REMOVED***;
      ***REMOVED***
    ***REMOVED***

        if(loaded_count === count***REMOVED*** {
          this.images_loaded = true;
          this.enhance('images'***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return this;
***REMOVED***,

    update_nodes : function (***REMOVED*** {
      var nodes = this.S('[' + this.data_attr + ']:not(img***REMOVED***'***REMOVED***,
          count = nodes.length,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cached_nodes = [];
      // Set nodes_loaded to true if there are no nodes
      // this.nodes_loaded = false;
      this.nodes_loaded = (count === 0***REMOVED***;


      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        loaded_count++;
        var str = nodes[i].getAttribute(data_attr***REMOVED*** || '';

        if (str.length > 0***REMOVED*** {
          this.cached_nodes.push(nodes[i]***REMOVED***;
    ***REMOVED***

        if(loaded_count === count***REMOVED*** {
          this.nodes_loaded = true;
          this.enhance('nodes'***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return this;
***REMOVED***,

    enhance : function (type***REMOVED*** {
      var count = this['cached_' + type].length;

      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        this.object($(this['cached_' + type][i]***REMOVED******REMOVED***;
  ***REMOVED***

      return $(window***REMOVED***.trigger('resize'***REMOVED***;
***REMOVED***,

    parse_params : function (path, directive, mq***REMOVED*** {
      return [this.trim(path***REMOVED***, this.convert_directive(directive***REMOVED***, this.trim(mq***REMOVED***];
***REMOVED***,

    convert_directive : function (directive***REMOVED*** {
      var trimmed = this.trim(directive***REMOVED***;

      if (trimmed.length > 0***REMOVED*** {
        return trimmed;
  ***REMOVED***

      return 'replace';
***REMOVED***,

    object : function(el***REMOVED*** {
      var raw_arr = this.parse_data_attr(el***REMOVED***,
          scenarios = [], count = raw_arr.length;

      if (count > 0***REMOVED*** {
        for (var i = count - 1; i >= 0; i--***REMOVED*** {
          var split = raw_arr[i].split(/\((.*?***REMOVED***(\***REMOVED******REMOVED***$/***REMOVED***;

          if (split.length > 1***REMOVED*** {
            var cached_split = split[0].split(','***REMOVED***,
                params = this.parse_params(cached_split[0],
                  cached_split[1], split[1]***REMOVED***;

            scenarios.push(params***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      return this.store(el, scenarios***REMOVED***;
***REMOVED***,

    uuid : function (separator***REMOVED*** {
      var delim = separator || "-";

      function S4(***REMOVED*** {
        return (((1 + Math.random(***REMOVED******REMOVED*** * 0x10000***REMOVED*** | 0***REMOVED***.toString(16***REMOVED***.substring(1***REMOVED***;
  ***REMOVED***

      return (S4(***REMOVED*** + S4(***REMOVED*** + delim + S4(***REMOVED*** + delim + S4(***REMOVED***
        + delim + S4(***REMOVED*** + delim + S4(***REMOVED*** + S4(***REMOVED*** + S4(***REMOVED******REMOVED***;
***REMOVED***,

    store : function (el, scenarios***REMOVED*** {
      var uuid = this.uuid(***REMOVED***,
          current_uuid = el.data('uuid'***REMOVED***;

      if (current_uuid***REMOVED*** return this.cache[current_uuid];

      el.attr('data-uuid', uuid***REMOVED***;

      return this.cache[uuid] = scenarios;
***REMOVED***,

    trim : function(str***REMOVED*** {
      if (typeof str === 'string'***REMOVED*** {
        return $.trim(str***REMOVED***;
  ***REMOVED***

      return str;
***REMOVED***,

    parse_data_attr : function (el***REMOVED*** {
      var raw = el.data(this.settings.load_attr***REMOVED***.split(/\[(.*?***REMOVED***\]/***REMOVED***,
          count = raw.length, output = [];

      for (var i = count - 1; i >= 0; i--***REMOVED*** {
        if (raw[i].replace(/[\W\d]+/, ''***REMOVED***.length > 4***REMOVED*** {
          output.push(raw[i]***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return output;
***REMOVED***,

    reflow : function (***REMOVED*** {
      this.load('images', true***REMOVED***;
      this.load('nodes', true***REMOVED***;
***REMOVED***

  ***REMOVED***;

***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
