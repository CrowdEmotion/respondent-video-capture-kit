var WebProducer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	
	var WebProducer = function (options) {
	  if (!options || !options.id) {
	    return alert('You must provide an id for the web producer');
	  }
	  this.id = options.id;
	  this.width = options.width || 320;
	  this.height = options.height || 240;
	  this.el = null;
	  this.trace = options.trace;
	  this.streamName = null;
	  WebProducer[this.id] = this; 
	  var path = options.path || '';
	  var style = options.style || "display:block;text-align:left;";
	  this.createElement(this.id, this.width, this.height, path, style);
	  this.port = options.port || '80';
	  // these method calls are forwarded directly to the flash component
	  this.methods = [
	      'setCredentials', 'getCredentials',
	      'setUrl', 'getUrl',
	      'setStreamWidth', 'getStreamWidth',
	      'setStreamHeight', 'getStreamHeight',
	      'setStreamFPS', 'getStreamFPS',
	      'setStreamQuality', 'getStreamQuality',
	      'setStreamBandwidth', 'getStreamBandwidth',
	      'connect', 'disconnect',
	      'publish', 'unpublish',
	      'countCameras', 'isCameraMuted',
	      'setMirroredPreview', 'getMirroredPreview',
	      'setAudioStreamActive', 'getAudioStreamActive',
	      'setStreamBufferTime', 'getStreamBufferTime',
	      'getStreamTime', 'getStreamBufferLength',
	      'getStreamInfoDroppedFrames', 'getStreamInfoCurrentBytesPerSecond',
	      'getStreamInfoVideoLossRate', 'getStreamInfoString',
	      'getStreamCurrentFPS', 'getCameraCurrentFPS'
	      ];
	
	  this.flash_methods_prepare();
	
	  if (options.remote_logger_name) {
	    this.remoteLoggerActivate(options.remote_logger_name);
	    this.remoteLoggerLog('jsMethodCalled', 'constructor', [options]);
	    if (window.navigator && window.navigator.userAgent) {
	      this.remoteLoggerLog('userAgent', 'userAgent', navigator.userAgent, "");
	      this.remoteLoggerLog('platform', 'platform', [], __webpack_require__(2));
	    }
	  }
	};
	
	/* this shoud be deprecated and we should use info/trace events instead */
	WebProducer.log = function (id) {
	  if (console && console.log) {
	    var producer = WebProducer[id];
	    if (producer.trace) {
	      console.log.apply(console, arguments);
	    }
	  }
	};
	
	WebProducer.js_event = function (producerId, eventName, arg1, arg2) {
	  var producer = WebProducer[producerId];
	  if (producer.trace) {
	    WebProducer.log(producerId, eventName, arg1, arg2);
	  }
	  producer.fire(eventName, arg1, arg2);
	
	  // log all the events
	  producer.remoteLoggerLog('flashEventTriggered', eventName, [arg1, arg2]);
	};
	
	WebProducer.extend = function (source) {
	  for (var prop in source) {
	    WebProducer.prototype[prop] = source[prop];
	  }
	};
	
	
	WebProducer.prototype = {
	  flash_methods_prepare: function () {
	    // Forward known methods to flash
	    var self = this;
	    this.methods.forEach(function (method) {
	      if (self[method]) { return; } // we don't overwrite existing definitions
	      self[method] = function () {
	        var args = Array.prototype.slice.call(arguments);
	        return self.flash_method_call(method, args);
	      };
	    });
	  },
	
	  flash_method_call: function (method, args) {
	    var self = this;
	    var value;
	    try {
	      value = self.el[method].apply(self.el, args);
	      this.remoteLoggerLog('flashMethodCalled', method, args, value);
	    } catch (e) {
	      console.log('ERROR ' , e, ' on method ', method,' with ', this);
	      this.remoteLoggerLog('flashMethodError', method, args, e.message || e);
	    }
	    return value;
	  },
	  
	  createElement: function (id, width, height, path, style) {
	    var self = this;
	    var swfVersionStr = "11.4.0";
	    var xiSwfUrlStr = "playerProductInstall.swf";
	    var flashvars = { id: id };
	    var params = {};
	    params.quality = "high";
	    params.bgcolor = "#ffffff";
	    params.allowscriptaccess = "always";
	    params.allowfullscreen = "true";
	    var attributes = {};
	    attributes.align = "left";
	    var check_already_ready = function() { self.check_already_ready(); };
	    this.on('ready', function () {
	      self.on_ready.apply(self, arguments);
	    });
	    swfobject.embedSWF(
	        path + "producer.swf", id,
	        width, height,
	        swfVersionStr, xiSwfUrlStr, 
	        flashvars, params, attributes, check_already_ready);
	    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
	    swfobject.createCSS("#"+id, style);
	  },
	
	  check_already_ready: function () {
	    var self = this;
	    try {
	      var el = document.getElementById(self.id);
	      if (el && el.isReady()) {
	        self.fire('ready');
	      }
	    } catch (e) {}
	  },
	
	  get_http_base_url: function () {
	    var port = this.port;
	    var protocol = "http://";
	    var usingHTTPS = window.location.href.indexOf('https') === 0;
	
	    if (usingHTTPS) {
	      port = 443;
	      protocol = "https://";
	    }
	
	    var host = this.getUrl().split('/')[2].split(':')[0];
	    var ret = [protocol, host, ':', port, '/'].join('');
	    return ret;
	  },
	
	  getStats: function () {
	    // srr http://help.adobe.com/it_IT/FlashPlatform/reference/actionscript/3/flash/net/NetStreamInfo.html
	    var stats = {
	      'bytesPerSecond': this.getStreamInfoCurrentBytesPerSecond(),
	      'droppedFrames': this.getStreamInfoDroppedFrames(),
	      'bufferLength': this.getStreamBufferLength(),
	      'videoLossRate': this.getStreamInfoVideoLossRate(),
	      'currentFPS': this.getStreamCurrentFPS(),
	      'cameraCurrentFPS': this.getCameraCurrentFPS()
	    };
	    return stats;
	  },
	
	  _CORS_support: function () {
	    if (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()) {
	      return true;
	    }
	    if (typeof window.XDomainRequest !== "undefined"){
	      return true;
	    }
	    return false;
	  },
	
	  on_ready: function () {
	    this.el = document.getElementById(this.id);
	    this.flash = this.el;
	    var self = this;
	
	    this.on('publish', function (streamName) {
	      streamName = streamName.split('?')[0];
	      self.on_publish(streamName);
	    });
	    if (self.on_unpublish_check_content) {
	      this.on('unpublish', function (streamName) {
	        streamName = streamName.split('?')[0];
	        self.on_unpublish_check_content(streamName);
	      });
	    }
	  },
	
	  on_publish: function (streamName) {
	    this.publishStartTime = (new Date()).getTime();
	    this.streamName = streamName;
	  }
	};
	
	
	var ContentsMixin = __webpack_require__(4);
	WebProducer.extend(ContentsMixin);
	
	
	var TimedMetadataMixin = __webpack_require__(6);
	WebProducer.extend(TimedMetadataMixin);
	
	
	var JobsMixin = __webpack_require__(7);
	WebProducer.extend(JobsMixin);
	
	
	var LoadBalancingMixin = {
	  // DEPRECATED IN FAVOUR OF Urls class
	  // Load balancing steps, ON CONNECT
	  // 1 - start from url_rtmp_original
	  //    rtmp://mediabox.crowdemotion.co.uk:1935/something
	  // 2 - conver it to http url to get instance infos
	  //    http(s)://mediabox.crowdemotion.co.uk/hub/info
	  // 3 - receive public ip and ipPrivate of the instance
	  // 4 - change original rtmp url host to the public ip and connect
	  // 5 - change http url to bouncer/[ipPrivate]
	
	  url_rtmp_original: null,
	  url_http_api: null,
	
	  url_get_host: function (url) {
	    var tmp = url.split('://')[1];
	    tmp = tmp.split('/')[0];
	    return tmp.split(':')[0];
	  },
	  
	  setUrl: function (url) {
	    this.url_rtmp_original = url;
	  },
	
	  hub_info_get: function (cb) {
	    // we poll the server to until the transcoded mp4 is ready, then cb
	    var protocol = this.current_protocol();
	    var host = this.url_get_host(this.url_rtmp_original);
	    var url = protocol + "://" + host + "/api/info/jsonp";
	    var dfr = jQuery.ajax({
	      url: url,
	      dataType: 'jsonp'
	    });
	    dfr.done(function (result) { cb(result); });
	    dfr.fail(function () { cb({}); });
	    return dfr;
	  },
	
	  current_protocol: function () {
	    var usingHTTPS = window.location.href.indexOf('https') === 0;
	    if (usingHTTPS) { return 'https'; }
	    return 'http';
	  },
	  
	  connect: function () {
	    var self = this;
	    this.hub_info_get(function () {
	      self.connect_on_hub_info.apply(self, arguments);
	    });
	  },
	
	  connect_on_hub_info: function (info) {
	    var ip_private = info.ipPrivate;
	    this.url_http_api = this.current_protocol() +
	      '://' + this.url_get_host(this.url_rtmp_original) +
	      '/bounce/' + ip_private + '/';
	    this.fire('url-changed');
	    this.remoteLoggerLog('hubInfo', 'currentHubChanged', {}, info);
	
	    var ip_public = info.ip;
	    var host_original = this.url_get_host(this.url_rtmp_original);
	    var url_new = this.url_rtmp_original.replace(host_original, ip_public);
	
	    this.flash_method_call('setUrl', [url_new]);
	    this.flash_method_call('connect', []);
	  },
	
	  get_http_base_url: function () {
	    // overrides original impl
	    return this.url_http_api;
	  }
	  
	};
	
	WebProducer.extend(LoadBalancingMixin);
	
	
	var CamerafixMixin = __webpack_require__(8);
	WebProducer.extend(CamerafixMixin);
	
	var LoggingMixin = __webpack_require__(9);
	WebProducer.extend(LoggingMixin);
	
	
	var EventEmitterMixin = __webpack_require__(11);
	WebProducer.extend(EventEmitterMixin);
	
	
	// Append mixins so that extending libs can reference them
	
	WebProducer.mixins = {
	  ContentsMixin: ContentsMixin,
	  TimedMetadataMixin: TimedMetadataMixin,
	  JobsMixin: JobsMixin,
	  LoadBalancingMixin: LoadBalancingMixin,
	  CamerafixMixin: CamerafixMixin,
	  LoggingMixin: LoggingMixin,
	  EventEmitterMixin: EventEmitterMixin
	};
	
	
	// Polyfill for Array.prototype.forEach for IE 8 
	// as seen at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	if (!Array.prototype.forEach) {
	  Array.prototype.forEach = function(callback, thisArg) {
	    var T, k;
	    if (this == null) {
	      throw new TypeError(' this is null or not defined');
	    }
	    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
	    var O = Object(this);
	    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;
	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (typeof callback !== "function") {
	      throw new TypeError(callback + ' is not a function');
	    }
	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    if (arguments.length > 1) {
	      T = thisArg;
	    }
	    // 6. Let k be 0
	    k = 0;
	    // 7. Repeat, while k < len
	    while (k < len) {
	      var kValue;
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {
	        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
	        kValue = O[k];
	        // ii. Call the Call internal method of callback with T as the this value and
	        // argument list containing kValue, k, and O.
	        callback.call(T, kValue, k, O);
	      }
	      // d. Increase k by 1.
	      k++;
	    }
	    // 8. return undefined
	  };
	}
	
	// Polyfill for Array.prototype.indexOf for IE 8 
	// as seen at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {
	    var k;
	    // 1. Let O be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this == null) {
	      throw new TypeError('"this" is null or not defined');
	    }
	    var O = Object(this);
	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;
	    // 4. If len is 0, return -1.
	    if (len === 0) {
	      return -1;
	    }
	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = +fromIndex || 0;
	    if (Math.abs(n) === Infinity) {
	      n = 0;
	    }
	    // 6. If n >= len, return -1.
	    if (n >= len) {
	      return -1;
	    }
	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of O with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in O && O[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}
	
	module.exports = WebProducer;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*!
	 * Platform.js v1.3.0 <http://mths.be/platform>
	 * Copyright 2010-2014 John-David Dalton <http://allyoucanleet.com/>
	 * Available under MIT license <http://mths.be/mit>
	 */
	;(function() {
	  'use strict';
	
	  /** Used to determine if values are of the language type `Object` */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };
	
	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;
	
	  /** Backup possible global object */
	  var oldRoot = root;
	
	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports;
	
	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	
	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  /**
	   * Used as the maximum length of an array-like object.
	   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
	   * for more details.
	   */
	  var maxSafeInteger = Math.pow(2, 53) - 1;
	
	  /** Opera regexp */
	  var reOpera = /\bOpera/;
	
	  /** Possible global object */
	  var thisBinding = this;
	
	  /** Used for native method references */
	  var objectProto = Object.prototype;
	
	  /** Used to check for own properties of an object */
	  var hasOwnProperty = objectProto.hasOwnProperty;
	
	  /** Used to resolve the internal `[[Class]]` of values */
	  var toString = objectProto.toString;
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Capitalizes a string value.
	   *
	   * @private
	   * @param {string} string The string to capitalize.
	   * @returns {string} The capitalized string.
	   */
	  function capitalize(string) {
	    string = String(string);
	    return string.charAt(0).toUpperCase() + string.slice(1);
	  }
	
	  /**
	   * A utility function to clean up the OS name.
	   *
	   * @private
	   * @param {string} os The OS name to clean up.
	   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
	   * @param {string} [label] A label for the OS.
	   */
	  function cleanupOS(os, pattern, label) {
	    // platform tokens defined at
	    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
	    var data = {
	      '6.4':  '10',
	      '6.3':  '8.1',
	      '6.2':  '8',
	      '6.1':  'Server 2008 R2 / 7',
	      '6.0':  'Server 2008 / Vista',
	      '5.2':  'Server 2003 / XP 64-bit',
	      '5.1':  'XP',
	      '5.01': '2000 SP1',
	      '5.0':  '2000',
	      '4.0':  'NT',
	      '4.90': 'ME'
	    };
	    // detect Windows version from platform tokens
	    if (pattern && label && /^Win/i.test(os) &&
	        (data = data[0/*Opera 9.25 fix*/, /[\d.]+$/.exec(os)])) {
	      os = 'Windows ' + data;
	    }
	    // correct character case and cleanup
	    os = String(os);
	
	    if (pattern && label) {
	      os = os.replace(RegExp(pattern, 'i'), label);
	    }
	
	    os = format(
	      os.replace(/ ce$/i, ' CE')
	        .replace(/\bhpw/i, 'web')
	        .replace(/\bMacintosh\b/, 'Mac OS')
	        .replace(/_PowerPC\b/i, ' OS')
	        .replace(/\b(OS X) [^ \d]+/i, '$1')
	        .replace(/\bMac (OS X)\b/, '$1')
	        .replace(/\/(\d)/, ' $1')
	        .replace(/_/g, '.')
	        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
	        .replace(/\bx86\.64\b/gi, 'x86_64')
	        .replace(/\b(Windows Phone) OS\b/, '$1')
	        .split(' on ')[0]
	    );
	
	    return os;
	  }
	
	  /**
	   * An iteration utility for arrays and objects.
	   *
	   * @private
	   * @param {Array|Object} object The object to iterate over.
	   * @param {Function} callback The function called per iteration.
	   */
	  function each(object, callback) {
	    var index = -1,
	        length = object ? object.length : 0;
	
	    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
	      while (++index < length) {
	        callback(object[index], index, object);
	      }
	    } else {
	      forOwn(object, callback);
	    }
	  }
	
	  /**
	   * Trim and conditionally capitalize string values.
	   *
	   * @private
	   * @param {string} string The string to format.
	   * @returns {string} The formatted string.
	   */
	  function format(string) {
	    string = trim(string);
	    return /^(?:webOS|i(?:OS|P))/.test(string)
	      ? string
	      : capitalize(string);
	  }
	
	  /**
	   * Iterates over an object's own properties, executing the `callback` for each.
	   *
	   * @private
	   * @param {Object} object The object to iterate over.
	   * @param {Function} callback The function executed per own property.
	   */
	  function forOwn(object, callback) {
	    for (var key in object) {
	      if (hasOwnProperty.call(object, key)) {
	        callback(object[key], key, object);
	      }
	    }
	  }
	
	  /**
	   * Gets the internal `[[Class]]` of a value.
	   *
	   * @private
	   * @param {*} value The value.
	   * @returns {string} The `[[Class]]`.
	   */
	  function getClassOf(value) {
	    return value == null
	      ? capitalize(value)
	      : toString.call(value).slice(8, -1);
	  }
	
	  /**
	   * Host objects can return type values that are different from their actual
	   * data type. The objects we are concerned with usually return non-primitive
	   * types of "object", "function", or "unknown".
	   *
	   * @private
	   * @param {*} object The owner of the property.
	   * @param {string} property The property to check.
	   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
	   */
	  function isHostType(object, property) {
	    var type = object != null ? typeof object[property] : 'number';
	    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
	      (type == 'object' ? !!object[property] : true);
	  }
	
	  /**
	   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
	   *
	   * @private
	   * @param {string} string The string to qualify.
	   * @returns {string} The qualified string.
	   */
	  function qualify(string) {
	    return String(string).replace(/([ -])(?!$)/g, '$1?');
	  }
	
	  /**
	   * A bare-bones `Array#reduce` like utility function.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} callback The function called per iteration.
	   * @returns {*} The accumulated result.
	   */
	  function reduce(array, callback) {
	    var accumulator = null;
	    each(array, function(value, index) {
	      accumulator = callback(accumulator, value, index, array);
	    });
	    return accumulator;
	  }
	
	  /**
	   * Removes leading and trailing whitespace from a string.
	   *
	   * @private
	   * @param {string} string The string to trim.
	   * @returns {string} The trimmed string.
	   */
	  function trim(string) {
	    return String(string).replace(/^ +| +$/g, '');
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a new platform object.
	   *
	   * @memberOf platform
	   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
	   *  context object.
	   * @returns {Object} A platform object.
	   */
	  function parse(ua) {
	
	    /** The environment context object */
	    var context = root;
	
	    /** Used to flag when a custom context is provided */
	    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';
	
	    // juggle arguments
	    if (isCustomContext) {
	      context = ua;
	      ua = null;
	    }
	
	    /** Browser navigator object */
	    var nav = context.navigator || {};
	
	    /** Browser user agent string */
	    var userAgent = nav.userAgent || '';
	
	    ua || (ua = userAgent);
	
	    /** Used to flag when `thisBinding` is the [ModuleScope] */
	    var isModuleScope = isCustomContext || thisBinding == oldRoot;
	
	    /** Used to detect if browser is like Chrome */
	    var likeChrome = isCustomContext
	      ? !!nav.likeChrome
	      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
	
	    /** Internal `[[Class]]` value shortcuts */
	    var objectClass = 'Object',
	        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
	        enviroClass = isCustomContext ? objectClass : 'Environment',
	        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
	        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';
	
	    /** Detect Java environment */
	    var java = /\bJava/.test(javaClass) && context.java;
	
	    /** Detect Rhino */
	    var rhino = java && getClassOf(context.environment) == enviroClass;
	
	    /** A character to represent alpha */
	    var alpha = java ? 'a' : '\u03b1';
	
	    /** A character to represent beta */
	    var beta = java ? 'b' : '\u03b2';
	
	    /** Browser document object */
	    var doc = context.document || {};
	
	    /**
	     * Detect Opera browser (Presto-based)
	     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
	     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
	     */
	    var opera = context.operamini || context.opera;
	
	    /** Opera `[[Class]]` */
	    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
	      ? operaClass
	      : (opera = null);
	
	    /*------------------------------------------------------------------------*/
	
	    /** Temporary variable used over the script's lifetime */
	    var data;
	
	    /** The CPU architecture */
	    var arch = ua;
	
	    /** Platform description array */
	    var description = [];
	
	    /** Platform alpha/beta indicator */
	    var prerelease = null;
	
	    /** A flag to indicate that environment features should be used to resolve the platform */
	    var useFeatures = ua == userAgent;
	
	    /** The browser/environment version */
	    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();
	
	    /** A flag to indicate if the OS ends with "/ Version" */
	    var isSpecialCasedOS;
	
	    /* Detectable layout engines (order is important) */
	    var layout = getLayout([
	      'Trident',
	      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
	      'iCab',
	      'Presto',
	      'NetFront',
	      'Tasman',
	      'KHTML',
	      'Gecko'
	    ]);
	
	    /* Detectable browser names (order is important) */
	    var name = getName([
	      'Adobe AIR',
	      'Arora',
	      'Avant Browser',
	      'Breach',
	      'Camino',
	      'Epiphany',
	      'Fennec',
	      'Flock',
	      'Galeon',
	      'GreenBrowser',
	      'iCab',
	      'Iceweasel',
	      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
	      'K-Meleon',
	      'Konqueror',
	      'Lunascape',
	      'Maxthon',
	      'Midori',
	      'Nook Browser',
	      'PhantomJS',
	      'Raven',
	      'Rekonq',
	      'RockMelt',
	      'SeaMonkey',
	      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Sleipnir',
	      'SlimBrowser',
	      'Sunrise',
	      'Swiftfox',
	      'WebPositive',
	      'Opera Mini',
	      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
	      'Opera',
	      { 'label': 'Opera', 'pattern': 'OPR' },
	      'Chrome',
	      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
	      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
	      { 'label': 'IE', 'pattern': 'IEMobile' },
	      { 'label': 'IE', 'pattern': 'MSIE' },
	      'Safari'
	    ]);
	
	    /* Detectable products (order is important) */
	    var product = getProduct([
	      { 'label': 'BlackBerry', 'pattern': 'BB10' },
	      'BlackBerry',
	      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
	      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
	      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
	      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
	      'Google TV',
	      'Lumia',
	      'iPad',
	      'iPod',
	      'iPhone',
	      'Kindle',
	      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
	      'Nook',
	      'PlayBook',
	      'PlayStation 4',
	      'PlayStation 3',
	      'PlayStation Vita',
	      'TouchPad',
	      'Transformer',
	      { 'label': 'Wii U', 'pattern': 'WiiU' },
	      'Wii',
	      'Xbox One',
	      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
	      'Xoom'
	    ]);
	
	    /* Detectable manufacturers */
	    var manufacturer = getManufacturer({
	      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
	      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
	      'Asus': { 'Transformer': 1 },
	      'Barnes & Noble': { 'Nook': 1 },
	      'BlackBerry': { 'PlayBook': 1 },
	      'Google': { 'Google TV': 1 },
	      'HP': { 'TouchPad': 1 },
	      'HTC': {},
	      'LG': {},
	      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
	      'Motorola': { 'Xoom': 1 },
	      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
	      'Nokia': { 'Lumia': 1 },
	      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
	      'Sony': { 'PlayStation 4': 1, 'PlayStation 3': 1, 'PlayStation Vita': 1 }
	    });
	
	    /* Detectable OSes (order is important) */
	    var os = getOS([
	      'Windows Phone ',
	      'Android',
	      'CentOS',
	      'Debian',
	      'Fedora',
	      'FreeBSD',
	      'Gentoo',
	      'Haiku',
	      'Kubuntu',
	      'Linux Mint',
	      'Red Hat',
	      'SuSE',
	      'Ubuntu',
	      'Xubuntu',
	      'Cygwin',
	      'Symbian OS',
	      'hpwOS',
	      'webOS ',
	      'webOS',
	      'Tablet OS',
	      'Linux',
	      'Mac OS X',
	      'Macintosh',
	      'Mac',
	      'Windows 98;',
	      'Windows '
	    ]);
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Picks the layout engine from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected layout engine.
	     */
	    function getLayout(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }
	
	    /**
	     * Picks the manufacturer from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An object of guesses.
	     * @returns {null|string} The detected manufacturer.
	     */
	    function getManufacturer(guesses) {
	      return reduce(guesses, function(result, value, key) {
	        // lookup the manufacturer by product or scan the UA for the manufacturer
	        return result || (
	          value[product] ||
	          value[0/*Opera 9.25 fix*/, /^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
	          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
	        ) && key;
	      });
	    }
	
	    /**
	     * Picks the browser name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected browser name.
	     */
	    function getName(guesses) {
	      return reduce(guesses, function(result, guess) {
	        return result || RegExp('\\b' + (
	          guess.pattern || qualify(guess)
	        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
	      });
	    }
	
	    /**
	     * Picks the OS name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected OS name.
	     */
	    function getOS(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
	            )) {
	          result = cleanupOS(result, pattern, guess.label || guess);
	        }
	        return result;
	      });
	    }
	
	    /**
	     * Picks the product name from an array of guesses.
	     *
	     * @private
	     * @param {Array} guesses An array of guesses.
	     * @returns {null|string} The detected product name.
	     */
	    function getProduct(guesses) {
	      return reduce(guesses, function(result, guess) {
	        var pattern = guess.pattern || qualify(guess);
	        if (!result && (result =
	              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
	              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
	            )) {
	          // split by forward slash and append product version if needed
	          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
	            result[0] += ' ' + result[1];
	          }
	          // correct character case and cleanup
	          guess = guess.label || guess;
	          result = format(result[0]
	            .replace(RegExp(pattern, 'i'), guess)
	            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
	            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
	        }
	        return result;
	      });
	    }
	
	    /**
	     * Resolves the version using an array of UA patterns.
	     *
	     * @private
	     * @param {Array} patterns An array of UA patterns.
	     * @returns {null|string} The detected version.
	     */
	    function getVersion(patterns) {
	      return reduce(patterns, function(result, pattern) {
	        return result || (RegExp(pattern +
	          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
	      });
	    }
	
	    /**
	     * Returns `platform.description` when the platform object is coerced to a string.
	     *
	     * @name toString
	     * @memberOf platform
	     * @returns {string} Returns `platform.description` if available, else an empty string.
	     */
	    function toStringPlatform() {
	      return this.description || '';
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    // convert layout to an array so we can add extra details
	    layout && (layout = [layout]);
	
	    // detect product names that contain their manufacturer's name
	    if (manufacturer && !product) {
	      product = getProduct([manufacturer]);
	    }
	    // clean up Google TV
	    if ((data = /\bGoogle TV\b/.exec(product))) {
	      product = data[0];
	    }
	    // detect simulators
	    if (/\bSimulator\b/i.test(ua)) {
	      product = (product ? product + ' ' : '') + 'Simulator';
	    }
	    // detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS
	    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
	      description.push('running in Turbo/Uncompressed mode');
	    }
	    // detect iOS
	    if (/^iP/.test(product)) {
	      name || (name = 'Safari');
	      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
	        ? ' ' + data[1].replace(/_/g, '.')
	        : '');
	    }
	    // detect Kubuntu
	    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
	      os = 'Kubuntu';
	    }
	    // detect Android browsers
	    else if (manufacturer && manufacturer != 'Google' &&
	        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) {
	      name = 'Android Browser';
	      os = /\bAndroid\b/.test(os) ? os : 'Android';
	    }
	    // detect false positives for Firefox/Safari
	    else if (!name || (data = !/\bMinefield\b|\(Android;/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
	      // escape the `/` for Firefox 1
	      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
	        // clear name of false positives
	        name = null;
	      }
	      // reassign a generic name
	      if ((data = product || manufacturer || os) &&
	          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
	        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
	      }
	    }
	    // detect Firefox OS
	    if ((data = /\((Mobile|Tablet).*?Firefox\b/i.exec(ua)) && data[1]) {
	      os = 'Firefox OS';
	      if (!product) {
	        product = data[1];
	      }
	    }
	    // detect non-Opera versions (order is important)
	    if (!version) {
	      version = getVersion([
	        '(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))',
	        'Version',
	        qualify(name),
	        '(?:Firefox|Minefield|NetFront)'
	      ]);
	    }
	    // detect stubborn layout engines
	    if (layout == 'iCab' && parseFloat(version) > 3) {
	      layout = ['WebKit'];
	    } else if (
	        layout != 'Trident' &&
	        (data =
	          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
	          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && 'WebKit' ||
	          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident')
	        )
	    ) {
	      layout = [data];
	    }
	    // detect NetFront on PlayStation
	    else if (/\bPlayStation\b(?! Vita\b)/i.test(name) && layout == 'WebKit') {
	      layout = ['NetFront'];
	    }
	    // detect Windows Phone 7 desktop mode
	    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
	      name += ' Mobile';
	      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
	      description.unshift('desktop mode');
	    }
	    // detect Windows Phone 8+ desktop mode
	    else if (/\bWPDesktop\b/i.test(ua)) {
	      name = 'IE Mobile';
	      os = 'Windows Phone 8+';
	      description.unshift('desktop mode');
	      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
	    }
	    // detect IE 11 and above
	    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
	      if (!/\bWPDesktop\b/i.test(ua)) {
	        if (name) {
	          description.push('identifying as ' + name + (version ? ' ' + version : ''));
	        }
	        name = 'IE';
	      }
	      version = data[1];
	    }
	    // detect IE Tech Preview
	    else if ((name == 'Chrome' || name != 'IE') && (data = /\bEdge\/([\d.]+)/.exec(ua))) {
	      name = 'IE';
	      version = data[1];
	      layout = ['Trident'];
	      description.unshift('platform preview');
	    }
	    // leverage environment features
	    if (useFeatures) {
	      // detect server-side environments
	      // Rhino has a global function while others have a global object
	      if (isHostType(context, 'global')) {
	        if (java) {
	          data = java.lang.System;
	          arch = data.getProperty('os.arch');
	          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
	        }
	        if (isModuleScope && isHostType(context, 'system') && (data = [context.system])[0]) {
	          os || (os = data[0].os || null);
	          try {
	            data[1] = context.require('ringo/engine').version;
	            version = data[1].join('.');
	            name = 'RingoJS';
	          } catch(e) {
	            if (data[0].global.system == context.system) {
	              name = 'Narwhal';
	            }
	          }
	        }
	        else if (typeof context.process == 'object' && (data = context.process)) {
	          name = 'Node.js';
	          arch = data.arch;
	          os = data.platform;
	          version = /[\d.]+/.exec(data.version)[0];
	        }
	        else if (rhino) {
	          name = 'Rhino';
	        }
	      }
	      // detect Adobe AIR
	      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
	        name = 'Adobe AIR';
	        os = data.flash.system.Capabilities.os;
	      }
	      // detect PhantomJS
	      else if (getClassOf((data = context.phantom)) == phantomClass) {
	        name = 'PhantomJS';
	        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
	      }
	      // detect IE compatibility modes
	      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
	        // we're in compatibility mode when the Trident version + 4 doesn't
	        // equal the document mode
	        version = [version, doc.documentMode];
	        if ((data = +data[1] + 4) != version[1]) {
	          description.push('IE ' + version[1] + ' mode');
	          layout && (layout[1] = '');
	          version[1] = data;
	        }
	        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
	      }
	      os = os && format(os);
	    }
	    // detect prerelease phases
	    if (version && (data =
	          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
	          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
	          /\bMinefield\b/i.test(ua) && 'a'
	        )) {
	      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
	      version = version.replace(RegExp(data + '\\+?$'), '') +
	        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
	    }
	    // detect Firefox Mobile
	    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
	      name = 'Firefox Mobile';
	    }
	    // obscure Maxthon's unreliable version
	    else if (name == 'Maxthon' && version) {
	      version = version.replace(/\.[\d.]+/, '.x');
	    }
	    // detect Silk desktop/accelerated modes
	    else if (name == 'Silk') {
	      if (!/\bMobi/i.test(ua)) {
	        os = 'Android';
	        description.unshift('desktop mode');
	      }
	      if (/Accelerated *= *true/i.test(ua)) {
	        description.unshift('accelerated');
	      }
	    }
	    // detect Xbox 360 and Xbox One
	    else if (/\bXbox\b/i.test(product)) {
	      os = null;
	      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
	        description.unshift('mobile mode');
	      }
	    }
	    // add mobile postfix
	    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
	        (os == 'Windows CE' || /Mobi/i.test(ua))) {
	      name += ' Mobile';
	    }
	    // detect IE platform preview
	    else if (name == 'IE' && useFeatures && context.external === null) {
	      description.unshift('platform preview');
	    }
	    // detect BlackBerry OS version
	    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
	    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
	          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
	          version
	        )) {
	      data = [data, /BB10/.test(ua)];
	      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
	      version = null;
	    }
	    // detect Opera identifying/masking itself as another browser
	    // http://www.opera.com/support/kb/view/843/
	    else if (this != forOwn && (
	          product != 'Wii' && (
	            (useFeatures && opera) ||
	            (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
	            (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
	            (name == 'IE' && (
	              (os && !/^Win/.test(os) && version > 5.5) ||
	              /\bWindows XP\b/.test(os) && version > 8 ||
	              version == 8 && !/\bTrident\b/.test(ua)
	            ))
	          )
	        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
	
	      // when "indentifying", the UA contains both Opera and the other browser's name
	      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
	      if (reOpera.test(name)) {
	        if (/\bIE\b/.test(data) && os == 'Mac OS') {
	          os = null;
	        }
	        data = 'identify' + data;
	      }
	      // when "masking", the UA contains only the other browser's name
	      else {
	        data = 'mask' + data;
	        if (operaClass) {
	          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
	        } else {
	          name = 'Opera';
	        }
	        if (/\bIE\b/.test(data)) {
	          os = null;
	        }
	        if (!useFeatures) {
	          version = null;
	        }
	      }
	      layout = ['Presto'];
	      description.push(data);
	    }
	    // detect WebKit Nightly and approximate Chrome/Safari versions
	    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	      // correct build for numeric comparison
	      // (e.g. "532.5" becomes "532.05")
	      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
	      // nightly builds are postfixed with a `+`
	      if (name == 'Safari' && data[1].slice(-1) == '+') {
	        name = 'WebKit Nightly';
	        prerelease = 'alpha';
	        version = data[1].slice(0, -1);
	      }
	      // clear incorrect browser versions
	      else if (version == data[1] ||
	          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
	        version = null;
	      }
	      // use the full Chrome version when available
	      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
	      // detect Blink layout engine
	      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && name != 'IE') {
	        layout = ['Blink'];
	      }
	      // detect JavaScriptCore
	      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
	      if (!useFeatures || (!likeChrome && !data[1])) {
	        layout && (layout[1] = 'like Safari');
	        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
	      } else {
	        layout && (layout[1] = 'like Chrome');
	        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
	      }
	      // add the postfix of ".x" or "+" for approximate versions
	      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
	      // obscure version for some Safari 1-2 releases
	      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
	        version = data;
	      }
	    }
	    // detect Opera desktop modes
	    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
	      name += ' ';
	      description.unshift('desktop mode');
	      if (data == 'zvav') {
	        name += 'Mini';
	        version = null;
	      } else {
	        name += 'Mobile';
	      }
	      os = os.replace(RegExp(' *' + data + '$'), '');
	    }
	    // detect Chrome desktop mode
	    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
	      description.unshift('desktop mode');
	      name = 'Chrome Mobile';
	      version = null;
	
	      if (/\bOS X\b/.test(os)) {
	        manufacturer = 'Apple';
	        os = 'iOS 4.3+';
	      } else {
	        os = null;
	      }
	    }
	    // strip incorrect OS versions
	    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
	        ua.indexOf('/' + data + '-') > -1) {
	      os = trim(os.replace(data, ''));
	    }
	    // add layout engine
	    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
	        /Browser|Lunascape|Maxthon/.test(name) ||
	        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1])) {
	      // don't add layout details to description if they are falsey
	      (data = layout[layout.length - 1]) && description.push(data);
	    }
	    // combine contextual information
	    if (description.length) {
	      description = ['(' + description.join('; ') + ')'];
	    }
	    // append manufacturer
	    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
	      description.push('on ' + manufacturer);
	    }
	    // append product
	    if (product) {
	      description.push((/^on /.test(description[description.length -1]) ? '' : 'on ') + product);
	    }
	    // parse OS into an object
	    if (os) {
	      data = / ([\d.+]+)$/.exec(os);
	      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
	      os = {
	        'architecture': 32,
	        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
	        'version': data ? data[1] : null,
	        'toString': function() {
	          var version = this.version;
	          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
	        }
	      };
	    }
	    // add browser/OS architecture
	    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
	      if (os) {
	        os.architecture = 64;
	        os.family = os.family.replace(RegExp(' *' + data), '');
	      }
	      if (
	          name && (/\bWOW64\b/i.test(ua) ||
	          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
	      ) {
	        description.unshift('32-bit');
	      }
	    }
	
	    ua || (ua = null);
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * The platform object.
	     *
	     * @name platform
	     * @type Object
	     */
	    var platform = {};
	
	    /**
	     * The platform description.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.description = ua;
	
	    /**
	     * The name of the browser's layout engine.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.layout = layout && layout[0];
	
	    /**
	     * The name of the product's manufacturer.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.manufacturer = manufacturer;
	
	    /**
	     * The name of the browser/environment.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.name = name;
	
	    /**
	     * The alpha/beta release indicator.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.prerelease = prerelease;
	
	    /**
	     * The name of the product hosting the browser.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.product = product;
	
	    /**
	     * The browser's user agent string.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.ua = ua;
	
	    /**
	     * The browser/environment version.
	     *
	     * @memberOf platform
	     * @type string|null
	     */
	    platform.version = name && version;
	
	    /**
	     * The name of the operating system.
	     *
	     * @memberOf platform
	     * @type Object
	     */
	    platform.os = os || {
	
	      /**
	       * The CPU architecture the OS is built for.
	       *
	       * @memberOf platform.os
	       * @type number|null
	       */
	      'architecture': null,
	
	      /**
	       * The family of the OS.
	       *
	       * Common values include:
	       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
	       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
	       * "Android", "iOS" and "Windows Phone"
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'family': null,
	
	      /**
	       * The version of the OS.
	       *
	       * @memberOf platform.os
	       * @type string|null
	       */
	      'version': null,
	
	      /**
	       * Returns the OS string.
	       *
	       * @memberOf platform.os
	       * @returns {string} The OS string.
	       */
	      'toString': function() { return 'null'; }
	    };
	
	    platform.parse = parse;
	    platform.toString = toStringPlatform;
	
	    if (platform.version) {
	      description.unshift(version);
	    }
	    if (platform.name) {
	      description.unshift(name);
	    }
	    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
	      description.push(product ? '(' + os + ')' : 'on ' + os);
	    }
	    if (description.length) {
	      platform.description = description.join(' ');
	    }
	    return platform;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // export platform
	  // some AMD build optimizers, like r.js, check for condition patterns like the following:
	  if (true) {
	    // define as an anonymous module so, through path mapping, it can be aliased
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return parse();
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Narwhal, Node.js, Rhino -require, or RingoJS
	    forOwn(parse(), function(value, key) {
	      freeExports[key] = value;
	    });
	  }
	  // in a browser or Rhino
	  else {
	    root.platform = parse();
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module), (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var ContentsMixin, jQuery;
	
	jQuery = __webpack_require__(5);
	
	ContentsMixin = {
	  on_unpublish_check_content: function(streamName) {
	    var destinationUrl, fileName, metadataDestinationUrl, metadataFileName, self;
	    self = this;
	    fileName = streamName + '.mp4';
	    destinationUrl = [self.get_http_base_url(), 'contents/', fileName].join('');
	    metadataFileName = streamName + '.json';
	    metadataDestinationUrl = [self.get_http_base_url(), 'contents/', metadataFileName].join('');
	    this._ensure_jQuery();
	    self._content_ready(streamName, function() {
	      self.fire('save', destinationUrl, streamName);
	      self.fire('save-metadata', metadataDestinationUrl, streamName);
	    });
	  },
	  _ensure_jQuery: function() {
	    if (!window.jQuery) {
	      alert('please, include jQuery first!');
	    }
	  },
	  get_http_api_base_url: function() {
	    var ret;
	    ret = [this.get_http_base_url(), 'api/'].join('');
	    return ret;
	  },
	  _content_ready: function(streamName, cb) {
	    var poll, url;
	    url = [this.get_http_api_base_url(), 'contents/', streamName, '/ready'].join('');
	    poll = function() {
	      jQuery.ajax({
	        url: url,
	        dataType: 'jsonp'
	      }).done(function(result) {
	        if (result.error) {
	          return setTimeout(poll, 1000);
	        }
	        cb(result);
	      }).fail(function() {
	        setTimeout(poll, 1000);
	      });
	    };
	    poll();
	  },
	  deleteContent: function(contentName, cb) {
	    var url;
	    url = [this.get_http_api_base_url(), 'contents/', contentName, '/delete'].join('');
	    jQuery.ajax({
	      url: url,
	      dataType: 'jsonp'
	    }).then(cb);
	  }
	};
	
	module.exports = ContentsMixin;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var e, jquery;
	
	try {
	  jquery = window.jQuery || window.$;
	} catch (_error) {
	  e = _error;
	  console.error(e);
	}
	
	module.exports = jquery;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var TimedMetadataMixin, jQuery;
	
	jQuery = __webpack_require__(5);
	
	TimedMetadataMixin = {
	  addTimedMetadataCORS: function(metadata, success, error) {
	    var data, dfr, url;
	    url = [this.get_http_api_base_url(), 'timedmetadata/', this.streamName, '/append'].join('');
	    data = metadata;
	    data.ts = data.ts || (new Date).getTime() - this.publishStartTime;
	    dfr = jQuery.ajax({
	      url: url,
	      dataType: 'json',
	      contentType: 'application/json',
	      data: JSON.stringify(data),
	      type: 'post'
	    }).fail(error).done(success);
	    return dfr;
	  },
	  addTimedMetadataJSONP: function(metadata, success, error) {
	    var data, dfr, dfr_done, dfr_error, url;
	    url = [this.get_http_api_base_url(), 'timedmetadata/', this.streamName, '/append/jsonp'].join('');
	    data = metadata;
	    data.ts = data.ts || (new Date).getTime() - this.publishStartTime;
	    data = 'data=' + encodeURIComponent(JSON.stringify(data));
	    dfr = new jQuery.Deferred;
	    dfr_error = function(err) {
	      dfr.reject(err);
	    };
	    dfr_done = function(result, b, c) {
	      if (result.error) {
	        return dfr_error(result.error, b, c);
	      }
	      dfr.resolve(result, b, c);
	    };
	    jQuery.ajax({
	      url: url,
	      dataType: 'jsonp',
	      contentType: 'application/json',
	      data: data,
	      type: 'get'
	    }).fail(dfr_error).fail(error).done(dfr_done).done(success);
	    return dfr;
	  },
	  addTimedMetadata: function(metadata, success, error) {
	    if (this._CORS_support()) {
	      this.addTimedMetadataCORS(metadata, success, error);
	      return;
	    }
	    this.addTimedMetadataJSONP(metadata, success, error);
	  }
	};
	
	module.exports = TimedMetadataMixin;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var JobsMixin, jQuery;
	
	jQuery = __webpack_require__(5);
	
	JobsMixin = {
	  enableRealtimeAnalysis: function(engine, success, error) {
	    var data, dfr, dfr_done, dfr_error, url;
	    url = [this.get_http_api_base_url(), 'jobs/submit/jsonp'].join('');
	    data = {
	      streamName: this.streamName,
	      engine: engine || 'kanako_live'
	    };
	    dfr = new jQuery.Deferred;
	    dfr_error = function(err) {
	      dfr.reject(err);
	    };
	    dfr_done = function(result, b, c) {
	      if (result.error) {
	        return dfr_error(result.error, b, c);
	      }
	      dfr.resolve(result, b, c);
	    };
	    jQuery.ajax({
	      url: url,
	      dataType: 'jsonp',
	      contentType: 'application/json',
	      data: data,
	      type: 'get'
	    }).fail(dfr_error).fail(error).done(dfr_done).done(success);
	    return dfr;
	  }
	};
	
	module.exports = JobsMixin;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var CameraFixMixin;
	
	CameraFixMixin = {
	  camerafix_works: false,
	  camerafix_works_attempt: 0,
	  camerafix_works_timeout: null,
	  isCameraWorking: function() {
	    return this.camerafix_start();
	  },
	  camerafix_start: function() {
	    this.camerafix_stop();
	    this.remoteLoggerLog('camerafix', 'start', [this.camerafix_works]);
	    this.camerafix_works_attempt = 0;
	    this.camerafix_works = false;
	    return this.camerafix_works_timeout = setTimeout(((function(_this) {
	      return function() {
	        return _this.camerafix_poll();
	      };
	    })(this)), 1000);
	  },
	  camerafix_stop: function() {
	    this.remoteLoggerLog('camerafix', 'stop', [this.camerafix_works]);
	    if (this.camerafix_works_timeout !== null) {
	      clearTimeout(this.camerafix_works_timeout);
	    }
	    return this.camerafix_works_timeout = null;
	  },
	  camerafix_poll: function() {
	    var fps, self;
	    fps = this.getCameraCurrentFPS();
	    self = this;
	    if (fps > 0) {
	      this.camerafix_works = true;
	      this.remoteLoggerLog('camerafix', 'camera-works', [this.camerafix_works]);
	      this.camerafix_works_timeout = null;
	      this.fire('camera-works');
	      return;
	    }
	    this.remoteLoggerLog('camerafix', 'attempt', [this.camerafix_works_attempt]);
	    this.camerafix_works_attempt += 1;
	    return this.camerafix_works_timeout = setTimeout(((function(_this) {
	      return function() {
	        return _this.camerafix_poll();
	      };
	    })(this)), 1000);
	  },
	  reloadFlashElement: function(done) {
	    var mirrored, once_ready, parent, restore_html, self, streamBandwidth, streamFPS, streamHeight, streamQuality, streamWidth, url;
	    this.remoteLoggerLog('camerafix', 'reloadFlashElement', []);
	    parent = jQuery(this.el).parent();
	    url = this.getUrl();
	    streamWidth = this.getStreamWidth();
	    streamHeight = this.getStreamHeight();
	    streamFPS = this.getStreamFPS();
	    streamQuality = this.getStreamQuality();
	    streamBandwidth = this.getStreamBandwidth();
	    mirrored = this.getMirroredPreview();
	    this.camerafix_stop();
	    this.el.remove();
	    self = this;
	    once_ready = (function(_this) {
	      return function() {
	        _this.flash_method_call('setUrl', [url]);
	        _this.remoteLoggerLog('camerafix', 'ready again', [url]);
	        _this.setStreamWidth(streamWidth);
	        _this.setStreamHeight(streamHeight);
	        _this.setStreamFPS(streamFPS);
	        _this.setStreamQuality(streamQuality);
	        _this.setStreamBandwidth(streamBandwidth);
	        _this.setMirroredPreview(mirrored);
	        _this.camerafix_start();
	        return done();
	      };
	    })(this);
	    restore_html = (function(_this) {
	      return function() {
	        parent.prepend(_this.el);
	        return _this.once('ready', once_ready);
	      };
	    })(this);
	    return setTimeout(restore_html, 10);
	  }
	};
	
	module.exports = CameraFixMixin;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var LoggingMixin, RemoteLogger;
	
	RemoteLogger = __webpack_require__(10);
	
	LoggingMixin = {
	  remoteLogger: null,
	  remoteLoggerStatsTask: null,
	  remoteLoggerStatsTaskInterval: 5000,
	  remoteLoggerActivate: function(name) {
	    var options, producer, remoteLogger;
	    options = {
	      base_url: null,
	      name: name
	    };
	    remoteLogger = new RemoteLogger(options);
	    producer = this;
	    this.on('publish', function() {
	      producer.remoteLoggerStatsTaskRun();
	    });
	    this.on('unpublish', function() {
	      producer.remoteLoggerStatsTaskStop();
	    });
	    this.on('disconnect', function() {
	      producer.remoteLoggerStatsTaskStop();
	    });
	    this.on('url-changed', function() {
	      var url;
	      url = producer.get_http_api_base_url();
	      remoteLogger.setBaseUrl(url);
	    });
	    this.on('error', function() {
	      remoteLogger.flush();
	    });
	    this.on('unpublish', function() {
	      remoteLogger.flush();
	    });
	    this.on('disconnect', function() {
	      remoteLogger.flush();
	      setTimeout((function() {
	        remoteLogger.flush();
	      }), 1000);
	    });
	    this.remoteLogger = remoteLogger;
	  },
	  remoteLoggerSetName: function(name) {
	    this.remoteLoggerLog('RemoteLogger', 'nameChanged', this.remoteLogger.name, name);
	    return this.remoteLogger.name = name;
	  },
	  remoteLoggerLog: function(type, name, input, output) {
	    var args, ignoredMethods, message;
	    if (!this.remoteLogger) {
	      return;
	    }
	    ignoredMethods = ['getUrl', 'getStreamBufferLength', 'getStreamInfoDroppedFrames', 'getStreamInfoCurrentBytesPerSecond', 'getStreamInfoVideoLossRate', 'getStreamCurrentFPS', 'getCameraCurrentFPS'];
	    if (ignoredMethods.indexOf(name) !== -1) {
	      return;
	    }
	    input = JSON.stringify(input);
	    output = JSON.stringify(output);
	    args = Array.prototype.slice.call(arguments);
	    args[2] = input;
	    args[3] = output;
	    message = args.join('|');
	    this.remoteLogger.log(message);
	  },
	  remoteLoggerLogStats: function() {
	    this.remoteLoggerLog('streamingStats', '5s', null, this.getStats());
	    if (this.remoteLogger) {
	      this.remoteLogger.flush();
	    }
	  },
	  remoteLoggerStatsTaskRun: function() {
	    var fn, self, time;
	    this.remoteLoggerStatsTaskRunning = true;
	    self = this;
	    fn = function() {
	      self.remoteLoggerLogStats();
	    };
	    time = this.remoteLoggerStatsTaskInterval;
	    this.remoteLoggerStatsTask = setInterval(fn, time);
	  },
	  remoteLoggerStatsTaskStop: function() {
	    if (this.remoteLoggerStatsTask === null) {
	      return;
	    }
	    clearInterval(this.remoteLoggerStatsTask);
	    this.remoteLoggerStatsTask = null;
	  }
	};
	
	module.exports = LoggingMixin;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var RemoteLogger, jQuery;
	
	jQuery = __webpack_require__(5);
	
	RemoteLogger = function(options) {
	  this.base_url = options.base_url;
	  this.name = options.name;
	  this.interval = options.interval || 5000;
	};
	
	RemoteLogger.prototype = {
	  logs: [],
	  logs_flushing: [],
	  name: 'default_logger',
	  timer: null,
	  running: false,
	  setBaseUrl: function(url) {
	    this.base_url = url;
	  },
	  flush: function() {
	    var dfr, dfr1, self;
	    dfr1 = new jQuery.Deferred;
	    if (this.logs.length === 0) {
	      dfr1.resolve();
	      this.flush_schedule();
	      return dfr1;
	    }
	    if (!this._CORS_support()) {
	      dfr1.reject();
	      this.flush_schedule();
	      return dfr1;
	    }
	    if (!this.base_url) {
	      dfr1.reject();
	      this.flush_schedule();
	      return dfr1;
	    }
	    this.logs_flushing = this.logs;
	    this.logs = [];
	    dfr = this.flushCORS(this.logs_flushing);
	    self = this;
	    dfr.done(function() {
	      self.flush_success.apply(self, arguments);
	    });
	    dfr.fail(function() {
	      self.flush_error.apply(self, arguments);
	    });
	    return dfr;
	  },
	  flushCORS: function(data) {
	    var dfr, url;
	    url = this.base_url + 'remotelogging/' + this.name;
	    dfr = jQuery.ajax({
	      url: url,
	      dataType: 'json',
	      contentType: 'application/json',
	      data: JSON.stringify(data),
	      type: 'post'
	    });
	    return dfr;
	  },
	  flush_success: function() {
	    this.logs_flushing = [];
	    if (this.running) {
	      this.flush_schedule();
	    }
	  },
	  flush_error: function() {
	    this.logs = this.logs.concat(this.logs_flushing);
	    this.logs_flushing = [];
	    if (this.running) {
	      this.flush_schedule();
	    }
	  },
	  flush_schedule: function() {
	    var self;
	    self = this;
	    this.timer = setTimeout((function() {
	      self.flush.apply(self, arguments);
	    }), this.interval);
	  },
	  start: function() {
	    this.flush_schedule();
	    this.running = true;
	  },
	  stop: function() {
	    clearTimeout(this.timer);
	    this.timer = false;
	    this.running = false;
	    this.flush();
	  },
	  log: function(data) {
	    var log;
	    log = {
	      timestamp: (new Date).toISOString(),
	      data: data
	    };
	    this.logs.push(log);
	  },
	  _CORS_support: function() {
	    if (window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest) {
	      return true;
	    }
	    if (typeof window.XDomainRequest !== 'undefined') {
	      return true;
	    }
	    return false;
	  }
	};
	
	module.exports = RemoteLogger;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitterMixin;
	
	EventEmitterMixin = {
	  on: function(event, fct) {
	    this._events = this._events || {};
	    this._events[event] = this._events[event] || [];
	    this._events[event].push(fct);
	  },
	  off: function(event, fct) {
	    this._events = this._events || {};
	    if (event in this._events === false) {
	      return;
	    }
	    this._events[event].splice(this._events[event].indexOf(fct), 1);
	  },
	  fire: function(event) {
	    var args, handlers, i;
	    this._events = this._events || {};
	    if (event in this._events === false) {
	      return;
	    }
	    handlers = this._events[event].concat([]);
	    i = 0;
	    while (i < handlers.length) {
	      handlers[i].apply(this, Array.prototype.slice.call(arguments, 1));
	      i++;
	    }
	    if (event !== '*') {
	      args = Array.prototype.slice.call(arguments, 0);
	      args.unshift('*');
	      this.fire.apply(this, args);
	    }
	  },
	  once: function(event, fct) {
	    var self, wrapper;
	    self = this;
	    wrapper = function() {
	      self.off(event, wrapper);
	      fct.apply(this, arguments);
	    };
	    this.on(event, wrapper);
	  }
	};
	
	module.exports = EventEmitterMixin;


/***/ }
/******/ ]);
//# sourceMappingURL=var.js.map