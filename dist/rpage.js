/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/rpage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/rpage.js":
/*!**********************!*\
  !*** ./src/rpage.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n * A plugin for making Bootstrap's pagination more responsive\n * https://github.com/the-support-group/rpage\n */\n\n(function ($){\n    jQuery.fn.rPage = function () {\n        var $this = $(this);\n        for(var i = 0, max = $this.length; i < max; i++)\n        {\n            new rPage($($this[i]));\n        }\n\n        function rPage($container)\n        {\n            this.label = function()\n            {\n                var active_index = this.els.filter(\".pagination__item--current\").index();\n                var rp = this;\n                this.els.each(function(){\n                    if (rp.isNextOrPrevLink($(this)) == false)\n                    {\n                        $(this).addClass(\"pagination__item--\" + (Math.abs(active_index - $(this).index())).toString());\n                    }\n                    else\n                    {\n                        if ($(this).index() > active_index)\n                        {\n                            $(this).addClass(\"pagination__item--next\");\n                        }\n                        else\n                        {\n                            $(this).addClass(\"pagination__item--prev\");\n                        }\n                    }\n                });\n            }\n\n            this.makeResponsive = function()\n            {\n                this.reset();\n                var width = this.calculateWidth();\n\n                while (width > this.els.parent().parent().outerWidth() - 10)\n                {\n                    var did_remove = this.removeOne();\n                    if (did_remove == false)\n                    {\n                        break;\n                    }\n                    width = this.calculateWidth();\n                }\n            }\n\n            this.isNextOrPrevLink = function(element)\n            {\n                return (\n                    element.hasClass('pagination__item--prev')\n                    || element.hasClass('pagination__item--next')\n                    || element.text() == \"Prev\"\n                    || element.text() == \"Next\"\n                );\n            }\n\n            this.isRemovable = function(element)\n            {\n                if (this.isNextOrPrevLink(element))\n                {\n                    return false;\n                }\n                var index = this.els.filter(element).index();\n                if (index == 1 || this.isNextOrPrevLink($container.find(\"li\").eq(index + 1)))\n                {\n                    return false;\n                }\n                if (element.text() == \"...\")\n                {\n                    return false;\n                }\n                return true;\n            }\n\n            this.removeOne = function()\n            {\n                var active_index = this.els.filter(\".pagination__item--current\").index();\n                var farthest_index = $container.find(\"li\").length - 1;\n                var next = active_index + 1;\n                var prev = active_index - 1;\n\n                for (var i = farthest_index - 1; i > 0; i--)\n                {\n                    var candidates = this.els.filter(\".pagination__item--\" + i.toString());\n                    var candidate = candidates.filter(function(){\n                        return this.style[\"display\"] != \"none\";\n                    });\n                    if (candidate.length > 0)\n                    {\n                        for (var j = 0; j < candidate.length; j++)\n                        {\n                            var candid_candidate = candidate.eq(j);\n                            if (this.isRemovable(candid_candidate))\n                            {\n                                candid_candidate.css(\"display\", \"none\");\n                                if (this.needsEtcSign(active_index, farthest_index - 1))\n                                {\n                                    this.els.eq(farthest_index - 2).before(\"<li class='pagination__item--more'><span>...</span></li>\");\n                                }\n                                if (this.needsEtcSign(1, active_index))\n                                {\n                                    this.els.eq(1).after(\"<li class='pagination__item--more'><span>...</span></li>\");\n                                }\n                                return true;\n                            }\n                        }\n                    }\n                }\n                return false;\n            }\n\n            this.needsEtcSign = function(el1_index, el2_index)\n            {\n                if (el2_index - el1_index <= 1)\n                {\n                    return false;\n                }\n                else\n                {\n                    var hasEtcSign = false;\n                    var hasHiddenElement = false;\n                    for (var i = el1_index + 1; i < el2_index; i++)\n                    {\n                        var el = $container.find(\"li\").eq(i);\n                        if (el.css(\"display\") == \"none\")\n                        {\n                            hasHiddenElement = true;\n                        }\n                        if (el.text() == \"...\")\n                        {\n                            hasEtcSign = true;\n                        }\n                    }\n                    if (hasHiddenElement == true && hasEtcSign == false)\n                    {\n                        return true;\n                    }\n                }\n                return false;\n            }\n\n            this.reset = function()\n            {\n                for (var i = 0; i < this.els.length; i++)\n                {\n                    this.els.eq(i).css(\"display\", \"inline\");\n                }\n                $container.find(\"li\").filter(\".pagination__item--more\").remove();\n            }\n\n            this.calculateWidth = function()\n            {\n                var width = 0;\n                for (var i = 0; i < $container.find(\"li\").length; i++)\n                {\n                    width += $container.find(\"li\").eq(i).children(\"a\").eq(0).outerWidth();\n                    width += $container.find(\"li\").eq(i).children(\"span\").eq(0).outerWidth();\n                }\n                return width;\n            }\n\n            this.els = $container.find(\"li\");\n            this.label();\n            this.makeResponsive();\n\n            var resize_timer;\n\n            $(window).resize(\n                $.proxy(function()\n                {\n                    clearTimeout(resize_timer);\n                    resize_timer = setTimeout($.proxy(function(){this.makeResponsive()}, this), 100);\n                }, this)\n            );\n        }\n    };\n}(jQuery));\n\n\n//# sourceURL=webpack:///./src/rpage.js?");

/***/ })

/******/ });