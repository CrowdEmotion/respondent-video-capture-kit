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
  this.createElement(this.id, this.width, this.height, path);
  this.port = options.port||'8082';
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
      'getStreamInfoVideoLossRate', 'getStreamInfoString'
      ];

  this.flash_methods_prepare();
};

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
  WebProducer[producerId].fire(eventName, arg1, arg2);
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
        return self.flash_method_call(method, arguments);
      };
    });
  },

  flash_method_call: function (method, args) {
    var self = this;
    var value;
    try {
      value = self.el[method].apply(self.el, args);
    } catch (e) {
      console.log('ERROR ' , e, ' on method ', method,' with ', this);
    }
    return value;
  },
  
  createElement: function (id, width, height, path) {
    var self = this;
    var swfVersionStr = "11.4.0";
    var xiSwfUrlStr = "playerProductInstall.swf";
    var flashvars = { id: id };
    var params = {};
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
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
    swfobject.createCSS("#"+id, "display:block;text-align:left;");
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
    var port = '8082';
    var host = this.getUrl().split('/')[2].split(':')[0];
    var ret = ['http://', host, ':', port, '/'].join('');
    return ret;
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


var ContentsMixin = {
  on_unpublish_check_content: function (streamName) {
    var self = this;
    var fileName = streamName + '.mp4';
    var destinationUrl = [
      self.get_http_base_url(), 'contents/', fileName
    ].join('');

    var metadataFileName = streamName + '.json';
    var metadataDestinationUrl = [
      self.get_http_base_url(), 'contents/', metadataFileName
    ].join('');
    // When the server has successfully transcoded the file a sentinel
    // file will be created to signal that transcoding has been successfully
    // completed.
    this._ensure_jQuery();
    self._content_ready(streamName, function () {
      self.fire('save', destinationUrl, streamName);
      self.fire('save-metadata', metadataDestinationUrl, streamName);
    });
  },

  _ensure_jQuery: function () {
    if (!window.jQuery) {
      // we use jquery for jsonp
      alert('please, include jQuery first!');
    }
  },

  get_http_api_base_url: function () {
    var ret = [this.get_http_base_url(), 'api/'].join('');
    return ret;
  },
  
  _content_ready: function (streamName, cb) {
    // we poll the server to until the transcoded mp4 is ready, then cb
    var url = [
      this.get_http_api_base_url(), 'contents/',
      streamName, '/ready'
    ].join('');
    
    var poll = function () {
      jQuery.ajax({
				url: url,
				dataType: 'jsonp'
      }).done(function (result) {
        if (result.error) {
          return setTimeout(poll, 1000);
        }
        cb(result);
      }).fail(function () {
        setTimeout(poll, 1000);
      });
    };
    poll();
  },

  deleteContent: function (contentName, cb) {
    // TODO: /contents/<name>/delete
    var url = [
      this.get_http_api_base_url(), 'contents/', contentName, '/delete'
    ].join('');
    jQuery.ajax({
      url : url, dataType: 'jsonp'
    }).then(cb);
  }
};

WebProducer.extend(ContentsMixin);


var TimedMetadataMixin = {

  addTimedMetadataCORS: function (metadata, success, error) {
    var url = [
      this.get_http_api_base_url(), 'timedmetadata/', this.streamName, '/append'
    ].join('');
    var data = metadata;
    data.ts = data.ts || (new Date()).getTime() - this.publishStartTime;
    var dfr = jQuery.ajax({
      url : url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      type: 'post'
    }).fail(error).done(success);
    return dfr;
  },

  addTimedMetadataJSONP: function (metadata, success, error) {
    var url = [
      this.get_http_api_base_url(), 'timedmetadata/', this.streamName, '/append/jsonp'
    ].join('');
    var data = metadata;
    data.ts = data.ts || (new Date()).getTime() - this.publishStartTime;
    data = "data=" + encodeURIComponent(JSON.stringify(data));

    var dfr = new $.Deferred();
    var dfr_error = function (err) { dfr.reject(err); };
    var dfr_done = function (result, b, c) {
      if (result.error) {
        return dfr_error(result.error, b, c);
      }
      dfr.resolve(result, b, c);
    };

    jQuery.ajax({
      url : url,
      dataType: 'jsonp',
      contentType: 'application/json',
      data: data,
      type: 'get'
    }).fail(dfr_error).fail(error).done(dfr_done).done(success);
    return dfr;
  },

  addTimedMetadata: function (metadata, success, error) {
    if (this._CORS_support()) {
      this.addTimedMetadataCORS(metadata, success, error);
      return;
    }
    this.addTimedMetadataJSONP(metadata, success, error);
  }
};

WebProducer.extend(TimedMetadataMixin);


var JobsMixin = {
  // Minimal event emitter prototype

  enableRealtimeAnalysis: function (engine, success, error) {
    var url = [
      this.get_http_api_base_url(), 'jobs/submit/jsonp'
    ].join('');

    var data = {
      streamName: this.streamName,
      engine: engine || 'kanako_live'
    };

    var dfr = new $.Deferred();
    var dfr_error = function (err) { dfr.reject(err); };
    var dfr_done = function (result, b, c) {
      if (result.error) {
        return dfr_error(result.error, b, c);
      }
      dfr.resolve(result, b, c);
    };

    jQuery.ajax({
      url : url,
      dataType: 'jsonp',
      contentType: 'application/json',
      data: data,
      type: 'get'
    }).fail(dfr_error).fail(error).done(dfr_done).done(success);
    return dfr;
  }

};

WebProducer.extend(JobsMixin);


var LoadBalancingMixin = {
  load_balancing_original_rtmp_url: null,

  setUrl: function (url) {
    var self = this;
    self.load_balancing_original_rtmp_url = url;
    var method = 'setUrl';
    return self.flash_method_call(method, [url]);
  },

  _get_info: function (cb) {
    // we poll the server to until the transcoded mp4 is ready, then cb
    var url = [
      this.get_http_api_base_url(), 'info/jsonp'
    ].join('');
    
    var dfr = jQuery.ajax({
      url: url,
      dataType: 'jsonp'
    });
    dfr.done(function (result) { cb(result); });
    dfr.fail(function () { cb({}); });
    return dfr;
  },
  
  connect: function () {
    var self = this;
    // need to re-set the producer url because 
    // get_http_api_base_url uses getUrl()
    self.flash_method_call('setUrl', [self.load_balancing_original_rtmp_url]);

    var url = self.getUrl();

    var tmp = url.split('://')[1];
    tmp = tmp.split('/')[0];

    var host_original = tmp.split(':')[0];
    
    self._get_info(function (info) {
      if (info && info.ip && (info.ip.length > 0)) {
        console.log('got some infos', info);
        var ip = info.ip;
        var url_new = url.replace(host_original, ip);
        console.log('swapping urls', host_original, ip);
        self.setUrl(url_new);
      }
      url = self.getUrl();
      self.flash_method_call('connect', []);
    });
  },
};

WebProducer.extend(LoadBalancingMixin);


var EventEmitterMixin = {
  // Minimal event emitter prototype

  on: function(event, fct){
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },

  off: function(event, fct){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },

  fire: function(event /* , args... */){
    this._events = this._events || {};
    if( event in this._events === false ) return;
    var handlers = this._events[event].concat([]); // copy
    for(var i = 0; i < handlers.length; i++){
      handlers[i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  },

  once: function (event, fct) {
    var self = this;
    var wrapper = function () {
      self.off(event, wrapper);
      fct.apply(this, arguments); 
    };
    this.on(event, wrapper);
  }
};

WebProducer.extend(EventEmitterMixin);


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

