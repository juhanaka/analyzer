/**
*  Ajax Autocomplete for jQuery, version 1.2.7
*  (c***REMOVED*** 2013 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: http://www.devbridge.com/projects/autocomplete/jquery/
*
*/

/*jslint  browser: true, white: true, plusplus: true */
/*global define, window, document, jQuery */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory***REMOVED*** {
    'use strict';
    if (typeof define === 'function' && define.amd***REMOVED*** {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory***REMOVED***;
***REMOVED*** else {
        // Browser globals
        factory(jQuery***REMOVED***;
***REMOVED***
***REMOVED***(function ($***REMOVED*** {
    'use strict';

    var
        utils = (function (***REMOVED*** {
            return {

                extend: function (target, source***REMOVED*** {
                    return $.extend(target, source***REMOVED***;
            ***REMOVED***,

                createNode: function (html***REMOVED*** {
                    var div = document.createElement('div'***REMOVED***;
                    div.innerHTML = html;
                    return div.firstChild;
            ***REMOVED***

        ***REMOVED***;
    ***REMOVED***(***REMOVED******REMOVED***,

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            UP: 38,
            DOWN: 40
    ***REMOVED***;

    function Autocomplete(el, options***REMOVED*** {
        var noop = function (***REMOVED*** { ***REMOVED***,
            that = this,
            defaults = {
                autoSelectFirst: false,
                appendTo: 'body',
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: 'auto',
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {***REMOVED***,
                formatResult: Autocomplete.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: 'GET',
                noCache: false,
                onSearchStart: noop,
                onSearchComplete: noop,
                containerClass: 'autocomplete-suggestions',
                tabDisabled: false,
                dataType: 'text',
                lookupFilter: function (suggestion, originalQuery, queryLowerCase***REMOVED*** {
                    return suggestion.value.toLowerCase(***REMOVED***.indexOf(queryLowerCase***REMOVED*** !== -1;
            ***REMOVED***,
                paramName: 'query',
                transformResult: function (response***REMOVED*** {
                    return typeof response === 'string' ? $.parseJSON(response***REMOVED*** : response;
            ***REMOVED***
        ***REMOVED***;

        // Shared variables:
        that.element = el;
        that.el = $(el***REMOVED***;
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = [];
        that.onChangeInterval = null;
        that.onChange = null;
        that.ignoreValueChange = false;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.options = $.extend({***REMOVED***, defaults, options***REMOVED***;
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
    ***REMOVED***;

        // Initialize and set options:
        that.initialize(***REMOVED***;
        that.setOptions(options***REMOVED***;
***REMOVED***

    Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.formatResult = function (suggestion, currentValue***REMOVED*** {
        var reEscape = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', '***REMOVED***', '[', ']', '{', '***REMOVED***', '\\'].join('|\\'***REMOVED*** + '***REMOVED***', 'g'***REMOVED***,
            pattern = '(' + currentValue.replace(reEscape, '\\$1'***REMOVED*** + '***REMOVED***';

        return suggestion.value.replace(new RegExp(pattern, 'gi'***REMOVED***, '<strong>$1<\/strong>'***REMOVED***;
***REMOVED***;

    Autocomplete.prototype = {

        killerFn: null,

        initialize: function (***REMOVED*** {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off'***REMOVED***;

            that.killerFn = function (e***REMOVED*** {
                if ($(e.target***REMOVED***.closest('.' + that.options.containerClass***REMOVED***.length === 0***REMOVED*** {
                    that.killSuggestions(***REMOVED***;
                    that.disableKillerFn(***REMOVED***;
            ***REMOVED***
        ***REMOVED***;

            // Determine suggestions width:
            if (!options.width || options.width === 'auto'***REMOVED*** {
                options.width = that.el.outerWidth(***REMOVED***;
        ***REMOVED***

            that.suggestionsContainer = Autocomplete.utils.createNode('<div class="' + options.containerClass + '" style="position: absolute; display: none;"></div>'***REMOVED***;

            container = $(that.suggestionsContainer***REMOVED***;

            container.appendTo(options.appendTo***REMOVED***.width(options.width***REMOVED***;

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function (***REMOVED*** {
                that.activate($(this***REMOVED***.data('index'***REMOVED******REMOVED***;
        ***REMOVED******REMOVED***;

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function (***REMOVED*** {
                that.selectedIndex = -1;
                container.children('.' + selected***REMOVED***.removeClass(selected***REMOVED***;
        ***REMOVED******REMOVED***;

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function (***REMOVED*** {
                that.select($(this***REMOVED***.data('index'***REMOVED***, false***REMOVED***;
        ***REMOVED******REMOVED***;

            that.fixPosition(***REMOVED***;

            // Opera does not like keydown:
            if (window.opera***REMOVED*** {
                that.el.on('keypress.autocomplete', function (e***REMOVED*** { that.onKeyPress(e***REMOVED***; ***REMOVED******REMOVED***;
        ***REMOVED*** else {
                that.el.on('keydown.autocomplete', function (e***REMOVED*** { that.onKeyPress(e***REMOVED***; ***REMOVED******REMOVED***;
        ***REMOVED***

            that.el.on('keyup.autocomplete', function (e***REMOVED*** { that.onKeyUp(e***REMOVED***; ***REMOVED******REMOVED***;
            that.el.on('blur.autocomplete', function (***REMOVED*** { that.onBlur(***REMOVED***; ***REMOVED******REMOVED***;
            that.el.on('focus.autocomplete', function (***REMOVED*** { that.fixPosition(***REMOVED***; ***REMOVED******REMOVED***;
    ***REMOVED***,

        onBlur: function (***REMOVED*** {
            this.enableKillerFn(***REMOVED***;
    ***REMOVED***,

        setOptions: function (suppliedOptions***REMOVED*** {
            var that = this,
                options = that.options;

            utils.extend(options, suppliedOptions***REMOVED***;

            that.isLocal = $.isArray(options.lookup***REMOVED***;

            if (that.isLocal***REMOVED*** {
                options.lookup = that.verifySuggestionsFormat(options.lookup***REMOVED***;
        ***REMOVED***

            // Adjust height, width and z-index:
            $(that.suggestionsContainer***REMOVED***.css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
        ***REMOVED******REMOVED***;
    ***REMOVED***,

        clearCache: function (***REMOVED*** {
            this.cachedResponse = [];
            this.badQueries = [];
    ***REMOVED***,

        clear: function (***REMOVED*** {
            this.clearCache(***REMOVED***;
            this.currentValue = null;
            this.suggestions = [];
    ***REMOVED***,

        disable: function (***REMOVED*** {
            this.disabled = true;
    ***REMOVED***,

        enable: function (***REMOVED*** {
            this.disabled = false;
    ***REMOVED***,

        fixPosition: function (***REMOVED*** {
            var that = this,
                offset;

            // Don't adjsut position if custom container has been specified:
            if (that.options.appendTo !== 'body'***REMOVED*** {
                return;
        ***REMOVED***

            offset = that.el.offset(***REMOVED***;

            $(that.suggestionsContainer***REMOVED***.css({
                top: (offset.top + that.el.outerHeight(***REMOVED******REMOVED*** + 'px',
                left: offset.left + 'px'
        ***REMOVED******REMOVED***;
    ***REMOVED***,

        enableKillerFn: function (***REMOVED*** {
            var that = this;
            $(document***REMOVED***.on('click.autocomplete', that.killerFn***REMOVED***;
    ***REMOVED***,

        disableKillerFn: function (***REMOVED*** {
            var that = this;
            $(document***REMOVED***.off('click.autocomplete', that.killerFn***REMOVED***;
    ***REMOVED***,

        killSuggestions: function (***REMOVED*** {
            var that = this;
            that.stopKillSuggestions(***REMOVED***;
            that.intervalId = window.setInterval(function (***REMOVED*** {
                that.hide(***REMOVED***;
                that.stopKillSuggestions(***REMOVED***;
        ***REMOVED***, 300***REMOVED***;
    ***REMOVED***,

        stopKillSuggestions: function (***REMOVED*** {
            window.clearInterval(this.intervalId***REMOVED***;
    ***REMOVED***,

        onKeyPress: function (e***REMOVED*** {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.keyCode === keys.DOWN && that.currentValue***REMOVED*** {
                that.suggest(***REMOVED***;
                return;
        ***REMOVED***

            if (that.disabled || !that.visible***REMOVED*** {
                return;
        ***REMOVED***

            switch (e.keyCode***REMOVED*** {
                case keys.ESC:
                    that.el.val(that.currentValue***REMOVED***;
                    that.hide(***REMOVED***;
                    break;
                case keys.TAB:
                case keys.RETURN:
                    if (that.selectedIndex === -1***REMOVED*** {
                        that.hide(***REMOVED***;
                        return;
                ***REMOVED***
                    that.select(that.selectedIndex, e.keyCode === keys.RETURN***REMOVED***;
                    if (e.keyCode === keys.TAB && this.options.tabDisabled === false***REMOVED*** {
                        return;
                ***REMOVED***
                    break;
                case keys.UP:
                    that.moveUp(***REMOVED***;
                    break;
                case keys.DOWN:
                    that.moveDown(***REMOVED***;
                    break;
                default:
                    return;
        ***REMOVED***

            // Cancel event if function did not return:
            e.stopImmediatePropagation(***REMOVED***;
            e.preventDefault(***REMOVED***;
    ***REMOVED***,

        onKeyUp: function (e***REMOVED*** {
            var that = this;

            if (that.disabled***REMOVED*** {
                return;
        ***REMOVED***

            switch (e.keyCode***REMOVED*** {
                case keys.UP:
                case keys.DOWN:
                    return;
        ***REMOVED***

            clearInterval(that.onChangeInterval***REMOVED***;

            if (that.currentValue !== that.el.val(***REMOVED******REMOVED*** {
                if (that.options.deferRequestBy > 0***REMOVED*** {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeInterval = setInterval(function (***REMOVED*** {
                        that.onValueChange(***REMOVED***;
                ***REMOVED***, that.options.deferRequestBy***REMOVED***;
            ***REMOVED*** else {
                    that.onValueChange(***REMOVED***;
            ***REMOVED***
        ***REMOVED***
    ***REMOVED***,

        onValueChange: function (***REMOVED*** {
            var that = this,
                q;

            clearInterval(that.onChangeInterval***REMOVED***;
            that.currentValue = that.element.value;

            q = that.getQuery(that.currentValue***REMOVED***;
            that.selectedIndex = -1;

            if (that.ignoreValueChange***REMOVED*** {
                that.ignoreValueChange = false;
                return;
        ***REMOVED***

            if (q.length < that.options.minChars***REMOVED*** {
                that.hide(***REMOVED***;
        ***REMOVED*** else {
                that.getSuggestions(q***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        getQuery: function (value***REMOVED*** {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter***REMOVED*** {
                return $.trim(value***REMOVED***;
        ***REMOVED***
            parts = value.split(delimiter***REMOVED***;
            return $.trim(parts[parts.length - 1]***REMOVED***;
    ***REMOVED***,

        getSuggestionsLocal: function (query***REMOVED*** {
            var that = this,
                queryLowerCase = query.toLowerCase(***REMOVED***,
                filter = that.options.lookupFilter;

            return {
                suggestions: $.grep(that.options.lookup, function (suggestion***REMOVED*** {
                    return filter(suggestion, query, queryLowerCase***REMOVED***;
            ***REMOVED******REMOVED***
        ***REMOVED***;
    ***REMOVED***,

        getSuggestions: function (q***REMOVED*** {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl;

            response = that.isLocal ? that.getSuggestionsLocal(q***REMOVED*** : that.cachedResponse[q];

            if (response && $.isArray(response.suggestions***REMOVED******REMOVED*** {
                that.suggestions = response.suggestions;
                that.suggest(***REMOVED***;
        ***REMOVED*** else if (!that.isBadQuery(q***REMOVED******REMOVED*** {
                options.params[options.paramName] = q;
                if (options.onSearchStart.call(that.element, options.params***REMOVED*** === false***REMOVED*** {
                    return;
            ***REMOVED***
                if ($.isFunction(options.serviceUrl***REMOVED******REMOVED*** {
                    serviceUrl = options.serviceUrl.call(that.element, q***REMOVED***;
            ***REMOVED***
                $.ajax({
                    url: serviceUrl,
                    data: options.ignoreParams ? null : options.params,
                    type: options.type,
                    dataType: options.dataType
            ***REMOVED******REMOVED***.done(function (data***REMOVED*** {
                    that.processResponse(data, q***REMOVED***;
                    options.onSearchComplete.call(that.element, q***REMOVED***;
            ***REMOVED******REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        isBadQuery: function (q***REMOVED*** {
            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--***REMOVED*** {
                if (q.indexOf(badQueries[i]***REMOVED*** === 0***REMOVED*** {
                    return true;
            ***REMOVED***
        ***REMOVED***

            return false;
    ***REMOVED***,

        hide: function (***REMOVED*** {
            var that = this;
            that.visible = false;
            that.selectedIndex = -1;
            $(that.suggestionsContainer***REMOVED***.hide(***REMOVED***;
    ***REMOVED***,

        suggest: function (***REMOVED*** {
            if (this.suggestions.length === 0***REMOVED*** {
                this.hide(***REMOVED***;
                return;
        ***REMOVED***

            var that = this,
                formatResult = that.options.formatResult,
                value = that.getQuery(that.currentValue***REMOVED***,
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer***REMOVED***,
                html = '';

            // Build suggestions inner HTML:
            $.each(that.suggestions, function (i, suggestion***REMOVED*** {
                html += '<div class="' + className + '" data-index="' + i + '">' + formatResult(suggestion, value***REMOVED*** + '</div>';
        ***REMOVED******REMOVED***;

            container.html(html***REMOVED***.show(***REMOVED***;
            that.visible = true;

            // Select first value by default:
            if (that.options.autoSelectFirst***REMOVED*** {
                that.selectedIndex = 0;
                container.children(***REMOVED***.first(***REMOVED***.addClass(classSelected***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        verifySuggestionsFormat: function (suggestions***REMOVED*** {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string'***REMOVED*** {
                return $.map(suggestions, function (value***REMOVED*** {
                    return { value: value, data: null ***REMOVED***;
            ***REMOVED******REMOVED***;
        ***REMOVED***

            return suggestions;
    ***REMOVED***,

        processResponse: function (response, originalQuery***REMOVED*** {
            var that = this,
                options = that.options,
                result = options.transformResult(response, originalQuery***REMOVED***;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions***REMOVED***;

            // Cache results if cache is not disabled:
            if (!options.noCache***REMOVED*** {
                that.cachedResponse[result[options.paramName]] = result;
                if (result.suggestions.length === 0***REMOVED*** {
                    that.badQueries.push(result[options.paramName]***REMOVED***;
            ***REMOVED***
        ***REMOVED***

            // Display suggestions only if returned query matches current value:
            if (originalQuery === that.getQuery(that.currentValue***REMOVED******REMOVED*** {
                that.suggestions = result.suggestions;
                that.suggest(***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        activate: function (index***REMOVED*** {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer***REMOVED***,
                children = container.children(***REMOVED***;

            container.children('.' + selected***REMOVED***.removeClass(selected***REMOVED***;

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex***REMOVED*** {
                activeItem = children.get(that.selectedIndex***REMOVED***;
                $(activeItem***REMOVED***.addClass(selected***REMOVED***;
                return activeItem;
        ***REMOVED***

            return null;
    ***REMOVED***,

        select: function (i, shouldIgnoreNextValueChange***REMOVED*** {
            var that = this,
                selectedValue = that.suggestions[i];

            if (selectedValue***REMOVED*** {
                that.el.val(selectedValue***REMOVED***;
                that.ignoreValueChange = shouldIgnoreNextValueChange;
                that.hide(***REMOVED***;
                that.onSelect(i***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        moveUp: function (***REMOVED*** {
            var that = this;

            if (that.selectedIndex === -1***REMOVED*** {
                return;
        ***REMOVED***

            if (that.selectedIndex === 0***REMOVED*** {
                $(that.suggestionsContainer***REMOVED***.children(***REMOVED***.first(***REMOVED***.removeClass(that.classes.selected***REMOVED***;
                that.selectedIndex = -1;
                that.el.val(that.currentValue***REMOVED***;
                return;
        ***REMOVED***

            that.adjustScroll(that.selectedIndex - 1***REMOVED***;
    ***REMOVED***,

        moveDown: function (***REMOVED*** {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1***REMOVED******REMOVED*** {
                return;
        ***REMOVED***

            that.adjustScroll(that.selectedIndex + 1***REMOVED***;
    ***REMOVED***,

        adjustScroll: function (index***REMOVED*** {
            var that = this,
                activeItem = that.activate(index***REMOVED***,
                offsetTop,
                upperBound,
                lowerBound,
                heightDelta = 25;

            if (!activeItem***REMOVED*** {
                return;
        ***REMOVED***

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer***REMOVED***.scrollTop(***REMOVED***;
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound***REMOVED*** {
                $(that.suggestionsContainer***REMOVED***.scrollTop(offsetTop***REMOVED***;
        ***REMOVED*** else if (offsetTop > lowerBound***REMOVED*** {
                $(that.suggestionsContainer***REMOVED***.scrollTop(offsetTop - that.options.maxHeight + heightDelta***REMOVED***;
        ***REMOVED***

            that.el.val(that.getValue(that.suggestions[index].value***REMOVED******REMOVED***;
    ***REMOVED***,

        onSelect: function (index***REMOVED*** {
            var that = this,
                onSelectCallback = that.options.onSelect,
                suggestion = that.suggestions[index];

            that.el.val(that.getValue(suggestion.value***REMOVED******REMOVED***;

            if ($.isFunction(onSelectCallback***REMOVED******REMOVED*** {
                onSelectCallback.call(that.element, suggestion***REMOVED***;
        ***REMOVED***
    ***REMOVED***,

        getValue: function (value***REMOVED*** {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter***REMOVED*** {
                return value;
        ***REMOVED***

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter***REMOVED***;

            if (parts.length === 1***REMOVED*** {
                return value;
        ***REMOVED***

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length***REMOVED*** + value;
    ***REMOVED***,

        dispose: function (***REMOVED*** {
            var that = this;
            that.el.off('.autocomplete'***REMOVED***.removeData('autocomplete'***REMOVED***;
            that.disableKillerFn(***REMOVED***;
            $(that.suggestionsContainer***REMOVED***.remove(***REMOVED***;
    ***REMOVED***
***REMOVED***;

    // Create chainable jQuery plugin:
    $.fn.autocomplete = function (options, args***REMOVED*** {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0***REMOVED*** {
            return this.first(***REMOVED***.data(dataKey***REMOVED***;
    ***REMOVED***

        return this.each(function (***REMOVED*** {
            var inputElement = $(this***REMOVED***,
                instance = inputElement.data(dataKey***REMOVED***;

            if (typeof options === 'string'***REMOVED*** {
                if (instance && typeof instance[options] === 'function'***REMOVED*** {
                    instance[options](args***REMOVED***;
            ***REMOVED***
        ***REMOVED*** else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose***REMOVED*** {
                    instance.dispose(***REMOVED***;
            ***REMOVED***
                instance = new Autocomplete(this, options***REMOVED***;
                inputElement.data(dataKey, instance***REMOVED***;
        ***REMOVED***
    ***REMOVED******REMOVED***;
***REMOVED***;
***REMOVED******REMOVED******REMOVED***;
