/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($, window, document, undefined***REMOVED*** {
  'use strict';

  // Used to retrieve Foundation media queries from CSS.
  if($('head'***REMOVED***.has('.foundation-mq-small'***REMOVED***.length === 0***REMOVED*** {
    $('head'***REMOVED***.append('<meta class="foundation-mq-small">'***REMOVED***;
  ***REMOVED***

  if($('head'***REMOVED***.has('.foundation-mq-medium'***REMOVED***.length === 0***REMOVED*** {
    $('head'***REMOVED***.append('<meta class="foundation-mq-medium">'***REMOVED***;
  ***REMOVED***

  if($('head'***REMOVED***.has('.foundation-mq-large'***REMOVED***.length === 0***REMOVED*** {
    $('head'***REMOVED***.append('<meta class="foundation-mq-large">'***REMOVED***;
  ***REMOVED***

  if($('head'***REMOVED***.has('.foundation-mq-xlarge'***REMOVED***.length === 0***REMOVED*** {
    $('head'***REMOVED***.append('<meta class="foundation-mq-xlarge">'***REMOVED***;
  ***REMOVED***

  if($('head'***REMOVED***.has('.foundation-mq-xxlarge'***REMOVED***.length === 0***REMOVED*** {
    $('head'***REMOVED***.append('<meta class="foundation-mq-xxlarge">'***REMOVED***;
  ***REMOVED***

  // Embed FastClick (this should be removed later***REMOVED***
  function FastClick(layer***REMOVED***{'use strict';var oldOnClick,self=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=layer;if(!layer||!layer.nodeType***REMOVED***{throw new TypeError('Layer must be a document node'***REMOVED***;***REMOVED***this.onClick=function(***REMOVED***{return FastClick.prototype.onClick.apply(self,arguments***REMOVED******REMOVED***;this.onMouse=function(***REMOVED***{return FastClick.prototype.onMouse.apply(self,arguments***REMOVED******REMOVED***;this.onTouchStart=function(***REMOVED***{return FastClick.prototype.onTouchStart.apply(self,arguments***REMOVED******REMOVED***;this.onTouchMove=function(***REMOVED***{return FastClick.prototype.onTouchMove.apply(self,arguments***REMOVED******REMOVED***;this.onTouchEnd=function(***REMOVED***{return FastClick.prototype.onTouchEnd.apply(self,arguments***REMOVED******REMOVED***;this.onTouchCancel=function(***REMOVED***{return FastClick.prototype.onTouchCancel.apply(self,arguments***REMOVED******REMOVED***;if(FastClick.notNeeded(layer***REMOVED******REMOVED***{return***REMOVED***if(this.deviceIsAndroid***REMOVED***{layer.addEventListener('mouseover',this.onMouse,true***REMOVED***;layer.addEventListener('mousedown',this.onMouse,true***REMOVED***;layer.addEventListener('mouseup',this.onMouse,true***REMOVED******REMOVED***layer.addEventListener('click',this.onClick,true***REMOVED***;layer.addEventListener('touchstart',this.onTouchStart,false***REMOVED***;layer.addEventListener('touchmove',this.onTouchMove,false***REMOVED***;layer.addEventListener('touchend',this.onTouchEnd,false***REMOVED***;layer.addEventListener('touchcancel',this.onTouchCancel,false***REMOVED***;if(!Event.prototype.stopImmediatePropagation***REMOVED***{layer.removeEventListener=function(type,callback,capture***REMOVED***{var rmv=Node.prototype.removeEventListener;if(type==='click'***REMOVED***{rmv.call(layer,type,callback.hijacked||callback,capture***REMOVED******REMOVED***else{rmv.call(layer,type,callback,capture***REMOVED******REMOVED******REMOVED***;layer.addEventListener=function(type,callback,capture***REMOVED***{var adv=Node.prototype.addEventListener;if(type==='click'***REMOVED***{adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event***REMOVED***{if(!event.propagationStopped***REMOVED***{callback(event***REMOVED******REMOVED******REMOVED******REMOVED***,capture***REMOVED******REMOVED***else{adv.call(layer,type,callback,capture***REMOVED******REMOVED******REMOVED******REMOVED***if(typeof layer.onclick==='function'***REMOVED***{oldOnClick=layer.onclick;layer.addEventListener('click',function(event***REMOVED***{oldOnClick(event***REMOVED******REMOVED***,false***REMOVED***;layer.onclick=null***REMOVED******REMOVED***FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf('Android'***REMOVED***>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od***REMOVED***/.test(navigator.userAgent***REMOVED***;FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&(/OS 4_\d(_\d***REMOVED***?/***REMOVED***.test(navigator.userAgent***REMOVED***;FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2***REMOVED******REMOVED***_\d/***REMOVED***.test(navigator.userAgent***REMOVED***;FastClick.prototype.needsClick=function(target***REMOVED***{'use strict';switch(target.nodeName.toLowerCase(***REMOVED******REMOVED***{case'button':case'select':case'textarea':if(target.disabled***REMOVED***{return true***REMOVED***break;case'input':if((this.deviceIsIOS&&target.type==='file'***REMOVED***||target.disabled***REMOVED***{return true***REMOVED***break;case'label':case'video':return true***REMOVED***return(/\bneedsclick\b/***REMOVED***.test(target.className***REMOVED******REMOVED***;FastClick.prototype.needsFocus=function(target***REMOVED***{'use strict';switch(target.nodeName.toLowerCase(***REMOVED******REMOVED***{case'textarea':case'select':return true;case'input':switch(target.type***REMOVED***{case'button':case'checkbox':case'file':case'image':case'radio':case'submit':return false***REMOVED***return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/***REMOVED***.test(target.className***REMOVED******REMOVED******REMOVED***;FastClick.prototype.sendClick=function(targetElement,event***REMOVED***{'use strict';var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement***REMOVED***{document.activeElement.blur(***REMOVED******REMOVED***touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents'***REMOVED***;clickEvent.initMouseEvent('click',true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null***REMOVED***;clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent***REMOVED******REMOVED***;FastClick.prototype.focus=function(targetElement***REMOVED***{'use strict';var length;if(this.deviceIsIOS&&targetElement.setSelectionRange***REMOVED***{length=targetElement.value.length;targetElement.setSelectionRange(length,length***REMOVED******REMOVED***else{targetElement.focus(***REMOVED******REMOVED******REMOVED***;FastClick.prototype.updateScrollParent=function(targetElement***REMOVED***{'use strict';var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement***REMOVED******REMOVED***{parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight***REMOVED***{scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break***REMOVED***parentElement=parentElement.parentElement***REMOVED***while(parentElement***REMOVED******REMOVED***if(scrollParent***REMOVED***{scrollParent.fastClickLastScrollTop=scrollParent.scrollTop***REMOVED******REMOVED***;FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget***REMOVED***{'use strict';if(eventTarget.nodeType===Node.TEXT_NODE***REMOVED***{return eventTarget.parentNode***REMOVED***return eventTarget***REMOVED***;FastClick.prototype.onTouchStart=function(event***REMOVED***{'use strict';var targetElement,touch,selection;if(event.targetTouches.length>1***REMOVED***{return true***REMOVED***targetElement=this.getTargetElementFromEventTarget(event.target***REMOVED***;touch=event.targetTouches[0];if(this.deviceIsIOS***REMOVED***{selection=window.getSelection(***REMOVED***;if(selection.rangeCount&&!selection.isCollapsed***REMOVED***{return true***REMOVED***if(!this.deviceIsIOS4***REMOVED***{if(touch.identifier===this.lastTouchIdentifier***REMOVED***{event.preventDefault(***REMOVED***;return false***REMOVED***this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement***REMOVED******REMOVED******REMOVED***this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime***REMOVED***<200***REMOVED***{event.preventDefault(***REMOVED******REMOVED***return true***REMOVED***;FastClick.prototype.touchHasMoved=function(event***REMOVED***{'use strict';var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX***REMOVED***>boundary||Math.abs(touch.pageY-this.touchStartY***REMOVED***>boundary***REMOVED***{return true***REMOVED***return false***REMOVED***;FastClick.prototype.onTouchMove=function(event***REMOVED***{'use strict';if(!this.trackingClick***REMOVED***{return true***REMOVED***if(this.targetElement!==this.getTargetElementFromEventTarget(event.target***REMOVED***||this.touchHasMoved(event***REMOVED******REMOVED***{this.trackingClick=false;this.targetElement=null***REMOVED***return true***REMOVED***;FastClick.prototype.findControl=function(labelElement***REMOVED***{'use strict';if(labelElement.control!==undefined***REMOVED***{return labelElement.control***REMOVED***if(labelElement.htmlFor***REMOVED***{return document.getElementById(labelElement.htmlFor***REMOVED******REMOVED***return labelElement.querySelector('button, input:not([type=hidden]***REMOVED***, keygen, meter, output, progress, select, textarea'***REMOVED******REMOVED***;FastClick.prototype.onTouchEnd=function(event***REMOVED***{'use strict';var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick***REMOVED***{return true***REMOVED***if((event.timeStamp-this.lastClickTime***REMOVED***<200***REMOVED***{this.cancelNextClick=true;return true***REMOVED***this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget***REMOVED***{touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset***REMOVED***||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent***REMOVED***targetTagName=targetElement.tagName.toLowerCase(***REMOVED***;if(targetTagName==='label'***REMOVED***{forElement=this.findControl(targetElement***REMOVED***;if(forElement***REMOVED***{this.focus(targetElement***REMOVED***;if(this.deviceIsAndroid***REMOVED***{return false***REMOVED***targetElement=forElement***REMOVED******REMOVED***else if(this.needsFocus(targetElement***REMOVED******REMOVED***{if((event.timeStamp-trackingClickStart***REMOVED***>100||(this.deviceIsIOS&&window.top!==window&&targetTagName==='input'***REMOVED******REMOVED***{this.targetElement=null;return false***REMOVED***this.focus(targetElement***REMOVED***;if(!this.deviceIsIOS4||targetTagName!=='select'***REMOVED***{this.targetElement=null;event.preventDefault(***REMOVED******REMOVED***return false***REMOVED***if(this.deviceIsIOS&&!this.deviceIsIOS4***REMOVED***{scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop***REMOVED***{return true***REMOVED******REMOVED***if(!this.needsClick(targetElement***REMOVED******REMOVED***{event.preventDefault(***REMOVED***;this.sendClick(targetElement,event***REMOVED******REMOVED***return false***REMOVED***;FastClick.prototype.onTouchCancel=function(***REMOVED***{'use strict';this.trackingClick=false;this.targetElement=null***REMOVED***;FastClick.prototype.onMouse=function(event***REMOVED***{'use strict';if(!this.targetElement***REMOVED***{return true***REMOVED***if(event.forwardedTouchEvent***REMOVED***{return true***REMOVED***if(!event.cancelable***REMOVED***{return true***REMOVED***if(!this.needsClick(this.targetElement***REMOVED***||this.cancelNextClick***REMOVED***{if(event.stopImmediatePropagation***REMOVED***{event.stopImmediatePropagation(***REMOVED******REMOVED***else{event.propagationStopped=true***REMOVED***event.stopPropagation(***REMOVED***;event.preventDefault(***REMOVED***;return false***REMOVED***return true***REMOVED***;FastClick.prototype.onClick=function(event***REMOVED***{'use strict';var permitted;if(this.trackingClick***REMOVED***{this.targetElement=null;this.trackingClick=false;return true***REMOVED***if(event.target.type==='submit'&&event.detail===0***REMOVED***{return true***REMOVED***permitted=this.onMouse(event***REMOVED***;if(!permitted***REMOVED***{this.targetElement=null***REMOVED***return permitted***REMOVED***;FastClick.prototype.destroy=function(***REMOVED***{'use strict';var layer=this.layer;if(this.deviceIsAndroid***REMOVED***{layer.removeEventListener('mouseover',this.onMouse,true***REMOVED***;layer.removeEventListener('mousedown',this.onMouse,true***REMOVED***;layer.removeEventListener('mouseup',this.onMouse,true***REMOVED******REMOVED***layer.removeEventListener('click',this.onClick,true***REMOVED***;layer.removeEventListener('touchstart',this.onTouchStart,false***REMOVED***;layer.removeEventListener('touchmove',this.onTouchMove,false***REMOVED***;layer.removeEventListener('touchend',this.onTouchEnd,false***REMOVED***;layer.removeEventListener('touchcancel',this.onTouchCancel,false***REMOVED******REMOVED***;FastClick.notNeeded=function(layer***REMOVED***{'use strict';var metaViewport;if(typeof window.ontouchstart==='undefined'***REMOVED***{return true***REMOVED***if((/Chrome\/[0-9]+/***REMOVED***.test(navigator.userAgent***REMOVED******REMOVED***{if(FastClick.prototype.deviceIsAndroid***REMOVED***{metaViewport=document.querySelector('meta[name=viewport]'***REMOVED***;if(metaViewport&&metaViewport.content.indexOf('user-scalable=no'***REMOVED***!==-1***REMOVED***{return true***REMOVED******REMOVED***else{return true***REMOVED******REMOVED***if(layer.style.msTouchAction==='none'***REMOVED***{return true***REMOVED***return false***REMOVED***;FastClick.attach=function(layer***REMOVED***{'use strict';return new FastClick(layer***REMOVED******REMOVED***;if(typeof define!=='undefined'&&define.amd***REMOVED***{define(function(***REMOVED***{'use strict';return FastClick***REMOVED******REMOVED******REMOVED***else if(typeof module!=='undefined'&&module.exports***REMOVED***{module.exports=FastClick.attach;module.exports.FastClick=FastClick***REMOVED***else{window.FastClick=FastClick***REMOVED***


  // Enable FastClick
  if(typeof FastClick !== 'undefined'***REMOVED*** {
    FastClick.attach(document.body***REMOVED***;
  ***REMOVED***

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context***REMOVED*** {
    if (typeof selector === 'string'***REMOVED*** {
      if (context***REMOVED*** {
        return $(context.querySelectorAll(selector***REMOVED******REMOVED***;
  ***REMOVED***

      return $(document.querySelectorAll(selector***REMOVED******REMOVED***;
***REMOVED***

    return $(selector, context***REMOVED***;
  ***REMOVED***;

  /*
    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc, undefined ***REMOVED*** {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ***REMOVED***,
        div = doc.createElement( "div" ***REMOVED***;

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div***REMOVED***;

    return function(q***REMOVED***{

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; ***REMOVED***</style>";

      docElem.insertBefore( fakeBody, refNode ***REMOVED***;
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody ***REMOVED***;

      return {
        matches: bool,
        media: q
  ***REMOVED***;

***REMOVED***;

  ***REMOVED***( document ***REMOVED******REMOVED***;

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c***REMOVED*** 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function( $ ***REMOVED*** {

  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating


  var animating,
    lastTime = 0,
    vendors = ['webkit', 'moz'],
    requestAnimationFrame = window.requestAnimationFrame,
    cancelAnimationFrame = window.cancelAnimationFrame;

  for(; lastTime < vendors.length && !requestAnimationFrame; lastTime++***REMOVED*** {
    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + "CancelAnimationFrame" ] || 
      window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
  ***REMOVED***

  function raf(***REMOVED*** {
    if ( animating ***REMOVED*** {
      requestAnimationFrame( raf ***REMOVED***;
      jQuery.fx.tick(***REMOVED***;
***REMOVED***
  ***REMOVED***

  if ( requestAnimationFrame ***REMOVED*** {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    jQuery.fx.timer = function( timer ***REMOVED*** {
      if ( timer(***REMOVED*** && jQuery.timers.push( timer ***REMOVED*** && !animating ***REMOVED*** {
        animating = true;
        raf(***REMOVED***;
  ***REMOVED***
***REMOVED***;

    jQuery.fx.stop = function(***REMOVED*** {
      animating = false;
***REMOVED***;
  ***REMOVED*** else {
    // polyfill
    window.requestAnimationFrame = function( callback, element ***REMOVED*** {
      var currTime = new Date(***REMOVED***.getTime(***REMOVED***,
        timeToCall = Math.max( 0, 16 - ( currTime - lastTime ***REMOVED*** ***REMOVED***,
        id = window.setTimeout( function(***REMOVED*** {
          callback( currTime + timeToCall ***REMOVED***;
    ***REMOVED***, timeToCall ***REMOVED***;
      lastTime = currTime + timeToCall;
      return id;
***REMOVED***;

    window.cancelAnimationFrame = function(id***REMOVED*** {
      clearTimeout(id***REMOVED***;
***REMOVED***;
      
  ***REMOVED***

  ***REMOVED***( jQuery ***REMOVED******REMOVED***;


  function removeQuotes (string***REMOVED*** {
    if (typeof string === 'string' || string instanceof String***REMOVED*** {
      string = string.replace(/^[\\/'"]+|(;\s?***REMOVED******REMOVED***+|[\\/'"]+$/g, ''***REMOVED***;
***REMOVED***

    return string;
  ***REMOVED***

  window.Foundation = {
    name : 'Foundation',

    version : '5.0.0',

    media_queries : {
      small : S('.foundation-mq-small'***REMOVED***.css('font-family'***REMOVED***.replace(/^[\/\\'"]+|(;\s?***REMOVED******REMOVED***+|[\/\\'"]+$/g, ''***REMOVED***,
      medium : S('.foundation-mq-medium'***REMOVED***.css('font-family'***REMOVED***.replace(/^[\/\\'"]+|(;\s?***REMOVED******REMOVED***+|[\/\\'"]+$/g, ''***REMOVED***,
      large : S('.foundation-mq-large'***REMOVED***.css('font-family'***REMOVED***.replace(/^[\/\\'"]+|(;\s?***REMOVED******REMOVED***+|[\/\\'"]+$/g, ''***REMOVED***,
      xlarge: S('.foundation-mq-xlarge'***REMOVED***.css('font-family'***REMOVED***.replace(/^[\/\\'"]+|(;\s?***REMOVED******REMOVED***+|[\/\\'"]+$/g, ''***REMOVED***,
      xxlarge: S('.foundation-mq-xxlarge'***REMOVED***.css('font-family'***REMOVED***.replace(/^[\/\\'"]+|(;\s?***REMOVED******REMOVED***+|[\/\\'"]+$/g, ''***REMOVED***
***REMOVED***,

    stylesheet : $('<style></style>'***REMOVED***.appendTo('head'***REMOVED***[0].sheet,

    init : function (scope, libraries, method, options, response***REMOVED*** {
      var library_arr,
          args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html'***REMOVED***.attr('dir'***REMOVED******REMOVED***;

      // set foundation global scope
      this.scope = scope || this.scope;

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries***REMOVED******REMOVED*** {
        if (this.libs.hasOwnProperty(libraries***REMOVED******REMOVED*** {
          responses.push(this.init_lib(libraries, args***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED*** else {
        for (var lib in this.libs***REMOVED*** {
          responses.push(this.init_lib(lib, libraries***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return scope;
***REMOVED***,

    init_lib : function (lib, args***REMOVED*** {
      if (this.libs.hasOwnProperty(lib***REMOVED******REMOVED*** {
        this.patch(this.libs[lib]***REMOVED***;

        if (args && args.hasOwnProperty(lib***REMOVED******REMOVED*** {
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]***REMOVED***;
    ***REMOVED***

        return this.libs[lib].init.apply(this.libs[lib], args***REMOVED***;
  ***REMOVED***

      return function (***REMOVED*** {***REMOVED***;
***REMOVED***,

    patch : function (lib***REMOVED*** {
      lib.scope = this.scope;
      lib['data_options'] = this.lib_methods.data_options;
      lib['bindings'] = this.lib_methods.bindings;
      lib['S'] = S;
      lib.rtl = this.rtl;
***REMOVED***,

    inherit : function (scope, methods***REMOVED*** {
      var methods_arr = methods.split(' '***REMOVED***;

      for (var i = methods_arr.length - 1; i >= 0; i--***REMOVED*** {
        if (this.lib_methods.hasOwnProperty(methods_arr[i]***REMOVED******REMOVED*** {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
    ***REMOVED***
  ***REMOVED***
***REMOVED***,

    random_str : function (length***REMOVED*** {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''***REMOVED***;

      if (!length***REMOVED*** {
        length = Math.floor(Math.random(***REMOVED*** * chars.length***REMOVED***;
  ***REMOVED***

      var str = '';
      for (var i = 0; i < length; i++***REMOVED*** {
        str += chars[Math.floor(Math.random(***REMOVED*** * chars.length***REMOVED***];
  ***REMOVED***
      return str;
***REMOVED***,

    libs : {***REMOVED***,

    // methods that can be inherited in libraries
    lib_methods : {
      throttle : function(fun, delay***REMOVED*** {
        var timer = null;

        return function (***REMOVED*** {
          var context = this, args = arguments;

          clearTimeout(timer***REMOVED***;
          timer = setTimeout(function (***REMOVED*** {
            fun.apply(context, args***REMOVED***;
      ***REMOVED***, delay***REMOVED***;
    ***REMOVED***;
  ***REMOVED***,

      // parses data-options attribute
      data_options : function (el***REMOVED*** {
        var opts = {***REMOVED***, ii, p, opts_arr, opts_len,
            data_options = el.data('options'***REMOVED***;

        if (typeof data_options === 'object'***REMOVED*** {
          return data_options;
    ***REMOVED***

        opts_arr = (data_options || ':'***REMOVED***.split(';'***REMOVED***,
        opts_len = opts_arr.length;

        function isNumber (o***REMOVED*** {
          return ! isNaN (o-0***REMOVED*** && o !== null && o !== "" && o !== false && o !== true;
    ***REMOVED***

        function trim(str***REMOVED*** {
          if (typeof str === 'string'***REMOVED*** return $.trim(str***REMOVED***;
          return str;
    ***REMOVED***

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--***REMOVED*** {
          p = opts_arr[ii].split(':'***REMOVED***;

          if (/true/i.test(p[1]***REMOVED******REMOVED*** p[1] = true;
          if (/false/i.test(p[1]***REMOVED******REMOVED*** p[1] = false;
          if (isNumber(p[1]***REMOVED******REMOVED*** p[1] = parseInt(p[1], 10***REMOVED***;

          if (p.length === 2 && p[0].length > 0***REMOVED*** {
            opts[trim(p[0]***REMOVED***] = trim(p[1]***REMOVED***;
      ***REMOVED***
    ***REMOVED***

        return opts;
  ***REMOVED***,

      delay : function (fun, delay***REMOVED*** {
        return setTimeout(fun, delay***REMOVED***;
  ***REMOVED***,

      // test for empty object or array
      empty : function (obj***REMOVED*** {
        if (obj.length && obj.length > 0***REMOVED***    return false;
        if (obj.length && obj.length === 0***REMOVED***  return true;

        for (var key in obj***REMOVED*** {
          if (hasOwnProperty.call(obj, key***REMOVED******REMOVED***    return false;
    ***REMOVED***

        return true;
  ***REMOVED***,

      register_media : function(media, media_class***REMOVED*** {
        if(Foundation.media_queries[media] === undefined***REMOVED*** {
          $('head'***REMOVED***.append('<meta class="' + media_class + '">'***REMOVED***;
          Foundation.media_queries[media] = removeQuotes($('.' + media_class***REMOVED***.css('font-family'***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***,

      addCustomRule : function(rule, media***REMOVED*** {
        if(media === undefined***REMOVED*** {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length***REMOVED***;
    ***REMOVED*** else {
          var query = Foundation.media_queries[media];
          if(query !== undefined***REMOVED*** {
            Foundation.stylesheet.insertRule('@media ' + 
              Foundation.media_queries[media] + '{ ' + rule + ' ***REMOVED***'***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***,

      loaded : function (image, callback***REMOVED*** {
        function loaded (***REMOVED*** {
          callback(image[0]***REMOVED***;
    ***REMOVED***

        function bindLoad (***REMOVED*** {
          this.one('load', loaded***REMOVED***;

          if (/MSIE (\d+\.\d+***REMOVED***;/.test(navigator.userAgent***REMOVED******REMOVED*** {
            var src = this.attr( 'src' ***REMOVED***,
                param = src.match( /\?/ ***REMOVED*** ? '&' : '?';

            param += 'random=' + (new Date(***REMOVED******REMOVED***.getTime(***REMOVED***;
            this.attr('src', src + param***REMOVED***;
      ***REMOVED***
    ***REMOVED***

        if (!image.attr('src'***REMOVED******REMOVED*** {
          loaded(***REMOVED***;
          return;
    ***REMOVED***

        if (image[0].complete || image[0].readyState === 4***REMOVED*** {
          loaded(***REMOVED***;
    ***REMOVED*** else {
          bindLoad.call(image***REMOVED***;
    ***REMOVED***
  ***REMOVED***,

      bindings : function (method, options***REMOVED*** {
        var self = this,
            should_bind_events = !S(this***REMOVED***.data(this.name + '-init'***REMOVED***;

        if (typeof method === 'string'***REMOVED*** {
          return this[method].call(this***REMOVED***;
    ***REMOVED***

        if (S(this.scope***REMOVED***.is('[data-' + this.name +']'***REMOVED******REMOVED*** {
          S(this.scope***REMOVED***.data(this.name + '-init', $.extend({***REMOVED***, this.settings, (options || method***REMOVED***, this.data_options(S(this.scope***REMOVED******REMOVED******REMOVED******REMOVED***;

          if (should_bind_events***REMOVED*** {
            this.events(this.scope***REMOVED***;
      ***REMOVED***

    ***REMOVED*** else {
          S('[data-' + this.name + ']', this.scope***REMOVED***.each(function (***REMOVED*** {
            var should_bind_events = !S(this***REMOVED***.data(self.name + '-init'***REMOVED***;

            S(this***REMOVED***.data(self.name + '-init', $.extend({***REMOVED***, self.settings, (options || method***REMOVED***, self.data_options(S(this***REMOVED******REMOVED******REMOVED******REMOVED***;

            if (should_bind_events***REMOVED*** {
              self.events(this***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***;

  $.fn.foundation = function (***REMOVED*** {
    var args = Array.prototype.slice.call(arguments, 0***REMOVED***;

    return this.each(function (***REMOVED*** {
      Foundation.init.apply(Foundation, [this].concat(args***REMOVED******REMOVED***;
      return this;
***REMOVED******REMOVED***;
  ***REMOVED***;

***REMOVED***(jQuery, this, this.document***REMOVED******REMOVED***;
