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
  createElement: function (id, width, height, path) {
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
    swfobject.embedSWF(
        path + "producer.swf", id,
        width, height,
        swfVersionStr, xiSwfUrlStr, 
        flashvars, params, attributes);
    // JavaScript enabled so display the flashContent div in case it is not replaced with a swf object.
    swfobject.createCSS("#"+id, "display:block;text-align:left;");
    
    var self = this;
    this.on('ready', function () {
      self.on_ready.apply(self, arguments);
    });
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
    var methods = this.methods;
    var self = this;
    methods.forEach(function (method) {        
      self[method] = function () {
        var value = undefined;
        try {
          value = self.el[method].apply(self.el, arguments);
        } catch (e) {
          console.log('ERROR ' , e, ' on method ', method,' with ', this);
        }
        return value;
      };
    });

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
    this.publishStartTime = Date.now();
    this.streamName = streamName;
  },
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
  },
};

WebProducer.extend(ContentsMixin);


var TimedMetadataMixin = {

  addTimedMetadataCORS: function (metadata, success, error) {
    var url = [
      this.get_http_api_base_url(), 'timedmetadata/', this.streamName, '/append'
    ].join('');
    var data = metadata;
    data.ts = data.ts || Date.now() - this.publishStartTime;
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
    data.ts = data.ts || Date.now() - this.publishStartTime;
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
  },
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
  },

};

WebProducer.extend(JobsMixin);


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
