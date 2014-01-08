/* 
 * The MIT License
 *
 * Copyright (c***REMOVED*** 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"***REMOVED***, 
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Defines the global Placeholders object along with various utility methods
(function (global***REMOVED*** {

    "use strict";

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn***REMOVED*** {
        if (elem.addEventListener***REMOVED*** {
            return elem.addEventListener(event, fn, false***REMOVED***;
    ***REMOVED***
        if (elem.attachEvent***REMOVED*** {
            return elem.attachEvent("on" + event, fn***REMOVED***;
    ***REMOVED***
***REMOVED***

    // Check whether an item is in an array (we don't use Array.prototype.indexOf so we don't clobber any existing polyfills - this is a really simple alternative***REMOVED***
    function inArray(arr, item***REMOVED*** {
        var i, len;
        for (i = 0, len = arr.length; i < len; i++***REMOVED*** {
            if (arr[i] === item***REMOVED*** {
                return true;
        ***REMOVED***
    ***REMOVED***
        return false;
***REMOVED***

    // Move the caret to the index position specified. Assumes that the element has focus
    function moveCaret(elem, index***REMOVED*** {
        var range;
        if (elem.createTextRange***REMOVED*** {
            range = elem.createTextRange(***REMOVED***;
            range.move("character", index***REMOVED***;
            range.select(***REMOVED***;
    ***REMOVED*** else if (elem.selectionStart***REMOVED*** {
            elem.focus(***REMOVED***;
            elem.setSelectionRange(index, index***REMOVED***;
    ***REMOVED***
***REMOVED***

    // Attempt to change the type property of an input element
    function changeType(elem, type***REMOVED*** {
        try {
            elem.type = type;
            return true;
    ***REMOVED*** catch (e***REMOVED*** {
            // You can't change input type in IE8 and below
            return false;
    ***REMOVED***
***REMOVED***

    // Expose public methods
    global.Placeholders = {
        Utils: {
            addEventListener: addEventListener,
            inArray: inArray,
            moveCaret: moveCaret,
            changeType: changeType
    ***REMOVED***
***REMOVED***;

***REMOVED***(this***REMOVED******REMOVED***;

(function (global***REMOVED*** {

    "use strict";

    var validTypes = [
            "text",
            "search",
            "url",
            "tel",
            "email",
            "password",
            "number",
            "textarea"
    ***REMOVED***

        // The list of keycodes that are not allowed when the polyfill is configured to hide-on-input
        badKeys = [

            // The following keys all cause the caret to jump to the end of the input value
            27, // Escape
            33, // Page up
            34, // Page down
            35, // End
            36, // Home

            // Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
            37, // Left
            38, // Up
            39, // Right
            40, // Down

            // The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
            8, // Backspace
            46 // Delete
    ***REMOVED***

        // Styling variables
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("(?:^|\\s***REMOVED***" + placeholderClassName + "(?!\\S***REMOVED***"***REMOVED***,

        // These will hold references to all elements that can be affected. NodeList objects are live, so we only need to get those references once
        inputs, textareas,

        // The various data-* attributes used by the polyfill
        ATTR_CURRENT_VAL = "data-placeholder-value",
        ATTR_ACTIVE = "data-placeholder-active",
        ATTR_INPUT_TYPE = "data-placeholder-type",
        ATTR_FORM_HANDLED = "data-placeholder-submit",
        ATTR_EVENTS_BOUND = "data-placeholder-bound",
        ATTR_OPTION_FOCUS = "data-placeholder-focus",
        ATTR_OPTION_LIVE = "data-placeholder-live",

        // Various other variables used throughout the rest of the script
        test = document.createElement("input"***REMOVED***,
        head = document.getElementsByTagName("head"***REMOVED***[0],
        root = document.documentElement,
        Placeholders = global.Placeholders,
        Utils = Placeholders.Utils,
        hideOnInput, liveUpdates, keydownVal, styleElem, styleRules, placeholder, timer, form, elem, len, i;

    // No-op (used in place of public methods when native support is detected***REMOVED***
    function noop(***REMOVED*** {***REMOVED***

    // Hide the placeholder value on a single element. Returns true if the placeholder was hidden and false if it was not (because it wasn't visible in the first place***REMOVED***
    function hidePlaceholder(elem***REMOVED*** {
        var type;
        if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL***REMOVED*** && elem.getAttribute(ATTR_ACTIVE***REMOVED*** === "true"***REMOVED*** {
            elem.setAttribute(ATTR_ACTIVE, "false"***REMOVED***;
            elem.value = "";
            elem.className = elem.className.replace(classNameRegExp, ""***REMOVED***;

            // If the polyfill has changed the type of the element we need to change it back
            type = elem.getAttribute(ATTR_INPUT_TYPE***REMOVED***;
            if (type***REMOVED*** {
                elem.type = type;
        ***REMOVED***
            return true;
    ***REMOVED***
        return false;
***REMOVED***

    // Show the placeholder value on a single element. Returns true if the placeholder was shown and false if it was not (because it was already visible***REMOVED***
    function showPlaceholder(elem***REMOVED*** {
        var type,
            val = elem.getAttribute(ATTR_CURRENT_VAL***REMOVED***;
        if (elem.value === "" && val***REMOVED*** {
            elem.setAttribute(ATTR_ACTIVE, "true"***REMOVED***;
            elem.value = val;
            elem.className += " " + placeholderClassName;

            // If the type of element needs to change, change it (e.g. password inputs***REMOVED***
            type = elem.getAttribute(ATTR_INPUT_TYPE***REMOVED***;
            if (type***REMOVED*** {
                elem.type = "text";
        ***REMOVED*** else if (elem.type === "password"***REMOVED*** {
                if (Utils.changeType(elem, "text"***REMOVED******REMOVED*** {
                    elem.setAttribute(ATTR_INPUT_TYPE, "password"***REMOVED***;
            ***REMOVED***
        ***REMOVED***
            return true;
    ***REMOVED***
        return false;
***REMOVED***

    function handleElem(node, callback***REMOVED*** {

        var handleInputs, handleTextareas, elem, len, i;

        // Check if the passed in node is an input/textarea (in which case it can't have any affected descendants***REMOVED***
        if (node && node.getAttribute(ATTR_CURRENT_VAL***REMOVED******REMOVED*** {
            callback(node***REMOVED***;
    ***REMOVED*** else {

            // If an element was passed in, get all affected descendants. Otherwise, get all affected elements in document
            handleInputs = node ? node.getElementsByTagName("input"***REMOVED*** : inputs;
            handleTextareas = node ? node.getElementsByTagName("textarea"***REMOVED*** : textareas;

            // Run the callback for each element
            for (i = 0, len = handleInputs.length + handleTextareas.length; i < len; i++***REMOVED*** {
                elem = i < handleInputs.length ? handleInputs[i] : handleTextareas[i - handleInputs.length];
                callback(elem***REMOVED***;
        ***REMOVED***
    ***REMOVED***
***REMOVED***

    // Return all affected elements to their normal state (remove placeholder value if present***REMOVED***
    function disablePlaceholders(node***REMOVED*** {
        handleElem(node, hidePlaceholder***REMOVED***;
***REMOVED***

    // Show the placeholder value on all appropriate elements
    function enablePlaceholders(node***REMOVED*** {
        handleElem(node, showPlaceholder***REMOVED***;
***REMOVED***

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem***REMOVED*** {
        return function (***REMOVED*** {

            // Only hide the placeholder value if the (default***REMOVED*** hide-on-focus behaviour is enabled
            if (hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL***REMOVED*** && elem.getAttribute(ATTR_ACTIVE***REMOVED*** === "true"***REMOVED*** {

                // Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus***REMOVED***
                Utils.moveCaret(elem, 0***REMOVED***;

        ***REMOVED*** else {

                // Remove the placeholder
                hidePlaceholder(elem***REMOVED***;
        ***REMOVED***
    ***REMOVED***;
***REMOVED***

    // Returns a function that is used as a blur event handler
    function makeBlurHandler(elem***REMOVED*** {
        return function (***REMOVED*** {
            showPlaceholder(elem***REMOVED***;
    ***REMOVED***;
***REMOVED***

    // Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
    function makeKeydownHandler(elem***REMOVED*** {
        return function (e***REMOVED*** {
            keydownVal = elem.value;

            //Prevent the use of the arrow keys (try to keep the cursor before the placeholder***REMOVED***
            if (elem.getAttribute(ATTR_ACTIVE***REMOVED*** === "true"***REMOVED*** {
                if (keydownVal === elem.getAttribute(ATTR_CURRENT_VAL***REMOVED*** && Utils.inArray(badKeys, e.keyCode***REMOVED******REMOVED*** {
                    if (e.preventDefault***REMOVED*** {
                        e.preventDefault(***REMOVED***;
                ***REMOVED***
                    return false;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***;
***REMOVED***
    function makeKeyupHandler(elem***REMOVED*** {
        return function (***REMOVED*** {
            var type;

            if (elem.getAttribute(ATTR_ACTIVE***REMOVED*** === "true" && elem.value !== keydownVal***REMOVED*** {

                // Remove the placeholder
                elem.className = elem.className.replace(classNameRegExp, ""***REMOVED***;
                elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL***REMOVED***, ""***REMOVED***;
                elem.setAttribute(ATTR_ACTIVE, false***REMOVED***;

                // If the type of element needs to change, change it (e.g. password inputs***REMOVED***
                type = elem.getAttribute(ATTR_INPUT_TYPE***REMOVED***;
                if (type***REMOVED*** {
                    elem.type = type;
            ***REMOVED***
        ***REMOVED***

            // If the element is now empty we need to show the placeholder
            if (elem.value === ""***REMOVED*** {
                elem.blur(***REMOVED***;
                Utils.moveCaret(elem, 0***REMOVED***;
        ***REMOVED***
    ***REMOVED***;
***REMOVED***
    function makeClickHandler(elem***REMOVED*** {
        return function (***REMOVED*** {
            if (elem === document.activeElement && elem.value === elem.getAttribute(ATTR_CURRENT_VAL***REMOVED*** && elem.getAttribute(ATTR_ACTIVE***REMOVED*** === "true"***REMOVED*** {
                Utils.moveCaret(elem, 0***REMOVED***;
        ***REMOVED***
    ***REMOVED***;
***REMOVED***

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(form***REMOVED*** {
        return function (***REMOVED*** {

            // Turn off placeholders on all appropriate descendant elements
            disablePlaceholders(form***REMOVED***;
    ***REMOVED***;
***REMOVED***

    // Bind event handlers to an element that we need to affect with the polyfill
    function newElement(elem***REMOVED*** {

        // If the element is part of a form, make sure the placeholder string is not submitted as a value
        if (elem.form***REMOVED*** {
            form = elem.form;

            // Set a flag on the form so we know it's been handled (forms can contain multiple inputs***REMOVED***
            if (!form.getAttribute(ATTR_FORM_HANDLED***REMOVED******REMOVED*** {
                Utils.addEventListener(form, "submit", makeSubmitHandler(form***REMOVED******REMOVED***;
                form.setAttribute(ATTR_FORM_HANDLED, "true"***REMOVED***;
        ***REMOVED***
    ***REMOVED***

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        Utils.addEventListener(elem, "focus", makeFocusHandler(elem***REMOVED******REMOVED***;
        Utils.addEventListener(elem, "blur", makeBlurHandler(elem***REMOVED******REMOVED***;

        // If the placeholder should hide on input rather than on focus we need additional event handlers
        if (hideOnInput***REMOVED*** {
            Utils.addEventListener(elem, "keydown", makeKeydownHandler(elem***REMOVED******REMOVED***;
            Utils.addEventListener(elem, "keyup", makeKeyupHandler(elem***REMOVED******REMOVED***;
            Utils.addEventListener(elem, "click", makeClickHandler(elem***REMOVED******REMOVED***;
    ***REMOVED***

        // Remember that we've bound event handlers to this element
        elem.setAttribute(ATTR_EVENTS_BOUND, "true"***REMOVED***;
        elem.setAttribute(ATTR_CURRENT_VAL, placeholder***REMOVED***;

        // If the element doesn't have a value, set it to the placeholder string
        showPlaceholder(elem***REMOVED***;
***REMOVED***

    Placeholders.nativeSupport = test.placeholder !== void 0;

    if (!Placeholders.nativeSupport***REMOVED*** {

        // Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once***REMOVED***
        inputs = document.getElementsByTagName("input"***REMOVED***;
        textareas = document.getElementsByTagName("textarea"***REMOVED***;

        // Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update***REMOVED***
        hideOnInput = root.getAttribute(ATTR_OPTION_FOCUS***REMOVED*** === "false";
        liveUpdates = root.getAttribute(ATTR_OPTION_LIVE***REMOVED*** !== "false";

        // Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles***REMOVED***
        styleElem = document.createElement("style"***REMOVED***;
        styleElem.type = "text/css";

        // Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; ***REMOVED***"***REMOVED***;

        // Append style rules to newly created stylesheet
        if (styleElem.styleSheet***REMOVED*** {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
    ***REMOVED*** else {
            styleElem.appendChild(styleRules***REMOVED***;
    ***REMOVED***

        // Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence***REMOVED***
        head.insertBefore(styleElem, head.firstChild***REMOVED***;

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++***REMOVED*** {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Get the value of the placeholder attribute, if any. IE10 emulating IE7 fails with getAttribute, hence the use of the attributes node
            placeholder = elem.attributes.placeholder;
            if (placeholder***REMOVED*** {

                // IE returns an empty object instead of undefined if the attribute is not present
                placeholder = placeholder.nodeValue;

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                if (placeholder && Utils.inArray(validTypes, elem.type***REMOVED******REMOVED*** {
                    newElement(elem***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***

        // If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
        timer = setInterval(function (***REMOVED*** {
            for (i = 0, len = inputs.length + textareas.length; i < len; i++***REMOVED*** {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                placeholder = elem.attributes.placeholder;
                if (placeholder***REMOVED*** {
                    placeholder = placeholder.nodeValue;
                    if (placeholder && Utils.inArray(validTypes, elem.type***REMOVED******REMOVED*** {

                        // If the element hasn't had event handlers bound to it then add them
                        if (!elem.getAttribute(ATTR_EVENTS_BOUND***REMOVED******REMOVED*** {
                            newElement(elem***REMOVED***;
                    ***REMOVED***

                        // If the placeholder value has changed or not been initialised yet we need to update the display
                        if (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL***REMOVED*** || (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE***REMOVED******REMOVED******REMOVED*** {

                            // Attempt to change the type of password inputs (fails in IE < 9***REMOVED***
                            if (elem.type === "password" && !elem.getAttribute(ATTR_INPUT_TYPE***REMOVED*** && Utils.changeType(elem, "text"***REMOVED******REMOVED*** {
                                elem.setAttribute(ATTR_INPUT_TYPE, "password"***REMOVED***;
                        ***REMOVED***

                            // If the placeholder value has changed and the placeholder is currently on display we need to change it
                            if (elem.value === elem.getAttribute(ATTR_CURRENT_VAL***REMOVED******REMOVED*** {
                                elem.value = placeholder;
                        ***REMOVED***

                            // Keep a reference to the current placeholder value in case it changes via another script
                            elem.setAttribute(ATTR_CURRENT_VAL, placeholder***REMOVED***;
                    ***REMOVED***
                ***REMOVED***
            ***REMOVED***
        ***REMOVED***

            // If live updates are not enabled cancel the timer
            if (!liveUpdates***REMOVED*** {
                clearInterval(timer***REMOVED***;
        ***REMOVED***
    ***REMOVED***, 100***REMOVED***;
***REMOVED***

    // Expose public methods
    Placeholders.disable = Placeholders.nativeSupport ? noop : disablePlaceholders;
    Placeholders.enable = Placeholders.nativeSupport ? noop : enablePlaceholders;

***REMOVED***(this***REMOVED******REMOVED***;
