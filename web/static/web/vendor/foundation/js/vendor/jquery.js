/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ***REMOVED*** {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335***REMOVED***
// Support: Firefox 18+
//"use strict";
var
  // A central reference to the root jQuery(document***REMOVED***
  rootjQuery,

  // The deferred used on DOM ready
  readyList,

  // Support: IE9
  // For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
  core_strundefined = typeof undefined,

  // Use the correct document accordingly with window argument (sandbox***REMOVED***
  location = window.location,
  document = window.document,
  docElem = document.documentElement,

  // Map over jQuery in case of overwrite
  _jQuery = window.jQuery,

  // Map over the $ in case of overwrite
  _$ = window.$,

  // [[Class]] -> type pairs
  class2type = {***REMOVED***,

  // List of deleted data cache ids, so we can reuse them
  core_deletedIds = [],

  core_version = "2.0.3",

  // Save a reference to some core methods
  core_concat = core_deletedIds.concat,
  core_push = core_deletedIds.push,
  core_slice = core_deletedIds.slice,
  core_indexOf = core_deletedIds.indexOf,
  core_toString = class2type.toString,
  core_hasOwn = class2type.hasOwnProperty,
  core_trim = core_version.trim,

  // Define a local copy of jQuery
  jQuery = function( selector, context ***REMOVED*** {
    // The jQuery object is actually just the init constructor 'enhanced'
    return new jQuery.fn.init( selector, context, rootjQuery ***REMOVED***;
  ***REMOVED***,

  // Used for matching numbers
  core_pnum = /[+-]?(?:\d*\.|***REMOVED***\d+(?:[eE][+-]?\d+|***REMOVED***/.source,

  // Used for splitting on whitespace
  core_rnotwhite = /\S+/g,

  // A simple way to check for HTML strings
  // Prioritize #id over <tag> to avoid XSS via location.hash (#9521***REMOVED***
  // Strict HTML recognition (#11290: must start with <***REMOVED***
  rquickExpr = /^(?:\s*(<[\w\W]+>***REMOVED***[^>]*|#([\w-]****REMOVED******REMOVED***$/,

  // Match a standalone tag
  rsingleTag = /^<(\w+***REMOVED***\s*\/?>(?:<\/\1>|***REMOVED***$/,

  // Matches dashed string for camelizing
  rmsPrefix = /^-ms-/,
  rdashAlpha = /-([\da-z]***REMOVED***/gi,

  // Used by jQuery.camelCase as callback to replace(***REMOVED***
  fcamelCase = function( all, letter ***REMOVED*** {
    return letter.toUpperCase(***REMOVED***;
  ***REMOVED***,

  // The ready event handler and self cleanup method
  completed = function(***REMOVED*** {
    document.removeEventListener( "DOMContentLoaded", completed, false ***REMOVED***;
    window.removeEventListener( "load", completed, false ***REMOVED***;
    jQuery.ready(***REMOVED***;
  ***REMOVED***;

jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: core_version,

  constructor: jQuery,
  init: function( selector, context, rootjQuery ***REMOVED*** {
    var match, elem;

    // HANDLE: $(""***REMOVED***, $(null***REMOVED***, $(undefined***REMOVED***, $(false***REMOVED***
    if ( !selector ***REMOVED*** {
      return this;
***REMOVED***

    // Handle HTML strings
    if ( typeof selector === "string" ***REMOVED*** {
      if ( selector.charAt(0***REMOVED*** === "<" && selector.charAt( selector.length - 1 ***REMOVED*** === ">" && selector.length >= 3 ***REMOVED*** {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [ null, selector, null ];

  ***REMOVED*** else {
        match = rquickExpr.exec( selector ***REMOVED***;
  ***REMOVED***

      // Match html or make sure no context is specified for #id
      if ( match && (match[1] || !context***REMOVED*** ***REMOVED*** {

        // HANDLE: $(html***REMOVED*** -> $(array***REMOVED***
        if ( match[1] ***REMOVED*** {
          context = context instanceof jQuery ? context[0] : context;

          // scripts is true for back-compat
          jQuery.merge( this, jQuery.parseHTML(
            match[1],
            context && context.nodeType ? context.ownerDocument || context : document,
            true
          ***REMOVED*** ***REMOVED***;

          // HANDLE: $(html, props***REMOVED***
          if ( rsingleTag.test( match[1] ***REMOVED*** && jQuery.isPlainObject( context ***REMOVED*** ***REMOVED*** {
            for ( match in context ***REMOVED*** {
              // Properties of context are called as methods if possible
              if ( jQuery.isFunction( this[ match ] ***REMOVED*** ***REMOVED*** {
                this[ match ]( context[ match ] ***REMOVED***;

              // ...and otherwise set as attributes
          ***REMOVED*** else {
                this.attr( match, context[ match ] ***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

          return this;

        // HANDLE: $(#id***REMOVED***
    ***REMOVED*** else {
          elem = document.getElementById( match[2] ***REMOVED***;

          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ***REMOVED*** {
            // Inject the element directly into the jQuery object
            this.length = 1;
            this[0] = elem;
      ***REMOVED***

          this.context = document;
          this.selector = selector;
          return this;
    ***REMOVED***

      // HANDLE: $(expr, $(...***REMOVED******REMOVED***
  ***REMOVED*** else if ( !context || context.jquery ***REMOVED*** {
        return ( context || rootjQuery ***REMOVED***.find( selector ***REMOVED***;

      // HANDLE: $(expr, context***REMOVED***
      // (which is just equivalent to: $(context***REMOVED***.find(expr***REMOVED***
  ***REMOVED*** else {
        return this.constructor( context ***REMOVED***.find( selector ***REMOVED***;
  ***REMOVED***

    // HANDLE: $(DOMElement***REMOVED***
***REMOVED*** else if ( selector.nodeType ***REMOVED*** {
      this.context = this[0] = selector;
      this.length = 1;
      return this;

    // HANDLE: $(function***REMOVED***
    // Shortcut for document ready
***REMOVED*** else if ( jQuery.isFunction( selector ***REMOVED*** ***REMOVED*** {
      return rootjQuery.ready( selector ***REMOVED***;
***REMOVED***

    if ( selector.selector !== undefined ***REMOVED*** {
      this.selector = selector.selector;
      this.context = selector.context;
***REMOVED***

    return jQuery.makeArray( selector, this ***REMOVED***;
  ***REMOVED***,

  // Start with an empty selector
  selector: "",

  // The default length of a jQuery object is 0
  length: 0,

  toArray: function(***REMOVED*** {
    return core_slice.call( this ***REMOVED***;
  ***REMOVED***,

  // Get the Nth element in the matched element set OR
  // Get the whole matched element set as a clean array
  get: function( num ***REMOVED*** {
    return num == null ?

      // Return a 'clean' array
      this.toArray(***REMOVED*** :

      // Return just the object
      ( num < 0 ? this[ this.length + num ] : this[ num ] ***REMOVED***;
  ***REMOVED***,

  // Take an array of elements and push it onto the stack
  // (returning the new matched element set***REMOVED***
  pushStack: function( elems ***REMOVED*** {

    // Build a new jQuery matched element set
    var ret = jQuery.merge( this.constructor(***REMOVED***, elems ***REMOVED***;

    // Add the old object onto the stack (as a reference***REMOVED***
    ret.prevObject = this;
    ret.context = this.context;

    // Return the newly-formed element set
    return ret;
  ***REMOVED***,

  // Execute a callback for every element in the matched set.
  // (You can seed the arguments with an array of args, but this is
  // only used internally.***REMOVED***
  each: function( callback, args ***REMOVED*** {
    return jQuery.each( this, callback, args ***REMOVED***;
  ***REMOVED***,

  ready: function( fn ***REMOVED*** {
    // Add the callback
    jQuery.ready.promise(***REMOVED***.done( fn ***REMOVED***;

    return this;
  ***REMOVED***,

  slice: function(***REMOVED*** {
    return this.pushStack( core_slice.apply( this, arguments ***REMOVED*** ***REMOVED***;
  ***REMOVED***,

  first: function(***REMOVED*** {
    return this.eq( 0 ***REMOVED***;
  ***REMOVED***,

  last: function(***REMOVED*** {
    return this.eq( -1 ***REMOVED***;
  ***REMOVED***,

  eq: function( i ***REMOVED*** {
    var len = this.length,
      j = +i + ( i < 0 ? len : 0 ***REMOVED***;
    return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] ***REMOVED***;
  ***REMOVED***,

  map: function( callback ***REMOVED*** {
    return this.pushStack( jQuery.map(this, function( elem, i ***REMOVED*** {
      return callback.call( elem, i, elem ***REMOVED***;
***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***,

  end: function(***REMOVED*** {
    return this.prevObject || this.constructor(null***REMOVED***;
  ***REMOVED***,

  // For internal use only.
  // Behaves like an Array's method, not like a jQuery method.
  push: core_push,
  sort: [].sort,
  splice: [].splice
***REMOVED***;

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function(***REMOVED*** {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {***REMOVED***,
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if ( typeof target === "boolean" ***REMOVED*** {
    deep = target;
    target = arguments[1] || {***REMOVED***;
    // skip the boolean and the target
    i = 2;
  ***REMOVED***

  // Handle case when target is a string or something (possible in deep copy***REMOVED***
  if ( typeof target !== "object" && !jQuery.isFunction(target***REMOVED*** ***REMOVED*** {
    target = {***REMOVED***;
  ***REMOVED***

  // extend jQuery itself if only one argument is passed
  if ( length === i ***REMOVED*** {
    target = this;
    --i;
  ***REMOVED***

  for ( ; i < length; i++ ***REMOVED*** {
    // Only deal with non-null/undefined values
    if ( (options = arguments[ i ]***REMOVED*** != null ***REMOVED*** {
      // Extend the base object
      for ( name in options ***REMOVED*** {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ***REMOVED*** {
          continue;
    ***REMOVED***

        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( jQuery.isPlainObject(copy***REMOVED*** || (copyIsArray = jQuery.isArray(copy***REMOVED******REMOVED*** ***REMOVED*** ***REMOVED*** {
          if ( copyIsArray ***REMOVED*** {
            copyIsArray = false;
            clone = src && jQuery.isArray(src***REMOVED*** ? src : [];

      ***REMOVED*** else {
            clone = src && jQuery.isPlainObject(src***REMOVED*** ? src : {***REMOVED***;
      ***REMOVED***

          // Never move original objects, clone them
          target[ name ] = jQuery.extend( deep, clone, copy ***REMOVED***;

        // Don't bring in undefined values
    ***REMOVED*** else if ( copy !== undefined ***REMOVED*** {
          target[ name ] = copy;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // Return the modified object
  return target;
***REMOVED***;

jQuery.extend({
  // Unique for each copy of jQuery on the page
  expando: "jQuery" + ( core_version + Math.random(***REMOVED*** ***REMOVED***.replace( /\D/g, "" ***REMOVED***,

  noConflict: function( deep ***REMOVED*** {
    if ( window.$ === jQuery ***REMOVED*** {
      window.$ = _$;
***REMOVED***

    if ( deep && window.jQuery === jQuery ***REMOVED*** {
      window.jQuery = _jQuery;
***REMOVED***

    return jQuery;
  ***REMOVED***,

  // Is the DOM ready to be used? Set to true once it occurs.
  isReady: false,

  // A counter to track how many items to wait for before
  // the ready event fires. See #6781
  readyWait: 1,

  // Hold (or release***REMOVED*** the ready event
  holdReady: function( hold ***REMOVED*** {
    if ( hold ***REMOVED*** {
      jQuery.readyWait++;
***REMOVED*** else {
      jQuery.ready( true ***REMOVED***;
***REMOVED***
  ***REMOVED***,

  // Handle when the DOM is ready
  ready: function( wait ***REMOVED*** {

    // Abort if there are pending holds or we're already ready
    if ( wait === true ? --jQuery.readyWait : jQuery.isReady ***REMOVED*** {
      return;
***REMOVED***

    // Remember that the DOM is ready
    jQuery.isReady = true;

    // If a normal DOM Ready event fired, decrement, and wait if need be
    if ( wait !== true && --jQuery.readyWait > 0 ***REMOVED*** {
      return;
***REMOVED***

    // If there are functions bound, to execute
    readyList.resolveWith( document, [ jQuery ] ***REMOVED***;

    // Trigger any bound ready events
    if ( jQuery.fn.trigger ***REMOVED*** {
      jQuery( document ***REMOVED***.trigger("ready"***REMOVED***.off("ready"***REMOVED***;
***REMOVED***
  ***REMOVED***,

  // See test/unit/core.js for details concerning isFunction.
  // Since version 1.3, DOM methods and functions like alert
  // aren't supported. They return false on IE (#2968***REMOVED***.
  isFunction: function( obj ***REMOVED*** {
    return jQuery.type(obj***REMOVED*** === "function";
  ***REMOVED***,

  isArray: Array.isArray,

  isWindow: function( obj ***REMOVED*** {
    return obj != null && obj === obj.window;
  ***REMOVED***,

  isNumeric: function( obj ***REMOVED*** {
    return !isNaN( parseFloat(obj***REMOVED*** ***REMOVED*** && isFinite( obj ***REMOVED***;
  ***REMOVED***,

  type: function( obj ***REMOVED*** {
    if ( obj == null ***REMOVED*** {
      return String( obj ***REMOVED***;
***REMOVED***
    // Support: Safari <= 5.1 (functionish RegExp***REMOVED***
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[ core_toString.call(obj***REMOVED*** ] || "object" :
      typeof obj;
  ***REMOVED***,

  isPlainObject: function( obj ***REMOVED*** {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if ( jQuery.type( obj ***REMOVED*** !== "object" || obj.nodeType || jQuery.isWindow( obj ***REMOVED*** ***REMOVED*** {
      return false;
***REMOVED***

    // Support: Firefox <20
    // The try/catch suppresses exceptions thrown when attempting to access
    // the "constructor" property of certain host objects, ie. |window.location|
    // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
    try {
      if ( obj.constructor &&
          !core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ***REMOVED*** ***REMOVED*** {
        return false;
  ***REMOVED***
***REMOVED*** catch ( e ***REMOVED*** {
      return false;
***REMOVED***

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {***REMOVED*** or constructed with new Object
    return true;
  ***REMOVED***,

  isEmptyObject: function( obj ***REMOVED*** {
    var name;
    for ( name in obj ***REMOVED*** {
      return false;
***REMOVED***
    return true;
  ***REMOVED***,

  error: function( msg ***REMOVED*** {
    throw new Error( msg ***REMOVED***;
  ***REMOVED***,

  // data: string of html
  // context (optional***REMOVED***: If specified, the fragment will be created in this context, defaults to document
  // keepScripts (optional***REMOVED***: If true, will include scripts passed in the html string
  parseHTML: function( data, context, keepScripts ***REMOVED*** {
    if ( !data || typeof data !== "string" ***REMOVED*** {
      return null;
***REMOVED***
    if ( typeof context === "boolean" ***REMOVED*** {
      keepScripts = context;
      context = false;
***REMOVED***
    context = context || document;

    var parsed = rsingleTag.exec( data ***REMOVED***,
      scripts = !keepScripts && [];

    // Single tag
    if ( parsed ***REMOVED*** {
      return [ context.createElement( parsed[1] ***REMOVED*** ];
***REMOVED***

    parsed = jQuery.buildFragment( [ data ], context, scripts ***REMOVED***;

    if ( scripts ***REMOVED*** {
      jQuery( scripts ***REMOVED***.remove(***REMOVED***;
***REMOVED***

    return jQuery.merge( [], parsed.childNodes ***REMOVED***;
  ***REMOVED***,

  parseJSON: JSON.parse,

  // Cross-browser xml parsing
  parseXML: function( data ***REMOVED*** {
    var xml, tmp;
    if ( !data || typeof data !== "string" ***REMOVED*** {
      return null;
***REMOVED***

    // Support: IE9
    try {
      tmp = new DOMParser(***REMOVED***;
      xml = tmp.parseFromString( data , "text/xml" ***REMOVED***;
***REMOVED*** catch ( e ***REMOVED*** {
      xml = undefined;
***REMOVED***

    if ( !xml || xml.getElementsByTagName( "parsererror" ***REMOVED***.length ***REMOVED*** {
      jQuery.error( "Invalid XML: " + data ***REMOVED***;
***REMOVED***
    return xml;
  ***REMOVED***,

  noop: function(***REMOVED*** {***REMOVED***,

  // Evaluates a script in a global context
  globalEval: function( code ***REMOVED*** {
    var script,
        indirect = eval;

    code = jQuery.trim( code ***REMOVED***;

    if ( code ***REMOVED*** {
      // If the code includes a valid, prologue position
      // strict mode pragma, execute code by injecting a
      // script tag into the document.
      if ( code.indexOf("use strict"***REMOVED*** === 1 ***REMOVED*** {
        script = document.createElement("script"***REMOVED***;
        script.text = code;
        document.head.appendChild( script ***REMOVED***.parentNode.removeChild( script ***REMOVED***;
  ***REMOVED*** else {
      // Otherwise, avoid the DOM node creation, insertion
      // and removal by using an indirect global eval
        indirect( code ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  // Convert dashed to camelCase; used by the css and data modules
  // Microsoft forgot to hump their vendor prefix (#9572***REMOVED***
  camelCase: function( string ***REMOVED*** {
    return string.replace( rmsPrefix, "ms-" ***REMOVED***.replace( rdashAlpha, fcamelCase ***REMOVED***;
  ***REMOVED***,

  nodeName: function( elem, name ***REMOVED*** {
    return elem.nodeName && elem.nodeName.toLowerCase(***REMOVED*** === name.toLowerCase(***REMOVED***;
  ***REMOVED***,

  // args is for internal usage only
  each: function( obj, callback, args ***REMOVED*** {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike( obj ***REMOVED***;

    if ( args ***REMOVED*** {
      if ( isArray ***REMOVED*** {
        for ( ; i < length; i++ ***REMOVED*** {
          value = callback.apply( obj[ i ], args ***REMOVED***;

          if ( value === false ***REMOVED*** {
            break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
        for ( i in obj ***REMOVED*** {
          value = callback.apply( obj[ i ], args ***REMOVED***;

          if ( value === false ***REMOVED*** {
            break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

    // A special, fast, case for the most common use of each
***REMOVED*** else {
      if ( isArray ***REMOVED*** {
        for ( ; i < length; i++ ***REMOVED*** {
          value = callback.call( obj[ i ], i, obj[ i ] ***REMOVED***;

          if ( value === false ***REMOVED*** {
            break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
        for ( i in obj ***REMOVED*** {
          value = callback.call( obj[ i ], i, obj[ i ] ***REMOVED***;

          if ( value === false ***REMOVED*** {
            break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return obj;
  ***REMOVED***,

  trim: function( text ***REMOVED*** {
    return text == null ? "" : core_trim.call( text ***REMOVED***;
  ***REMOVED***,

  // results is for internal usage only
  makeArray: function( arr, results ***REMOVED*** {
    var ret = results || [];

    if ( arr != null ***REMOVED*** {
      if ( isArraylike( Object(arr***REMOVED*** ***REMOVED*** ***REMOVED*** {
        jQuery.merge( ret,
          typeof arr === "string" ?
          [ arr ] : arr
        ***REMOVED***;
  ***REMOVED*** else {
        core_push.call( ret, arr ***REMOVED***;
  ***REMOVED***
***REMOVED***

    return ret;
  ***REMOVED***,

  inArray: function( elem, arr, i ***REMOVED*** {
    return arr == null ? -1 : core_indexOf.call( arr, elem, i ***REMOVED***;
  ***REMOVED***,

  merge: function( first, second ***REMOVED*** {
    var l = second.length,
      i = first.length,
      j = 0;

    if ( typeof l === "number" ***REMOVED*** {
      for ( ; j < l; j++ ***REMOVED*** {
        first[ i++ ] = second[ j ];
  ***REMOVED***
***REMOVED*** else {
      while ( second[j] !== undefined ***REMOVED*** {
        first[ i++ ] = second[ j++ ];
  ***REMOVED***
***REMOVED***

    first.length = i;

    return first;
  ***REMOVED***,

  grep: function( elems, callback, inv ***REMOVED*** {
    var retVal,
      ret = [],
      i = 0,
      length = elems.length;
    inv = !!inv;

    // Go through the array, only saving the items
    // that pass the validator function
    for ( ; i < length; i++ ***REMOVED*** {
      retVal = !!callback( elems[ i ], i ***REMOVED***;
      if ( inv !== retVal ***REMOVED*** {
        ret.push( elems[ i ] ***REMOVED***;
  ***REMOVED***
***REMOVED***

    return ret;
  ***REMOVED***,

  // arg is for internal usage only
  map: function( elems, callback, arg ***REMOVED*** {
    var value,
      i = 0,
      length = elems.length,
      isArray = isArraylike( elems ***REMOVED***,
      ret = [];

    // Go through the array, translating each of the items to their
    if ( isArray ***REMOVED*** {
      for ( ; i < length; i++ ***REMOVED*** {
        value = callback( elems[ i ], i, arg ***REMOVED***;

        if ( value != null ***REMOVED*** {
          ret[ ret.length ] = value;
    ***REMOVED***
  ***REMOVED***

    // Go through every key on the object,
***REMOVED*** else {
      for ( i in elems ***REMOVED*** {
        value = callback( elems[ i ], i, arg ***REMOVED***;

        if ( value != null ***REMOVED*** {
          ret[ ret.length ] = value;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Flatten any nested arrays
    return core_concat.apply( [], ret ***REMOVED***;
  ***REMOVED***,

  // A global GUID counter for objects
  guid: 1,

  // Bind a function to a context, optionally partially applying any
  // arguments.
  proxy: function( fn, context ***REMOVED*** {
    var tmp, args, proxy;

    if ( typeof context === "string" ***REMOVED*** {
      tmp = fn[ context ];
      context = fn;
      fn = tmp;
***REMOVED***

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if ( !jQuery.isFunction( fn ***REMOVED*** ***REMOVED*** {
      return undefined;
***REMOVED***

    // Simulated bind
    args = core_slice.call( arguments, 2 ***REMOVED***;
    proxy = function(***REMOVED*** {
      return fn.apply( context || this, args.concat( core_slice.call( arguments ***REMOVED*** ***REMOVED*** ***REMOVED***;
***REMOVED***;

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;

    return proxy;
  ***REMOVED***,

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  access: function( elems, fn, key, value, chainable, emptyGet, raw ***REMOVED*** {
    var i = 0,
      length = elems.length,
      bulk = key == null;

    // Sets many values
    if ( jQuery.type( key ***REMOVED*** === "object" ***REMOVED*** {
      chainable = true;
      for ( i in key ***REMOVED*** {
        jQuery.access( elems, fn, i, key[i], true, emptyGet, raw ***REMOVED***;
  ***REMOVED***

    // Sets one value
***REMOVED*** else if ( value !== undefined ***REMOVED*** {
      chainable = true;

      if ( !jQuery.isFunction( value ***REMOVED*** ***REMOVED*** {
        raw = true;
  ***REMOVED***

      if ( bulk ***REMOVED*** {
        // Bulk operations run against the entire set
        if ( raw ***REMOVED*** {
          fn.call( elems, value ***REMOVED***;
          fn = null;

        // ...except when executing function values
    ***REMOVED*** else {
          bulk = fn;
          fn = function( elem, key, value ***REMOVED*** {
            return bulk.call( jQuery( elem ***REMOVED***, value ***REMOVED***;
      ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      if ( fn ***REMOVED*** {
        for ( ; i < length; i++ ***REMOVED*** {
          fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ***REMOVED*** ***REMOVED*** ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return chainable ?
      elems :

      // Gets
      bulk ?
        fn.call( elems ***REMOVED*** :
        length ? fn( elems[0], key ***REMOVED*** : emptyGet;
  ***REMOVED***,

  now: Date.now,

  // A method for quickly swapping in/out CSS properties to get correct calculations.
  // Note: this method belongs to the css module but it's needed here for the support module.
  // If support gets modularized, this method should be moved back to the css module.
  swap: function( elem, options, callback, args ***REMOVED*** {
    var ret, name,
      old = {***REMOVED***;

    // Remember the old values, and insert the new ones
    for ( name in options ***REMOVED*** {
      old[ name ] = elem.style[ name ];
      elem.style[ name ] = options[ name ];
***REMOVED***

    ret = callback.apply( elem, args || [] ***REMOVED***;

    // Revert the old values
    for ( name in options ***REMOVED*** {
      elem.style[ name ] = old[ name ];
***REMOVED***

    return ret;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.ready.promise = function( obj ***REMOVED*** {
  if ( !readyList ***REMOVED*** {

    readyList = jQuery.Deferred(***REMOVED***;

    // Catch cases where $(document***REMOVED***.ready(***REMOVED*** is called after the browser event has already occurred.
    // we once tried to use readyState "interactive" here, but it caused issues like the one
    // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
    if ( document.readyState === "complete" ***REMOVED*** {
      // Handle it asynchronously to allow scripts the opportunity to delay ready
      setTimeout( jQuery.ready ***REMOVED***;

***REMOVED*** else {

      // Use the handy event callback
      document.addEventListener( "DOMContentLoaded", completed, false ***REMOVED***;

      // A fallback to window.onload, that will always work
      window.addEventListener( "load", completed, false ***REMOVED***;
***REMOVED***
  ***REMOVED***
  return readyList.promise( obj ***REMOVED***;
***REMOVED***;

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "***REMOVED***, function(i, name***REMOVED*** {
  class2type[ "[object " + name + "]" ] = name.toLowerCase(***REMOVED***;
***REMOVED******REMOVED***;

function isArraylike( obj ***REMOVED*** {
  var length = obj.length,
    type = jQuery.type( obj ***REMOVED***;

  if ( jQuery.isWindow( obj ***REMOVED*** ***REMOVED*** {
    return false;
  ***REMOVED***

  if ( obj.nodeType === 1 && length ***REMOVED*** {
    return true;
  ***REMOVED***

  return type === "array" || type !== "function" &&
    ( length === 0 ||
    typeof length === "number" && length > 0 && ( length - 1 ***REMOVED*** in obj ***REMOVED***;
***REMOVED***

// All jQuery objects should point back to these
rootjQuery = jQuery(document***REMOVED***;
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ***REMOVED*** {

var i,
  support,
  cachedruns,
  Expr,
  getText,
  isXML,
  compile,
  outermostContext,
  sortInput,

  // Local document vars
  setDocument,
  document,
  docElem,
  documentIsHTML,
  rbuggyQSA,
  rbuggyMatches,
  matches,
  contains,

  // Instance-specific data
  expando = "sizzle" + -(new Date(***REMOVED******REMOVED***,
  preferredDoc = window.document,
  dirruns = 0,
  done = 0,
  classCache = createCache(***REMOVED***,
  tokenCache = createCache(***REMOVED***,
  compilerCache = createCache(***REMOVED***,
  hasDuplicate = false,
  sortOrder = function( a, b ***REMOVED*** {
    if ( a === b ***REMOVED*** {
      hasDuplicate = true;
      return 0;
***REMOVED***
    return 0;
  ***REMOVED***,

  // General-purpose constants
  strundefined = typeof undefined,
  MAX_NEGATIVE = 1 << 31,

  // Instance methods
  hasOwn = ({***REMOVED******REMOVED***.hasOwnProperty,
  arr = [],
  pop = arr.pop,
  push_native = arr.push,
  push = arr.push,
  slice = arr.slice,
  // Use a stripped-down indexOf if we can't use a native one
  indexOf = arr.indexOf || function( elem ***REMOVED*** {
    var i = 0,
      len = this.length;
    for ( ; i < len; i++ ***REMOVED*** {
      if ( this[i] === elem ***REMOVED*** {
        return i;
  ***REMOVED***
***REMOVED***
    return -1;
  ***REMOVED***,

  booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

  // Regular expressions

  // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
  whitespace = "[\\x20\\t\\r\\n\\f]",
  // http://www.w3.org/TR/css3-syntax/#characters
  characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0]***REMOVED***+",

  // Loosely modeled on CSS identifier characters
  // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
  // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
  identifier = characterEncoding.replace( "w", "w#" ***REMOVED***,

  // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
  attributes = "\\[" + whitespace + "*(" + characterEncoding + "***REMOVED***" + whitespace +
    "*(?:([*^$|!~]?=***REMOVED***" + whitespace + "*(?:(['\"]***REMOVED***((?:\\\\.|[^\\\\]***REMOVED****?***REMOVED***\\3|(" + identifier + "***REMOVED***|***REMOVED***|***REMOVED***" + whitespace + "*\\]",

  // Prefer arguments quoted,
  //   then not containing pseudos/brackets,
  //   then attribute selectors/non-parenthetical expressions,
  //   then anything else
  // These preferences are here to reduce the number of selectors
  //   needing tokenize in the PSEUDO preFilter
  pseudos = ":(" + characterEncoding + "***REMOVED***(?:\\(((['\"]***REMOVED***((?:\\\\.|[^\\\\]***REMOVED****?***REMOVED***\\3|((?:\\\\.|[^\\\\(***REMOVED***[\\]]|" + attributes.replace( 3, 8 ***REMOVED*** + "***REMOVED*******REMOVED***|.****REMOVED***\\***REMOVED***|***REMOVED***",

  // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
  rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\]***REMOVED***(?:\\\\.***REMOVED*******REMOVED***" + whitespace + "+$", "g" ***REMOVED***,

  rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ***REMOVED***,
  rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + "***REMOVED***" + whitespace + "*" ***REMOVED***,

  rsibling = new RegExp( whitespace + "*[+~]" ***REMOVED***,
  rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]****REMOVED***" + whitespace + "*\\]", "g" ***REMOVED***,

  rpseudo = new RegExp( pseudos ***REMOVED***,
  ridentifier = new RegExp( "^" + identifier + "$" ***REMOVED***,

  matchExpr = {
    "ID": new RegExp( "^#(" + characterEncoding + "***REMOVED***" ***REMOVED***,
    "CLASS": new RegExp( "^\\.(" + characterEncoding + "***REMOVED***" ***REMOVED***,
    "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ***REMOVED*** + "***REMOVED***" ***REMOVED***,
    "ATTR": new RegExp( "^" + attributes ***REMOVED***,
    "PSEUDO": new RegExp( "^" + pseudos ***REMOVED***,
    "CHILD": new RegExp( "^:(only|first|last|nth|nth-last***REMOVED***-(child|of-type***REMOVED***(?:\\(" + whitespace +
      "*(even|odd|(([+-]|***REMOVED***(\\d****REMOVED***n|***REMOVED***" + whitespace + "*(?:([+-]|***REMOVED***" + whitespace +
      "*(\\d+***REMOVED***|***REMOVED******REMOVED***" + whitespace + "*\\***REMOVED***|***REMOVED***", "i" ***REMOVED***,
    "bool": new RegExp( "^(?:" + booleans + "***REMOVED***$", "i" ***REMOVED***,
    // For use in libraries implementing .is(***REMOVED***
    // We use this for POS matching in `select`
    "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last***REMOVED***(?:\\(" +
      whitespace + "*((?:-\\d***REMOVED***?\\d****REMOVED***" + whitespace + "*\\***REMOVED***|***REMOVED***(?=[^-]|$***REMOVED***", "i" ***REMOVED***
  ***REMOVED***,

  rnative = /^[^{]+\{\s*\[native \w/,

  // Easily-parseable/retrievable ID or TAG or CLASS selectors
  rquickExpr = /^(?:#([\w-]+***REMOVED***|(\w+***REMOVED***|\.([\w-]+***REMOVED******REMOVED***$/,

  rinputs = /^(?:input|select|textarea|button***REMOVED***$/i,
  rheader = /^h\d$/i,

  rescape = /'|\\/g,

  // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
  runescape = new RegExp( "\\\\([\\da-f]{1,6***REMOVED***" + whitespace + "?|(" + whitespace + "***REMOVED***|.***REMOVED***", "ig" ***REMOVED***,
  funescape = function( _, escaped, escapedWhitespace ***REMOVED*** {
    var high = "0x" + escaped - 0x10000;
    // NaN means non-codepoint
    // Support: Firefox
    // Workaround erroneous numeric interpretation of +"0x"
    return high !== high || escapedWhitespace ?
      escaped :
      // BMP codepoint
      high < 0 ?
        String.fromCharCode( high + 0x10000 ***REMOVED*** :
        // Supplemental Plane codepoint (surrogate pair***REMOVED***
        String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 ***REMOVED***;
  ***REMOVED***;

// Optimize for push.apply( _, NodeList ***REMOVED***
try {
  push.apply(
    (arr = slice.call( preferredDoc.childNodes ***REMOVED******REMOVED***,
    preferredDoc.childNodes
  ***REMOVED***;
  // Support: Android<4.0
  // Detect silently failing push.apply
  arr[ preferredDoc.childNodes.length ].nodeType;
***REMOVED*** catch ( e ***REMOVED*** {
  push = { apply: arr.length ?

    // Leverage slice if possible
    function( target, els ***REMOVED*** {
      push_native.apply( target, slice.call(els***REMOVED*** ***REMOVED***;
***REMOVED*** :

    // Support: IE<9
    // Otherwise append directly
    function( target, els ***REMOVED*** {
      var j = target.length,
        i = 0;
      // Can't trust NodeList.length
      while ( (target[j++] = els[i++]***REMOVED*** ***REMOVED*** {***REMOVED***
      target.length = j - 1;
***REMOVED***
  ***REMOVED***;
***REMOVED***

function Sizzle( selector, context, results, seed ***REMOVED*** {
  var match, elem, m, nodeType,
    // QSA vars
    i, groups, old, nid, newContext, newSelector;

  if ( ( context ? context.ownerDocument || context : preferredDoc ***REMOVED*** !== document ***REMOVED*** {
    setDocument( context ***REMOVED***;
  ***REMOVED***

  context = context || document;
  results = results || [];

  if ( !selector || typeof selector !== "string" ***REMOVED*** {
    return results;
  ***REMOVED***

  if ( (nodeType = context.nodeType***REMOVED*** !== 1 && nodeType !== 9 ***REMOVED*** {
    return [];
  ***REMOVED***

  if ( documentIsHTML && !seed ***REMOVED*** {

    // Shortcuts
    if ( (match = rquickExpr.exec( selector ***REMOVED******REMOVED*** ***REMOVED*** {
      // Speed-up: Sizzle("#ID"***REMOVED***
      if ( (m = match[1]***REMOVED*** ***REMOVED*** {
        if ( nodeType === 9 ***REMOVED*** {
          elem = context.getElementById( m ***REMOVED***;
          // Check parentNode to catch when Blackberry 4.6 returns
          // nodes that are no longer in the document #6963
          if ( elem && elem.parentNode ***REMOVED*** {
            // Handle the case where IE, Opera, and Webkit return items
            // by name instead of ID
            if ( elem.id === m ***REMOVED*** {
              results.push( elem ***REMOVED***;
              return results;
        ***REMOVED***
      ***REMOVED*** else {
            return results;
      ***REMOVED***
    ***REMOVED*** else {
          // Context is not a document
          if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m ***REMOVED******REMOVED*** &&
            contains( context, elem ***REMOVED*** && elem.id === m ***REMOVED*** {
            results.push( elem ***REMOVED***;
            return results;
      ***REMOVED***
    ***REMOVED***

      // Speed-up: Sizzle("TAG"***REMOVED***
  ***REMOVED*** else if ( match[2] ***REMOVED*** {
        push.apply( results, context.getElementsByTagName( selector ***REMOVED*** ***REMOVED***;
        return results;

      // Speed-up: Sizzle(".CLASS"***REMOVED***
  ***REMOVED*** else if ( (m = match[3]***REMOVED*** && support.getElementsByClassName && context.getElementsByClassName ***REMOVED*** {
        push.apply( results, context.getElementsByClassName( m ***REMOVED*** ***REMOVED***;
        return results;
  ***REMOVED***
***REMOVED***

    // QSA path
    if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector ***REMOVED******REMOVED*** ***REMOVED*** {
      nid = old = expando;
      newContext = context;
      newSelector = nodeType === 9 && selector;

      // qSA works strangely on Element-rooted queries
      // We can work around this by specifying an extra ID on the root
      // and working up from there (Thanks to Andrew Dupont for the technique***REMOVED***
      // IE 8 doesn't work on object elements
      if ( nodeType === 1 && context.nodeName.toLowerCase(***REMOVED*** !== "object" ***REMOVED*** {
        groups = tokenize( selector ***REMOVED***;

        if ( (old = context.getAttribute("id"***REMOVED******REMOVED*** ***REMOVED*** {
          nid = old.replace( rescape, "\\$&" ***REMOVED***;
    ***REMOVED*** else {
          context.setAttribute( "id", nid ***REMOVED***;
    ***REMOVED***
        nid = "[id='" + nid + "'] ";

        i = groups.length;
        while ( i-- ***REMOVED*** {
          groups[i] = nid + toSelector( groups[i] ***REMOVED***;
    ***REMOVED***
        newContext = rsibling.test( selector ***REMOVED*** && context.parentNode || context;
        newSelector = groups.join(","***REMOVED***;
  ***REMOVED***

      if ( newSelector ***REMOVED*** {
        try {
          push.apply( results,
            newContext.querySelectorAll( newSelector ***REMOVED***
          ***REMOVED***;
          return results;
    ***REMOVED*** catch(qsaError***REMOVED*** {
    ***REMOVED*** finally {
          if ( !old ***REMOVED*** {
            context.removeAttribute("id"***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // All others
  return select( selector.replace( rtrim, "$1" ***REMOVED***, context, results, seed ***REMOVED***;
***REMOVED***

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object***REMOVED******REMOVED*** Returns the Object data after storing it on itself with
 *  property name the (space-suffixed***REMOVED*** string and (if the cache is larger than Expr.cacheLength***REMOVED***
 *  deleting the oldest entry
 */
function createCache(***REMOVED*** {
  var keys = [];

  function cache( key, value ***REMOVED*** {
    // Use (key + " "***REMOVED*** to avoid collision with native prototype properties (see Issue #157***REMOVED***
    if ( keys.push( key += " " ***REMOVED*** > Expr.cacheLength ***REMOVED*** {
      // Only keep the most recent entries
      delete cache[ keys.shift(***REMOVED*** ];
***REMOVED***
    return (cache[ key ] = value***REMOVED***;
  ***REMOVED***
  return cache;
***REMOVED***

/**
 * Mark a function for special use by Sizzle
 * @param {Function***REMOVED*** fn The function to mark
 */
function markFunction( fn ***REMOVED*** {
  fn[ expando ] = true;
  return fn;
***REMOVED***

/**
 * Support testing using an element
 * @param {Function***REMOVED*** fn Passed the created div and expects a boolean result
 */
function assert( fn ***REMOVED*** {
  var div = document.createElement("div"***REMOVED***;

  try {
    return !!fn( div ***REMOVED***;
  ***REMOVED*** catch (e***REMOVED*** {
    return false;
  ***REMOVED*** finally {
    // Remove from its parent by default
    if ( div.parentNode ***REMOVED*** {
      div.parentNode.removeChild( div ***REMOVED***;
***REMOVED***
    // release memory in IE
    div = null;
  ***REMOVED***
***REMOVED***

/**
 * Adds the same handler for all of the specified attrs
 * @param {String***REMOVED*** attrs Pipe-separated list of attributes
 * @param {Function***REMOVED*** handler The method that will be applied
 */
function addHandle( attrs, handler ***REMOVED*** {
  var arr = attrs.split("|"***REMOVED***,
    i = attrs.length;

  while ( i-- ***REMOVED*** {
    Expr.attrHandle[ arr[i] ] = handler;
  ***REMOVED***
***REMOVED***

/**
 * Checks document order of two siblings
 * @param {Element***REMOVED*** a
 * @param {Element***REMOVED*** b
 * @returns {Number***REMOVED*** Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ***REMOVED*** {
  var cur = b && a,
    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
      ( ~b.sourceIndex || MAX_NEGATIVE ***REMOVED*** -
      ( ~a.sourceIndex || MAX_NEGATIVE ***REMOVED***;

  // Use IE sourceIndex if available on both nodes
  if ( diff ***REMOVED*** {
    return diff;
  ***REMOVED***

  // Check if b follows a
  if ( cur ***REMOVED*** {
    while ( (cur = cur.nextSibling***REMOVED*** ***REMOVED*** {
      if ( cur === b ***REMOVED*** {
        return -1;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  return a ? 1 : -1;
***REMOVED***

/**
 * Returns a function to use in pseudos for input types
 * @param {String***REMOVED*** type
 */
function createInputPseudo( type ***REMOVED*** {
  return function( elem ***REMOVED*** {
    var name = elem.nodeName.toLowerCase(***REMOVED***;
    return name === "input" && elem.type === type;
  ***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for buttons
 * @param {String***REMOVED*** type
 */
function createButtonPseudo( type ***REMOVED*** {
  return function( elem ***REMOVED*** {
    var name = elem.nodeName.toLowerCase(***REMOVED***;
    return (name === "input" || name === "button"***REMOVED*** && elem.type === type;
  ***REMOVED***;
***REMOVED***

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function***REMOVED*** fn
 */
function createPositionalPseudo( fn ***REMOVED*** {
  return markFunction(function( argument ***REMOVED*** {
    argument = +argument;
    return markFunction(function( seed, matches ***REMOVED*** {
      var j,
        matchIndexes = fn( [], seed.length, argument ***REMOVED***,
        i = matchIndexes.length;

      // Match elements found at the specified indexes
      while ( i-- ***REMOVED*** {
        if ( seed[ (j = matchIndexes[i]***REMOVED*** ] ***REMOVED*** {
          seed[j] = !(matches[j] = seed[j]***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

/**
 * Detect xml
 * @param {Element|Object***REMOVED*** elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ***REMOVED*** {
  // documentElement is verified for cases where it doesn't yet exist
  // (such as loading iframes in IE - #4833***REMOVED***
  var documentElement = elem && (elem.ownerDocument || elem***REMOVED***.documentElement;
  return documentElement ? documentElement.nodeName !== "HTML" : false;
***REMOVED***;

// Expose support vars for convenience
support = Sizzle.support = {***REMOVED***;

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object***REMOVED*** [doc] An element or document object to use to set the document
 * @returns {Object***REMOVED*** Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ***REMOVED*** {
  var doc = node ? node.ownerDocument || node : preferredDoc,
    parent = doc.defaultView;

  // If no document and documentElement is available, return
  if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ***REMOVED*** {
    return document;
  ***REMOVED***

  // Set our document
  document = doc;
  docElem = doc.documentElement;

  // Support tests
  documentIsHTML = !isXML( doc ***REMOVED***;

  // Support: IE>8
  // If iframe document is assigned to "document" variable and if iframe has been reloaded,
  // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
  // IE6-8 do not support the defaultView property so parent will be undefined
  if ( parent && parent.attachEvent && parent !== parent.top ***REMOVED*** {
    parent.attachEvent( "onbeforeunload", function(***REMOVED*** {
      setDocument(***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

  /* Attributes
  ---------------------------------------------------------------------- */

  // Support: IE<8
  // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans***REMOVED***
  support.attributes = assert(function( div ***REMOVED*** {
    div.className = "i";
    return !div.getAttribute("className"***REMOVED***;
  ***REMOVED******REMOVED***;

  /* getElement(s***REMOVED***By*
  ---------------------------------------------------------------------- */

  // Check if getElementsByTagName("*"***REMOVED*** returns only elements
  support.getElementsByTagName = assert(function( div ***REMOVED*** {
    div.appendChild( doc.createComment(""***REMOVED*** ***REMOVED***;
    return !div.getElementsByTagName("*"***REMOVED***.length;
  ***REMOVED******REMOVED***;

  // Check if getElementsByClassName can be trusted
  support.getElementsByClassName = assert(function( div ***REMOVED*** {
    div.innerHTML = "<div class='a'></div><div class='a i'></div>";

    // Support: Safari<4
    // Catch class over-caching
    div.firstChild.className = "i";
    // Support: Opera<10
    // Catch gEBCN failure to find non-leading classes
    return div.getElementsByClassName("i"***REMOVED***.length === 2;
  ***REMOVED******REMOVED***;

  // Support: IE<10
  // Check if getElementById returns elements by name
  // The broken getElementById methods don't pick up programatically-set names,
  // so use a roundabout getElementsByName test
  support.getById = assert(function( div ***REMOVED*** {
    docElem.appendChild( div ***REMOVED***.id = expando;
    return !doc.getElementsByName || !doc.getElementsByName( expando ***REMOVED***.length;
  ***REMOVED******REMOVED***;

  // ID find and filter
  if ( support.getById ***REMOVED*** {
    Expr.find["ID"] = function( id, context ***REMOVED*** {
      if ( typeof context.getElementById !== strundefined && documentIsHTML ***REMOVED*** {
        var m = context.getElementById( id ***REMOVED***;
        // Check parentNode to catch when Blackberry 4.6 returns
        // nodes that are no longer in the document #6963
        return m && m.parentNode ? [m] : [];
  ***REMOVED***
***REMOVED***;
    Expr.filter["ID"] = function( id ***REMOVED*** {
      var attrId = id.replace( runescape, funescape ***REMOVED***;
      return function( elem ***REMOVED*** {
        return elem.getAttribute("id"***REMOVED*** === attrId;
  ***REMOVED***;
***REMOVED***;
  ***REMOVED*** else {
    // Support: IE6/7
    // getElementById is not reliable as a find shortcut
    delete Expr.find["ID"];

    Expr.filter["ID"] =  function( id ***REMOVED*** {
      var attrId = id.replace( runescape, funescape ***REMOVED***;
      return function( elem ***REMOVED*** {
        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id"***REMOVED***;
        return node && node.value === attrId;
  ***REMOVED***;
***REMOVED***;
  ***REMOVED***

  // Tag
  Expr.find["TAG"] = support.getElementsByTagName ?
    function( tag, context ***REMOVED*** {
      if ( typeof context.getElementsByTagName !== strundefined ***REMOVED*** {
        return context.getElementsByTagName( tag ***REMOVED***;
  ***REMOVED***
***REMOVED*** :
    function( tag, context ***REMOVED*** {
      var elem,
        tmp = [],
        i = 0,
        results = context.getElementsByTagName( tag ***REMOVED***;

      // Filter out possible comments
      if ( tag === "*" ***REMOVED*** {
        while ( (elem = results[i++]***REMOVED*** ***REMOVED*** {
          if ( elem.nodeType === 1 ***REMOVED*** {
            tmp.push( elem ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

        return tmp;
  ***REMOVED***
      return results;
***REMOVED***;

  // Class
  Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ***REMOVED*** {
    if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ***REMOVED*** {
      return context.getElementsByClassName( className ***REMOVED***;
***REMOVED***
  ***REMOVED***;

  /* QSA/matchesSelector
  ---------------------------------------------------------------------- */

  // QSA and matchesSelector support

  // matchesSelector(:active***REMOVED*** reports false when true (IE9/Opera 11.5***REMOVED***
  rbuggyMatches = [];

  // qSa(:focus***REMOVED*** reports false when true (Chrome 21***REMOVED***
  // We allow this because of a bug in IE8/9 that throws an error
  // whenever `document.activeElement` is accessed on an iframe
  // So, we allow :focus to pass through QSA all the time to avoid the IE error
  // See http://bugs.jquery.com/ticket/13378
  rbuggyQSA = [];

  if ( (support.qsa = rnative.test( doc.querySelectorAll ***REMOVED******REMOVED*** ***REMOVED*** {
    // Build QSA regex
    // Regex strategy adopted from Diego Perini
    assert(function( div ***REMOVED*** {
      // Select is set to empty string on purpose
      // This is to test IE's treatment of not explicitly
      // setting a boolean content attribute,
      // since its presence should be enough
      // http://bugs.jquery.com/ticket/12359
      div.innerHTML = "<select><option selected=''></option></select>";

      // Support: IE8
      // Boolean attributes and "value" are not treated correctly
      if ( !div.querySelectorAll("[selected]"***REMOVED***.length ***REMOVED*** {
        rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + "***REMOVED***" ***REMOVED***;
  ***REMOVED***

      // Webkit/Opera - :checked should return selected option elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":checked"***REMOVED***.length ***REMOVED*** {
        rbuggyQSA.push(":checked"***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

    assert(function( div ***REMOVED*** {

      // Support: Opera 10-12/IE8
      // ^= $= *= and empty values
      // Should not select anything
      // Support: Windows 8 Native Apps
      // The type attribute is restricted during .innerHTML assignment
      var input = doc.createElement("input"***REMOVED***;
      input.setAttribute( "type", "hidden" ***REMOVED***;
      div.appendChild( input ***REMOVED***.setAttribute( "t", "" ***REMOVED***;

      if ( div.querySelectorAll("[t^='']"***REMOVED***.length ***REMOVED*** {
        rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\"***REMOVED***" ***REMOVED***;
  ***REMOVED***

      // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled***REMOVED***
      // IE8 throws error here and will not see later tests
      if ( !div.querySelectorAll(":enabled"***REMOVED***.length ***REMOVED*** {
        rbuggyQSA.push( ":enabled", ":disabled" ***REMOVED***;
  ***REMOVED***

      // Opera 10-11 does not throw on post-comma invalid pseudos
      div.querySelectorAll("*,:x"***REMOVED***;
      rbuggyQSA.push(",.*:"***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

  if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
    docElem.mozMatchesSelector ||
    docElem.oMatchesSelector ||
    docElem.msMatchesSelector***REMOVED*** ***REMOVED******REMOVED*** ***REMOVED*** {

    assert(function( div ***REMOVED*** {
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node (IE 9***REMOVED***
      support.disconnectedMatch = matches.call( div, "div" ***REMOVED***;

      // This should fail with an exception
      // Gecko does not error, returns false instead
      matches.call( div, "[s!='']:x" ***REMOVED***;
      rbuggyMatches.push( "!=", pseudos ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

  rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|"***REMOVED*** ***REMOVED***;
  rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|"***REMOVED*** ***REMOVED***;

  /* Contains
  ---------------------------------------------------------------------- */

  // Element contains another
  // Purposefully does not implement inclusive descendent
  // As in, an element does not contain itself
  contains = rnative.test( docElem.contains ***REMOVED*** || docElem.compareDocumentPosition ?
    function( a, b ***REMOVED*** {
      var adown = a.nodeType === 9 ? a.documentElement : a,
        bup = b && b.parentNode;
      return a === bup || !!( bup && bup.nodeType === 1 && (
        adown.contains ?
          adown.contains( bup ***REMOVED*** :
          a.compareDocumentPosition && a.compareDocumentPosition( bup ***REMOVED*** & 16
      ***REMOVED******REMOVED***;
***REMOVED*** :
    function( a, b ***REMOVED*** {
      if ( b ***REMOVED*** {
        while ( (b = b.parentNode***REMOVED*** ***REMOVED*** {
          if ( b === a ***REMOVED*** {
            return true;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      return false;
***REMOVED***;

  /* Sorting
  ---------------------------------------------------------------------- */

  // Document order sorting
  sortOrder = docElem.compareDocumentPosition ?
  function( a, b ***REMOVED*** {

    // Flag for duplicate removal
    if ( a === b ***REMOVED*** {
      hasDuplicate = true;
      return 0;
***REMOVED***

    var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b ***REMOVED***;

    if ( compare ***REMOVED*** {
      // Disconnected nodes
      if ( compare & 1 ||
        (!support.sortDetached && b.compareDocumentPosition( a ***REMOVED*** === compare***REMOVED*** ***REMOVED*** {

        // Choose the first element that is related to our preferred document
        if ( a === doc || contains(preferredDoc, a***REMOVED*** ***REMOVED*** {
          return -1;
    ***REMOVED***
        if ( b === doc || contains(preferredDoc, b***REMOVED*** ***REMOVED*** {
          return 1;
    ***REMOVED***

        // Maintain original order
        return sortInput ?
          ( indexOf.call( sortInput, a ***REMOVED*** - indexOf.call( sortInput, b ***REMOVED*** ***REMOVED*** :
          0;
  ***REMOVED***

      return compare & 4 ? -1 : 1;
***REMOVED***

    // Not directly comparable, sort on existence of method
    return a.compareDocumentPosition ? -1 : 1;
  ***REMOVED*** :
  function( a, b ***REMOVED*** {
    var cur,
      i = 0,
      aup = a.parentNode,
      bup = b.parentNode,
      ap = [ a ],
      bp = [ b ];

    // Exit early if the nodes are identical
    if ( a === b ***REMOVED*** {
      hasDuplicate = true;
      return 0;

    // Parentless nodes are either documents or disconnected
***REMOVED*** else if ( !aup || !bup ***REMOVED*** {
      return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ***REMOVED*** - indexOf.call( sortInput, b ***REMOVED*** ***REMOVED*** :
        0;

    // If the nodes are siblings, we can do a quick check
***REMOVED*** else if ( aup === bup ***REMOVED*** {
      return siblingCheck( a, b ***REMOVED***;
***REMOVED***

    // Otherwise we need full lists of their ancestors for comparison
    cur = a;
    while ( (cur = cur.parentNode***REMOVED*** ***REMOVED*** {
      ap.unshift( cur ***REMOVED***;
***REMOVED***
    cur = b;
    while ( (cur = cur.parentNode***REMOVED*** ***REMOVED*** {
      bp.unshift( cur ***REMOVED***;
***REMOVED***

    // Walk down the tree looking for a discrepancy
    while ( ap[i] === bp[i] ***REMOVED*** {
      i++;
***REMOVED***

    return i ?
      // Do a sibling check if the nodes have a common ancestor
      siblingCheck( ap[i], bp[i] ***REMOVED*** :

      // Otherwise nodes in our document sort first
      ap[i] === preferredDoc ? -1 :
      bp[i] === preferredDoc ? 1 :
      0;
  ***REMOVED***;

  return doc;
***REMOVED***;

Sizzle.matches = function( expr, elements ***REMOVED*** {
  return Sizzle( expr, null, null, elements ***REMOVED***;
***REMOVED***;

Sizzle.matchesSelector = function( elem, expr ***REMOVED*** {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ***REMOVED*** !== document ***REMOVED*** {
    setDocument( elem ***REMOVED***;
  ***REMOVED***

  // Make sure that attribute selectors are quoted
  expr = expr.replace( rattributeQuotes, "='$1']" ***REMOVED***;

  if ( support.matchesSelector && documentIsHTML &&
    ( !rbuggyMatches || !rbuggyMatches.test( expr ***REMOVED*** ***REMOVED*** &&
    ( !rbuggyQSA     || !rbuggyQSA.test( expr ***REMOVED*** ***REMOVED*** ***REMOVED*** {

    try {
      var ret = matches.call( elem, expr ***REMOVED***;

      // IE 9's matchesSelector returns false on disconnected nodes
      if ( ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11 ***REMOVED*** {
        return ret;
  ***REMOVED***
***REMOVED*** catch(e***REMOVED*** {***REMOVED***
  ***REMOVED***

  return Sizzle( expr, document, null, [elem] ***REMOVED***.length > 0;
***REMOVED***;

Sizzle.contains = function( context, elem ***REMOVED*** {
  // Set document vars if needed
  if ( ( context.ownerDocument || context ***REMOVED*** !== document ***REMOVED*** {
    setDocument( context ***REMOVED***;
  ***REMOVED***
  return contains( context, elem ***REMOVED***;
***REMOVED***;

Sizzle.attr = function( elem, name ***REMOVED*** {
  // Set document vars if needed
  if ( ( elem.ownerDocument || elem ***REMOVED*** !== document ***REMOVED*** {
    setDocument( elem ***REMOVED***;
  ***REMOVED***

  var fn = Expr.attrHandle[ name.toLowerCase(***REMOVED*** ],
    // Don't get fooled by Object.prototype properties (jQuery #13807***REMOVED***
    val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase(***REMOVED*** ***REMOVED*** ?
      fn( elem, name, !documentIsHTML ***REMOVED*** :
      undefined;

  return val === undefined ?
    support.attributes || !documentIsHTML ?
      elem.getAttribute( name ***REMOVED*** :
      (val = elem.getAttributeNode(name***REMOVED******REMOVED*** && val.specified ?
        val.value :
        null :
    val;
***REMOVED***;

Sizzle.error = function( msg ***REMOVED*** {
  throw new Error( "Syntax error, unrecognized expression: " + msg ***REMOVED***;
***REMOVED***;

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike***REMOVED*** results
 */
Sizzle.uniqueSort = function( results ***REMOVED*** {
  var elem,
    duplicates = [],
    j = 0,
    i = 0;

  // Unless we *know* we can detect duplicates, assume their presence
  hasDuplicate = !support.detectDuplicates;
  sortInput = !support.sortStable && results.slice( 0 ***REMOVED***;
  results.sort( sortOrder ***REMOVED***;

  if ( hasDuplicate ***REMOVED*** {
    while ( (elem = results[i++]***REMOVED*** ***REMOVED*** {
      if ( elem === results[ i ] ***REMOVED*** {
        j = duplicates.push( i ***REMOVED***;
  ***REMOVED***
***REMOVED***
    while ( j-- ***REMOVED*** {
      results.splice( duplicates[ j ], 1 ***REMOVED***;
***REMOVED***
  ***REMOVED***

  return results;
***REMOVED***;

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element***REMOVED*** elem
 */
getText = Sizzle.getText = function( elem ***REMOVED*** {
  var node,
    ret = "",
    i = 0,
    nodeType = elem.nodeType;

  if ( !nodeType ***REMOVED*** {
    // If no nodeType, this is expected to be an array
    for ( ; (node = elem[i]***REMOVED***; i++ ***REMOVED*** {
      // Do not traverse comment nodes
      ret += getText( node ***REMOVED***;
***REMOVED***
  ***REMOVED*** else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ***REMOVED*** {
    // Use textContent for elements
    // innerText usage removed for consistency of new lines (see #11153***REMOVED***
    if ( typeof elem.textContent === "string" ***REMOVED*** {
      return elem.textContent;
***REMOVED*** else {
      // Traverse its children
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ***REMOVED*** {
        ret += getText( elem ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED*** else if ( nodeType === 3 || nodeType === 4 ***REMOVED*** {
    return elem.nodeValue;
  ***REMOVED***
  // Do not include comment or processing instruction nodes

  return ret;
***REMOVED***;

Expr = Sizzle.selectors = {

  // Can be adjusted by the user
  cacheLength: 50,

  createPseudo: markFunction,

  match: matchExpr,

  attrHandle: {***REMOVED***,

  find: {***REMOVED***,

  relative: {
    ">": { dir: "parentNode", first: true ***REMOVED***,
    " ": { dir: "parentNode" ***REMOVED***,
    "+": { dir: "previousSibling", first: true ***REMOVED***,
    "~": { dir: "previousSibling" ***REMOVED***
  ***REMOVED***,

  preFilter: {
    "ATTR": function( match ***REMOVED*** {
      match[1] = match[1].replace( runescape, funescape ***REMOVED***;

      // Move the given value to match[3] whether quoted or unquoted
      match[3] = ( match[4] || match[5] || "" ***REMOVED***.replace( runescape, funescape ***REMOVED***;

      if ( match[2] === "~=" ***REMOVED*** {
        match[3] = " " + match[3] + " ";
  ***REMOVED***

      return match.slice( 0, 4 ***REMOVED***;
***REMOVED***,

    "CHILD": function( match ***REMOVED*** {
      /* matches from matchExpr["CHILD"]
        1 type (only|nth|...***REMOVED***
        2 what (child|of-type***REMOVED***
        3 argument (even|odd|\d*|\d*n([+-]\d+***REMOVED***?|...***REMOVED***
        4 xn-component of xn+y argument ([+-]?\d*n|***REMOVED***
        5 sign of xn-component
        6 x of xn-component
        7 sign of y-component
        8 y of y-component
      */
      match[1] = match[1].toLowerCase(***REMOVED***;

      if ( match[1].slice( 0, 3 ***REMOVED*** === "nth" ***REMOVED*** {
        // nth-* requires argument
        if ( !match[3] ***REMOVED*** {
          Sizzle.error( match[0] ***REMOVED***;
    ***REMOVED***

        // numeric x and y parameters for Expr.filter.CHILD
        // remember that false/true cast respectively to 0/1
        match[4] = +( match[4] ? match[5] + (match[6] || 1***REMOVED*** : 2 * ( match[3] === "even" || match[3] === "odd" ***REMOVED*** ***REMOVED***;
        match[5] = +( ( match[7] + match[8] ***REMOVED*** || match[3] === "odd" ***REMOVED***;

      // other types prohibit arguments
  ***REMOVED*** else if ( match[3] ***REMOVED*** {
        Sizzle.error( match[0] ***REMOVED***;
  ***REMOVED***

      return match;
***REMOVED***,

    "PSEUDO": function( match ***REMOVED*** {
      var excess,
        unquoted = !match[5] && match[2];

      if ( matchExpr["CHILD"].test( match[0] ***REMOVED*** ***REMOVED*** {
        return null;
  ***REMOVED***

      // Accept quoted arguments as-is
      if ( match[3] && match[4] !== undefined ***REMOVED*** {
        match[2] = match[4];

      // Strip excess characters from unquoted arguments
  ***REMOVED*** else if ( unquoted && rpseudo.test( unquoted ***REMOVED*** &&
        // Get excess from tokenize (recursively***REMOVED***
        (excess = tokenize( unquoted, true ***REMOVED******REMOVED*** &&
        // advance to the next closing parenthesis
        (excess = unquoted.indexOf( "***REMOVED***", unquoted.length - excess ***REMOVED*** - unquoted.length***REMOVED*** ***REMOVED*** {

        // excess is a negative index
        match[0] = match[0].slice( 0, excess ***REMOVED***;
        match[2] = unquoted.slice( 0, excess ***REMOVED***;
  ***REMOVED***

      // Return only captures needed by the pseudo filter method (type and argument***REMOVED***
      return match.slice( 0, 3 ***REMOVED***;
***REMOVED***
  ***REMOVED***,

  filter: {

    "TAG": function( nodeNameSelector ***REMOVED*** {
      var nodeName = nodeNameSelector.replace( runescape, funescape ***REMOVED***.toLowerCase(***REMOVED***;
      return nodeNameSelector === "*" ?
        function(***REMOVED*** { return true; ***REMOVED*** :
        function( elem ***REMOVED*** {
          return elem.nodeName && elem.nodeName.toLowerCase(***REMOVED*** === nodeName;
    ***REMOVED***;
***REMOVED***,

    "CLASS": function( className ***REMOVED*** {
      var pattern = classCache[ className + " " ];

      return pattern ||
        (pattern = new RegExp( "(^|" + whitespace + "***REMOVED***" + className + "(" + whitespace + "|$***REMOVED***" ***REMOVED******REMOVED*** &&
        classCache( className, function( elem ***REMOVED*** {
          return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class"***REMOVED*** || "" ***REMOVED***;
    ***REMOVED******REMOVED***;
***REMOVED***,

    "ATTR": function( name, operator, check ***REMOVED*** {
      return function( elem ***REMOVED*** {
        var result = Sizzle.attr( elem, name ***REMOVED***;

        if ( result == null ***REMOVED*** {
          return operator === "!=";
    ***REMOVED***
        if ( !operator ***REMOVED*** {
          return true;
    ***REMOVED***

        result += "";

        return operator === "=" ? result === check :
          operator === "!=" ? result !== check :
          operator === "^=" ? check && result.indexOf( check ***REMOVED*** === 0 :
          operator === "*=" ? check && result.indexOf( check ***REMOVED*** > -1 :
          operator === "$=" ? check && result.slice( -check.length ***REMOVED*** === check :
          operator === "~=" ? ( " " + result + " " ***REMOVED***.indexOf( check ***REMOVED*** > -1 :
          operator === "|=" ? result === check || result.slice( 0, check.length + 1 ***REMOVED*** === check + "-" :
          false;
  ***REMOVED***;
***REMOVED***,

    "CHILD": function( type, what, argument, first, last ***REMOVED*** {
      var simple = type.slice( 0, 3 ***REMOVED*** !== "nth",
        forward = type.slice( -4 ***REMOVED*** !== "last",
        ofType = what === "of-type";

      return first === 1 && last === 0 ?

        // Shortcut for :nth-*(n***REMOVED***
        function( elem ***REMOVED*** {
          return !!elem.parentNode;
    ***REMOVED*** :

        function( elem, context, xml ***REMOVED*** {
          var cache, outerCache, node, diff, nodeIndex, start,
            dir = simple !== forward ? "nextSibling" : "previousSibling",
            parent = elem.parentNode,
            name = ofType && elem.nodeName.toLowerCase(***REMOVED***,
            useCache = !xml && !ofType;

          if ( parent ***REMOVED*** {

            // :(first|last|only***REMOVED***-(child|of-type***REMOVED***
            if ( simple ***REMOVED*** {
              while ( dir ***REMOVED*** {
                node = elem;
                while ( (node = node[ dir ]***REMOVED*** ***REMOVED*** {
                  if ( ofType ? node.nodeName.toLowerCase(***REMOVED*** === name : node.nodeType === 1 ***REMOVED*** {
                    return false;
              ***REMOVED***
            ***REMOVED***
                // Reverse direction for :only-* (if we haven't yet done so***REMOVED***
                start = dir = type === "only" && !start && "nextSibling";
          ***REMOVED***
              return true;
        ***REMOVED***

            start = [ forward ? parent.firstChild : parent.lastChild ];

            // non-xml :nth-child(...***REMOVED*** stores cache data on `parent`
            if ( forward && useCache ***REMOVED*** {
              // Seek `elem` from a previously-cached index
              outerCache = parent[ expando ] || (parent[ expando ] = {***REMOVED******REMOVED***;
              cache = outerCache[ type ] || [];
              nodeIndex = cache[0] === dirruns && cache[1];
              diff = cache[0] === dirruns && cache[2];
              node = nodeIndex && parent.childNodes[ nodeIndex ];

              while ( (node = ++nodeIndex && node && node[ dir ] ||

                // Fallback to seeking `elem` from the start
                (diff = nodeIndex = 0***REMOVED*** || start.pop(***REMOVED******REMOVED*** ***REMOVED*** {

                // When found, cache indexes on `parent` and break
                if ( node.nodeType === 1 && ++diff && node === elem ***REMOVED*** {
                  outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                  break;
            ***REMOVED***
          ***REMOVED***

            // Use previously-cached element index if available
        ***REMOVED*** else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {***REMOVED******REMOVED******REMOVED***[ type ]***REMOVED*** && cache[0] === dirruns ***REMOVED*** {
              diff = cache[1];

            // xml :nth-child(...***REMOVED*** or :nth-last-child(...***REMOVED*** or :nth(-last***REMOVED***?-of-type(...***REMOVED***
        ***REMOVED*** else {
              // Use the same loop as above to seek `elem` from the start
              while ( (node = ++nodeIndex && node && node[ dir ] ||
                (diff = nodeIndex = 0***REMOVED*** || start.pop(***REMOVED******REMOVED*** ***REMOVED*** {

                if ( ( ofType ? node.nodeName.toLowerCase(***REMOVED*** === name : node.nodeType === 1 ***REMOVED*** && ++diff ***REMOVED*** {
                  // Cache the index of each encountered element
                  if ( useCache ***REMOVED*** {
                    (node[ expando ] || (node[ expando ] = {***REMOVED******REMOVED******REMOVED***[ type ] = [ dirruns, diff ];
              ***REMOVED***

                  if ( node === elem ***REMOVED*** {
                    break;
              ***REMOVED***
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***

            // Incorporate the offset, then check against cycle size
            diff -= last;
            return diff === first || ( diff % first === 0 && diff / first >= 0 ***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
***REMOVED***,

    "PSEUDO": function( pseudo, argument ***REMOVED*** {
      // pseudo-class names are case-insensitive
      // http://www.w3.org/TR/selectors/#pseudo-classes
      // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
      // Remember that setFilters inherits from pseudos
      var args,
        fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase(***REMOVED*** ] ||
          Sizzle.error( "unsupported pseudo: " + pseudo ***REMOVED***;

      // The user may use createPseudo to indicate that
      // arguments are needed to create the filter function
      // just as Sizzle does
      if ( fn[ expando ] ***REMOVED*** {
        return fn( argument ***REMOVED***;
  ***REMOVED***

      // But maintain support for old signatures
      if ( fn.length > 1 ***REMOVED*** {
        args = [ pseudo, pseudo, "", argument ];
        return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase(***REMOVED*** ***REMOVED*** ?
          markFunction(function( seed, matches ***REMOVED*** {
            var idx,
              matched = fn( seed, argument ***REMOVED***,
              i = matched.length;
            while ( i-- ***REMOVED*** {
              idx = indexOf.call( seed, matched[i] ***REMOVED***;
              seed[ idx ] = !( matches[ idx ] = matched[i] ***REMOVED***;
        ***REMOVED***
      ***REMOVED******REMOVED*** :
          function( elem ***REMOVED*** {
            return fn( elem, 0, args ***REMOVED***;
      ***REMOVED***;
  ***REMOVED***

      return fn;
***REMOVED***
  ***REMOVED***,

  pseudos: {
    // Potentially complex pseudos
    "not": markFunction(function( selector ***REMOVED*** {
      // Trim the selector passed to compile
      // to avoid treating leading and trailing
      // spaces as combinators
      var input = [],
        results = [],
        matcher = compile( selector.replace( rtrim, "$1" ***REMOVED*** ***REMOVED***;

      return matcher[ expando ] ?
        markFunction(function( seed, matches, context, xml ***REMOVED*** {
          var elem,
            unmatched = matcher( seed, null, xml, [] ***REMOVED***,
            i = seed.length;

          // Match elements unmatched by `matcher`
          while ( i-- ***REMOVED*** {
            if ( (elem = unmatched[i]***REMOVED*** ***REMOVED*** {
              seed[i] = !(matches[i] = elem***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED******REMOVED*** :
        function( elem, context, xml ***REMOVED*** {
          input[0] = elem;
          matcher( input, null, xml, results ***REMOVED***;
          return !results.pop(***REMOVED***;
    ***REMOVED***;
***REMOVED******REMOVED***,

    "has": markFunction(function( selector ***REMOVED*** {
      return function( elem ***REMOVED*** {
        return Sizzle( selector, elem ***REMOVED***.length > 0;
  ***REMOVED***;
***REMOVED******REMOVED***,

    "contains": markFunction(function( text ***REMOVED*** {
      return function( elem ***REMOVED*** {
        return ( elem.textContent || elem.innerText || getText( elem ***REMOVED*** ***REMOVED***.indexOf( text ***REMOVED*** > -1;
  ***REMOVED***;
***REMOVED******REMOVED***,

    // "Whether an element is represented by a :lang(***REMOVED*** selector
    // is based solely on the element's language value
    // being equal to the identifier C,
    // or beginning with the identifier C immediately followed by "-".
    // The matching of C against the element's language value is performed case-insensitively.
    // The identifier C does not have to be a valid language name."
    // http://www.w3.org/TR/selectors/#lang-pseudo
    "lang": markFunction( function( lang ***REMOVED*** {
      // lang value must be a valid identifier
      if ( !ridentifier.test(lang || ""***REMOVED*** ***REMOVED*** {
        Sizzle.error( "unsupported lang: " + lang ***REMOVED***;
  ***REMOVED***
      lang = lang.replace( runescape, funescape ***REMOVED***.toLowerCase(***REMOVED***;
      return function( elem ***REMOVED*** {
        var elemLang;
        do {
          if ( (elemLang = documentIsHTML ?
            elem.lang :
            elem.getAttribute("xml:lang"***REMOVED*** || elem.getAttribute("lang"***REMOVED******REMOVED*** ***REMOVED*** {

            elemLang = elemLang.toLowerCase(***REMOVED***;
            return elemLang === lang || elemLang.indexOf( lang + "-" ***REMOVED*** === 0;
      ***REMOVED***
    ***REMOVED*** while ( (elem = elem.parentNode***REMOVED*** && elem.nodeType === 1 ***REMOVED***;
        return false;
  ***REMOVED***;
***REMOVED******REMOVED***,

    // Miscellaneous
    "target": function( elem ***REMOVED*** {
      var hash = window.location && window.location.hash;
      return hash && hash.slice( 1 ***REMOVED*** === elem.id;
***REMOVED***,

    "root": function( elem ***REMOVED*** {
      return elem === docElem;
***REMOVED***,

    "focus": function( elem ***REMOVED*** {
      return elem === document.activeElement && (!document.hasFocus || document.hasFocus(***REMOVED******REMOVED*** && !!(elem.type || elem.href || ~elem.tabIndex***REMOVED***;
***REMOVED***,

    // Boolean properties
    "enabled": function( elem ***REMOVED*** {
      return elem.disabled === false;
***REMOVED***,

    "disabled": function( elem ***REMOVED*** {
      return elem.disabled === true;
***REMOVED***,

    "checked": function( elem ***REMOVED*** {
      // In CSS3, :checked should return both checked and selected elements
      // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
      var nodeName = elem.nodeName.toLowerCase(***REMOVED***;
      return (nodeName === "input" && !!elem.checked***REMOVED*** || (nodeName === "option" && !!elem.selected***REMOVED***;
***REMOVED***,

    "selected": function( elem ***REMOVED*** {
      // Accessing this property makes selected-by-default
      // options in Safari work properly
      if ( elem.parentNode ***REMOVED*** {
        elem.parentNode.selectedIndex;
  ***REMOVED***

      return elem.selected === true;
***REMOVED***,

    // Contents
    "empty": function( elem ***REMOVED*** {
      // http://www.w3.org/TR/selectors/#empty-pseudo
      // :empty is only affected by element nodes and content nodes(including text(3***REMOVED***, cdata(4***REMOVED******REMOVED***,
      //   not comment, processing instructions, or others
      // Thanks to Diego Perini for the nodeName shortcut
      //   Greater than "@" means alpha characters (specifically not starting with "#" or "?"***REMOVED***
      for ( elem = elem.firstChild; elem; elem = elem.nextSibling ***REMOVED*** {
        if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ***REMOVED*** {
          return false;
    ***REMOVED***
  ***REMOVED***
      return true;
***REMOVED***,

    "parent": function( elem ***REMOVED*** {
      return !Expr.pseudos["empty"]( elem ***REMOVED***;
***REMOVED***,

    // Element/input types
    "header": function( elem ***REMOVED*** {
      return rheader.test( elem.nodeName ***REMOVED***;
***REMOVED***,

    "input": function( elem ***REMOVED*** {
      return rinputs.test( elem.nodeName ***REMOVED***;
***REMOVED***,

    "button": function( elem ***REMOVED*** {
      var name = elem.nodeName.toLowerCase(***REMOVED***;
      return name === "input" && elem.type === "button" || name === "button";
***REMOVED***,

    "text": function( elem ***REMOVED*** {
      var attr;
      // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc***REMOVED***
      // use getAttribute instead to test this case
      return elem.nodeName.toLowerCase(***REMOVED*** === "input" &&
        elem.type === "text" &&
        ( (attr = elem.getAttribute("type"***REMOVED******REMOVED*** == null || attr.toLowerCase(***REMOVED*** === elem.type ***REMOVED***;
***REMOVED***,

    // Position-in-collection
    "first": createPositionalPseudo(function(***REMOVED*** {
      return [ 0 ];
***REMOVED******REMOVED***,

    "last": createPositionalPseudo(function( matchIndexes, length ***REMOVED*** {
      return [ length - 1 ];
***REMOVED******REMOVED***,

    "eq": createPositionalPseudo(function( matchIndexes, length, argument ***REMOVED*** {
      return [ argument < 0 ? argument + length : argument ];
***REMOVED******REMOVED***,

    "even": createPositionalPseudo(function( matchIndexes, length ***REMOVED*** {
      var i = 0;
      for ( ; i < length; i += 2 ***REMOVED*** {
        matchIndexes.push( i ***REMOVED***;
  ***REMOVED***
      return matchIndexes;
***REMOVED******REMOVED***,

    "odd": createPositionalPseudo(function( matchIndexes, length ***REMOVED*** {
      var i = 1;
      for ( ; i < length; i += 2 ***REMOVED*** {
        matchIndexes.push( i ***REMOVED***;
  ***REMOVED***
      return matchIndexes;
***REMOVED******REMOVED***,

    "lt": createPositionalPseudo(function( matchIndexes, length, argument ***REMOVED*** {
      var i = argument < 0 ? argument + length : argument;
      for ( ; --i >= 0; ***REMOVED*** {
        matchIndexes.push( i ***REMOVED***;
  ***REMOVED***
      return matchIndexes;
***REMOVED******REMOVED***,

    "gt": createPositionalPseudo(function( matchIndexes, length, argument ***REMOVED*** {
      var i = argument < 0 ? argument + length : argument;
      for ( ; ++i < length; ***REMOVED*** {
        matchIndexes.push( i ***REMOVED***;
  ***REMOVED***
      return matchIndexes;
***REMOVED******REMOVED***
  ***REMOVED***
***REMOVED***;

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true ***REMOVED*** ***REMOVED*** {
  Expr.pseudos[ i ] = createInputPseudo( i ***REMOVED***;
***REMOVED***
for ( i in { submit: true, reset: true ***REMOVED*** ***REMOVED*** {
  Expr.pseudos[ i ] = createButtonPseudo( i ***REMOVED***;
***REMOVED***

// Easy API for creating new setFilters
function setFilters(***REMOVED*** {***REMOVED***
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters(***REMOVED***;

function tokenize( selector, parseOnly ***REMOVED*** {
  var matched, match, tokens, type,
    soFar, groups, preFilters,
    cached = tokenCache[ selector + " " ];

  if ( cached ***REMOVED*** {
    return parseOnly ? 0 : cached.slice( 0 ***REMOVED***;
  ***REMOVED***

  soFar = selector;
  groups = [];
  preFilters = Expr.preFilter;

  while ( soFar ***REMOVED*** {

    // Comma and first run
    if ( !matched || (match = rcomma.exec( soFar ***REMOVED******REMOVED*** ***REMOVED*** {
      if ( match ***REMOVED*** {
        // Don't consume trailing commas as valid
        soFar = soFar.slice( match[0].length ***REMOVED*** || soFar;
  ***REMOVED***
      groups.push( tokens = [] ***REMOVED***;
***REMOVED***

    matched = false;

    // Combinators
    if ( (match = rcombinators.exec( soFar ***REMOVED******REMOVED*** ***REMOVED*** {
      matched = match.shift(***REMOVED***;
      tokens.push({
        value: matched,
        // Cast descendant combinators to space
        type: match[0].replace( rtrim, " " ***REMOVED***
  ***REMOVED******REMOVED***;
      soFar = soFar.slice( matched.length ***REMOVED***;
***REMOVED***

    // Filters
    for ( type in Expr.filter ***REMOVED*** {
      if ( (match = matchExpr[ type ].exec( soFar ***REMOVED******REMOVED*** && (!preFilters[ type ] ||
        (match = preFilters[ type ]( match ***REMOVED******REMOVED******REMOVED*** ***REMOVED*** {
        matched = match.shift(***REMOVED***;
        tokens.push({
          value: matched,
          type: type,
          matches: match
    ***REMOVED******REMOVED***;
        soFar = soFar.slice( matched.length ***REMOVED***;
  ***REMOVED***
***REMOVED***

    if ( !matched ***REMOVED*** {
      break;
***REMOVED***
  ***REMOVED***

  // Return the length of the invalid excess
  // if we're just parsing
  // Otherwise, throw an error or return tokens
  return parseOnly ?
    soFar.length :
    soFar ?
      Sizzle.error( selector ***REMOVED*** :
      // Cache the tokens
      tokenCache( selector, groups ***REMOVED***.slice( 0 ***REMOVED***;
***REMOVED***

function toSelector( tokens ***REMOVED*** {
  var i = 0,
    len = tokens.length,
    selector = "";
  for ( ; i < len; i++ ***REMOVED*** {
    selector += tokens[i].value;
  ***REMOVED***
  return selector;
***REMOVED***

function addCombinator( matcher, combinator, base ***REMOVED*** {
  var dir = combinator.dir,
    checkNonElements = base && dir === "parentNode",
    doneName = done++;

  return combinator.first ?
    // Check against closest ancestor/preceding element
    function( elem, context, xml ***REMOVED*** {
      while ( (elem = elem[ dir ]***REMOVED*** ***REMOVED*** {
        if ( elem.nodeType === 1 || checkNonElements ***REMOVED*** {
          return matcher( elem, context, xml ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED*** :

    // Check against all ancestor/preceding elements
    function( elem, context, xml ***REMOVED*** {
      var data, cache, outerCache,
        dirkey = dirruns + " " + doneName;

      // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
      if ( xml ***REMOVED*** {
        while ( (elem = elem[ dir ]***REMOVED*** ***REMOVED*** {
          if ( elem.nodeType === 1 || checkNonElements ***REMOVED*** {
            if ( matcher( elem, context, xml ***REMOVED*** ***REMOVED*** {
              return true;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED*** else {
        while ( (elem = elem[ dir ]***REMOVED*** ***REMOVED*** {
          if ( elem.nodeType === 1 || checkNonElements ***REMOVED*** {
            outerCache = elem[ expando ] || (elem[ expando ] = {***REMOVED******REMOVED***;
            if ( (cache = outerCache[ dir ]***REMOVED*** && cache[0] === dirkey ***REMOVED*** {
              if ( (data = cache[1]***REMOVED*** === true || data === cachedruns ***REMOVED*** {
                return data === true;
          ***REMOVED***
        ***REMOVED*** else {
              cache = outerCache[ dir ] = [ dirkey ];
              cache[1] = matcher( elem, context, xml ***REMOVED*** || cachedruns;
              if ( cache[1] === true ***REMOVED*** {
                return true;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
***REMOVED***

function elementMatcher( matchers ***REMOVED*** {
  return matchers.length > 1 ?
    function( elem, context, xml ***REMOVED*** {
      var i = matchers.length;
      while ( i-- ***REMOVED*** {
        if ( !matchers[i]( elem, context, xml ***REMOVED*** ***REMOVED*** {
          return false;
    ***REMOVED***
  ***REMOVED***
      return true;
***REMOVED*** :
    matchers[0];
***REMOVED***

function condense( unmatched, map, filter, context, xml ***REMOVED*** {
  var elem,
    newUnmatched = [],
    i = 0,
    len = unmatched.length,
    mapped = map != null;

  for ( ; i < len; i++ ***REMOVED*** {
    if ( (elem = unmatched[i]***REMOVED*** ***REMOVED*** {
      if ( !filter || filter( elem, context, xml ***REMOVED*** ***REMOVED*** {
        newUnmatched.push( elem ***REMOVED***;
        if ( mapped ***REMOVED*** {
          map.push( i ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  return newUnmatched;
***REMOVED***

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ***REMOVED*** {
  if ( postFilter && !postFilter[ expando ] ***REMOVED*** {
    postFilter = setMatcher( postFilter ***REMOVED***;
  ***REMOVED***
  if ( postFinder && !postFinder[ expando ] ***REMOVED*** {
    postFinder = setMatcher( postFinder, postSelector ***REMOVED***;
  ***REMOVED***
  return markFunction(function( seed, results, context, xml ***REMOVED*** {
    var temp, i, elem,
      preMap = [],
      postMap = [],
      preexisting = results.length,

      // Get initial elements from seed or context
      elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ***REMOVED***,

      // Prefilter to get matcher input, preserving a map for seed-results synchronization
      matcherIn = preFilter && ( seed || !selector ***REMOVED*** ?
        condense( elems, preMap, preFilter, context, xml ***REMOVED*** :
        elems,

      matcherOut = matcher ?
        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
        postFinder || ( seed ? preFilter : preexisting || postFilter ***REMOVED*** ?

          // ...intermediate processing is necessary
          [] :

          // ...otherwise use results directly
          results :
        matcherIn;

    // Find primary matches
    if ( matcher ***REMOVED*** {
      matcher( matcherIn, matcherOut, context, xml ***REMOVED***;
***REMOVED***

    // Apply postFilter
    if ( postFilter ***REMOVED*** {
      temp = condense( matcherOut, postMap ***REMOVED***;
      postFilter( temp, [], context, xml ***REMOVED***;

      // Un-match failing elements by moving them back to matcherIn
      i = temp.length;
      while ( i-- ***REMOVED*** {
        if ( (elem = temp[i]***REMOVED*** ***REMOVED*** {
          matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    if ( seed ***REMOVED*** {
      if ( postFinder || preFilter ***REMOVED*** {
        if ( postFinder ***REMOVED*** {
          // Get the final matcherOut by condensing this intermediate into postFinder contexts
          temp = [];
          i = matcherOut.length;
          while ( i-- ***REMOVED*** {
            if ( (elem = matcherOut[i]***REMOVED*** ***REMOVED*** {
              // Restore matcherIn since elem is not yet a final match
              temp.push( (matcherIn[i] = elem***REMOVED*** ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
          postFinder( null, (matcherOut = []***REMOVED***, temp, xml ***REMOVED***;
    ***REMOVED***

        // Move matched elements from seed to results to keep them synchronized
        i = matcherOut.length;
        while ( i-- ***REMOVED*** {
          if ( (elem = matcherOut[i]***REMOVED*** &&
            (temp = postFinder ? indexOf.call( seed, elem ***REMOVED*** : preMap[i]***REMOVED*** > -1 ***REMOVED*** {

            seed[temp] = !(results[temp] = elem***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

    // Add elements to results, through postFinder if defined
***REMOVED*** else {
      matcherOut = condense(
        matcherOut === results ?
          matcherOut.splice( preexisting, matcherOut.length ***REMOVED*** :
          matcherOut
      ***REMOVED***;
      if ( postFinder ***REMOVED*** {
        postFinder( null, results, matcherOut, xml ***REMOVED***;
  ***REMOVED*** else {
        push.apply( results, matcherOut ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***

function matcherFromTokens( tokens ***REMOVED*** {
  var checkContext, matcher, j,
    len = tokens.length,
    leadingRelative = Expr.relative[ tokens[0].type ],
    implicitRelative = leadingRelative || Expr.relative[" "],
    i = leadingRelative ? 1 : 0,

    // The foundational matcher ensures that elements are reachable from top-level context(s***REMOVED***
    matchContext = addCombinator( function( elem ***REMOVED*** {
      return elem === checkContext;
***REMOVED***, implicitRelative, true ***REMOVED***,
    matchAnyContext = addCombinator( function( elem ***REMOVED*** {
      return indexOf.call( checkContext, elem ***REMOVED*** > -1;
***REMOVED***, implicitRelative, true ***REMOVED***,
    matchers = [ function( elem, context, xml ***REMOVED*** {
      return ( !leadingRelative && ( xml || context !== outermostContext ***REMOVED*** ***REMOVED*** || (
        (checkContext = context***REMOVED***.nodeType ?
          matchContext( elem, context, xml ***REMOVED*** :
          matchAnyContext( elem, context, xml ***REMOVED*** ***REMOVED***;
***REMOVED*** ];

  for ( ; i < len; i++ ***REMOVED*** {
    if ( (matcher = Expr.relative[ tokens[i].type ]***REMOVED*** ***REMOVED*** {
      matchers = [ addCombinator(elementMatcher( matchers ***REMOVED***, matcher***REMOVED*** ];
***REMOVED*** else {
      matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches ***REMOVED***;

      // Return special upon seeing a positional matcher
      if ( matcher[ expando ] ***REMOVED*** {
        // Find the next relative operator (if any***REMOVED*** for proper handling
        j = ++i;
        for ( ; j < len; j++ ***REMOVED*** {
          if ( Expr.relative[ tokens[j].type ] ***REMOVED*** {
            break;
      ***REMOVED***
    ***REMOVED***
        return setMatcher(
          i > 1 && elementMatcher( matchers ***REMOVED***,
          i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice( 0, i - 1 ***REMOVED***.concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" ***REMOVED******REMOVED***
          ***REMOVED***.replace( rtrim, "$1" ***REMOVED***,
          matcher,
          i < j && matcherFromTokens( tokens.slice( i, j ***REMOVED*** ***REMOVED***,
          j < len && matcherFromTokens( (tokens = tokens.slice( j ***REMOVED******REMOVED*** ***REMOVED***,
          j < len && toSelector( tokens ***REMOVED***
        ***REMOVED***;
  ***REMOVED***
      matchers.push( matcher ***REMOVED***;
***REMOVED***
  ***REMOVED***

  return elementMatcher( matchers ***REMOVED***;
***REMOVED***

function matcherFromGroupMatchers( elementMatchers, setMatchers ***REMOVED*** {
  // A counter to specify which element is currently being matched
  var matcherCachedRuns = 0,
    bySet = setMatchers.length > 0,
    byElement = elementMatchers.length > 0,
    superMatcher = function( seed, context, xml, results, expandContext ***REMOVED*** {
      var elem, j, matcher,
        setMatched = [],
        matchedCount = 0,
        i = "0",
        unmatched = seed && [],
        outermost = expandContext != null,
        contextBackup = outermostContext,
        // We must always have either seed elements or context
        elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ***REMOVED***,
        // Use integer dirruns iff this is the outermost matcher
        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random(***REMOVED*** || 0.1***REMOVED***;

      if ( outermost ***REMOVED*** {
        outermostContext = context !== document && context;
        cachedruns = matcherCachedRuns;
  ***REMOVED***

      // Add elements passing elementMatchers directly to results
      // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
      for ( ; (elem = elems[i]***REMOVED*** != null; i++ ***REMOVED*** {
        if ( byElement && elem ***REMOVED*** {
          j = 0;
          while ( (matcher = elementMatchers[j++]***REMOVED*** ***REMOVED*** {
            if ( matcher( elem, context, xml ***REMOVED*** ***REMOVED*** {
              results.push( elem ***REMOVED***;
              break;
        ***REMOVED***
      ***REMOVED***
          if ( outermost ***REMOVED*** {
            dirruns = dirrunsUnique;
            cachedruns = ++matcherCachedRuns;
      ***REMOVED***
    ***REMOVED***

        // Track unmatched elements for set filters
        if ( bySet ***REMOVED*** {
          // They will have gone through all possible matchers
          if ( (elem = !matcher && elem***REMOVED*** ***REMOVED*** {
            matchedCount--;
      ***REMOVED***

          // Lengthen the array for every element, matched or not
          if ( seed ***REMOVED*** {
            unmatched.push( elem ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      // Apply set filters to unmatched elements
      matchedCount += i;
      if ( bySet && i !== matchedCount ***REMOVED*** {
        j = 0;
        while ( (matcher = setMatchers[j++]***REMOVED*** ***REMOVED*** {
          matcher( unmatched, setMatched, context, xml ***REMOVED***;
    ***REMOVED***

        if ( seed ***REMOVED*** {
          // Reintegrate element matches to eliminate the need for sorting
          if ( matchedCount > 0 ***REMOVED*** {
            while ( i-- ***REMOVED*** {
              if ( !(unmatched[i] || setMatched[i]***REMOVED*** ***REMOVED*** {
                setMatched[i] = pop.call( results ***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***

          // Discard index placeholder values to get only actual matches
          setMatched = condense( setMatched ***REMOVED***;
    ***REMOVED***

        // Add matches to results
        push.apply( results, setMatched ***REMOVED***;

        // Seedless set matches succeeding multiple successful matchers stipulate sorting
        if ( outermost && !seed && setMatched.length > 0 &&
          ( matchedCount + setMatchers.length ***REMOVED*** > 1 ***REMOVED*** {

          Sizzle.uniqueSort( results ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      // Override manipulation of globals by nested matchers
      if ( outermost ***REMOVED*** {
        dirruns = dirrunsUnique;
        outermostContext = contextBackup;
  ***REMOVED***

      return unmatched;
***REMOVED***;

  return bySet ?
    markFunction( superMatcher ***REMOVED*** :
    superMatcher;
***REMOVED***

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ***REMOVED*** {
  var i,
    setMatchers = [],
    elementMatchers = [],
    cached = compilerCache[ selector + " " ];

  if ( !cached ***REMOVED*** {
    // Generate a function of recursive functions that can be used to check each element
    if ( !group ***REMOVED*** {
      group = tokenize( selector ***REMOVED***;
***REMOVED***
    i = group.length;
    while ( i-- ***REMOVED*** {
      cached = matcherFromTokens( group[i] ***REMOVED***;
      if ( cached[ expando ] ***REMOVED*** {
        setMatchers.push( cached ***REMOVED***;
  ***REMOVED*** else {
        elementMatchers.push( cached ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Cache the compiled function
    cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ***REMOVED*** ***REMOVED***;
  ***REMOVED***
  return cached;
***REMOVED***;

function multipleContexts( selector, contexts, results ***REMOVED*** {
  var i = 0,
    len = contexts.length;
  for ( ; i < len; i++ ***REMOVED*** {
    Sizzle( selector, contexts[i], results ***REMOVED***;
  ***REMOVED***
  return results;
***REMOVED***

function select( selector, context, results, seed ***REMOVED*** {
  var i, tokens, token, type, find,
    match = tokenize( selector ***REMOVED***;

  if ( !seed ***REMOVED*** {
    // Try to minimize operations if there is only one group
    if ( match.length === 1 ***REMOVED*** {

      // Take a shortcut and set the context if the root selector is an ID
      tokens = match[0] = match[0].slice( 0 ***REMOVED***;
      if ( tokens.length > 2 && (token = tokens[0]***REMOVED***.type === "ID" &&
          support.getById && context.nodeType === 9 && documentIsHTML &&
          Expr.relative[ tokens[1].type ] ***REMOVED*** {

        context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape***REMOVED***, context ***REMOVED*** || [] ***REMOVED***[0];
        if ( !context ***REMOVED*** {
          return results;
    ***REMOVED***
        selector = selector.slice( tokens.shift(***REMOVED***.value.length ***REMOVED***;
  ***REMOVED***

      // Fetch a seed set for right-to-left matching
      i = matchExpr["needsContext"].test( selector ***REMOVED*** ? 0 : tokens.length;
      while ( i-- ***REMOVED*** {
        token = tokens[i];

        // Abort if we hit a combinator
        if ( Expr.relative[ (type = token.type***REMOVED*** ] ***REMOVED*** {
          break;
    ***REMOVED***
        if ( (find = Expr.find[ type ]***REMOVED*** ***REMOVED*** {
          // Search, expanding context for leading sibling combinators
          if ( (seed = find(
            token.matches[0].replace( runescape, funescape ***REMOVED***,
            rsibling.test( tokens[0].type ***REMOVED*** && context.parentNode || context
          ***REMOVED******REMOVED*** ***REMOVED*** {

            // If seed is empty or no tokens remain, we can return early
            tokens.splice( i, 1 ***REMOVED***;
            selector = seed.length && toSelector( tokens ***REMOVED***;
            if ( !selector ***REMOVED*** {
              push.apply( results, seed ***REMOVED***;
              return results;
        ***REMOVED***

            break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // Compile and execute a filtering function
  // Provide `match` to avoid retokenization if we modified the selector above
  compile( selector, match ***REMOVED***(
    seed,
    context,
    !documentIsHTML,
    results,
    rsibling.test( selector ***REMOVED***
  ***REMOVED***;
  return results;
***REMOVED***

// One-time assignments

// Sort stability
support.sortStable = expando.split(""***REMOVED***.sort( sortOrder ***REMOVED***.join(""***REMOVED*** === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument(***REMOVED***;

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27***REMOVED***
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ***REMOVED*** {
  // Should return 1, but returns 4 (following***REMOVED***
  return div1.compareDocumentPosition( document.createElement("div"***REMOVED*** ***REMOVED*** & 1;
***REMOVED******REMOVED***;

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ***REMOVED*** {
  div.innerHTML = "<a href='#'></a>";
  return div.firstChild.getAttribute("href"***REMOVED*** === "#" ;
***REMOVED******REMOVED*** ***REMOVED*** {
  addHandle( "type|href|height|width", function( elem, name, isXML ***REMOVED*** {
    if ( !isXML ***REMOVED*** {
      return elem.getAttribute( name, name.toLowerCase(***REMOVED*** === "type" ? 1 : 2 ***REMOVED***;
***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***

// Support: IE<9
// Use defaultValue in place of getAttribute("value"***REMOVED***
if ( !support.attributes || !assert(function( div ***REMOVED*** {
  div.innerHTML = "<input/>";
  div.firstChild.setAttribute( "value", "" ***REMOVED***;
  return div.firstChild.getAttribute( "value" ***REMOVED*** === "";
***REMOVED******REMOVED*** ***REMOVED*** {
  addHandle( "value", function( elem, name, isXML ***REMOVED*** {
    if ( !isXML && elem.nodeName.toLowerCase(***REMOVED*** === "input" ***REMOVED*** {
      return elem.defaultValue;
***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ***REMOVED*** {
  return div.getAttribute("disabled"***REMOVED*** == null;
***REMOVED******REMOVED*** ***REMOVED*** {
  addHandle( booleans, function( elem, name, isXML ***REMOVED*** {
    var val;
    if ( !isXML ***REMOVED*** {
      return (val = elem.getAttributeNode( name ***REMOVED******REMOVED*** && val.specified ?
        val.value :
        elem[ name ] === true ? name.toLowerCase(***REMOVED*** : null;
***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


***REMOVED******REMOVED***( window ***REMOVED***;
// String to Object options format cache
var optionsCache = {***REMOVED***;

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ***REMOVED*** {
  var object = optionsCache[ options ] = {***REMOVED***;
  jQuery.each( options.match( core_rnotwhite ***REMOVED*** || [], function( _, flag ***REMOVED*** {
    object[ flag ] = true;
  ***REMOVED******REMOVED***;
  return object;
***REMOVED***

/*
 * Create a callback list using the following parameters:
 *
 *  options: an optional list of space-separated options that will change how
 *      the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *  once:     will ensure the callback list can only be fired once (like a Deferred***REMOVED***
 *
 *  memory:     will keep track of previous values and will call any callback added
 *          after the list has been fired right away with the latest "memorized"
 *          values (like a Deferred***REMOVED***
 *
 *  unique:     will ensure a callback can only be added once (no duplicate in the list***REMOVED***
 *
 *  stopOnFalse:  interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ***REMOVED*** {

  // Convert options from String-formatted to Object-formatted if needed
  // (we check in cache first***REMOVED***
  options = typeof options === "string" ?
    ( optionsCache[ options ] || createOptions( options ***REMOVED*** ***REMOVED*** :
    jQuery.extend( {***REMOVED***, options ***REMOVED***;

  var // Last fire value (for non-forgettable lists***REMOVED***
    memory,
    // Flag to know if list was already fired
    fired,
    // Flag to know if list is currently firing
    firing,
    // First callback to fire (used internally by add and fireWith***REMOVED***
    firingStart,
    // End of the loop when firing
    firingLength,
    // Index of currently firing callback (modified by remove if needed***REMOVED***
    firingIndex,
    // Actual callback list
    list = [],
    // Stack of fire calls for repeatable lists
    stack = !options.once && [],
    // Fire callbacks
    fire = function( data ***REMOVED*** {
      memory = options.memory && data;
      fired = true;
      firingIndex = firingStart || 0;
      firingStart = 0;
      firingLength = list.length;
      firing = true;
      for ( ; list && firingIndex < firingLength; firingIndex++ ***REMOVED*** {
        if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ***REMOVED*** === false && options.stopOnFalse ***REMOVED*** {
          memory = false; // To prevent further calls using add
          break;
    ***REMOVED***
  ***REMOVED***
      firing = false;
      if ( list ***REMOVED*** {
        if ( stack ***REMOVED*** {
          if ( stack.length ***REMOVED*** {
            fire( stack.shift(***REMOVED*** ***REMOVED***;
      ***REMOVED***
    ***REMOVED*** else if ( memory ***REMOVED*** {
          list = [];
    ***REMOVED*** else {
          self.disable(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***,
    // Actual Callbacks object
    self = {
      // Add a callback or a collection of callbacks to the list
      add: function(***REMOVED*** {
        if ( list ***REMOVED*** {
          // First, we save the current length
          var start = list.length;
          (function add( args ***REMOVED*** {
            jQuery.each( args, function( _, arg ***REMOVED*** {
              var type = jQuery.type( arg ***REMOVED***;
              if ( type === "function" ***REMOVED*** {
                if ( !options.unique || !self.has( arg ***REMOVED*** ***REMOVED*** {
                  list.push( arg ***REMOVED***;
            ***REMOVED***
          ***REMOVED*** else if ( arg && arg.length && type !== "string" ***REMOVED*** {
                // Inspect recursively
                add( arg ***REMOVED***;
          ***REMOVED***
        ***REMOVED******REMOVED***;
      ***REMOVED******REMOVED***( arguments ***REMOVED***;
          // Do we need to add the callbacks to the
          // current firing batch?
          if ( firing ***REMOVED*** {
            firingLength = list.length;
          // With memory, if we're not firing then
          // we should call right away
      ***REMOVED*** else if ( memory ***REMOVED*** {
            firingStart = start;
            fire( memory ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
        return this;
  ***REMOVED***,
      // Remove a callback from the list
      remove: function(***REMOVED*** {
        if ( list ***REMOVED*** {
          jQuery.each( arguments, function( _, arg ***REMOVED*** {
            var index;
            while( ( index = jQuery.inArray( arg, list, index ***REMOVED*** ***REMOVED*** > -1 ***REMOVED*** {
              list.splice( index, 1 ***REMOVED***;
              // Handle firing indexes
              if ( firing ***REMOVED*** {
                if ( index <= firingLength ***REMOVED*** {
                  firingLength--;
            ***REMOVED***
                if ( index <= firingIndex ***REMOVED*** {
                  firingIndex--;
            ***REMOVED***
          ***REMOVED***
        ***REMOVED***
      ***REMOVED******REMOVED***;
    ***REMOVED***
        return this;
  ***REMOVED***,
      // Check if a given callback is in the list.
      // If no argument is given, return whether or not list has callbacks attached.
      has: function( fn ***REMOVED*** {
        return fn ? jQuery.inArray( fn, list ***REMOVED*** > -1 : !!( list && list.length ***REMOVED***;
  ***REMOVED***,
      // Remove all callbacks from the list
      empty: function(***REMOVED*** {
        list = [];
        firingLength = 0;
        return this;
  ***REMOVED***,
      // Have the list do nothing anymore
      disable: function(***REMOVED*** {
        list = stack = memory = undefined;
        return this;
  ***REMOVED***,
      // Is it disabled?
      disabled: function(***REMOVED*** {
        return !list;
  ***REMOVED***,
      // Lock the list in its current state
      lock: function(***REMOVED*** {
        stack = undefined;
        if ( !memory ***REMOVED*** {
          self.disable(***REMOVED***;
    ***REMOVED***
        return this;
  ***REMOVED***,
      // Is it locked?
      locked: function(***REMOVED*** {
        return !stack;
  ***REMOVED***,
      // Call all callbacks with the given context and arguments
      fireWith: function( context, args ***REMOVED*** {
        if ( list && ( !fired || stack ***REMOVED*** ***REMOVED*** {
          args = args || [];
          args = [ context, args.slice ? args.slice(***REMOVED*** : args ];
          if ( firing ***REMOVED*** {
            stack.push( args ***REMOVED***;
      ***REMOVED*** else {
            fire( args ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
        return this;
  ***REMOVED***,
      // Call all the callbacks with the given arguments
      fire: function(***REMOVED*** {
        self.fireWith( this, arguments ***REMOVED***;
        return this;
  ***REMOVED***,
      // To know if the callbacks have already been called at least once
      fired: function(***REMOVED*** {
        return !!fired;
  ***REMOVED***
***REMOVED***;

  return self;
***REMOVED***;
jQuery.extend({

  Deferred: function( func ***REMOVED*** {
    var tuples = [
        // action, add listener, listener list, final state
        [ "resolve", "done", jQuery.Callbacks("once memory"***REMOVED***, "resolved" ],
        [ "reject", "fail", jQuery.Callbacks("once memory"***REMOVED***, "rejected" ],
        [ "notify", "progress", jQuery.Callbacks("memory"***REMOVED*** ]
  ***REMOVED***
      state = "pending",
      promise = {
        state: function(***REMOVED*** {
          return state;
    ***REMOVED***,
        always: function(***REMOVED*** {
          deferred.done( arguments ***REMOVED***.fail( arguments ***REMOVED***;
          return this;
    ***REMOVED***,
        then: function( /* fnDone, fnFail, fnProgress */ ***REMOVED*** {
          var fns = arguments;
          return jQuery.Deferred(function( newDefer ***REMOVED*** {
            jQuery.each( tuples, function( i, tuple ***REMOVED*** {
              var action = tuple[ 0 ],
                fn = jQuery.isFunction( fns[ i ] ***REMOVED*** && fns[ i ];
              // deferred[ done | fail | progress ] for forwarding actions to newDefer
              deferred[ tuple[1] ](function(***REMOVED*** {
                var returned = fn && fn.apply( this, arguments ***REMOVED***;
                if ( returned && jQuery.isFunction( returned.promise ***REMOVED*** ***REMOVED*** {
                  returned.promise(***REMOVED***
                    .done( newDefer.resolve ***REMOVED***
                    .fail( newDefer.reject ***REMOVED***
                    .progress( newDefer.notify ***REMOVED***;
            ***REMOVED*** else {
                  newDefer[ action + "With" ]( this === promise ? newDefer.promise(***REMOVED*** : this, fn ? [ returned ] : arguments ***REMOVED***;
            ***REMOVED***
          ***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;
            fns = null;
      ***REMOVED******REMOVED***.promise(***REMOVED***;
    ***REMOVED***,
        // Get a promise for this deferred
        // If obj is provided, the promise aspect is added to the object
        promise: function( obj ***REMOVED*** {
          return obj != null ? jQuery.extend( obj, promise ***REMOVED*** : promise;
    ***REMOVED***
  ***REMOVED***,
      deferred = {***REMOVED***;

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    jQuery.each( tuples, function( i, tuple ***REMOVED*** {
      var list = tuple[ 2 ],
        stateString = tuple[ 3 ];

      // promise[ done | fail | progress ] = list.add
      promise[ tuple[1] ] = list.add;

      // Handle state
      if ( stateString ***REMOVED*** {
        list.add(function(***REMOVED*** {
          // state = [ resolved | rejected ]
          state = stateString;

        // [ reject_list | resolve_list ].disable; progress_list.lock
    ***REMOVED***, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock ***REMOVED***;
  ***REMOVED***

      // deferred[ resolve | reject | notify ]
      deferred[ tuple[0] ] = function(***REMOVED*** {
        deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments ***REMOVED***;
        return this;
  ***REMOVED***;
      deferred[ tuple[0] + "With" ] = list.fireWith;
***REMOVED******REMOVED***;

    // Make the deferred a promise
    promise.promise( deferred ***REMOVED***;

    // Call given func if any
    if ( func ***REMOVED*** {
      func.call( deferred, deferred ***REMOVED***;
***REMOVED***

    // All done!
    return deferred;
  ***REMOVED***,

  // Deferred helper
  when: function( subordinate /* , ..., subordinateN */ ***REMOVED*** {
    var i = 0,
      resolveValues = core_slice.call( arguments ***REMOVED***,
      length = resolveValues.length,

      // the count of uncompleted subordinates
      remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ***REMOVED*** ***REMOVED*** ? length : 0,

      // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
      deferred = remaining === 1 ? subordinate : jQuery.Deferred(***REMOVED***,

      // Update function for both resolve and progress values
      updateFunc = function( i, contexts, values ***REMOVED*** {
        return function( value ***REMOVED*** {
          contexts[ i ] = this;
          values[ i ] = arguments.length > 1 ? core_slice.call( arguments ***REMOVED*** : value;
          if( values === progressValues ***REMOVED*** {
            deferred.notifyWith( contexts, values ***REMOVED***;
      ***REMOVED*** else if ( !( --remaining ***REMOVED*** ***REMOVED*** {
            deferred.resolveWith( contexts, values ***REMOVED***;
      ***REMOVED***
    ***REMOVED***;
  ***REMOVED***,

      progressValues, progressContexts, resolveContexts;

    // add listeners to Deferred subordinates; treat others as resolved
    if ( length > 1 ***REMOVED*** {
      progressValues = new Array( length ***REMOVED***;
      progressContexts = new Array( length ***REMOVED***;
      resolveContexts = new Array( length ***REMOVED***;
      for ( ; i < length; i++ ***REMOVED*** {
        if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ***REMOVED*** ***REMOVED*** {
          resolveValues[ i ].promise(***REMOVED***
            .done( updateFunc( i, resolveContexts, resolveValues ***REMOVED*** ***REMOVED***
            .fail( deferred.reject ***REMOVED***
            .progress( updateFunc( i, progressContexts, progressValues ***REMOVED*** ***REMOVED***;
    ***REMOVED*** else {
          --remaining;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // if we're not waiting on anything, resolve the master
    if ( !remaining ***REMOVED*** {
      deferred.resolveWith( resolveContexts, resolveValues ***REMOVED***;
***REMOVED***

    return deferred.promise(***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
jQuery.support = (function( support ***REMOVED*** {
  var input = document.createElement("input"***REMOVED***,
    fragment = document.createDocumentFragment(***REMOVED***,
    div = document.createElement("div"***REMOVED***,
    select = document.createElement("select"***REMOVED***,
    opt = select.appendChild( document.createElement("option"***REMOVED*** ***REMOVED***;

  // Finish early in limited environments
  if ( !input.type ***REMOVED*** {
    return support;
  ***REMOVED***

  input.type = "checkbox";

  // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
  // Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere***REMOVED***
  support.checkOn = input.value !== "";

  // Must access the parent to make an option select properly
  // Support: IE9, IE10
  support.optSelected = opt.selected;

  // Will be defined later
  support.reliableMarginRight = true;
  support.boxSizingReliable = true;
  support.pixelPosition = false;

  // Make sure checked status is properly cloned
  // Support: IE9, IE10
  input.checked = true;
  support.noCloneChecked = input.cloneNode( true ***REMOVED***.checked;

  // Make sure that the options inside disabled selects aren't marked as disabled
  // (WebKit marks them as disabled***REMOVED***
  select.disabled = true;
  support.optDisabled = !opt.disabled;

  // Check if an input maintains its value after becoming a radio
  // Support: IE9, IE10
  input = document.createElement("input"***REMOVED***;
  input.value = "t";
  input.type = "radio";
  support.radioValue = input.value === "t";

  // #11217 - WebKit loses check when the name is after the checked attribute
  input.setAttribute( "checked", "t" ***REMOVED***;
  input.setAttribute( "name", "t" ***REMOVED***;

  fragment.appendChild( input ***REMOVED***;

  // Support: Safari 5.1, Android 4.x, Android 2.3
  // old WebKit doesn't clone checked state correctly in fragments
  support.checkClone = fragment.cloneNode( true ***REMOVED***.cloneNode( true ***REMOVED***.lastChild.checked;

  // Support: Firefox, Chrome, Safari
  // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP***REMOVED***
  support.focusinBubbles = "onfocusin" in window;

  div.style.backgroundClip = "content-box";
  div.cloneNode( true ***REMOVED***.style.backgroundClip = "";
  support.clearCloneStyle = div.style.backgroundClip === "content-box";

  // Run tests that need a body at doc ready
  jQuery(function(***REMOVED*** {
    var container, marginDiv,
      // Support: Firefox, Android 2.3 (Prefixed box-sizing versions***REMOVED***.
      divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
      body = document.getElementsByTagName("body"***REMOVED***[ 0 ];

    if ( !body ***REMOVED*** {
      // Return for frameset docs that don't have a body
      return;
***REMOVED***

    container = document.createElement("div"***REMOVED***;
    container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

    // Check box-sizing and margin behavior.
    body.appendChild( container ***REMOVED***.appendChild( div ***REMOVED***;
    div.innerHTML = "";
    // Support: Firefox, Android 2.3 (Prefixed box-sizing versions***REMOVED***.
    div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

    // Workaround failing boxSizing test due to offsetWidth returning wrong value
    // with some non-1 values of body zoom, ticket #13543
    jQuery.swap( body, body.style.zoom != null ? { zoom: 1 ***REMOVED*** : {***REMOVED***, function(***REMOVED*** {
      support.boxSizing = div.offsetWidth === 4;
***REMOVED******REMOVED***;

    // Use window.getComputedStyle because jsdom on node.js will break without it.
    if ( window.getComputedStyle ***REMOVED*** {
      support.pixelPosition = ( window.getComputedStyle( div, null ***REMOVED*** || {***REMOVED*** ***REMOVED***.top !== "1%";
      support.boxSizingReliable = ( window.getComputedStyle( div, null ***REMOVED*** || { width: "4px" ***REMOVED*** ***REMOVED***.width === "4px";

      // Support: Android 2.3
      // Check if div with explicit width and no margin-right incorrectly
      // gets computed margin-right based on width of container. (#3333***REMOVED***
      // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
      marginDiv = div.appendChild( document.createElement("div"***REMOVED*** ***REMOVED***;
      marginDiv.style.cssText = div.style.cssText = divReset;
      marginDiv.style.marginRight = marginDiv.style.width = "0";
      div.style.width = "1px";

      support.reliableMarginRight =
        !parseFloat( ( window.getComputedStyle( marginDiv, null ***REMOVED*** || {***REMOVED*** ***REMOVED***.marginRight ***REMOVED***;
***REMOVED***

    body.removeChild( container ***REMOVED***;
  ***REMOVED******REMOVED***;

  return support;
***REMOVED******REMOVED***( {***REMOVED*** ***REMOVED***;

/*
  Implementation Summary

  1. Enforce API surface and semantic compatibility with 1.9.x branch
  2. Improve the module's maintainability by reducing the storage
    paths to a single mechanism.
  3. Use the same single mechanism to support "private" and "user" data.
  4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData***REMOVED***
  5. Avoid exposing implementation details on user objects (eg. expando properties***REMOVED***
  6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
  rbrace = /(?:\{[\s\S]*\***REMOVED***|\[[\s\S]*\]***REMOVED***$/,
  rmultiDash = /([A-Z]***REMOVED***/g;

function Data(***REMOVED*** {
  // Support: Android < 4,
  // Old WebKit does not have Object.preventExtensions/freeze method,
  // return new empty object instead with no [[set]] accessor
  Object.defineProperty( this.cache = {***REMOVED***, 0, {
    get: function(***REMOVED*** {
      return {***REMOVED***;
***REMOVED***
  ***REMOVED******REMOVED***;

  this.expando = jQuery.expando + Math.random(***REMOVED***;
***REMOVED***

Data.uid = 1;

Data.accepts = function( owner ***REMOVED*** {
  // Accepts only:
  //  - Node
  //    - Node.ELEMENT_NODE
  //    - Node.DOCUMENT_NODE
  //  - Object
  //    - Any
  return owner.nodeType ?
    owner.nodeType === 1 || owner.nodeType === 9 : true;
***REMOVED***;

Data.prototype = {
  key: function( owner ***REMOVED*** {
    // We can accept data for non-element nodes in modern browsers,
    // but we should not, see #8335.
    // Always return the key for a frozen object.
    if ( !Data.accepts( owner ***REMOVED*** ***REMOVED*** {
      return 0;
***REMOVED***

    var descriptor = {***REMOVED***,
      // Check if the owner object already has a cache key
      unlock = owner[ this.expando ];

    // If not, create one
    if ( !unlock ***REMOVED*** {
      unlock = Data.uid++;

      // Secure it in a non-enumerable, non-writable property
      try {
        descriptor[ this.expando ] = { value: unlock ***REMOVED***;
        Object.defineProperties( owner, descriptor ***REMOVED***;

      // Support: Android < 4
      // Fallback to a less secure definition
  ***REMOVED*** catch ( e ***REMOVED*** {
        descriptor[ this.expando ] = unlock;
        jQuery.extend( owner, descriptor ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Ensure the cache object
    if ( !this.cache[ unlock ] ***REMOVED*** {
      this.cache[ unlock ] = {***REMOVED***;
***REMOVED***

    return unlock;
  ***REMOVED***,
  set: function( owner, data, value ***REMOVED*** {
    var prop,
      // There may be an unlock assigned to this node,
      // if there is no entry for this "owner", create one inline
      // and set the unlock as though an owner entry had always existed
      unlock = this.key( owner ***REMOVED***,
      cache = this.cache[ unlock ];

    // Handle: [ owner, key, value ] args
    if ( typeof data === "string" ***REMOVED*** {
      cache[ data ] = value;

    // Handle: [ owner, { properties ***REMOVED*** ] args
***REMOVED*** else {
      // Fresh assignments by object are shallow copied
      if ( jQuery.isEmptyObject( cache ***REMOVED*** ***REMOVED*** {
        jQuery.extend( this.cache[ unlock ], data ***REMOVED***;
      // Otherwise, copy the properties one-by-one to the cache object
  ***REMOVED*** else {
        for ( prop in data ***REMOVED*** {
          cache[ prop ] = data[ prop ];
    ***REMOVED***
  ***REMOVED***
***REMOVED***
    return cache;
  ***REMOVED***,
  get: function( owner, key ***REMOVED*** {
    // Either a valid cache is found, or will be created.
    // New caches will be created and the unlock returned,
    // allowing direct access to the newly created
    // empty data object. A valid owner object must be provided.
    var cache = this.cache[ this.key( owner ***REMOVED*** ];

    return key === undefined ?
      cache : cache[ key ];
  ***REMOVED***,
  access: function( owner, key, value ***REMOVED*** {
    var stored;
    // In cases where either:
    //
    //   1. No key was specified
    //   2. A string key was specified, but no value provided
    //
    // Take the "read" path and allow the get method to determine
    // which value to return, respectively either:
    //
    //   1. The entire cache object
    //   2. The data stored at the key
    //
    if ( key === undefined ||
        ((key && typeof key === "string"***REMOVED*** && value === undefined***REMOVED*** ***REMOVED*** {

      stored = this.get( owner, key ***REMOVED***;

      return stored !== undefined ?
        stored : this.get( owner, jQuery.camelCase(key***REMOVED*** ***REMOVED***;
***REMOVED***

    // [*]When the key is not a string, or both a key and value
    // are specified, set or extend (existing objects***REMOVED*** with either:
    //
    //   1. An object of properties
    //   2. A key and value
    //
    this.set( owner, key, value ***REMOVED***;

    // Since the "set" path can have two possible entry points
    // return the expected data based on which path was taken[*]
    return value !== undefined ? value : key;
  ***REMOVED***,
  remove: function( owner, key ***REMOVED*** {
    var i, name, camel,
      unlock = this.key( owner ***REMOVED***,
      cache = this.cache[ unlock ];

    if ( key === undefined ***REMOVED*** {
      this.cache[ unlock ] = {***REMOVED***;

***REMOVED*** else {
      // Support array or space separated string of keys
      if ( jQuery.isArray( key ***REMOVED*** ***REMOVED*** {
        // If "name" is an array of keys...
        // When data is initially created, via ("key", "val"***REMOVED*** signature,
        // keys will be converted to camelCase.
        // Since there is no way to tell _how_ a key was added, remove
        // both plain key and camelCase key. #12786
        // This will only penalize the array argument path.
        name = key.concat( key.map( jQuery.camelCase ***REMOVED*** ***REMOVED***;
  ***REMOVED*** else {
        camel = jQuery.camelCase( key ***REMOVED***;
        // Try the string as a key before any manipulation
        if ( key in cache ***REMOVED*** {
          name = [ key, camel ];
    ***REMOVED*** else {
          // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace
          name = camel;
          name = name in cache ?
            [ name ] : ( name.match( core_rnotwhite ***REMOVED*** || [] ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      i = name.length;
      while ( i-- ***REMOVED*** {
        delete cache[ name[ i ] ];
  ***REMOVED***
***REMOVED***
  ***REMOVED***,
  hasData: function( owner ***REMOVED*** {
    return !jQuery.isEmptyObject(
      this.cache[ owner[ this.expando ] ] || {***REMOVED***
    ***REMOVED***;
  ***REMOVED***,
  discard: function( owner ***REMOVED*** {
    if ( owner[ this.expando ] ***REMOVED*** {
      delete this.cache[ owner[ this.expando ] ];
***REMOVED***
  ***REMOVED***
***REMOVED***;

// These may be used throughout the jQuery core codebase
data_user = new Data(***REMOVED***;
data_priv = new Data(***REMOVED***;


jQuery.extend({
  acceptData: Data.accepts,

  hasData: function( elem ***REMOVED*** {
    return data_user.hasData( elem ***REMOVED*** || data_priv.hasData( elem ***REMOVED***;
  ***REMOVED***,

  data: function( elem, name, data ***REMOVED*** {
    return data_user.access( elem, name, data ***REMOVED***;
  ***REMOVED***,

  removeData: function( elem, name ***REMOVED*** {
    data_user.remove( elem, name ***REMOVED***;
  ***REMOVED***,

  // TODO: Now that all calls to _data and _removeData have been replaced
  // with direct calls to data_priv methods, these can be deprecated.
  _data: function( elem, name, data ***REMOVED*** {
    return data_priv.access( elem, name, data ***REMOVED***;
  ***REMOVED***,

  _removeData: function( elem, name ***REMOVED*** {
    data_priv.remove( elem, name ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.fn.extend({
  data: function( key, value ***REMOVED*** {
    var attrs, name,
      elem = this[ 0 ],
      i = 0,
      data = null;

    // Gets all values
    if ( key === undefined ***REMOVED*** {
      if ( this.length ***REMOVED*** {
        data = data_user.get( elem ***REMOVED***;

        if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ***REMOVED*** ***REMOVED*** {
          attrs = elem.attributes;
          for ( ; i < attrs.length; i++ ***REMOVED*** {
            name = attrs[ i ].name;

            if ( name.indexOf( "data-" ***REMOVED*** === 0 ***REMOVED*** {
              name = jQuery.camelCase( name.slice(5***REMOVED*** ***REMOVED***;
              dataAttr( elem, name, data[ name ] ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
          data_priv.set( elem, "hasDataAttrs", true ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      return data;
***REMOVED***

    // Sets multiple values
    if ( typeof key === "object" ***REMOVED*** {
      return this.each(function(***REMOVED*** {
        data_user.set( this, key ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    return jQuery.access( this, function( value ***REMOVED*** {
      var data,
        camelKey = jQuery.camelCase( key ***REMOVED***;

      // The calling jQuery object (element matches***REMOVED*** is not empty
      // (and therefore has an element appears at this[ 0 ]***REMOVED*** and the
      // `value` parameter was not undefined. An empty jQuery object
      // will result in `undefined` for elem = this[ 0 ] which will
      // throw an exception if an attempt to read a data cache is made.
      if ( elem && value === undefined ***REMOVED*** {
        // Attempt to get data from the cache
        // with the key as-is
        data = data_user.get( elem, key ***REMOVED***;
        if ( data !== undefined ***REMOVED*** {
          return data;
    ***REMOVED***

        // Attempt to get data from the cache
        // with the key camelized
        data = data_user.get( elem, camelKey ***REMOVED***;
        if ( data !== undefined ***REMOVED*** {
          return data;
    ***REMOVED***

        // Attempt to "discover" the data in
        // HTML5 custom data-* attrs
        data = dataAttr( elem, camelKey, undefined ***REMOVED***;
        if ( data !== undefined ***REMOVED*** {
          return data;
    ***REMOVED***

        // We tried really hard, but the data doesn't exist.
        return;
  ***REMOVED***

      // Set the data...
      this.each(function(***REMOVED*** {
        // First, attempt to store a copy or reference of any
        // data that might've been store with a camelCased key.
        var data = data_user.get( this, camelKey ***REMOVED***;

        // For HTML5 data-* attribute interop, we have to
        // store property names with dashes in a camelCase form.
        // This might not apply to all properties...*
        data_user.set( this, camelKey, value ***REMOVED***;

        // *... In the case of properties that might _actually_
        // have dashes, we need to also store a copy of that
        // unchanged property.
        if ( key.indexOf("-"***REMOVED*** !== -1 && data !== undefined ***REMOVED*** {
          data_user.set( this, key, value ***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED***, null, value, arguments.length > 1, null, true ***REMOVED***;
  ***REMOVED***,

  removeData: function( key ***REMOVED*** {
    return this.each(function(***REMOVED*** {
      data_user.remove( this, key ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

function dataAttr( elem, key, data ***REMOVED*** {
  var name;

  // If nothing was found internally, try to fetch any
  // data from the HTML5 data-* attribute
  if ( data === undefined && elem.nodeType === 1 ***REMOVED*** {
    name = "data-" + key.replace( rmultiDash, "-$1" ***REMOVED***.toLowerCase(***REMOVED***;
    data = elem.getAttribute( name ***REMOVED***;

    if ( typeof data === "string" ***REMOVED*** {
      try {
        data = data === "true" ? true :
          data === "false" ? false :
          data === "null" ? null :
          // Only convert to a number if it doesn't change the string
          +data + "" === data ? +data :
          rbrace.test( data ***REMOVED*** ? JSON.parse( data ***REMOVED*** :
          data;
  ***REMOVED*** catch( e ***REMOVED*** {***REMOVED***

      // Make sure we set the data so it isn't changed later
      data_user.set( elem, key, data ***REMOVED***;
***REMOVED*** else {
      data = undefined;
***REMOVED***
  ***REMOVED***
  return data;
***REMOVED***
jQuery.extend({
  queue: function( elem, type, data ***REMOVED*** {
    var queue;

    if ( elem ***REMOVED*** {
      type = ( type || "fx" ***REMOVED*** + "queue";
      queue = data_priv.get( elem, type ***REMOVED***;

      // Speed up dequeue by getting out quickly if this is just a lookup
      if ( data ***REMOVED*** {
        if ( !queue || jQuery.isArray( data ***REMOVED*** ***REMOVED*** {
          queue = data_priv.access( elem, type, jQuery.makeArray(data***REMOVED*** ***REMOVED***;
    ***REMOVED*** else {
          queue.push( data ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
      return queue || [];
***REMOVED***
  ***REMOVED***,

  dequeue: function( elem, type ***REMOVED*** {
    type = type || "fx";

    var queue = jQuery.queue( elem, type ***REMOVED***,
      startLength = queue.length,
      fn = queue.shift(***REMOVED***,
      hooks = jQuery._queueHooks( elem, type ***REMOVED***,
      next = function(***REMOVED*** {
        jQuery.dequeue( elem, type ***REMOVED***;
  ***REMOVED***;

    // If the fx queue is dequeued, always remove the progress sentinel
    if ( fn === "inprogress" ***REMOVED*** {
      fn = queue.shift(***REMOVED***;
      startLength--;
***REMOVED***

    if ( fn ***REMOVED*** {

      // Add a progress sentinel to prevent the fx queue from being
      // automatically dequeued
      if ( type === "fx" ***REMOVED*** {
        queue.unshift( "inprogress" ***REMOVED***;
  ***REMOVED***

      // clear up the last queue stop function
      delete hooks.stop;
      fn.call( elem, next, hooks ***REMOVED***;
***REMOVED***

    if ( !startLength && hooks ***REMOVED*** {
      hooks.empty.fire(***REMOVED***;
***REMOVED***
  ***REMOVED***,

  // not intended for public consumption - generates a queueHooks object, or returns the current one
  _queueHooks: function( elem, type ***REMOVED*** {
    var key = type + "queueHooks";
    return data_priv.get( elem, key ***REMOVED*** || data_priv.access( elem, key, {
      empty: jQuery.Callbacks("once memory"***REMOVED***.add(function(***REMOVED*** {
        data_priv.remove( elem, [ type + "queue", key ] ***REMOVED***;
  ***REMOVED******REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.fn.extend({
  queue: function( type, data ***REMOVED*** {
    var setter = 2;

    if ( typeof type !== "string" ***REMOVED*** {
      data = type;
      type = "fx";
      setter--;
***REMOVED***

    if ( arguments.length < setter ***REMOVED*** {
      return jQuery.queue( this[0], type ***REMOVED***;
***REMOVED***

    return data === undefined ?
      this :
      this.each(function(***REMOVED*** {
        var queue = jQuery.queue( this, type, data ***REMOVED***;

        // ensure a hooks for this queue
        jQuery._queueHooks( this, type ***REMOVED***;

        if ( type === "fx" && queue[0] !== "inprogress" ***REMOVED*** {
          jQuery.dequeue( this, type ***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
  ***REMOVED***,
  dequeue: function( type ***REMOVED*** {
    return this.each(function(***REMOVED*** {
      jQuery.dequeue( this, type ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,
  // Based off of the plugin by Clint Helfers, with permission.
  // http://blindsignals.com/index.php/2009/07/jquery-delay/
  delay: function( time, type ***REMOVED*** {
    time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
    type = type || "fx";

    return this.queue( type, function( next, hooks ***REMOVED*** {
      var timeout = setTimeout( next, time ***REMOVED***;
      hooks.stop = function(***REMOVED*** {
        clearTimeout( timeout ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,
  clearQueue: function( type ***REMOVED*** {
    return this.queue( type || "fx", [] ***REMOVED***;
  ***REMOVED***,
  // Get a promise resolved when queues of a certain type
  // are emptied (fx is the type by default***REMOVED***
  promise: function( type, obj ***REMOVED*** {
    var tmp,
      count = 1,
      defer = jQuery.Deferred(***REMOVED***,
      elements = this,
      i = this.length,
      resolve = function(***REMOVED*** {
        if ( !( --count ***REMOVED*** ***REMOVED*** {
          defer.resolveWith( elements, [ elements ] ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;

    if ( typeof type !== "string" ***REMOVED*** {
      obj = type;
      type = undefined;
***REMOVED***
    type = type || "fx";

    while( i-- ***REMOVED*** {
      tmp = data_priv.get( elements[ i ], type + "queueHooks" ***REMOVED***;
      if ( tmp && tmp.empty ***REMOVED*** {
        count++;
        tmp.empty.add( resolve ***REMOVED***;
  ***REMOVED***
***REMOVED***
    resolve(***REMOVED***;
    return defer.promise( obj ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var nodeHook, boolHook,
  rclass = /[\t\r\n\f]/g,
  rreturn = /\r/g,
  rfocusable = /^(?:input|select|textarea|button***REMOVED***$/i;

jQuery.fn.extend({
  attr: function( name, value ***REMOVED*** {
    return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 ***REMOVED***;
  ***REMOVED***,

  removeAttr: function( name ***REMOVED*** {
    return this.each(function(***REMOVED*** {
      jQuery.removeAttr( this, name ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,

  prop: function( name, value ***REMOVED*** {
    return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 ***REMOVED***;
  ***REMOVED***,

  removeProp: function( name ***REMOVED*** {
    return this.each(function(***REMOVED*** {
      delete this[ jQuery.propFix[ name ] || name ];
***REMOVED******REMOVED***;
  ***REMOVED***,

  addClass: function( value ***REMOVED*** {
    var classes, elem, cur, clazz, j,
      i = 0,
      len = this.length,
      proceed = typeof value === "string" && value;

    if ( jQuery.isFunction( value ***REMOVED*** ***REMOVED*** {
      return this.each(function( j ***REMOVED*** {
        jQuery( this ***REMOVED***.addClass( value.call( this, j, this.className ***REMOVED*** ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    if ( proceed ***REMOVED*** {
      // The disjunction here is for better compressibility (see removeClass***REMOVED***
      classes = ( value || "" ***REMOVED***.match( core_rnotwhite ***REMOVED*** || [];

      for ( ; i < len; i++ ***REMOVED*** {
        elem = this[ i ];
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ***REMOVED***.replace( rclass, " " ***REMOVED*** :
          " "
        ***REMOVED***;

        if ( cur ***REMOVED*** {
          j = 0;
          while ( (clazz = classes[j++]***REMOVED*** ***REMOVED*** {
            if ( cur.indexOf( " " + clazz + " " ***REMOVED*** < 0 ***REMOVED*** {
              cur += clazz + " ";
        ***REMOVED***
      ***REMOVED***
          elem.className = jQuery.trim( cur ***REMOVED***;

    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return this;
  ***REMOVED***,

  removeClass: function( value ***REMOVED*** {
    var classes, elem, cur, clazz, j,
      i = 0,
      len = this.length,
      proceed = arguments.length === 0 || typeof value === "string" && value;

    if ( jQuery.isFunction( value ***REMOVED*** ***REMOVED*** {
      return this.each(function( j ***REMOVED*** {
        jQuery( this ***REMOVED***.removeClass( value.call( this, j, this.className ***REMOVED*** ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***
    if ( proceed ***REMOVED*** {
      classes = ( value || "" ***REMOVED***.match( core_rnotwhite ***REMOVED*** || [];

      for ( ; i < len; i++ ***REMOVED*** {
        elem = this[ i ];
        // This expression is here for better compressibility (see addClass***REMOVED***
        cur = elem.nodeType === 1 && ( elem.className ?
          ( " " + elem.className + " " ***REMOVED***.replace( rclass, " " ***REMOVED*** :
          ""
        ***REMOVED***;

        if ( cur ***REMOVED*** {
          j = 0;
          while ( (clazz = classes[j++]***REMOVED*** ***REMOVED*** {
            // Remove *all* instances
            while ( cur.indexOf( " " + clazz + " " ***REMOVED*** >= 0 ***REMOVED*** {
              cur = cur.replace( " " + clazz + " ", " " ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
          elem.className = value ? jQuery.trim( cur ***REMOVED*** : "";
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return this;
  ***REMOVED***,

  toggleClass: function( value, stateVal ***REMOVED*** {
    var type = typeof value;

    if ( typeof stateVal === "boolean" && type === "string" ***REMOVED*** {
      return stateVal ? this.addClass( value ***REMOVED*** : this.removeClass( value ***REMOVED***;
***REMOVED***

    if ( jQuery.isFunction( value ***REMOVED*** ***REMOVED*** {
      return this.each(function( i ***REMOVED*** {
        jQuery( this ***REMOVED***.toggleClass( value.call(this, i, this.className, stateVal***REMOVED***, stateVal ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    return this.each(function(***REMOVED*** {
      if ( type === "string" ***REMOVED*** {
        // toggle individual class names
        var className,
          i = 0,
          self = jQuery( this ***REMOVED***,
          classNames = value.match( core_rnotwhite ***REMOVED*** || [];

        while ( (className = classNames[ i++ ]***REMOVED*** ***REMOVED*** {
          // check each className given, space separated list
          if ( self.hasClass( className ***REMOVED*** ***REMOVED*** {
            self.removeClass( className ***REMOVED***;
      ***REMOVED*** else {
            self.addClass( className ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

      // Toggle whole class name
  ***REMOVED*** else if ( type === core_strundefined || type === "boolean" ***REMOVED*** {
        if ( this.className ***REMOVED*** {
          // store className if set
          data_priv.set( this, "__className__", this.className ***REMOVED***;
    ***REMOVED***

        // If the element has a class name or if we're passed "false",
        // then remove the whole classname (if there was one, the above saved it***REMOVED***.
        // Otherwise bring back whatever was previously saved (if anything***REMOVED***,
        // falling back to the empty string if nothing was stored.
        this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ***REMOVED*** || "";
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  hasClass: function( selector ***REMOVED*** {
    var className = " " + selector + " ",
      i = 0,
      l = this.length;
    for ( ; i < l; i++ ***REMOVED*** {
      if ( this[i].nodeType === 1 && (" " + this[i].className + " "***REMOVED***.replace(rclass, " "***REMOVED***.indexOf( className ***REMOVED*** >= 0 ***REMOVED*** {
        return true;
  ***REMOVED***
***REMOVED***

    return false;
  ***REMOVED***,

  val: function( value ***REMOVED*** {
    var hooks, ret, isFunction,
      elem = this[0];

    if ( !arguments.length ***REMOVED*** {
      if ( elem ***REMOVED*** {
        hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase(***REMOVED*** ];

        if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" ***REMOVED******REMOVED*** !== undefined ***REMOVED*** {
          return ret;
    ***REMOVED***

        ret = elem.value;

        return typeof ret === "string" ?
          // handle most common string cases
          ret.replace(rreturn, ""***REMOVED*** :
          // handle cases where value is null/undef or number
          ret == null ? "" : ret;
  ***REMOVED***

      return;
***REMOVED***

    isFunction = jQuery.isFunction( value ***REMOVED***;

    return this.each(function( i ***REMOVED*** {
      var val;

      if ( this.nodeType !== 1 ***REMOVED*** {
        return;
  ***REMOVED***

      if ( isFunction ***REMOVED*** {
        val = value.call( this, i, jQuery( this ***REMOVED***.val(***REMOVED*** ***REMOVED***;
  ***REMOVED*** else {
        val = value;
  ***REMOVED***

      // Treat null/undefined as ""; convert numbers to string
      if ( val == null ***REMOVED*** {
        val = "";
  ***REMOVED*** else if ( typeof val === "number" ***REMOVED*** {
        val += "";
  ***REMOVED*** else if ( jQuery.isArray( val ***REMOVED*** ***REMOVED*** {
        val = jQuery.map(val, function ( value ***REMOVED*** {
          return value == null ? "" : value + "";
    ***REMOVED******REMOVED***;
  ***REMOVED***

      hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase(***REMOVED*** ];

      // If set returns undefined, fall back to normal setting
      if ( !hooks || !("set" in hooks***REMOVED*** || hooks.set( this, val, "value" ***REMOVED*** === undefined ***REMOVED*** {
        this.value = val;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.extend({
  valHooks: {
    option: {
      get: function( elem ***REMOVED*** {
        // attributes.value is undefined in Blackberry 4.7 but
        // uses .value. See #6932
        var val = elem.attributes.value;
        return !val || val.specified ? elem.value : elem.text;
  ***REMOVED***
***REMOVED***,
    select: {
      get: function( elem ***REMOVED*** {
        var value, option,
          options = elem.options,
          index = elem.selectedIndex,
          one = elem.type === "select-one" || index < 0,
          values = one ? null : [],
          max = one ? index + 1 : options.length,
          i = index < 0 ?
            max :
            one ? index : 0;

        // Loop through all the selected options
        for ( ; i < max; i++ ***REMOVED*** {
          option = options[ i ];

          // IE6-9 doesn't update selected after form reset (#2551***REMOVED***
          if ( ( option.selected || i === index ***REMOVED*** &&
              // Don't return options that are disabled or in a disabled optgroup
              ( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled"***REMOVED*** === null ***REMOVED*** &&
              ( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ***REMOVED*** ***REMOVED*** ***REMOVED*** {

            // Get the specific value for the option
            value = jQuery( option ***REMOVED***.val(***REMOVED***;

            // We don't need an array for one selects
            if ( one ***REMOVED*** {
              return value;
        ***REMOVED***

            // Multi-Selects return an array
            values.push( value ***REMOVED***;
      ***REMOVED***
    ***REMOVED***

        return values;
  ***REMOVED***,

      set: function( elem, value ***REMOVED*** {
        var optionSet, option,
          options = elem.options,
          values = jQuery.makeArray( value ***REMOVED***,
          i = options.length;

        while ( i-- ***REMOVED*** {
          option = options[ i ];
          if ( (option.selected = jQuery.inArray( jQuery(option***REMOVED***.val(***REMOVED***, values ***REMOVED*** >= 0***REMOVED*** ***REMOVED*** {
            optionSet = true;
      ***REMOVED***
    ***REMOVED***

        // force browsers to behave consistently when non-matching value is set
        if ( !optionSet ***REMOVED*** {
          elem.selectedIndex = -1;
    ***REMOVED***
        return values;
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  attr: function( elem, name, value ***REMOVED*** {
    var hooks, ret,
      nType = elem.nodeType;

    // don't get/set attributes on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ***REMOVED*** {
      return;
***REMOVED***

    // Fallback to prop when attributes are not supported
    if ( typeof elem.getAttribute === core_strundefined ***REMOVED*** {
      return jQuery.prop( elem, name, value ***REMOVED***;
***REMOVED***

    // All attributes are lowercase
    // Grab necessary hook if one is defined
    if ( nType !== 1 || !jQuery.isXMLDoc( elem ***REMOVED*** ***REMOVED*** {
      name = name.toLowerCase(***REMOVED***;
      hooks = jQuery.attrHooks[ name ] ||
        ( jQuery.expr.match.bool.test( name ***REMOVED*** ? boolHook : nodeHook ***REMOVED***;
***REMOVED***

    if ( value !== undefined ***REMOVED*** {

      if ( value === null ***REMOVED*** {
        jQuery.removeAttr( elem, name ***REMOVED***;

  ***REMOVED*** else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name ***REMOVED******REMOVED*** !== undefined ***REMOVED*** {
        return ret;

  ***REMOVED*** else {
        elem.setAttribute( name, value + "" ***REMOVED***;
        return value;
  ***REMOVED***

***REMOVED*** else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name ***REMOVED******REMOVED*** !== null ***REMOVED*** {
      return ret;

***REMOVED*** else {
      ret = jQuery.find.attr( elem, name ***REMOVED***;

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ?
        undefined :
        ret;
***REMOVED***
  ***REMOVED***,

  removeAttr: function( elem, value ***REMOVED*** {
    var name, propName,
      i = 0,
      attrNames = value && value.match( core_rnotwhite ***REMOVED***;

    if ( attrNames && elem.nodeType === 1 ***REMOVED*** {
      while ( (name = attrNames[i++]***REMOVED*** ***REMOVED*** {
        propName = jQuery.propFix[ name ] || name;

        // Boolean attributes get special treatment (#10870***REMOVED***
        if ( jQuery.expr.match.bool.test( name ***REMOVED*** ***REMOVED*** {
          // Set corresponding property to false
          elem[ propName ] = false;
    ***REMOVED***

        elem.removeAttribute( name ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  attrHooks: {
    type: {
      set: function( elem, value ***REMOVED*** {
        if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input"***REMOVED*** ***REMOVED*** {
          // Setting the type on a radio button after the value resets the value in IE6-9
          // Reset value to default in case type is set after value during creation
          var val = elem.value;
          elem.setAttribute( "type", value ***REMOVED***;
          if ( val ***REMOVED*** {
            elem.value = val;
      ***REMOVED***
          return value;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  propFix: {
    "for": "htmlFor",
    "class": "className"
  ***REMOVED***,

  prop: function( elem, name, value ***REMOVED*** {
    var ret, hooks, notxml,
      nType = elem.nodeType;

    // don't get/set properties on text, comment and attribute nodes
    if ( !elem || nType === 3 || nType === 8 || nType === 2 ***REMOVED*** {
      return;
***REMOVED***

    notxml = nType !== 1 || !jQuery.isXMLDoc( elem ***REMOVED***;

    if ( notxml ***REMOVED*** {
      // Fix name and attach hooks
      name = jQuery.propFix[ name ] || name;
      hooks = jQuery.propHooks[ name ];
***REMOVED***

    if ( value !== undefined ***REMOVED*** {
      return hooks && "set" in hooks && (ret = hooks.set( elem, value, name ***REMOVED******REMOVED*** !== undefined ?
        ret :
        ( elem[ name ] = value ***REMOVED***;

***REMOVED*** else {
      return hooks && "get" in hooks && (ret = hooks.get( elem, name ***REMOVED******REMOVED*** !== null ?
        ret :
        elem[ name ];
***REMOVED***
  ***REMOVED***,

  propHooks: {
    tabIndex: {
      get: function( elem ***REMOVED*** {
        return elem.hasAttribute( "tabindex" ***REMOVED*** || rfocusable.test( elem.nodeName ***REMOVED*** || elem.href ?
          elem.tabIndex :
          -1;
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;

// Hooks for boolean attributes
boolHook = {
  set: function( elem, value, name ***REMOVED*** {
    if ( value === false ***REMOVED*** {
      // Remove boolean attributes when set to false
      jQuery.removeAttr( elem, name ***REMOVED***;
***REMOVED*** else {
      elem.setAttribute( name, name ***REMOVED***;
***REMOVED***
    return name;
  ***REMOVED***
***REMOVED***;
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ***REMOVED***, function( i, name ***REMOVED*** {
  var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

  jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ***REMOVED*** {
    var fn = jQuery.expr.attrHandle[ name ],
      ret = isXML ?
        undefined :
        /* jshint eqeqeq: false */
        // Temporarily disable this handler to check existence
        (jQuery.expr.attrHandle[ name ] = undefined***REMOVED*** !=
          getter( elem, name, isXML ***REMOVED*** ?

          name.toLowerCase(***REMOVED*** :
          null;

    // Restore handler
    jQuery.expr.attrHandle[ name ] = fn;

    return ret;
  ***REMOVED***;
***REMOVED******REMOVED***;

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ***REMOVED*** {
  jQuery.propHooks.selected = {
    get: function( elem ***REMOVED*** {
      var parent = elem.parentNode;
      if ( parent && parent.parentNode ***REMOVED*** {
        parent.parentNode.selectedIndex;
  ***REMOVED***
      return null;
***REMOVED***
  ***REMOVED***;
***REMOVED***

jQuery.each([
  "tabIndex",
  "readOnly",
  "maxLength",
  "cellSpacing",
  "cellPadding",
  "rowSpan",
  "colSpan",
  "useMap",
  "frameBorder",
  "contentEditable"
], function(***REMOVED*** {
  jQuery.propFix[ this.toLowerCase(***REMOVED*** ] = this;
***REMOVED******REMOVED***;

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function(***REMOVED*** {
  jQuery.valHooks[ this ] = {
    set: function( elem, value ***REMOVED*** {
      if ( jQuery.isArray( value ***REMOVED*** ***REMOVED*** {
        return ( elem.checked = jQuery.inArray( jQuery(elem***REMOVED***.val(***REMOVED***, value ***REMOVED*** >= 0 ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED***;
  if ( !jQuery.support.checkOn ***REMOVED*** {
    jQuery.valHooks[ this ].get = function( elem ***REMOVED*** {
      // Support: Webkit
      // "" is returned instead of "on" if a value isn't specified
      return elem.getAttribute("value"***REMOVED*** === null ? "on" : elem.value;
***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var rkeyEvent = /^key/,
  rmouseEvent = /^(?:mouse|contextmenu***REMOVED***|click/,
  rfocusMorph = /^(?:focusinfocus|focusoutblur***REMOVED***$/,
  rtypenamespace = /^([^.]****REMOVED***(?:\.(.+***REMOVED***|***REMOVED***$/;

function returnTrue(***REMOVED*** {
  return true;
***REMOVED***

function returnFalse(***REMOVED*** {
  return false;
***REMOVED***

function safeActiveElement(***REMOVED*** {
  try {
    return document.activeElement;
  ***REMOVED*** catch ( err ***REMOVED*** { ***REMOVED***
***REMOVED***

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

  global: {***REMOVED***,

  add: function( elem, types, handler, data, selector ***REMOVED*** {

    var handleObjIn, eventHandle, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = data_priv.get( elem ***REMOVED***;

    // Don't attach events to noData or text/comment nodes (but allow plain objects***REMOVED***
    if ( !elemData ***REMOVED*** {
      return;
***REMOVED***

    // Caller can pass in an object of custom data in lieu of the handler
    if ( handler.handler ***REMOVED*** {
      handleObjIn = handler;
      handler = handleObjIn.handler;
      selector = handleObjIn.selector;
***REMOVED***

    // Make sure that the handler has a unique ID, used to find/remove it later
    if ( !handler.guid ***REMOVED*** {
      handler.guid = jQuery.guid++;
***REMOVED***

    // Init the element's event structure and main handler, if this is the first
    if ( !(events = elemData.events***REMOVED*** ***REMOVED*** {
      events = elemData.events = {***REMOVED***;
***REMOVED***
    if ( !(eventHandle = elemData.handle***REMOVED*** ***REMOVED*** {
      eventHandle = elemData.handle = function( e ***REMOVED*** {
        // Discard the second event of a jQuery.event.trigger(***REMOVED*** and
        // when an event is called after a page has unloaded
        return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type***REMOVED*** ?
          jQuery.event.dispatch.apply( eventHandle.elem, arguments ***REMOVED*** :
          undefined;
  ***REMOVED***;
      // Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
      eventHandle.elem = elem;
***REMOVED***

    // Handle multiple events separated by a space
    types = ( types || "" ***REMOVED***.match( core_rnotwhite ***REMOVED*** || [""];
    t = types.length;
    while ( t-- ***REMOVED*** {
      tmp = rtypenamespace.exec( types[t] ***REMOVED*** || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ***REMOVED***.split( "." ***REMOVED***.sort(***REMOVED***;

      // There *must* be a type, no attaching namespace-only handlers
      if ( !type ***REMOVED*** {
        continue;
  ***REMOVED***

      // If event changes its type, use the special event handlers for the changed type
      special = jQuery.event.special[ type ] || {***REMOVED***;

      // If selector defined, determine special event api type, otherwise given type
      type = ( selector ? special.delegateType : special.bindType ***REMOVED*** || type;

      // Update special based on newly reset type
      special = jQuery.event.special[ type ] || {***REMOVED***;

      // handleObj is passed to all event handlers
      handleObj = jQuery.extend({
        type: type,
        origType: origType,
        data: data,
        handler: handler,
        guid: handler.guid,
        selector: selector,
        needsContext: selector && jQuery.expr.match.needsContext.test( selector ***REMOVED***,
        namespace: namespaces.join("."***REMOVED***
  ***REMOVED***, handleObjIn ***REMOVED***;

      // Init the event handler queue if we're the first
      if ( !(handlers = events[ type ]***REMOVED*** ***REMOVED*** {
        handlers = events[ type ] = [];
        handlers.delegateCount = 0;

        // Only use addEventListener if the special events handler returns false
        if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ***REMOVED*** === false ***REMOVED*** {
          if ( elem.addEventListener ***REMOVED*** {
            elem.addEventListener( type, eventHandle, false ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      if ( special.add ***REMOVED*** {
        special.add.call( elem, handleObj ***REMOVED***;

        if ( !handleObj.handler.guid ***REMOVED*** {
          handleObj.handler.guid = handler.guid;
    ***REMOVED***
  ***REMOVED***

      // Add to the element's handler list, delegates in front
      if ( selector ***REMOVED*** {
        handlers.splice( handlers.delegateCount++, 0, handleObj ***REMOVED***;
  ***REMOVED*** else {
        handlers.push( handleObj ***REMOVED***;
  ***REMOVED***

      // Keep track of which events have ever been used, for event optimization
      jQuery.event.global[ type ] = true;
***REMOVED***

    // Nullify elem to prevent memory leaks in IE
    elem = null;
  ***REMOVED***,

  // Detach an event or set of events from an element
  remove: function( elem, types, handler, selector, mappedTypes ***REMOVED*** {

    var j, origCount, tmp,
      events, t, handleObj,
      special, handlers, type, namespaces, origType,
      elemData = data_priv.hasData( elem ***REMOVED*** && data_priv.get( elem ***REMOVED***;

    if ( !elemData || !(events = elemData.events***REMOVED*** ***REMOVED*** {
      return;
***REMOVED***

    // Once for each type.namespace in types; type may be omitted
    types = ( types || "" ***REMOVED***.match( core_rnotwhite ***REMOVED*** || [""];
    t = types.length;
    while ( t-- ***REMOVED*** {
      tmp = rtypenamespace.exec( types[t] ***REMOVED*** || [];
      type = origType = tmp[1];
      namespaces = ( tmp[2] || "" ***REMOVED***.split( "." ***REMOVED***.sort(***REMOVED***;

      // Unbind all events (on this namespace, if provided***REMOVED*** for the element
      if ( !type ***REMOVED*** {
        for ( type in events ***REMOVED*** {
          jQuery.event.remove( elem, type + types[ t ], handler, selector, true ***REMOVED***;
    ***REMOVED***
        continue;
  ***REMOVED***

      special = jQuery.event.special[ type ] || {***REMOVED***;
      type = ( selector ? special.delegateType : special.bindType ***REMOVED*** || type;
      handlers = events[ type ] || [];
      tmp = tmp[2] && new RegExp( "(^|\\.***REMOVED***" + namespaces.join("\\.(?:.*\\.|***REMOVED***"***REMOVED*** + "(\\.|$***REMOVED***" ***REMOVED***;

      // Remove matching events
      origCount = j = handlers.length;
      while ( j-- ***REMOVED*** {
        handleObj = handlers[ j ];

        if ( ( mappedTypes || origType === handleObj.origType ***REMOVED*** &&
          ( !handler || handler.guid === handleObj.guid ***REMOVED*** &&
          ( !tmp || tmp.test( handleObj.namespace ***REMOVED*** ***REMOVED*** &&
          ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ***REMOVED*** ***REMOVED*** {
          handlers.splice( j, 1 ***REMOVED***;

          if ( handleObj.selector ***REMOVED*** {
            handlers.delegateCount--;
      ***REMOVED***
          if ( special.remove ***REMOVED*** {
            special.remove.call( elem, handleObj ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      // Remove generic event handler if we removed something and no more handlers exist
      // (avoids potential for endless recursion during removal of special event handlers***REMOVED***
      if ( origCount && !handlers.length ***REMOVED*** {
        if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ***REMOVED*** === false ***REMOVED*** {
          jQuery.removeEvent( elem, type, elemData.handle ***REMOVED***;
    ***REMOVED***

        delete events[ type ];
  ***REMOVED***
***REMOVED***

    // Remove the expando if it's no longer used
    if ( jQuery.isEmptyObject( events ***REMOVED*** ***REMOVED*** {
      delete elemData.handle;
      data_priv.remove( elem, "events" ***REMOVED***;
***REMOVED***
  ***REMOVED***,

  trigger: function( event, data, elem, onlyHandlers ***REMOVED*** {

    var i, cur, tmp, bubbleType, ontype, handle, special,
      eventPath = [ elem || document ],
      type = core_hasOwn.call( event, "type" ***REMOVED*** ? event.type : event,
      namespaces = core_hasOwn.call( event, "namespace" ***REMOVED*** ? event.namespace.split("."***REMOVED*** : [];

    cur = tmp = elem = elem || document;

    // Don't do events on text and comment nodes
    if ( elem.nodeType === 3 || elem.nodeType === 8 ***REMOVED*** {
      return;
***REMOVED***

    // focus/blur morphs to focusin/out; ensure we're not firing them right now
    if ( rfocusMorph.test( type + jQuery.event.triggered ***REMOVED*** ***REMOVED*** {
      return;
***REMOVED***

    if ( type.indexOf("."***REMOVED*** >= 0 ***REMOVED*** {
      // Namespaced trigger; create a regexp to match event type in handle(***REMOVED***
      namespaces = type.split("."***REMOVED***;
      type = namespaces.shift(***REMOVED***;
      namespaces.sort(***REMOVED***;
***REMOVED***
    ontype = type.indexOf(":"***REMOVED*** < 0 && "on" + type;

    // Caller can pass in a jQuery.Event object, Object, or just an event type string
    event = event[ jQuery.expando ] ?
      event :
      new jQuery.Event( type, typeof event === "object" && event ***REMOVED***;

    // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true***REMOVED***
    event.isTrigger = onlyHandlers ? 2 : 3;
    event.namespace = namespaces.join("."***REMOVED***;
    event.namespace_re = event.namespace ?
      new RegExp( "(^|\\.***REMOVED***" + namespaces.join("\\.(?:.*\\.|***REMOVED***"***REMOVED*** + "(\\.|$***REMOVED***" ***REMOVED*** :
      null;

    // Clean up the event in case it is being reused
    event.result = undefined;
    if ( !event.target ***REMOVED*** {
      event.target = elem;
***REMOVED***

    // Clone any incoming data and prepend the event, creating the handler arg list
    data = data == null ?
      [ event ] :
      jQuery.makeArray( data, [ event ] ***REMOVED***;

    // Allow special events to draw outside the lines
    special = jQuery.event.special[ type ] || {***REMOVED***;
    if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ***REMOVED*** === false ***REMOVED*** {
      return;
***REMOVED***

    // Determine event propagation path in advance, per W3C events spec (#9951***REMOVED***
    // Bubble up to document, then to window; watch for a global ownerDocument var (#9724***REMOVED***
    if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ***REMOVED*** ***REMOVED*** {

      bubbleType = special.delegateType || type;
      if ( !rfocusMorph.test( bubbleType + type ***REMOVED*** ***REMOVED*** {
        cur = cur.parentNode;
  ***REMOVED***
      for ( ; cur; cur = cur.parentNode ***REMOVED*** {
        eventPath.push( cur ***REMOVED***;
        tmp = cur;
  ***REMOVED***

      // Only add window if we got to document (e.g., not plain obj or detached DOM***REMOVED***
      if ( tmp === (elem.ownerDocument || document***REMOVED*** ***REMOVED*** {
        eventPath.push( tmp.defaultView || tmp.parentWindow || window ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Fire handlers on the event path
    i = 0;
    while ( (cur = eventPath[i++]***REMOVED*** && !event.isPropagationStopped(***REMOVED*** ***REMOVED*** {

      event.type = i > 1 ?
        bubbleType :
        special.bindType || type;

      // jQuery handler
      handle = ( data_priv.get( cur, "events" ***REMOVED*** || {***REMOVED*** ***REMOVED***[ event.type ] && data_priv.get( cur, "handle" ***REMOVED***;
      if ( handle ***REMOVED*** {
        handle.apply( cur, data ***REMOVED***;
  ***REMOVED***

      // Native handler
      handle = ontype && cur[ ontype ];
      if ( handle && jQuery.acceptData( cur ***REMOVED*** && handle.apply && handle.apply( cur, data ***REMOVED*** === false ***REMOVED*** {
        event.preventDefault(***REMOVED***;
  ***REMOVED***
***REMOVED***
    event.type = type;

    // If nobody prevented the default action, do it now
    if ( !onlyHandlers && !event.isDefaultPrevented(***REMOVED*** ***REMOVED*** {

      if ( (!special._default || special._default.apply( eventPath.pop(***REMOVED***, data ***REMOVED*** === false***REMOVED*** &&
        jQuery.acceptData( elem ***REMOVED*** ***REMOVED*** {

        // Call a native DOM method on the target with the same name name as the event.
        // Don't do default actions on window, that's where global variables be (#6170***REMOVED***
        if ( ontype && jQuery.isFunction( elem[ type ] ***REMOVED*** && !jQuery.isWindow( elem ***REMOVED*** ***REMOVED*** {

          // Don't re-trigger an onFOO event when we call its FOO(***REMOVED*** method
          tmp = elem[ ontype ];

          if ( tmp ***REMOVED*** {
            elem[ ontype ] = null;
      ***REMOVED***

          // Prevent re-triggering of the same event, since we already bubbled it above
          jQuery.event.triggered = type;
          elem[ type ](***REMOVED***;
          jQuery.event.triggered = undefined;

          if ( tmp ***REMOVED*** {
            elem[ ontype ] = tmp;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return event.result;
  ***REMOVED***,

  dispatch: function( event ***REMOVED*** {

    // Make a writable jQuery.Event from the native event object
    event = jQuery.event.fix( event ***REMOVED***;

    var i, j, ret, matched, handleObj,
      handlerQueue = [],
      args = core_slice.call( arguments ***REMOVED***,
      handlers = ( data_priv.get( this, "events" ***REMOVED*** || {***REMOVED*** ***REMOVED***[ event.type ] || [],
      special = jQuery.event.special[ event.type ] || {***REMOVED***;

    // Use the fix-ed jQuery.Event rather than the (read-only***REMOVED*** native event
    args[0] = event;
    event.delegateTarget = this;

    // Call the preDispatch hook for the mapped type, and let it bail if desired
    if ( special.preDispatch && special.preDispatch.call( this, event ***REMOVED*** === false ***REMOVED*** {
      return;
***REMOVED***

    // Determine handlers
    handlerQueue = jQuery.event.handlers.call( this, event, handlers ***REMOVED***;

    // Run delegates first; they may want to stop propagation beneath us
    i = 0;
    while ( (matched = handlerQueue[ i++ ]***REMOVED*** && !event.isPropagationStopped(***REMOVED*** ***REMOVED*** {
      event.currentTarget = matched.elem;

      j = 0;
      while ( (handleObj = matched.handlers[ j++ ]***REMOVED*** && !event.isImmediatePropagationStopped(***REMOVED*** ***REMOVED*** {

        // Triggered event must either 1***REMOVED*** have no namespace, or
        // 2***REMOVED*** have namespace(s***REMOVED*** a subset or equal to those in the bound event (both can have no namespace***REMOVED***.
        if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ***REMOVED*** ***REMOVED*** {

          event.handleObj = handleObj;
          event.data = handleObj.data;

          ret = ( (jQuery.event.special[ handleObj.origType ] || {***REMOVED******REMOVED***.handle || handleObj.handler ***REMOVED***
              .apply( matched.elem, args ***REMOVED***;

          if ( ret !== undefined ***REMOVED*** {
            if ( (event.result = ret***REMOVED*** === false ***REMOVED*** {
              event.preventDefault(***REMOVED***;
              event.stopPropagation(***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Call the postDispatch hook for the mapped type
    if ( special.postDispatch ***REMOVED*** {
      special.postDispatch.call( this, event ***REMOVED***;
***REMOVED***

    return event.result;
  ***REMOVED***,

  handlers: function( event, handlers ***REMOVED*** {
    var i, matches, sel, handleObj,
      handlerQueue = [],
      delegateCount = handlers.delegateCount,
      cur = event.target;

    // Find delegate handlers
    // Black-hole SVG <use> instance trees (#13180***REMOVED***
    // Avoid non-left-click bubbling in Firefox (#3861***REMOVED***
    if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click"***REMOVED*** ***REMOVED*** {

      for ( ; cur !== this; cur = cur.parentNode || this ***REMOVED*** {

        // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764***REMOVED***
        if ( cur.disabled !== true || event.type !== "click" ***REMOVED*** {
          matches = [];
          for ( i = 0; i < delegateCount; i++ ***REMOVED*** {
            handleObj = handlers[ i ];

            // Don't conflict with Object.prototype properties (#13203***REMOVED***
            sel = handleObj.selector + " ";

            if ( matches[ sel ] === undefined ***REMOVED*** {
              matches[ sel ] = handleObj.needsContext ?
                jQuery( sel, this ***REMOVED***.index( cur ***REMOVED*** >= 0 :
                jQuery.find( sel, this, null, [ cur ] ***REMOVED***.length;
        ***REMOVED***
            if ( matches[ sel ] ***REMOVED*** {
              matches.push( handleObj ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
          if ( matches.length ***REMOVED*** {
            handlerQueue.push({ elem: cur, handlers: matches ***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Add the remaining (directly-bound***REMOVED*** handlers
    if ( delegateCount < handlers.length ***REMOVED*** {
      handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ***REMOVED*** ***REMOVED******REMOVED***;
***REMOVED***

    return handlerQueue;
  ***REMOVED***,

  // Includes some event props shared by KeyEvent and MouseEvent
  props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "***REMOVED***,

  fixHooks: {***REMOVED***,

  keyHooks: {
    props: "char charCode key keyCode".split(" "***REMOVED***,
    filter: function( event, original ***REMOVED*** {

      // Add which for key events
      if ( event.which == null ***REMOVED*** {
        event.which = original.charCode != null ? original.charCode : original.keyCode;
  ***REMOVED***

      return event;
***REMOVED***
  ***REMOVED***,

  mouseHooks: {
    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "***REMOVED***,
    filter: function( event, original ***REMOVED*** {
      var eventDoc, doc, body,
        button = original.button;

      // Calculate pageX/Y if missing and clientX/Y available
      if ( event.pageX == null && original.clientX != null ***REMOVED*** {
        eventDoc = event.target.ownerDocument || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ***REMOVED*** - ( doc && doc.clientLeft || body && body.clientLeft || 0 ***REMOVED***;
        event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ***REMOVED*** - ( doc && doc.clientTop  || body && body.clientTop  || 0 ***REMOVED***;
  ***REMOVED***

      // Add which for click: 1 === left; 2 === middle; 3 === right
      // Note: button is not normalized, so don't use it
      if ( !event.which && button !== undefined ***REMOVED*** {
        event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ***REMOVED*** ***REMOVED*** ***REMOVED***;
  ***REMOVED***

      return event;
***REMOVED***
  ***REMOVED***,

  fix: function( event ***REMOVED*** {
    if ( event[ jQuery.expando ] ***REMOVED*** {
      return event;
***REMOVED***

    // Create a writable copy of the event object and normalize some properties
    var i, prop, copy,
      type = event.type,
      originalEvent = event,
      fixHook = this.fixHooks[ type ];

    if ( !fixHook ***REMOVED*** {
      this.fixHooks[ type ] = fixHook =
        rmouseEvent.test( type ***REMOVED*** ? this.mouseHooks :
        rkeyEvent.test( type ***REMOVED*** ? this.keyHooks :
        {***REMOVED***;
***REMOVED***
    copy = fixHook.props ? this.props.concat( fixHook.props ***REMOVED*** : this.props;

    event = new jQuery.Event( originalEvent ***REMOVED***;

    i = copy.length;
    while ( i-- ***REMOVED*** {
      prop = copy[ i ];
      event[ prop ] = originalEvent[ prop ];
***REMOVED***

    // Support: Cordova 2.5 (WebKit***REMOVED*** (#13255***REMOVED***
    // All events should have a target; Cordova deviceready doesn't
    if ( !event.target ***REMOVED*** {
      event.target = document;
***REMOVED***

    // Support: Safari 6.0+, Chrome < 28
    // Target should not be a text node (#504, #13143***REMOVED***
    if ( event.target.nodeType === 3 ***REMOVED*** {
      event.target = event.target.parentNode;
***REMOVED***

    return fixHook.filter? fixHook.filter( event, originalEvent ***REMOVED*** : event;
  ***REMOVED***,

  special: {
    load: {
      // Prevent triggered image.load events from bubbling to window.load
      noBubble: true
***REMOVED***,
    focus: {
      // Fire native event if possible so blur/focus sequence is correct
      trigger: function(***REMOVED*** {
        if ( this !== safeActiveElement(***REMOVED*** && this.focus ***REMOVED*** {
          this.focus(***REMOVED***;
          return false;
    ***REMOVED***
  ***REMOVED***,
      delegateType: "focusin"
***REMOVED***,
    blur: {
      trigger: function(***REMOVED*** {
        if ( this === safeActiveElement(***REMOVED*** && this.blur ***REMOVED*** {
          this.blur(***REMOVED***;
          return false;
    ***REMOVED***
  ***REMOVED***,
      delegateType: "focusout"
***REMOVED***,
    click: {
      // For checkbox, fire native event so checked state will be right
      trigger: function(***REMOVED*** {
        if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ***REMOVED*** ***REMOVED*** {
          this.click(***REMOVED***;
          return false;
    ***REMOVED***
  ***REMOVED***,

      // For cross-browser consistency, don't fire native .click(***REMOVED*** on links
      _default: function( event ***REMOVED*** {
        return jQuery.nodeName( event.target, "a" ***REMOVED***;
  ***REMOVED***
***REMOVED***,

    beforeunload: {
      postDispatch: function( event ***REMOVED*** {

        // Support: Firefox 20+
        // Firefox doesn't alert if the returnValue field is not set.
        if ( event.result !== undefined ***REMOVED*** {
          event.originalEvent.returnValue = event.result;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  simulate: function( type, elem, event, bubble ***REMOVED*** {
    // Piggyback on a donor event to simulate a different one.
    // Fake originalEvent to avoid donor's stopPropagation, but if the
    // simulated event prevents default then we do the same on the donor.
    var e = jQuery.extend(
      new jQuery.Event(***REMOVED***,
      event,
      {
        type: type,
        isSimulated: true,
        originalEvent: {***REMOVED***
  ***REMOVED***
    ***REMOVED***;
    if ( bubble ***REMOVED*** {
      jQuery.event.trigger( e, null, elem ***REMOVED***;
***REMOVED*** else {
      jQuery.event.dispatch.call( elem, e ***REMOVED***;
***REMOVED***
    if ( e.isDefaultPrevented(***REMOVED*** ***REMOVED*** {
      event.preventDefault(***REMOVED***;
***REMOVED***
  ***REMOVED***
***REMOVED***;

jQuery.removeEvent = function( elem, type, handle ***REMOVED*** {
  if ( elem.removeEventListener ***REMOVED*** {
    elem.removeEventListener( type, handle, false ***REMOVED***;
  ***REMOVED***
***REMOVED***;

jQuery.Event = function( src, props ***REMOVED*** {
  // Allow instantiation without the 'new' keyword
  if ( !(this instanceof jQuery.Event***REMOVED*** ***REMOVED*** {
    return new jQuery.Event( src, props ***REMOVED***;
  ***REMOVED***

  // Event object
  if ( src && src.type ***REMOVED*** {
    this.originalEvent = src;
    this.type = src.type;

    // Events bubbling up the document may have been marked as prevented
    // by a handler lower down the tree; reflect the correct value.
    this.isDefaultPrevented = ( src.defaultPrevented ||
      src.getPreventDefault && src.getPreventDefault(***REMOVED*** ***REMOVED*** ? returnTrue : returnFalse;

  // Event type
  ***REMOVED*** else {
    this.type = src;
  ***REMOVED***

  // Put explicitly provided properties onto the event object
  if ( props ***REMOVED*** {
    jQuery.extend( this, props ***REMOVED***;
  ***REMOVED***

  // Create a timestamp if incoming event doesn't have one
  this.timeStamp = src && src.timeStamp || jQuery.now(***REMOVED***;

  // Mark it as fixed
  this[ jQuery.expando ] = true;
***REMOVED***;

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
  isDefaultPrevented: returnFalse,
  isPropagationStopped: returnFalse,
  isImmediatePropagationStopped: returnFalse,

  preventDefault: function(***REMOVED*** {
    var e = this.originalEvent;

    this.isDefaultPrevented = returnTrue;

    if ( e && e.preventDefault ***REMOVED*** {
      e.preventDefault(***REMOVED***;
***REMOVED***
  ***REMOVED***,
  stopPropagation: function(***REMOVED*** {
    var e = this.originalEvent;

    this.isPropagationStopped = returnTrue;

    if ( e && e.stopPropagation ***REMOVED*** {
      e.stopPropagation(***REMOVED***;
***REMOVED***
  ***REMOVED***,
  stopImmediatePropagation: function(***REMOVED*** {
    this.isImmediatePropagationStopped = returnTrue;
    this.stopPropagation(***REMOVED***;
  ***REMOVED***
***REMOVED***;

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
  mouseenter: "mouseover",
  mouseleave: "mouseout"
***REMOVED***, function( orig, fix ***REMOVED*** {
  jQuery.event.special[ orig ] = {
    delegateType: fix,
    bindType: fix,

    handle: function( event ***REMOVED*** {
      var ret,
        target = this,
        related = event.relatedTarget,
        handleObj = event.handleObj;

      // For mousenter/leave call the handler if related is outside the target.
      // NB: No relatedTarget if the mouse left/entered the browser window
      if ( !related || (related !== target && !jQuery.contains( target, related ***REMOVED******REMOVED*** ***REMOVED*** {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply( this, arguments ***REMOVED***;
        event.type = fix;
  ***REMOVED***
      return ret;
***REMOVED***
  ***REMOVED***;
***REMOVED******REMOVED***;

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ***REMOVED*** {
  jQuery.each({ focus: "focusin", blur: "focusout" ***REMOVED***, function( orig, fix ***REMOVED*** {

    // Attach a single capturing handler while someone wants focusin/focusout
    var attaches = 0,
      handler = function( event ***REMOVED*** {
        jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ***REMOVED***, true ***REMOVED***;
  ***REMOVED***;

    jQuery.event.special[ fix ] = {
      setup: function(***REMOVED*** {
        if ( attaches++ === 0 ***REMOVED*** {
          document.addEventListener( orig, handler, true ***REMOVED***;
    ***REMOVED***
  ***REMOVED***,
      teardown: function(***REMOVED*** {
        if ( --attaches === 0 ***REMOVED*** {
          document.removeEventListener( orig, handler, true ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

jQuery.fn.extend({

  on: function( types, selector, data, fn, /*INTERNAL*/ one ***REMOVED*** {
    var origFn, type;

    // Types can be a map of types/handlers
    if ( typeof types === "object" ***REMOVED*** {
      // ( types-Object, selector, data ***REMOVED***
      if ( typeof selector !== "string" ***REMOVED*** {
        // ( types-Object, data ***REMOVED***
        data = data || selector;
        selector = undefined;
  ***REMOVED***
      for ( type in types ***REMOVED*** {
        this.on( type, selector, data, types[ type ], one ***REMOVED***;
  ***REMOVED***
      return this;
***REMOVED***

    if ( data == null && fn == null ***REMOVED*** {
      // ( types, fn ***REMOVED***
      fn = selector;
      data = selector = undefined;
***REMOVED*** else if ( fn == null ***REMOVED*** {
      if ( typeof selector === "string" ***REMOVED*** {
        // ( types, selector, fn ***REMOVED***
        fn = data;
        data = undefined;
  ***REMOVED*** else {
        // ( types, data, fn ***REMOVED***
        fn = data;
        data = selector;
        selector = undefined;
  ***REMOVED***
***REMOVED***
    if ( fn === false ***REMOVED*** {
      fn = returnFalse;
***REMOVED*** else if ( !fn ***REMOVED*** {
      return this;
***REMOVED***

    if ( one === 1 ***REMOVED*** {
      origFn = fn;
      fn = function( event ***REMOVED*** {
        // Can use an empty set, since event contains the info
        jQuery(***REMOVED***.off( event ***REMOVED***;
        return origFn.apply( this, arguments ***REMOVED***;
  ***REMOVED***;
      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ ***REMOVED***;
***REMOVED***
    return this.each( function(***REMOVED*** {
      jQuery.event.add( this, types, fn, data, selector ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,
  one: function( types, selector, data, fn ***REMOVED*** {
    return this.on( types, selector, data, fn, 1 ***REMOVED***;
  ***REMOVED***,
  off: function( types, selector, fn ***REMOVED*** {
    var handleObj, type;
    if ( types && types.preventDefault && types.handleObj ***REMOVED*** {
      // ( event ***REMOVED***  dispatched jQuery.Event
      handleObj = types.handleObj;
      jQuery( types.delegateTarget ***REMOVED***.off(
        handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
        handleObj.selector,
        handleObj.handler
      ***REMOVED***;
      return this;
***REMOVED***
    if ( typeof types === "object" ***REMOVED*** {
      // ( types-object [, selector] ***REMOVED***
      for ( type in types ***REMOVED*** {
        this.off( type, selector, types[ type ] ***REMOVED***;
  ***REMOVED***
      return this;
***REMOVED***
    if ( selector === false || typeof selector === "function" ***REMOVED*** {
      // ( types [, fn] ***REMOVED***
      fn = selector;
      selector = undefined;
***REMOVED***
    if ( fn === false ***REMOVED*** {
      fn = returnFalse;
***REMOVED***
    return this.each(function(***REMOVED*** {
      jQuery.event.remove( this, types, fn, selector ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,

  trigger: function( type, data ***REMOVED*** {
    return this.each(function(***REMOVED*** {
      jQuery.event.trigger( type, data, this ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,
  triggerHandler: function( type, data ***REMOVED*** {
    var elem = this[0];
    if ( elem ***REMOVED*** {
      return jQuery.event.trigger( type, data, elem, true ***REMOVED***;
***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;
var isSimple = /^.[^:#\[\.,]*$/,
  rparentsprev = /^(?:parents|prev(?:Until|All***REMOVED******REMOVED***/,
  rneedsContext = jQuery.expr.match.needsContext,
  // methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true
  ***REMOVED***;

jQuery.fn.extend({
  find: function( selector ***REMOVED*** {
    var i,
      ret = [],
      self = this,
      len = self.length;

    if ( typeof selector !== "string" ***REMOVED*** {
      return this.pushStack( jQuery( selector ***REMOVED***.filter(function(***REMOVED*** {
        for ( i = 0; i < len; i++ ***REMOVED*** {
          if ( jQuery.contains( self[ i ], this ***REMOVED*** ***REMOVED*** {
            return true;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED******REMOVED*** ***REMOVED***;
***REMOVED***

    for ( i = 0; i < len; i++ ***REMOVED*** {
      jQuery.find( selector, self[ i ], ret ***REMOVED***;
***REMOVED***

    // Needed because $( selector, context ***REMOVED*** becomes $( context ***REMOVED***.find( selector ***REMOVED***
    ret = this.pushStack( len > 1 ? jQuery.unique( ret ***REMOVED*** : ret ***REMOVED***;
    ret.selector = this.selector ? this.selector + " " + selector : selector;
    return ret;
  ***REMOVED***,

  has: function( target ***REMOVED*** {
    var targets = jQuery( target, this ***REMOVED***,
      l = targets.length;

    return this.filter(function(***REMOVED*** {
      var i = 0;
      for ( ; i < l; i++ ***REMOVED*** {
        if ( jQuery.contains( this, targets[i] ***REMOVED*** ***REMOVED*** {
          return true;
    ***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  not: function( selector ***REMOVED*** {
    return this.pushStack( winnow(this, selector || [], true***REMOVED*** ***REMOVED***;
  ***REMOVED***,

  filter: function( selector ***REMOVED*** {
    return this.pushStack( winnow(this, selector || [], false***REMOVED*** ***REMOVED***;
  ***REMOVED***,

  is: function( selector ***REMOVED*** {
    return !!winnow(
      this,

      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first"***REMOVED***.is("p:last"***REMOVED*** won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test( selector ***REMOVED*** ?
        jQuery( selector ***REMOVED*** :
        selector || [],
      false
    ***REMOVED***.length;
  ***REMOVED***,

  closest: function( selectors, context ***REMOVED*** {
    var cur,
      i = 0,
      l = this.length,
      matched = [],
      pos = ( rneedsContext.test( selectors ***REMOVED*** || typeof selectors !== "string" ***REMOVED*** ?
        jQuery( selectors, context || this.context ***REMOVED*** :
        0;

    for ( ; i < l; i++ ***REMOVED*** {
      for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ***REMOVED*** {
        // Always skip document fragments
        if ( cur.nodeType < 11 && (pos ?
          pos.index(cur***REMOVED*** > -1 :

          // Don't pass non-elements to Sizzle
          cur.nodeType === 1 &&
            jQuery.find.matchesSelector(cur, selectors***REMOVED******REMOVED*** ***REMOVED*** {

          cur = matched.push( cur ***REMOVED***;
          break;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return this.pushStack( matched.length > 1 ? jQuery.unique( matched ***REMOVED*** : matched ***REMOVED***;
  ***REMOVED***,

  // Determine the position of an element within
  // the matched set of elements
  index: function( elem ***REMOVED*** {

    // No argument, return index in parent
    if ( !elem ***REMOVED*** {
      return ( this[ 0 ] && this[ 0 ].parentNode ***REMOVED*** ? this.first(***REMOVED***.prevAll(***REMOVED***.length : -1;
***REMOVED***

    // index in selector
    if ( typeof elem === "string" ***REMOVED*** {
      return core_indexOf.call( jQuery( elem ***REMOVED***, this[ 0 ] ***REMOVED***;
***REMOVED***

    // Locate the position of the desired element
    return core_indexOf.call( this,

      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[ 0 ] : elem
    ***REMOVED***;
  ***REMOVED***,

  add: function( selector, context ***REMOVED*** {
    var set = typeof selector === "string" ?
        jQuery( selector, context ***REMOVED*** :
        jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ***REMOVED***,
      all = jQuery.merge( this.get(***REMOVED***, set ***REMOVED***;

    return this.pushStack( jQuery.unique(all***REMOVED*** ***REMOVED***;
  ***REMOVED***,

  addBack: function( selector ***REMOVED*** {
    return this.add( selector == null ?
      this.prevObject : this.prevObject.filter(selector***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

function sibling( cur, dir ***REMOVED*** {
  while ( (cur = cur[dir]***REMOVED*** && cur.nodeType !== 1 ***REMOVED*** {***REMOVED***

  return cur;
***REMOVED***

jQuery.each({
  parent: function( elem ***REMOVED*** {
    var parent = elem.parentNode;
    return parent && parent.nodeType !== 11 ? parent : null;
  ***REMOVED***,
  parents: function( elem ***REMOVED*** {
    return jQuery.dir( elem, "parentNode" ***REMOVED***;
  ***REMOVED***,
  parentsUntil: function( elem, i, until ***REMOVED*** {
    return jQuery.dir( elem, "parentNode", until ***REMOVED***;
  ***REMOVED***,
  next: function( elem ***REMOVED*** {
    return sibling( elem, "nextSibling" ***REMOVED***;
  ***REMOVED***,
  prev: function( elem ***REMOVED*** {
    return sibling( elem, "previousSibling" ***REMOVED***;
  ***REMOVED***,
  nextAll: function( elem ***REMOVED*** {
    return jQuery.dir( elem, "nextSibling" ***REMOVED***;
  ***REMOVED***,
  prevAll: function( elem ***REMOVED*** {
    return jQuery.dir( elem, "previousSibling" ***REMOVED***;
  ***REMOVED***,
  nextUntil: function( elem, i, until ***REMOVED*** {
    return jQuery.dir( elem, "nextSibling", until ***REMOVED***;
  ***REMOVED***,
  prevUntil: function( elem, i, until ***REMOVED*** {
    return jQuery.dir( elem, "previousSibling", until ***REMOVED***;
  ***REMOVED***,
  siblings: function( elem ***REMOVED*** {
    return jQuery.sibling( ( elem.parentNode || {***REMOVED*** ***REMOVED***.firstChild, elem ***REMOVED***;
  ***REMOVED***,
  children: function( elem ***REMOVED*** {
    return jQuery.sibling( elem.firstChild ***REMOVED***;
  ***REMOVED***,
  contents: function( elem ***REMOVED*** {
    return elem.contentDocument || jQuery.merge( [], elem.childNodes ***REMOVED***;
  ***REMOVED***
***REMOVED***, function( name, fn ***REMOVED*** {
  jQuery.fn[ name ] = function( until, selector ***REMOVED*** {
    var matched = jQuery.map( this, fn, until ***REMOVED***;

    if ( name.slice( -5 ***REMOVED*** !== "Until" ***REMOVED*** {
      selector = until;
***REMOVED***

    if ( selector && typeof selector === "string" ***REMOVED*** {
      matched = jQuery.filter( selector, matched ***REMOVED***;
***REMOVED***

    if ( this.length > 1 ***REMOVED*** {
      // Remove duplicates
      if ( !guaranteedUnique[ name ] ***REMOVED*** {
        jQuery.unique( matched ***REMOVED***;
  ***REMOVED***

      // Reverse order for parents* and prev-derivatives
      if ( rparentsprev.test( name ***REMOVED*** ***REMOVED*** {
        matched.reverse(***REMOVED***;
  ***REMOVED***
***REMOVED***

    return this.pushStack( matched ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.extend({
  filter: function( expr, elems, not ***REMOVED*** {
    var elem = elems[ 0 ];

    if ( not ***REMOVED*** {
      expr = ":not(" + expr + "***REMOVED***";
***REMOVED***

    return elems.length === 1 && elem.nodeType === 1 ?
      jQuery.find.matchesSelector( elem, expr ***REMOVED*** ? [ elem ] : [] :
      jQuery.find.matches( expr, jQuery.grep( elems, function( elem ***REMOVED*** {
        return elem.nodeType === 1;
  ***REMOVED******REMOVED******REMOVED***;
  ***REMOVED***,

  dir: function( elem, dir, until ***REMOVED*** {
    var matched = [],
      truncate = until !== undefined;

    while ( (elem = elem[ dir ]***REMOVED*** && elem.nodeType !== 9 ***REMOVED*** {
      if ( elem.nodeType === 1 ***REMOVED*** {
        if ( truncate && jQuery( elem ***REMOVED***.is( until ***REMOVED*** ***REMOVED*** {
          break;
    ***REMOVED***
        matched.push( elem ***REMOVED***;
  ***REMOVED***
***REMOVED***
    return matched;
  ***REMOVED***,

  sibling: function( n, elem ***REMOVED*** {
    var matched = [];

    for ( ; n; n = n.nextSibling ***REMOVED*** {
      if ( n.nodeType === 1 && n !== elem ***REMOVED*** {
        matched.push( n ***REMOVED***;
  ***REMOVED***
***REMOVED***

    return matched;
  ***REMOVED***
***REMOVED******REMOVED***;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ***REMOVED*** {
  if ( jQuery.isFunction( qualifier ***REMOVED*** ***REMOVED*** {
    return jQuery.grep( elements, function( elem, i ***REMOVED*** {
      /* jshint -W018 */
      return !!qualifier.call( elem, i, elem ***REMOVED*** !== not;
***REMOVED******REMOVED***;

  ***REMOVED***

  if ( qualifier.nodeType ***REMOVED*** {
    return jQuery.grep( elements, function( elem ***REMOVED*** {
      return ( elem === qualifier ***REMOVED*** !== not;
***REMOVED******REMOVED***;

  ***REMOVED***

  if ( typeof qualifier === "string" ***REMOVED*** {
    if ( isSimple.test( qualifier ***REMOVED*** ***REMOVED*** {
      return jQuery.filter( qualifier, elements, not ***REMOVED***;
***REMOVED***

    qualifier = jQuery.filter( qualifier, elements ***REMOVED***;
  ***REMOVED***

  return jQuery.grep( elements, function( elem ***REMOVED*** {
    return ( core_indexOf.call( qualifier, elem ***REMOVED*** >= 0 ***REMOVED*** !== not;
  ***REMOVED******REMOVED***;
***REMOVED***
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param***REMOVED***(([\w:]+***REMOVED***[^>]****REMOVED***\/>/gi,
  rtagName = /<([\w:]+***REMOVED***/,
  rhtml = /<|&#?\w+;/,
  rnoInnerhtml = /<(?:script|style|link***REMOVED***/i,
  manipulation_rcheckableType = /^(?:checkbox|radio***REMOVED***$/i,
  // checked="checked" or checked
  rchecked = /checked\s*(?:[^=]|=\s*.checked.***REMOVED***/i,
  rscriptType = /^$|\/(?:java|ecma***REMOVED***script/i,
  rscriptTypeMasked = /^true\/(.****REMOVED***/,
  rcleanScript = /^\s*<!(?:\[CDATA\[|--***REMOVED***|(?:\]\]|--***REMOVED***>\s*$/g,

  // We have to close these tags to support XHTML (#13200***REMOVED***
  wrapMap = {

    // Support: IE 9
    option: [ 1, "<select multiple='multiple'>", "</select>" ],

    thead: [ 1, "<table>", "</table>" ],
    col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

    _default: [ 0, "", "" ]
  ***REMOVED***;

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
  text: function( value ***REMOVED*** {
    return jQuery.access( this, function( value ***REMOVED*** {
      return value === undefined ?
        jQuery.text( this ***REMOVED*** :
        this.empty(***REMOVED***.append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ***REMOVED***.createTextNode( value ***REMOVED*** ***REMOVED***;
***REMOVED***, null, value, arguments.length ***REMOVED***;
  ***REMOVED***,

  append: function(***REMOVED*** {
    return this.domManip( arguments, function( elem ***REMOVED*** {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ***REMOVED*** {
        var target = manipulationTarget( this, elem ***REMOVED***;
        target.appendChild( elem ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  prepend: function(***REMOVED*** {
    return this.domManip( arguments, function( elem ***REMOVED*** {
      if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ***REMOVED*** {
        var target = manipulationTarget( this, elem ***REMOVED***;
        target.insertBefore( elem, target.firstChild ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  before: function(***REMOVED*** {
    return this.domManip( arguments, function( elem ***REMOVED*** {
      if ( this.parentNode ***REMOVED*** {
        this.parentNode.insertBefore( elem, this ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  after: function(***REMOVED*** {
    return this.domManip( arguments, function( elem ***REMOVED*** {
      if ( this.parentNode ***REMOVED*** {
        this.parentNode.insertBefore( elem, this.nextSibling ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  // keepData is for internal use only--do not document
  remove: function( selector, keepData ***REMOVED*** {
    var elem,
      elems = selector ? jQuery.filter( selector, this ***REMOVED*** : this,
      i = 0;

    for ( ; (elem = elems[i]***REMOVED*** != null; i++ ***REMOVED*** {
      if ( !keepData && elem.nodeType === 1 ***REMOVED*** {
        jQuery.cleanData( getAll( elem ***REMOVED*** ***REMOVED***;
  ***REMOVED***

      if ( elem.parentNode ***REMOVED*** {
        if ( keepData && jQuery.contains( elem.ownerDocument, elem ***REMOVED*** ***REMOVED*** {
          setGlobalEval( getAll( elem, "script" ***REMOVED*** ***REMOVED***;
    ***REMOVED***
        elem.parentNode.removeChild( elem ***REMOVED***;
  ***REMOVED***
***REMOVED***

    return this;
  ***REMOVED***,

  empty: function(***REMOVED*** {
    var elem,
      i = 0;

    for ( ; (elem = this[i]***REMOVED*** != null; i++ ***REMOVED*** {
      if ( elem.nodeType === 1 ***REMOVED*** {

        // Prevent memory leaks
        jQuery.cleanData( getAll( elem, false ***REMOVED*** ***REMOVED***;

        // Remove any remaining nodes
        elem.textContent = "";
  ***REMOVED***
***REMOVED***

    return this;
  ***REMOVED***,

  clone: function( dataAndEvents, deepDataAndEvents ***REMOVED*** {
    dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
    deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

    return this.map( function (***REMOVED*** {
      return jQuery.clone( this, dataAndEvents, deepDataAndEvents ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,

  html: function( value ***REMOVED*** {
    return jQuery.access( this, function( value ***REMOVED*** {
      var elem = this[ 0 ] || {***REMOVED***,
        i = 0,
        l = this.length;

      if ( value === undefined && elem.nodeType === 1 ***REMOVED*** {
        return elem.innerHTML;
  ***REMOVED***

      // See if we can take a shortcut and just use innerHTML
      if ( typeof value === "string" && !rnoInnerhtml.test( value ***REMOVED*** &&
        !wrapMap[ ( rtagName.exec( value ***REMOVED*** || [ "", "" ] ***REMOVED***[ 1 ].toLowerCase(***REMOVED*** ] ***REMOVED*** {

        value = value.replace( rxhtmlTag, "<$1></$2>" ***REMOVED***;

        try {
          for ( ; i < l; i++ ***REMOVED*** {
            elem = this[ i ] || {***REMOVED***;

            // Remove element nodes and prevent memory leaks
            if ( elem.nodeType === 1 ***REMOVED*** {
              jQuery.cleanData( getAll( elem, false ***REMOVED*** ***REMOVED***;
              elem.innerHTML = value;
        ***REMOVED***
      ***REMOVED***

          elem = 0;

        // If using innerHTML throws an exception, use the fallback method
    ***REMOVED*** catch( e ***REMOVED*** {***REMOVED***
  ***REMOVED***

      if ( elem ***REMOVED*** {
        this.empty(***REMOVED***.append( value ***REMOVED***;
  ***REMOVED***
***REMOVED***, null, value, arguments.length ***REMOVED***;
  ***REMOVED***,

  replaceWith: function(***REMOVED*** {
    var
      // Snapshot the DOM in case .domManip sweeps something relevant into its fragment
      args = jQuery.map( this, function( elem ***REMOVED*** {
        return [ elem.nextSibling, elem.parentNode ];
  ***REMOVED******REMOVED***,
      i = 0;

    // Make the changes, replacing each context element with the new content
    this.domManip( arguments, function( elem ***REMOVED*** {
      var next = args[ i++ ],
        parent = args[ i++ ];

      if ( parent ***REMOVED*** {
        // Don't use the snapshot next if it has moved (#13810***REMOVED***
        if ( next && next.parentNode !== parent ***REMOVED*** {
          next = this.nextSibling;
    ***REMOVED***
        jQuery( this ***REMOVED***.remove(***REMOVED***;
        parent.insertBefore( elem, next ***REMOVED***;
  ***REMOVED***
    // Allow new content to include elements from the context set
***REMOVED***, true ***REMOVED***;

    // Force removal if there was no new content (e.g., from empty arguments***REMOVED***
    return i ? this : this.remove(***REMOVED***;
  ***REMOVED***,

  detach: function( selector ***REMOVED*** {
    return this.remove( selector, true ***REMOVED***;
  ***REMOVED***,

  domManip: function( args, callback, allowIntersection ***REMOVED*** {

    // Flatten any nested arrays
    args = core_concat.apply( [], args ***REMOVED***;

    var fragment, first, scripts, hasScripts, node, doc,
      i = 0,
      l = this.length,
      set = this,
      iNoClone = l - 1,
      value = args[ 0 ],
      isFunction = jQuery.isFunction( value ***REMOVED***;

    // We can't cloneNode fragments that contain checked, in WebKit
    if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ***REMOVED*** ***REMOVED*** ***REMOVED*** {
      return this.each(function( index ***REMOVED*** {
        var self = set.eq( index ***REMOVED***;
        if ( isFunction ***REMOVED*** {
          args[ 0 ] = value.call( this, index, self.html(***REMOVED*** ***REMOVED***;
    ***REMOVED***
        self.domManip( args, callback, allowIntersection ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    if ( l ***REMOVED*** {
      fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this ***REMOVED***;
      first = fragment.firstChild;

      if ( fragment.childNodes.length === 1 ***REMOVED*** {
        fragment = first;
  ***REMOVED***

      if ( first ***REMOVED*** {
        scripts = jQuery.map( getAll( fragment, "script" ***REMOVED***, disableScript ***REMOVED***;
        hasScripts = scripts.length;

        // Use the original fragment for the last item instead of the first because it can end up
        // being emptied incorrectly in certain situations (#8070***REMOVED***.
        for ( ; i < l; i++ ***REMOVED*** {
          node = fragment;

          if ( i !== iNoClone ***REMOVED*** {
            node = jQuery.clone( node, true, true ***REMOVED***;

            // Keep references to cloned scripts for later restoration
            if ( hasScripts ***REMOVED*** {
              // Support: QtWebKit
              // jQuery.merge because core_push.apply(_, arraylike***REMOVED*** throws
              jQuery.merge( scripts, getAll( node, "script" ***REMOVED*** ***REMOVED***;
        ***REMOVED***
      ***REMOVED***

          callback.call( this[ i ], node, i ***REMOVED***;
    ***REMOVED***

        if ( hasScripts ***REMOVED*** {
          doc = scripts[ scripts.length - 1 ].ownerDocument;

          // Reenable scripts
          jQuery.map( scripts, restoreScript ***REMOVED***;

          // Evaluate executable scripts on first document insertion
          for ( i = 0; i < hasScripts; i++ ***REMOVED*** {
            node = scripts[ i ];
            if ( rscriptType.test( node.type || "" ***REMOVED*** &&
              !data_priv.access( node, "globalEval" ***REMOVED*** && jQuery.contains( doc, node ***REMOVED*** ***REMOVED*** {

              if ( node.src ***REMOVED*** {
                // Hope ajax is available...
                jQuery._evalUrl( node.src ***REMOVED***;
          ***REMOVED*** else {
                jQuery.globalEval( node.textContent.replace( rcleanScript, "" ***REMOVED*** ***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return this;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.each({
  appendTo: "append",
  prependTo: "prepend",
  insertBefore: "before",
  insertAfter: "after",
  replaceAll: "replaceWith"
***REMOVED***, function( name, original ***REMOVED*** {
  jQuery.fn[ name ] = function( selector ***REMOVED*** {
    var elems,
      ret = [],
      insert = jQuery( selector ***REMOVED***,
      last = insert.length - 1,
      i = 0;

    for ( ; i <= last; i++ ***REMOVED*** {
      elems = i === last ? this : this.clone( true ***REMOVED***;
      jQuery( insert[ i ] ***REMOVED***[ original ]( elems ***REMOVED***;

      // Support: QtWebKit
      // .get(***REMOVED*** because core_push.apply(_, arraylike***REMOVED*** throws
      core_push.apply( ret, elems.get(***REMOVED*** ***REMOVED***;
***REMOVED***

    return this.pushStack( ret ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.extend({
  clone: function( elem, dataAndEvents, deepDataAndEvents ***REMOVED*** {
    var i, l, srcElements, destElements,
      clone = elem.cloneNode( true ***REMOVED***,
      inPage = jQuery.contains( elem.ownerDocument, elem ***REMOVED***;

    // Support: IE >= 9
    // Fix Cloning issues
    if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ***REMOVED*** && !jQuery.isXMLDoc( elem ***REMOVED*** ***REMOVED*** {

      // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
      destElements = getAll( clone ***REMOVED***;
      srcElements = getAll( elem ***REMOVED***;

      for ( i = 0, l = srcElements.length; i < l; i++ ***REMOVED*** {
        fixInput( srcElements[ i ], destElements[ i ] ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Copy the events from the original to the clone
    if ( dataAndEvents ***REMOVED*** {
      if ( deepDataAndEvents ***REMOVED*** {
        srcElements = srcElements || getAll( elem ***REMOVED***;
        destElements = destElements || getAll( clone ***REMOVED***;

        for ( i = 0, l = srcElements.length; i < l; i++ ***REMOVED*** {
          cloneCopyEvent( srcElements[ i ], destElements[ i ] ***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else {
        cloneCopyEvent( elem, clone ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Preserve script evaluation history
    destElements = getAll( clone, "script" ***REMOVED***;
    if ( destElements.length > 0 ***REMOVED*** {
      setGlobalEval( destElements, !inPage && getAll( elem, "script" ***REMOVED*** ***REMOVED***;
***REMOVED***

    // Return the cloned set
    return clone;
  ***REMOVED***,

  buildFragment: function( elems, context, scripts, selection ***REMOVED*** {
    var elem, tmp, tag, wrap, contains, j,
      i = 0,
      l = elems.length,
      fragment = context.createDocumentFragment(***REMOVED***,
      nodes = [];

    for ( ; i < l; i++ ***REMOVED*** {
      elem = elems[ i ];

      if ( elem || elem === 0 ***REMOVED*** {

        // Add nodes directly
        if ( jQuery.type( elem ***REMOVED*** === "object" ***REMOVED*** {
          // Support: QtWebKit
          // jQuery.merge because core_push.apply(_, arraylike***REMOVED*** throws
          jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem ***REMOVED***;

        // Convert non-html into a text node
    ***REMOVED*** else if ( !rhtml.test( elem ***REMOVED*** ***REMOVED*** {
          nodes.push( context.createTextNode( elem ***REMOVED*** ***REMOVED***;

        // Convert html into DOM nodes
    ***REMOVED*** else {
          tmp = tmp || fragment.appendChild( context.createElement("div"***REMOVED*** ***REMOVED***;

          // Deserialize a standard representation
          tag = ( rtagName.exec( elem ***REMOVED*** || ["", ""] ***REMOVED***[ 1 ].toLowerCase(***REMOVED***;
          wrap = wrapMap[ tag ] || wrapMap._default;
          tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ***REMOVED*** + wrap[ 2 ];

          // Descend through wrappers to the right content
          j = wrap[ 0 ];
          while ( j-- ***REMOVED*** {
            tmp = tmp.lastChild;
      ***REMOVED***

          // Support: QtWebKit
          // jQuery.merge because core_push.apply(_, arraylike***REMOVED*** throws
          jQuery.merge( nodes, tmp.childNodes ***REMOVED***;

          // Remember the top-level container
          tmp = fragment.firstChild;

          // Fixes #12346
          // Support: Webkit, IE
          tmp.textContent = "";
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Remove wrapper from fragment
    fragment.textContent = "";

    i = 0;
    while ( (elem = nodes[ i++ ]***REMOVED*** ***REMOVED*** {

      // #4087 - If origin and destination elements are the same, and this is
      // that element, do not do anything
      if ( selection && jQuery.inArray( elem, selection ***REMOVED*** !== -1 ***REMOVED*** {
        continue;
  ***REMOVED***

      contains = jQuery.contains( elem.ownerDocument, elem ***REMOVED***;

      // Append to fragment
      tmp = getAll( fragment.appendChild( elem ***REMOVED***, "script" ***REMOVED***;

      // Preserve script evaluation history
      if ( contains ***REMOVED*** {
        setGlobalEval( tmp ***REMOVED***;
  ***REMOVED***

      // Capture executables
      if ( scripts ***REMOVED*** {
        j = 0;
        while ( (elem = tmp[ j++ ]***REMOVED*** ***REMOVED*** {
          if ( rscriptType.test( elem.type || "" ***REMOVED*** ***REMOVED*** {
            scripts.push( elem ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return fragment;
  ***REMOVED***,

  cleanData: function( elems ***REMOVED*** {
    var data, elem, events, type, key, j,
      special = jQuery.event.special,
      i = 0;

    for ( ; (elem = elems[ i ]***REMOVED*** !== undefined; i++ ***REMOVED*** {
      if ( Data.accepts( elem ***REMOVED*** ***REMOVED*** {
        key = elem[ data_priv.expando ];

        if ( key && (data = data_priv.cache[ key ]***REMOVED*** ***REMOVED*** {
          events = Object.keys( data.events || {***REMOVED*** ***REMOVED***;
          if ( events.length ***REMOVED*** {
            for ( j = 0; (type = events[j]***REMOVED*** !== undefined; j++ ***REMOVED*** {
              if ( special[ type ] ***REMOVED*** {
                jQuery.event.remove( elem, type ***REMOVED***;

              // This is a shortcut to avoid jQuery.event.remove's overhead
          ***REMOVED*** else {
                jQuery.removeEvent( elem, type, data.handle ***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
          if ( data_priv.cache[ key ] ***REMOVED*** {
            // Discard any remaining `private` data
            delete data_priv.cache[ key ];
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
      // Discard any remaining `user` data
      delete data_user.cache[ elem[ data_user.expando ] ];
***REMOVED***
  ***REMOVED***,

  _evalUrl: function( url ***REMOVED*** {
    return jQuery.ajax({
      url: url,
      type: "GET",
      dataType: "script",
      async: false,
      global: false,
      "throws": true
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ***REMOVED*** {
  return jQuery.nodeName( elem, "table" ***REMOVED*** &&
    jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ***REMOVED*** ?

    elem.getElementsByTagName("tbody"***REMOVED***[0] ||
      elem.appendChild( elem.ownerDocument.createElement("tbody"***REMOVED*** ***REMOVED*** :
    elem;
***REMOVED***

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ***REMOVED*** {
  elem.type = (elem.getAttribute("type"***REMOVED*** !== null***REMOVED*** + "/" + elem.type;
  return elem;
***REMOVED***
function restoreScript( elem ***REMOVED*** {
  var match = rscriptTypeMasked.exec( elem.type ***REMOVED***;

  if ( match ***REMOVED*** {
    elem.type = match[ 1 ];
  ***REMOVED*** else {
    elem.removeAttribute("type"***REMOVED***;
  ***REMOVED***

  return elem;
***REMOVED***

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ***REMOVED*** {
  var l = elems.length,
    i = 0;

  for ( ; i < l; i++ ***REMOVED*** {
    data_priv.set(
      elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" ***REMOVED***
    ***REMOVED***;
  ***REMOVED***
***REMOVED***

function cloneCopyEvent( src, dest ***REMOVED*** {
  var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

  if ( dest.nodeType !== 1 ***REMOVED*** {
    return;
  ***REMOVED***

  // 1. Copy private data: events, handlers, etc.
  if ( data_priv.hasData( src ***REMOVED*** ***REMOVED*** {
    pdataOld = data_priv.access( src ***REMOVED***;
    pdataCur = data_priv.set( dest, pdataOld ***REMOVED***;
    events = pdataOld.events;

    if ( events ***REMOVED*** {
      delete pdataCur.handle;
      pdataCur.events = {***REMOVED***;

      for ( type in events ***REMOVED*** {
        for ( i = 0, l = events[ type ].length; i < l; i++ ***REMOVED*** {
          jQuery.event.add( dest, type, events[ type ][ i ] ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // 2. Copy user data
  if ( data_user.hasData( src ***REMOVED*** ***REMOVED*** {
    udataOld = data_user.access( src ***REMOVED***;
    udataCur = jQuery.extend( {***REMOVED***, udataOld ***REMOVED***;

    data_user.set( dest, udataCur ***REMOVED***;
  ***REMOVED***
***REMOVED***


function getAll( context, tag ***REMOVED*** {
  var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ***REMOVED*** :
      context.querySelectorAll ? context.querySelectorAll( tag || "*" ***REMOVED*** :
      [];

  return tag === undefined || tag && jQuery.nodeName( context, tag ***REMOVED*** ?
    jQuery.merge( [ context ], ret ***REMOVED*** :
    ret;
***REMOVED***

// Support: IE >= 9
function fixInput( src, dest ***REMOVED*** {
  var nodeName = dest.nodeName.toLowerCase(***REMOVED***;

  // Fails to persist the checked state of a cloned checkbox or radio button.
  if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ***REMOVED*** ***REMOVED*** {
    dest.checked = src.checked;

  // Fails to return the selected option to the default selected state when cloning options
  ***REMOVED*** else if ( nodeName === "input" || nodeName === "textarea" ***REMOVED*** {
    dest.defaultValue = src.defaultValue;
  ***REMOVED***
***REMOVED***
jQuery.fn.extend({
  wrapAll: function( html ***REMOVED*** {
    var wrap;

    if ( jQuery.isFunction( html ***REMOVED*** ***REMOVED*** {
      return this.each(function( i ***REMOVED*** {
        jQuery( this ***REMOVED***.wrapAll( html.call(this, i***REMOVED*** ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    if ( this[ 0 ] ***REMOVED*** {

      // The elements to wrap the target around
      wrap = jQuery( html, this[ 0 ].ownerDocument ***REMOVED***.eq( 0 ***REMOVED***.clone( true ***REMOVED***;

      if ( this[ 0 ].parentNode ***REMOVED*** {
        wrap.insertBefore( this[ 0 ] ***REMOVED***;
  ***REMOVED***

      wrap.map(function(***REMOVED*** {
        var elem = this;

        while ( elem.firstElementChild ***REMOVED*** {
          elem = elem.firstElementChild;
    ***REMOVED***

        return elem;
  ***REMOVED******REMOVED***.append( this ***REMOVED***;
***REMOVED***

    return this;
  ***REMOVED***,

  wrapInner: function( html ***REMOVED*** {
    if ( jQuery.isFunction( html ***REMOVED*** ***REMOVED*** {
      return this.each(function( i ***REMOVED*** {
        jQuery( this ***REMOVED***.wrapInner( html.call(this, i***REMOVED*** ***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***

    return this.each(function(***REMOVED*** {
      var self = jQuery( this ***REMOVED***,
        contents = self.contents(***REMOVED***;

      if ( contents.length ***REMOVED*** {
        contents.wrapAll( html ***REMOVED***;

  ***REMOVED*** else {
        self.append( html ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,

  wrap: function( html ***REMOVED*** {
    var isFunction = jQuery.isFunction( html ***REMOVED***;

    return this.each(function( i ***REMOVED*** {
      jQuery( this ***REMOVED***.wrapAll( isFunction ? html.call(this, i***REMOVED*** : html ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***,

  unwrap: function(***REMOVED*** {
    return this.parent(***REMOVED***.each(function(***REMOVED*** {
      if ( !jQuery.nodeName( this, "body" ***REMOVED*** ***REMOVED*** {
        jQuery( this ***REMOVED***.replaceWith( this.childNodes ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***.end(***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var curCSS, iframe,
  // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
  // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
  rdisplayswap = /^(none|table(?!-c[ea]***REMOVED***.+***REMOVED***/,
  rmargin = /^margin/,
  rnumsplit = new RegExp( "^(" + core_pnum + "***REMOVED***(.****REMOVED***$", "i" ***REMOVED***,
  rnumnonpx = new RegExp( "^(" + core_pnum + "***REMOVED***(?!px***REMOVED***[a-z%]+$", "i" ***REMOVED***,
  rrelNum = new RegExp( "^([+-]***REMOVED***=(" + core_pnum + "***REMOVED***", "i" ***REMOVED***,
  elemdisplay = { BODY: "block" ***REMOVED***,

  cssShow = { position: "absolute", visibility: "hidden", display: "block" ***REMOVED***,
  cssNormalTransform = {
    letterSpacing: 0,
    fontWeight: 400
  ***REMOVED***,

  cssExpand = [ "Top", "Right", "Bottom", "Left" ],
  cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ***REMOVED*** {

  // shortcut for names that are not vendor prefixed
  if ( name in style ***REMOVED*** {
    return name;
  ***REMOVED***

  // check for vendor prefixed names
  var capName = name.charAt(0***REMOVED***.toUpperCase(***REMOVED*** + name.slice(1***REMOVED***,
    origName = name,
    i = cssPrefixes.length;

  while ( i-- ***REMOVED*** {
    name = cssPrefixes[ i ] + capName;
    if ( name in style ***REMOVED*** {
      return name;
***REMOVED***
  ***REMOVED***

  return origName;
***REMOVED***

function isHidden( elem, el ***REMOVED*** {
  // isHidden might be called from jQuery#filter function;
  // in that case, element will be second argument
  elem = el || elem;
  return jQuery.css( elem, "display" ***REMOVED*** === "none" || !jQuery.contains( elem.ownerDocument, elem ***REMOVED***;
***REMOVED***

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ***REMOVED*** {
  return window.getComputedStyle( elem, null ***REMOVED***;
***REMOVED***

function showHide( elements, show ***REMOVED*** {
  var display, elem, hidden,
    values = [],
    index = 0,
    length = elements.length;

  for ( ; index < length; index++ ***REMOVED*** {
    elem = elements[ index ];
    if ( !elem.style ***REMOVED*** {
      continue;
***REMOVED***

    values[ index ] = data_priv.get( elem, "olddisplay" ***REMOVED***;
    display = elem.style.display;
    if ( show ***REMOVED*** {
      // Reset the inline display of this element to learn if it is
      // being hidden by cascaded rules or not
      if ( !values[ index ] && display === "none" ***REMOVED*** {
        elem.style.display = "";
  ***REMOVED***

      // Set elements which have been overridden with display: none
      // in a stylesheet to whatever the default browser style is
      // for such an element
      if ( elem.style.display === "" && isHidden( elem ***REMOVED*** ***REMOVED*** {
        values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName***REMOVED*** ***REMOVED***;
  ***REMOVED***
***REMOVED*** else {

      if ( !values[ index ] ***REMOVED*** {
        hidden = isHidden( elem ***REMOVED***;

        if ( display && display !== "none" || !hidden ***REMOVED*** {
          data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"***REMOVED*** ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // Set the display of most of the elements in a second loop
  // to avoid the constant reflow
  for ( index = 0; index < length; index++ ***REMOVED*** {
    elem = elements[ index ];
    if ( !elem.style ***REMOVED*** {
      continue;
***REMOVED***
    if ( !show || elem.style.display === "none" || elem.style.display === "" ***REMOVED*** {
      elem.style.display = show ? values[ index ] || "" : "none";
***REMOVED***
  ***REMOVED***

  return elements;
***REMOVED***

jQuery.fn.extend({
  css: function( name, value ***REMOVED*** {
    return jQuery.access( this, function( elem, name, value ***REMOVED*** {
      var styles, len,
        map = {***REMOVED***,
        i = 0;

      if ( jQuery.isArray( name ***REMOVED*** ***REMOVED*** {
        styles = getStyles( elem ***REMOVED***;
        len = name.length;

        for ( ; i < len; i++ ***REMOVED*** {
          map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles ***REMOVED***;
    ***REMOVED***

        return map;
  ***REMOVED***

      return value !== undefined ?
        jQuery.style( elem, name, value ***REMOVED*** :
        jQuery.css( elem, name ***REMOVED***;
***REMOVED***, name, value, arguments.length > 1 ***REMOVED***;
  ***REMOVED***,
  show: function(***REMOVED*** {
    return showHide( this, true ***REMOVED***;
  ***REMOVED***,
  hide: function(***REMOVED*** {
    return showHide( this ***REMOVED***;
  ***REMOVED***,
  toggle: function( state ***REMOVED*** {
    if ( typeof state === "boolean" ***REMOVED*** {
      return state ? this.show(***REMOVED*** : this.hide(***REMOVED***;
***REMOVED***

    return this.each(function(***REMOVED*** {
      if ( isHidden( this ***REMOVED*** ***REMOVED*** {
        jQuery( this ***REMOVED***.show(***REMOVED***;
  ***REMOVED*** else {
        jQuery( this ***REMOVED***.hide(***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.extend({
  // Add in style property hooks for overriding the default
  // behavior of getting and setting a style property
  cssHooks: {
    opacity: {
      get: function( elem, computed ***REMOVED*** {
        if ( computed ***REMOVED*** {
          // We should always get a number back from opacity
          var ret = curCSS( elem, "opacity" ***REMOVED***;
          return ret === "" ? "1" : ret;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***,

  // Don't automatically add "px" to these possibly-unitless properties
  cssNumber: {
    "columnCount": true,
    "fillOpacity": true,
    "fontWeight": true,
    "lineHeight": true,
    "opacity": true,
    "order": true,
    "orphans": true,
    "widows": true,
    "zIndex": true,
    "zoom": true
  ***REMOVED***,

  // Add in properties whose names you wish to fix before
  // setting or getting the value
  cssProps: {
    // normalize float css property
    "float": "cssFloat"
  ***REMOVED***,

  // Get and set the style property on a DOM Node
  style: function( elem, name, value, extra ***REMOVED*** {
    // Don't set styles on text and comment nodes
    if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ***REMOVED*** {
      return;
***REMOVED***

    // Make sure that we're working with the right name
    var ret, type, hooks,
      origName = jQuery.camelCase( name ***REMOVED***,
      style = elem.style;

    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ***REMOVED*** ***REMOVED***;

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // Check if we're setting a value
    if ( value !== undefined ***REMOVED*** {
      type = typeof value;

      // convert relative number strings (+= or -=***REMOVED*** to relative numbers. #7345
      if ( type === "string" && (ret = rrelNum.exec( value ***REMOVED******REMOVED*** ***REMOVED*** {
        value = ( ret[1] + 1 ***REMOVED*** * ret[2] + parseFloat( jQuery.css( elem, name ***REMOVED*** ***REMOVED***;
        // Fixes bug #9237
        type = "number";
  ***REMOVED***

      // Make sure that NaN and null values aren't set. See: #7116
      if ( value == null || type === "number" && isNaN( value ***REMOVED*** ***REMOVED*** {
        return;
  ***REMOVED***

      // If a number was passed in, add 'px' to the (except for certain CSS properties***REMOVED***
      if ( type === "number" && !jQuery.cssNumber[ origName ] ***REMOVED*** {
        value += "px";
  ***REMOVED***

      // Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
      // but it would mean to define eight (for every problematic property***REMOVED*** identical functions
      if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background"***REMOVED*** === 0 ***REMOVED*** {
        style[ name ] = "inherit";
  ***REMOVED***

      // If a hook was provided, use that value, otherwise just set the specified value
      if ( !hooks || !("set" in hooks***REMOVED*** || (value = hooks.set( elem, value, extra ***REMOVED******REMOVED*** !== undefined ***REMOVED*** {
        style[ name ] = value;
  ***REMOVED***

***REMOVED*** else {
      // If a hook was provided get the non-computed value from there
      if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra ***REMOVED******REMOVED*** !== undefined ***REMOVED*** {
        return ret;
  ***REMOVED***

      // Otherwise just get the value from the style object
      return style[ name ];
***REMOVED***
  ***REMOVED***,

  css: function( elem, name, extra, styles ***REMOVED*** {
    var val, num, hooks,
      origName = jQuery.camelCase( name ***REMOVED***;

    // Make sure that we're working with the right name
    name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ***REMOVED*** ***REMOVED***;

    // gets hook for the prefixed version
    // followed by the unprefixed version
    hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

    // If a hook was provided get the computed value from there
    if ( hooks && "get" in hooks ***REMOVED*** {
      val = hooks.get( elem, true, extra ***REMOVED***;
***REMOVED***

    // Otherwise, if a way to get the computed value exists, use that
    if ( val === undefined ***REMOVED*** {
      val = curCSS( elem, name, styles ***REMOVED***;
***REMOVED***

    //convert "normal" to computed value
    if ( val === "normal" && name in cssNormalTransform ***REMOVED*** {
      val = cssNormalTransform[ name ];
***REMOVED***

    // Return, converting to number if forced or a qualifier was provided and val looks numeric
    if ( extra === "" || extra ***REMOVED*** {
      num = parseFloat( val ***REMOVED***;
      return extra === true || jQuery.isNumeric( num ***REMOVED*** ? num || 0 : val;
***REMOVED***
    return val;
  ***REMOVED***
***REMOVED******REMOVED***;

curCSS = function( elem, name, _computed ***REMOVED*** {
  var width, minWidth, maxWidth,
    computed = _computed || getStyles( elem ***REMOVED***,

    // Support: IE9
    // getPropertyValue is only needed for .css('filter'***REMOVED*** in IE9, see #12537
    ret = computed ? computed.getPropertyValue( name ***REMOVED*** || computed[ name ] : undefined,
    style = elem.style;

  if ( computed ***REMOVED*** {

    if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ***REMOVED*** ***REMOVED*** {
      ret = jQuery.style( elem, name ***REMOVED***;
***REMOVED***

    // Support: Safari 5.1
    // A tribute to the "awesome hack by Dean Edwards"
    // Safari 5.1.7 (at least***REMOVED*** returns percentage for a larger set of values, but width seems to be reliably pixels
    // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
    if ( rnumnonpx.test( ret ***REMOVED*** && rmargin.test( name ***REMOVED*** ***REMOVED*** {

      // Remember the original values
      width = style.width;
      minWidth = style.minWidth;
      maxWidth = style.maxWidth;

      // Put in the new values to get a computed value out
      style.minWidth = style.maxWidth = style.width = ret;
      ret = computed.width;

      // Revert the changed values
      style.width = width;
      style.minWidth = minWidth;
      style.maxWidth = maxWidth;
***REMOVED***
  ***REMOVED***

  return ret;
***REMOVED***;


function setPositiveNumber( elem, value, subtract ***REMOVED*** {
  var matches = rnumsplit.exec( value ***REMOVED***;
  return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max( 0, matches[ 1 ] - ( subtract || 0 ***REMOVED*** ***REMOVED*** + ( matches[ 2 ] || "px" ***REMOVED*** :
    value;
***REMOVED***

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ***REMOVED*** {
  var i = extra === ( isBorderBox ? "border" : "content" ***REMOVED*** ?
    // If we already have the right measurement, avoid augmentation
    4 :
    // Otherwise initialize for horizontal or vertical properties
    name === "width" ? 1 : 0,

    val = 0;

  for ( ; i < 4; i += 2 ***REMOVED*** {
    // both box models exclude margin, so add it if we want it
    if ( extra === "margin" ***REMOVED*** {
      val += jQuery.css( elem, extra + cssExpand[ i ], true, styles ***REMOVED***;
***REMOVED***

    if ( isBorderBox ***REMOVED*** {
      // border-box includes padding, so remove it if we want content
      if ( extra === "content" ***REMOVED*** {
        val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles ***REMOVED***;
  ***REMOVED***

      // at this point, extra isn't border nor margin, so remove border
      if ( extra !== "margin" ***REMOVED*** {
        val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles ***REMOVED***;
  ***REMOVED***
***REMOVED*** else {
      // at this point, extra isn't content, so add padding
      val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles ***REMOVED***;

      // at this point, extra isn't content nor padding, so add border
      if ( extra !== "padding" ***REMOVED*** {
        val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles ***REMOVED***;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  return val;
***REMOVED***

function getWidthOrHeight( elem, name, extra ***REMOVED*** {

  // Start with offset property, which is equivalent to the border-box value
  var valueIsBorderBox = true,
    val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
    styles = getStyles( elem ***REMOVED***,
    isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ***REMOVED*** === "border-box";

  // some non-html elements return undefined for offsetWidth, so check for null/undefined
  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
  if ( val <= 0 || val == null ***REMOVED*** {
    // Fall back to computed then uncomputed css if necessary
    val = curCSS( elem, name, styles ***REMOVED***;
    if ( val < 0 || val == null ***REMOVED*** {
      val = elem.style[ name ];
***REMOVED***

    // Computed unit is not pixels. Stop here and return.
    if ( rnumnonpx.test(val***REMOVED*** ***REMOVED*** {
      return val;
***REMOVED***

    // we need the check for style in case a browser which returns unreliable values
    // for getComputedStyle silently falls back to the reliable elem.style
    valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] ***REMOVED***;

    // Normalize "", auto, and prepare for extra
    val = parseFloat( val ***REMOVED*** || 0;
  ***REMOVED***

  // use the active box-sizing model to add/subtract irrelevant styles
  return ( val +
    augmentWidthOrHeight(
      elem,
      name,
      extra || ( isBorderBox ? "border" : "content" ***REMOVED***,
      valueIsBorderBox,
      styles
    ***REMOVED***
  ***REMOVED*** + "px";
***REMOVED***

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ***REMOVED*** {
  var doc = document,
    display = elemdisplay[ nodeName ];

  if ( !display ***REMOVED*** {
    display = actualDisplay( nodeName, doc ***REMOVED***;

    // If the simple way fails, read from inside an iframe
    if ( display === "none" || !display ***REMOVED*** {
      // Use the already-created iframe if possible
      iframe = ( iframe ||
        jQuery("<iframe frameborder='0' width='0' height='0'/>"***REMOVED***
        .css( "cssText", "display:block !important" ***REMOVED***
      ***REMOVED***.appendTo( doc.documentElement ***REMOVED***;

      // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
      doc = ( iframe[0].contentWindow || iframe[0].contentDocument ***REMOVED***.document;
      doc.write("<!doctype html><html><body>"***REMOVED***;
      doc.close(***REMOVED***;

      display = actualDisplay( nodeName, doc ***REMOVED***;
      iframe.detach(***REMOVED***;
***REMOVED***

    // Store the correct default display
    elemdisplay[ nodeName ] = display;
  ***REMOVED***

  return display;
***REMOVED***

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ***REMOVED*** {
  var elem = jQuery( doc.createElement( name ***REMOVED*** ***REMOVED***.appendTo( doc.body ***REMOVED***,
    display = jQuery.css( elem[0], "display" ***REMOVED***;
  elem.remove(***REMOVED***;
  return display;
***REMOVED***

jQuery.each([ "height", "width" ], function( i, name ***REMOVED*** {
  jQuery.cssHooks[ name ] = {
    get: function( elem, computed, extra ***REMOVED*** {
      if ( computed ***REMOVED*** {
        // certain elements can have dimension info if we invisibly show them
        // however, it must have a current display style that would benefit from this
        return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ***REMOVED*** ***REMOVED*** ?
          jQuery.swap( elem, cssShow, function(***REMOVED*** {
            return getWidthOrHeight( elem, name, extra ***REMOVED***;
      ***REMOVED******REMOVED*** :
          getWidthOrHeight( elem, name, extra ***REMOVED***;
  ***REMOVED***
***REMOVED***,

    set: function( elem, value, extra ***REMOVED*** {
      var styles = extra && getStyles( elem ***REMOVED***;
      return setPositiveNumber( elem, value, extra ?
        augmentWidthOrHeight(
          elem,
          name,
          extra,
          jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ***REMOVED*** === "border-box",
          styles
        ***REMOVED*** : 0
      ***REMOVED***;
***REMOVED***
  ***REMOVED***;
***REMOVED******REMOVED***;

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function(***REMOVED*** {
  // Support: Android 2.3
  if ( !jQuery.support.reliableMarginRight ***REMOVED*** {
    jQuery.cssHooks.marginRight = {
      get: function( elem, computed ***REMOVED*** {
        if ( computed ***REMOVED*** {
          // Support: Android 2.3
          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
          // Work around by temporarily setting element display to inline-block
          return jQuery.swap( elem, { "display": "inline-block" ***REMOVED***,
            curCSS, [ elem, "marginRight" ] ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED***

  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // getComputedStyle returns percent when specified for top/left/bottom/right
  // rather than make the css module depend on the offset module, we just check for it here
  if ( !jQuery.support.pixelPosition && jQuery.fn.position ***REMOVED*** {
    jQuery.each( [ "top", "left" ], function( i, prop ***REMOVED*** {
      jQuery.cssHooks[ prop ] = {
        get: function( elem, computed ***REMOVED*** {
          if ( computed ***REMOVED*** {
            computed = curCSS( elem, prop ***REMOVED***;
            // if curCSS returns percentage, fallback to offset
            return rnumnonpx.test( computed ***REMOVED*** ?
              jQuery( elem ***REMOVED***.position(***REMOVED***[ prop ] + "px" :
              computed;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

***REMOVED******REMOVED***;

if ( jQuery.expr && jQuery.expr.filters ***REMOVED*** {
  jQuery.expr.filters.hidden = function( elem ***REMOVED*** {
    // Support: Opera <= 12.12
    // Opera reports offsetWidths and offsetHeights less than zero on some elements
    return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
  ***REMOVED***;

  jQuery.expr.filters.visible = function( elem ***REMOVED*** {
    return !jQuery.expr.filters.hidden( elem ***REMOVED***;
  ***REMOVED***;
***REMOVED***

// These hooks are used by animate to expand properties
jQuery.each({
  margin: "",
  padding: "",
  border: "Width"
***REMOVED***, function( prefix, suffix ***REMOVED*** {
  jQuery.cssHooks[ prefix + suffix ] = {
    expand: function( value ***REMOVED*** {
      var i = 0,
        expanded = {***REMOVED***,

        // assumes a single number if not a string
        parts = typeof value === "string" ? value.split(" "***REMOVED*** : [ value ];

      for ( ; i < 4; i++ ***REMOVED*** {
        expanded[ prefix + cssExpand[ i ] + suffix ] =
          parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
  ***REMOVED***

      return expanded;
***REMOVED***
  ***REMOVED***;

  if ( !rmargin.test( prefix ***REMOVED*** ***REMOVED*** {
    jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
  ***REMOVED***
***REMOVED******REMOVED***;
var r20 = /%20/g,
  rbracket = /\[\]$/,
  rCRLF = /\r?\n/g,
  rsubmitterTypes = /^(?:submit|button|image|reset|file***REMOVED***$/i,
  rsubmittable = /^(?:input|select|textarea|keygen***REMOVED***/i;

jQuery.fn.extend({
  serialize: function(***REMOVED*** {
    return jQuery.param( this.serializeArray(***REMOVED*** ***REMOVED***;
  ***REMOVED***,
  serializeArray: function(***REMOVED*** {
    return this.map(function(***REMOVED***{
      // Can add propHook for "elements" to filter or add form elements
      var elements = jQuery.prop( this, "elements" ***REMOVED***;
      return elements ? jQuery.makeArray( elements ***REMOVED*** : this;
***REMOVED******REMOVED***
    .filter(function(***REMOVED***{
      var type = this.type;
      // Use .is(":disabled"***REMOVED*** so that fieldset[disabled] works
      return this.name && !jQuery( this ***REMOVED***.is( ":disabled" ***REMOVED*** &&
        rsubmittable.test( this.nodeName ***REMOVED*** && !rsubmitterTypes.test( type ***REMOVED*** &&
        ( this.checked || !manipulation_rcheckableType.test( type ***REMOVED*** ***REMOVED***;
***REMOVED******REMOVED***
    .map(function( i, elem ***REMOVED***{
      var val = jQuery( this ***REMOVED***.val(***REMOVED***;

      return val == null ?
        null :
        jQuery.isArray( val ***REMOVED*** ?
          jQuery.map( val, function( val ***REMOVED***{
            return { name: elem.name, value: val.replace( rCRLF, "\r\n" ***REMOVED*** ***REMOVED***;
      ***REMOVED******REMOVED*** :
          { name: elem.name, value: val.replace( rCRLF, "\r\n" ***REMOVED*** ***REMOVED***;
***REMOVED******REMOVED***.get(***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ***REMOVED*** {
  var prefix,
    s = [],
    add = function( key, value ***REMOVED*** {
      // If value is a function, invoke it and return its value
      value = jQuery.isFunction( value ***REMOVED*** ? value(***REMOVED*** : ( value == null ? "" : value ***REMOVED***;
      s[ s.length ] = encodeURIComponent( key ***REMOVED*** + "=" + encodeURIComponent( value ***REMOVED***;
***REMOVED***;

  // Set traditional to true for jQuery <= 1.3.2 behavior.
  if ( traditional === undefined ***REMOVED*** {
    traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
  ***REMOVED***

  // If an array was passed in, assume that it is an array of form elements.
  if ( jQuery.isArray( a ***REMOVED*** || ( a.jquery && !jQuery.isPlainObject( a ***REMOVED*** ***REMOVED*** ***REMOVED*** {
    // Serialize the form elements
    jQuery.each( a, function(***REMOVED*** {
      add( this.name, this.value ***REMOVED***;
***REMOVED******REMOVED***;

  ***REMOVED*** else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it***REMOVED***, otherwise encode params recursively.
    for ( prefix in a ***REMOVED*** {
      buildParams( prefix, a[ prefix ], traditional, add ***REMOVED***;
***REMOVED***
  ***REMOVED***

  // Return the resulting serialization
  return s.join( "&" ***REMOVED***.replace( r20, "+" ***REMOVED***;
***REMOVED***;

function buildParams( prefix, obj, traditional, add ***REMOVED*** {
  var name;

  if ( jQuery.isArray( obj ***REMOVED*** ***REMOVED*** {
    // Serialize array item.
    jQuery.each( obj, function( i, v ***REMOVED*** {
      if ( traditional || rbracket.test( prefix ***REMOVED*** ***REMOVED*** {
        // Treat each array item as a scalar.
        add( prefix, v ***REMOVED***;

  ***REMOVED*** else {
        // Item is non-scalar (array or object***REMOVED***, encode its numeric index.
        buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ***REMOVED*** + "]", v, traditional, add ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

  ***REMOVED*** else if ( !traditional && jQuery.type( obj ***REMOVED*** === "object" ***REMOVED*** {
    // Serialize object item.
    for ( name in obj ***REMOVED*** {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add ***REMOVED***;
***REMOVED***

  ***REMOVED*** else {
    // Serialize scalar item.
    add( prefix, obj ***REMOVED***;
  ***REMOVED***
***REMOVED***
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
  "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
  "change select submit keydown keypress keyup error contextmenu"***REMOVED***.split(" "***REMOVED***, function( i, name ***REMOVED*** {

  // Handle event binding
  jQuery.fn[ name ] = function( data, fn ***REMOVED*** {
    return arguments.length > 0 ?
      this.on( name, null, data, fn ***REMOVED*** :
      this.trigger( name ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.fn.extend({
  hover: function( fnOver, fnOut ***REMOVED*** {
    return this.mouseenter( fnOver ***REMOVED***.mouseleave( fnOut || fnOver ***REMOVED***;
  ***REMOVED***,

  bind: function( types, data, fn ***REMOVED*** {
    return this.on( types, null, data, fn ***REMOVED***;
  ***REMOVED***,
  unbind: function( types, fn ***REMOVED*** {
    return this.off( types, null, fn ***REMOVED***;
  ***REMOVED***,

  delegate: function( selector, types, data, fn ***REMOVED*** {
    return this.on( types, selector, data, fn ***REMOVED***;
  ***REMOVED***,
  undelegate: function( selector, types, fn ***REMOVED*** {
    // ( namespace ***REMOVED*** or ( selector, types [, fn] ***REMOVED***
    return arguments.length === 1 ? this.off( selector, "**" ***REMOVED*** : this.off( types, selector || "**", fn ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var
  // Document location
  ajaxLocParts,
  ajaxLocation,

  ajax_nonce = jQuery.now(***REMOVED***,

  ajax_rquery = /\?/,
  rhash = /#.*$/,
  rts = /([?&]***REMOVED***_=[^&]*/,
  rheaders = /^(.*?***REMOVED***:[ \t]*([^\r\n]****REMOVED***$/mg,
  // #7653, #8125, #8152: local protocol detection
  rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget***REMOVED***:$/,
  rnoContent = /^(?:GET|HEAD***REMOVED***$/,
  rprotocol = /^\/\//,
  rurl = /^([\w.+-]+:***REMOVED***(?:\/\/([^\/?#:]****REMOVED***(?::(\d+***REMOVED***|***REMOVED***|***REMOVED***/,

  // Keep a copy of the old load method
  _load = jQuery.fn.load,

  /* Prefilters
   * 1***REMOVED*** They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example***REMOVED***
   * 2***REMOVED*** These are called:
   *    - BEFORE asking for a transport
   *    - AFTER param serialization (s.data is a string if s.processData is true***REMOVED***
   * 3***REMOVED*** key is the dataType
   * 4***REMOVED*** the catchall symbol "*" can be used
   * 5***REMOVED*** execution will start with transport dataType and THEN continue down to "*" if needed
   */
  prefilters = {***REMOVED***,

  /* Transports bindings
   * 1***REMOVED*** key is the dataType
   * 2***REMOVED*** the catchall symbol "*" can be used
   * 3***REMOVED*** selection will start with transport dataType and THEN go to "*" if needed
   */
  transports = {***REMOVED***,

  // Avoid comment-prolog char sequence (#10098***REMOVED***; must appease lint and evade compression
  allTypes = "*/".concat("*"***REMOVED***;

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
  ajaxLocation = location.href;
***REMOVED*** catch( e ***REMOVED*** {
  // Use the href attribute of an A element
  // since IE will modify it given document.location
  ajaxLocation = document.createElement( "a" ***REMOVED***;
  ajaxLocation.href = "";
  ajaxLocation = ajaxLocation.href;
***REMOVED***

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase(***REMOVED*** ***REMOVED*** || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ***REMOVED*** {

  // dataTypeExpression is optional and defaults to "*"
  return function( dataTypeExpression, func ***REMOVED*** {

    if ( typeof dataTypeExpression !== "string" ***REMOVED*** {
      func = dataTypeExpression;
      dataTypeExpression = "*";
***REMOVED***

    var dataType,
      i = 0,
      dataTypes = dataTypeExpression.toLowerCase(***REMOVED***.match( core_rnotwhite ***REMOVED*** || [];

    if ( jQuery.isFunction( func ***REMOVED*** ***REMOVED*** {
      // For each dataType in the dataTypeExpression
      while ( (dataType = dataTypes[i++]***REMOVED*** ***REMOVED*** {
        // Prepend if requested
        if ( dataType[0] === "+" ***REMOVED*** {
          dataType = dataType.slice( 1 ***REMOVED*** || "*";
          (structure[ dataType ] = structure[ dataType ] || []***REMOVED***.unshift( func ***REMOVED***;

        // Otherwise append
    ***REMOVED*** else {
          (structure[ dataType ] = structure[ dataType ] || []***REMOVED***.push( func ***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***;
***REMOVED***

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ***REMOVED*** {

  var inspected = {***REMOVED***,
    seekingTransport = ( structure === transports ***REMOVED***;

  function inspect( dataType ***REMOVED*** {
    var selected;
    inspected[ dataType ] = true;
    jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ***REMOVED*** {
      var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR ***REMOVED***;
      if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ***REMOVED*** {
        options.dataTypes.unshift( dataTypeOrTransport ***REMOVED***;
        inspect( dataTypeOrTransport ***REMOVED***;
        return false;
  ***REMOVED*** else if ( seekingTransport ***REMOVED*** {
        return !( selected = dataTypeOrTransport ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
    return selected;
  ***REMOVED***

  return inspect( options.dataTypes[ 0 ] ***REMOVED*** || !inspected[ "*" ] && inspect( "*" ***REMOVED***;
***REMOVED***

// A special extend for ajax options
// that takes "flat" options (not to be deep extended***REMOVED***
// Fixes #9887
function ajaxExtend( target, src ***REMOVED*** {
  var key, deep,
    flatOptions = jQuery.ajaxSettings.flatOptions || {***REMOVED***;

  for ( key in src ***REMOVED*** {
    if ( src[ key ] !== undefined ***REMOVED*** {
      ( flatOptions[ key ] ? target : ( deep || (deep = {***REMOVED******REMOVED*** ***REMOVED*** ***REMOVED***[ key ] = src[ key ];
***REMOVED***
  ***REMOVED***
  if ( deep ***REMOVED*** {
    jQuery.extend( true, target, deep ***REMOVED***;
  ***REMOVED***

  return target;
***REMOVED***

jQuery.fn.load = function( url, params, callback ***REMOVED*** {
  if ( typeof url !== "string" && _load ***REMOVED*** {
    return _load.apply( this, arguments ***REMOVED***;
  ***REMOVED***

  var selector, type, response,
    self = this,
    off = url.indexOf(" "***REMOVED***;

  if ( off >= 0 ***REMOVED*** {
    selector = url.slice( off ***REMOVED***;
    url = url.slice( 0, off ***REMOVED***;
  ***REMOVED***

  // If it's a function
  if ( jQuery.isFunction( params ***REMOVED*** ***REMOVED*** {

    // We assume that it's the callback
    callback = params;
    params = undefined;

  // Otherwise, build a param string
  ***REMOVED*** else if ( params && typeof params === "object" ***REMOVED*** {
    type = "POST";
  ***REMOVED***

  // If we have elements to modify, make the request
  if ( self.length > 0 ***REMOVED*** {
    jQuery.ajax({
      url: url,

      // if "type" variable is undefined, then "GET" method will be used
      type: type,
      dataType: "html",
      data: params
***REMOVED******REMOVED***.done(function( responseText ***REMOVED*** {

      // Save response for use in complete callback
      response = arguments;

      self.html( selector ?

        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>"***REMOVED***.append( jQuery.parseHTML( responseText ***REMOVED*** ***REMOVED***.find( selector ***REMOVED*** :

        // Otherwise use the full result
        responseText ***REMOVED***;

***REMOVED******REMOVED***.complete( callback && function( jqXHR, status ***REMOVED*** {
      self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] ***REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

  return this;
***REMOVED***;

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ***REMOVED***{
  jQuery.fn[ type ] = function( fn ***REMOVED***{
    return this.on( type, fn ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.extend({

  // Counter for holding the number of active queries
  active: 0,

  // Last-Modified header cache for next request
  lastModified: {***REMOVED***,
  etag: {***REMOVED***,

  ajaxSettings: {
    url: ajaxLocation,
    type: "GET",
    isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ***REMOVED***,
    global: true,
    processData: true,
    async: true,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    /*
    timeout: 0,
    data: null,
    dataType: null,
    username: null,
    password: null,
    cache: null,
    throws: false,
    traditional: false,
    headers: {***REMOVED***,
    */

    accepts: {
      "*": allTypes,
      text: "text/plain",
      html: "text/html",
      xml: "application/xml, text/xml",
      json: "application/json, text/javascript"
***REMOVED***,

    contents: {
      xml: /xml/,
      html: /html/,
      json: /json/
***REMOVED***,

    responseFields: {
      xml: "responseXML",
      text: "responseText",
      json: "responseJSON"
***REMOVED***,

    // Data converters
    // Keys separate source (or catchall "*"***REMOVED*** and destination types with a single space
    converters: {

      // Convert anything to text
      "* text": String,

      // Text to html (true = no transformation***REMOVED***
      "text html": true,

      // Evaluate text as a json expression
      "text json": jQuery.parseJSON,

      // Parse text as xml
      "text xml": jQuery.parseXML
***REMOVED***,

    // For options that shouldn't be deep extended:
    // you can add your own custom options here if
    // and when you create one that shouldn't be
    // deep extended (see ajaxExtend***REMOVED***
    flatOptions: {
      url: true,
      context: true
***REMOVED***
  ***REMOVED***,

  // Creates a full fledged settings object into target
  // with both ajaxSettings and settings fields.
  // If target is omitted, writes into ajaxSettings.
  ajaxSetup: function( target, settings ***REMOVED*** {
    return settings ?

      // Building a settings object
      ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ***REMOVED***, settings ***REMOVED*** :

      // Extending ajaxSettings
      ajaxExtend( jQuery.ajaxSettings, target ***REMOVED***;
  ***REMOVED***,

  ajaxPrefilter: addToPrefiltersOrTransports( prefilters ***REMOVED***,
  ajaxTransport: addToPrefiltersOrTransports( transports ***REMOVED***,

  // Main method
  ajax: function( url, options ***REMOVED*** {

    // If url is an object, simulate pre-1.5 signature
    if ( typeof url === "object" ***REMOVED*** {
      options = url;
      url = undefined;
***REMOVED***

    // Force options to be an object
    options = options || {***REMOVED***;

    var transport,
      // URL without anti-cache param
      cacheURL,
      // Response headers
      responseHeadersString,
      responseHeaders,
      // timeout handle
      timeoutTimer,
      // Cross-domain detection vars
      parts,
      // To know if global events are to be dispatched
      fireGlobals,
      // Loop variable
      i,
      // Create the final options object
      s = jQuery.ajaxSetup( {***REMOVED***, options ***REMOVED***,
      // Callbacks context
      callbackContext = s.context || s,
      // Context for global events is callbackContext if it is a DOM node or jQuery collection
      globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ***REMOVED*** ?
        jQuery( callbackContext ***REMOVED*** :
        jQuery.event,
      // Deferreds
      deferred = jQuery.Deferred(***REMOVED***,
      completeDeferred = jQuery.Callbacks("once memory"***REMOVED***,
      // Status-dependent callbacks
      statusCode = s.statusCode || {***REMOVED***,
      // Headers (they are sent all at once***REMOVED***
      requestHeaders = {***REMOVED***,
      requestHeadersNames = {***REMOVED***,
      // The jqXHR state
      state = 0,
      // Default abort message
      strAbort = "canceled",
      // Fake xhr
      jqXHR = {
        readyState: 0,

        // Builds headers hashtable if needed
        getResponseHeader: function( key ***REMOVED*** {
          var match;
          if ( state === 2 ***REMOVED*** {
            if ( !responseHeaders ***REMOVED*** {
              responseHeaders = {***REMOVED***;
              while ( (match = rheaders.exec( responseHeadersString ***REMOVED******REMOVED*** ***REMOVED*** {
                responseHeaders[ match[1].toLowerCase(***REMOVED*** ] = match[ 2 ];
          ***REMOVED***
        ***REMOVED***
            match = responseHeaders[ key.toLowerCase(***REMOVED*** ];
      ***REMOVED***
          return match == null ? null : match;
    ***REMOVED***,

        // Raw string
        getAllResponseHeaders: function(***REMOVED*** {
          return state === 2 ? responseHeadersString : null;
    ***REMOVED***,

        // Caches the header
        setRequestHeader: function( name, value ***REMOVED*** {
          var lname = name.toLowerCase(***REMOVED***;
          if ( !state ***REMOVED*** {
            name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
            requestHeaders[ name ] = value;
      ***REMOVED***
          return this;
    ***REMOVED***,

        // Overrides response content-type header
        overrideMimeType: function( type ***REMOVED*** {
          if ( !state ***REMOVED*** {
            s.mimeType = type;
      ***REMOVED***
          return this;
    ***REMOVED***,

        // Status-dependent callbacks
        statusCode: function( map ***REMOVED*** {
          var code;
          if ( map ***REMOVED*** {
            if ( state < 2 ***REMOVED*** {
              for ( code in map ***REMOVED*** {
                // Lazy-add the new callback in a way that preserves old ones
                statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
          ***REMOVED***
        ***REMOVED*** else {
              // Execute the appropriate callbacks
              jqXHR.always( map[ jqXHR.status ] ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
          return this;
    ***REMOVED***,

        // Cancel the request
        abort: function( statusText ***REMOVED*** {
          var finalText = statusText || strAbort;
          if ( transport ***REMOVED*** {
            transport.abort( finalText ***REMOVED***;
      ***REMOVED***
          done( 0, finalText ***REMOVED***;
          return this;
    ***REMOVED***
  ***REMOVED***;

    // Attach deferreds
    deferred.promise( jqXHR ***REMOVED***.complete = completeDeferred.add;
    jqXHR.success = jqXHR.done;
    jqXHR.error = jqXHR.fail;

    // Remove hash character (#7531: and string promotion***REMOVED***
    // Add protocol if not provided (prefilters might expect it***REMOVED***
    // Handle falsy url in the settings object (#10093: consistency with old signature***REMOVED***
    // We also use the url parameter if available
    s.url = ( ( url || s.url || ajaxLocation ***REMOVED*** + "" ***REMOVED***.replace( rhash, "" ***REMOVED***
      .replace( rprotocol, ajaxLocParts[ 1 ] + "//" ***REMOVED***;

    // Alias method option to type as per ticket #12004
    s.type = options.method || options.type || s.method || s.type;

    // Extract dataTypes list
    s.dataTypes = jQuery.trim( s.dataType || "*" ***REMOVED***.toLowerCase(***REMOVED***.match( core_rnotwhite ***REMOVED*** || [""];

    // A cross-domain request is in order when we have a protocol:host:port mismatch
    if ( s.crossDomain == null ***REMOVED*** {
      parts = rurl.exec( s.url.toLowerCase(***REMOVED*** ***REMOVED***;
      s.crossDomain = !!( parts &&
        ( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
          ( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ***REMOVED*** ***REMOVED*** !==
            ( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ***REMOVED*** ***REMOVED*** ***REMOVED***
      ***REMOVED***;
***REMOVED***

    // Convert data if not already a string
    if ( s.data && s.processData && typeof s.data !== "string" ***REMOVED*** {
      s.data = jQuery.param( s.data, s.traditional ***REMOVED***;
***REMOVED***

    // Apply prefilters
    inspectPrefiltersOrTransports( prefilters, s, options, jqXHR ***REMOVED***;

    // If request was aborted inside a prefilter, stop there
    if ( state === 2 ***REMOVED*** {
      return jqXHR;
***REMOVED***

    // We can fire global events as of now if asked to
    fireGlobals = s.global;

    // Watch for a new set of requests
    if ( fireGlobals && jQuery.active++ === 0 ***REMOVED*** {
      jQuery.event.trigger("ajaxStart"***REMOVED***;
***REMOVED***

    // Uppercase the type
    s.type = s.type.toUpperCase(***REMOVED***;

    // Determine if request has content
    s.hasContent = !rnoContent.test( s.type ***REMOVED***;

    // Save the URL in case we're toying with the If-Modified-Since
    // and/or If-None-Match header later on
    cacheURL = s.url;

    // More options handling for requests with no content
    if ( !s.hasContent ***REMOVED*** {

      // If data is available, append data to url
      if ( s.data ***REMOVED*** {
        cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ***REMOVED*** ? "&" : "?" ***REMOVED*** + s.data ***REMOVED***;
        // #9682: remove data so that it's not used in an eventual retry
        delete s.data;
  ***REMOVED***

      // Add anti-cache in url if needed
      if ( s.cache === false ***REMOVED*** {
        s.url = rts.test( cacheURL ***REMOVED*** ?

          // If there is already a '_' parameter, set its value
          cacheURL.replace( rts, "$1_=" + ajax_nonce++ ***REMOVED*** :

          // Otherwise add one to the end
          cacheURL + ( ajax_rquery.test( cacheURL ***REMOVED*** ? "&" : "?" ***REMOVED*** + "_=" + ajax_nonce++;
  ***REMOVED***
***REMOVED***

    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
    if ( s.ifModified ***REMOVED*** {
      if ( jQuery.lastModified[ cacheURL ] ***REMOVED*** {
        jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] ***REMOVED***;
  ***REMOVED***
      if ( jQuery.etag[ cacheURL ] ***REMOVED*** {
        jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] ***REMOVED***;
  ***REMOVED***
***REMOVED***

    // Set the correct header, if data is being sent
    if ( s.data && s.hasContent && s.contentType !== false || options.contentType ***REMOVED*** {
      jqXHR.setRequestHeader( "Content-Type", s.contentType ***REMOVED***;
***REMOVED***

    // Set the Accepts header for the server, depending on the dataType
    jqXHR.setRequestHeader(
      "Accept",
      s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
        s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ***REMOVED*** :
        s.accepts[ "*" ]
    ***REMOVED***;

    // Check for headers option
    for ( i in s.headers ***REMOVED*** {
      jqXHR.setRequestHeader( i, s.headers[ i ] ***REMOVED***;
***REMOVED***

    // Allow custom headers/mimetypes and early abort
    if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ***REMOVED*** === false || state === 2 ***REMOVED*** ***REMOVED*** {
      // Abort if not done already and return
      return jqXHR.abort(***REMOVED***;
***REMOVED***

    // aborting is no longer a cancellation
    strAbort = "abort";

    // Install callbacks on deferreds
    for ( i in { success: 1, error: 1, complete: 1 ***REMOVED*** ***REMOVED*** {
      jqXHR[ i ]( s[ i ] ***REMOVED***;
***REMOVED***

    // Get transport
    transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR ***REMOVED***;

    // If no transport, we auto-abort
    if ( !transport ***REMOVED*** {
      done( -1, "No Transport" ***REMOVED***;
***REMOVED*** else {
      jqXHR.readyState = 1;

      // Send global event
      if ( fireGlobals ***REMOVED*** {
        globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] ***REMOVED***;
  ***REMOVED***
      // Timeout
      if ( s.async && s.timeout > 0 ***REMOVED*** {
        timeoutTimer = setTimeout(function(***REMOVED*** {
          jqXHR.abort("timeout"***REMOVED***;
    ***REMOVED***, s.timeout ***REMOVED***;
  ***REMOVED***

      try {
        state = 1;
        transport.send( requestHeaders, done ***REMOVED***;
  ***REMOVED*** catch ( e ***REMOVED*** {
        // Propagate exception as error if not done
        if ( state < 2 ***REMOVED*** {
          done( -1, e ***REMOVED***;
        // Simply rethrow otherwise
    ***REMOVED*** else {
          throw e;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    // Callback for when everything is done
    function done( status, nativeStatusText, responses, headers ***REMOVED*** {
      var isSuccess, success, error, response, modified,
        statusText = nativeStatusText;

      // Called once
      if ( state === 2 ***REMOVED*** {
        return;
  ***REMOVED***

      // State is "done" now
      state = 2;

      // Clear timeout if it exists
      if ( timeoutTimer ***REMOVED*** {
        clearTimeout( timeoutTimer ***REMOVED***;
  ***REMOVED***

      // Dereference transport for early garbage collection
      // (no matter how long the jqXHR object will be used***REMOVED***
      transport = undefined;

      // Cache response headers
      responseHeadersString = headers || "";

      // Set readyState
      jqXHR.readyState = status > 0 ? 4 : 0;

      // Determine if successful
      isSuccess = status >= 200 && status < 300 || status === 304;

      // Get response data
      if ( responses ***REMOVED*** {
        response = ajaxHandleResponses( s, jqXHR, responses ***REMOVED***;
  ***REMOVED***

      // Convert no matter what (that way responseXXX fields are always set***REMOVED***
      response = ajaxConvert( s, response, jqXHR, isSuccess ***REMOVED***;

      // If successful, handle type chaining
      if ( isSuccess ***REMOVED*** {

        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if ( s.ifModified ***REMOVED*** {
          modified = jqXHR.getResponseHeader("Last-Modified"***REMOVED***;
          if ( modified ***REMOVED*** {
            jQuery.lastModified[ cacheURL ] = modified;
      ***REMOVED***
          modified = jqXHR.getResponseHeader("etag"***REMOVED***;
          if ( modified ***REMOVED*** {
            jQuery.etag[ cacheURL ] = modified;
      ***REMOVED***
    ***REMOVED***

        // if no content
        if ( status === 204 || s.type === "HEAD" ***REMOVED*** {
          statusText = "nocontent";

        // if not modified
    ***REMOVED*** else if ( status === 304 ***REMOVED*** {
          statusText = "notmodified";

        // If we have data, let's convert it
    ***REMOVED*** else {
          statusText = response.state;
          success = response.data;
          error = response.error;
          isSuccess = !error;
    ***REMOVED***
  ***REMOVED*** else {
        // We extract error from statusText
        // then normalize statusText and status for non-aborts
        error = statusText;
        if ( status || !statusText ***REMOVED*** {
          statusText = "error";
          if ( status < 0 ***REMOVED*** {
            status = 0;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      // Set data for the fake xhr object
      jqXHR.status = status;
      jqXHR.statusText = ( nativeStatusText || statusText ***REMOVED*** + "";

      // Success/Error
      if ( isSuccess ***REMOVED*** {
        deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] ***REMOVED***;
  ***REMOVED*** else {
        deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] ***REMOVED***;
  ***REMOVED***

      // Status-dependent callbacks
      jqXHR.statusCode( statusCode ***REMOVED***;
      statusCode = undefined;

      if ( fireGlobals ***REMOVED*** {
        globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
          [ jqXHR, s, isSuccess ? success : error ] ***REMOVED***;
  ***REMOVED***

      // Complete
      completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] ***REMOVED***;

      if ( fireGlobals ***REMOVED*** {
        globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] ***REMOVED***;
        // Handle the global AJAX counter
        if ( !( --jQuery.active ***REMOVED*** ***REMOVED*** {
          jQuery.event.trigger("ajaxStop"***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

    return jqXHR;
  ***REMOVED***,

  getJSON: function( url, data, callback ***REMOVED*** {
    return jQuery.get( url, data, callback, "json" ***REMOVED***;
  ***REMOVED***,

  getScript: function( url, callback ***REMOVED*** {
    return jQuery.get( url, undefined, callback, "script" ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

jQuery.each( [ "get", "post" ], function( i, method ***REMOVED*** {
  jQuery[ method ] = function( url, data, callback, type ***REMOVED*** {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ***REMOVED*** ***REMOVED*** {
      type = type || callback;
      callback = data;
      data = undefined;
***REMOVED***

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
***REMOVED******REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType***REMOVED***
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ***REMOVED*** {

  var ct, type, finalDataType, firstDataType,
    contents = s.contents,
    dataTypes = s.dataTypes;

  // Remove auto dataType and get content-type in the process
  while( dataTypes[ 0 ] === "*" ***REMOVED*** {
    dataTypes.shift(***REMOVED***;
    if ( ct === undefined ***REMOVED*** {
      ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"***REMOVED***;
***REMOVED***
  ***REMOVED***

  // Check if we're dealing with a known content-type
  if ( ct ***REMOVED*** {
    for ( type in contents ***REMOVED*** {
      if ( contents[ type ] && contents[ type ].test( ct ***REMOVED*** ***REMOVED*** {
        dataTypes.unshift( type ***REMOVED***;
        break;
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  // Check to see if we have a response for the expected dataType
  if ( dataTypes[ 0 ] in responses ***REMOVED*** {
    finalDataType = dataTypes[ 0 ];
  ***REMOVED*** else {
    // Try convertible dataTypes
    for ( type in responses ***REMOVED*** {
      if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ***REMOVED*** {
        finalDataType = type;
        break;
  ***REMOVED***
      if ( !firstDataType ***REMOVED*** {
        firstDataType = type;
  ***REMOVED***
***REMOVED***
    // Or just use first one
    finalDataType = finalDataType || firstDataType;
  ***REMOVED***

  // If we found a dataType
  // We add the dataType to the list if needed
  // and return the corresponding response
  if ( finalDataType ***REMOVED*** {
    if ( finalDataType !== dataTypes[ 0 ] ***REMOVED*** {
      dataTypes.unshift( finalDataType ***REMOVED***;
***REMOVED***
    return responses[ finalDataType ];
  ***REMOVED***
***REMOVED***

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ***REMOVED*** {
  var conv2, current, conv, tmp, prev,
    converters = {***REMOVED***,
    // Work with a copy of dataTypes in case we need to modify it for conversion
    dataTypes = s.dataTypes.slice(***REMOVED***;

  // Create converters map with lowercased keys
  if ( dataTypes[ 1 ] ***REMOVED*** {
    for ( conv in s.converters ***REMOVED*** {
      converters[ conv.toLowerCase(***REMOVED*** ] = s.converters[ conv ];
***REMOVED***
  ***REMOVED***

  current = dataTypes.shift(***REMOVED***;

  // Convert to each sequential dataType
  while ( current ***REMOVED*** {

    if ( s.responseFields[ current ] ***REMOVED*** {
      jqXHR[ s.responseFields[ current ] ] = response;
***REMOVED***

    // Apply the dataFilter if provided
    if ( !prev && isSuccess && s.dataFilter ***REMOVED*** {
      response = s.dataFilter( response, s.dataType ***REMOVED***;
***REMOVED***

    prev = current;
    current = dataTypes.shift(***REMOVED***;

    if ( current ***REMOVED*** {

    // There's only work to do if current dataType is non-auto
      if ( current === "*" ***REMOVED*** {

        current = prev;

      // Convert response if prev dataType is non-auto and differs from current
  ***REMOVED*** else if ( prev !== "*" && prev !== current ***REMOVED*** {

        // Seek a direct converter
        conv = converters[ prev + " " + current ] || converters[ "* " + current ];

        // If none found, seek a pair
        if ( !conv ***REMOVED*** {
          for ( conv2 in converters ***REMOVED*** {

            // If conv2 outputs current
            tmp = conv2.split( " " ***REMOVED***;
            if ( tmp[ 1 ] === current ***REMOVED*** {

              // If prev can be converted to accepted input
              conv = converters[ prev + " " + tmp[ 0 ] ] ||
                converters[ "* " + tmp[ 0 ] ];
              if ( conv ***REMOVED*** {
                // Condense equivalence converters
                if ( conv === true ***REMOVED*** {
                  conv = converters[ conv2 ];

                // Otherwise, insert the intermediate dataType
            ***REMOVED*** else if ( converters[ conv2 ] !== true ***REMOVED*** {
                  current = tmp[ 0 ];
                  dataTypes.unshift( tmp[ 1 ] ***REMOVED***;
            ***REMOVED***
                break;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***

        // Apply converter (if not an equivalence***REMOVED***
        if ( conv !== true ***REMOVED*** {

          // Unless errors are allowed to bubble, catch and return them
          if ( conv && s[ "throws" ] ***REMOVED*** {
            response = conv( response ***REMOVED***;
      ***REMOVED*** else {
            try {
              response = conv( response ***REMOVED***;
        ***REMOVED*** catch ( e ***REMOVED*** {
              return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***

  return { state: "success", data: response ***REMOVED***;
***REMOVED***
// Install script dataType
jQuery.ajaxSetup({
  accepts: {
    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  ***REMOVED***,
  contents: {
    script: /(?:java|ecma***REMOVED***script/
  ***REMOVED***,
  converters: {
    "text script": function( text ***REMOVED*** {
      jQuery.globalEval( text ***REMOVED***;
      return text;
***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ***REMOVED*** {
  if ( s.cache === undefined ***REMOVED*** {
    s.cache = false;
  ***REMOVED***
  if ( s.crossDomain ***REMOVED*** {
    s.type = "GET";
  ***REMOVED***
***REMOVED******REMOVED***;

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ***REMOVED*** {
  // This transport only deals with cross domain requests
  if ( s.crossDomain ***REMOVED*** {
    var script, callback;
    return {
      send: function( _, complete ***REMOVED*** {
        script = jQuery("<script>"***REMOVED***.prop({
          async: true,
          charset: s.scriptCharset,
          src: s.url
    ***REMOVED******REMOVED***.on(
          "load error",
          callback = function( evt ***REMOVED*** {
            script.remove(***REMOVED***;
            callback = null;
            if ( evt ***REMOVED*** {
              complete( evt.type === "error" ? 404 : 200, evt.type ***REMOVED***;
        ***REMOVED***
      ***REMOVED***
        ***REMOVED***;
        document.head.appendChild( script[ 0 ] ***REMOVED***;
  ***REMOVED***,
      abort: function(***REMOVED*** {
        if ( callback ***REMOVED*** {
          callback(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var oldCallbacks = [],
  rjsonp = /(=***REMOVED***\?(?=&|$***REMOVED***|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
  jsonp: "callback",
  jsonpCallback: function(***REMOVED*** {
    var callback = oldCallbacks.pop(***REMOVED*** || ( jQuery.expando + "_" + ( ajax_nonce++ ***REMOVED*** ***REMOVED***;
    this[ callback ] = true;
    return callback;
  ***REMOVED***
***REMOVED******REMOVED***;

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ***REMOVED*** {

  var callbackName, overwritten, responseContainer,
    jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ***REMOVED*** ?
      "url" :
      typeof s.data === "string" && !( s.contentType || "" ***REMOVED***.indexOf("application/x-www-form-urlencoded"***REMOVED*** && rjsonp.test( s.data ***REMOVED*** && "data"
    ***REMOVED***;

  // Handle iff the expected data type is "jsonp" or we have a parameter to set
  if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ***REMOVED*** {

    // Get callback name, remembering preexisting value associated with it
    callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ***REMOVED*** ?
      s.jsonpCallback(***REMOVED*** :
      s.jsonpCallback;

    // Insert callback into url or form data
    if ( jsonProp ***REMOVED*** {
      s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName ***REMOVED***;
***REMOVED*** else if ( s.jsonp !== false ***REMOVED*** {
      s.url += ( ajax_rquery.test( s.url ***REMOVED*** ? "&" : "?" ***REMOVED*** + s.jsonp + "=" + callbackName;
***REMOVED***

    // Use data converter to retrieve json after script execution
    s.converters["script json"] = function(***REMOVED*** {
      if ( !responseContainer ***REMOVED*** {
        jQuery.error( callbackName + " was not called" ***REMOVED***;
  ***REMOVED***
      return responseContainer[ 0 ];
***REMOVED***;

    // force json dataType
    s.dataTypes[ 0 ] = "json";

    // Install callback
    overwritten = window[ callbackName ];
    window[ callbackName ] = function(***REMOVED*** {
      responseContainer = arguments;
***REMOVED***;

    // Clean-up function (fires after converters***REMOVED***
    jqXHR.always(function(***REMOVED*** {
      // Restore preexisting value
      window[ callbackName ] = overwritten;

      // Save back as free
      if ( s[ callbackName ] ***REMOVED*** {
        // make sure that re-using the options doesn't screw things around
        s.jsonpCallback = originalSettings.jsonpCallback;

        // save the callback name for future use
        oldCallbacks.push( callbackName ***REMOVED***;
  ***REMOVED***

      // Call if it was a function and we have a response
      if ( responseContainer && jQuery.isFunction( overwritten ***REMOVED*** ***REMOVED*** {
        overwritten( responseContainer[ 0 ] ***REMOVED***;
  ***REMOVED***

      responseContainer = overwritten = undefined;
***REMOVED******REMOVED***;

    // Delegate to script
    return "script";
  ***REMOVED***
***REMOVED******REMOVED***;
jQuery.ajaxSettings.xhr = function(***REMOVED*** {
  try {
    return new XMLHttpRequest(***REMOVED***;
  ***REMOVED*** catch( e ***REMOVED*** {***REMOVED***
***REMOVED***;

var xhrSupported = jQuery.ajaxSettings.xhr(***REMOVED***,
  xhrSuccessStatus = {
    // file protocol always yields status code 0, assume 200
    0: 200,
    // Support: IE9
    // #1450: sometimes IE returns 1223 when it should be 204
    1223: 204
  ***REMOVED***,
  // Support: IE9
  // We need to keep track of outbound xhr and abort them manually
  // because IE is not smart enough to do it all by itself
  xhrId = 0,
  xhrCallbacks = {***REMOVED***;

if ( window.ActiveXObject ***REMOVED*** {
  jQuery( window ***REMOVED***.on( "unload", function(***REMOVED*** {
    for( var key in xhrCallbacks ***REMOVED*** {
      xhrCallbacks[ key ](***REMOVED***;
***REMOVED***
    xhrCallbacks = undefined;
  ***REMOVED******REMOVED***;
***REMOVED***

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported ***REMOVED***;
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ***REMOVED*** {
  var callback;
  // Cross domain only allowed if supported through XMLHttpRequest
  if ( jQuery.support.cors || xhrSupported && !options.crossDomain ***REMOVED*** {
    return {
      send: function( headers, complete ***REMOVED*** {
        var i, id,
          xhr = options.xhr(***REMOVED***;
        xhr.open( options.type, options.url, options.async, options.username, options.password ***REMOVED***;
        // Apply custom fields if provided
        if ( options.xhrFields ***REMOVED*** {
          for ( i in options.xhrFields ***REMOVED*** {
            xhr[ i ] = options.xhrFields[ i ];
      ***REMOVED***
    ***REMOVED***
        // Override mime type if needed
        if ( options.mimeType && xhr.overrideMimeType ***REMOVED*** {
          xhr.overrideMimeType( options.mimeType ***REMOVED***;
    ***REMOVED***
        // X-Requested-With header
        // For cross-domain requests, seeing as conditions for a preflight are
        // akin to a jigsaw puzzle, we simply never set it to be sure.
        // (it can always be set on a per-request basis or even using ajaxSetup***REMOVED***
        // For same-domain requests, won't change header if already provided.
        if ( !options.crossDomain && !headers["X-Requested-With"] ***REMOVED*** {
          headers["X-Requested-With"] = "XMLHttpRequest";
    ***REMOVED***
        // Set headers
        for ( i in headers ***REMOVED*** {
          xhr.setRequestHeader( i, headers[ i ] ***REMOVED***;
    ***REMOVED***
        // Callback
        callback = function( type ***REMOVED*** {
          return function(***REMOVED*** {
            if ( callback ***REMOVED*** {
              delete xhrCallbacks[ id ];
              callback = xhr.onload = xhr.onerror = null;
              if ( type === "abort" ***REMOVED*** {
                xhr.abort(***REMOVED***;
          ***REMOVED*** else if ( type === "error" ***REMOVED*** {
                complete(
                  // file protocol always yields status 0, assume 404
                  xhr.status || 404,
                  xhr.statusText
                ***REMOVED***;
          ***REMOVED*** else {
                complete(
                  xhrSuccessStatus[ xhr.status ] || xhr.status,
                  xhr.statusText,
                  // Support: IE9
                  // #11426: When requesting binary data, IE9 will throw an exception
                  // on any attempt to access responseText
                  typeof xhr.responseText === "string" ? {
                    text: xhr.responseText
              ***REMOVED*** : undefined,
                  xhr.getAllResponseHeaders(***REMOVED***
                ***REMOVED***;
          ***REMOVED***
        ***REMOVED***
      ***REMOVED***;
    ***REMOVED***;
        // Listen to events
        xhr.onload = callback(***REMOVED***;
        xhr.onerror = callback("error"***REMOVED***;
        // Create the abort callback
        callback = xhrCallbacks[( id = xhrId++ ***REMOVED***] = callback("abort"***REMOVED***;
        // Do send the request
        // This may raise an exception which is actually
        // handled in jQuery.ajax (so no try/catch here***REMOVED***
        xhr.send( options.hasContent && options.data || null ***REMOVED***;
  ***REMOVED***,
      abort: function(***REMOVED*** {
        if ( callback ***REMOVED*** {
          callback(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
var fxNow, timerId,
  rfxtypes = /^(?:toggle|show|hide***REMOVED***$/,
  rfxnum = new RegExp( "^(?:([+-]***REMOVED***=|***REMOVED***(" + core_pnum + "***REMOVED***([a-z%]****REMOVED***$", "i" ***REMOVED***,
  rrun = /queueHooks$/,
  animationPrefilters = [ defaultPrefilter ],
  tweeners = {
    "*": [function( prop, value ***REMOVED*** {
      var tween = this.createTween( prop, value ***REMOVED***,
        target = tween.cur(***REMOVED***,
        parts = rfxnum.exec( value ***REMOVED***,
        unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ***REMOVED***,

        // Starting value computation is required for potential unit mismatches
        start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ***REMOVED*** &&
          rfxnum.exec( jQuery.css( tween.elem, prop ***REMOVED*** ***REMOVED***,
        scale = 1,
        maxIterations = 20;

      if ( start && start[ 3 ] !== unit ***REMOVED*** {
        // Trust units reported by jQuery.css
        unit = unit || start[ 3 ];

        // Make sure we update the tween properties later on
        parts = parts || [];

        // Iteratively approximate from a nonzero starting point
        start = +target || 1;

        do {
          // If previous iteration zeroed out, double until we get *something*
          // Use a string for doubling factor so we don't accidentally see scale as unchanged below
          scale = scale || ".5";

          // Adjust and apply
          start = start / scale;
          jQuery.style( tween.elem, prop, start + unit ***REMOVED***;

        // Update scale, tolerating zero or NaN from tween.cur(***REMOVED***
        // And breaking the loop if scale is unchanged or perfect, or if we've just had enough
    ***REMOVED*** while ( scale !== (scale = tween.cur(***REMOVED*** / target***REMOVED*** && scale !== 1 && --maxIterations ***REMOVED***;
  ***REMOVED***

      // Update tween properties
      if ( parts ***REMOVED*** {
        start = tween.start = +start || +target || 0;
        tween.unit = unit;
        // If a +=/-= token was provided, we're doing a relative animation
        tween.end = parts[ 1 ] ?
          start + ( parts[ 1 ] + 1 ***REMOVED*** * parts[ 2 ] :
          +parts[ 2 ];
  ***REMOVED***

      return tween;
***REMOVED***]
  ***REMOVED***;

// Animations created synchronously will run synchronously
function createFxNow(***REMOVED*** {
  setTimeout(function(***REMOVED*** {
    fxNow = undefined;
  ***REMOVED******REMOVED***;
  return ( fxNow = jQuery.now(***REMOVED*** ***REMOVED***;
***REMOVED***

function createTween( value, prop, animation ***REMOVED*** {
  var tween,
    collection = ( tweeners[ prop ] || [] ***REMOVED***.concat( tweeners[ "*" ] ***REMOVED***,
    index = 0,
    length = collection.length;
  for ( ; index < length; index++ ***REMOVED*** {
    if ( (tween = collection[ index ].call( animation, prop, value ***REMOVED******REMOVED*** ***REMOVED*** {

      // we're done with this property
      return tween;
***REMOVED***
  ***REMOVED***
***REMOVED***

function Animation( elem, properties, options ***REMOVED*** {
  var result,
    stopped,
    index = 0,
    length = animationPrefilters.length,
    deferred = jQuery.Deferred(***REMOVED***.always( function(***REMOVED*** {
      // don't match elem in the :animated selector
      delete tick.elem;
***REMOVED******REMOVED***,
    tick = function(***REMOVED*** {
      if ( stopped ***REMOVED*** {
        return false;
  ***REMOVED***
      var currentTime = fxNow || createFxNow(***REMOVED***,
        remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ***REMOVED***,
        // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ***REMOVED*** (#12497***REMOVED***
        temp = remaining / animation.duration || 0,
        percent = 1 - temp,
        index = 0,
        length = animation.tweens.length;

      for ( ; index < length ; index++ ***REMOVED*** {
        animation.tweens[ index ].run( percent ***REMOVED***;
  ***REMOVED***

      deferred.notifyWith( elem, [ animation, percent, remaining ]***REMOVED***;

      if ( percent < 1 && length ***REMOVED*** {
        return remaining;
  ***REMOVED*** else {
        deferred.resolveWith( elem, [ animation ] ***REMOVED***;
        return false;
  ***REMOVED***
***REMOVED***,
    animation = deferred.promise({
      elem: elem,
      props: jQuery.extend( {***REMOVED***, properties ***REMOVED***,
      opts: jQuery.extend( true, { specialEasing: {***REMOVED*** ***REMOVED***, options ***REMOVED***,
      originalProperties: properties,
      originalOptions: options,
      startTime: fxNow || createFxNow(***REMOVED***,
      duration: options.duration,
      tweens: [],
      createTween: function( prop, end ***REMOVED*** {
        var tween = jQuery.Tween( elem, animation.opts, prop, end,
            animation.opts.specialEasing[ prop ] || animation.opts.easing ***REMOVED***;
        animation.tweens.push( tween ***REMOVED***;
        return tween;
  ***REMOVED***,
      stop: function( gotoEnd ***REMOVED*** {
        var index = 0,
          // if we are going to the end, we want to run all the tweens
          // otherwise we skip this part
          length = gotoEnd ? animation.tweens.length : 0;
        if ( stopped ***REMOVED*** {
          return this;
    ***REMOVED***
        stopped = true;
        for ( ; index < length ; index++ ***REMOVED*** {
          animation.tweens[ index ].run( 1 ***REMOVED***;
    ***REMOVED***

        // resolve when we played the last frame
        // otherwise, reject
        if ( gotoEnd ***REMOVED*** {
          deferred.resolveWith( elem, [ animation, gotoEnd ] ***REMOVED***;
    ***REMOVED*** else {
          deferred.rejectWith( elem, [ animation, gotoEnd ] ***REMOVED***;
    ***REMOVED***
        return this;
  ***REMOVED***
***REMOVED******REMOVED***,
    props = animation.props;

  propFilter( props, animation.opts.specialEasing ***REMOVED***;

  for ( ; index < length ; index++ ***REMOVED*** {
    result = animationPrefilters[ index ].call( animation, elem, props, animation.opts ***REMOVED***;
    if ( result ***REMOVED*** {
      return result;
***REMOVED***
  ***REMOVED***

  jQuery.map( props, createTween, animation ***REMOVED***;

  if ( jQuery.isFunction( animation.opts.start ***REMOVED*** ***REMOVED*** {
    animation.opts.start.call( elem, animation ***REMOVED***;
  ***REMOVED***

  jQuery.fx.timer(
    jQuery.extend( tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
***REMOVED******REMOVED***
  ***REMOVED***;

  // attach callbacks from options
  return animation.progress( animation.opts.progress ***REMOVED***
    .done( animation.opts.done, animation.opts.complete ***REMOVED***
    .fail( animation.opts.fail ***REMOVED***
    .always( animation.opts.always ***REMOVED***;
***REMOVED***

function propFilter( props, specialEasing ***REMOVED*** {
  var index, name, easing, value, hooks;

  // camelCase, specialEasing and expand cssHook pass
  for ( index in props ***REMOVED*** {
    name = jQuery.camelCase( index ***REMOVED***;
    easing = specialEasing[ name ];
    value = props[ index ];
    if ( jQuery.isArray( value ***REMOVED*** ***REMOVED*** {
      easing = value[ 1 ];
      value = props[ index ] = value[ 0 ];
***REMOVED***

    if ( index !== name ***REMOVED*** {
      props[ name ] = value;
      delete props[ index ];
***REMOVED***

    hooks = jQuery.cssHooks[ name ];
    if ( hooks && "expand" in hooks ***REMOVED*** {
      value = hooks.expand( value ***REMOVED***;
      delete props[ name ];

      // not quite $.extend, this wont overwrite keys already present.
      // also - reusing 'index' from above because we have the correct "name"
      for ( index in value ***REMOVED*** {
        if ( !( index in props ***REMOVED*** ***REMOVED*** {
          props[ index ] = value[ index ];
          specialEasing[ index ] = easing;
    ***REMOVED***
  ***REMOVED***
***REMOVED*** else {
      specialEasing[ name ] = easing;
***REMOVED***
  ***REMOVED***
***REMOVED***

jQuery.Animation = jQuery.extend( Animation, {

  tweener: function( props, callback ***REMOVED*** {
    if ( jQuery.isFunction( props ***REMOVED*** ***REMOVED*** {
      callback = props;
      props = [ "*" ];
***REMOVED*** else {
      props = props.split(" "***REMOVED***;
***REMOVED***

    var prop,
      index = 0,
      length = props.length;

    for ( ; index < length ; index++ ***REMOVED*** {
      prop = props[ index ];
      tweeners[ prop ] = tweeners[ prop ] || [];
      tweeners[ prop ].unshift( callback ***REMOVED***;
***REMOVED***
  ***REMOVED***,

  prefilter: function( callback, prepend ***REMOVED*** {
    if ( prepend ***REMOVED*** {
      animationPrefilters.unshift( callback ***REMOVED***;
***REMOVED*** else {
      animationPrefilters.push( callback ***REMOVED***;
***REMOVED***
  ***REMOVED***
***REMOVED******REMOVED***;

function defaultPrefilter( elem, props, opts ***REMOVED*** {
  /* jshint validthis: true */
  var prop, value, toggle, tween, hooks, oldfire,
    anim = this,
    orig = {***REMOVED***,
    style = elem.style,
    hidden = elem.nodeType && isHidden( elem ***REMOVED***,
    dataShow = data_priv.get( elem, "fxshow" ***REMOVED***;

  // handle queue: false promises
  if ( !opts.queue ***REMOVED*** {
    hooks = jQuery._queueHooks( elem, "fx" ***REMOVED***;
    if ( hooks.unqueued == null ***REMOVED*** {
      hooks.unqueued = 0;
      oldfire = hooks.empty.fire;
      hooks.empty.fire = function(***REMOVED*** {
        if ( !hooks.unqueued ***REMOVED*** {
          oldfire(***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
***REMOVED***
    hooks.unqueued++;

    anim.always(function(***REMOVED*** {
      // doing this makes sure that the complete handler will be called
      // before this completes
      anim.always(function(***REMOVED*** {
        hooks.unqueued--;
        if ( !jQuery.queue( elem, "fx" ***REMOVED***.length ***REMOVED*** {
          hooks.empty.fire(***REMOVED***;
    ***REMOVED***
  ***REMOVED******REMOVED***;
***REMOVED******REMOVED***;
  ***REMOVED***

  // height/width overflow pass
  if ( elem.nodeType === 1 && ( "height" in props || "width" in props ***REMOVED*** ***REMOVED*** {
    // Make sure that nothing sneaks out
    // Record all 3 overflow attributes because IE9-10 do not
    // change the overflow attribute when overflowX and
    // overflowY are set to the same value
    opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

    // Set display property to inline-block for height/width
    // animations on inline elements that are having width/height animated
    if ( jQuery.css( elem, "display" ***REMOVED*** === "inline" &&
        jQuery.css( elem, "float" ***REMOVED*** === "none" ***REMOVED*** {

      style.display = "inline-block";
***REMOVED***
  ***REMOVED***

  if ( opts.overflow ***REMOVED*** {
    style.overflow = "hidden";
    anim.always(function(***REMOVED*** {
      style.overflow = opts.overflow[ 0 ];
      style.overflowX = opts.overflow[ 1 ];
      style.overflowY = opts.overflow[ 2 ];
***REMOVED******REMOVED***;
  ***REMOVED***


  // show/hide pass
  for ( prop in props ***REMOVED*** {
    value = props[ prop ];
    if ( rfxtypes.exec( value ***REMOVED*** ***REMOVED*** {
      delete props[ prop ];
      toggle = toggle || value === "toggle";
      if ( value === ( hidden ? "hide" : "show" ***REMOVED*** ***REMOVED*** {

        // If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
        if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ***REMOVED*** {
          hidden = true;
    ***REMOVED*** else {
          continue;
    ***REMOVED***
  ***REMOVED***
      orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop ***REMOVED***;
***REMOVED***
  ***REMOVED***

  if ( !jQuery.isEmptyObject( orig ***REMOVED*** ***REMOVED*** {
    if ( dataShow ***REMOVED*** {
      if ( "hidden" in dataShow ***REMOVED*** {
        hidden = dataShow.hidden;
  ***REMOVED***
***REMOVED*** else {
      dataShow = data_priv.access( elem, "fxshow", {***REMOVED*** ***REMOVED***;
***REMOVED***

    // store state if its toggle - enables .stop(***REMOVED***.toggle(***REMOVED*** to "reverse"
    if ( toggle ***REMOVED*** {
      dataShow.hidden = !hidden;
***REMOVED***
    if ( hidden ***REMOVED*** {
      jQuery( elem ***REMOVED***.show(***REMOVED***;
***REMOVED*** else {
      anim.done(function(***REMOVED*** {
        jQuery( elem ***REMOVED***.hide(***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED***
    anim.done(function(***REMOVED*** {
      var prop;

      data_priv.remove( elem, "fxshow" ***REMOVED***;
      for ( prop in orig ***REMOVED*** {
        jQuery.style( elem, prop, orig[ prop ] ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
    for ( prop in orig ***REMOVED*** {
      tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim ***REMOVED***;

      if ( !( prop in dataShow ***REMOVED*** ***REMOVED*** {
        dataShow[ prop ] = tween.start;
        if ( hidden ***REMOVED*** {
          tween.end = tween.start;
          tween.start = prop === "width" || prop === "height" ? 1 : 0;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***

function Tween( elem, options, prop, end, easing ***REMOVED*** {
  return new Tween.prototype.init( elem, options, prop, end, easing ***REMOVED***;
***REMOVED***
jQuery.Tween = Tween;

Tween.prototype = {
  constructor: Tween,
  init: function( elem, options, prop, end, easing, unit ***REMOVED*** {
    this.elem = elem;
    this.prop = prop;
    this.easing = easing || "swing";
    this.options = options;
    this.start = this.now = this.cur(***REMOVED***;
    this.end = end;
    this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" ***REMOVED***;
  ***REMOVED***,
  cur: function(***REMOVED*** {
    var hooks = Tween.propHooks[ this.prop ];

    return hooks && hooks.get ?
      hooks.get( this ***REMOVED*** :
      Tween.propHooks._default.get( this ***REMOVED***;
  ***REMOVED***,
  run: function( percent ***REMOVED*** {
    var eased,
      hooks = Tween.propHooks[ this.prop ];

    if ( this.options.duration ***REMOVED*** {
      this.pos = eased = jQuery.easing[ this.easing ](
        percent, this.options.duration * percent, 0, 1, this.options.duration
      ***REMOVED***;
***REMOVED*** else {
      this.pos = eased = percent;
***REMOVED***
    this.now = ( this.end - this.start ***REMOVED*** * eased + this.start;

    if ( this.options.step ***REMOVED*** {
      this.options.step.call( this.elem, this.now, this ***REMOVED***;
***REMOVED***

    if ( hooks && hooks.set ***REMOVED*** {
      hooks.set( this ***REMOVED***;
***REMOVED*** else {
      Tween.propHooks._default.set( this ***REMOVED***;
***REMOVED***
    return this;
  ***REMOVED***
***REMOVED***;

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
  _default: {
    get: function( tween ***REMOVED*** {
      var result;

      if ( tween.elem[ tween.prop ] != null &&
        (!tween.elem.style || tween.elem.style[ tween.prop ] == null***REMOVED*** ***REMOVED*** {
        return tween.elem[ tween.prop ];
  ***REMOVED***

      // passing an empty string as a 3rd parameter to .css will automatically
      // attempt a parseFloat and fallback to a string if the parse fails
      // so, simple values such as "10px" are parsed to Float.
      // complex values such as "rotate(1rad***REMOVED***" are returned as is.
      result = jQuery.css( tween.elem, tween.prop, "" ***REMOVED***;
      // Empty strings, null, undefined and "auto" are converted to 0.
      return !result || result === "auto" ? 0 : result;
***REMOVED***,
    set: function( tween ***REMOVED*** {
      // use step hook for back compat - use cssHook if its there - use .style if its
      // available and use plain properties where available
      if ( jQuery.fx.step[ tween.prop ] ***REMOVED*** {
        jQuery.fx.step[ tween.prop ]( tween ***REMOVED***;
  ***REMOVED*** else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ***REMOVED*** ***REMOVED*** {
        jQuery.style( tween.elem, tween.prop, tween.now + tween.unit ***REMOVED***;
  ***REMOVED*** else {
        tween.elem[ tween.prop ] = tween.now;
  ***REMOVED***
***REMOVED***
  ***REMOVED***
***REMOVED***;

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
  set: function( tween ***REMOVED*** {
    if ( tween.elem.nodeType && tween.elem.parentNode ***REMOVED*** {
      tween.elem[ tween.prop ] = tween.now;
***REMOVED***
  ***REMOVED***
***REMOVED***;

jQuery.each([ "toggle", "show", "hide" ], function( i, name ***REMOVED*** {
  var cssFn = jQuery.fn[ name ];
  jQuery.fn[ name ] = function( speed, easing, callback ***REMOVED*** {
    return speed == null || typeof speed === "boolean" ?
      cssFn.apply( this, arguments ***REMOVED*** :
      this.animate( genFx( name, true ***REMOVED***, speed, easing, callback ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.fn.extend({
  fadeTo: function( speed, to, easing, callback ***REMOVED*** {

    // show any hidden elements after setting opacity to 0
    return this.filter( isHidden ***REMOVED***.css( "opacity", 0 ***REMOVED***.show(***REMOVED***

      // animate to the value specified
      .end(***REMOVED***.animate({ opacity: to ***REMOVED***, speed, easing, callback ***REMOVED***;
  ***REMOVED***,
  animate: function( prop, speed, easing, callback ***REMOVED*** {
    var empty = jQuery.isEmptyObject( prop ***REMOVED***,
      optall = jQuery.speed( speed, easing, callback ***REMOVED***,
      doAnimation = function(***REMOVED*** {
        // Operate on a copy of prop so per-property easing won't be lost
        var anim = Animation( this, jQuery.extend( {***REMOVED***, prop ***REMOVED***, optall ***REMOVED***;

        // Empty animations, or finishing resolves immediately
        if ( empty || data_priv.get( this, "finish" ***REMOVED*** ***REMOVED*** {
          anim.stop( true ***REMOVED***;
    ***REMOVED***
  ***REMOVED***;
      doAnimation.finish = doAnimation;

    return empty || optall.queue === false ?
      this.each( doAnimation ***REMOVED*** :
      this.queue( optall.queue, doAnimation ***REMOVED***;
  ***REMOVED***,
  stop: function( type, clearQueue, gotoEnd ***REMOVED*** {
    var stopQueue = function( hooks ***REMOVED*** {
      var stop = hooks.stop;
      delete hooks.stop;
      stop( gotoEnd ***REMOVED***;
***REMOVED***;

    if ( typeof type !== "string" ***REMOVED*** {
      gotoEnd = clearQueue;
      clearQueue = type;
      type = undefined;
***REMOVED***
    if ( clearQueue && type !== false ***REMOVED*** {
      this.queue( type || "fx", [] ***REMOVED***;
***REMOVED***

    return this.each(function(***REMOVED*** {
      var dequeue = true,
        index = type != null && type + "queueHooks",
        timers = jQuery.timers,
        data = data_priv.get( this ***REMOVED***;

      if ( index ***REMOVED*** {
        if ( data[ index ] && data[ index ].stop ***REMOVED*** {
          stopQueue( data[ index ] ***REMOVED***;
    ***REMOVED***
  ***REMOVED*** else {
        for ( index in data ***REMOVED*** {
          if ( data[ index ] && data[ index ].stop && rrun.test( index ***REMOVED*** ***REMOVED*** {
            stopQueue( data[ index ] ***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

      for ( index = timers.length; index--; ***REMOVED*** {
        if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type***REMOVED*** ***REMOVED*** {
          timers[ index ].anim.stop( gotoEnd ***REMOVED***;
          dequeue = false;
          timers.splice( index, 1 ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      // start the next in the queue if the last step wasn't forced
      // timers currently will call their complete callbacks, which will dequeue
      // but only if they were gotoEnd
      if ( dequeue || !gotoEnd ***REMOVED*** {
        jQuery.dequeue( this, type ***REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;
  ***REMOVED***,
  finish: function( type ***REMOVED*** {
    if ( type !== false ***REMOVED*** {
      type = type || "fx";
***REMOVED***
    return this.each(function(***REMOVED*** {
      var index,
        data = data_priv.get( this ***REMOVED***,
        queue = data[ type + "queue" ],
        hooks = data[ type + "queueHooks" ],
        timers = jQuery.timers,
        length = queue ? queue.length : 0;

      // enable finishing flag on private data
      data.finish = true;

      // empty the queue first
      jQuery.queue( this, type, [] ***REMOVED***;

      if ( hooks && hooks.stop ***REMOVED*** {
        hooks.stop.call( this, true ***REMOVED***;
  ***REMOVED***

      // look for any active animations, and finish them
      for ( index = timers.length; index--; ***REMOVED*** {
        if ( timers[ index ].elem === this && timers[ index ].queue === type ***REMOVED*** {
          timers[ index ].anim.stop( true ***REMOVED***;
          timers.splice( index, 1 ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      // look for any animations in the old queue and finish them
      for ( index = 0; index < length; index++ ***REMOVED*** {
        if ( queue[ index ] && queue[ index ].finish ***REMOVED*** {
          queue[ index ].finish.call( this ***REMOVED***;
    ***REMOVED***
  ***REMOVED***

      // turn off finishing flag
      delete data.finish;
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;

// Generate parameters to create a standard animation
function genFx( type, includeWidth ***REMOVED*** {
  var which,
    attrs = { height: type ***REMOVED***,
    i = 0;

  // if we include width, step value is 1 to do all cssExpand values,
  // if we don't include width, step value is 2 to skip over Left and Right
  includeWidth = includeWidth? 1 : 0;
  for( ; i < 4 ; i += 2 - includeWidth ***REMOVED*** {
    which = cssExpand[ i ];
    attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
  ***REMOVED***

  if ( includeWidth ***REMOVED*** {
    attrs.opacity = attrs.width = type;
  ***REMOVED***

  return attrs;
***REMOVED***

// Generate shortcuts for custom animations
jQuery.each({
  slideDown: genFx("show"***REMOVED***,
  slideUp: genFx("hide"***REMOVED***,
  slideToggle: genFx("toggle"***REMOVED***,
  fadeIn: { opacity: "show" ***REMOVED***,
  fadeOut: { opacity: "hide" ***REMOVED***,
  fadeToggle: { opacity: "toggle" ***REMOVED***
***REMOVED***, function( name, props ***REMOVED*** {
  jQuery.fn[ name ] = function( speed, easing, callback ***REMOVED*** {
    return this.animate( props, speed, easing, callback ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

jQuery.speed = function( speed, easing, fn ***REMOVED*** {
  var opt = speed && typeof speed === "object" ? jQuery.extend( {***REMOVED***, speed ***REMOVED*** : {
    complete: fn || !fn && easing ||
      jQuery.isFunction( speed ***REMOVED*** && speed,
    duration: speed,
    easing: fn && easing || easing && !jQuery.isFunction( easing ***REMOVED*** && easing
  ***REMOVED***;

  opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
    opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

  // normalize opt.queue - true/undefined/null -> "fx"
  if ( opt.queue == null || opt.queue === true ***REMOVED*** {
    opt.queue = "fx";
  ***REMOVED***

  // Queueing
  opt.old = opt.complete;

  opt.complete = function(***REMOVED*** {
    if ( jQuery.isFunction( opt.old ***REMOVED*** ***REMOVED*** {
      opt.old.call( this ***REMOVED***;
***REMOVED***

    if ( opt.queue ***REMOVED*** {
      jQuery.dequeue( this, opt.queue ***REMOVED***;
***REMOVED***
  ***REMOVED***;

  return opt;
***REMOVED***;

jQuery.easing = {
  linear: function( p ***REMOVED*** {
    return p;
  ***REMOVED***,
  swing: function( p ***REMOVED*** {
    return 0.5 - Math.cos( p*Math.PI ***REMOVED*** / 2;
  ***REMOVED***
***REMOVED***;

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function(***REMOVED*** {
  var timer,
    timers = jQuery.timers,
    i = 0;

  fxNow = jQuery.now(***REMOVED***;

  for ( ; i < timers.length; i++ ***REMOVED*** {
    timer = timers[ i ];
    // Checks the timer has not already been removed
    if ( !timer(***REMOVED*** && timers[ i ] === timer ***REMOVED*** {
      timers.splice( i--, 1 ***REMOVED***;
***REMOVED***
  ***REMOVED***

  if ( !timers.length ***REMOVED*** {
    jQuery.fx.stop(***REMOVED***;
  ***REMOVED***
  fxNow = undefined;
***REMOVED***;

jQuery.fx.timer = function( timer ***REMOVED*** {
  if ( timer(***REMOVED*** && jQuery.timers.push( timer ***REMOVED*** ***REMOVED*** {
    jQuery.fx.start(***REMOVED***;
  ***REMOVED***
***REMOVED***;

jQuery.fx.interval = 13;

jQuery.fx.start = function(***REMOVED*** {
  if ( !timerId ***REMOVED*** {
    timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval ***REMOVED***;
  ***REMOVED***
***REMOVED***;

jQuery.fx.stop = function(***REMOVED*** {
  clearInterval( timerId ***REMOVED***;
  timerId = null;
***REMOVED***;

jQuery.fx.speeds = {
  slow: 600,
  fast: 200,
  // Default speed
  _default: 400
***REMOVED***;

// Back Compat <1.8 extension point
jQuery.fx.step = {***REMOVED***;

if ( jQuery.expr && jQuery.expr.filters ***REMOVED*** {
  jQuery.expr.filters.animated = function( elem ***REMOVED*** {
    return jQuery.grep(jQuery.timers, function( fn ***REMOVED*** {
      return elem === fn.elem;
***REMOVED******REMOVED***.length;
  ***REMOVED***;
***REMOVED***
jQuery.fn.offset = function( options ***REMOVED*** {
  if ( arguments.length ***REMOVED*** {
    return options === undefined ?
      this :
      this.each(function( i ***REMOVED*** {
        jQuery.offset.setOffset( this, options, i ***REMOVED***;
  ***REMOVED******REMOVED***;
  ***REMOVED***

  var docElem, win,
    elem = this[ 0 ],
    box = { top: 0, left: 0 ***REMOVED***,
    doc = elem && elem.ownerDocument;

  if ( !doc ***REMOVED*** {
    return;
  ***REMOVED***

  docElem = doc.documentElement;

  // Make sure it's not a disconnected DOM node
  if ( !jQuery.contains( docElem, elem ***REMOVED*** ***REMOVED*** {
    return box;
  ***REMOVED***

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone***REMOVED***
  if ( typeof elem.getBoundingClientRect !== core_strundefined ***REMOVED*** {
    box = elem.getBoundingClientRect(***REMOVED***;
  ***REMOVED***
  win = getWindow( doc ***REMOVED***;
  return {
    top: box.top + win.pageYOffset - docElem.clientTop,
    left: box.left + win.pageXOffset - docElem.clientLeft
  ***REMOVED***;
***REMOVED***;

jQuery.offset = {

  setOffset: function( elem, options, i ***REMOVED*** {
    var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
      position = jQuery.css( elem, "position" ***REMOVED***,
      curElem = jQuery( elem ***REMOVED***,
      props = {***REMOVED***;

    // Set position first, in-case top/left are set even on static elem
    if ( position === "static" ***REMOVED*** {
      elem.style.position = "relative";
***REMOVED***

    curOffset = curElem.offset(***REMOVED***;
    curCSSTop = jQuery.css( elem, "top" ***REMOVED***;
    curCSSLeft = jQuery.css( elem, "left" ***REMOVED***;
    calculatePosition = ( position === "absolute" || position === "fixed" ***REMOVED*** && ( curCSSTop + curCSSLeft ***REMOVED***.indexOf("auto"***REMOVED*** > -1;

    // Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
    if ( calculatePosition ***REMOVED*** {
      curPosition = curElem.position(***REMOVED***;
      curTop = curPosition.top;
      curLeft = curPosition.left;

***REMOVED*** else {
      curTop = parseFloat( curCSSTop ***REMOVED*** || 0;
      curLeft = parseFloat( curCSSLeft ***REMOVED*** || 0;
***REMOVED***

    if ( jQuery.isFunction( options ***REMOVED*** ***REMOVED*** {
      options = options.call( elem, i, curOffset ***REMOVED***;
***REMOVED***

    if ( options.top != null ***REMOVED*** {
      props.top = ( options.top - curOffset.top ***REMOVED*** + curTop;
***REMOVED***
    if ( options.left != null ***REMOVED*** {
      props.left = ( options.left - curOffset.left ***REMOVED*** + curLeft;
***REMOVED***

    if ( "using" in options ***REMOVED*** {
      options.using.call( elem, props ***REMOVED***;

***REMOVED*** else {
      curElem.css( props ***REMOVED***;
***REMOVED***
  ***REMOVED***
***REMOVED***;


jQuery.fn.extend({

  position: function(***REMOVED*** {
    if ( !this[ 0 ] ***REMOVED*** {
      return;
***REMOVED***

    var offsetParent, offset,
      elem = this[ 0 ],
      parentOffset = { top: 0, left: 0 ***REMOVED***;

    // Fixed elements are offset from window (parentOffset = {top:0, left: 0***REMOVED***, because it is it's only offset parent
    if ( jQuery.css( elem, "position" ***REMOVED*** === "fixed" ***REMOVED*** {
      // We assume that getBoundingClientRect is available when computed position is fixed
      offset = elem.getBoundingClientRect(***REMOVED***;

***REMOVED*** else {
      // Get *real* offsetParent
      offsetParent = this.offsetParent(***REMOVED***;

      // Get correct offsets
      offset = this.offset(***REMOVED***;
      if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ***REMOVED*** ***REMOVED*** {
        parentOffset = offsetParent.offset(***REMOVED***;
  ***REMOVED***

      // Add offsetParent borders
      parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ***REMOVED***;
      parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ***REMOVED***;
***REMOVED***

    // Subtract parent offsets and element margins
    return {
      top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ***REMOVED***,
      left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true ***REMOVED***
***REMOVED***;
  ***REMOVED***,

  offsetParent: function(***REMOVED*** {
    return this.map(function(***REMOVED*** {
      var offsetParent = this.offsetParent || docElem;

      while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ***REMOVED*** && jQuery.css( offsetParent, "position"***REMOVED*** === "static" ***REMOVED*** ***REMOVED*** {
        offsetParent = offsetParent.offsetParent;
  ***REMOVED***

      return offsetParent || docElem;
***REMOVED******REMOVED***;
  ***REMOVED***
***REMOVED******REMOVED***;


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"***REMOVED***, function( method, prop ***REMOVED*** {
  var top = "pageYOffset" === prop;

  jQuery.fn[ method ] = function( val ***REMOVED*** {
    return jQuery.access( this, function( elem, method, val ***REMOVED*** {
      var win = getWindow( elem ***REMOVED***;

      if ( val === undefined ***REMOVED*** {
        return win ? win[ prop ] : elem[ method ];
  ***REMOVED***

      if ( win ***REMOVED*** {
        win.scrollTo(
          !top ? val : window.pageXOffset,
          top ? val : window.pageYOffset
        ***REMOVED***;

  ***REMOVED*** else {
        elem[ method ] = val;
  ***REMOVED***
***REMOVED***, method, val, arguments.length, null ***REMOVED***;
  ***REMOVED***;
***REMOVED******REMOVED***;

function getWindow( elem ***REMOVED*** {
  return jQuery.isWindow( elem ***REMOVED*** ? elem : elem.nodeType === 9 && elem.defaultView;
***REMOVED***
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" ***REMOVED***, function( name, type ***REMOVED*** {
  jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name ***REMOVED***, function( defaultExtra, funcName ***REMOVED*** {
    // margin is only for outerHeight, outerWidth
    jQuery.fn[ funcName ] = function( margin, value ***REMOVED*** {
      var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ***REMOVED***,
        extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" ***REMOVED***;

      return jQuery.access( this, function( elem, type, value ***REMOVED*** {
        var doc;

        if ( jQuery.isWindow( elem ***REMOVED*** ***REMOVED*** {
          // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
          // isn't a whole lot we can do. See pull request at this URL for discussion:
          // https://github.com/jquery/jquery/pull/764
          return elem.document.documentElement[ "client" + name ];
    ***REMOVED***

        // Get document width or height
        if ( elem.nodeType === 9 ***REMOVED*** {
          doc = elem.documentElement;

          // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
          // whichever is greatest
          return Math.max(
            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
            elem.body[ "offset" + name ], doc[ "offset" + name ],
            doc[ "client" + name ]
          ***REMOVED***;
    ***REMOVED***

        return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css( elem, type, extra ***REMOVED*** :

          // Set width or height on the element
          jQuery.style( elem, type, value, extra ***REMOVED***;
  ***REMOVED***, type, chainable ? margin : undefined, chainable, null ***REMOVED***;
***REMOVED***;
  ***REMOVED******REMOVED***;
***REMOVED******REMOVED***;
// Limit scope pollution from any deprecated API
// (function(***REMOVED*** {

// The number of elements contained in the matched element set
jQuery.fn.size = function(***REMOVED*** {
  return this.length;
***REMOVED***;

jQuery.fn.andSelf = jQuery.fn.addBack;

// ***REMOVED******REMOVED***(***REMOVED***;
if ( typeof module === "object" && module && typeof module.exports === "object" ***REMOVED*** {
  // Expose jQuery as module.exports in loaders that implement the Node
  // module pattern (including browserify***REMOVED***. Do not create the global, since
  // the user will be storing it themselves locally, and globals are frowned
  // upon in the Node module world.
  module.exports = jQuery;
***REMOVED*** else {
  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.
  if ( typeof define === "function" && define.amd ***REMOVED*** {
    define( "jquery", [], function (***REMOVED*** { return jQuery; ***REMOVED*** ***REMOVED***;
  ***REMOVED***
***REMOVED***

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ***REMOVED*** {
  window.jQuery = window.$ = jQuery;
***REMOVED***

***REMOVED******REMOVED***( window ***REMOVED***;
