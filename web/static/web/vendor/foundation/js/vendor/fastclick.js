/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.9
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt***REMOVED***
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element***REMOVED*** layer The layer to listen on
 */
function FastClick(layer***REMOVED*** {
  'use strict';
  var oldOnClick, self = this;


  /**
   * Whether a click is currently being tracked.
   *
   * @type boolean
   */
  this.trackingClick = false;


  /**
   * Timestamp for when when click tracking started.
   *
   * @type number
   */
  this.trackingClickStart = 0;


  /**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
  this.targetElement = null;


  /**
   * X-coordinate of touch start event.
   *
   * @type number
   */
  this.touchStartX = 0;


  /**
   * Y-coordinate of touch start event.
   *
   * @type number
   */
  this.touchStartY = 0;


  /**
   * ID of the last touch, retrieved from Touch.identifier.
   *
   * @type number
   */
  this.lastTouchIdentifier = 0;


  /**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
  this.touchBoundary = 10;


  /**
   * The FastClick layer.
   *
   * @type Element
   */
  this.layer = layer;

  if (!layer || !layer.nodeType***REMOVED*** {
    throw new TypeError('Layer must be a document node'***REMOVED***;
  ***REMOVED***

  /** @type function(***REMOVED*** */
  this.onClick = function(***REMOVED*** { return FastClick.prototype.onClick.apply(self, arguments***REMOVED***; ***REMOVED***;

  /** @type function(***REMOVED*** */
  this.onMouse = function(***REMOVED*** { return FastClick.prototype.onMouse.apply(self, arguments***REMOVED***; ***REMOVED***;

  /** @type function(***REMOVED*** */
  this.onTouchStart = function(***REMOVED*** { return FastClick.prototype.onTouchStart.apply(self, arguments***REMOVED***; ***REMOVED***;

  /** @type function(***REMOVED*** */
  this.onTouchMove = function(***REMOVED*** { return FastClick.prototype.onTouchMove.apply(self, arguments***REMOVED***; ***REMOVED***;

  /** @type function(***REMOVED*** */
  this.onTouchEnd = function(***REMOVED*** { return FastClick.prototype.onTouchEnd.apply(self, arguments***REMOVED***; ***REMOVED***;

  /** @type function(***REMOVED*** */
  this.onTouchCancel = function(***REMOVED*** { return FastClick.prototype.onTouchCancel.apply(self, arguments***REMOVED***; ***REMOVED***;

  if (FastClick.notNeeded(layer***REMOVED******REMOVED*** {
    return;
  ***REMOVED***

  // Set up event handlers as required
  if (this.deviceIsAndroid***REMOVED*** {
    layer.addEventListener('mouseover', this.onMouse, true***REMOVED***;
    layer.addEventListener('mousedown', this.onMouse, true***REMOVED***;
    layer.addEventListener('mouseup', this.onMouse, true***REMOVED***;
  ***REMOVED***

  layer.addEventListener('click', this.onClick, true***REMOVED***;
  layer.addEventListener('touchstart', this.onTouchStart, false***REMOVED***;
  layer.addEventListener('touchmove', this.onTouchMove, false***REMOVED***;
  layer.addEventListener('touchend', this.onTouchEnd, false***REMOVED***;
  layer.addEventListener('touchcancel', this.onTouchCancel, false***REMOVED***;

  // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2***REMOVED***
  // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
  // layer when they are cancelled.
  if (!Event.prototype.stopImmediatePropagation***REMOVED*** {
    layer.removeEventListener = function(type, callback, capture***REMOVED*** {
      var rmv = Node.prototype.removeEventListener;
      if (type === 'click'***REMOVED*** {
        rmv.call(layer, type, callback.hijacked || callback, capture***REMOVED***;
  ***REMOVED*** else {
        rmv.call(layer, type, callback, capture***REMOVED***;
  ***REMOVED***
***REMOVED***;

    layer.addEventListener = function(type, callback, capture***REMOVED*** {
      var adv = Node.prototype.addEventListener;
      if (type === 'click'***REMOVED*** {
        adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event***REMOVED*** {
          if (!event.propagationStopped***REMOVED*** {
            callback(event***REMOVED***;
      ***REMOVED***
    ***REMOVED******REMOVED***, capture***REMOVED***;
  ***REMOVED*** else {
        adv.call(layer, type, callback, capture***REMOVED***;
  ***REMOVED***
***REMOVED***;
  ***REMOVED***

  // If a handler is already declared in the element's onclick attribute, it will be fired before
  // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
  // adding it as listener.
  if (typeof layer.onclick === 'function'***REMOVED*** {

    // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
    // - the old one won't work if passed to addEventListener directly.
    oldOnClick = layer.onclick;
    layer.addEventListener('click', function(event***REMOVED*** {
      oldOnClick(event***REMOVED***;
***REMOVED***, false***REMOVED***;
    layer.onclick = null;
  ***REMOVED***
***REMOVED***


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android'***REMOVED*** > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od***REMOVED***/.test(navigator.userAgent***REMOVED***;


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d***REMOVED***?/***REMOVED***.test(navigator.userAgent***REMOVED***;


/**
 * iOS 6.0(+?***REMOVED*** requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2***REMOVED******REMOVED***_\d/***REMOVED***.test(navigator.userAgent***REMOVED***;


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element***REMOVED*** target Target DOM element
 * @returns {boolean***REMOVED*** Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target***REMOVED*** {
  'use strict';
  switch (target.nodeName.toLowerCase(***REMOVED******REMOVED*** {

  // Don't send a synthetic click to disabled inputs (issue #62***REMOVED***
  case 'button':
  case 'select':
  case 'textarea':
    if (target.disabled***REMOVED*** {
      return true;
***REMOVED***

    break;
  case 'input':

    // File inputs need real clicks on iOS 6 due to a browser bug (issue #68***REMOVED***
    if ((this.deviceIsIOS && target.type === 'file'***REMOVED*** || target.disabled***REMOVED*** {
      return true;
***REMOVED***

    break;
  case 'label':
  case 'video':
    return true;
  ***REMOVED***

  return (/\bneedsclick\b/***REMOVED***.test(target.className***REMOVED***;
***REMOVED***;


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element***REMOVED*** target Target DOM element
 * @returns {boolean***REMOVED*** Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target***REMOVED*** {
  'use strict';
  switch (target.nodeName.toLowerCase(***REMOVED******REMOVED*** {
  case 'textarea':
  case 'select':
    return true;
  case 'input':
    switch (target.type***REMOVED*** {
    case 'button':
    case 'checkbox':
    case 'file':
    case 'image':
    case 'radio':
    case 'submit':
      return false;
***REMOVED***

    // No point in attempting to focus disabled inputs
    return !target.disabled && !target.readOnly;
  default:
    return (/\bneedsfocus\b/***REMOVED***.test(target.className***REMOVED***;
  ***REMOVED***
***REMOVED***;


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element***REMOVED*** targetElement
 * @param {Event***REMOVED*** event
 */
FastClick.prototype.sendClick = function(targetElement, event***REMOVED*** {
  'use strict';
  var clickEvent, touch;

  // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24***REMOVED***
  if (document.activeElement && document.activeElement !== targetElement***REMOVED*** {
    document.activeElement.blur(***REMOVED***;
  ***REMOVED***

  touch = event.changedTouches[0];

  // Synthesise a click event, with an extra attribute so it can be tracked
  clickEvent = document.createEvent('MouseEvents'***REMOVED***;
  clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null***REMOVED***;
  clickEvent.forwardedTouchEvent = true;
  targetElement.dispatchEvent(clickEvent***REMOVED***;
***REMOVED***;


/**
 * @param {EventTarget|Element***REMOVED*** targetElement
 */
FastClick.prototype.focus = function(targetElement***REMOVED*** {
  'use strict';
  var length;

  if (this.deviceIsIOS && targetElement.setSelectionRange***REMOVED*** {
    length = targetElement.value.length;
    targetElement.setSelectionRange(length, length***REMOVED***;
  ***REMOVED*** else {
    targetElement.focus(***REMOVED***;
  ***REMOVED***
***REMOVED***;


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element***REMOVED*** targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement***REMOVED*** {
  'use strict';
  var scrollParent, parentElement;

  scrollParent = targetElement.fastClickScrollParent;

  // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
  // target element was moved to another parent.
  if (!scrollParent || !scrollParent.contains(targetElement***REMOVED******REMOVED*** {
    parentElement = targetElement;
    do {
      if (parentElement.scrollHeight > parentElement.offsetHeight***REMOVED*** {
        scrollParent = parentElement;
        targetElement.fastClickScrollParent = parentElement;
        break;
  ***REMOVED***

      parentElement = parentElement.parentElement;
***REMOVED*** while (parentElement***REMOVED***;
  ***REMOVED***

  // Always update the scroll top tracker if possible.
  if (scrollParent***REMOVED*** {
    scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
  ***REMOVED***
***REMOVED***;


/**
 * @param {EventTarget***REMOVED*** targetElement
 * @returns {Element|EventTarget***REMOVED***
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget***REMOVED*** {
  'use strict';

  // On some older browsers (notably Safari on iOS 4.1 - see issue #56***REMOVED*** the event target may be a text node.
  if (eventTarget.nodeType === Node.TEXT_NODE***REMOVED*** {
    return eventTarget.parentNode;
  ***REMOVED***

  return eventTarget;
***REMOVED***;


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.onTouchStart = function(event***REMOVED*** {
  'use strict';
  var targetElement, touch, selection;

  // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111***REMOVED***.
  if (event.targetTouches.length > 1***REMOVED*** {
    return true;
  ***REMOVED***

  targetElement = this.getTargetElementFromEventTarget(event.target***REMOVED***;
  touch = event.targetTouches[0];

  if (this.deviceIsIOS***REMOVED*** {

    // Only trusted events will deselect text on iOS (issue #49***REMOVED***
    selection = window.getSelection(***REMOVED***;
    if (selection.rangeCount && !selection.isCollapsed***REMOVED*** {
      return true;
***REMOVED***

    if (!this.deviceIsIOS4***REMOVED*** {

      // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23***REMOVED***:
      // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
      // with the same identifier as the touch event that previously triggered the click that triggered the alert.
      // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
      // immediately preceeding touch event (issue #52***REMOVED***, so this fix is unavailable on that platform.
      if (touch.identifier === this.lastTouchIdentifier***REMOVED*** {
        event.preventDefault(***REMOVED***;
        return false;
  ***REMOVED***

      this.lastTouchIdentifier = touch.identifier;

      // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch***REMOVED*** and:
      // 1***REMOVED*** the user does a fling scroll on the scrollable layer
      // 2***REMOVED*** the user stops the fling scroll with another tap
      // then the event.target of the last 'touchend' event will be the element that was under the user's finger
      // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
      // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42***REMOVED***.
      this.updateScrollParent(targetElement***REMOVED***;
***REMOVED***
  ***REMOVED***

  this.trackingClick = true;
  this.trackingClickStart = event.timeStamp;
  this.targetElement = targetElement;

  this.touchStartX = touch.pageX;
  this.touchStartY = touch.pageY;

  // Prevent phantom clicks on fast double-tap (issue #36***REMOVED***
  if ((event.timeStamp - this.lastClickTime***REMOVED*** < 200***REMOVED*** {
    event.preventDefault(***REMOVED***;
  ***REMOVED***

  return true;
***REMOVED***;


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.touchHasMoved = function(event***REMOVED*** {
  'use strict';
  var touch = event.changedTouches[0], boundary = this.touchBoundary;

  if (Math.abs(touch.pageX - this.touchStartX***REMOVED*** > boundary || Math.abs(touch.pageY - this.touchStartY***REMOVED*** > boundary***REMOVED*** {
    return true;
  ***REMOVED***

  return false;
***REMOVED***;


/**
 * Update the last position.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.onTouchMove = function(event***REMOVED*** {
  'use strict';
  if (!this.trackingClick***REMOVED*** {
    return true;
  ***REMOVED***

  // If the touch has moved, cancel the click tracking
  if (this.targetElement !== this.getTargetElementFromEventTarget(event.target***REMOVED*** || this.touchHasMoved(event***REMOVED******REMOVED*** {
    this.trackingClick = false;
    this.targetElement = null;
  ***REMOVED***

  return true;
***REMOVED***;


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement***REMOVED*** labelElement
 * @returns {Element|null***REMOVED***
 */
FastClick.prototype.findControl = function(labelElement***REMOVED*** {
  'use strict';

  // Fast path for newer browsers supporting the HTML5 control attribute
  if (labelElement.control !== undefined***REMOVED*** {
    return labelElement.control;
  ***REMOVED***

  // All browsers under test that support touch events also support the HTML5 htmlFor attribute
  if (labelElement.htmlFor***REMOVED*** {
    return document.getElementById(labelElement.htmlFor***REMOVED***;
  ***REMOVED***

  // If no for attribute exists, attempt to retrieve the first labellable descendant element
  // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
  return labelElement.querySelector('button, input:not([type=hidden]***REMOVED***, keygen, meter, output, progress, select, textarea'***REMOVED***;
***REMOVED***;


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.onTouchEnd = function(event***REMOVED*** {
  'use strict';
  var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

  if (!this.trackingClick***REMOVED*** {
    return true;
  ***REMOVED***

  // Prevent phantom clicks on fast double-tap (issue #36***REMOVED***
  if ((event.timeStamp - this.lastClickTime***REMOVED*** < 200***REMOVED*** {
    this.cancelNextClick = true;
    return true;
  ***REMOVED***

  this.lastClickTime = event.timeStamp;

  trackingClickStart = this.trackingClickStart;
  this.trackingClick = false;
  this.trackingClickStart = 0;

  // On some iOS devices, the targetElement supplied with the event is invalid if the layer
  // is performing a transition or scroll, and has to be re-detected manually. Note that
  // for this to function correctly, it must be called *after* the event target is checked!
  // See issue #57; also filed as rdar://13048589 .
  if (this.deviceIsIOSWithBadTarget***REMOVED*** {
    touch = event.changedTouches[0];

    // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
    targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset***REMOVED*** || targetElement;
    targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
  ***REMOVED***

  targetTagName = targetElement.tagName.toLowerCase(***REMOVED***;
  if (targetTagName === 'label'***REMOVED*** {
    forElement = this.findControl(targetElement***REMOVED***;
    if (forElement***REMOVED*** {
      this.focus(targetElement***REMOVED***;
      if (this.deviceIsAndroid***REMOVED*** {
        return false;
  ***REMOVED***

      targetElement = forElement;
***REMOVED***
  ***REMOVED*** else if (this.needsFocus(targetElement***REMOVED******REMOVED*** {

    // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36***REMOVED*** then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
    // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37***REMOVED***.
    if ((event.timeStamp - trackingClickStart***REMOVED*** > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input'***REMOVED******REMOVED*** {
      this.targetElement = null;
      return false;
***REMOVED***

    this.focus(targetElement***REMOVED***;

    // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
    if (!this.deviceIsIOS4 || targetTagName !== 'select'***REMOVED*** {
      this.targetElement = null;
      event.preventDefault(***REMOVED***;
***REMOVED***

    return false;
  ***REMOVED***

  if (this.deviceIsIOS && !this.deviceIsIOS4***REMOVED*** {

    // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
    // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42***REMOVED***.
    scrollParent = targetElement.fastClickScrollParent;
    if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop***REMOVED*** {
      return true;
***REMOVED***
  ***REMOVED***

  // Prevent the actual click from going though - unless the target node is marked as requiring
  // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
  if (!this.needsClick(targetElement***REMOVED******REMOVED*** {
    event.preventDefault(***REMOVED***;
    this.sendClick(targetElement, event***REMOVED***;
  ***REMOVED***

  return false;
***REMOVED***;


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void***REMOVED***
 */
FastClick.prototype.onTouchCancel = function(***REMOVED*** {
  'use strict';
  this.trackingClick = false;
  this.targetElement = null;
***REMOVED***;


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.onMouse = function(event***REMOVED*** {
  'use strict';

  // If a target element was never set (because a touch event was never fired***REMOVED*** allow the event
  if (!this.targetElement***REMOVED*** {
    return true;
  ***REMOVED***

  if (event.forwardedTouchEvent***REMOVED*** {
    return true;
  ***REMOVED***

  // Programmatically generated events targeting a specific element should be permitted
  if (!event.cancelable***REMOVED*** {
    return true;
  ***REMOVED***

  // Derive and check the target element to see whether the mouse event needs to be permitted;
  // unless explicitly enabled, prevent non-touch click events from triggering actions,
  // to prevent ghost/doubleclicks.
  if (!this.needsClick(this.targetElement***REMOVED*** || this.cancelNextClick***REMOVED*** {

    // Prevent any user-added listeners declared on FastClick element from being fired.
    if (event.stopImmediatePropagation***REMOVED*** {
      event.stopImmediatePropagation(***REMOVED***;
***REMOVED*** else {

      // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2***REMOVED***
      event.propagationStopped = true;
***REMOVED***

    // Cancel the event
    event.stopPropagation(***REMOVED***;
    event.preventDefault(***REMOVED***;

    return false;
  ***REMOVED***

  // If the mouse event is permitted, return true for the action to go through.
  return true;
***REMOVED***;


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication***REMOVED***, or
 * an actual click which should be permitted.
 *
 * @param {Event***REMOVED*** event
 * @returns {boolean***REMOVED***
 */
FastClick.prototype.onClick = function(event***REMOVED*** {
  'use strict';
  var permitted;

  // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44***REMOVED***. In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
  if (this.trackingClick***REMOVED*** {
    this.targetElement = null;
    this.trackingClick = false;
    return true;
  ***REMOVED***

  // Very odd behaviour on iOS (issue #18***REMOVED***: if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
  if (event.target.type === 'submit' && event.detail === 0***REMOVED*** {
    return true;
  ***REMOVED***

  permitted = this.onMouse(event***REMOVED***;

  // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
  if (!permitted***REMOVED*** {
    this.targetElement = null;
  ***REMOVED***

  // If clicks are permitted, return true for the action to go through.
  return permitted;
***REMOVED***;


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void***REMOVED***
 */
FastClick.prototype.destroy = function(***REMOVED*** {
  'use strict';
  var layer = this.layer;

  if (this.deviceIsAndroid***REMOVED*** {
    layer.removeEventListener('mouseover', this.onMouse, true***REMOVED***;
    layer.removeEventListener('mousedown', this.onMouse, true***REMOVED***;
    layer.removeEventListener('mouseup', this.onMouse, true***REMOVED***;
  ***REMOVED***

  layer.removeEventListener('click', this.onClick, true***REMOVED***;
  layer.removeEventListener('touchstart', this.onTouchStart, false***REMOVED***;
  layer.removeEventListener('touchmove', this.onTouchMove, false***REMOVED***;
  layer.removeEventListener('touchend', this.onTouchEnd, false***REMOVED***;
  layer.removeEventListener('touchcancel', this.onTouchCancel, false***REMOVED***;
***REMOVED***;


/**
 * Check whether FastClick is needed.
 *
 * @param {Element***REMOVED*** layer The layer to listen on
 */
FastClick.notNeeded = function(layer***REMOVED*** {
  'use strict';
  var metaViewport;

  // Devices that don't support touch don't need FastClick
  if (typeof window.ontouchstart === 'undefined'***REMOVED*** {
    return true;
  ***REMOVED***

  if ((/Chrome\/[0-9]+/***REMOVED***.test(navigator.userAgent***REMOVED******REMOVED*** {

    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89***REMOVED***
    if (FastClick.prototype.deviceIsAndroid***REMOVED*** {
      metaViewport = document.querySelector('meta[name=viewport]'***REMOVED***;
      if (metaViewport && metaViewport.content.indexOf('user-scalable=no'***REMOVED*** !== -1***REMOVED*** {
        return true;
  ***REMOVED***

    // Chrome desktop doesn't need FastClick (issue #15***REMOVED***
***REMOVED*** else {
      return true;
***REMOVED***
  ***REMOVED***

  // IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97***REMOVED***
  if (layer.style.msTouchAction === 'none'***REMOVED*** {
    return true;
  ***REMOVED***

  return false;
***REMOVED***;


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element***REMOVED*** layer The layer to listen on
 */
FastClick.attach = function(layer***REMOVED*** {
  'use strict';
  return new FastClick(layer***REMOVED***;
***REMOVED***;


if (typeof define !== 'undefined' && define.amd***REMOVED*** {

  // AMD. Register as an anonymous module.
  define(function(***REMOVED*** {
    'use strict';
    return FastClick;
  ***REMOVED******REMOVED***;
***REMOVED*** else if (typeof module !== 'undefined' && module.exports***REMOVED*** {
  module.exports = FastClick.attach;
  module.exports.FastClick = FastClick;
***REMOVED*** else {
  window.FastClick = FastClick;
***REMOVED***
