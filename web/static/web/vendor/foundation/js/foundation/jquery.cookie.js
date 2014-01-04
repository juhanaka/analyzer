/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory***REMOVED*** {
  if (typeof define === 'function' && define.amd***REMOVED*** {
    // AMD. Register as anonymous module.
    define(['jquery'], factory***REMOVED***;
  ***REMOVED*** else {
    // Browser globals.
    factory(jQuery***REMOVED***;
  ***REMOVED***
***REMOVED***(function ($***REMOVED*** {

  var pluses = /\+/g;

  function decode(s***REMOVED*** {
    if (config.raw***REMOVED*** {
      return s;
***REMOVED***
    try {
      // If we can't decode the cookie, ignore it, it's unusable.
      return decodeURIComponent(s.replace(pluses, ' '***REMOVED******REMOVED***;
***REMOVED*** catch(e***REMOVED*** {***REMOVED***
  ***REMOVED***

  function decodeAndParse(s***REMOVED*** {
    if (s.indexOf('"'***REMOVED*** === 0***REMOVED*** {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1***REMOVED***.replace(/\\"/g, '"'***REMOVED***.replace(/\\\\/g, '\\'***REMOVED***;
***REMOVED***

    s = decode(s***REMOVED***;

    try {
      // If we can't parse the cookie, ignore it, it's unusable.
      return config.json ? JSON.parse(s***REMOVED*** : s;
***REMOVED*** catch(e***REMOVED*** {***REMOVED***
  ***REMOVED***

  var config = $.cookie = function (key, value, options***REMOVED*** {

    // Write
    if (value !== undefined***REMOVED*** {
      options = $.extend({***REMOVED***, config.defaults, options***REMOVED***;

      if (typeof options.expires === 'number'***REMOVED*** {
        var days = options.expires, t = options.expires = new Date(***REMOVED***;
        t.setDate(t.getDate(***REMOVED*** + days***REMOVED***;
  ***REMOVED***

      value = config.json ? JSON.stringify(value***REMOVED*** : String(value***REMOVED***;

      return (document.cookie = [
        config.raw ? key : encodeURIComponent(key***REMOVED***,
        '=',
        config.raw ? value : encodeURIComponent(value***REMOVED***,
        options.expires ? '; expires=' + options.expires.toUTCString(***REMOVED*** : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''***REMOVED******REMOVED***;
***REMOVED***

    // Read

    var result = key ? undefined : {***REMOVED***;

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie(***REMOVED***.
    var cookies = document.cookie ? document.cookie.split('; '***REMOVED*** : [];

    for (var i = 0, l = cookies.length; i < l; i++***REMOVED*** {
      var parts = cookies[i].split('='***REMOVED***;
      var name = decode(parts.shift(***REMOVED******REMOVED***;
      var cookie = parts.join('='***REMOVED***;

      if (key && key === name***REMOVED*** {
        result = decodeAndParse(cookie***REMOVED***;
        break;
  ***REMOVED***

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = decodeAndParse(cookie***REMOVED******REMOVED*** !== undefined***REMOVED*** {
        result[name] = cookie;
  ***REMOVED***
***REMOVED***

    return result;
  ***REMOVED***;

  config.defaults = {***REMOVED***;

  $.removeCookie = function (key, options***REMOVED*** {
    if ($.cookie(key***REMOVED*** !== undefined***REMOVED*** {
      // Must not alter options, thus extending a fresh object...
      $.cookie(key, '', $.extend({***REMOVED***, options, { expires: -1 ***REMOVED******REMOVED******REMOVED***;
      return true;
***REMOVED***
    return false;
  ***REMOVED***;

***REMOVED******REMOVED******REMOVED***;
