/* Playcorder crowdemotion.co.uk 2015-9-25 9:53 */ var swfobject = function() {
    var UNDEF = "undefined", OBJECT = "object", SHOCKWAVE_FLASH = "Shockwave Flash", SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash", FLASH_MIME_TYPE = "application/x-shockwave-flash", EXPRESS_INSTALL_ID = "SWFObjectExprInst", ON_READY_STATE_CHANGE = "onreadystatechange", win = window, doc = document, nav = navigator, plugin = false, domLoadFnArr = [ main ], regObjArr = [], objIdArr = [], listenersArr = [], storedAltContent, storedAltContentId, storedCallbackFn, storedCallbackObj, isDomLoaded = false, isExpressInstallActive = false, dynamicStylesheet, dynamicStylesheetMedia, autoHideShow = true, ua = function() {
        var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF, u = nav.userAgent.toLowerCase(), p = nav.platform.toLowerCase(), windows = p ? /win/.test(p) : /win/.test(u), mac = p ? /mac/.test(p) : /mac/.test(u), webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, ie = !+"1", playerVersion = [ 0, 0, 0 ], d = null;
        if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
            d = nav.plugins[SHOCKWAVE_FLASH].description;
            if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
                plugin = true;
                ie = false;
                d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
            }
        } else if (typeof win.ActiveXObject != UNDEF) {
            try {
                var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                if (a) {
                    d = a.GetVariable("$version");
                    if (d) {
                        ie = true;
                        d = d.split(" ")[1].split(",");
                        playerVersion = [ parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10) ];
                    }
                }
            } catch (e) {}
        }
        return {
            w3: w3cdom,
            pv: playerVersion,
            wk: webkit,
            ie: ie,
            win: windows,
            mac: mac
        };
    }(), onDomLoad = function() {
        if (!ua.w3) {
            return;
        }
        if (typeof doc.readyState != UNDEF && doc.readyState == "complete" || typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body)) {
            callDomLoadFunctions();
        }
        if (!isDomLoaded) {
            if (typeof doc.addEventListener != UNDEF) {
                doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
            }
            if (ua.ie && ua.win) {
                doc.attachEvent(ON_READY_STATE_CHANGE, function() {
                    if (doc.readyState == "complete") {
                        doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
                        callDomLoadFunctions();
                    }
                });
                if (win == top) {
                    (function() {
                        if (isDomLoaded) {
                            return;
                        }
                        try {
                            doc.documentElement.doScroll("left");
                        } catch (e) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        callDomLoadFunctions();
                    })();
                }
            }
            if (ua.wk) {
                (function() {
                    if (isDomLoaded) {
                        return;
                    }
                    if (!/loaded|complete/.test(doc.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return;
                    }
                    callDomLoadFunctions();
                })();
            }
            addLoadEvent(callDomLoadFunctions);
        }
    }();
    function callDomLoadFunctions() {
        if (isDomLoaded) {
            return;
        }
        try {
            var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
            t.parentNode.removeChild(t);
        } catch (e) {
            return;
        }
        isDomLoaded = true;
        var dl = domLoadFnArr.length;
        for (var i = 0; i < dl; i++) {
            domLoadFnArr[i]();
        }
    }
    function addDomLoadEvent(fn) {
        if (isDomLoaded) {
            fn();
        } else {
            domLoadFnArr[domLoadFnArr.length] = fn;
        }
    }
    function addLoadEvent(fn) {
        if (typeof win.addEventListener != UNDEF) {
            win.addEventListener("load", fn, false);
        } else if (typeof doc.addEventListener != UNDEF) {
            doc.addEventListener("load", fn, false);
        } else if (typeof win.attachEvent != UNDEF) {
            addListener(win, "onload", fn);
        } else if (typeof win.onload == "function") {
            var fnOld = win.onload;
            win.onload = function() {
                fnOld();
                fn();
            };
        } else {
            win.onload = fn;
        }
    }
    function main() {
        if (plugin) {
            testPlayerVersion();
        } else {
            matchVersions();
        }
    }
    function testPlayerVersion() {
        var b = doc.getElementsByTagName("body")[0];
        var o = createElement(OBJECT);
        o.setAttribute("type", FLASH_MIME_TYPE);
        var t = b.appendChild(o);
        if (t) {
            var counter = 0;
            (function() {
                if (typeof t.GetVariable != UNDEF) {
                    var d = t.GetVariable("$version");
                    if (d) {
                        d = d.split(" ")[1].split(",");
                        ua.pv = [ parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10) ];
                    }
                } else if (counter < 10) {
                    counter++;
                    setTimeout(arguments.callee, 10);
                    return;
                }
                b.removeChild(o);
                t = null;
                matchVersions();
            })();
        } else {
            matchVersions();
        }
    }
    function matchVersions() {
        var rl = regObjArr.length;
        if (rl > 0) {
            for (var i = 0; i < rl; i++) {
                var id = regObjArr[i].id;
                var cb = regObjArr[i].callbackFn;
                var cbObj = {
                    success: false,
                    id: id
                };
                if (ua.pv[0] > 0) {
                    var obj = getElementById(id);
                    if (obj) {
                        if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) {
                            setVisibility(id, true);
                            if (cb) {
                                cbObj.success = true;
                                cbObj.ref = getObjectById(id);
                                cb(cbObj);
                            }
                        } else if (regObjArr[i].expressInstall && canExpressInstall()) {
                            var att = {};
                            att.data = regObjArr[i].expressInstall;
                            att.width = obj.getAttribute("width") || "0";
                            att.height = obj.getAttribute("height") || "0";
                            if (obj.getAttribute("class")) {
                                att.styleclass = obj.getAttribute("class");
                            }
                            if (obj.getAttribute("align")) {
                                att.align = obj.getAttribute("align");
                            }
                            var par = {};
                            var p = obj.getElementsByTagName("param");
                            var pl = p.length;
                            for (var j = 0; j < pl; j++) {
                                if (p[j].getAttribute("name").toLowerCase() != "movie") {
                                    par[p[j].getAttribute("name")] = p[j].getAttribute("value");
                                }
                            }
                            showExpressInstall(att, par, id, cb);
                        } else {
                            displayAltContent(obj);
                            if (cb) {
                                cb(cbObj);
                            }
                        }
                    }
                } else {
                    setVisibility(id, true);
                    if (cb) {
                        var o = getObjectById(id);
                        if (o && typeof o.SetVariable != UNDEF) {
                            cbObj.success = true;
                            cbObj.ref = o;
                        }
                        cb(cbObj);
                    }
                }
            }
        }
    }
    function getObjectById(objectIdStr) {
        var r = null;
        var o = getElementById(objectIdStr);
        if (o && o.nodeName == "OBJECT") {
            if (typeof o.SetVariable != UNDEF) {
                r = o;
            } else {
                var n = o.getElementsByTagName(OBJECT)[0];
                if (n) {
                    r = n;
                }
            }
        }
        return r;
    }
    function canExpressInstall() {
        return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
    }
    function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
        isExpressInstallActive = true;
        storedCallbackFn = callbackFn || null;
        storedCallbackObj = {
            success: false,
            id: replaceElemIdStr
        };
        var obj = getElementById(replaceElemIdStr);
        if (obj) {
            if (obj.nodeName == "OBJECT") {
                storedAltContent = abstractAltContent(obj);
                storedAltContentId = null;
            } else {
                storedAltContent = obj;
                storedAltContentId = replaceElemIdStr;
            }
            att.id = EXPRESS_INSTALL_ID;
            if (typeof att.width == UNDEF || !/%$/.test(att.width) && parseInt(att.width, 10) < 310) {
                att.width = "310";
            }
            if (typeof att.height == UNDEF || !/%$/.test(att.height) && parseInt(att.height, 10) < 137) {
                att.height = "137";
            }
            doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
            var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn", fv = "MMredirectURL=" + encodeURI(window.location).toString().replace(/&/g, "%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
            if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + fv;
            } else {
                par.flashvars = fv;
            }
            if (ua.ie && ua.win && obj.readyState != 4) {
                var newObj = createElement("div");
                replaceElemIdStr += "SWFObjectNew";
                newObj.setAttribute("id", replaceElemIdStr);
                obj.parentNode.insertBefore(newObj, obj);
                obj.style.display = "none";
                (function() {
                    if (obj.readyState == 4) {
                        obj.parentNode.removeChild(obj);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            }
            createSWF(att, par, replaceElemIdStr);
        }
    }
    function displayAltContent(obj) {
        if (ua.ie && ua.win && obj.readyState != 4) {
            var el = createElement("div");
            obj.parentNode.insertBefore(el, obj);
            el.parentNode.replaceChild(abstractAltContent(obj), el);
            obj.style.display = "none";
            (function() {
                if (obj.readyState == 4) {
                    obj.parentNode.removeChild(obj);
                } else {
                    setTimeout(arguments.callee, 10);
                }
            })();
        } else {
            obj.parentNode.replaceChild(abstractAltContent(obj), obj);
        }
    }
    function abstractAltContent(obj) {
        var ac = createElement("div");
        if (ua.win && ua.ie) {
            ac.innerHTML = obj.innerHTML;
        } else {
            var nestedObj = obj.getElementsByTagName(OBJECT)[0];
            if (nestedObj) {
                var c = nestedObj.childNodes;
                if (c) {
                    var cl = c.length;
                    for (var i = 0; i < cl; i++) {
                        if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
                            ac.appendChild(c[i].cloneNode(true));
                        }
                    }
                }
            }
        }
        return ac;
    }
    function createSWF(attObj, parObj, id) {
        var r, el = getElementById(id);
        if (ua.wk && ua.wk < 312) {
            return r;
        }
        if (el) {
            if (typeof attObj.id == UNDEF) {
                attObj.id = id;
            }
            if (ua.ie && ua.win) {
                var att = "";
                for (var i in attObj) {
                    if (attObj[i] != Object.prototype[i]) {
                        if (i.toLowerCase() == "data") {
                            parObj.movie = attObj[i];
                        } else if (i.toLowerCase() == "styleclass") {
                            att += ' class="' + attObj[i] + '"';
                        } else if (i.toLowerCase() != "classid") {
                            att += " " + i + '="' + attObj[i] + '"';
                        }
                    }
                }
                var par = "";
                for (var j in parObj) {
                    if (parObj[j] != Object.prototype[j]) {
                        par += '<param name="' + j + '" value="' + parObj[j] + '" />';
                    }
                }
                el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + ">" + par + "</object>";
                objIdArr[objIdArr.length] = attObj.id;
                r = getElementById(attObj.id);
            } else {
                var o = createElement(OBJECT);
                o.setAttribute("type", FLASH_MIME_TYPE);
                for (var m in attObj) {
                    if (attObj[m] != Object.prototype[m]) {
                        if (m.toLowerCase() == "styleclass") {
                            o.setAttribute("class", attObj[m]);
                        } else if (m.toLowerCase() != "classid") {
                            o.setAttribute(m, attObj[m]);
                        }
                    }
                }
                for (var n in parObj) {
                    if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") {
                        createObjParam(o, n, parObj[n]);
                    }
                }
                el.parentNode.replaceChild(o, el);
                r = o;
            }
        }
        return r;
    }
    function createObjParam(el, pName, pValue) {
        var p = createElement("param");
        p.setAttribute("name", pName);
        p.setAttribute("value", pValue);
        el.appendChild(p);
    }
    function removeSWF(id) {
        var obj = getElementById(id);
        if (obj && obj.nodeName == "OBJECT") {
            if (ua.ie && ua.win) {
                obj.style.display = "none";
                (function() {
                    if (obj.readyState == 4) {
                        removeObjectInIE(id);
                    } else {
                        setTimeout(arguments.callee, 10);
                    }
                })();
            } else {
                obj.parentNode.removeChild(obj);
            }
        }
    }
    function removeObjectInIE(id) {
        var obj = getElementById(id);
        if (obj) {
            for (var i in obj) {
                if (typeof obj[i] == "function") {
                    obj[i] = null;
                }
            }
            obj.parentNode.removeChild(obj);
        }
    }
    function getElementById(id) {
        var el = null;
        try {
            el = doc.getElementById(id);
        } catch (e) {}
        return el;
    }
    function createElement(el) {
        return doc.createElement(el);
    }
    function addListener(target, eventType, fn) {
        target.attachEvent(eventType, fn);
        listenersArr[listenersArr.length] = [ target, eventType, fn ];
    }
    function hasPlayerVersion(rv) {
        var pv = ua.pv, v = rv.split(".");
        v[0] = parseInt(v[0], 10);
        v[1] = parseInt(v[1], 10) || 0;
        v[2] = parseInt(v[2], 10) || 0;
        return pv[0] > v[0] || pv[0] == v[0] && pv[1] > v[1] || pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2] ? true : false;
    }
    function createCSS(sel, decl, media, newStyle) {
        if (ua.ie && ua.mac) {
            return;
        }
        var h = doc.getElementsByTagName("head")[0];
        if (!h) {
            return;
        }
        var m = media && typeof media == "string" ? media : "screen";
        if (newStyle) {
            dynamicStylesheet = null;
            dynamicStylesheetMedia = null;
        }
        if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
            var s = createElement("style");
            s.setAttribute("type", "text/css");
            s.setAttribute("media", m);
            dynamicStylesheet = h.appendChild(s);
            if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
                dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
            }
            dynamicStylesheetMedia = m;
        }
        if (ua.ie && ua.win) {
            if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
                dynamicStylesheet.addRule(sel, decl);
            }
        } else {
            if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
                dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
            }
        }
    }
    function setVisibility(id, isVisible) {
        if (!autoHideShow) {
            return;
        }
        var v = isVisible ? "visible" : "hidden";
        if (isDomLoaded && getElementById(id)) {
            getElementById(id).style.visibility = v;
        } else {
            createCSS("#" + id, "visibility:" + v);
        }
    }
    function urlEncodeIfNecessary(s) {
        var regex = /[\\\"<>\.;]/;
        var hasBadChars = regex.exec(s) != null;
        return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
    }
    var cleanup = function() {
        if (ua.ie && ua.win) {
            window.attachEvent("onunload", function() {
                var ll = listenersArr.length;
                for (var i = 0; i < ll; i++) {
                    listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
                }
                var il = objIdArr.length;
                for (var j = 0; j < il; j++) {
                    removeSWF(objIdArr[j]);
                }
                for (var k in ua) {
                    ua[k] = null;
                }
                ua = null;
                for (var l in swfobject) {
                    swfobject[l] = null;
                }
                swfobject = null;
            });
        }
    }();
    return {
        registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
            if (ua.w3 && objectIdStr && swfVersionStr) {
                var regObj = {};
                regObj.id = objectIdStr;
                regObj.swfVersion = swfVersionStr;
                regObj.expressInstall = xiSwfUrlStr;
                regObj.callbackFn = callbackFn;
                regObjArr[regObjArr.length] = regObj;
                setVisibility(objectIdStr, false);
            } else if (callbackFn) {
                callbackFn({
                    success: false,
                    id: objectIdStr
                });
            }
        },
        getObjectById: function(objectIdStr) {
            if (ua.w3) {
                return getObjectById(objectIdStr);
            }
        },
        embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
            var callbackObj = {
                success: false,
                id: replaceElemIdStr
            };
            if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
                setVisibility(replaceElemIdStr, false);
                addDomLoadEvent(function() {
                    widthStr += "";
                    heightStr += "";
                    var att = {};
                    if (attObj && typeof attObj === OBJECT) {
                        for (var i in attObj) {
                            att[i] = attObj[i];
                        }
                    }
                    att.data = swfUrlStr;
                    att.width = widthStr;
                    att.height = heightStr;
                    var par = {};
                    if (parObj && typeof parObj === OBJECT) {
                        for (var j in parObj) {
                            par[j] = parObj[j];
                        }
                    }
                    if (flashvarsObj && typeof flashvarsObj === OBJECT) {
                        for (var k in flashvarsObj) {
                            if (typeof par.flashvars != UNDEF) {
                                par.flashvars += "&" + k + "=" + flashvarsObj[k];
                            } else {
                                par.flashvars = k + "=" + flashvarsObj[k];
                            }
                        }
                    }
                    if (hasPlayerVersion(swfVersionStr)) {
                        var obj = createSWF(att, par, replaceElemIdStr);
                        if (att.id == replaceElemIdStr) {
                            setVisibility(replaceElemIdStr, true);
                        }
                        callbackObj.success = true;
                        callbackObj.ref = obj;
                    } else if (xiSwfUrlStr && canExpressInstall()) {
                        att.data = xiSwfUrlStr;
                        showExpressInstall(att, par, replaceElemIdStr, callbackFn);
                        return;
                    } else {
                        setVisibility(replaceElemIdStr, true);
                    }
                    if (callbackFn) {
                        callbackFn(callbackObj);
                    }
                });
            } else if (callbackFn) {
                callbackFn(callbackObj);
            }
        },
        switchOffAutoHideShow: function() {
            autoHideShow = false;
        },
        ua: ua,
        getFlashPlayerVersion: function() {
            return {
                major: ua.pv[0],
                minor: ua.pv[1],
                release: ua.pv[2]
            };
        },
        hasFlashPlayerVersion: hasPlayerVersion,
        createSWF: function(attObj, parObj, replaceElemIdStr) {
            if (ua.w3) {
                return createSWF(attObj, parObj, replaceElemIdStr);
            } else {
                return undefined;
            }
        },
        showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
            if (ua.w3 && canExpressInstall()) {
                showExpressInstall(att, par, replaceElemIdStr, callbackFn);
            }
        },
        removeSWF: function(objElemIdStr) {
            if (ua.w3) {
                removeSWF(objElemIdStr);
            }
        },
        createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
            if (ua.w3) {
                createCSS(selStr, declStr, mediaStr, newStyleBoolean);
            }
        },
        addDomLoadEvent: addDomLoadEvent,
        addLoadEvent: addLoadEvent,
        getQueryParamValue: function(param) {
            var q = doc.location.search || doc.location.hash;
            if (q) {
                if (/\?/.test(q)) {
                    q = q.split("?")[1];
                }
                if (param == null) {
                    return urlEncodeIfNecessary(q);
                }
                var pairs = q.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
                        return urlEncodeIfNecessary(pairs[i].substring(pairs[i].indexOf("=") + 1));
                    }
                }
            }
            return "";
        },
        expressInstallCallback: function() {
            if (isExpressInstallActive) {
                var obj = getElementById(EXPRESS_INSTALL_ID);
                if (obj && storedAltContent) {
                    obj.parentNode.replaceChild(storedAltContent, obj);
                    if (storedAltContentId) {
                        setVisibility(storedAltContentId, true);
                        if (ua.ie && ua.win) {
                            storedAltContent.style.display = "block";
                        }
                    }
                    if (storedCallbackFn) {
                        storedCallbackFn(storedCallbackObj);
                    }
                }
                isExpressInstallActive = false;
            }
        }
    };
}();

var WebProducer = function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            exports: {},
            id: moduleId,
            loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.p = "/lib/";
    return __webpack_require__(0);
}([ function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1);
}, function(module, exports, __webpack_require__) {
    "use strict";
    var WebProducer = function(options) {
        if (!options || !options.id) {
            return alert("You must provide an id for the web producer");
        }
        this.id = options.id;
        this.width = options.width || 320;
        this.height = options.height || 240;
        this.el = null;
        this.trace = options.trace;
        this.streamName = null;
        WebProducer[this.id] = this;
        var path = options.path || "";
        var style = options.style || "display:block;text-align:left;";
        this.createElement(this.id, this.width, this.height, path, style);
        this.port = options.port || "80";
        this.methods = [ "setCredentials", "getCredentials", "setUrl", "getUrl", "setStreamWidth", "getStreamWidth", "setStreamHeight", "getStreamHeight", "setStreamFPS", "getStreamFPS", "setStreamQuality", "getStreamQuality", "setStreamBandwidth", "getStreamBandwidth", "connect", "disconnect", "publish", "unpublish", "countCameras", "isCameraMuted", "setMirroredPreview", "getMirroredPreview", "setAudioStreamActive", "getAudioStreamActive", "setStreamBufferTime", "getStreamBufferTime", "getStreamTime", "getStreamBufferLength", "getStreamInfoDroppedFrames", "getStreamInfoCurrentBytesPerSecond", "getStreamInfoVideoLossRate", "getStreamInfoString", "getStreamCurrentFPS", "getCameraCurrentFPS" ];
        this.flash_methods_prepare();
        if (options.remote_logger_name) {
            this.remoteLoggerActivate(options.remote_logger_name);
            this.remoteLoggerLog("jsMethodCalled", "constructor", [ options ]);
            if (window.navigator && window.navigator.userAgent) {
                this.remoteLoggerLog("userAgent", "userAgent", navigator.userAgent, "");
                this.remoteLoggerLog("platform", "platform", [], __webpack_require__(2));
            }
        }
    };
    WebProducer.log = function(id) {
        if (console && console.log) {
            var producer = WebProducer[id];
            if (producer.trace) {
                console.log.apply(console, arguments);
            }
        }
    };
    WebProducer.js_event = function(producerId, eventName, arg1, arg2) {
        var producer = WebProducer[producerId];
        if (producer.trace) {
            WebProducer.log(producerId, eventName, arg1, arg2);
        }
        producer.fire(eventName, arg1, arg2);
        producer.remoteLoggerLog("flashEventTriggered", eventName, [ arg1, arg2 ]);
    };
    WebProducer.extend = function(source) {
        for (var prop in source) {
            WebProducer.prototype[prop] = source[prop];
        }
    };
    WebProducer.prototype = {
        flash_methods_prepare: function() {
            var self = this;
            this.methods.forEach(function(method) {
                if (self[method]) {
                    return;
                }
                self[method] = function() {
                    var args = Array.prototype.slice.call(arguments);
                    return self.flash_method_call(method, args);
                };
            });
        },
        flash_method_call: function(method, args) {
            var self = this;
            var value;
            try {
                value = self.el[method].apply(self.el, args);
                this.remoteLoggerLog("flashMethodCalled", method, args, value);
            } catch (e) {
                console.log("ERROR ", e, " on method ", method, " with ", this);
                this.remoteLoggerLog("flashMethodError", method, args, e.message || e);
            }
            return value;
        },
        createElement: function(id, width, height, path, style) {
            var self = this;
            var swfVersionStr = "11.4.0";
            var xiSwfUrlStr = "playerProductInstall.swf";
            var flashvars = {
                id: id
            };
            var params = {};
            params.quality = "high";
            params.bgcolor = "#ffffff";
            params.allowscriptaccess = "always";
            params.allowfullscreen = "true";
            var attributes = {};
            attributes.align = "left";
            var check_already_ready = function() {
                self.check_already_ready();
            };
            this.on("ready", function() {
                self.on_ready.apply(self, arguments);
            });
            swfobject.embedSWF(path + "producer.swf", id, width, height, swfVersionStr, xiSwfUrlStr, flashvars, params, attributes, check_already_ready);
            swfobject.createCSS("#" + id, style);
        },
        check_already_ready: function() {
            var self = this;
            try {
                var el = document.getElementById(self.id);
                if (el && el.isReady()) {
                    self.fire("ready");
                }
            } catch (e) {}
        },
        get_http_base_url: function() {
            var port = this.port;
            var protocol = "http://";
            var usingHTTPS = window.location.href.indexOf("https") === 0;
            if (usingHTTPS) {
                port = 443;
                protocol = "https://";
            }
            var host = this.getUrl().split("/")[2].split(":")[0];
            var ret = [ protocol, host, ":", port, "/" ].join("");
            return ret;
        },
        getStats: function() {
            var stats = {
                bytesPerSecond: this.getStreamInfoCurrentBytesPerSecond(),
                droppedFrames: this.getStreamInfoDroppedFrames(),
                bufferLength: this.getStreamBufferLength(),
                videoLossRate: this.getStreamInfoVideoLossRate(),
                currentFPS: this.getStreamCurrentFPS(),
                cameraCurrentFPS: this.getCameraCurrentFPS()
            };
            return stats;
        },
        _CORS_support: function() {
            if (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()) {
                return true;
            }
            if (typeof window.XDomainRequest !== "undefined") {
                return true;
            }
            return false;
        },
        on_ready: function() {
            this.el = document.getElementById(this.id);
            this.flash = this.el;
            var self = this;
            this.on("publish", function(streamName) {
                streamName = streamName.split("?")[0];
                self.on_publish(streamName);
            });
            if (self.on_unpublish_check_content) {
                this.on("unpublish", function(streamName) {
                    streamName = streamName.split("?")[0];
                    self.on_unpublish_check_content(streamName);
                });
            }
        },
        on_publish: function(streamName) {
            this.publishStartTime = new Date().getTime();
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
        url_rtmp_original: null,
        url_http_api: null,
        url_get_host: function(url) {
            var tmp = url.split("://")[1];
            tmp = tmp.split("/")[0];
            return tmp.split(":")[0];
        },
        setUrl: function(url) {
            this.url_rtmp_original = url;
        },
        hub_info_get: function(cb) {
            var protocol = this.current_protocol();
            var host = this.url_get_host(this.url_rtmp_original);
            var url = protocol + "://" + host + "/api/info/jsonp";
            var dfr = jQuery.ajax({
                url: url,
                dataType: "jsonp"
            });
            dfr.done(function(result) {
                cb(result);
            });
            dfr.fail(function() {
                cb({});
            });
            return dfr;
        },
        current_protocol: function() {
            var usingHTTPS = window.location.href.indexOf("https") === 0;
            if (usingHTTPS) {
                return "https";
            }
            return "http";
        },
        connect: function() {
            var self = this;
            this.hub_info_get(function() {
                self.connect_on_hub_info.apply(self, arguments);
            });
        },
        connect_on_hub_info: function(info) {
            var ip_private = info.ipPrivate;
            this.url_http_api = this.current_protocol() + "://" + this.url_get_host(this.url_rtmp_original) + "/bounce/" + ip_private + "/";
            this.fire("url-changed");
            this.remoteLoggerLog("hubInfo", "currentHubChanged", {}, info);
            var ip_public = info.ip;
            var host_original = this.url_get_host(this.url_rtmp_original);
            var url_new = this.url_rtmp_original.replace(host_original, ip_public);
            this.flash_method_call("setUrl", [ url_new ]);
            this.flash_method_call("connect", []);
        },
        get_http_base_url: function() {
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
    WebProducer.mixins = {
        ContentsMixin: ContentsMixin,
        TimedMetadataMixin: TimedMetadataMixin,
        JobsMixin: JobsMixin,
        LoadBalancingMixin: LoadBalancingMixin,
        CamerafixMixin: CamerafixMixin,
        LoggingMixin: LoggingMixin,
        EventEmitterMixin: EventEmitterMixin
    };
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(searchElement, fromIndex) {
            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
    module.exports = WebProducer;
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_RESULT__;
    (function(module, global) {
        (function() {
            "use strict";
            var objectTypes = {
                "function": true,
                object: true
            };
            var root = objectTypes[typeof window] && window || this;
            var oldRoot = root;
            var freeExports = objectTypes[typeof exports] && exports;
            var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
            var freeGlobal = freeExports && freeModule && typeof global == "object" && global;
            if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
                root = freeGlobal;
            }
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var reOpera = /\bOpera/;
            var thisBinding = this;
            var objectProto = Object.prototype;
            var hasOwnProperty = objectProto.hasOwnProperty;
            var toString = objectProto.toString;
            function capitalize(string) {
                string = String(string);
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            function cleanupOS(os, pattern, label) {
                var data = {
                    "6.4": "10",
                    "6.3": "8.1",
                    "6.2": "8",
                    "6.1": "Server 2008 R2 / 7",
                    "6.0": "Server 2008 / Vista",
                    "5.2": "Server 2003 / XP 64-bit",
                    "5.1": "XP",
                    "5.01": "2000 SP1",
                    "5.0": "2000",
                    "4.0": "NT",
                    "4.90": "ME"
                };
                if (pattern && label && /^Win/i.test(os) && (data = data[(0, /[\d.]+$/.exec(os))])) {
                    os = "Windows " + data;
                }
                os = String(os);
                if (pattern && label) {
                    os = os.replace(RegExp(pattern, "i"), label);
                }
                os = format(os.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").split(" on ")[0]);
                return os;
            }
            function each(object, callback) {
                var index = -1, length = object ? object.length : 0;
                if (typeof length == "number" && length > -1 && length <= maxSafeInteger) {
                    while (++index < length) {
                        callback(object[index], index, object);
                    }
                } else {
                    forOwn(object, callback);
                }
            }
            function format(string) {
                string = trim(string);
                return /^(?:webOS|i(?:OS|P))/.test(string) ? string : capitalize(string);
            }
            function forOwn(object, callback) {
                for (var key in object) {
                    if (hasOwnProperty.call(object, key)) {
                        callback(object[key], key, object);
                    }
                }
            }
            function getClassOf(value) {
                return value == null ? capitalize(value) : toString.call(value).slice(8, -1);
            }
            function isHostType(object, property) {
                var type = object != null ? typeof object[property] : "number";
                return !/^(?:boolean|number|string|undefined)$/.test(type) && (type == "object" ? !!object[property] : true);
            }
            function qualify(string) {
                return String(string).replace(/([ -])(?!$)/g, "$1?");
            }
            function reduce(array, callback) {
                var accumulator = null;
                each(array, function(value, index) {
                    accumulator = callback(accumulator, value, index, array);
                });
                return accumulator;
            }
            function trim(string) {
                return String(string).replace(/^ +| +$/g, "");
            }
            function parse(ua) {
                var context = root;
                var isCustomContext = ua && typeof ua == "object" && getClassOf(ua) != "String";
                if (isCustomContext) {
                    context = ua;
                    ua = null;
                }
                var nav = context.navigator || {};
                var userAgent = nav.userAgent || "";
                ua || (ua = userAgent);
                var isModuleScope = isCustomContext || thisBinding == oldRoot;
                var likeChrome = isCustomContext ? !!nav.likeChrome : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());
                var objectClass = "Object", airRuntimeClass = isCustomContext ? objectClass : "ScriptBridgingProxyObject", enviroClass = isCustomContext ? objectClass : "Environment", javaClass = isCustomContext && context.java ? "JavaPackage" : getClassOf(context.java), phantomClass = isCustomContext ? objectClass : "RuntimeObject";
                var java = /\bJava/.test(javaClass) && context.java;
                var rhino = java && getClassOf(context.environment) == enviroClass;
                var alpha = java ? "a" : "α";
                var beta = java ? "b" : "β";
                var doc = context.document || {};
                var opera = context.operamini || context.opera;
                var operaClass = reOpera.test(operaClass = isCustomContext && opera ? opera["[[Class]]"] : getClassOf(opera)) ? operaClass : opera = null;
                var data;
                var arch = ua;
                var description = [];
                var prerelease = null;
                var useFeatures = ua == userAgent;
                var version = useFeatures && opera && typeof opera.version == "function" && opera.version();
                var isSpecialCasedOS;
                var layout = getLayout([ "Trident", {
                    label: "WebKit",
                    pattern: "AppleWebKit"
                }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko" ]);
                var name = getName([ "Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "K-Meleon", "Konqueror", "Lunascape", "Maxthon", "Midori", "Nook Browser", "PhantomJS", "Raven", "Rekonq", "RockMelt", "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", "Sunrise", "Swiftfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari" ]);
                var product = getProduct([ {
                    label: "BlackBerry",
                    pattern: "BB10"
                }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nook", "PlayBook", "PlayStation 4", "PlayStation 3", "PlayStation Vita", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                }, "Xoom" ]);
                var manufacturer = getManufacturer({
                    Apple: {
                        iPad: 1,
                        iPhone: 1,
                        iPod: 1
                    },
                    Amazon: {
                        Kindle: 1,
                        "Kindle Fire": 1
                    },
                    Asus: {
                        Transformer: 1
                    },
                    "Barnes & Noble": {
                        Nook: 1
                    },
                    BlackBerry: {
                        PlayBook: 1
                    },
                    Google: {
                        "Google TV": 1
                    },
                    HP: {
                        TouchPad: 1
                    },
                    HTC: {},
                    LG: {},
                    Microsoft: {
                        Xbox: 1,
                        "Xbox One": 1
                    },
                    Motorola: {
                        Xoom: 1
                    },
                    Nintendo: {
                        "Wii U": 1,
                        Wii: 1
                    },
                    Nokia: {
                        Lumia: 1
                    },
                    Samsung: {
                        "Galaxy S": 1,
                        "Galaxy S2": 1,
                        "Galaxy S3": 1,
                        "Galaxy S4": 1
                    },
                    Sony: {
                        "PlayStation 4": 1,
                        "PlayStation 3": 1,
                        "PlayStation Vita": 1
                    }
                });
                var os = getOS([ "Windows Phone ", "Android", "CentOS", "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows " ]);
                function getLayout(guesses) {
                    return reduce(guesses, function(result, guess) {
                        return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
                    });
                }
                function getManufacturer(guesses) {
                    return reduce(guesses, function(result, value, key) {
                        return result || (value[product] || value[(0, /^[a-z]+(?: +[a-z]+\b)*/i.exec(product))] || RegExp("\\b" + qualify(key) + "(?:\\b|\\w*\\d)", "i").exec(ua)) && key;
                    });
                }
                function getName(guesses) {
                    return reduce(guesses, function(result, guess) {
                        return result || RegExp("\\b" + (guess.pattern || qualify(guess)) + "\\b", "i").exec(ua) && (guess.label || guess);
                    });
                }
                function getOS(guesses) {
                    return reduce(guesses, function(result, guess) {
                        var pattern = guess.pattern || qualify(guess);
                        if (!result && (result = RegExp("\\b" + pattern + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(ua))) {
                            result = cleanupOS(result, pattern, guess.label || guess);
                        }
                        return result;
                    });
                }
                function getProduct(guesses) {
                    return reduce(guesses, function(result, guess) {
                        var pattern = guess.pattern || qualify(guess);
                        if (!result && (result = RegExp("\\b" + pattern + " *\\d+[.\\w_]*", "i").exec(ua) || RegExp("\\b" + pattern + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(ua))) {
                            if ((result = String(guess.label && !RegExp(pattern, "i").test(guess.label) ? guess.label : result).split("/"))[1] && !/[\d.]+/.test(result[0])) {
                                result[0] += " " + result[1];
                            }
                            guess = guess.label || guess;
                            result = format(result[0].replace(RegExp(pattern, "i"), guess).replace(RegExp("; *(?:" + guess + "[_-])?", "i"), " ").replace(RegExp("(" + guess + ")[-_.]?(\\w)", "i"), "$1 $2"));
                        }
                        return result;
                    });
                }
                function getVersion(patterns) {
                    return reduce(patterns, function(result, pattern) {
                        return result || (RegExp(pattern + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(ua) || 0)[1] || null;
                    });
                }
                function toStringPlatform() {
                    return this.description || "";
                }
                layout && (layout = [ layout ]);
                if (manufacturer && !product) {
                    product = getProduct([ manufacturer ]);
                }
                if (data = /\bGoogle TV\b/.exec(product)) {
                    product = data[0];
                }
                if (/\bSimulator\b/i.test(ua)) {
                    product = (product ? product + " " : "") + "Simulator";
                }
                if (name == "Opera Mini" && /\bOPiOS\b/.test(ua)) {
                    description.push("running in Turbo/Uncompressed mode");
                }
                if (/^iP/.test(product)) {
                    name || (name = "Safari");
                    os = "iOS" + ((data = / OS ([\d_]+)/i.exec(ua)) ? " " + data[1].replace(/_/g, ".") : "");
                } else if (name == "Konqueror" && !/buntu/i.test(os)) {
                    os = "Kubuntu";
                } else if (manufacturer && manufacturer != "Google" && (/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua) || /\bVita\b/.test(product))) {
                    name = "Android Browser";
                    os = /\bAndroid\b/.test(os) ? os : "Android";
                } else if (!name || (data = !/\bMinefield\b|\(Android;/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
                    if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + "/") + 8))) {
                        name = null;
                    }
                    if ((data = product || manufacturer || os) && (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
                        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + " Browser";
                    }
                }
                if ((data = /\((Mobile|Tablet).*?Firefox\b/i.exec(ua)) && data[1]) {
                    os = "Firefox OS";
                    if (!product) {
                        product = data[1];
                    }
                }
                if (!version) {
                    version = getVersion([ "(?:Cloud9|CriOS|CrMo|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|Silk(?!/[\\d.]+$))", "Version", qualify(name), "(?:Firefox|Minefield|NetFront)" ]);
                }
                if (layout == "iCab" && parseFloat(version) > 3) {
                    layout = [ "WebKit" ];
                } else if (layout != "Trident" && (data = /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(ua) && "WebKit" || !layout && /\bMSIE\b/i.test(ua) && (os == "Mac OS" ? "Tasman" : "Trident"))) {
                    layout = [ data ];
                } else if (/\bPlayStation\b(?! Vita\b)/i.test(name) && layout == "WebKit") {
                    layout = [ "NetFront" ];
                }
                if (name == "IE" && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
                    name += " Mobile";
                    os = "Windows Phone " + (/\+$/.test(data) ? data : data + ".x");
                    description.unshift("desktop mode");
                } else if (/\bWPDesktop\b/i.test(ua)) {
                    name = "IE Mobile";
                    os = "Windows Phone 8+";
                    description.unshift("desktop mode");
                    version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
                } else if (name != "IE" && layout == "Trident" && (data = /\brv:([\d.]+)/.exec(ua))) {
                    if (!/\bWPDesktop\b/i.test(ua)) {
                        if (name) {
                            description.push("identifying as " + name + (version ? " " + version : ""));
                        }
                        name = "IE";
                    }
                    version = data[1];
                } else if ((name == "Chrome" || name != "IE") && (data = /\bEdge\/([\d.]+)/.exec(ua))) {
                    name = "IE";
                    version = data[1];
                    layout = [ "Trident" ];
                    description.unshift("platform preview");
                }
                if (useFeatures) {
                    if (isHostType(context, "global")) {
                        if (java) {
                            data = java.lang.System;
                            arch = data.getProperty("os.arch");
                            os = os || data.getProperty("os.name") + " " + data.getProperty("os.version");
                        }
                        if (isModuleScope && isHostType(context, "system") && (data = [ context.system ])[0]) {
                            os || (os = data[0].os || null);
                            try {
                                data[1] = context.require("ringo/engine").version;
                                version = data[1].join(".");
                                name = "RingoJS";
                            } catch (e) {
                                if (data[0].global.system == context.system) {
                                    name = "Narwhal";
                                }
                            }
                        } else if (typeof context.process == "object" && (data = context.process)) {
                            name = "Node.js";
                            arch = data.arch;
                            os = data.platform;
                            version = /[\d.]+/.exec(data.version)[0];
                        } else if (rhino) {
                            name = "Rhino";
                        }
                    } else if (getClassOf(data = context.runtime) == airRuntimeClass) {
                        name = "Adobe AIR";
                        os = data.flash.system.Capabilities.os;
                    } else if (getClassOf(data = context.phantom) == phantomClass) {
                        name = "PhantomJS";
                        version = (data = data.version || null) && data.major + "." + data.minor + "." + data.patch;
                    } else if (typeof doc.documentMode == "number" && (data = /\bTrident\/(\d+)/i.exec(ua))) {
                        version = [ version, doc.documentMode ];
                        if ((data = +data[1] + 4) != version[1]) {
                            description.push("IE " + version[1] + " mode");
                            layout && (layout[1] = "");
                            version[1] = data;
                        }
                        version = name == "IE" ? String(version[1].toFixed(1)) : version[0];
                    }
                    os = os && format(os);
                }
                if (version && (data = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) || /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ";" + (useFeatures && nav.appMinorVersion)) || /\bMinefield\b/i.test(ua) && "a")) {
                    prerelease = /b/i.test(data) ? "beta" : "alpha";
                    version = version.replace(RegExp(data + "\\+?$"), "") + (prerelease == "beta" ? beta : alpha) + (/\d+\+?/.exec(data) || "");
                }
                if (name == "Fennec" || name == "Firefox" && /\b(?:Android|Firefox OS)\b/.test(os)) {
                    name = "Firefox Mobile";
                } else if (name == "Maxthon" && version) {
                    version = version.replace(/\.[\d.]+/, ".x");
                } else if (name == "Silk") {
                    if (!/\bMobi/i.test(ua)) {
                        os = "Android";
                        description.unshift("desktop mode");
                    }
                    if (/Accelerated *= *true/i.test(ua)) {
                        description.unshift("accelerated");
                    }
                } else if (/\bXbox\b/i.test(product)) {
                    os = null;
                    if (product == "Xbox 360" && /\bIEMobile\b/.test(ua)) {
                        description.unshift("mobile mode");
                    }
                } else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) && (os == "Windows CE" || /Mobi/i.test(ua))) {
                    name += " Mobile";
                } else if (name == "IE" && useFeatures && context.external === null) {
                    description.unshift("platform preview");
                } else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data = (RegExp(product.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(ua) || 0)[1] || version)) {
                    data = [ data, /BB10/.test(ua) ];
                    os = (data[1] ? (product = null, manufacturer = "BlackBerry") : "Device Software") + " " + data[0];
                    version = null;
                } else if (this != forOwn && (product != "Wii" && (useFeatures && opera || /Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua) || name == "Firefox" && /\bOS X (?:\d+\.){2,}/.test(os) || name == "IE" && (os && !/^Win/.test(os) && version > 5.5 || /\bWindows XP\b/.test(os) && version > 8 || version == 8 && !/\bTrident\b/.test(ua)))) && !reOpera.test(data = parse.call(forOwn, ua.replace(reOpera, "") + ";")) && data.name) {
                    data = "ing as " + data.name + ((data = data.version) ? " " + data : "");
                    if (reOpera.test(name)) {
                        if (/\bIE\b/.test(data) && os == "Mac OS") {
                            os = null;
                        }
                        data = "identify" + data;
                    } else {
                        data = "mask" + data;
                        if (operaClass) {
                            name = format(operaClass.replace(/([a-z])([A-Z])/g, "$1 $2"));
                        } else {
                            name = "Opera";
                        }
                        if (/\bIE\b/.test(data)) {
                            os = null;
                        }
                        if (!useFeatures) {
                            version = null;
                        }
                    }
                    layout = [ "Presto" ];
                    description.push(data);
                }
                if (data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1]) {
                    data = [ parseFloat(data.replace(/\.(\d)$/, ".0$1")), data ];
                    if (name == "Safari" && data[1].slice(-1) == "+") {
                        name = "WebKit Nightly";
                        prerelease = "alpha";
                        version = data[1].slice(0, -1);
                    } else if (version == data[1] || version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
                        version = null;
                    }
                    data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
                    if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && name != "IE") {
                        layout = [ "Blink" ];
                    }
                    if (!useFeatures || !likeChrome && !data[1]) {
                        layout && (layout[1] = "like Safari");
                        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? "4+" : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : "8");
                    } else {
                        layout && (layout[1] = "like Chrome");
                        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.1 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.3 ? 11 : data < 535.01 ? 12 : data < 535.02 ? "13+" : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.1 ? 19 : data < 537.01 ? 20 : data < 537.11 ? "21+" : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != "Blink" ? "27" : "28");
                    }
                    layout && (layout[1] += " " + (data += typeof data == "number" ? ".x" : /[.+]/.test(data) ? "" : "+"));
                    if (name == "Safari" && (!version || parseInt(version) > 45)) {
                        version = data;
                    }
                }
                if (name == "Opera" && (data = /\bzbov|zvav$/.exec(os))) {
                    name += " ";
                    description.unshift("desktop mode");
                    if (data == "zvav") {
                        name += "Mini";
                        version = null;
                    } else {
                        name += "Mobile";
                    }
                    os = os.replace(RegExp(" *" + data + "$"), "");
                } else if (name == "Safari" && /\bChrome\b/.exec(layout && layout[1])) {
                    description.unshift("desktop mode");
                    name = "Chrome Mobile";
                    version = null;
                    if (/\bOS X\b/.test(os)) {
                        manufacturer = "Apple";
                        os = "iOS 4.3+";
                    } else {
                        os = null;
                    }
                }
                if (version && version.indexOf(data = /[\d.]+$/.exec(os)) == 0 && ua.indexOf("/" + data + "-") > -1) {
                    os = trim(os.replace(data, ""));
                }
                if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (/Browser|Lunascape|Maxthon/.test(name) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Sleipnir|Web)/.test(name) && layout[1])) {
                    (data = layout[layout.length - 1]) && description.push(data);
                }
                if (description.length) {
                    description = [ "(" + description.join("; ") + ")" ];
                }
                if (manufacturer && product && product.indexOf(manufacturer) < 0) {
                    description.push("on " + manufacturer);
                }
                if (product) {
                    description.push((/^on /.test(description[description.length - 1]) ? "" : "on ") + product);
                }
                if (os) {
                    data = / ([\d.+]+)$/.exec(os);
                    isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == "/";
                    os = {
                        architecture: 32,
                        family: data && !isSpecialCasedOS ? os.replace(data[0], "") : os,
                        version: data ? data[1] : null,
                        toString: function() {
                            var version = this.version;
                            return this.family + (version && !isSpecialCasedOS ? " " + version : "") + (this.architecture == 64 ? " 64-bit" : "");
                        }
                    };
                }
                if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
                    if (os) {
                        os.architecture = 64;
                        os.family = os.family.replace(RegExp(" *" + data), "");
                    }
                    if (name && (/\bWOW64\b/i.test(ua) || useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua))) {
                        description.unshift("32-bit");
                    }
                }
                ua || (ua = null);
                var platform = {};
                platform.description = ua;
                platform.layout = layout && layout[0];
                platform.manufacturer = manufacturer;
                platform.name = name;
                platform.prerelease = prerelease;
                platform.product = product;
                platform.ua = ua;
                platform.version = name && version;
                platform.os = os || {
                    architecture: null,
                    family: null,
                    version: null,
                    toString: function() {
                        return "null";
                    }
                };
                platform.parse = parse;
                platform.toString = toStringPlatform;
                if (platform.version) {
                    description.unshift(version);
                }
                if (platform.name) {
                    description.unshift(name);
                }
                if (os && name && !(os == String(os).split(" ")[0] && (os == name.split(" ")[0] || product))) {
                    description.push(product ? "(" + os + ")" : "on " + os);
                }
                if (description.length) {
                    platform.description = description.join(" ");
                }
                return platform;
            }
            if (true) {
                !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return parse();
                }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            } else if (freeExports && freeModule) {
                forOwn(parse(), function(value, key) {
                    freeExports[key] = value;
                });
            } else {
                root.platform = parse();
            }
        }).call(this);
    }).call(exports, __webpack_require__(3)(module), function() {
        return this;
    }());
}, function(module, exports, __webpack_require__) {
    module.exports = function(module) {
        if (!module.webpackPolyfill) {
            module.deprecate = function() {};
            module.paths = [];
            module.children = [];
            module.webpackPolyfill = 1;
        }
        return module;
    };
}, function(module, exports, __webpack_require__) {
    var ContentsMixin, jQuery;
    jQuery = __webpack_require__(5);
    ContentsMixin = {
        on_unpublish_check_content: function(streamName) {
            var destinationUrl, fileName, metadataDestinationUrl, metadataFileName, self;
            self = this;
            fileName = streamName + ".mp4";
            destinationUrl = [ self.get_http_base_url(), "contents/", fileName ].join("");
            metadataFileName = streamName + ".json";
            metadataDestinationUrl = [ self.get_http_base_url(), "contents/", metadataFileName ].join("");
            this._ensure_jQuery();
            self._content_ready(streamName, function() {
                self.fire("save", destinationUrl, streamName);
                self.fire("save-metadata", metadataDestinationUrl, streamName);
            });
        },
        _ensure_jQuery: function() {
            if (!window.jQuery) {
                alert("please, include jQuery first!");
            }
        },
        get_http_api_base_url: function() {
            var ret;
            ret = [ this.get_http_base_url(), "api/" ].join("");
            return ret;
        },
        _content_ready: function(streamName, cb) {
            var poll, url;
            url = [ this.get_http_api_base_url(), "contents/", streamName, "/ready" ].join("");
            poll = function() {
                jQuery.ajax({
                    url: url,
                    dataType: "jsonp"
                }).done(function(result) {
                    if (result.error) {
                        return setTimeout(poll, 1e3);
                    }
                    cb(result);
                }).fail(function() {
                    setTimeout(poll, 1e3);
                });
            };
            poll();
        },
        deleteContent: function(contentName, cb) {
            var url;
            url = [ this.get_http_api_base_url(), "contents/", contentName, "/delete" ].join("");
            jQuery.ajax({
                url: url,
                dataType: "jsonp"
            }).then(cb);
        }
    };
    module.exports = ContentsMixin;
}, function(module, exports, __webpack_require__) {
    var e, jquery;
    try {
        jquery = window.jQuery || window.$;
    } catch (_error) {
        e = _error;
        console.error(e);
    }
    module.exports = jquery;
}, function(module, exports, __webpack_require__) {
    var TimedMetadataMixin, jQuery;
    jQuery = __webpack_require__(5);
    TimedMetadataMixin = {
        addTimedMetadataCORS: function(metadata, success, error) {
            var data, dfr, url;
            url = [ this.get_http_api_base_url(), "timedmetadata/", this.streamName, "/append" ].join("");
            data = metadata;
            data.ts = data.ts || new Date().getTime() - this.publishStartTime;
            dfr = jQuery.ajax({
                url: url,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                type: "post"
            }).fail(error).done(success);
            return dfr;
        },
        addTimedMetadataJSONP: function(metadata, success, error) {
            var data, dfr, dfr_done, dfr_error, url;
            url = [ this.get_http_api_base_url(), "timedmetadata/", this.streamName, "/append/jsonp" ].join("");
            data = metadata;
            data.ts = data.ts || new Date().getTime() - this.publishStartTime;
            data = "data=" + encodeURIComponent(JSON.stringify(data));
            dfr = new jQuery.Deferred();
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
                dataType: "jsonp",
                contentType: "application/json",
                data: data,
                type: "get"
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
}, function(module, exports, __webpack_require__) {
    var JobsMixin, jQuery;
    jQuery = __webpack_require__(5);
    JobsMixin = {
        enableRealtimeAnalysis: function(engine, success, error) {
            var data, dfr, dfr_done, dfr_error, url;
            url = [ this.get_http_api_base_url(), "jobs/submit/jsonp" ].join("");
            data = {
                streamName: this.streamName,
                engine: engine || "kanako_live"
            };
            dfr = new jQuery.Deferred();
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
                dataType: "jsonp",
                contentType: "application/json",
                data: data,
                type: "get"
            }).fail(dfr_error).fail(error).done(dfr_done).done(success);
            return dfr;
        }
    };
    module.exports = JobsMixin;
}, function(module, exports, __webpack_require__) {
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
            this.remoteLoggerLog("camerafix", "start", [ this.camerafix_works ]);
            this.camerafix_works_attempt = 0;
            this.camerafix_works = false;
            return this.camerafix_works_timeout = setTimeout(function(_this) {
                return function() {
                    return _this.camerafix_poll();
                };
            }(this), 1e3);
        },
        camerafix_stop: function() {
            this.remoteLoggerLog("camerafix", "stop", [ this.camerafix_works ]);
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
                this.remoteLoggerLog("camerafix", "camera-works", [ this.camerafix_works ]);
                this.camerafix_works_timeout = null;
                this.fire("camera-works");
                return;
            }
            this.remoteLoggerLog("camerafix", "attempt", [ this.camerafix_works_attempt ]);
            this.camerafix_works_attempt += 1;
            return this.camerafix_works_timeout = setTimeout(function(_this) {
                return function() {
                    return _this.camerafix_poll();
                };
            }(this), 1e3);
        },
        reloadFlashElement: function(done) {
            var mirrored, once_ready, parent, restore_html, self, streamBandwidth, streamFPS, streamHeight, streamQuality, streamWidth, url;
            this.remoteLoggerLog("camerafix", "reloadFlashElement", []);
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
            once_ready = function(_this) {
                return function() {
                    _this.flash_method_call("setUrl", [ url ]);
                    _this.remoteLoggerLog("camerafix", "ready again", [ url ]);
                    _this.setStreamWidth(streamWidth);
                    _this.setStreamHeight(streamHeight);
                    _this.setStreamFPS(streamFPS);
                    _this.setStreamQuality(streamQuality);
                    _this.setStreamBandwidth(streamBandwidth);
                    _this.setMirroredPreview(mirrored);
                    _this.camerafix_start();
                    return done();
                };
            }(this);
            restore_html = function(_this) {
                return function() {
                    parent.prepend(_this.el);
                    return _this.once("ready", once_ready);
                };
            }(this);
            return setTimeout(restore_html, 10);
        }
    };
    module.exports = CameraFixMixin;
}, function(module, exports, __webpack_require__) {
    var LoggingMixin, RemoteLogger;
    RemoteLogger = __webpack_require__(10);
    LoggingMixin = {
        remoteLogger: null,
        remoteLoggerStatsTask: null,
        remoteLoggerStatsTaskInterval: 5e3,
        remoteLoggerActivate: function(name) {
            var options, producer, remoteLogger;
            options = {
                base_url: null,
                name: name
            };
            remoteLogger = new RemoteLogger(options);
            producer = this;
            this.on("publish", function() {
                producer.remoteLoggerStatsTaskRun();
            });
            this.on("unpublish", function() {
                producer.remoteLoggerStatsTaskStop();
            });
            this.on("disconnect", function() {
                producer.remoteLoggerStatsTaskStop();
            });
            this.on("url-changed", function() {
                var url;
                url = producer.get_http_api_base_url();
                remoteLogger.setBaseUrl(url);
            });
            this.on("error", function() {
                remoteLogger.flush();
            });
            this.on("unpublish", function() {
                remoteLogger.flush();
            });
            this.on("disconnect", function() {
                remoteLogger.flush();
                setTimeout(function() {
                    remoteLogger.flush();
                }, 1e3);
            });
            this.remoteLogger = remoteLogger;
        },
        remoteLoggerSetName: function(name) {
            this.remoteLoggerLog("RemoteLogger", "nameChanged", this.remoteLogger.name, name);
            return this.remoteLogger.name = name;
        },
        remoteLoggerLog: function(type, name, input, output) {
            var args, ignoredMethods, message;
            if (!this.remoteLogger) {
                return;
            }
            ignoredMethods = [ "getUrl", "getStreamBufferLength", "getStreamInfoDroppedFrames", "getStreamInfoCurrentBytesPerSecond", "getStreamInfoVideoLossRate", "getStreamCurrentFPS", "getCameraCurrentFPS" ];
            if (ignoredMethods.indexOf(name) !== -1) {
                return;
            }
            input = JSON.stringify(input);
            output = JSON.stringify(output);
            args = Array.prototype.slice.call(arguments);
            args[2] = input;
            args[3] = output;
            message = args.join("|");
            this.remoteLogger.log(message);
        },
        remoteLoggerLogStats: function() {
            this.remoteLoggerLog("streamingStats", "5s", null, this.getStats());
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
}, function(module, exports, __webpack_require__) {
    var RemoteLogger, jQuery;
    jQuery = __webpack_require__(5);
    RemoteLogger = function(options) {
        this.base_url = options.base_url;
        this.name = options.name;
        this.interval = options.interval || 5e3;
    };
    RemoteLogger.prototype = {
        logs: [],
        logs_flushing: [],
        name: "default_logger",
        timer: null,
        running: false,
        setBaseUrl: function(url) {
            this.base_url = url;
        },
        flush: function() {
            var dfr, dfr1, self;
            dfr1 = new jQuery.Deferred();
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
            url = this.base_url + "remotelogging/" + this.name;
            dfr = jQuery.ajax({
                url: url,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                type: "post"
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
            this.timer = setTimeout(function() {
                self.flush.apply(self, arguments);
            }, this.interval);
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
                timestamp: new Date().toISOString(),
                data: data
            };
            this.logs.push(log);
        },
        _CORS_support: function() {
            if (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()) {
                return true;
            }
            if (typeof window.XDomainRequest !== "undefined") {
                return true;
            }
            return false;
        }
    };
    module.exports = RemoteLogger;
}, function(module, exports, __webpack_require__) {
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
            if (event !== "*") {
                args = Array.prototype.slice.call(arguments, 0);
                args.unshift("*");
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
} ]);

Date.now = Date.now || function() {
    return +new Date();
};

window.console = window.console || function() {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(s) {};
    return c;
}();

var ltIE9 = !document.addEventListener;

if (ltIE9) {
    (function(a) {
        if (typeof define === "function" && define.amd) {
            define([ "jquery" ], a);
        } else {
            a(jQuery);
        }
    })(function($) {
        if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
            return;
        }
        var n = /^https?:\/\//i;
        var o = /^get|post$/i;
        var p = new RegExp("^" + location.protocol, "i");
        $.ajaxTransport("* text html xml json", function(j, k, l) {
            if (!j.crossDomain || !j.async || !o.test(j.type) || !n.test(j.url) || !p.test(j.url)) {
                return;
            }
            var m = null;
            return {
                send: function(f, g) {
                    var h = "";
                    var i = (k.dataType || "").toLowerCase();
                    m = new XDomainRequest();
                    if (/^\d+$/.test(k.timeout)) {
                        m.timeout = k.timeout;
                    }
                    m.ontimeout = function() {
                        g(500, "timeout");
                    };
                    m.onload = function() {
                        var a = "Content-Length: " + m.responseText.length + "\r\nContent-Type: " + m.contentType;
                        var b = {
                            code: 200,
                            message: "success"
                        };
                        var c = {
                            text: m.responseText
                        };
                        try {
                            if (i === "html" || /text\/html/i.test(m.contentType)) {
                                c.html = m.responseText;
                            } else if (i === "json" || i !== "text" && /\/json/i.test(m.contentType)) {
                                try {
                                    c.json = $.parseJSON(m.responseText);
                                } catch (e) {
                                    b.code = 500;
                                    b.message = "parseerror";
                                }
                            } else if (i === "xml" || i !== "text" && /\/xml/i.test(m.contentType)) {
                                var d = new ActiveXObject("Microsoft.XMLDOM");
                                d.async = false;
                                try {
                                    d.loadXML(m.responseText);
                                } catch (e) {
                                    d = undefined;
                                }
                                if (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) {
                                    b.code = 500;
                                    b.message = "parseerror";
                                    throw "Invalid XML: " + m.responseText;
                                }
                                c.xml = d;
                            }
                        } catch (parseMessage) {
                            throw parseMessage;
                        } finally {
                            g(b.code, b.message, c, a);
                        }
                    };
                    m.onprogress = function() {};
                    m.onerror = function() {
                        g(500, "error", {
                            text: m.responseText
                        });
                    };
                    if (k.data) {
                        h = $.type(k.data) === "string" ? k.data : $.param(k.data);
                    }
                    m.open(j.type, j.url);
                    m.send(h);
                },
                abort: function() {
                    if (m) {
                        m.abort();
                    }
                }
            };
        });
    });
    (function(a) {
        if (typeof define === "function" && define.amd) {
            define([ "jquery" ], a);
        } else {
            a(jQuery);
        }
    })(function($) {
        if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
            return;
        }
        var n = /^https?:\/\//i;
        var o = /^get|post$/i;
        var p = new RegExp("^" + location.protocol, "i");
        $.ajaxTransport("* text html xml json", function(j, k, l) {
            if (!j.crossDomain || !j.async || !o.test(j.type) || !n.test(j.url) || !p.test(j.url)) {
                return;
            }
            var m = null;
            return {
                send: function(f, g) {
                    var h = "";
                    var i = (k.dataType || "").toLowerCase();
                    m = new XDomainRequest();
                    if (/^\d+$/.test(k.timeout)) {
                        m.timeout = k.timeout;
                    }
                    m.ontimeout = function() {
                        g(500, "timeout");
                    };
                    m.onload = function() {
                        var a = "Content-Length: " + m.responseText.length + "\r\nContent-Type: " + m.contentType;
                        var b = {
                            code: 200,
                            message: "success"
                        };
                        var c = {
                            text: m.responseText
                        };
                        try {
                            if (i === "html" || /text\/html/i.test(m.contentType)) {
                                c.html = m.responseText;
                            } else if (i === "json" || i !== "text" && /\/json/i.test(m.contentType)) {
                                try {
                                    c.json = $.parseJSON(m.responseText);
                                } catch (e) {
                                    b.code = 500;
                                    b.message = "parseerror";
                                }
                            } else if (i === "xml" || i !== "text" && /\/xml/i.test(m.contentType)) {
                                var d = new ActiveXObject("Microsoft.XMLDOM");
                                d.async = false;
                                try {
                                    d.loadXML(m.responseText);
                                } catch (e) {
                                    d = undefined;
                                }
                                if (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) {
                                    b.code = 500;
                                    b.message = "parseerror";
                                    throw "Invalid XML: " + m.responseText;
                                }
                                c.xml = d;
                            }
                        } catch (parseMessage) {
                            throw parseMessage;
                        } finally {
                            g(b.code, b.message, c, a);
                        }
                    };
                    m.onprogress = function() {};
                    m.onerror = function() {
                        g(500, "error", {
                            text: m.responseText
                        });
                    };
                    if (k.data) {
                        h = $.type(k.data) === "string" ? k.data : $.param(k.data);
                    }
                    m.open(j.type, j.url);
                    m.send(h);
                },
                abort: function() {
                    if (m) {
                        m.abort();
                    }
                }
            };
        });
    });
}

var CryptoJS = CryptoJS || function(i, p) {
    var f = {}, q = f.lib = {}, j = q.Base = function() {
        function a() {}
        return {
            extend: function(h) {
                a.prototype = this;
                var d = new a();
                h && d.mixIn(h);
                d.$super = this;
                return d;
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a;
            },
            init: function() {},
            mixIn: function(a) {
                for (var d in a) a.hasOwnProperty(d) && (this[d] = a[d]);
                a.hasOwnProperty("toString") && (this.toString = a.toString);
            },
            clone: function() {
                return this.$super.extend(this);
            }
        };
    }(), k = q.WordArray = j.extend({
        init: function(a, h) {
            a = this.words = a || [];
            this.sigBytes = h != p ? h : 4 * a.length;
        },
        toString: function(a) {
            return (a || m).stringify(this);
        },
        concat: function(a) {
            var h = this.words, d = a.words, c = this.sigBytes, a = a.sigBytes;
            this.clamp();
            if (c % 4) for (var b = 0; b < a; b++) h[c + b >>> 2] |= (d[b >>> 2] >>> 24 - 8 * (b % 4) & 255) << 24 - 8 * ((c + b) % 4); else if (65535 < d.length) for (b = 0; b < a; b += 4) h[c + b >>> 2] = d[b >>> 2]; else h.push.apply(h, d);
            this.sigBytes += a;
            return this;
        },
        clamp: function() {
            var a = this.words, b = this.sigBytes;
            a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
            a.length = i.ceil(b / 4);
        },
        clone: function() {
            var a = j.clone.call(this);
            a.words = this.words.slice(0);
            return a;
        },
        random: function(a) {
            for (var b = [], d = 0; d < a; d += 4) b.push(4294967296 * i.random() | 0);
            return k.create(b, a);
        }
    }), r = f.enc = {}, m = r.Hex = {
        stringify: function(a) {
            for (var b = a.words, a = a.sigBytes, d = [], c = 0; c < a; c++) {
                var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
                d.push((e >>> 4).toString(16));
                d.push((e & 15).toString(16));
            }
            return d.join("");
        },
        parse: function(a) {
            for (var b = a.length, d = [], c = 0; c < b; c += 2) d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << 24 - 4 * (c % 8);
            return k.create(d, b / 2);
        }
    }, s = r.Latin1 = {
        stringify: function(a) {
            for (var b = a.words, a = a.sigBytes, d = [], c = 0; c < a; c++) d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
            return d.join("");
        },
        parse: function(a) {
            for (var b = a.length, d = [], c = 0; c < b; c++) d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4);
            return k.create(d, b);
        }
    }, g = r.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(s.stringify(a)));
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return s.parse(unescape(encodeURIComponent(a)));
        }
    }, b = q.BufferedBlockAlgorithm = j.extend({
        reset: function() {
            this._data = k.create();
            this._nDataBytes = 0;
        },
        _append: function(a) {
            "string" == typeof a && (a = g.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes;
        },
        _process: function(a) {
            var b = this._data, d = b.words, c = b.sigBytes, e = this.blockSize, f = c / (4 * e), f = a ? i.ceil(f) : i.max((f | 0) - this._minBufferSize, 0), a = f * e, c = i.min(4 * a, c);
            if (a) {
                for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
                g = d.splice(0, a);
                b.sigBytes -= c;
            }
            return k.create(g, c);
        },
        clone: function() {
            var a = j.clone.call(this);
            a._data = this._data.clone();
            return a;
        },
        _minBufferSize: 0
    });
    q.Hasher = b.extend({
        init: function() {
            this.reset();
        },
        reset: function() {
            b.reset.call(this);
            this._doReset();
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this;
        },
        finalize: function(a) {
            a && this._append(a);
            this._doFinalize();
            return this._hash;
        },
        clone: function() {
            var a = b.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, d) {
                return a.create(d).finalize(b);
            };
        },
        _createHmacHelper: function(a) {
            return function(b, d) {
                return e.HMAC.create(a, d).finalize(b);
            };
        }
    });
    var e = f.algo = {};
    return f;
}(Math);

(function(i) {
    var p = CryptoJS, f = p.lib, q = f.WordArray, f = f.Hasher, j = p.algo, k = [], r = [];
    (function() {
        function f(a) {
            for (var b = i.sqrt(a), d = 2; d <= b; d++) if (!(a % d)) return !1;
            return !0;
        }
        function g(a) {
            return 4294967296 * (a - (a | 0)) | 0;
        }
        for (var b = 2, e = 0; 64 > e; ) f(b) && (8 > e && (k[e] = g(i.pow(b, .5))), r[e] = g(i.pow(b, 1 / 3)), 
        e++), b++;
    })();
    var m = [], j = j.SHA256 = f.extend({
        _doReset: function() {
            this._hash = q.create(k.slice(0));
        },
        _doProcessBlock: function(f, g) {
            for (var b = this._hash.words, e = b[0], a = b[1], h = b[2], d = b[3], c = b[4], i = b[5], j = b[6], k = b[7], l = 0; 64 > l; l++) {
                if (16 > l) m[l] = f[g + l] | 0; else {
                    var n = m[l - 15], o = m[l - 2];
                    m[l] = ((n << 25 | n >>> 7) ^ (n << 14 | n >>> 18) ^ n >>> 3) + m[l - 7] + ((o << 15 | o >>> 17) ^ (o << 13 | o >>> 19) ^ o >>> 10) + m[l - 16];
                }
                n = k + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & i ^ ~c & j) + r[l] + m[l];
                o = ((e << 30 | e >>> 2) ^ (e << 19 | e >>> 13) ^ (e << 10 | e >>> 22)) + (e & a ^ e & h ^ a & h);
                k = j;
                j = i;
                i = c;
                c = d + n | 0;
                d = h;
                h = a;
                a = e;
                e = n + o | 0;
            }
            b[0] = b[0] + e | 0;
            b[1] = b[1] + a | 0;
            b[2] = b[2] + h | 0;
            b[3] = b[3] + d | 0;
            b[4] = b[4] + c | 0;
            b[5] = b[5] + i | 0;
            b[6] = b[6] + j | 0;
            b[7] = b[7] + k | 0;
        },
        _doFinalize: function() {
            var f = this._data, g = f.words, b = 8 * this._nDataBytes, e = 8 * f.sigBytes;
            g[e >>> 5] |= 128 << 24 - e % 32;
            g[(e + 64 >>> 9 << 4) + 15] = b;
            f.sigBytes = 4 * g.length;
            this._process();
        }
    });
    p.SHA256 = f._createHelper(j);
    p.HmacSHA256 = f._createHmacHelper(j);
})(Math);

(function() {
    var h = CryptoJS, i = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words, f = b.sigBytes, c = this._map;
            b.clamp();
            for (var b = [], a = 0; a < f; a += 3) for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + .75 * g < f; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64)) for (;b.length % 4; ) b.push(e);
            return b.join("");
        },
        parse: function(b) {
            var b = b.replace(/\s/g, ""), e = b.length, f = this._map, c = f.charAt(64);
            c && (c = b.indexOf(c), -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d < e; d++) if (d % 4) {
                var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4), h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                a++;
            }
            return i.create(c, a);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
})();

(function(e) {
    function o() {
        try {
            return r in e && e[r];
        } catch (t) {
            return !1;
        }
    }
    var t = {}, n = e.document, r = "localStorage", i = "script", s;
    t.disabled = !1, t.set = function(e, t) {}, t.get = function(e) {}, t.remove = function(e) {}, 
    t.clear = function() {}, t.transact = function(e, n, r) {
        var i = t.get(e);
        r == null && (r = n, n = null), typeof i == "undefined" && (i = n || {}), r(i), 
        t.set(e, i);
    }, t.getAll = function() {}, t.forEach = function() {}, t.serialize = function(e) {
        return JSON.stringify(e);
    }, t.deserialize = function(e) {
        if (typeof e != "string") return undefined;
        try {
            return JSON.parse(e);
        } catch (t) {
            return e || undefined;
        }
    };
    if (o()) s = e[r], t.set = function(e, n) {
        return n === undefined ? t.remove(e) : (s.setItem(e, t.serialize(n)), n);
    }, t.get = function(e) {
        return t.deserialize(s.getItem(e));
    }, t.remove = function(e) {
        s.removeItem(e);
    }, t.clear = function() {
        s.clear();
    }, t.getAll = function() {
        var e = {};
        return t.forEach(function(t, n) {
            e[t] = n;
        }), e;
    }, t.forEach = function(e) {
        for (var n = 0; n < s.length; n++) {
            var r = s.key(n);
            e(r, t.get(r));
        }
    }; else if (n.documentElement.addBehavior) {
        var u, a;
        try {
            a = new ActiveXObject("htmlfile"), a.open(), a.write("<" + i + ">document.w=window</" + i + '><iframe src="/favicon.ico"></iframe>'), 
            a.close(), u = a.w.frames[0].document, s = u.createElement("div");
        } catch (f) {
            s = n.createElement("div"), u = n.body;
        }
        function l(e) {
            return function() {
                var n = Array.prototype.slice.call(arguments, 0);
                n.unshift(s), u.appendChild(s), s.addBehavior("#default#userData"), s.load(r);
                var i = e.apply(t, n);
                return u.removeChild(s), i;
            };
        }
        var c = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        function h(e) {
            return e.replace(/^d/, "___$&").replace(c, "___");
        }
        t.set = l(function(e, n, i) {
            return n = h(n), i === undefined ? t.remove(n) : (e.setAttribute(n, t.serialize(i)), 
            e.save(r), i);
        }), t.get = l(function(e, n) {
            return n = h(n), t.deserialize(e.getAttribute(n));
        }), t.remove = l(function(e, t) {
            t = h(t), e.removeAttribute(t), e.save(r);
        }), t.clear = l(function(e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(r);
            for (var n = 0, i; i = t[n]; n++) e.removeAttribute(i.name);
            e.save(r);
        }), t.getAll = function(e) {
            var n = {};
            return t.forEach(function(e, t) {
                n[e] = t;
            }), n;
        }, t.forEach = l(function(e, n) {
            var r = e.XMLDocument.documentElement.attributes;
            for (var i = 0, s; s = r[i]; ++i) n(s.name, t.deserialize(e.getAttribute(s.name)));
        });
    }
    try {
        var p = "__storejs__";
        t.set(p, p), t.get(p) != p && (t.disabled = !0), t.remove(p);
    } catch (f) {
        t.disabled = !0;
    }
    t.enabled = !t.disabled, typeof module != "undefined" && module.exports && this.module !== module ? module.exports = t : typeof define == "function" && define.amd ? define(t) : e.store = t;
})(Function("return this")());

function CEClient() {
    this.user = null;
    this.errorlog = "";
    this.responseId = null;
    this.last_ms = Date.now();
    this.token = null;
    this.userId = null;
    this.logout = function(cb) {
        javaRest.user.logout();
        if (cb) {
            cb();
        }
    };
    this.init = function(debug, http, domain, sandbox, options) {
        if (typeof debug != "object") {
            var defOptions = {
                engineType: "kanako",
                processVideo: true
            };
            options = clientMergeObj(defOptions, options);
            if (sandbox == undefined) sandbox = false;
            javaRest(debug, http, domain, sandbox, options);
        } else {
            var defVal = {
                debug: false,
                http: false,
                domain: null,
                sandbox: false,
                engineType: "kanako",
                processVideo: true
            };
            debug = clientMergeObj(defVal, debug);
            javaRest(debug);
        }
    };
    this.login = function(username, password, cb) {
        var ceclient = this;
        javaRest.user.login(username, password, function(response) {
            var ret = false;
            if (response.success) {
                ceclient.userId = response.userId;
                ceclient.token = response.token;
                ret = true;
            } else {
                ceclient.errorlog = ceclient.errorlog + "\n" + response.statusText + " [" + response.status + "]: " + response.responseText;
            }
            if (cb) {
                cb(ret);
            }
        });
    };
    this.setToken = function(appToken) {
        this.userId = appToken;
        this.token = appToken;
        javaRest.user.setupLogin({
            userId: appToken,
            token: appToken
        });
    };
    this.uploadLink = function(mediaURL, cb) {
        var ceclient = this;
        javaRest.facevideo.uploadLink(mediaURL, function(res) {
            ceclient.responseId = res.responseId;
            if (cb) cb(res);
        });
    };
    this.writeCustomData = function(responseId, data, cb) {
        javaRest.response.writeCustomData(responseId, data, function(res) {
            if (cb) cb(res);
        });
    };
    this.readResponseCustomData = function(responseId, cb) {
        javaRest.response.readCustomData(responseId, null, function(res) {
            if (cb) cb(res);
        });
    };
    this.writeRespondentCustomData = function(responsendentId, data, cb) {
        javaRest.respondent.writeRespondentCustomData(responsendentId, data, function(res) {
            if (cb) cb(res);
        });
    };
    this.uploadForm = function(form_id) {
        javaRest.facevideo.uploadForm(form_id);
    };
    this.sendFile = function(element_id, cb) {
        var ceclient = this;
        var file = document.getElementById(element_id).files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function(theFile) {
            javaRest.facevideo.upload(theFile, function(res) {
                ceclient.responseId = res.responseId;
                if (cb) cb(res);
            });
        }(file);
    };
    this.writeTimeSeries = function(responseId, metricId, data, cb) {
        javaRest.postAuth("timeseries?response_id=" + responseId + "&metric_id=" + metricId, {
            data: data
        }, function(res) {}, function(res) {
            if (cb) cb(res);
        });
    };
    this.readThumbnail = function(mediaId, cb) {
        javaRest.get("media/" + mediaId + "?presignedUrl=true", {
            data: null
        }, function(res) {
            if (cb) cb(res);
        }, function(res) {
            if (cb) cb(res);
        });
    };
    this.readTimeseries = function(responseId, metricId, cb, normalize) {
        var metricquery = "";
        if (Array.isArray(metricId)) {
            for (var i = 0; i < metricId.length; i++) {
                metricquery = metricquery + "&metric_id=" + metricId[i];
            }
        } else {
            metricquery = "&metric_id=" + metricId;
        }
        if (normalize == undefined) {
            normalize = "&normalize=false";
        } else {
            normalize = "&normalize=" + normalize.toString();
        }
        javaRest.get("timeseries?response_id=" + responseId + metricquery + normalize, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.readMetrics = function(metricId, cb) {
        var url = "metric";
        if (metricId == undefined || metricId == null) {
            url = "metric";
        } else {
            url = "metric/?";
            if (Array.isArray(metricId)) {
                for (var i = 0; i < metricId.length; i++) {
                    url = url + "metric_id=" + metricId[i] + "&";
                }
            } else {
                url = "metric/?metric_id=" + metricId;
            }
        }
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.searchResponse = function(key, value, cb) {
        var url = "response";
        var data = '?where={"' + key + '":{"like":"' + value + '"}}';
        javaRest.get(url + data, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.writeResponse = function(data, callback) {
        javaRest.postAuth("response" + javaRest.queryUrl(), data, function(response) {
            if (callback) {
                callback(response);
            }
        }, function(jqXHR, textStatus) {
            if (callback) {
                callback(jqXHR);
            }
        });
    };
    this.writeRespondent = function(data, callback) {
        if (data.customData && typeof data.customData == "object") {
            data.customData = JSON.stringify(data.customData);
        }
        javaRest.postAuth("respondent" + javaRest.queryUrl(), data, function(response) {
            if (callback) {
                callback(response);
            }
        }, function(jqXHR, textStatus) {
            if (callback) {
                callback(jqXHR);
            }
        });
    };
    this.readRespondent = function(data, cb, key) {
        if (key === undefined) key = "id";
        var url = "respondent?" + key + "=" + data;
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.getFvStatus = function(url, cb) {
        var ceclient = this;
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res.status);
            }
        }, function(res) {
            if (cb) {
                cb(res.status);
            }
        });
    };
    this.apiClientWriteResponse = function(data, cb) {
        data = {};
        if (this.researchId) data.research_id = this.researchId;
        if (this.media_id) data.media_id = this.media_id;
        vrt.ceclient.writeResponse(data, cb);
    };
    this.readFacevideoInfo = function(responseId, cb) {
        var ceclient = this;
        var url = "facevideo/" + responseId;
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.loadResearch = function(researchIdOrKey, cb) {
        var ceclient = this, url;
        if (isFinite(researchIdOrKey)) {
            url = "research/" + researchIdOrKey;
        } else {
            url = "research?key=" + researchIdOrKey;
        }
        javaRest.get(url, null, function(res) {
            if (Array.isArray(res) && res.length > 0) res = res[0];
            if (cb) cb(res);
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.loadMediaList = function(researchId, cb) {
        var ceclient = this;
        var url = 'media?where={"research_id":"' + researchId + '"}';
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.loadMedia = function(mediaId, presignedUrl, cb) {
        var ceclient = this;
        var url = "media/" + mediaId + (presignedUrl ? "?presignedUrl=true" : "");
        javaRest.get(url, null, function(res) {
            if (cb) {
                cb(res);
            }
        }, function(res) {
            if (cb) {
                cb(res);
            }
        });
    };
    this.readFacevideoStatus = function(responseId, cb) {
        var ceclient = this;
        var url = "facevideo/" + responseId;
        this.getFvStatus(url, cb);
    };
    function ce_log(msg) {
        if (window.console && console.log) {
            var now = Date.now();
            console.log("CE JS API [" + now + ", " + String("000000" + (now - this.last_ms)).slice(-6) + "]: " + msg);
            console.log(msg);
            this.last_ms = now;
        }
    }
}

var clientMergeObj = function() {
    var obj = {}, i = 0, il = arguments.length, key;
    for (;i < il; i++) {
        for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                if (arguments[i][key] !== undefined) obj[key] = arguments[i][key];
            }
        }
    }
    return obj;
};

javaRest.protocol = "https";

javaRest.domain = "api.crowdemotion.co.uk";

javaRest.domainSandbox = "api-sandbox.crowdemotion.co.uk";

javaRest.version = "v1";

javaRest.debug = false;

javaRest.token = null;

javaRest.userId = null;

javaRest.sandbox = null;

javaRest.engineType = "kanako";

javaRest.processVideo = true;

function javaRest(debug, http_fallback, domain, sandbox, options) {
    if (typeof debug != "object") {
        if (debug == undefined) debug = false;
        if (http_fallback === undefined) http_fallback = false;
        if (!domain) domain = "api.crowdemotion.co.uk";
        javaRest.debug = debug;
        javaRest.domain = domain;
        javaRest.protocol = "https";
        javaRest.sandbox = sandbox;
        if (options.engineType !== undefined && options.engineType !== null) {
            javaRest.engineType = options.engineType;
        }
        if (options.processVideo !== undefined && options.processVideo !== null) {
            javaRest.processVideo = options.processVideo;
        }
    } else {
        var defVals = {
            debug: false,
            http_fallback: false,
            protocol: "https",
            domain: "api.crowdemotion.co.uk"
        };
        debug = clientMergeObj(defVals, debug);
        javaRest.debug = debug.debug;
        http_fallback = defVals.http_fallback;
        javaRest.domain = domain = debug.domain;
        javaRest.protocol = debug.protocol;
        javaRest.sandbox = sandbox = debug.sandbox;
        javaRest.engineType = debug.engineType;
        javaRest.processVideo = debug.processVideo;
    }
    if (javaRest.domain.indexOf("http") >= 0) {
        var parts = domain.split("://");
        javaRest.domain = parts[1];
        javaRest.protocol = parts[0];
    } else {
        if (http_fallback === null) {
            javaRest.protocol = "http";
        }
        if (http_fallback === true) {
            var connection = javaRest.httpGet("https://" + javaRest.domain + "/");
            if (connection) {
                javaRest.protocol = "https";
            } else {
                javaRest.protocol = "http";
            }
        }
    }
}

javaRest.httpGet = function(theUrl) {
    var xmlHttp = null;
    try {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.statusText == "OK" ? true : false;
    } catch (e) {
        return false;
    }
};

javaRest.baseurl = function() {
    return this.protocol + "://" + this.domain + "/" + this.version + "/";
};

javaRest.actionurl = function(actionurl) {
    var s = actionurl;
    var n = s.indexOf("?");
    actionurl = s.substring(0, n != -1 ? n : s.length);
    return javaRest.version + "/" + actionurl;
};

javaRest.getAuthData = function(method, url) {
    var ret = {};
    var url_simple = javaRest.actionurl(url);
    ret.time = javaRest.get_iso_date();
    ret.nonce = makeRandomString();
    var tok = javaRest.cookie.get("token");
    if (tok == undefined) {
        tok = this.token;
    }
    var uId = javaRest.cookie.get("userId");
    if (uId == undefined) {
        uId = this.userId;
    }
    var string_to_hash = tok + ":" + url_simple + "," + method + "," + ret.time + "," + ret.nonce;
    ret.authorization = uId + ":" + javaRest.hash(string_to_hash);
    return ret;
};

javaRest.get = function(url, data, success, error) {
    var auth = javaRest.getAuthData("GET", url);
    var request = $.ajax({
        url: this.baseurl() + url,
        type: "GET",
        data: data,
        crossDomain: true,
        headers: {
            Authorization: auth.authorization,
            "x-ce-rest-date": auth.time,
            nonce: auth.nonce
        },
        dataType: "json"
    });
    request.done(success);
    request.fail(error);
};

function makeRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

javaRest.get_iso_date = function() {
    var d = new Date();
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "Z";
};

javaRest.get_query = function(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) == name) {
            return decodeURIComponent(pair[1]);
        }
    }
};

javaRest.hash = function(string) {
    var hash = CryptoJS.SHA256(string);
    return hash.toString(CryptoJS.enc.Base64);
};

javaRest.isIos = function() {
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null;
};

javaRest.post = function(url, data, success, error) {
    $.ajax({
        url: this.baseurl() + url,
        type: "POST",
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: success,
        error: error
    });
};

javaRest.postAuth = function(url, data, success, error) {
    var auth = javaRest.getAuthData("POST", url);
    $.ajax({
        url: this.baseurl() + url,
        type: "POST",
        contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        crossDomain: true,
        headers: {
            Authorization: auth.authorization,
            "x-ce-rest-date": auth.time,
            nonce: auth.nonce
        },
        dataType: "json",
        success: success,
        error: error
    });
};

javaRest.postAuthForm = function(url, form_id) {
    var auth = javaRest.getAuthData("POST", url);
    $("#" + form_id).attr("action", this.baseurl() + url + "?Authorization=" + encodeURIComponent(auth.authorization) + "&x-ce-rest-date=" + encodeURIComponent(auth.time) + "&nonce=" + encodeURIComponent(auth.nonce)).submit();
};

javaRest.put = function(url, data, success, error) {
    var auth = javaRest.getAuthData("PUT", url);
    $.ajax({
        url: this.baseurl() + url,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        crossDomain: true,
        headers: {
            Authorization: auth.authorization,
            "x-ce-rest-date": auth.time,
            nonce: auth.nonce
        },
        dataType: "json",
        success: success,
        error: error
    });
};

javaRest.cookie = {};

javaRest.cookie.get = function(name) {
    var pairs = document.cookie.split(/\; /g);
    var cookie = {};
    for (var i in pairs) {
        var parts = pairs[i].split(/\=/);
        cookie[parts[0]] = unescape(parts[1]);
    }
    return cookie[name];
};

javaRest.cookie.remove = function(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

javaRest.cookie.set = function(name, value) {
    document.cookie = name + "=" + value;
};

javaRest.user = {};

javaRest.response = {};

javaRest.user.create = function(firstName, emailAddress, password, lastName, callback) {
    javaRest.post("user", {
        user: {
            firstName: firstName,
            emailAddress: emailAddress
        },
        password: password
    }, function(response) {
        javaRest.cookie.set("token", response.token);
        this.token = response.token;
        javaRest.cookie.set("userId", response.userId);
        this.userId = response.userId;
        javaRest.cookie.set("email", emailAddress);
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.user.download = function(callback) {
    javaRest.get("user/" + javaRest.cookie.get("userId"), {}, function(response) {
        javaRest.user.user = response;
        var sResponse = JSON.stringify(response);
        if (store.get("userResponse") === sResponse) {
            return false;
        }
        store.set("userResponse", sResponse);
        if (callback) callback();
    }, function(jqXHR, textStatus) {
        if (callback) callback(jqXHR);
    });
};

javaRest.user.get = function(callback) {
    var userResponse = store.get("userResponse");
    if (userResponse) {
        javaRest.user.user = JSON.parse(userResponse);
        javaRest.user.download();
        callback();
        return;
    }
    javaRest.user.download(callback);
};

javaRest.user.is_logged_in = function() {
    return !!javaRest.cookie.get("token") || !!this.token;
};

javaRest.user.setupLogin = function(response, email) {
    javaRest.cookie.set("token", response.token);
    javaRest.token = response.token;
    javaRest.cookie.set("userId", response.userId);
    javaRest.userId = response.userId;
    javaRest.cookie.set("email", email);
    response.success = true;
    if (response.userId == undefined) {
        response.success = false;
    }
};

javaRest.user.login = function(email, password, callback) {
    javaRest.post("user/login", {
        username: email,
        password: password
    }, function(response) {
        javaRest.user.setupLogin(response, email);
        callback(response);
    }, function(jqXHR, textStatus) {
        jqXHR.success = false;
        callback(jqXHR);
    });
};

javaRest.user.loginSocial = function(accessToken, callback) {
    javaRest.post("user/login/facebook", {
        accessToken: accessToken
    }, function(response) {
        javaRest.cookie.set("token", response.token);
        javaRest.token = response.token;
        javaRest.cookie.set("userId", response.userId);
        javaRest.userId = response.userId;
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.user.logout = function() {
    javaRest.cookie.remove("token");
    this.token = null;
    javaRest.cookie.remove("userId");
    this.userId = null;
    javaRest.cookie.remove("email");
    store.clear();
};

javaRest.user.reset_password = function(token, password, callback) {
    javaRest.post("password/tokens/" + token, {
        password: password
    }, function(response) {
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.user.send_reset_email = function(email, callback) {
    javaRest.post("password/tokens", {
        emailAddress: email
    }, function(response) {
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.user.updateName = function(value, callback) {
    javaRest.put("user/" + javaRest.cookie.get("userId"), {
        emailAddress: javaRest.cookie.get("email"),
        firstName: value
    }, function(response) {
        if (callback) callback();
        javaRest.user.download();
    }, function(jqXHR, textStatus) {
        if (callback) callback(jqXHR);
        javaRest.user.download();
    });
};

javaRest.HashTable = function(obj) {
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }
    this.setItem = function(key, value) {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        } else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    };
    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    };
    this.hasItem = function(key) {
        return this.items.hasOwnProperty(key);
    };
    this.removeItem = function(key) {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        } else {
            return undefined;
        }
    };
    this.keys = function() {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    };
    this.values = function() {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    };
    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    };
    this.clear = function() {
        this.items = {};
        this.length = 0;
    };
};

javaRest.response.writeCustomData = function(id, data, callback) {
    var dataApi = new javaRest.HashTable(data);
    dataApi = {
        data: dataApi.items
    };
    javaRest.postAuth("response/" + id + "/metadata", dataApi, function(response) {
        if (callback) {
            callback(response);
        }
    }, function(jqXHR, textStatus) {
        if (callback) {
            callback(jqXHR);
        }
    });
};

javaRest.response.readCustomData = function(id, data, callback) {
    javaRest.get("response/" + id + "/metadata", null, function(response) {
        if (callback) {
            callback(response);
        }
    }, function(jqXHR, textStatus) {
        if (callback) {
            callback(jqXHR);
        }
    });
};

javaRest.respondent = {};

javaRest.respondent.writeRespondentCustomData = function(id, data, callback) {
    var dataApi = new javaRest.HashTable(data);
    dataApi = {
        data: dataApi.items
    };
    javaRest.postAuth("respondent/" + id + "/metadata", dataApi, function(response) {
        if (callback) {
            callback(response);
        }
    }, function(jqXHR, textStatus) {
        if (callback) {
            callback(jqXHR);
        }
    });
};

javaRest.facevideo = {};

javaRest.sandboxUrl = function() {
    if (javaRest.sandbox === true) {
        return "sandbox=true";
    } else return "";
};

javaRest.engineTypeUrl = function() {
    return "";
    if (javaRest.engineType) {
        return "engineType=" + javaRest.engineType;
    } else return "";
};

javaRest.processVideoUrl = function() {
    if (javaRest.processVideo !== undefined && javaRest.processVideo !== null) {
        return "processVideo=" + javaRest.processVideo;
    } else return "";
};

javaRest.queryUrl = function() {
    var els = [ javaRest.sandboxUrl(), javaRest.engineTypeUrl(), javaRest.processVideoUrl() ];
    for (var i in els) {
        if (els[i] == "") {
            els.splice(i, 1);
        }
    }
    els = els.join("&");
    return els == "" ? "" : "?" + els;
};

javaRest.facevideo.uploadLink = function(videoLink, callback) {
    if (typeof videoLink == "string") {
        videoLink = {
            link: videoLink
        };
    }
    javaRest.postAuth("facevideo/upload" + javaRest.queryUrl(), videoLink, function(response) {
        if (callback) {
            callback(response);
        }
    }, function(jqXHR, textStatus) {
        if (callback) {
            callback(jqXHR);
        }
    });
};

javaRest.facevideo.info = function(response_id, callback) {
    javaRest.get("facevideo/" + response_id + javaRest.queryUrl(), function(response) {
        if (callback) {
            callback(response);
        }
    }, function(jqXHR, textStatus) {
        if (callback) {
            callback(jqXHR);
        }
    });
};

javaRest.facevideo.upload = function(file, callback) {
    javaRest.postAuth("facevideo/upload" + javaRest.queryUrl(), {
        file: file
    }, function(response) {
        if (callback) {
            callback();
        }
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.facevideo.uploadForm = function(form_id) {
    javaRest.postAuthForm("facevideo/upload" + javaRest.queryUrl(), form_id);
};

javaRest.verify = {};

javaRest.verify.request_email = function(email, callback) {
    javaRest.post("verify/tokens", {
        emailAddress: email
    }, function(response) {
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

javaRest.verify.verify = function(token, callback) {
    javaRest.post("verify/tokens/" + token, {}, function(response) {
        callback();
    }, function(jqXHR, textStatus) {
        callback(jqXHR);
    });
};

document.createElement("video");

document.createElement("audio");

document.createElement("track");

var vjs = function(id, options, ready) {
    var tag;
    if (typeof id === "string") {
        if (id.indexOf("#") === 0) {
            id = id.slice(1);
        }
        if (vjs.players[id]) {
            return vjs.players[id];
        } else {
            tag = vjs.el(id);
        }
    } else {
        tag = id;
    }
    if (!tag || !tag.nodeName) {
        throw new TypeError("The element or ID supplied is not valid. (videojs)");
    }
    return tag["player"] || new vjs.Player(tag, options, ready);
};

var videojs = window["videojs"] = vjs;

vjs.CDN_VERSION = "4.7";

vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://";

vjs.options = {
    techOrder: [ "html5", "flash" ],
    html5: {},
    flash: {},
    width: 300,
    height: 150,
    defaultVolume: 0,
    playbackRates: [],
    children: {
        mediaLoader: {},
        posterImage: {},
        textTrackDisplay: {},
        loadingSpinner: {},
        bigPlayButton: {},
        controlBar: {},
        errorDisplay: {}
    },
    language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || "en",
    languages: {},
    notSupportedMessage: "No compatible source was found for this video."
};

if (vjs.CDN_VERSION !== "GENERATED" + "_CDN_VSN") {
    videojs.options["flash"]["swf"] = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf";
}

vjs.players = {};

if (typeof define === "function" && define["amd"]) {
    define([], function() {
        return videojs;
    });
} else if (typeof exports === "object" && typeof module === "object") {
    module["exports"] = videojs;
}

vjs.CoreObject = vjs["CoreObject"] = function() {};

vjs.CoreObject.extend = function(props) {
    var init, subObj;
    props = props || {};
    init = props["init"] || props.init || this.prototype["init"] || this.prototype.init || function() {};
    subObj = function() {
        init.apply(this, arguments);
    };
    subObj.prototype = vjs.obj.create(this.prototype);
    subObj.prototype.constructor = subObj;
    subObj.extend = vjs.CoreObject.extend;
    subObj.create = vjs.CoreObject.create;
    for (var name in props) {
        if (props.hasOwnProperty(name)) {
            subObj.prototype[name] = props[name];
        }
    }
    return subObj;
};

vjs.CoreObject.create = function() {
    var inst = vjs.obj.create(this.prototype);
    this.apply(inst, arguments);
    return inst;
};

vjs.on = function(elem, type, fn) {
    if (vjs.obj.isArray(type)) {
        return _handleMultipleEvents(vjs.on, elem, type, fn);
    }
    var data = vjs.getData(elem);
    if (!data.handlers) data.handlers = {};
    if (!data.handlers[type]) data.handlers[type] = [];
    if (!fn.guid) fn.guid = vjs.guid++;
    data.handlers[type].push(fn);
    if (!data.dispatcher) {
        data.disabled = false;
        data.dispatcher = function(event) {
            if (data.disabled) return;
            event = vjs.fixEvent(event);
            var handlers = data.handlers[event.type];
            if (handlers) {
                var handlersCopy = handlers.slice(0);
                for (var m = 0, n = handlersCopy.length; m < n; m++) {
                    if (event.isImmediatePropagationStopped()) {
                        break;
                    } else {
                        handlersCopy[m].call(elem, event);
                    }
                }
            }
        };
    }
    if (data.handlers[type].length == 1) {
        if (elem.addEventListener) {
            elem.addEventListener(type, data.dispatcher, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + type, data.dispatcher);
        }
    }
};

vjs.off = function(elem, type, fn) {
    if (!vjs.hasData(elem)) return;
    var data = vjs.getData(elem);
    if (!data.handlers) {
        return;
    }
    if (vjs.obj.isArray(type)) {
        return _handleMultipleEvents(vjs.off, elem, type, fn);
    }
    var removeType = function(t) {
        data.handlers[t] = [];
        vjs.cleanUpEvents(elem, t);
    };
    if (!type) {
        for (var t in data.handlers) removeType(t);
        return;
    }
    var handlers = data.handlers[type];
    if (!handlers) return;
    if (!fn) {
        removeType(type);
        return;
    }
    if (fn.guid) {
        for (var n = 0; n < handlers.length; n++) {
            if (handlers[n].guid === fn.guid) {
                handlers.splice(n--, 1);
            }
        }
    }
    vjs.cleanUpEvents(elem, type);
};

vjs.cleanUpEvents = function(elem, type) {
    var data = vjs.getData(elem);
    if (data.handlers[type].length === 0) {
        delete data.handlers[type];
        if (elem.removeEventListener) {
            elem.removeEventListener(type, data.dispatcher, false);
        } else if (elem.detachEvent) {
            elem.detachEvent("on" + type, data.dispatcher);
        }
    }
    if (vjs.isEmpty(data.handlers)) {
        delete data.handlers;
        delete data.dispatcher;
        delete data.disabled;
    }
    if (vjs.isEmpty(data)) {
        vjs.removeData(elem);
    }
};

vjs.fixEvent = function(event) {
    function returnTrue() {
        return true;
    }
    function returnFalse() {
        return false;
    }
    if (!event || !event.isPropagationStopped) {
        var old = event || window.event;
        event = {};
        for (var key in old) {
            if (key !== "layerX" && key !== "layerY" && key !== "keyboardEvent.keyLocation") {
                if (!(key == "returnValue" && old.preventDefault)) {
                    event[key] = old[key];
                }
            }
        }
        if (!event.target) {
            event.target = event.srcElement || document;
        }
        event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
        event.preventDefault = function() {
            if (old.preventDefault) {
                old.preventDefault();
            }
            event.returnValue = false;
            event.isDefaultPrevented = returnTrue;
            event.defaultPrevented = true;
        };
        event.isDefaultPrevented = returnFalse;
        event.defaultPrevented = false;
        event.stopPropagation = function() {
            if (old.stopPropagation) {
                old.stopPropagation();
            }
            event.cancelBubble = true;
            event.isPropagationStopped = returnTrue;
        };
        event.isPropagationStopped = returnFalse;
        event.stopImmediatePropagation = function() {
            if (old.stopImmediatePropagation) {
                old.stopImmediatePropagation();
            }
            event.isImmediatePropagationStopped = returnTrue;
            event.stopPropagation();
        };
        event.isImmediatePropagationStopped = returnFalse;
        if (event.clientX != null) {
            var doc = document.documentElement, body = document.body;
            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        event.which = event.charCode || event.keyCode;
        if (event.button != null) {
            event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
        }
    }
    return event;
};

vjs.trigger = function(elem, event) {
    var elemData = vjs.hasData(elem) ? vjs.getData(elem) : {};
    var parent = elem.parentNode || elem.ownerDocument;
    if (typeof event === "string") {
        event = {
            type: event,
            target: elem
        };
    }
    event = vjs.fixEvent(event);
    if (elemData.dispatcher) {
        elemData.dispatcher.call(elem, event);
    }
    if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
        vjs.trigger(parent, event);
    } else if (!parent && !event.defaultPrevented) {
        var targetData = vjs.getData(event.target);
        if (event.target[event.type]) {
            targetData.disabled = true;
            if (typeof event.target[event.type] === "function") {
                event.target[event.type]();
            }
            targetData.disabled = false;
        }
    }
    return !event.defaultPrevented;
};

vjs.one = function(elem, type, fn) {
    if (vjs.obj.isArray(type)) {
        return _handleMultipleEvents(vjs.one, elem, type, fn);
    }
    var func = function() {
        vjs.off(elem, type, func);
        fn.apply(this, arguments);
    };
    func.guid = fn.guid = fn.guid || vjs.guid++;
    vjs.on(elem, type, func);
};

function _handleMultipleEvents(fn, elem, type, callback) {
    vjs.arr.forEach(type, function(type) {
        fn(elem, type, callback);
    });
}

var hasOwnProp = Object.prototype.hasOwnProperty;

vjs.createEl = function(tagName, properties) {
    var el;
    tagName = tagName || "div";
    properties = properties || {};
    el = document.createElement(tagName);
    vjs.obj.each(properties, function(propName, val) {
        if (propName.indexOf("aria-") !== -1 || propName == "role") {
            el.setAttribute(propName, val);
        } else {
            el[propName] = val;
        }
    });
    return el;
};

vjs.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

vjs.obj = {};

vjs.obj.create = Object.create || function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
};

vjs.obj.each = function(obj, fn, context) {
    for (var key in obj) {
        if (hasOwnProp.call(obj, key)) {
            fn.call(context || this, key, obj[key]);
        }
    }
};

vjs.obj.merge = function(obj1, obj2) {
    if (!obj2) {
        return obj1;
    }
    for (var key in obj2) {
        if (hasOwnProp.call(obj2, key)) {
            obj1[key] = obj2[key];
        }
    }
    return obj1;
};

vjs.obj.deepMerge = function(obj1, obj2) {
    var key, val1, val2;
    obj1 = vjs.obj.copy(obj1);
    for (key in obj2) {
        if (hasOwnProp.call(obj2, key)) {
            val1 = obj1[key];
            val2 = obj2[key];
            if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
                obj1[key] = vjs.obj.deepMerge(val1, val2);
            } else {
                obj1[key] = obj2[key];
            }
        }
    }
    return obj1;
};

vjs.obj.copy = function(obj) {
    return vjs.obj.merge({}, obj);
};

vjs.obj.isPlain = function(obj) {
    return !!obj && typeof obj === "object" && obj.toString() === "[object Object]" && obj.constructor === Object;
};

vjs.obj.isArray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
};

vjs.bind = function(context, fn, uid) {
    if (!fn.guid) {
        fn.guid = vjs.guid++;
    }
    var ret = function() {
        return fn.apply(context, arguments);
    };
    ret.guid = uid ? uid + "_" + fn.guid : fn.guid;
    return ret;
};

vjs.cache = {};

vjs.guid = 1;

vjs.expando = "vdata" + new Date().getTime();

vjs.getData = function(el) {
    var id = el[vjs.expando];
    if (!id) {
        id = el[vjs.expando] = vjs.guid++;
        vjs.cache[id] = {};
    }
    return vjs.cache[id];
};

vjs.hasData = function(el) {
    var id = el[vjs.expando];
    return !(!id || vjs.isEmpty(vjs.cache[id]));
};

vjs.removeData = function(el) {
    var id = el[vjs.expando];
    if (!id) {
        return;
    }
    delete vjs.cache[id];
    try {
        delete el[vjs.expando];
    } catch (e) {
        if (el.removeAttribute) {
            el.removeAttribute(vjs.expando);
        } else {
            el[vjs.expando] = null;
        }
    }
};

vjs.isEmpty = function(obj) {
    for (var prop in obj) {
        if (obj[prop] !== null) {
            return false;
        }
    }
    return true;
};

vjs.addClass = function(element, classToAdd) {
    if (element && element.className && (" " + element.className + " ").indexOf(" " + classToAdd + " ") == -1) {
        element.className = element.className === "" ? classToAdd : element.className + " " + classToAdd;
    }
};

vjs.removeClass = function(element, classToRemove) {
    var classNames, i;
    if (element.className.indexOf(classToRemove) == -1) {
        return;
    }
    classNames = element.className.split(" ");
    for (i = classNames.length - 1; i >= 0; i--) {
        if (classNames[i] === classToRemove) {
            classNames.splice(i, 1);
        }
    }
    element.className = classNames.join(" ");
};

vjs.TEST_VID = vjs.createEl("video");

vjs.USER_AGENT = navigator.userAgent;

vjs.IS_IPHONE = /iPhone/i.test(vjs.USER_AGENT);

vjs.IS_IPAD = /iPad/i.test(vjs.USER_AGENT);

vjs.IS_IPOD = /iPod/i.test(vjs.USER_AGENT);

vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD;

vjs.IOS_VERSION = function() {
    var match = vjs.USER_AGENT.match(/OS (\d+)_/i);
    if (match && match[1]) {
        return match[1];
    }
}();

vjs.IS_ANDROID = /Android/i.test(vjs.USER_AGENT);

vjs.ANDROID_VERSION = function() {
    var match = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i), major, minor;
    if (!match) {
        return null;
    }
    major = match[1] && parseFloat(match[1]);
    minor = match[2] && parseFloat(match[2]);
    if (major && minor) {
        return parseFloat(match[1] + "." + match[2]);
    } else if (major) {
        return major;
    } else {
        return null;
    }
}();

vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && /webkit/i.test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3;

vjs.IS_FIREFOX = /Firefox/i.test(vjs.USER_AGENT);

vjs.IS_CHROME = /Chrome/i.test(vjs.USER_AGENT);

vjs.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);

vjs.setElementAttributes = function(el, attributes) {
    vjs.obj.each(attributes, function(attrName, attrValue) {
        if (attrValue === null || typeof attrValue === "undefined" || attrValue === false) {
            el.removeAttribute(attrName);
        } else {
            el.setAttribute(attrName, attrValue === true ? "" : attrValue);
        }
    });
};

vjs.getElementAttributes = function(tag) {
    var obj, knownBooleans, attrs, attrName, attrVal;
    obj = {};
    knownBooleans = "," + "autoplay,controls,loop,muted,default" + ",";
    if (tag && tag.attributes && tag.attributes.length > 0) {
        attrs = tag.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            attrName = attrs[i].name;
            attrVal = attrs[i].value;
            if (typeof tag[attrName] === "boolean" || knownBooleans.indexOf("," + attrName + ",") !== -1) {
                attrVal = attrVal !== null ? true : false;
            }
            obj[attrName] = attrVal;
        }
    }
    return obj;
};

vjs.getComputedDimension = function(el, strCssRule) {
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
        strValue = document.defaultView.getComputedStyle(el, "").getPropertyValue(strCssRule);
    } else if (el.currentStyle) {
        strValue = el["client" + strCssRule.substr(0, 1).toUpperCase() + strCssRule.substr(1)] + "px";
    }
    return strValue;
};

vjs.insertFirst = function(child, parent) {
    if (parent.firstChild) {
        parent.insertBefore(child, parent.firstChild);
    } else {
        parent.appendChild(child);
    }
};

vjs.browser = {};

vjs.el = function(id) {
    if (id.indexOf("#") === 0) {
        id = id.slice(1);
    }
    return document.getElementById(id);
};

vjs.formatTime = function(seconds, guide) {
    guide = guide || seconds;
    var s = Math.floor(seconds % 60), m = Math.floor(seconds / 60 % 60), h = Math.floor(seconds / 3600), gm = Math.floor(guide / 60 % 60), gh = Math.floor(guide / 3600);
    if (isNaN(seconds) || seconds === Infinity) {
        h = m = s = "-";
    }
    h = h > 0 || gh > 0 ? h + ":" : "";
    m = ((h || gm >= 10) && m < 10 ? "0" + m : m) + ":";
    s = s < 10 ? "0" + s : s;
    return h + m + s;
};

vjs.blockTextSelection = function() {
    document.body.focus();
    document.onselectstart = function() {
        return false;
    };
};

vjs.unblockTextSelection = function() {
    document.onselectstart = function() {
        return true;
    };
};

vjs.trim = function(str) {
    return (str + "").replace(/^\s+|\s+$/g, "");
};

vjs.round = function(num, dec) {
    if (!dec) {
        dec = 0;
    }
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

vjs.createTimeRange = function(start, end) {
    return {
        length: 1,
        start: function() {
            return start;
        },
        end: function() {
            return end;
        }
    };
};

vjs.get = function(url, onSuccess, onError, withCredentials) {
    var fileUrl, request, urlInfo, winLoc, crossOrigin;
    onError = onError || function() {};
    if (typeof XMLHttpRequest === "undefined") {
        window.XMLHttpRequest = function() {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (e) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
            } catch (f) {}
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP");
            } catch (g) {}
            throw new Error("This browser does not support XMLHttpRequest.");
        };
    }
    request = new XMLHttpRequest();
    urlInfo = vjs.parseUrl(url);
    winLoc = window.location;
    crossOrigin = urlInfo.protocol + urlInfo.host !== winLoc.protocol + winLoc.host;
    if (crossOrigin && window.XDomainRequest && !("withCredentials" in request)) {
        request = new window.XDomainRequest();
        request.onload = function() {
            onSuccess(request.responseText);
        };
        request.onerror = onError;
        request.onprogress = function() {};
        request.ontimeout = onError;
    } else {
        fileUrl = urlInfo.protocol == "file:" || winLoc.protocol == "file:";
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200 || fileUrl && request.status === 0) {
                    onSuccess(request.responseText);
                } else {
                    onError(request.responseText);
                }
            }
        };
    }
    try {
        request.open("GET", url, true);
        if (withCredentials) {
            request.withCredentials = true;
        }
    } catch (e) {
        onError(e);
        return;
    }
    try {
        request.send();
    } catch (e) {
        onError(e);
    }
};

vjs.setLocalStorage = function(key, value) {
    try {
        var localStorage = window.localStorage || false;
        if (!localStorage) {
            return;
        }
        localStorage[key] = value;
    } catch (e) {
        if (e.code == 22 || e.code == 1014) {
            vjs.log("LocalStorage Full (VideoJS)", e);
        } else {
            if (e.code == 18) {
                vjs.log("LocalStorage not allowed (VideoJS)", e);
            } else {
                vjs.log("LocalStorage Error (VideoJS)", e);
            }
        }
    }
};

vjs.getAbsoluteURL = function(url) {
    if (!url.match(/^https?:\/\//)) {
        url = vjs.createEl("div", {
            innerHTML: '<a href="' + url + '">x</a>'
        }).firstChild.href;
    }
    return url;
};

vjs.parseUrl = function(url) {
    var div, a, addToBody, props, details;
    props = [ "protocol", "hostname", "port", "pathname", "search", "hash", "host" ];
    a = vjs.createEl("a", {
        href: url
    });
    addToBody = a.host === "" && a.protocol !== "file:";
    if (addToBody) {
        div = vjs.createEl("div");
        div.innerHTML = '<a href="' + url + '"></a>';
        a = div.firstChild;
        div.setAttribute("style", "display:none; position:absolute;");
        document.body.appendChild(div);
    }
    details = {};
    for (var i = 0; i < props.length; i++) {
        details[props[i]] = a[props[i]];
    }
    if (addToBody) {
        document.body.removeChild(div);
    }
    return details;
};

var _noop = function() {};

var _console = window["console"] || {
    log: _noop,
    warn: _noop,
    error: _noop
};

function _logType(type, args) {
    var argsArray = Array.prototype.slice.call(args);
    if (type) {
        argsArray.unshift(type.toUpperCase() + ":");
    } else {
        type = "log";
    }
    vjs.log.history.push(argsArray);
    argsArray.unshift("VIDEOJS:");
    if (_console[type].apply) {
        _console[type].apply(_console, argsArray);
    } else {
        _console[type](argsArray.join(" "));
    }
}

vjs.log = function() {
    _logType(null, arguments);
};

vjs.log.history = [];

vjs.log.error = function() {
    _logType("error", arguments);
};

vjs.log.warn = function() {
    _logType("warn", arguments);
};

vjs.findPosition = function(el) {
    var box, docEl, body, clientLeft, scrollLeft, left, clientTop, scrollTop, top;
    if (el.getBoundingClientRect && el.parentNode) {
        box = el.getBoundingClientRect();
    }
    if (!box) {
        return {
            left: 0,
            top: 0
        };
    }
    docEl = document.documentElement;
    body = document.body;
    clientLeft = docEl.clientLeft || body.clientLeft || 0;
    scrollLeft = window.pageXOffset || body.scrollLeft;
    left = box.left + scrollLeft - clientLeft;
    clientTop = docEl.clientTop || body.clientTop || 0;
    scrollTop = window.pageYOffset || body.scrollTop;
    top = box.top + scrollTop - clientTop;
    return {
        left: vjs.round(left),
        top: vjs.round(top)
    };
};

vjs.arr = {};

vjs.arr.forEach = function(array, callback, thisArg) {
    if (vjs.obj.isArray(array) && callback instanceof Function) {
        for (var i = 0, len = array.length; i < len; ++i) {
            callback.call(thisArg || vjs, array[i], i, array);
        }
    }
    return array;
};

vjs.util = {};

vjs.util.mergeOptions = function(obj1, obj2) {
    var key, val1, val2;
    obj1 = vjs.obj.copy(obj1);
    for (key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            val1 = obj1[key];
            val2 = obj2[key];
            if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
                obj1[key] = vjs.util.mergeOptions(val1, val2);
            } else {
                obj1[key] = obj2[key];
            }
        }
    }
    return obj1;
};

vjs.Component = vjs.CoreObject.extend({
    init: function(player, options, ready) {
        this.player_ = player;
        this.options_ = vjs.obj.copy(this.options_);
        options = this.options(options);
        this.id_ = options["id"] || (options["el"] && options["el"]["id"] ? options["el"]["id"] : player.id() + "_component_" + vjs.guid++);
        this.name_ = options["name"] || null;
        this.el_ = options["el"] || this.createEl();
        this.children_ = [];
        this.childIndex_ = {};
        this.childNameIndex_ = {};
        this.initChildren();
        this.ready(ready);
        if (options.reportTouchActivity !== false) {
            this.enableTouchActivity();
        }
    }
});

vjs.Component.prototype.dispose = function() {
    this.trigger({
        type: "dispose",
        bubbles: false
    });
    if (this.children_) {
        for (var i = this.children_.length - 1; i >= 0; i--) {
            if (this.children_[i].dispose) {
                this.children_[i].dispose();
            }
        }
    }
    this.children_ = null;
    this.childIndex_ = null;
    this.childNameIndex_ = null;
    this.off();
    if (this.el_.parentNode) {
        this.el_.parentNode.removeChild(this.el_);
    }
    vjs.removeData(this.el_);
    this.el_ = null;
};

vjs.Component.prototype.player_ = true;

vjs.Component.prototype.player = function() {
    return this.player_;
};

vjs.Component.prototype.options_;

vjs.Component.prototype.options = function(obj) {
    if (obj === undefined) return this.options_;
    return this.options_ = vjs.util.mergeOptions(this.options_, obj);
};

vjs.Component.prototype.el_;

vjs.Component.prototype.createEl = function(tagName, attributes) {
    return vjs.createEl(tagName, attributes);
};

vjs.Component.prototype.localize = function(string) {
    var lang = this.player_.language(), languages = this.player_.languages();
    if (languages && languages[lang] && languages[lang][string]) {
        return languages[lang][string];
    }
    return string;
};

vjs.Component.prototype.el = function() {
    return this.el_;
};

vjs.Component.prototype.contentEl_;

vjs.Component.prototype.contentEl = function() {
    return this.contentEl_ || this.el_;
};

vjs.Component.prototype.id_;

vjs.Component.prototype.id = function() {
    return this.id_;
};

vjs.Component.prototype.name_;

vjs.Component.prototype.name = function() {
    return this.name_;
};

vjs.Component.prototype.children_;

vjs.Component.prototype.children = function() {
    return this.children_;
};

vjs.Component.prototype.childIndex_;

vjs.Component.prototype.getChildById = function(id) {
    return this.childIndex_[id];
};

vjs.Component.prototype.childNameIndex_;

vjs.Component.prototype.getChild = function(name) {
    return this.childNameIndex_[name];
};

vjs.Component.prototype.addChild = function(child, options) {
    var component, componentClass, componentName, componentId;
    if (typeof child === "string") {
        componentName = child;
        options = options || {};
        componentClass = options["componentClass"] || vjs.capitalize(componentName);
        options["name"] = componentName;
        component = new window["videojs"][componentClass](this.player_ || this, options);
    } else {
        component = child;
    }
    this.children_.push(component);
    if (typeof component.id === "function") {
        this.childIndex_[component.id()] = component;
    }
    componentName = componentName || component.name && component.name();
    if (componentName) {
        this.childNameIndex_[componentName] = component;
    }
    if (typeof component["el"] === "function" && component["el"]()) {
        this.contentEl().appendChild(component["el"]());
    }
    return component;
};

vjs.Component.prototype.removeChild = function(component) {
    if (typeof component === "string") {
        component = this.getChild(component);
    }
    if (!component || !this.children_) return;
    var childFound = false;
    for (var i = this.children_.length - 1; i >= 0; i--) {
        if (this.children_[i] === component) {
            childFound = true;
            this.children_.splice(i, 1);
            break;
        }
    }
    if (!childFound) return;
    this.childIndex_[component.id] = null;
    this.childNameIndex_[component.name] = null;
    var compEl = component.el();
    if (compEl && compEl.parentNode === this.contentEl()) {
        this.contentEl().removeChild(component.el());
    }
};

vjs.Component.prototype.initChildren = function() {
    var parent, children, child, name, opts;
    parent = this;
    children = this.options()["children"];
    if (children) {
        if (vjs.obj.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (typeof child == "string") {
                    name = child;
                    opts = {};
                } else {
                    name = child.name;
                    opts = child;
                }
                parent[name] = parent.addChild(name, opts);
            }
        } else {
            vjs.obj.each(children, function(name, opts) {
                if (opts === false) return;
                parent[name] = parent.addChild(name, opts);
            });
        }
    }
};

vjs.Component.prototype.buildCSSClass = function() {
    return "";
};

vjs.Component.prototype.on = function(type, fn) {
    vjs.on(this.el_, type, vjs.bind(this, fn));
    return this;
};

vjs.Component.prototype.off = function(type, fn) {
    vjs.off(this.el_, type, fn);
    return this;
};

vjs.Component.prototype.one = function(type, fn) {
    vjs.one(this.el_, type, vjs.bind(this, fn));
    return this;
};

vjs.Component.prototype.trigger = function(event) {
    vjs.trigger(this.el_, event);
    return this;
};

vjs.Component.prototype.isReady_;

vjs.Component.prototype.isReadyOnInitFinish_ = true;

vjs.Component.prototype.readyQueue_;

vjs.Component.prototype.ready = function(fn) {
    if (fn) {
        if (this.isReady_) {
            fn.call(this);
        } else {
            if (this.readyQueue_ === undefined) {
                this.readyQueue_ = [];
            }
            this.readyQueue_.push(fn);
        }
    }
    return this;
};

vjs.Component.prototype.triggerReady = function() {
    this.isReady_ = true;
    var readyQueue = this.readyQueue_;
    if (readyQueue && readyQueue.length > 0) {
        for (var i = 0, j = readyQueue.length; i < j; i++) {
            readyQueue[i].call(this);
        }
        this.readyQueue_ = [];
        this.trigger("ready");
    }
};

vjs.Component.prototype.addClass = function(classToAdd) {
    vjs.addClass(this.el_, classToAdd);
    return this;
};

vjs.Component.prototype.removeClass = function(classToRemove) {
    vjs.removeClass(this.el_, classToRemove);
    return this;
};

vjs.Component.prototype.show = function() {
    this.el_.style.display = "block";
    return this;
};

vjs.Component.prototype.hide = function() {
    this.el_.style.display = "none";
    return this;
};

vjs.Component.prototype.lockShowing = function() {
    this.addClass("vjs-lock-showing");
    return this;
};

vjs.Component.prototype.unlockShowing = function() {
    this.removeClass("vjs-lock-showing");
    return this;
};

vjs.Component.prototype.disable = function() {
    this.hide();
    this.show = function() {};
};

vjs.Component.prototype.width = function(num, skipListeners) {
    return this.dimension("width", num, skipListeners);
};

vjs.Component.prototype.height = function(num, skipListeners) {
    return this.dimension("height", num, skipListeners);
};

vjs.Component.prototype.dimensions = function(width, height) {
    return this.width(width, true).height(height);
};

vjs.Component.prototype.dimension = function(widthOrHeight, num, skipListeners) {
    if (num !== undefined) {
        if (("" + num).indexOf("%") !== -1 || ("" + num).indexOf("px") !== -1) {
            this.el_.style[widthOrHeight] = num;
        } else if (num === "auto") {
            this.el_.style[widthOrHeight] = "";
        } else {
            this.el_.style[widthOrHeight] = num + "px";
        }
        if (!skipListeners) {
            this.trigger("resize");
        }
        return this;
    }
    if (!this.el_) return 0;
    var val = this.el_.style[widthOrHeight];
    var pxIndex = val.indexOf("px");
    if (pxIndex !== -1) {
        return parseInt(val.slice(0, pxIndex), 10);
    } else {
        return parseInt(this.el_["offset" + vjs.capitalize(widthOrHeight)], 10);
    }
};

vjs.Component.prototype.onResize;

vjs.Component.prototype.emitTapEvents = function() {
    var touchStart, firstTouch, touchTime, couldBeTap, noTap, xdiff, ydiff, touchDistance, tapMovementThreshold;
    touchStart = 0;
    firstTouch = null;
    tapMovementThreshold = 22;
    this.on("touchstart", function(event) {
        if (event.touches.length === 1) {
            firstTouch = event.touches[0];
            touchStart = new Date().getTime();
            couldBeTap = true;
        }
    });
    this.on("touchmove", function(event) {
        if (event.touches.length > 1) {
            couldBeTap = false;
        } else if (firstTouch) {
            xdiff = event.touches[0].pageX - firstTouch.pageX;
            ydiff = event.touches[0].pageY - firstTouch.pageY;
            touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
            if (touchDistance > tapMovementThreshold) {
                couldBeTap = false;
            }
        }
    });
    noTap = function() {
        couldBeTap = false;
    };
    this.on("touchleave", noTap);
    this.on("touchcancel", noTap);
    this.on("touchend", function(event) {
        firstTouch = null;
        if (couldBeTap === true) {
            touchTime = new Date().getTime() - touchStart;
            if (touchTime < 250) {
                event.preventDefault();
                this.trigger("tap");
            }
        }
    });
};

vjs.Component.prototype.enableTouchActivity = function() {
    var report, touchHolding, touchEnd;
    report = vjs.bind(this.player(), this.player().reportUserActivity);
    this.on("touchstart", function() {
        report();
        clearInterval(touchHolding);
        touchHolding = setInterval(report, 250);
    });
    touchEnd = function(event) {
        report();
        clearInterval(touchHolding);
    };
    this.on("touchmove", report);
    this.on("touchend", touchEnd);
    this.on("touchcancel", touchEnd);
};

vjs.Button = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        this.emitTapEvents();
        this.on("tap", this.onClick);
        this.on("click", this.onClick);
        this.on("focus", this.onFocus);
        this.on("blur", this.onBlur);
    }
});

vjs.Button.prototype.createEl = function(type, props) {
    var el;
    props = vjs.obj.merge({
        className: this.buildCSSClass(),
        role: "button",
        "aria-live": "polite",
        tabIndex: 0
    }, props);
    el = vjs.Component.prototype.createEl.call(this, type, props);
    if (!props.innerHTML) {
        this.contentEl_ = vjs.createEl("div", {
            className: "vjs-control-content"
        });
        this.controlText_ = vjs.createEl("span", {
            className: "vjs-control-text",
            innerHTML: this.localize(this.buttonText) || "Need Text"
        });
        this.contentEl_.appendChild(this.controlText_);
        el.appendChild(this.contentEl_);
    }
    return el;
};

vjs.Button.prototype.buildCSSClass = function() {
    return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this);
};

vjs.Button.prototype.onClick = function() {};

vjs.Button.prototype.onFocus = function() {
    vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
};

vjs.Button.prototype.onKeyPress = function(event) {
    if (event.which == 32 || event.which == 13) {
        event.preventDefault();
        this.onClick();
    }
};

vjs.Button.prototype.onBlur = function() {
    vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
};

vjs.Slider = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        this.bar = this.getChild(this.options_["barName"]);
        this.handle = this.getChild(this.options_["handleName"]);
        this.on("mousedown", this.onMouseDown);
        this.on("touchstart", this.onMouseDown);
        this.on("focus", this.onFocus);
        this.on("blur", this.onBlur);
        this.on("click", this.onClick);
        this.player_.on("controlsvisible", vjs.bind(this, this.update));
        player.on(this.playerEvent, vjs.bind(this, this.update));
        this.boundEvents = {};
        this.boundEvents.move = vjs.bind(this, this.onMouseMove);
        this.boundEvents.end = vjs.bind(this, this.onMouseUp);
    }
});

vjs.Slider.prototype.createEl = function(type, props) {
    props = props || {};
    props.className = props.className + " vjs-slider";
    props = vjs.obj.merge({
        role: "slider",
        "aria-valuenow": 0,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        tabIndex: 0
    }, props);
    return vjs.Component.prototype.createEl.call(this, type, props);
};

vjs.Slider.prototype.onMouseDown = function(event) {
    event.preventDefault();
    vjs.blockTextSelection();
    this.addClass("vjs-sliding");
    vjs.on(document, "mousemove", this.boundEvents.move);
    vjs.on(document, "mouseup", this.boundEvents.end);
    vjs.on(document, "touchmove", this.boundEvents.move);
    vjs.on(document, "touchend", this.boundEvents.end);
    this.onMouseMove(event);
};

vjs.Slider.prototype.onMouseMove = function() {};

vjs.Slider.prototype.onMouseUp = function() {
    vjs.unblockTextSelection();
    this.removeClass("vjs-sliding");
    vjs.off(document, "mousemove", this.boundEvents.move, false);
    vjs.off(document, "mouseup", this.boundEvents.end, false);
    vjs.off(document, "touchmove", this.boundEvents.move, false);
    vjs.off(document, "touchend", this.boundEvents.end, false);
    this.update();
};

vjs.Slider.prototype.update = function() {
    if (!this.el_) return;
    var barProgress, progress = this.getPercent(), handle = this.handle, bar = this.bar;
    if (isNaN(progress)) {
        progress = 0;
    }
    barProgress = progress;
    if (handle) {
        var box = this.el_, boxWidth = box.offsetWidth, handleWidth = handle.el().offsetWidth, handlePercent = handleWidth ? handleWidth / boxWidth : 0, boxAdjustedPercent = 1 - handlePercent, adjustedProgress = progress * boxAdjustedPercent;
        barProgress = adjustedProgress + handlePercent / 2;
        handle.el().style.left = vjs.round(adjustedProgress * 100, 2) + "%";
    }
    if (bar) {
        bar.el().style.width = vjs.round(barProgress * 100, 2) + "%";
    }
};

vjs.Slider.prototype.calculateDistance = function(event) {
    var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;
    el = this.el_;
    box = vjs.findPosition(el);
    boxW = boxH = el.offsetWidth;
    handle = this.handle;
    if (this.options()["vertical"]) {
        boxY = box.top;
        if (event.changedTouches) {
            pageY = event.changedTouches[0].pageY;
        } else {
            pageY = event.pageY;
        }
        if (handle) {
            var handleH = handle.el().offsetHeight;
            boxY = boxY + handleH / 2;
            boxH = boxH - handleH;
        }
        return Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
    } else {
        boxX = box.left;
        if (event.changedTouches) {
            pageX = event.changedTouches[0].pageX;
        } else {
            pageX = event.pageX;
        }
        if (handle) {
            var handleW = handle.el().offsetWidth;
            boxX = boxX + handleW / 2;
            boxW = boxW - handleW;
        }
        return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
    }
};

vjs.Slider.prototype.onFocus = function() {
    vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
};

vjs.Slider.prototype.onKeyPress = function(event) {
    if (event.which == 37 || event.which == 40) {
        event.preventDefault();
        this.stepBack();
    } else if (event.which == 38 || event.which == 39) {
        event.preventDefault();
        this.stepForward();
    }
};

vjs.Slider.prototype.onBlur = function() {
    vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
};

vjs.Slider.prototype.onClick = function(event) {
    event.stopImmediatePropagation();
    event.preventDefault();
};

vjs.SliderHandle = vjs.Component.extend();

vjs.SliderHandle.prototype.defaultValue = 0;

vjs.SliderHandle.prototype.createEl = function(type, props) {
    props = props || {};
    props.className = props.className + " vjs-slider-handle";
    props = vjs.obj.merge({
        innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
    }, props);
    return vjs.Component.prototype.createEl.call(this, "div", props);
};

vjs.Menu = vjs.Component.extend();

vjs.Menu.prototype.addItem = function(component) {
    this.addChild(component);
    component.on("click", vjs.bind(this, function() {
        this.unlockShowing();
    }));
};

vjs.Menu.prototype.createEl = function() {
    var contentElType = this.options().contentElType || "ul";
    this.contentEl_ = vjs.createEl(contentElType, {
        className: "vjs-menu-content"
    });
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        append: this.contentEl_,
        className: "vjs-menu"
    });
    el.appendChild(this.contentEl_);
    vjs.on(el, "click", function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    return el;
};

vjs.MenuItem = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
        this.selected(options["selected"]);
    }
});

vjs.MenuItem.prototype.createEl = function(type, props) {
    return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({
        className: "vjs-menu-item",
        innerHTML: this.options_["label"]
    }, props));
};

vjs.MenuItem.prototype.onClick = function() {
    this.selected(true);
};

vjs.MenuItem.prototype.selected = function(selected) {
    if (selected) {
        this.addClass("vjs-selected");
        this.el_.setAttribute("aria-selected", true);
    } else {
        this.removeClass("vjs-selected");
        this.el_.setAttribute("aria-selected", false);
    }
};

vjs.MenuButton = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
        this.menu = this.createMenu();
        this.addChild(this.menu);
        if (this.items && this.items.length === 0) {
            this.hide();
        }
        this.on("keyup", this.onKeyPress);
        this.el_.setAttribute("aria-haspopup", true);
        this.el_.setAttribute("role", "button");
    }
});

vjs.MenuButton.prototype.buttonPressed_ = false;

vjs.MenuButton.prototype.createMenu = function() {
    var menu = new vjs.Menu(this.player_);
    if (this.options().title) {
        menu.contentEl().appendChild(vjs.createEl("li", {
            className: "vjs-menu-title",
            innerHTML: vjs.capitalize(this.options().title),
            tabindex: -1
        }));
    }
    this.items = this["createItems"]();
    if (this.items) {
        for (var i = 0; i < this.items.length; i++) {
            menu.addItem(this.items[i]);
        }
    }
    return menu;
};

vjs.MenuButton.prototype.createItems = function() {};

vjs.MenuButton.prototype.buildCSSClass = function() {
    return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.MenuButton.prototype.onFocus = function() {};

vjs.MenuButton.prototype.onBlur = function() {};

vjs.MenuButton.prototype.onClick = function() {
    this.one("mouseout", vjs.bind(this, function() {
        this.menu.unlockShowing();
        this.el_.blur();
    }));
    if (this.buttonPressed_) {
        this.unpressButton();
    } else {
        this.pressButton();
    }
};

vjs.MenuButton.prototype.onKeyPress = function(event) {
    event.preventDefault();
    if (event.which == 32 || event.which == 13) {
        if (this.buttonPressed_) {
            this.unpressButton();
        } else {
            this.pressButton();
        }
    } else if (event.which == 27) {
        if (this.buttonPressed_) {
            this.unpressButton();
        }
    }
};

vjs.MenuButton.prototype.pressButton = function() {
    this.buttonPressed_ = true;
    this.menu.lockShowing();
    this.el_.setAttribute("aria-pressed", true);
    if (this.items && this.items.length > 0) {
        this.items[0].el().focus();
    }
};

vjs.MenuButton.prototype.unpressButton = function() {
    this.buttonPressed_ = false;
    this.menu.unlockShowing();
    this.el_.setAttribute("aria-pressed", false);
};

vjs.MediaError = function(code) {
    if (typeof code === "number") {
        this.code = code;
    } else if (typeof code === "string") {
        this.message = code;
    } else if (typeof code === "object") {
        vjs.obj.merge(this, code);
    }
    if (!this.message) {
        this.message = vjs.MediaError.defaultMessages[this.code] || "";
    }
};

vjs.MediaError.prototype.code = 0;

vjs.MediaError.prototype.message = "";

vjs.MediaError.prototype.status = null;

vjs.MediaError.errorTypes = [ "MEDIA_ERR_CUSTOM", "MEDIA_ERR_ABORTED", "MEDIA_ERR_NETWORK", "MEDIA_ERR_DECODE", "MEDIA_ERR_SRC_NOT_SUPPORTED", "MEDIA_ERR_ENCRYPTED" ];

vjs.MediaError.defaultMessages = {
    1: "You aborted the video playback",
    2: "A network error caused the video download to fail part-way.",
    3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
    4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
    5: "The video is encrypted and we do not have the keys to decrypt it."
};

for (var errNum = 0; errNum < vjs.MediaError.errorTypes.length; errNum++) {
    vjs.MediaError[vjs.MediaError.errorTypes[errNum]] = errNum;
    vjs.MediaError.prototype[vjs.MediaError.errorTypes[errNum]] = errNum;
}

(function() {
    var apiMap, specApi, browserApi, i;
    vjs.browser.fullscreenAPI;
    apiMap = [ [ "requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror" ], [ "webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror" ], [ "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror" ], [ "mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror" ], [ "msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError" ] ];
    specApi = apiMap[0];
    for (i = 0; i < apiMap.length; i++) {
        if (apiMap[i][1] in document) {
            browserApi = apiMap[i];
            break;
        }
    }
    if (browserApi) {
        vjs.browser.fullscreenAPI = {};
        for (i = 0; i < browserApi.length; i++) {
            vjs.browser.fullscreenAPI[specApi[i]] = browserApi[i];
        }
    }
})();

vjs.Player = vjs.Component.extend({
    init: function(tag, options, ready) {
        this.tag = tag;
        tag.id = tag.id || "vjs_video_" + vjs.guid++;
        this.tagAttributes = tag && vjs.getElementAttributes(tag);
        options = vjs.obj.merge(this.getTagSettings(tag), options);
        this.language_ = options["language"] || vjs.options["language"];
        this.languages_ = options["languages"] || vjs.options["languages"];
        this.cache_ = {};
        this.poster_ = options["poster"];
        this.controls_ = options["controls"];
        tag.controls = false;
        options.reportTouchActivity = false;
        vjs.Component.call(this, this, options, ready);
        if (this.controls()) {
            this.addClass("vjs-controls-enabled");
        } else {
            this.addClass("vjs-controls-disabled");
        }
        vjs.players[this.id_] = this;
        if (options["plugins"]) {
            vjs.obj.each(options["plugins"], function(key, val) {
                this[key](val);
            }, this);
        }
        this.listenForUserActivity();
    }
});

vjs.Player.prototype.language_;

vjs.Player.prototype.language = function(languageCode) {
    if (languageCode === undefined) {
        return this.language_;
    }
    this.language_ = languageCode;
    return this;
};

vjs.Player.prototype.languages_;

vjs.Player.prototype.languages = function() {
    return this.languages_;
};

vjs.Player.prototype.options_ = vjs.options;

vjs.Player.prototype.dispose = function() {
    this.trigger("dispose");
    this.off("dispose");
    vjs.players[this.id_] = null;
    if (this.tag && this.tag["player"]) {
        this.tag["player"] = null;
    }
    if (this.el_ && this.el_["player"]) {
        this.el_["player"] = null;
    }
    this.stopTrackingProgress();
    this.stopTrackingCurrentTime();
    if (this.tech) {
        this.tech.dispose();
    }
    vjs.Component.prototype.dispose.call(this);
};

vjs.Player.prototype.getTagSettings = function(tag) {
    var options = {
        sources: [],
        tracks: []
    };
    vjs.obj.merge(options, vjs.getElementAttributes(tag));
    if (tag.hasChildNodes()) {
        var children, child, childName, i, j;
        children = tag.childNodes;
        for (i = 0, j = children.length; i < j; i++) {
            child = children[i];
            childName = child.nodeName.toLowerCase();
            if (childName === "source") {
                options["sources"].push(vjs.getElementAttributes(child));
            } else if (childName === "track") {
                options["tracks"].push(vjs.getElementAttributes(child));
            }
        }
    }
    return options;
};

vjs.Player.prototype.createEl = function() {
    var el = this.el_ = vjs.Component.prototype.createEl.call(this, "div"), tag = this.tag, attrs;
    tag.removeAttribute("width");
    tag.removeAttribute("height");
    if (tag.hasChildNodes()) {
        var nodes, nodesLength, i, node, nodeName, removeNodes;
        nodes = tag.childNodes;
        nodesLength = nodes.length;
        removeNodes = [];
        while (nodesLength--) {
            node = nodes[nodesLength];
            nodeName = node.nodeName.toLowerCase();
            if (nodeName === "track") {
                removeNodes.push(node);
            }
        }
        for (i = 0; i < removeNodes.length; i++) {
            tag.removeChild(removeNodes[i]);
        }
    }
    attrs = vjs.getElementAttributes(tag);
    vjs.obj.each(attrs, function(attr) {
        el.setAttribute(attr, attrs[attr]);
    });
    tag.id += "_html5_api";
    tag.className = "vjs-tech";
    tag["player"] = el["player"] = this;
    this.addClass("vjs-paused");
    this.width(this.options_["width"], true);
    this.height(this.options_["height"], true);
    if (tag.parentNode) {
        tag.parentNode.insertBefore(el, tag);
    }
    vjs.insertFirst(tag, el);
    this.el_ = el;
    this.on("loadstart", this.onLoadStart);
    this.on("waiting", this.onWaiting);
    this.on([ "canplay", "canplaythrough", "playing", "ended" ], this.onWaitEnd);
    this.on("seeking", this.onSeeking);
    this.on("seeked", this.onSeeked);
    this.on("ended", this.onEnded);
    this.on("play", this.onPlay);
    this.on("firstplay", this.onFirstPlay);
    this.on("pause", this.onPause);
    this.on("progress", this.onProgress);
    this.on("durationchange", this.onDurationChange);
    this.on("fullscreenchange", this.onFullscreenChange);
    return el;
};

vjs.Player.prototype.loadTech = function(techName, source) {
    if (this.tech) {
        this.unloadTech();
    }
    if (techName !== "Html5" && this.tag) {
        vjs.Html5.disposeMediaElement(this.tag);
        this.tag = null;
    }
    this.techName = techName;
    this.isReady_ = false;
    var techReady = function() {
        this.player_.triggerReady();
        if (!this.features["progressEvents"]) {
            this.player_.manualProgressOn();
        }
        if (!this.features["timeupdateEvents"]) {
            this.player_.manualTimeUpdatesOn();
        }
    };
    var techOptions = vjs.obj.merge({
        source: source,
        parentEl: this.el_
    }, this.options_[techName.toLowerCase()]);
    if (source) {
        this.currentType_ = source.type;
        if (source.src == this.cache_.src && this.cache_.currentTime > 0) {
            techOptions["startTime"] = this.cache_.currentTime;
        }
        this.cache_.src = source.src;
    }
    this.tech = new window["videojs"][techName](this, techOptions);
    this.tech.ready(techReady);
};

vjs.Player.prototype.unloadTech = function() {
    this.isReady_ = false;
    if (this.manualProgress) {
        this.manualProgressOff();
    }
    if (this.manualTimeUpdates) {
        this.manualTimeUpdatesOff();
    }
    this.tech.dispose();
    this.tech = false;
};

vjs.Player.prototype.manualProgressOn = function() {
    this.manualProgress = true;
    this.trackProgress();
    if (this.tech) {
        this.tech.one("progress", function() {
            this.features["progressEvents"] = true;
            this.player_.manualProgressOff();
        });
    }
};

vjs.Player.prototype.manualProgressOff = function() {
    this.manualProgress = false;
    this.stopTrackingProgress();
};

vjs.Player.prototype.trackProgress = function() {
    this.progressInterval = setInterval(vjs.bind(this, function() {
        var bufferedPercent = this.bufferedPercent();
        if (this.cache_.bufferedPercent != bufferedPercent) {
            this.trigger("progress");
        }
        this.cache_.bufferedPercent = bufferedPercent;
        if (bufferedPercent == 1) {
            this.stopTrackingProgress();
        }
    }), 500);
};

vjs.Player.prototype.stopTrackingProgress = function() {
    clearInterval(this.progressInterval);
};

vjs.Player.prototype.manualTimeUpdatesOn = function() {
    this.manualTimeUpdates = true;
    this.on("play", this.trackCurrentTime);
    this.on("pause", this.stopTrackingCurrentTime);
    if (this.tech) {
        this.tech.one("timeupdate", function() {
            this.features["timeupdateEvents"] = true;
            this.player_.manualTimeUpdatesOff();
        });
    }
};

vjs.Player.prototype.manualTimeUpdatesOff = function() {
    this.manualTimeUpdates = false;
    this.stopTrackingCurrentTime();
    this.off("play", this.trackCurrentTime);
    this.off("pause", this.stopTrackingCurrentTime);
};

vjs.Player.prototype.trackCurrentTime = function() {
    if (this.currentTimeInterval) {
        this.stopTrackingCurrentTime();
    }
    this.currentTimeInterval = setInterval(vjs.bind(this, function() {
        this.trigger("timeupdate");
    }), 250);
};

vjs.Player.prototype.stopTrackingCurrentTime = function() {
    clearInterval(this.currentTimeInterval);
    this.trigger("timeupdate");
};

vjs.Player.prototype.onLoadStart = function() {
    this.error(null);
    if (!this.paused()) {
        this.trigger("firstplay");
    } else {
        this.hasStarted(false);
        this.one("play", function() {
            this.hasStarted(true);
        });
    }
};

vjs.Player.prototype.hasStarted_ = false;

vjs.Player.prototype.hasStarted = function(hasStarted) {
    if (hasStarted !== undefined) {
        if (this.hasStarted_ !== hasStarted) {
            this.hasStarted_ = hasStarted;
            if (hasStarted) {
                this.addClass("vjs-has-started");
                this.trigger("firstplay");
            } else {
                this.removeClass("vjs-has-started");
            }
        }
        return this;
    }
    return this.hasStarted_;
};

vjs.Player.prototype.onLoadedMetaData;

vjs.Player.prototype.onLoadedData;

vjs.Player.prototype.onLoadedAllData;

vjs.Player.prototype.onPlay = function() {
    this.removeClass("vjs-paused");
    this.addClass("vjs-playing");
};

vjs.Player.prototype.onWaiting = function() {
    this.addClass("vjs-waiting");
};

vjs.Player.prototype.onWaitEnd = function() {
    this.removeClass("vjs-waiting");
};

vjs.Player.prototype.onSeeking = function() {
    this.addClass("vjs-seeking");
};

vjs.Player.prototype.onSeeked = function() {
    this.removeClass("vjs-seeking");
};

vjs.Player.prototype.onFirstPlay = function() {
    if (this.options_["starttime"]) {
        this.currentTime(this.options_["starttime"]);
    }
    this.addClass("vjs-has-started");
};

vjs.Player.prototype.onPause = function() {
    this.removeClass("vjs-playing");
    this.addClass("vjs-paused");
};

vjs.Player.prototype.onTimeUpdate;

vjs.Player.prototype.onProgress = function() {
    if (this.bufferedPercent() == 1) {
        this.trigger("loadedalldata");
    }
};

vjs.Player.prototype.onEnded = function() {
    if (this.options_["loop"]) {
        this.currentTime(0);
        this.play();
    }
};

vjs.Player.prototype.onDurationChange = function() {
    var duration = this.techGet("duration");
    if (duration) {
        if (duration < 0) {
            duration = Infinity;
        }
        this.duration(duration);
        if (duration === Infinity) {
            this.addClass("vjs-live");
        } else {
            this.removeClass("vjs-live");
        }
    }
};

vjs.Player.prototype.onVolumeChange;

vjs.Player.prototype.onFullscreenChange = function() {
    if (this.isFullscreen()) {
        this.addClass("vjs-fullscreen");
    } else {
        this.removeClass("vjs-fullscreen");
    }
};

vjs.Player.prototype.cache_;

vjs.Player.prototype.getCache = function() {
    return this.cache_;
};

vjs.Player.prototype.techCall = function(method, arg) {
    if (this.tech && !this.tech.isReady_) {
        this.tech.ready(function() {
            this[method](arg);
        });
    } else {
        try {
            this.tech[method](arg);
        } catch (e) {
            vjs.log(e);
            throw e;
        }
    }
};

vjs.Player.prototype.techGet = function(method) {
    if (this.tech && this.tech.isReady_) {
        try {
            return this.tech[method]();
        } catch (e) {
            if (this.tech[method] === undefined) {
                vjs.log("Video.js: " + method + " method not defined for " + this.techName + " playback technology.", e);
            } else {
                if (e.name == "TypeError") {
                    vjs.log("Video.js: " + method + " unavailable on " + this.techName + " playback technology element.", e);
                    this.tech.isReady_ = false;
                } else {
                    vjs.log(e);
                }
            }
            throw e;
        }
    }
    return;
};

vjs.Player.prototype.play = function() {
    this.techCall("play");
    return this;
};

vjs.Player.prototype.pause = function() {
    this.techCall("pause");
    return this;
};

vjs.Player.prototype.paused = function() {
    return this.techGet("paused") === false ? false : true;
};

vjs.Player.prototype.currentTime = function(seconds) {
    if (seconds !== undefined) {
        this.techCall("setCurrentTime", seconds);
        if (this.manualTimeUpdates) {
            this.trigger("timeupdate");
        }
        return this;
    }
    return this.cache_.currentTime = this.techGet("currentTime") || 0;
};

vjs.Player.prototype.duration = function(seconds) {
    if (seconds !== undefined) {
        this.cache_.duration = parseFloat(seconds);
        return this;
    }
    if (this.cache_.duration === undefined) {
        this.onDurationChange();
    }
    return this.cache_.duration || 0;
};

vjs.Player.prototype.remainingTime = function() {
    return this.duration() - this.currentTime();
};

vjs.Player.prototype.buffered = function() {
    var buffered = this.techGet("buffered");
    if (!buffered || !buffered.length) {
        buffered = vjs.createTimeRange(0, 0);
    }
    return buffered;
};

vjs.Player.prototype.bufferedPercent = function() {
    var duration = this.duration(), buffered = this.buffered(), bufferedDuration = 0, start, end;
    if (!duration) {
        return 0;
    }
    for (var i = 0; i < buffered.length; i++) {
        start = buffered.start(i);
        end = buffered.end(i);
        if (end > duration) {
            end = duration;
        }
        bufferedDuration += end - start;
    }
    return bufferedDuration / duration;
};

vjs.Player.prototype.bufferedEnd = function() {
    var buffered = this.buffered(), duration = this.duration(), end = buffered.end(buffered.length - 1);
    if (end > duration) {
        end = duration;
    }
    return end;
};

vjs.Player.prototype.volume = function(percentAsDecimal) {
    var vol;
    if (percentAsDecimal !== undefined) {
        vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
        this.cache_.volume = vol;
        this.techCall("setVolume", vol);
        vjs.setLocalStorage("volume", vol);
        return this;
    }
    vol = parseFloat(this.techGet("volume"));
    return isNaN(vol) ? 1 : vol;
};

vjs.Player.prototype.muted = function(muted) {
    if (muted !== undefined) {
        this.techCall("setMuted", muted);
        return this;
    }
    return this.techGet("muted") || false;
};

vjs.Player.prototype.supportsFullScreen = function() {
    return this.techGet("supportsFullScreen") || false;
};

vjs.Player.prototype.isFullscreen_ = false;

vjs.Player.prototype.isFullscreen = function(isFS) {
    if (isFS !== undefined) {
        this.isFullscreen_ = !!isFS;
        return this;
    }
    return this.isFullscreen_;
};

vjs.Player.prototype.isFullScreen = function(isFS) {
    vjs.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');
    return this.isFullscreen(isFS);
};

vjs.Player.prototype.requestFullscreen = function() {
    var fsApi = vjs.browser.fullscreenAPI;
    this.isFullscreen(true);
    if (fsApi) {
        vjs.on(document, fsApi["fullscreenchange"], vjs.bind(this, function(e) {
            this.isFullscreen(document[fsApi.fullscreenElement]);
            if (this.isFullscreen() === false) {
                vjs.off(document, fsApi["fullscreenchange"], arguments.callee);
            }
            this.trigger("fullscreenchange");
        }));
        this.el_[fsApi.requestFullscreen]();
    } else if (this.tech.supportsFullScreen()) {
        this.techCall("enterFullScreen");
    } else {
        this.enterFullWindow();
        this.trigger("fullscreenchange");
    }
    return this;
};

vjs.Player.prototype.requestFullwindow = function() {
    var fsApi = vjs.browser.fullscreenAPI;
    this.isFullscreen(true);
    this.enterFullWindow();
    this.trigger("fullscreenchange");
    return this;
};

vjs.Player.prototype.requestFullScreen = function() {
    vjs.log.warn('player.requestFullScreen() has been deprecated, use player.requestFullscreen() with a lowercase "s")');
    return this.requestFullscreen();
};

vjs.Player.prototype.exitFullscreen = function() {
    var fsApi = vjs.browser.fullscreenAPI;
    this.isFullscreen(false);
    if (fsApi) {
        document[fsApi.exitFullscreen]();
    } else if (this.tech.supportsFullScreen()) {
        this.techCall("exitFullScreen");
    } else {
        this.exitFullWindow();
        this.trigger("fullscreenchange");
    }
    return this;
};

vjs.Player.prototype.cancelFullScreen = function() {
    vjs.log.warn("player.cancelFullScreen() has been deprecated, use player.exitFullscreen()");
    return this.exitFullscreen();
};

vjs.Player.prototype.enterFullWindow = function() {
    this.isFullWindow = true;
    this.docOrigOverflow = document.documentElement.style.overflow;
    vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey));
    document.documentElement.style.overflow = "hidden";
    vjs.addClass(document.body, "vjs-full-window");
    this.trigger("enterFullWindow");
};

vjs.Player.prototype.fullWindowOnEscKey = function(event) {
    if (event.keyCode === 27) {
        if (this.isFullscreen() === true) {
            this.exitFullscreen();
        } else {
            this.exitFullWindow();
        }
    }
};

vjs.Player.prototype.exitFullWindow = function() {
    this.isFullWindow = false;
    vjs.off(document, "keydown", this.fullWindowOnEscKey);
    document.documentElement.style.overflow = this.docOrigOverflow;
    vjs.removeClass(document.body, "vjs-full-window");
    this.trigger("exitFullWindow");
};

vjs.Player.prototype.selectSource = function(sources) {
    for (var i = 0, j = this.options_["techOrder"]; i < j.length; i++) {
        var techName = vjs.capitalize(j[i]), tech = window["videojs"][techName];
        if (!tech) {
            vjs.log.error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
            continue;
        }
        if (tech.isSupported()) {
            for (var a = 0, b = sources; a < b.length; a++) {
                var source = b[a];
                if (tech["canPlaySource"](source)) {
                    return {
                        source: source,
                        tech: techName
                    };
                }
            }
        }
    }
    return false;
};

vjs.Player.prototype.src = function(source) {
    if (source === undefined) {
        return this.techGet("src");
    }
    if (vjs.obj.isArray(source)) {
        this.sourceList_(source);
    } else if (typeof source === "string") {
        this.src({
            src: source
        });
    } else if (source instanceof Object) {
        if (source.type && !window["videojs"][this.techName]["canPlaySource"](source)) {
            this.sourceList_([ source ]);
        } else {
            this.cache_.src = source.src;
            this.currentType_ = source.type || "";
            this.ready(function() {
                this.techCall("src", source.src);
                if (this.options_["preload"] == "auto") {
                    this.load();
                }
                if (this.options_["autoplay"]) {
                    this.play();
                }
            });
        }
    }
    return this;
};

vjs.Player.prototype.sourceList_ = function(sources) {
    var sourceTech = this.selectSource(sources);
    if (sourceTech) {
        if (sourceTech.tech === this.techName) {
            this.src(sourceTech.source);
        } else {
            this.loadTech(sourceTech.tech, sourceTech.source);
        }
    } else {
        this.error({
            code: 4,
            message: this.options()["notSupportedMessage"]
        });
        this.triggerReady();
    }
};

vjs.Player.prototype.load = function() {
    this.techCall("load");
    return this;
};

vjs.Player.prototype.currentSrc = function() {
    return this.techGet("currentSrc") || this.cache_.src || "";
};

vjs.Player.prototype.currentType = function() {
    return this.currentType_ || "";
};

vjs.Player.prototype.preload = function(value) {
    if (value !== undefined) {
        this.techCall("setPreload", value);
        this.options_["preload"] = value;
        return this;
    }
    return this.techGet("preload");
};

vjs.Player.prototype.autoplay = function(value) {
    if (value !== undefined) {
        this.techCall("setAutoplay", value);
        this.options_["autoplay"] = value;
        return this;
    }
    return this.techGet("autoplay", value);
};

vjs.Player.prototype.loop = function(value) {
    if (value !== undefined) {
        this.techCall("setLoop", value);
        this.options_["loop"] = value;
        return this;
    }
    return this.techGet("loop");
};

vjs.Player.prototype.poster_;

vjs.Player.prototype.poster = function(src) {
    if (src === undefined) {
        return this.poster_;
    }
    this.poster_ = src;
    this.techCall("setPoster", src);
    this.trigger("posterchange");
};

vjs.Player.prototype.controls_;

vjs.Player.prototype.controls = function(bool) {
    if (bool !== undefined) {
        bool = !!bool;
        if (this.controls_ !== bool) {
            this.controls_ = bool;
            if (bool) {
                this.removeClass("vjs-controls-disabled");
                this.addClass("vjs-controls-enabled");
                this.trigger("controlsenabled");
            } else {
                this.removeClass("vjs-controls-enabled");
                this.addClass("vjs-controls-disabled");
                this.trigger("controlsdisabled");
            }
        }
        return this;
    }
    return this.controls_;
};

vjs.Player.prototype.usingNativeControls_;

vjs.Player.prototype.usingNativeControls = function(bool) {
    if (bool !== undefined) {
        bool = !!bool;
        if (this.usingNativeControls_ !== bool) {
            this.usingNativeControls_ = bool;
            if (bool) {
                this.addClass("vjs-using-native-controls");
                this.trigger("usingnativecontrols");
            } else {
                this.removeClass("vjs-using-native-controls");
                this.trigger("usingcustomcontrols");
            }
        }
        return this;
    }
    return this.usingNativeControls_;
};

vjs.Player.prototype.error_ = null;

vjs.Player.prototype.error = function(err) {
    if (err === undefined) {
        return this.error_;
    }
    if (err === null) {
        this.error_ = err;
        this.removeClass("vjs-error");
        return this;
    }
    if (err instanceof vjs.MediaError) {
        this.error_ = err;
    } else {
        this.error_ = new vjs.MediaError(err);
    }
    this.trigger("error");
    this.addClass("vjs-error");
    vjs.log.error("(CODE:" + this.error_.code + " " + vjs.MediaError.errorTypes[this.error_.code] + ")", this.error_.message, this.error_);
    return this;
};

vjs.Player.prototype.ended = function() {
    return this.techGet("ended");
};

vjs.Player.prototype.seeking = function() {
    return this.techGet("seeking");
};

vjs.Player.prototype.userActivity_ = true;

vjs.Player.prototype.reportUserActivity = function(event) {
    this.userActivity_ = true;
};

vjs.Player.prototype.userActive_ = true;

vjs.Player.prototype.userActive = function(bool) {
    if (bool !== undefined) {
        bool = !!bool;
        if (bool !== this.userActive_) {
            this.userActive_ = bool;
            if (bool) {
                this.userActivity_ = true;
                this.removeClass("vjs-user-inactive");
                this.addClass("vjs-user-active");
                this.trigger("useractive");
            } else {
                this.userActivity_ = false;
                if (this.tech) {
                    this.tech.one("mousemove", function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    });
                }
                this.removeClass("vjs-user-active");
                this.addClass("vjs-user-inactive");
                this.trigger("userinactive");
            }
        }
        return this;
    }
    return this.userActive_;
};

vjs.Player.prototype.listenForUserActivity = function() {
    var onActivity, onMouseMove, onMouseDown, mouseInProgress, onMouseUp, activityCheck, inactivityTimeout, lastMoveX, lastMoveY;
    onActivity = vjs.bind(this, this.reportUserActivity);
    onMouseMove = function(e) {
        if (e.screenX != lastMoveX || e.screenY != lastMoveY) {
            lastMoveX = e.screenX;
            lastMoveY = e.screenY;
            onActivity();
        }
    };
    onMouseDown = function() {
        onActivity();
        clearInterval(mouseInProgress);
        mouseInProgress = setInterval(onActivity, 250);
    };
    onMouseUp = function(event) {
        onActivity();
        clearInterval(mouseInProgress);
    };
    this.on("mousedown", onMouseDown);
    this.on("mousemove", onMouseMove);
    this.on("mouseup", onMouseUp);
    this.on("keydown", onActivity);
    this.on("keyup", onActivity);
    activityCheck = setInterval(vjs.bind(this, function() {
        if (this.userActivity_) {
            this.userActivity_ = false;
            this.userActive(true);
            clearTimeout(inactivityTimeout);
            inactivityTimeout = setTimeout(vjs.bind(this, function() {
                if (!this.userActivity_) {
                    this.userActive(false);
                }
            }), 2e3);
        }
    }), 250);
    this.on("dispose", function() {
        clearInterval(activityCheck);
        clearTimeout(inactivityTimeout);
    });
};

vjs.Player.prototype.playbackRate = function(rate) {
    if (rate !== undefined) {
        this.techCall("setPlaybackRate", rate);
        return this;
    }
    if (this.tech && this.tech.features && this.tech.features["playbackRate"]) {
        return this.techGet("playbackRate");
    } else {
        return 1;
    }
};

vjs.ControlBar = vjs.Component.extend();

vjs.ControlBar.prototype.options_ = {
    loadEvent: "play",
    children: {
        playToggle: {},
        currentTimeDisplay: {},
        timeDivider: {},
        durationDisplay: {},
        remainingTimeDisplay: {},
        liveDisplay: {},
        progressControl: {},
        fullscreenToggle: {},
        volumeControl: {},
        muteToggle: {},
        playbackRateMenuButton: {}
    }
};

vjs.ControlBar.prototype.createEl = function() {
    return vjs.createEl("div", {
        className: "vjs-control-bar"
    });
};

vjs.LiveDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.LiveDisplay.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-live-controls vjs-control"
    });
    this.contentEl_ = vjs.createEl("div", {
        className: "vjs-live-display",
        innerHTML: '<span class="vjs-control-text">' + this.localize("Stream Type") + "</span>" + this.localize("LIVE"),
        "aria-live": "off"
    });
    el.appendChild(this.contentEl_);
    return el;
};

vjs.PlayToggle = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
        player.on("play", vjs.bind(this, this.onPlay));
        player.on("pause", vjs.bind(this, this.onPause));
    }
});

vjs.PlayToggle.prototype.buttonText = "Play";

vjs.PlayToggle.prototype.buildCSSClass = function() {
    return "vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.PlayToggle.prototype.onClick = function() {
    if (this.player_.paused()) {
        this.player_.play();
    } else {
        this.player_.pause();
    }
};

vjs.PlayToggle.prototype.onPlay = function() {
    vjs.removeClass(this.el_, "vjs-paused");
    vjs.addClass(this.el_, "vjs-playing");
    this.el_.children[0].children[0].innerHTML = this.localize("Pause");
};

vjs.PlayToggle.prototype.onPause = function() {
    vjs.removeClass(this.el_, "vjs-playing");
    vjs.addClass(this.el_, "vjs-paused");
    this.el_.children[0].children[0].innerHTML = this.localize("Play");
};

vjs.CurrentTimeDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        player.on("timeupdate", vjs.bind(this, this.updateContent));
    }
});

vjs.CurrentTimeDisplay.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-current-time vjs-time-controls vjs-control"
    });
    this.contentEl_ = vjs.createEl("div", {
        className: "vjs-current-time-display",
        innerHTML: '<span class="vjs-control-text">Current Time </span>' + "0:00",
        "aria-live": "off"
    });
    el.appendChild(this.contentEl_);
    return el;
};

vjs.CurrentTimeDisplay.prototype.updateContent = function() {
    var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Current Time") + "</span> " + vjs.formatTime(time, this.player_.duration());
};

vjs.DurationDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        player.on("timeupdate", vjs.bind(this, this.updateContent));
    }
});

vjs.DurationDisplay.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-duration vjs-time-controls vjs-control"
    });
    this.contentEl_ = vjs.createEl("div", {
        className: "vjs-duration-display",
        innerHTML: '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> " + "0:00",
        "aria-live": "off"
    });
    el.appendChild(this.contentEl_);
    return el;
};

vjs.DurationDisplay.prototype.updateContent = function() {
    var duration = this.player_.duration();
    if (duration) {
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Duration Time") + "</span> " + vjs.formatTime(duration);
    }
};

vjs.TimeDivider = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.TimeDivider.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-time-divider",
        innerHTML: "<div><span>/</span></div>"
    });
};

vjs.RemainingTimeDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        player.on("timeupdate", vjs.bind(this, this.updateContent));
    }
});

vjs.RemainingTimeDisplay.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-remaining-time vjs-time-controls vjs-control"
    });
    this.contentEl_ = vjs.createEl("div", {
        className: "vjs-remaining-time-display",
        innerHTML: '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> " + "-0:00",
        "aria-live": "off"
    });
    el.appendChild(this.contentEl_);
    return el;
};

vjs.RemainingTimeDisplay.prototype.updateContent = function() {
    if (this.player_.duration()) {
        this.contentEl_.innerHTML = '<span class="vjs-control-text">' + this.localize("Remaining Time") + "</span> " + "-" + vjs.formatTime(this.player_.remainingTime());
    }
};

vjs.FullscreenToggle = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
    }
});

vjs.FullscreenToggle.prototype.buttonText = "Fullscreen";

vjs.FullscreenToggle.prototype.buildCSSClass = function() {
    return "vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.FullscreenToggle.prototype.onClick = function() {
    if (!this.player_.isFullscreen()) {
        this.player_.requestFullscreen();
        this.controlText_.innerHTML = this.localize("Non-Fullscreen");
    } else {
        this.player_.exitFullscreen();
        this.controlText_.innerHTML = this.localize("Fullscreen");
    }
};

vjs.ProgressControl = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.ProgressControl.prototype.options_ = {
    children: {
        seekBar: {}
    }
};

vjs.ProgressControl.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-progress-control vjs-control"
    });
};

vjs.SeekBar = vjs.Slider.extend({
    init: function(player, options) {
        vjs.Slider.call(this, player, options);
        player.on("timeupdate", vjs.bind(this, this.updateARIAAttributes));
        player.ready(vjs.bind(this, this.updateARIAAttributes));
    }
});

vjs.SeekBar.prototype.options_ = {
    children: {
        loadProgressBar: {},
        playProgressBar: {},
        seekHandle: {}
    },
    barName: "playProgressBar",
    handleName: "seekHandle"
};

vjs.SeekBar.prototype.playerEvent = "timeupdate";

vjs.SeekBar.prototype.createEl = function() {
    return vjs.Slider.prototype.createEl.call(this, "div", {
        className: "vjs-progress-holder",
        "aria-label": "video progress bar"
    });
};

vjs.SeekBar.prototype.updateARIAAttributes = function() {
    var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.el_.setAttribute("aria-valuenow", vjs.round(this.getPercent() * 100, 2));
    this.el_.setAttribute("aria-valuetext", vjs.formatTime(time, this.player_.duration()));
};

vjs.SeekBar.prototype.getPercent = function() {
    return this.player_.currentTime() / this.player_.duration();
};

vjs.SeekBar.prototype.onMouseDown = function(event) {
    vjs.Slider.prototype.onMouseDown.call(this, event);
    this.player_.scrubbing = true;
    this.videoWasPlaying = !this.player_.paused();
    this.player_.pause();
};

vjs.SeekBar.prototype.onMouseMove = function(event) {
    var newTime = this.calculateDistance(event) * this.player_.duration();
    if (newTime == this.player_.duration()) {
        newTime = newTime - .1;
    }
    this.player_.currentTime(newTime);
};

vjs.SeekBar.prototype.onMouseUp = function(event) {
    vjs.Slider.prototype.onMouseUp.call(this, event);
    this.player_.scrubbing = false;
    if (this.videoWasPlaying) {
        this.player_.play();
    }
};

vjs.SeekBar.prototype.stepForward = function() {
    this.player_.currentTime(this.player_.currentTime() + 5);
};

vjs.SeekBar.prototype.stepBack = function() {
    this.player_.currentTime(this.player_.currentTime() - 5);
};

vjs.LoadProgressBar = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        player.on("progress", vjs.bind(this, this.update));
    }
});

vjs.LoadProgressBar.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-load-progress",
        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Loaded") + "</span>: 0%</span>"
    });
};

vjs.LoadProgressBar.prototype.update = function() {
    var i, start, end, part, buffered = this.player_.buffered(), duration = this.player_.duration(), bufferedEnd = this.player_.bufferedEnd(), children = this.el_.children, percentify = function(time, end) {
        var percent = time / end || 0;
        return percent * 100 + "%";
    };
    this.el_.style.width = percentify(bufferedEnd, duration);
    for (i = 0; i < buffered.length; i++) {
        start = buffered.start(i), end = buffered.end(i), part = children[i];
        if (!part) {
            part = this.el_.appendChild(vjs.createEl());
        }
        part.style.left = percentify(start, bufferedEnd);
        part.style.width = percentify(end - start, bufferedEnd);
    }
    for (i = children.length; i > buffered.length; i--) {
        this.el_.removeChild(children[i - 1]);
    }
};

vjs.PlayProgressBar = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.PlayProgressBar.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-play-progress",
        innerHTML: '<span class="vjs-control-text"><span>' + this.localize("Progress") + "</span>: 0%</span>"
    });
};

vjs.SeekHandle = vjs.SliderHandle.extend({
    init: function(player, options) {
        vjs.SliderHandle.call(this, player, options);
        player.on("timeupdate", vjs.bind(this, this.updateContent));
    }
});

vjs.SeekHandle.prototype.defaultValue = "00:00";

vjs.SeekHandle.prototype.createEl = function() {
    return vjs.SliderHandle.prototype.createEl.call(this, "div", {
        className: "vjs-seek-handle",
        "aria-live": "off"
    });
};

vjs.SeekHandle.prototype.updateContent = function() {
    var time = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
    this.el_.innerHTML = '<span class="vjs-control-text">' + vjs.formatTime(time, this.player_.duration()) + "</span>";
};

vjs.VolumeControl = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        if (player.tech && player.tech.features && player.tech.features["volumeControl"] === false) {
            this.addClass("vjs-hidden");
        }
        player.on("loadstart", vjs.bind(this, function() {
            if (player.tech.features && player.tech.features["volumeControl"] === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        }));
    }
});

vjs.VolumeControl.prototype.options_ = {
    children: {
        volumeBar: {}
    }
};

vjs.VolumeControl.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-volume-control vjs-control"
    });
};

vjs.VolumeBar = vjs.Slider.extend({
    init: function(player, options) {
        vjs.Slider.call(this, player, options);
        player.on("volumechange", vjs.bind(this, this.updateARIAAttributes));
        player.ready(vjs.bind(this, this.updateARIAAttributes));
    }
});

vjs.VolumeBar.prototype.updateARIAAttributes = function() {
    this.el_.setAttribute("aria-valuenow", vjs.round(this.player_.volume() * 100, 2));
    this.el_.setAttribute("aria-valuetext", vjs.round(this.player_.volume() * 100, 2) + "%");
};

vjs.VolumeBar.prototype.options_ = {
    children: {
        volumeLevel: {},
        volumeHandle: {}
    },
    barName: "volumeLevel",
    handleName: "volumeHandle"
};

vjs.VolumeBar.prototype.playerEvent = "volumechange";

vjs.VolumeBar.prototype.createEl = function() {
    return vjs.Slider.prototype.createEl.call(this, "div", {
        className: "vjs-volume-bar",
        "aria-label": "volume level"
    });
};

vjs.VolumeBar.prototype.onMouseMove = function(event) {
    if (this.player_.muted()) {
        this.player_.muted(false);
    }
    this.player_.volume(this.calculateDistance(event));
};

vjs.VolumeBar.prototype.getPercent = function() {
    if (this.player_.muted()) {
        return 0;
    } else {
        return this.player_.volume();
    }
};

vjs.VolumeBar.prototype.stepForward = function() {
    this.player_.volume(this.player_.volume() + .1);
};

vjs.VolumeBar.prototype.stepBack = function() {
    this.player_.volume(this.player_.volume() - .1);
};

vjs.VolumeLevel = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.VolumeLevel.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-volume-level",
        innerHTML: '<span class="vjs-control-text"></span>'
    });
};

vjs.VolumeHandle = vjs.SliderHandle.extend();

vjs.VolumeHandle.prototype.defaultValue = "00:00";

vjs.VolumeHandle.prototype.createEl = function() {
    return vjs.SliderHandle.prototype.createEl.call(this, "div", {
        className: "vjs-volume-handle"
    });
};

vjs.MuteToggle = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
        player.on("volumechange", vjs.bind(this, this.update));
        if (player.tech && player.tech.features && player.tech.features["volumeControl"] === false) {
            this.addClass("vjs-hidden");
        }
        player.on("loadstart", vjs.bind(this, function() {
            if (player.tech.features && player.tech.features["volumeControl"] === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        }));
    }
});

vjs.MuteToggle.prototype.createEl = function() {
    return vjs.Button.prototype.createEl.call(this, "div", {
        className: "vjs-mute-control vjs-control",
        innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"
    });
};

vjs.MuteToggle.prototype.onClick = function() {
    this.player_.muted(this.player_.muted() ? false : true);
};

vjs.MuteToggle.prototype.update = function() {
    var vol = this.player_.volume(), level = 3;
    if (vol === 0 || this.player_.muted()) {
        level = 0;
    } else if (vol < .33) {
        level = 1;
    } else if (vol < .67) {
        level = 2;
    }
    if (this.player_.muted()) {
        if (this.el_.children[0].children[0].innerHTML != this.localize("Unmute")) {
            this.el_.children[0].children[0].innerHTML = this.localize("Unmute");
        }
    } else {
        if (this.el_.children[0].children[0].innerHTML != this.localize("Mute")) {
            this.el_.children[0].children[0].innerHTML = this.localize("Mute");
        }
    }
    for (var i = 0; i < 4; i++) {
        vjs.removeClass(this.el_, "vjs-vol-" + i);
    }
    vjs.addClass(this.el_, "vjs-vol-" + level);
};

vjs.VolumeMenuButton = vjs.MenuButton.extend({
    init: function(player, options) {
        vjs.MenuButton.call(this, player, options);
        player.on("volumechange", vjs.bind(this, this.update));
        if (player.tech && player.tech.features && player.tech.features.volumeControl === false) {
            this.addClass("vjs-hidden");
        }
        player.on("loadstart", vjs.bind(this, function() {
            if (player.tech.features && player.tech.features.volumeControl === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        }));
        this.addClass("vjs-menu-button");
    }
});

vjs.VolumeMenuButton.prototype.createMenu = function() {
    var menu = new vjs.Menu(this.player_, {
        contentElType: "div"
    });
    var vc = new vjs.VolumeBar(this.player_, vjs.obj.merge({
        vertical: true
    }, this.options_.volumeBar));
    menu.addChild(vc);
    return menu;
};

vjs.VolumeMenuButton.prototype.onClick = function() {
    vjs.MuteToggle.prototype.onClick.call(this);
    vjs.MenuButton.prototype.onClick.call(this);
};

vjs.VolumeMenuButton.prototype.createEl = function() {
    return vjs.Button.prototype.createEl.call(this, "div", {
        className: "vjs-volume-menu-button vjs-menu-button vjs-control",
        innerHTML: '<div><span class="vjs-control-text">' + this.localize("Mute") + "</span></div>"
    });
};

vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update;

vjs.PlaybackRateMenuButton = vjs.MenuButton.extend({
    init: function(player, options) {
        vjs.MenuButton.call(this, player, options);
        this.updateVisibility();
        this.updateLabel();
        player.on("loadstart", vjs.bind(this, this.updateVisibility));
        player.on("ratechange", vjs.bind(this, this.updateLabel));
    }
});

vjs.PlaybackRateMenuButton.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-playback-rate vjs-menu-button vjs-control",
        innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + this.localize("Playback Rate") + "</span></div>"
    });
    this.labelEl_ = vjs.createEl("div", {
        className: "vjs-playback-rate-value",
        innerHTML: 1
    });
    el.appendChild(this.labelEl_);
    return el;
};

vjs.PlaybackRateMenuButton.prototype.createMenu = function() {
    var menu = new vjs.Menu(this.player());
    var rates = this.player().options()["playbackRates"];
    if (rates) {
        for (var i = rates.length - 1; i >= 0; i--) {
            menu.addChild(new vjs.PlaybackRateMenuItem(this.player(), {
                rate: rates[i] + "x"
            }));
        }
    }
    return menu;
};

vjs.PlaybackRateMenuButton.prototype.updateARIAAttributes = function() {
    this.el().setAttribute("aria-valuenow", this.player().playbackRate());
};

vjs.PlaybackRateMenuButton.prototype.onClick = function() {
    var currentRate = this.player().playbackRate();
    var rates = this.player().options()["playbackRates"];
    var newRate = rates[0];
    for (var i = 0; i < rates.length; i++) {
        if (rates[i] > currentRate) {
            newRate = rates[i];
            break;
        }
    }
    this.player().playbackRate(newRate);
};

vjs.PlaybackRateMenuButton.prototype.playbackRateSupported = function() {
    return this.player().tech && this.player().tech.features["playbackRate"] && this.player().options()["playbackRates"] && this.player().options()["playbackRates"].length > 0;
};

vjs.PlaybackRateMenuButton.prototype.updateVisibility = function() {
    if (this.playbackRateSupported()) {
        this.removeClass("vjs-hidden");
    } else {
        this.addClass("vjs-hidden");
    }
};

vjs.PlaybackRateMenuButton.prototype.updateLabel = function() {
    if (this.playbackRateSupported()) {
        this.labelEl_.innerHTML = this.player().playbackRate() + "x";
    }
};

vjs.PlaybackRateMenuItem = vjs.MenuItem.extend({
    contentElType: "button",
    init: function(player, options) {
        var label = this.label = options["rate"];
        var rate = this.rate = parseFloat(label, 10);
        options["label"] = label;
        options["selected"] = rate === 1;
        vjs.MenuItem.call(this, player, options);
        this.player().on("ratechange", vjs.bind(this, this.update));
    }
});

vjs.PlaybackRateMenuItem.prototype.onClick = function() {
    vjs.MenuItem.prototype.onClick.call(this);
    this.player().playbackRate(this.rate);
};

vjs.PlaybackRateMenuItem.prototype.update = function() {
    this.selected(this.player().playbackRate() == this.rate);
};

vjs.PosterImage = vjs.Button.extend({
    init: function(player, options) {
        vjs.Button.call(this, player, options);
        if (player.poster()) {
            this.src(player.poster());
        }
        if (!player.poster() || !player.controls()) {
            this.hide();
        }
        player.on("posterchange", vjs.bind(this, function() {
            this.src(player.poster());
        }));
        player.on("play", vjs.bind(this, this.hide));
    }
});

var _backgroundSizeSupported = "backgroundSize" in vjs.TEST_VID.style;

vjs.PosterImage.prototype.createEl = function() {
    var el = vjs.createEl("div", {
        className: "vjs-poster",
        tabIndex: -1
    });
    if (!_backgroundSizeSupported) {
        el.appendChild(vjs.createEl("img"));
    }
    return el;
};

vjs.PosterImage.prototype.src = function(url) {
    var el = this.el();
    if (url === undefined) {
        return;
    }
    if (_backgroundSizeSupported) {
        el.style.backgroundImage = 'url("' + url + '")';
    } else {
        el.firstChild.src = url;
    }
};

vjs.PosterImage.prototype.onClick = function() {
    if (this.player().controls()) {
        this.player_.play();
    }
};

vjs.LoadingSpinner = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
    }
});

vjs.LoadingSpinner.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-loading-spinner"
    });
};

vjs.BigPlayButton = vjs.Button.extend();

vjs.BigPlayButton.prototype.createEl = function() {
    return vjs.Button.prototype.createEl.call(this, "div", {
        className: "vjs-big-play-button",
        innerHTML: '<span aria-hidden="true"></span>',
        "aria-label": "play video"
    });
};

vjs.BigPlayButton.prototype.onClick = function() {
    this.player_.play();
};

vjs.ErrorDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        this.update();
        player.on("error", vjs.bind(this, this.update));
    }
});

vjs.ErrorDisplay.prototype.createEl = function() {
    var el = vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-error-display"
    });
    this.contentEl_ = vjs.createEl("div");
    el.appendChild(this.contentEl_);
    return el;
};

vjs.ErrorDisplay.prototype.update = function() {
    if (this.player().error()) {
        this.contentEl_.innerHTML = this.localize(this.player().error().message);
    }
};

vjs.MediaTechController = vjs.Component.extend({
    init: function(player, options, ready) {
        options = options || {};
        options.reportTouchActivity = false;
        vjs.Component.call(this, player, options, ready);
        this.initControlsListeners();
    }
});

vjs.MediaTechController.prototype.initControlsListeners = function() {
    var player, tech, activateControls, deactivateControls;
    tech = this;
    player = this.player();
    var activateControls = function() {
        if (player.controls() && !player.usingNativeControls()) {
            tech.addControlsListeners();
        }
    };
    deactivateControls = vjs.bind(tech, tech.removeControlsListeners);
    this.ready(activateControls);
    player.on("controlsenabled", activateControls);
    player.on("controlsdisabled", deactivateControls);
    this.ready(function() {
        if (this.networkState && this.networkState() > 0) {
            this.player().trigger("loadstart");
        }
    });
};

vjs.MediaTechController.prototype.addControlsListeners = function() {
    var userWasActive;
    this.on("mousedown", this.onClick);
    this.on("touchstart", function(event) {
        userWasActive = this.player_.userActive();
    });
    this.on("touchmove", function(event) {
        if (userWasActive) {
            this.player().reportUserActivity();
        }
    });
    this.on("touchend", function(event) {
        event.preventDefault();
    });
    this.emitTapEvents();
    this.on("tap", this.onTap);
};

vjs.MediaTechController.prototype.removeControlsListeners = function() {
    this.off("tap");
    this.off("touchstart");
    this.off("touchmove");
    this.off("touchleave");
    this.off("touchcancel");
    this.off("touchend");
    this.off("click");
    this.off("mousedown");
};

vjs.MediaTechController.prototype.onClick = function(event) {
    if (event.button !== 0) return;
    if (this.player().controls()) {
        if (this.player().paused()) {
            this.player().play();
        } else {
            this.player().pause();
        }
    }
};

vjs.MediaTechController.prototype.onTap = function() {
    this.player().userActive(!this.player().userActive());
};

vjs.MediaTechController.prototype.setPoster = function() {};

vjs.MediaTechController.prototype.features = {
    volumeControl: true,
    fullscreenResize: false,
    playbackRate: false,
    progressEvents: false,
    timeupdateEvents: false
};

vjs.media = {};

vjs.Html5 = vjs.MediaTechController.extend({
    init: function(player, options, ready) {
        this.features["volumeControl"] = vjs.Html5.canControlVolume();
        this.features["playbackRate"] = vjs.Html5.canControlPlaybackRate();
        this.features["movingMediaElementInDOM"] = !vjs.IS_IOS;
        this.features["fullscreenResize"] = true;
        vjs.MediaTechController.call(this, player, options, ready);
        this.setupTriggers();
        var source = options["source"];
        if (source && this.el_.currentSrc !== source.src) {
            this.el_.src = source.src;
        }
        if (vjs.TOUCH_ENABLED && player.options()["nativeControlsForTouch"] !== false) {
            this.useNativeControls();
        }
        player.ready(function() {
            if (this.tag && this.options_["autoplay"] && this.paused()) {
                delete this.tag["poster"];
                this.play();
            }
        });
        this.triggerReady();
    }
});

vjs.Html5.prototype.dispose = function() {
    vjs.Html5.disposeMediaElement(this.el_);
    vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Html5.prototype.createEl = function() {
    var player = this.player_, el = player.tag, newEl, clone;
    if (!el || this.features["movingMediaElementInDOM"] === false) {
        if (el) {
            clone = el.cloneNode(false);
            vjs.Html5.disposeMediaElement(el);
            el = clone;
            player.tag = null;
        } else {
            el = vjs.createEl("video");
            vjs.setElementAttributes(el, vjs.obj.merge(player.tagAttributes || {}, {
                id: player.id() + "_html5_api",
                "class": "vjs-tech"
            }));
        }
        el["player"] = player;
        vjs.insertFirst(el, player.el());
    }
    var settingsAttrs = [ "autoplay", "preload", "loop", "muted" ];
    for (var i = settingsAttrs.length - 1; i >= 0; i--) {
        var attr = settingsAttrs[i];
        var overwriteAttrs = {};
        if (typeof player.options_[attr] !== "undefined") {
            overwriteAttrs[attr] = player.options_[attr];
        }
        vjs.setElementAttributes(el, overwriteAttrs);
    }
    return el;
};

vjs.Html5.prototype.setupTriggers = function() {
    for (var i = vjs.Html5.Events.length - 1; i >= 0; i--) {
        vjs.on(this.el_, vjs.Html5.Events[i], vjs.bind(this, this.eventHandler));
    }
};

vjs.Html5.prototype.eventHandler = function(evt) {
    if (evt.type == "error") {
        this.player().error(this.error().code);
    } else {
        evt.bubbles = false;
        this.player().trigger(evt);
    }
};

vjs.Html5.prototype.useNativeControls = function() {
    var tech, player, controlsOn, controlsOff, cleanUp;
    tech = this;
    player = this.player();
    tech.setControls(player.controls());
    controlsOn = function() {
        tech.setControls(true);
    };
    controlsOff = function() {
        tech.setControls(false);
    };
    player.on("controlsenabled", controlsOn);
    player.on("controlsdisabled", controlsOff);
    cleanUp = function() {
        player.off("controlsenabled", controlsOn);
        player.off("controlsdisabled", controlsOff);
    };
    tech.on("dispose", cleanUp);
    player.on("usingcustomcontrols", cleanUp);
    player.usingNativeControls(true);
};

vjs.Html5.prototype.play = function() {
    this.el_.play();
};

vjs.Html5.prototype.pause = function() {
    this.el_.pause();
};

vjs.Html5.prototype.paused = function() {
    return this.el_.paused;
};

vjs.Html5.prototype.currentTime = function() {
    return this.el_.currentTime;
};

vjs.Html5.prototype.setCurrentTime = function(seconds) {
    try {
        this.el_.currentTime = seconds;
    } catch (e) {
        vjs.log(e, "Video is not ready. (Video.js)");
    }
};

vjs.Html5.prototype.duration = function() {
    return this.el_.duration || 0;
};

vjs.Html5.prototype.buffered = function() {
    return this.el_.buffered;
};

vjs.Html5.prototype.volume = function() {
    return this.el_.volume;
};

vjs.Html5.prototype.setVolume = function(percentAsDecimal) {
    this.el_.volume = percentAsDecimal;
};

vjs.Html5.prototype.muted = function() {
    return this.el_.muted;
};

vjs.Html5.prototype.setMuted = function(muted) {
    this.el_.muted = muted;
};

vjs.Html5.prototype.width = function() {
    return this.el_.offsetWidth;
};

vjs.Html5.prototype.height = function() {
    return this.el_.offsetHeight;
};

vjs.Html5.prototype.supportsFullScreen = function() {
    if (typeof this.el_.webkitEnterFullScreen == "function") {
        if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) {
            return true;
        }
    }
    return false;
};

vjs.Html5.prototype.enterFullScreen = function() {
    var video = this.el_;
    if (video.paused && video.networkState <= video.HAVE_METADATA) {
        this.el_.play();
        setTimeout(function() {
            video.pause();
            video.webkitEnterFullScreen();
        }, 0);
    } else {
        video.webkitEnterFullScreen();
    }
};

vjs.Html5.prototype.exitFullScreen = function() {
    this.el_.webkitExitFullScreen();
};

vjs.Html5.prototype.src = function(src) {
    this.el_.src = src;
};

vjs.Html5.prototype.load = function() {
    this.el_.load();
};

vjs.Html5.prototype.currentSrc = function() {
    return this.el_.currentSrc;
};

vjs.Html5.prototype.poster = function() {
    return this.el_.poster;
};

vjs.Html5.prototype.setPoster = function(val) {
    this.el_.poster = val;
};

vjs.Html5.prototype.preload = function() {
    return this.el_.preload;
};

vjs.Html5.prototype.setPreload = function(val) {
    this.el_.preload = val;
};

vjs.Html5.prototype.autoplay = function() {
    return this.el_.autoplay;
};

vjs.Html5.prototype.setAutoplay = function(val) {
    this.el_.autoplay = val;
};

vjs.Html5.prototype.controls = function() {
    return this.el_.controls;
};

vjs.Html5.prototype.setControls = function(val) {
    this.el_.controls = !!val;
};

vjs.Html5.prototype.loop = function() {
    return this.el_.loop;
};

vjs.Html5.prototype.setLoop = function(val) {
    this.el_.loop = val;
};

vjs.Html5.prototype.error = function() {
    return this.el_.error;
};

vjs.Html5.prototype.seeking = function() {
    return this.el_.seeking;
};

vjs.Html5.prototype.ended = function() {
    return this.el_.ended;
};

vjs.Html5.prototype.defaultMuted = function() {
    return this.el_.defaultMuted;
};

vjs.Html5.prototype.playbackRate = function() {
    return this.el_.playbackRate;
};

vjs.Html5.prototype.setPlaybackRate = function(val) {
    this.el_.playbackRate = val;
};

vjs.Html5.prototype.networkState = function() {
    return this.el_.networkState;
};

vjs.Html5.isSupported = function() {
    try {
        vjs.TEST_VID["volume"] = .5;
    } catch (e) {
        return false;
    }
    return !!vjs.TEST_VID.canPlayType;
};

vjs.Html5.canPlaySource = function(srcObj) {
    try {
        return !!vjs.TEST_VID.canPlayType(srcObj.type);
    } catch (e) {
        return "";
    }
};

vjs.Html5.canControlVolume = function() {
    var volume = vjs.TEST_VID.volume;
    vjs.TEST_VID.volume = volume / 2 + .1;
    return volume !== vjs.TEST_VID.volume;
};

vjs.Html5.canControlPlaybackRate = function() {
    var playbackRate = vjs.TEST_VID.playbackRate;
    vjs.TEST_VID.playbackRate = playbackRate / 2 + .1;
    return playbackRate !== vjs.TEST_VID.playbackRate;
};

(function() {
    var canPlayType, mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i, mp4RE = /^video\/mp4/i;
    vjs.Html5.patchCanPlayType = function() {
        if (vjs.ANDROID_VERSION >= 4) {
            if (!canPlayType) {
                canPlayType = vjs.TEST_VID.constructor.prototype.canPlayType;
            }
            vjs.TEST_VID.constructor.prototype.canPlayType = function(type) {
                if (type && mpegurlRE.test(type)) {
                    return "maybe";
                }
                return canPlayType.call(this, type);
            };
        }
        if (vjs.IS_OLD_ANDROID) {
            if (!canPlayType) {
                canPlayType = vjs.TEST_VID.constructor.prototype.canPlayType;
            }
            vjs.TEST_VID.constructor.prototype.canPlayType = function(type) {
                if (type && mp4RE.test(type)) {
                    return "maybe";
                }
                return canPlayType.call(this, type);
            };
        }
    };
    vjs.Html5.unpatchCanPlayType = function() {
        var r = vjs.TEST_VID.constructor.prototype.canPlayType;
        vjs.TEST_VID.constructor.prototype.canPlayType = canPlayType;
        canPlayType = null;
        return r;
    };
    vjs.Html5.patchCanPlayType();
})();

vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(",");

vjs.Html5.disposeMediaElement = function(el) {
    if (!el) {
        return;
    }
    el["player"] = null;
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
    while (el.hasChildNodes()) {
        el.removeChild(el.firstChild);
    }
    el.removeAttribute("src");
    if (typeof el.load === "function") {
        (function() {
            try {
                el.load();
            } catch (e) {}
        })();
    }
};

vjs.Flash = vjs.MediaTechController.extend({
    init: function(player, options, ready) {
        vjs.MediaTechController.call(this, player, options, ready);
        var source = options["source"], parentEl = options["parentEl"], placeHolder = this.el_ = vjs.createEl("div", {
            id: player.id() + "_temp_flash"
        }), objId = player.id() + "_flash_api", playerOptions = player.options_, flashVars = vjs.obj.merge({
            readyFunction: "videojs.Flash.onReady",
            eventProxyFunction: "videojs.Flash.onEvent",
            errorEventProxyFunction: "videojs.Flash.onError",
            autoplay: playerOptions.autoplay,
            preload: playerOptions.preload,
            loop: playerOptions.loop,
            muted: playerOptions.muted
        }, options["flashVars"]), params = vjs.obj.merge({
            wmode: "opaque",
            bgcolor: "#000000"
        }, options["params"]), attributes = vjs.obj.merge({
            id: objId,
            name: objId,
            "class": "vjs-tech"
        }, options["attributes"]);
        if (source) {
            if (source.type && vjs.Flash.isStreamingType(source.type)) {
                var parts = vjs.Flash.streamToParts(source.src);
                flashVars["rtmpConnection"] = encodeURIComponent(parts.connection);
                flashVars["rtmpStream"] = encodeURIComponent(parts.stream);
            } else {
                flashVars["src"] = encodeURIComponent(vjs.getAbsoluteURL(source.src));
            }
        }
        vjs.insertFirst(placeHolder, parentEl);
        if (options["startTime"]) {
            this.ready(function() {
                this.load();
                this.play();
                this["currentTime"](options["startTime"]);
            });
        }
        if (vjs.IS_FIREFOX) {
            this.ready(function() {
                vjs.on(this.el(), "mousemove", vjs.bind(this, function() {
                    this.player().trigger({
                        type: "mousemove",
                        bubbles: false
                    });
                }));
            });
        }
        player.on("stageclick", player.reportUserActivity);
        this.el_ = vjs.Flash.embed(options["swf"], placeHolder, flashVars, params, attributes);
    }
});

vjs.Flash.prototype.dispose = function() {
    vjs.MediaTechController.prototype.dispose.call(this);
};

vjs.Flash.prototype.play = function() {
    this.el_.vjs_play();
};

vjs.Flash.prototype.pause = function() {
    this.el_.vjs_pause();
};

vjs.Flash.prototype.src = function(src) {
    if (src === undefined) {
        return this["currentSrc"]();
    }
    if (vjs.Flash.isStreamingSrc(src)) {
        src = vjs.Flash.streamToParts(src);
        this.setRtmpConnection(src.connection);
        this.setRtmpStream(src.stream);
    } else {
        src = vjs.getAbsoluteURL(src);
        this.el_.vjs_src(src);
    }
    if (this.player_.autoplay()) {
        var tech = this;
        setTimeout(function() {
            tech.play();
        }, 0);
    }
};

vjs.Flash.prototype["setCurrentTime"] = function(time) {
    this.lastSeekTarget_ = time;
    this.el_.vjs_setProperty("currentTime", time);
};

vjs.Flash.prototype["currentTime"] = function(time) {
    if (this.seeking()) {
        return this.lastSeekTarget_ || 0;
    }
    return this.el_.vjs_getProperty("currentTime");
};

vjs.Flash.prototype["currentSrc"] = function() {
    var src = this.el_.vjs_getProperty("currentSrc");
    if (src == null) {
        var connection = this["rtmpConnection"](), stream = this["rtmpStream"]();
        if (connection && stream) {
            src = vjs.Flash.streamFromParts(connection, stream);
        }
    }
    return src;
};

vjs.Flash.prototype.load = function() {
    this.el_.vjs_load();
};

vjs.Flash.prototype.poster = function() {
    this.el_.vjs_getProperty("poster");
};

vjs.Flash.prototype["setPoster"] = function() {};

vjs.Flash.prototype.buffered = function() {
    return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"));
};

vjs.Flash.prototype.supportsFullScreen = function() {
    return false;
};

vjs.Flash.prototype.enterFullScreen = function() {
    return false;
};

(function() {
    var api = vjs.Flash.prototype, readWrite = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), readOnly = "error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(","), i;
    function createSetter(attr) {
        var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
        api["set" + attrUpper] = function(val) {
            return this.el_.vjs_setProperty(attr, val);
        };
    }
    function createGetter(attr) {
        api[attr] = function() {
            return this.el_.vjs_getProperty(attr);
        };
    }
    for (i = 0; i < readWrite.length; i++) {
        createGetter(readWrite[i]);
        createSetter(readWrite[i]);
    }
    for (i = 0; i < readOnly.length; i++) {
        createGetter(readOnly[i]);
    }
})();

vjs.Flash.isSupported = function() {
    return vjs.Flash.version()[0] >= 10;
};

vjs.Flash.canPlaySource = function(srcObj) {
    var type;
    if (!srcObj.type) {
        return "";
    }
    type = srcObj.type.replace(/;.*/, "").toLowerCase();
    if (type in vjs.Flash.formats || type in vjs.Flash.streamingFormats) {
        return "maybe";
    }
};

vjs.Flash.formats = {
    "video/flv": "FLV",
    "video/x-flv": "FLV",
    "video/mp4": "MP4",
    "video/m4v": "MP4"
};

vjs.Flash.streamingFormats = {
    "rtmp/mp4": "MP4",
    "rtmp/flv": "FLV"
};

vjs.Flash["onReady"] = function(currSwf) {
    var el, player;
    el = vjs.el(currSwf);
    player = el && el.parentNode && el.parentNode["player"];
    if (player) {
        el["player"] = player;
        vjs.Flash["checkReady"](player.tech);
    }
};

vjs.Flash["checkReady"] = function(tech) {
    if (!tech.el()) {
        return;
    }
    if (tech.el().vjs_getProperty) {
        tech.triggerReady();
    } else {
        setTimeout(function() {
            vjs.Flash["checkReady"](tech);
        }, 50);
    }
};

vjs.Flash["onEvent"] = function(swfID, eventName) {
    var player = vjs.el(swfID)["player"];
    player.trigger(eventName);
};

vjs.Flash["onError"] = function(swfID, err) {
    var player = vjs.el(swfID)["player"];
    var msg = "FLASH: " + err;
    if (err == "srcnotfound") {
        player.error({
            code: 4,
            message: msg
        });
    } else {
        player.error(msg);
    }
};

vjs.Flash.version = function() {
    var version = "0,0,0";
    try {
        version = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
    } catch (e) {
        try {
            if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                version = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
            }
        } catch (err) {}
    }
    return version.split(",");
};

vjs.Flash.embed = function(swf, placeHolder, flashVars, params, attributes) {
    var code = vjs.Flash.getEmbedCode(swf, flashVars, params, attributes), obj = vjs.createEl("div", {
        innerHTML: code
    }).childNodes[0], par = placeHolder.parentNode;
    placeHolder.parentNode.replaceChild(obj, placeHolder);
    var newObj = par.childNodes[0];
    setTimeout(function() {
        newObj.style.display = "block";
    }, 1e3);
    return obj;
};

vjs.Flash.getEmbedCode = function(swf, flashVars, params, attributes) {
    var objTag = '<object type="application/x-shockwave-flash"', flashVarsString = "", paramsString = "", attrsString = "";
    if (flashVars) {
        vjs.obj.each(flashVars, function(key, val) {
            flashVarsString += key + "=" + val + "&amp;";
        });
    }
    params = vjs.obj.merge({
        movie: swf,
        flashvars: flashVarsString,
        allowScriptAccess: "always",
        allowNetworking: "all"
    }, params);
    vjs.obj.each(params, function(key, val) {
        paramsString += '<param name="' + key + '" value="' + val + '" />';
    });
    attributes = vjs.obj.merge({
        data: swf,
        width: "100%",
        height: "100%"
    }, attributes);
    vjs.obj.each(attributes, function(key, val) {
        attrsString += key + '="' + val + '" ';
    });
    return objTag + attrsString + ">" + paramsString + "</object>";
};

vjs.Flash.streamFromParts = function(connection, stream) {
    return connection + "&" + stream;
};

vjs.Flash.streamToParts = function(src) {
    var parts = {
        connection: "",
        stream: ""
    };
    if (!src) {
        return parts;
    }
    var connEnd = src.indexOf("&");
    var streamBegin;
    if (connEnd !== -1) {
        streamBegin = connEnd + 1;
    } else {
        connEnd = streamBegin = src.lastIndexOf("/") + 1;
        if (connEnd === 0) {
            connEnd = streamBegin = src.length;
        }
    }
    parts.connection = src.substring(0, connEnd);
    parts.stream = src.substring(streamBegin, src.length);
    return parts;
};

vjs.Flash.isStreamingType = function(srcType) {
    return srcType in vjs.Flash.streamingFormats;
};

vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i;

vjs.Flash.isStreamingSrc = function(src) {
    return vjs.Flash.RTMP_RE.test(src);
};

vjs.MediaLoader = vjs.Component.extend({
    init: function(player, options, ready) {
        vjs.Component.call(this, player, options, ready);
        if (!player.options_["sources"] || player.options_["sources"].length === 0) {
            for (var i = 0, j = player.options_["techOrder"]; i < j.length; i++) {
                var techName = vjs.capitalize(j[i]), tech = window["videojs"][techName];
                if (tech && tech.isSupported()) {
                    player.loadTech(techName);
                    break;
                }
            }
        } else {
            player.src(player.options_["sources"]);
        }
    }
});

vjs.Player.prototype.textTracks_;

vjs.Player.prototype.textTracks = function() {
    this.textTracks_ = this.textTracks_ || [];
    return this.textTracks_;
};

vjs.Player.prototype.addTextTrack = function(kind, label, language, options) {
    var tracks = this.textTracks_ = this.textTracks_ || [];
    options = options || {};
    options["kind"] = kind;
    options["label"] = label;
    options["language"] = language;
    var Kind = vjs.capitalize(kind || "subtitles");
    var track = new window["videojs"][Kind + "Track"](this, options);
    tracks.push(track);
    if (track.dflt()) {
        this.ready(function() {
            setTimeout(function() {
                track.player().showTextTrack(track.id());
            }, 0);
        });
    }
    return track;
};

vjs.Player.prototype.addTextTracks = function(trackList) {
    var trackObj;
    for (var i = 0; i < trackList.length; i++) {
        trackObj = trackList[i];
        this.addTextTrack(trackObj["kind"], trackObj["label"], trackObj["language"], trackObj);
    }
    return this;
};

vjs.Player.prototype.showTextTrack = function(id, disableSameKind) {
    var tracks = this.textTracks_, i = 0, j = tracks.length, track, showTrack, kind;
    for (;i < j; i++) {
        track = tracks[i];
        if (track.id() === id) {
            track.show();
            showTrack = track;
        } else if (disableSameKind && track.kind() == disableSameKind && track.mode() > 0) {
            track.disable();
        }
    }
    kind = showTrack ? showTrack.kind() : disableSameKind ? disableSameKind : false;
    if (kind) {
        this.trigger(kind + "trackchange");
    }
    return this;
};

vjs.TextTrack = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        this.id_ = options["id"] || "vjs_" + options["kind"] + "_" + options["language"] + "_" + vjs.guid++;
        this.src_ = options["src"];
        this.dflt_ = options["default"] || options["dflt"];
        this.title_ = options["title"];
        this.language_ = options["srclang"];
        this.label_ = options["label"];
        this.cues_ = [];
        this.activeCues_ = [];
        this.readyState_ = 0;
        this.mode_ = 0;
        this.player_.on("fullscreenchange", vjs.bind(this, this.adjustFontSize));
    }
});

vjs.TextTrack.prototype.kind_;

vjs.TextTrack.prototype.kind = function() {
    return this.kind_;
};

vjs.TextTrack.prototype.src_;

vjs.TextTrack.prototype.src = function() {
    return this.src_;
};

vjs.TextTrack.prototype.dflt_;

vjs.TextTrack.prototype.dflt = function() {
    return this.dflt_;
};

vjs.TextTrack.prototype.title_;

vjs.TextTrack.prototype.title = function() {
    return this.title_;
};

vjs.TextTrack.prototype.language_;

vjs.TextTrack.prototype.language = function() {
    return this.language_;
};

vjs.TextTrack.prototype.label_;

vjs.TextTrack.prototype.label = function() {
    return this.label_;
};

vjs.TextTrack.prototype.cues_;

vjs.TextTrack.prototype.cues = function() {
    return this.cues_;
};

vjs.TextTrack.prototype.activeCues_;

vjs.TextTrack.prototype.activeCues = function() {
    return this.activeCues_;
};

vjs.TextTrack.prototype.readyState_;

vjs.TextTrack.prototype.readyState = function() {
    return this.readyState_;
};

vjs.TextTrack.prototype.mode_;

vjs.TextTrack.prototype.mode = function() {
    return this.mode_;
};

vjs.TextTrack.prototype.adjustFontSize = function() {
    if (this.player_.isFullScreen()) {
        this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + "%";
    } else {
        this.el_.style.fontSize = "";
    }
};

vjs.TextTrack.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-" + this.kind_ + " vjs-text-track"
    });
};

vjs.TextTrack.prototype.show = function() {
    this.activate();
    this.mode_ = 2;
    vjs.Component.prototype.show.call(this);
};

vjs.TextTrack.prototype.hide = function() {
    this.activate();
    this.mode_ = 1;
    vjs.Component.prototype.hide.call(this);
};

vjs.TextTrack.prototype.disable = function() {
    if (this.mode_ == 2) {
        this.hide();
    }
    this.deactivate();
    this.mode_ = 0;
};

vjs.TextTrack.prototype.activate = function() {
    if (this.readyState_ === 0) {
        this.load();
    }
    if (this.mode_ === 0) {
        this.player_.on("timeupdate", vjs.bind(this, this.update, this.id_));
        this.player_.on("ended", vjs.bind(this, this.reset, this.id_));
        if (this.kind_ === "captions" || this.kind_ === "subtitles") {
            this.player_.getChild("textTrackDisplay").addChild(this);
        }
    }
};

vjs.TextTrack.prototype.deactivate = function() {
    this.player_.off("timeupdate", vjs.bind(this, this.update, this.id_));
    this.player_.off("ended", vjs.bind(this, this.reset, this.id_));
    this.reset();
    this.player_.getChild("textTrackDisplay").removeChild(this);
};

vjs.TextTrack.prototype.load = function() {
    if (this.readyState_ === 0) {
        this.readyState_ = 1;
        vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError));
    }
};

vjs.TextTrack.prototype.onError = function(err) {
    this.error = err;
    this.readyState_ = 3;
    this.trigger("error");
};

vjs.TextTrack.prototype.parseCues = function(srcContent) {
    var cue, time, text, lines = srcContent.split("\n"), line = "", id;
    for (var i = 1, j = lines.length; i < j; i++) {
        line = vjs.trim(lines[i]);
        if (line) {
            if (line.indexOf("-->") == -1) {
                id = line;
                line = vjs.trim(lines[++i]);
            } else {
                id = this.cues_.length;
            }
            cue = {
                id: id,
                index: this.cues_.length
            };
            time = line.split(/[\t ]+/);
            cue.startTime = this.parseCueTime(time[0]);
            cue.endTime = this.parseCueTime(time[2]);
            text = [];
            while (lines[++i] && (line = vjs.trim(lines[i]))) {
                text.push(line);
            }
            cue.text = text.join("<br/>");
            this.cues_.push(cue);
        }
    }
    this.readyState_ = 2;
    this.trigger("loaded");
};

vjs.TextTrack.prototype.parseCueTime = function(timeText) {
    var parts = timeText.split(":"), time = 0, hours, minutes, other, seconds, ms;
    if (parts.length == 3) {
        hours = parts[0];
        minutes = parts[1];
        other = parts[2];
    } else {
        hours = 0;
        minutes = parts[0];
        other = parts[1];
    }
    other = other.split(/\s+/);
    seconds = other.splice(0, 1)[0];
    seconds = seconds.split(/\.|,/);
    ms = parseFloat(seconds[1]);
    seconds = seconds[0];
    time += parseFloat(hours) * 3600;
    time += parseFloat(minutes) * 60;
    time += parseFloat(seconds);
    if (ms) {
        time += ms / 1e3;
    }
    return time;
};

vjs.TextTrack.prototype.update = function() {
    if (this.cues_.length > 0) {
        var offset = this.player_.options()["trackTimeOffset"] || 0;
        var time = this.player_.currentTime() + offset;
        if (this.prevChange === undefined || time < this.prevChange || this.nextChange <= time) {
            var cues = this.cues_, newNextChange = this.player_.duration(), newPrevChange = 0, reverse = false, newCues = [], firstActiveIndex, lastActiveIndex, cue, i;
            if (time >= this.nextChange || this.nextChange === undefined) {
                i = this.firstActiveIndex !== undefined ? this.firstActiveIndex : 0;
            } else {
                reverse = true;
                i = this.lastActiveIndex !== undefined ? this.lastActiveIndex : cues.length - 1;
            }
            while (true) {
                cue = cues[i];
                if (cue.endTime <= time) {
                    newPrevChange = Math.max(newPrevChange, cue.endTime);
                    if (cue.active) {
                        cue.active = false;
                    }
                } else if (time < cue.startTime) {
                    newNextChange = Math.min(newNextChange, cue.startTime);
                    if (cue.active) {
                        cue.active = false;
                    }
                    if (!reverse) {
                        break;
                    }
                } else {
                    if (reverse) {
                        newCues.splice(0, 0, cue);
                        if (lastActiveIndex === undefined) {
                            lastActiveIndex = i;
                        }
                        firstActiveIndex = i;
                    } else {
                        newCues.push(cue);
                        if (firstActiveIndex === undefined) {
                            firstActiveIndex = i;
                        }
                        lastActiveIndex = i;
                    }
                    newNextChange = Math.min(newNextChange, cue.endTime);
                    newPrevChange = Math.max(newPrevChange, cue.startTime);
                    cue.active = true;
                }
                if (reverse) {
                    if (i === 0) {
                        break;
                    } else {
                        i--;
                    }
                } else {
                    if (i === cues.length - 1) {
                        break;
                    } else {
                        i++;
                    }
                }
            }
            this.activeCues_ = newCues;
            this.nextChange = newNextChange;
            this.prevChange = newPrevChange;
            this.firstActiveIndex = firstActiveIndex;
            this.lastActiveIndex = lastActiveIndex;
            this.updateDisplay();
            this.trigger("cuechange");
        }
    }
};

vjs.TextTrack.prototype.updateDisplay = function() {
    var cues = this.activeCues_, html = "", i = 0, j = cues.length;
    for (;i < j; i++) {
        html += '<span class="vjs-tt-cue">' + cues[i].text + "</span>";
    }
    this.el_.innerHTML = html;
};

vjs.TextTrack.prototype.reset = function() {
    this.nextChange = 0;
    this.prevChange = this.player_.duration();
    this.firstActiveIndex = 0;
    this.lastActiveIndex = 0;
};

vjs.CaptionsTrack = vjs.TextTrack.extend();

vjs.CaptionsTrack.prototype.kind_ = "captions";

vjs.SubtitlesTrack = vjs.TextTrack.extend();

vjs.SubtitlesTrack.prototype.kind_ = "subtitles";

vjs.ChaptersTrack = vjs.TextTrack.extend();

vjs.ChaptersTrack.prototype.kind_ = "chapters";

vjs.TextTrackDisplay = vjs.Component.extend({
    init: function(player, options, ready) {
        vjs.Component.call(this, player, options, ready);
        if (player.options_["tracks"] && player.options_["tracks"].length > 0) {
            this.player_.addTextTracks(player.options_["tracks"]);
        }
    }
});

vjs.TextTrackDisplay.prototype.createEl = function() {
    return vjs.Component.prototype.createEl.call(this, "div", {
        className: "vjs-text-track-display"
    });
};

vjs.TextTrackMenuItem = vjs.MenuItem.extend({
    init: function(player, options) {
        var track = this.track = options["track"];
        options["label"] = track.label();
        options["selected"] = track.dflt();
        vjs.MenuItem.call(this, player, options);
        this.player_.on(track.kind() + "trackchange", vjs.bind(this, this.update));
    }
});

vjs.TextTrackMenuItem.prototype.onClick = function() {
    vjs.MenuItem.prototype.onClick.call(this);
    this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.TextTrackMenuItem.prototype.update = function() {
    this.selected(this.track.mode() == 2);
};

vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
    init: function(player, options) {
        options["track"] = {
            kind: function() {
                return options["kind"];
            },
            player: player,
            label: function() {
                return options["kind"] + " off";
            },
            dflt: function() {
                return false;
            },
            mode: function() {
                return false;
            }
        };
        vjs.TextTrackMenuItem.call(this, player, options);
        this.selected(true);
    }
});

vjs.OffTextTrackMenuItem.prototype.onClick = function() {
    vjs.TextTrackMenuItem.prototype.onClick.call(this);
    this.player_.showTextTrack(this.track.id_, this.track.kind());
};

vjs.OffTextTrackMenuItem.prototype.update = function() {
    var tracks = this.player_.textTracks(), i = 0, j = tracks.length, track, off = true;
    for (;i < j; i++) {
        track = tracks[i];
        if (track.kind() == this.track.kind() && track.mode() == 2) {
            off = false;
        }
    }
    this.selected(off);
};

vjs.TextTrackButton = vjs.MenuButton.extend({
    init: function(player, options) {
        vjs.MenuButton.call(this, player, options);
        if (this.items.length <= 1) {
            this.hide();
        }
    }
});

vjs.TextTrackButton.prototype.createItems = function() {
    var items = [], track;
    items.push(new vjs.OffTextTrackMenuItem(this.player_, {
        kind: this.kind_
    }));
    for (var i = 0; i < this.player_.textTracks().length; i++) {
        track = this.player_.textTracks()[i];
        if (track.kind() === this.kind_) {
            items.push(new vjs.TextTrackMenuItem(this.player_, {
                track: track
            }));
        }
    }
    return items;
};

vjs.CaptionsButton = vjs.TextTrackButton.extend({
    init: function(player, options, ready) {
        vjs.TextTrackButton.call(this, player, options, ready);
        this.el_.setAttribute("aria-label", "Captions Menu");
    }
});

vjs.CaptionsButton.prototype.kind_ = "captions";

vjs.CaptionsButton.prototype.buttonText = "Captions";

vjs.CaptionsButton.prototype.className = "vjs-captions-button";

vjs.SubtitlesButton = vjs.TextTrackButton.extend({
    init: function(player, options, ready) {
        vjs.TextTrackButton.call(this, player, options, ready);
        this.el_.setAttribute("aria-label", "Subtitles Menu");
    }
});

vjs.SubtitlesButton.prototype.kind_ = "subtitles";

vjs.SubtitlesButton.prototype.buttonText = "Subtitles";

vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button";

vjs.ChaptersButton = vjs.TextTrackButton.extend({
    init: function(player, options, ready) {
        vjs.TextTrackButton.call(this, player, options, ready);
        this.el_.setAttribute("aria-label", "Chapters Menu");
    }
});

vjs.ChaptersButton.prototype.kind_ = "chapters";

vjs.ChaptersButton.prototype.buttonText = "Chapters";

vjs.ChaptersButton.prototype.className = "vjs-chapters-button";

vjs.ChaptersButton.prototype.createItems = function() {
    var items = [], track;
    for (var i = 0; i < this.player_.textTracks().length; i++) {
        track = this.player_.textTracks()[i];
        if (track.kind() === this.kind_) {
            items.push(new vjs.TextTrackMenuItem(this.player_, {
                track: track
            }));
        }
    }
    return items;
};

vjs.ChaptersButton.prototype.createMenu = function() {
    var tracks = this.player_.textTracks(), i = 0, j = tracks.length, track, chaptersTrack, items = this.items = [];
    for (;i < j; i++) {
        track = tracks[i];
        if (track.kind() == this.kind_) {
            if (track.readyState() === 0) {
                track.load();
                track.on("loaded", vjs.bind(this, this.createMenu));
            } else {
                chaptersTrack = track;
                break;
            }
        }
    }
    var menu = this.menu;
    if (menu === undefined) {
        menu = new vjs.Menu(this.player_);
        menu.contentEl().appendChild(vjs.createEl("li", {
            className: "vjs-menu-title",
            innerHTML: vjs.capitalize(this.kind_),
            tabindex: -1
        }));
    }
    if (chaptersTrack) {
        var cues = chaptersTrack.cues_, cue, mi;
        i = 0;
        j = cues.length;
        for (;i < j; i++) {
            cue = cues[i];
            mi = new vjs.ChaptersTrackMenuItem(this.player_, {
                track: chaptersTrack,
                cue: cue
            });
            items.push(mi);
            menu.addChild(mi);
        }
        this.addChild(menu);
    }
    if (this.items.length > 0) {
        this.show();
    }
    return menu;
};

vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
    init: function(player, options) {
        var track = this.track = options["track"], cue = this.cue = options["cue"], currentTime = player.currentTime();
        options["label"] = cue.text;
        options["selected"] = cue.startTime <= currentTime && currentTime < cue.endTime;
        vjs.MenuItem.call(this, player, options);
        track.on("cuechange", vjs.bind(this, this.update));
    }
});

vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
    vjs.MenuItem.prototype.onClick.call(this);
    this.player_.currentTime(this.cue.startTime);
    this.update(this.cue.startTime);
};

vjs.ChaptersTrackMenuItem.prototype.update = function() {
    var cue = this.cue, currentTime = this.player_.currentTime();
    this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
};

vjs.obj.merge(vjs.ControlBar.prototype.options_["children"], {
    subtitlesButton: {},
    captionsButton: {},
    chaptersButton: {}
});

vjs.JSON;

if (typeof window.JSON !== "undefined" && window.JSON.parse === "function") {
    vjs.JSON = window.JSON;
} else {
    vjs.JSON = {};
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    vjs.JSON.parse = function(text, reviver) {
        var j;
        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value === "object") {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function(a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            j = eval("(" + text + ")");
            return typeof reviver === "function" ? walk({
                "": j
            }, "") : j;
        }
        throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
    };
}

vjs.autoSetup = function() {
    var options, vid, player, vids = document.getElementsByTagName("video");
    if (vids && vids.length > 0) {
        for (var i = 0, j = vids.length; i < j; i++) {
            vid = vids[i];
            if (vid && vid.getAttribute) {
                if (vid["player"] === undefined) {
                    options = vid.getAttribute("data-setup");
                    if (options !== null) {
                        options = vjs.JSON.parse(options || "{}");
                        player = videojs(vid, options);
                    }
                }
            } else {
                vjs.autoSetupTimeout(1);
                break;
            }
        }
    } else if (!vjs.windowLoaded) {
        vjs.autoSetupTimeout(1);
    }
};

vjs.autoSetupTimeout = function(wait) {
    setTimeout(vjs.autoSetup, wait);
};

if (document.readyState === "complete") {
    vjs.windowLoaded = true;
} else {
    vjs.one(window, "load", function() {
        vjs.windowLoaded = true;
    });
}

vjs.autoSetupTimeout(1);

vjs.plugin = function(name, init) {
    vjs.Player.prototype[name] = init;
};

function PlayerInterface() {
    this.player = null;
    this.player_starts_recorder = false;
    this.timeout_alert = 0, this.videos_preload = null, this.media_path_pre = "http://none", 
    this.test_media_path = this.media_path_pre + "throughput_test.mp4", this.enough_bandwidth = false, 
    this.videos_preload = null, this.hasFullscreen = false, this.sources = "", this.swf = "", 
    this.width = 640;
    this.height = 400;
    this.hasStarted = false;
    this.hasStopped = false;
    this._player_is_fullscreen = false;
    this.log = function(msg) {
        if (console.log) {
            console.log("player log: ");
            console.log(msg);
        }
    }, this.logTime = function(msg) {
        if (!msg) msg = "";
        var date = new Date();
        var datevalues = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds() ];
        if (console && console.log) console.log("TIME " + msg + ": " + datevalues[4] + " " + datevalues[5] + " " + datevalues[6]);
    }, this.decideWmode = function() {
        return this.checkChromeMinVer("MacIntel", 17) ? "direct" : "opaque";
    }, this.checkChromeMinVer = function(plat, ver) {
        var bver;
        if (window.navigator.appVersion.indexOf("Chrome") >= 0 && window.navigator.platform.indexOf(plat) >= 0) return (bver = /Chrome\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false; else return true;
    };
    this.statusMap = function(status, type) {
        var r = -1;
        if (status >= 20) r = status;
        if (type == "yt") {
            if (status == -1) {
                r = 10;
            }
            if (status == 0) {
                r = 12;
            }
            if (status == 1) {
                r = 11;
            }
            if (status == 2) {
                r = 13;
            }
            if (status == 3) {
                r = 14;
            }
            if (status == 5) {
                r = 15;
            }
        }
        if (type == "videojs") {
            if (status == "playing") {
                r = 11;
            }
            if (status == "buffering") {
                r = 14;
            }
            if (status == "error") {
                r = 19;
            }
            if (status == "ended") {
                r = 12;
            }
            if (status == "paused") {
                r = 13;
            }
        }
        return r;
    }, this.blockRClick = function(id) {
        var myVideo = document.getElementById(id);
        if (myVideo.addEventListener) {
            myVideo.addEventListener("contextmenu", function(e) {
                e.preventDefault();
            }, false);
        } else {
            myVideo.attachEvent("oncontextmenu", function() {
                window.event.returnValue = false;
            });
        }
        var object = $("#" + id + " object");
        if (object) {}
    }, this.on_player_fullscreenchange = function(ev) {
        vrt.logTime("on_player_fullscreenchange");
        vrt.log("player [VJSnew]: on_player_fullscreenchange");
        vrt.player._player_is_fullscreen = !vrt.player._player_is_fullscreen;
    };
}

function VjsInterface() {
    this.inheritFrom = PlayerInterface;
    this.inheritFrom();
    this.isloadeddata = false;
    this.video_play = function(cb) {
        if (this.player) {
            this.log("player [VJSnew]: play");
            if (typeof this.player !== "undefined" && this.player.src) {
                var source = vrt.media_path;
                if (source.slice(-3) == "flv") {
                    this.player.src([ {
                        type: "video/flv",
                        src: vrt.media_path
                    } ]);
                } else {
                    this.player.src([ {
                        type: "video/mp4",
                        src: vrt.media_path
                    } ]);
                }
            }
            this.log("video_play");
            this.logTime("video_play");
            this.player.play();
            if (cb) cb();
        } else {}
    };
    this.videoEnd = function() {
        this.log("video end");
    };
    this.video_stop = function(cb) {
        if (this.player) {
            this.log("player [VJSnew]: stop");
            this.logTime("video_stop");
            this.player.src();
            this.isloadeddata = false;
            try {
                if (this.player.techName == "Html5") {
                    this.player.pause();
                } else if (!this.player.ended() && !this.player.paused()) {
                    this.player.pause();
                } else {}
            } catch (e) {
                this.log(">> ERROR player [VJSnew]: stop");
                this.log(e);
            }
        }
        if (cb) cb();
    };
    this.video_after_close_window = function() {};
    this.video_go_fullscreen = function() {
        if (this.player) {
            if (vrt.msieversion() == 11 || vrt.checkSafari()) {
                this.player.requestFullwindow();
            } else if (this.player.requestFullscreen) {
                this.player.requestFullscreen();
            }
        }
    };
    this.video_end_fullscreen = function() {
        if (this.player.exitFullscreen) {
            this.player.exitFullscreen();
        } else {
            this.player.cancelFullScreen();
        }
    };
    this.on_player_ready = function(el, cb) {
        this.player = el;
        this.isloadeddata = false;
        vrt.player.blockRClick("videoDiv");
        this.player.on("play", vrt.player.on_player_play);
        this.player.on("firstplay", vrt.player.on_player_firstplay);
        this.player.on("error", vrt.player.on_player_error);
        this.player.on("fullscreenchange", vrt.player.on_player_fullscreenchange);
        this.player.on("pause", function() {
            vrt.log("EVT YSP pause");
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("paused", "videojs")
            });
        });
        this.player.on("ended", function() {
            vrt.log("EVT YSP ended");
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("ended", "videojs")
            });
            vrt.player.on_player_end();
        });
        this.player.on("loadedalldata", vrt.player.loadedalldata);
        this.player.on("loadeddata", vrt.player.loadeddata);
        this.player.on("loadedmetadata", vrt.player.loadedmetadata);
        this.player.on("loadstart", function() {
            vrt.log("EVT YSP loadstart");
        });
        this.player.on("progress", function() {
            vrt.log("EVT YSP progress");
        });
        this.player.on("seeked", function() {
            vrt.log("EVT YSP seeked");
        });
        this.player.on("waiting", function() {
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("buffering", "videojs")
            });
            vrt.log("EVT ysp waiting");
        });
        $(vrt).trigger("vrtstep_loaded");
        vrt.player_is_ready();
    };
    this.on_player_end = function(cb) {
        $(vrt).trigger("vrt_event_stimuli_end");
        if (!vrt.timedOverPlayToEnd) {
            vrt.skip_video();
        }
    };
    this.on_player_play = function(cb) {
        vrt.log("EVT YSP  on_player_play");
    };
    this.on_player_firstplay = function(cb) {
        vrt.log("EVT YSP on_player_firstplay");
    };
    this.loadeddata = function(cb) {
        vrt.log("EVT YSP loadeddata");
        if (!vrt.player.isloadeddata) {
            vrt.player.isloadeddata = true;
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("playing", "videojs")
            });
            $(vrt).trigger("vrtstep_play", {
                caller: "loadedalldata"
            });
        }
    };
    this.loadedalldata = function(cb) {
        vrt.log("EVT YSP loadedalldata");
        if (!vrt.player.isloadeddatas && this.techName != "Html5") {
            vrt.player.isloadeddata = true;
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("playing", "videojs")
            });
            $(vrt).trigger("vrtstep_play", {
                caller: "loadedalldata"
            });
        }
    };
    this.loadedmetadata = function(cb) {
        vrt.log("EVT YSP loadedmetadata");
    };
    this.on_player_error = function(e) {
        vrt.log("EVT YSP loadedalldata " + e);
        $(vrt).trigger("vrtevent_player_ts", {
            status: vrt.player.statusMap("error", "videojs")
        });
        $(window.vrt).trigger("vrt_event_error", {
            component: "player",
            error: "player error",
            type: "blocking"
        });
    };
    this.player_dispose = function() {
        this.player.dispose();
        vrt.logTime("player_dispose");
    };
    this.getCurrentTime = function() {
        return vrt.player.player.currentTime();
    };
    this.loadPlayer = function(options) {
        vrt.logTime("loadPlayer");
        if (!this.player) {
            var p_w = this.width;
            var p_h = this.height;
            if (options && options.width) p_w = this.width = options.width;
            if (options && options.height) p_h = this.height = options.height;
            this.player_starts_recorder = false;
            var videoObj = $("#videoDiv").prepend('<video id="vjsPlayer" class="video-js vjs-default-skin" width="' + p_w + '" height="' + p_h + '" poster=""> </video>').children();
            videojs(videoObj[0], {
                controls: false,
                autoplay: false,
                preload: "none",
                menu: false
            }, vjs_on_player_ready);
            if (options.centered && options.centered === true) $("#videoDiv").vrtCenter();
        } else {
            $(vrt).trigger("vrtstep_loaded");
        }
    };
    this.timeout_alert = 0, this.videos_preload = null, this.test_media_path = this.media_path_pre + "throughput_test.mp4", 
    this.enough_bandwidth = false;
    this.videos_preload = null;
    this.watchdog_start = function() {
        clearTimeout(this.timeout_alert);
        this.timeout_alert = setTimeout(function() {
            call_callback(false);
        }, 1e4);
    };
    this.call_callback = function(success) {
        this.videos_preload.off();
        clearTimeout(this.timeout_alert);
        try {
            this.videos_preload = this.videos_preload[0];
            this.videos_preload.pause();
            this.videos_preload.currentTime = 1e6;
            this.videos_preload.src = "";
        } catch (e) {}
        this.videos_preload = null;
        callback(success || this.enough_bandwidth);
    };
    this.preloadPlayer = function() {
        this.log("preloading start");
        return this.setupPreLoadPlayer();
    };
    this.setupPreLoadPlayer = function(callback) {
        this.videos_preload = $('<video preload="auto" />');
        this.log("preloading end");
    };
}

function vjs_on_player_ready() {
    vrt.player.on_player_ready(this);
}

function YtInterface() {
    this.inheritFrom = PlayerInterface;
    this.inheritFrom();
    this.video_play = function(cb) {
        this.log(">>STEP video play " + vrt.media_path);
        vrt.logTime("YtInterface video_play");
        if (this.player) {
            this.log("player [YT]: play" + vrt.media_path);
            this.player.loadVideoById(vrt.media_path, 0, "small");
            if (cb) cb();
        } else {}
    };
    this.video_stop = function(cb) {
        this.log(">>STEP player stop");
        vrt.logTime("YtInterface video_stop");
        if (this.player) {
            this.log("player [YT]: stop");
            this.player.stopVideo();
        }
        if (cb) cb();
    };
    this.video_after_close_window = function() {
        this.is_player_ready = false;
    };
    this.video_go_fullscreen = function() {
        return "";
        var el = document.getElementById("videoDiv");
        if (el.requestFullScreen) {
            el.requestFullScreen();
        } else if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        } else {
            this.hasFullscreen = false;
        }
        this._player_is_fullscreen = true;
    };
    this.video_end_fullscreen = function() {
        return "";
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        this._player_is_fullscreen = false;
    };
    this.state2string = function(state) {
        switch (state) {
          case -1:
            return "unstarted";
            break;

          case 0:
            return "ended";
            break;

          case 1:
            return "playing";
            break;

          case 2:
            return "paused";
            break;

          case 3:
            return "buffering";
            break;

          case 5:
            return "video cued";
            break;

          default:
            return "unknown [" + state + "]";
            break;
        }
    };
    this.getCurrentTime = function() {
        if (vrt.player.player) {
            return vrt.player.player.getCurrentTime();
        } else {
            return 0;
        }
    };
    this.onytplayerError = function(newState) {
        this.log("player error [YT]: " + newState);
        $(window.vrt).trigger("vrt_event_error", {
            component: "player",
            error: "player error" + newState,
            type: "blocking"
        });
    };
    this.loadPlayer = function(options, cbSuccess) {
        this.log(">>STEP player load");
        vrt.logTime("YtInterface loadPlayer");
        if (!this.player) {
            this.player_starts_recorder = false;
            var p_w = this.width;
            var p_h = this.height;
            if (options && options.width) p_w = this.width = options.width;
            if (options && options.height) p_h = this.height = options.height;
            $("#videoDiv").append('<div id="videoDivConvict"></div>');
            var params = {
                allowScriptAccess: "always",
                allowFullScreen: true,
                wmode: this.decideWmode(),
                menu: false
            };
            var atts = {
                id: "ytPlayer"
            };
            swfobject.embedSWF("https://www.youtube.com/apiplayer?" + "version=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playerapiid=player1", "videoDivConvict", p_w, p_h, "11.1", null, null, params, atts);
            if (options.centered && options.centered === true) $("#ytPlayer").vrtCenter();
            vrt.player.blockRClick("ytPlayer");
            if (cbSuccess) cbSuccess();
        } else {
            $(vrt).trigger("vrtstep_loaded");
        }
    };
    this.player_dispose = function() {
        this.log(">>STEP player dispose");
        vrt.logTime("YtInterface player_dispose");
        swfobject.removeSWF("ytPlayer");
        $("#videoDiv").remove();
    };
    this.preloadPlayer = function() {
        this.log(">>STEP player pre-load");
    };
}

var playerInterface = new PlayerInterface();

var vjsInterface = new VjsInterface();

var ytInterface = new YtInterface();

window.playerInterface = playerInterface;

window.vjsInterface = vjsInterface;

window.ytInterface = ytInterface;

window.onYouTubePlayerReady = function() {
    vrt.logTime("onYouTubePlayerReady");
    vrt.log("player [YT]: onYouTubePlayerReady");
    vrt.player.player = document.getElementById("ytPlayer");
    vrt.player.player.addEventListener("onStateChange", "onytplayerStateChange");
    vrt.player.player.addEventListener("onError", "onytplayerError");
    vrt.player.blockRClick("ytPlayer");
    $(vrt).trigger("vrtstep_loaded");
};

window.onytplayerError = function(newState) {
    $(window.vrt).trigger("vrt_event_error", {
        component: "player",
        error: "player error" + newState,
        type: "blocking"
    });
};

window.onytplayerStateChange = function(newState) {
    vrt.logTime("onytplayerStateChange " + newState);
    $(vrt).trigger("vrtevent_player_ts", {
        status: vrt.player.statusMap(newState, "yt")
    });
    $(vrt).trigger("vrtstep_playerStateChange", [ {
        state: newState,
        time: vrt.logTime("YT")
    } ]);
    if (newState == 3) {
        $(vrt).trigger("vrtstep_play", {
            caller: "onytplayerStateChange3"
        });
    }
    if (newState == 1) {
        $(vrt).trigger("vrtstep_play", {
            caller: "onytplayerStateChange1"
        });
    }
    if (newState == 0) {
        $(vrt).trigger("vrt_event_stimuli_end");
        if (!vrt.timedOverPlayToEnd) {
            vrt.skip_video();
        }
    }
};

var scriptUrl = function() {
    var scripts = document.getElementsByTagName("script"), script = scripts[scripts.length - 1];
    var url;
    if (script.getAttribute.length !== undefined) {
        url = script.getAttribute("src");
    } else {
        url = script.getAttribute("src", 2);
    }
    url = url.split("/");
    url.pop();
    url = url.join("/");
    return url + "/";
}();

function Vrt(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {
    this.videoList = null;
    this.videoListOrdered = null;
    this.videoFullscreen = false;
    this.videoType = null;
    this.canSkip = false;
    this.debug = false;
    this.debugEvt = false;
    this.debugTime = false;
    this.debugChrono = false;
    this.debugChronoHtml = false;
    this.debugVImportant = false;
    this.options = {};
    this.apiHttps;
    this.fatalError = false;
    this.userError = false;
    this.playerVersion = null;
    this.producer = null;
    this.producerID = null;
    this.producerID = null;
    this.producerWidth = null;
    this.producerHeight = null;
    this.swfobject = false;
    this.vrt = false;
    this.vrtID = false;
    this.producerStreamUrl = null;
    this.producerStreamName = null;
    this.producerStreamWidth = 640;
    this.producerStreamHeight = 480;
    this.stream_code = null;
    this.recAutoHide = true;
    this.recorderCenter = true;
    this.randomOrder = false;
    this.flash_allowed = false;
    this.ww = 0;
    this.wh = 0;
    this.media_id = null;
    this.media_name = null;
    this.media_name_real = null;
    this.media_length = 0;
    this.media_path = null;
    this.media_path_full = null;
    this.exitcode = null;
    this.mainStyle = "";
    this.timeRecStart = -1;
    this.timePlayerStart = -1;
    this.bufferTS = [];
    this.stepCompleted = false;
    this.timedOverPlayToEnd;
    this.continuosPlay = false;
    this.click_start = false;
    this.isRecording = false;
    this.isPlaying = false;
    this.currentMedia = -1;
    this.mediaCount = 0;
    this.streamName = "";
    this.stop_handle;
    this.stop_handle_rec;
    this.swfPath = scriptUrl;
    this.vjs = false;
    this.player = null;
    this.is_player_ready = false;
    this.player_starts_recorder = false;
    this.avgPreLoadTime = 0;
    this.ceclient;
    this.apiUsername;
    this.apiPassword;
    this.apiDomain;
    this.eventList = {};
    this.responseId = null;
    this.results = {
        apilogin: null,
        flash: {
            present: null,
            version: null
        }
    };
    this.responseAtStart = false;
    this.engineType = "kanako";
    this.processVideo = true;
    this.responseList = [];
    this.respondentId = null;
    this.newInit = false;
    this.researchTitle = "";
    this.researchDesc = "";
    this.customData = "";
    this.researchComplete = true;
    this.researchArchived = false;
    this.researchReady = false;
    this.researchOutUrl = null;
    this.researchOutUrlOriginal = null;
    this.recordingAudio = false;
    this.reloadFlash = null;
    this.initMediaList = function(type, list) {
        if (!list) return;
        this.mediaCount = list.length;
        this.videoType = type;
        this.videoList = list;
        this.videoListOrdered = list;
        this.calculateListData();
        this.randomizeOrderList();
        this.log(type, "type");
        this.log(list, "list");
    };
    this.checkOpt = function(options, k, def) {
        return options && options[k] != null && options[k] != undefined ? options[k] : def;
    };
    this.initialized = function(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {
        if (typeof type == "object") {
            var data = type;
            list = data.list || {};
            streamUrl = data.streamUrl || "mediabox.crowdemotion.co.uk";
            streamName = data.streamName || null;
            apiDomain = data.apiDomain || "https://api.crowdemotion.co.uk";
            apiUser = data.apiUser || null;
            apiPassword = data.apiPassword || null;
            options = type;
            type = data.type || null;
            this.newInit = true;
        }
        if (!options) options = {
            player: {}
        };
        if (!options.player) options.player = {};
        if (options.fullscreen) {
            this.videoFullscreen = options.fullscreen && this.checkSafariMinVer(false, 6);
        } else {
            this.videoFullscreen = false;
        }
        this.skip = options.skip || false;
        this.vrtID = options.vrtID || "vrt";
        this.producerID = options.producerID || "producer";
        this.producerWidth = options.producerWidth || 320;
        this.producerHeight = options.producerHeight || 240;
        this.debug = options.debug || false;
        this.debugEvt = options.debugEvt || this.debug;
        this.debugChrono = options.debugChrono || this.debug;
        this.debugVImportant = options.debugVImportant || this.debug;
        this.debugImportant = options.debugImportant || false;
        this.debugTime = options.debugTime || false;
        this.debugChronoHtml = options.debugChronoHtml || false;
        this.producerStreamWidth = options.producerStreamWidth || 640;
        this.producerStreamHeight = options.producerStreamHeight || 480;
        this.avgPreLoadTime = options.avgPreLoadTime || 0;
        this.recorderCenter = this.checkOpt(options, "recorderCenter", true);
        this.randomOrder = this.checkOpt(options, "randomOrder", false);
        this.apiHttps = options.apiHttps || true;
        this.continuosPlay = this.checkOpt(options, "continuosPlay", false);
        this.swfPath = options.swfPath || scriptUrl;
        this.timedOverPlayToEnd = options.timedOverPlayToEnd || false;
        this.options = options;
        this.options.player.centered = this.checkOpt(options, "playerCentered", true);
        this.options.player.width = options.playerWidth || 640;
        this.options.player.height = options.playerHeight || 400;
        this.options.apiSandbox = this.checkOpt(options, "apiSandbox", false);
        this.responseAtStart = this.checkOpt(options, "responseAtStart", true);
        this.options.engineType = options.engineType || "kanako";
        this.options.respondentCustomDataString = options.respondentCustomDataString || {};
        this.options.respondentCustomData = options.respondentCustomData || {};
        this.options.respondentName = options.respondentName || "";
        this.options.apiClientOnly = this.checkOpt(options, "apiClientOnly", false);
        this.options.customData = options.customData || {};
        this.options.customDataInsertMediaName = true;
        this.options.customDataInsertMediaId = true;
        this.options.customDataInsertMediaPath = true;
        this.options.referrer = document.referrer ? document.referrer : "";
        this.options.locationHref = document.location.href ? document.location.href : "";
        if (this.newInit) {
            this.responseAtStart = options.responseAtStart = true;
        }
        this.producerStreamUrl = streamUrl;
        this.producerStreamName = this.clearname(streamName);
        this.initMediaList(type, list);
        this.apiDomain = apiDomain;
        this.apiUsername = apiUser;
        this.apiPassword = apiPassword;
        this.researchId = options.researchId;
        this.researchToken = options.researchToken;
        this.appToken = options.appToken;
        this.recordingAudio = options.recordingAudio || false;
    };
    this.init = function() {
        this.log(">>STEP: vrt init");
        window.vrt = this;
        this.log(this.mediaCount, "mediaCount");
        this.log(this.currentMedia, "currentMedia");
        this.log(this.producerStreamUrl, "producerStreamUrl");
        this.log(this.producerStreamName, "producerStreamName");
        this.injectLayout();
        this.initVar();
        this.vrtOn();
        this.playerVersion = swfobject.getFlashPlayerVersion();
        this.log("playerVersion");
        this.log(this.playerVersion.major);
        this.log(this.playerVersion.minor);
        this.log("EVT flash" + this.playerVersion.major);
        if (this.playerVersion.major == 0) {
            this.results.flash.present = false;
            $(window.vrt).trigger("vrt_event_flash_no");
            this.log("EVT no flash");
        } else {
            this.results.flash.present = true;
            $(window.vrt).trigger("vrt_event_flash_is_present");
        }
        if (vrt.options.apiClientOnly && vrt.options.apiClientOnly === true) {} else {
            if (swfobject.getFlashPlayerVersion("11.1.0")) {
                this.results.flash.version = true;
                $(window.vrt).trigger("vrt_event_flash_version_ok");
                this.loadProducer(vrt.swfPath);
            } else {
                this.results.flash.version = false;
                this.log("Flash is old=" + this.playerVersion.major + "." + this.playerVersion.minor);
                $(window.vrt).trigger("vrt_event_flash_old");
            }
        }
        this.ceclient = new CEClient();
        this.apiClientSetup(function() {
            $(window.vrt).trigger("api_init_ok");
            if (console.log) console.log("apiClientSetup api login success");
        }, function() {
            $(window.vrt).trigger("vrt_event_api_login_fail");
            if (console.log) console.log("apiClientSetup api login error");
        });
        $(this).trigger("vrt_init_ok");
    };
    this.initVar = function() {};
    this.injectLayout = function() {
        var pre = this.vrtID;
        var certerstyle = "";
        this.options && this.options.mainStyle ? "" : this.options.mainStyle = certerstyle;
        this.options && this.options.recStyle ? "" : this.options.recStyle = certerstyle;
        this.options && this.options.videoStyle ? "" : this.options.videoStyle = certerstyle;
        if (this.options.apiClientOnly && this.options.apiClientOnly === true) {
            this.options.recStyle = "height: 1px; width: 1px; position: absolute: left: -1000000px";
        }
        var html = " <div id='vrtWrapper' class='vrtWrap' style='" + this.options.mainStyle + "'> " + "<style>.vrtHide{display:none};.vrtClearfix{clear:both}</style>" + "<div id='vrtLoader'></div>" + "<div id='vrtFrameWr'></div>" + (this.options.htmlVideoPre ? this.options.htmlVideoPre : "") + "<div id='vrtVideoWrapper' class='vrtWrap' style='" + this.options.videoStyle + "'>                                                      " + "      <div id='vrtvideo' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='videoDiv' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='ytPlayer' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div class='vrtClearfix'></div>                                                                     " + "</div>                                                                                               " + (this.options.htmlVideoPost ? this.options.htmlVideoPost : "") + (this.options.htmlRecorderPre ? this.options.htmlRecorderPre : "") + "       <div id='vrtProducer' class='vrtWrap " + this.options.htmlRecorderClass + "' style='" + this.options.recStyle + "'>                      " + "           <div class='vrtHide' id='producerCamerafix' style='display:none'>" + "              Sorry, there is a problem accessing yout camera. " + "              Please, check your browser dialogs in order to allow camera access and then click " + "             <input id='retrybtn' type='button' value='Try again'></div> " + "           <div id='producer'></div>                                                                   " + "           <div class='vrtClearfix'></div>                                                                " + "       </div>                                                                                          " + (this.options.htmlRecorderPost ? this.options.htmlRecorderPost : "") + "<div id='vrtLogWrapper' class='vrtWrap'>                                                      " + "      <div id='vrtalert'></div>                                                                        " + "      <div id='vrt_timer_player'></div>                                                                       " + "      <div id='vrt_timer_recorder'></div>                                                                       " + "      <div class='vrtClearfix'></div>                                                                     " + "</div>                                                                                               " + "</div>";
        var debugHtml = "<div id='vrtValues' class='vrtWrap'>                                                             " + "          <h4>Info</h4>                                                                                " + "          <div id='vrtVal_type'>Type: <span></span></div>                                              " + "          <div id='vrtVal_mediaCount'>media count: <span></span></div>                                 " + "          <div id='vrtVal_currentMedia'>current media: <span></span></div>                             " + "          <div id='vrtVal_list'>List: <span></span></div>                                              " + "          <div id='vrtVal_producerStreamUrl'>Producer stream URL: <span></span></div>                  " + "          <div id='vrtVal_producerStreamName'>Producer stream name: <span></span></div>                " + "          <div id='vrtVal_producerConnStatus'>Producer conn status: <span>Not connected</span></div>   " + "          <div id='vrtVal_apiStatus'>API status: <span>Not connected</span></div>                      " + "          <div id='vrtVal_fileUpload'>Files: <span>Not connected</span></div>                          " + "      </div>                                                                                           " + "      <div id='vrtLog'></div>                                                                          ";
        $("#" + pre).html(html);
    };
    this.recorderHide = function(altFunction, callback) {
        if (!altFunction) {
            $("#vrtProducer").css("visibility", "hidden");
            $("#producer").css("visibility", "hidden");
            $("#vrtProducer").css("z-index", -1e3);
            $("#producer").css("z-index", -1e3);
            $("#vrtProducer").css("height", "1px");
            $("#producer").css("width", "1px");
        } else {
            altFunction();
        }
        if (callback) callback();
    };
    this.recorderShow = function(altFunction, callback) {
        if (!altFunction) {
            $("#vrtProducer").css("visibility", "visible");
            $("#producer").css("visibility", "visible");
            $("#vrtProducer").css("z-index", 1e3);
            $("#producer").css("z-index", 1e3);
            $("#vrtProducer").css("height", "320px");
            $("#producer").css("width", "240px");
        } else {
            altFunction();
        }
        if (callback) callback();
    };
    this.trigger = function(type, data) {
        $(vrt).trigger(type, data);
    };
    this.saveBufferedTS = function(cb) {
        var ar = vrt.bufferTS;
        if (ar instanceof Array && ar.length > 0) {
            for (var i = 0; i < ar.length; i++) {
                setTimeout(vrt.addTS(ar[i]), 100);
            }
            vrt.bufferTS = [];
        }
        if (cb) cb();
    };
    this.vrtOnStartSequence = 0;
    this.vrtOn = function() {
        $(window.vrt).on("vrt_event_error", function(e, data) {
            if (data.type == "blocking") {
                vrt.llog("blocking error: " + data.error + " in " + data.component + "");
                window.vrt.fatalError = true;
            } else if (data.type == "user_bloking") {
                vrt.llog("blocking error by user: " + data.error + " in " + data.component + "");
                window.vrt.userError = true;
            } else {
                vrt.llog("error" + data.error + " in " + data.component + "");
            }
            if (window.vrt.fatalError == true) {
                window.vrt.stepCompleted = true;
                if (vrt.player && vrt.player.player && vrt.player.player.dispose) {
                    vrt.player.player.dispose();
                }
                $(window.vrt).trigger("vrt_event_fatal_error");
            }
        });
        $(window.vrt).on("vrt_event_producer_camera_ok", function() {
            vrt.llog("!! PlayCorder initialized correctly (vrt_event_producer_camera_ok)");
        });
        $(window.vrt).on("vrt_init_ok", function() {
            vrt.llog("!!--vrt_init_ok");
            window.vrt.vrtTrigLoadend("vrt_init_ok");
        });
        $(window.vrt).on("producer_init_camera_ok", function() {
            vrt.llog("!!--producer_init_camera_ok");
            setTimeout(function() {
                vrt.producerSetupConnection(vrt.producerConnection);
            }, 1e3);
        });
        $(window.vrt).on("api_init_ok", function() {
            vrt.llog("!!--api_init_ok");
            window.vrt.vrtTrigLoadend("api_init_ok");
        });
        $(window.vrt).on("vrtstep_loaded", function() {
            vrt.log("EVT vrtstep_loaded");
            vrt.log(">>EVT vrtstep_loaded");
            if (vrt.responseAtStart === true) {
                if (vrt.responseList[vrt.currentMedia] === undefined) {
                    vrt.apiClientWriteResponse(null, function(res) {
                        vrt.responseList[vrt.currentMedia] = res.id;
                        $(window.vrt).trigger("vrt_event_create_response", [ {
                            data: res.id
                        } ]);
                        $(window.vrt).trigger("vrtstep_loaded_by_response");
                    });
                }
            } else {
                vrt.player.video_play(vrt.showVisibility("#videoDiv"));
            }
        });
        $(window.vrt).on("vrtstep_loaded_by_response", function() {
            vrt.player.video_play(vrt.showVisibility("#videoDiv"));
        });
        $(window.vrt).on("vrt_event_user_skip_video", function() {
            vrt.skip_video();
        });
        $(window.vrt).on("vrtstep_playerStateChange", function(e, data) {
            vrt.log("EVT vrtstep_playerStateChange " + data.state + " time " + data.time[4] + " " + data.time[5] + " " + data.time[6]);
        });
        $(window.vrt).on("vrtevent_player_ts", function(e, data) {
            vrt.newTS(data);
        });
        $(window.vrt).on("vrtstep_loadplay", function() {
            vrt.log("EVT vrtstep_loadplay");
        });
        $(window.vrt).on("vrtstep_play", function(e, data) {
            vrt.log("EVT vrtstep_play caller " + data.caller);
            vrt.llog("REC event");
            if (!vrt.isPlaying) {
                vrt.streamName = this.videoList[this.currentMedia].streamCode;
                $(window.vrt).trigger("vrt_event_streamname", [ {
                    streamname: vrt.streamName
                } ]);
                vrt.llog("REC event before " + vrt.streamName);
                try {
                    vrt.producer.remoteLogger.name = vrt.streamName;
                    vrt.producer.publish(vrt.streamName);
                } catch (err) {
                    vrt.llog("exception in producer.publish");
                    vrt.llog(err);
                    $(window.vrt).trigger("vrt_event_producer_error", [ {
                        data: err
                    } ]);
                }
                vrt.isPlaying = true;
                vrt.logChrono(1, true, "player");
                vrt.setup_stop_playing();
                vrt.setupPlaybackPositionPolling();
            }
        });
        $(window.vrt).on("vrtstep_connect", function() {
            vrt.log("EVT vrtstep_connect " + vrt.logTime());
        });
        $(window.vrt).on("vrt_event_publish", function() {
            vrt.log("EVT vrt_event_publish  " + vrt.logTime());
        });
        $(window.vrt).on("vrtstep_disconnect", function() {
            vrt.log("EVT vrtstep_disconnect");
        });
        $(window.vrt).on("vrt_event_start_video_session", function() {
            if (window.vrt.recAutoHide == false) {
                window.vrt.setupPlayer();
            } else {
                window.vrt.recorderHide(null, window.vrt.setupPlayer());
            }
        });
        $(window.vrt).on("vrt_event_user_next_video", function() {
            window.vrt.skip_video();
        });
        $(window.vrt).on("vrt_event_user_session_complete", function() {
            window.vrt.closeSession();
        });
        $(window.vrt).on("vrt_event_logchrono", function(e, data) {
            vrt.log("EVT vrt_event_logchrono");
            if (console && console.log) console.log(data);
        });
        $(window.vrt).on("vrt_event_frame_open", function(e, data) {
            vrt.log("EVT vrt_event_frame_open");
            vrt.createFrame(data);
        });
        $("#vrtWrapper").on("click", "#vrtFrameClose", function() {
            vrt.closeFrame();
        });
        $(window.vrt).on("vrt_event_video_step_completed", function() {
            if (vrt.continuosPlay === true) {
                $(window.vrt).trigger("vrt_event_user_next_video");
            }
        });
        $(window.vrt).on("vrt_event_user_click_yes_camera", function() {
            vrt.llog("!! user click yes camera");
        });
        $(window.vrt).on("vrt_event_user_click_no_camera", function() {
            vrt.llog("!! user click no camera");
        });
    };
    this.newTS = function(data) {
        if (vrt.streamName == "" || vrt.streamName == null || vrt.streamName == undefined) return;
        var dataTS = vrt.createTS(data);
        if (vrt.isRecording == true) {
            vrt.saveBufferedTS(function() {
                vrt.addTS(dataTS);
            });
        } else {
            vrt.bufferTS.push(dataTS);
        }
    };
    this.createTS = function(data) {
        return {
            time: Date.now(),
            player_ts: vrt.getTimeStampPlayerDiff(),
            rec_ts: vrt.getTimeStampRecDiff(),
            time_recorder: vrt.producer.getStreamTime(),
            status: data.status,
            content_id: this.media_id,
            player_position: vrt.player.getCurrentTime()
        };
    };
    this.addTS = function(TS, cbOk, cbNo) {
        vrt.producer.addTimedMetadata(TS, function() {
            if (cbOk) cbOk();
        }, function() {
            if (cbNo) cbNo();
        });
    };
    this.openFrame = function(src, options) {
        $(vrt).trigger("vrt_event_frame_open", [ {
            src: src,
            html: options.html,
            width: options.width,
            height: options.height,
            showBtnClose: options.showBtnClose,
            btnCssClass: options.btnCssClass,
            btnStyle: options.btnStyle,
            btnText: options.btnText,
            btnPosition: options.btnPosition
        } ]);
    };
    this.closeFrame = function() {
        $("#vrtFrame").hide();
        $(window.vrt).trigger("vrt_event_frame_close");
    };
    this.vrtTrigLoadend = function(evtname) {
        window.vrt.vrtOnStartSequence++;
        vrt.log("EVT vrtOnStartSequence " + evtname + " " + window.vrt.vrtOnStartSequence);
        if (window.vrt.vrtOnStartSequence >= 3) {
            vrt.log("!!--> vrt_event_preview_loaded ");
            $(window.vrt).trigger("vrt_event_preview_loaded");
        }
    };
    this.playerConnectionLatency = function() {
        return 0;
        if (vrt.videoType == "youtube") {
            return 0;
        } else {
            return 0;
        }
    };
    this.makeRandomString = function(limit) {
        var limit = limit || 15;
        return Math.random().toString(36).substring(2, limit) + Math.random().toString(36).substring(2, limit);
    };
    this.createHashCode = function(str) {
        var asString = false;
        var seed = undefined;
        var i, l, hval = seed === undefined ? 2166136261 : seed;
        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if (asString) {
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;
    };
    this.calculateListData = function() {
        for (var i = 0; i < this.mediaCount; i++) {
            var d = new Date();
            var n = d.getTime();
            var pre = this.createHashCode("" + this.producerStreamName);
            var rs = this.makeRandomString(8);
            this.videoList[i].streamCode = pre + "_" + i + "_" + n + "_" + rs;
            this.videoList[i].order = i;
        }
    };
    this.randomizeOrderList = function() {
        if (this.randomOrder === true && this.mediaCount > 1) {
            this.videoList = this.shuffle(this.videoList);
        }
    };
    this.shuffle = function(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], 
        o[j] = x) ;
        return o;
    };
    this.buildVideoSources = function(mediaInfo) {
        if (this.videoType == "customserver") {
            this.sources = [ {
                type: "video/mp4",
                src: mediaInfo.path
            } ];
        } else {
            this.sources = [ {
                type: "video/youtube",
                src: mediaInfo.path_original
            } ];
        }
    };
    this.startButton = function() {
        $("#vrtGuidingButton").click(this, function(vrtObj) {
            vrt.click_start = true;
            vrt.hideAllAndStartPlayer();
            vrt.trigger("vrt_start_ok");
        });
    };
    this.canStartButton = function() {
        this.log("canStartButton");
        $("body").on("click", "#vrtCanStartButton", this.setupCanStartButton);
    };
    this.setupCanStartButton = function() {
        vrt.log("canStartButton click");
        vrt.click_start = true;
        $("#vrtGuidingButton").show();
        vrt.popOverCe("pop_start");
    };
    this.hideAllAndStartPlayer = function() {
        this.hideVisibility("#vrtProducer");
        this.hideVisibility("#vrtCanStartButtonWrapper");
        this.hideVisibility("#vrtGuidingButton");
        this.producer.height = 1;
        this.producer.width = 1;
    };
    this.hideVisibility = function(el) {
        $(el).css("visibility", "hidden");
        $(el).css("z-index", -1e3);
    };
    this.showVisibility = function(el) {
        $(el).css("visibility", "visible");
        $(el).css("z-index", 0);
    };
    this.facevideoUpload = function(url, cb, opts) {
        this.log(url, "fileUpload", "a");
        this.log("!! " + url);
        this.apiClientUploadLink(url, cb, opts);
    };
    this.externalDataSave = function(id, data, cb) {
        this.log("externalDataSave" + id);
        this.log(data);
        this.apiClientSaveCustomData(id, data, cb);
    };
    this.hideVideoBox = function(cb) {
        if (cb) cb();
    };
    this.postPartecipate = function(cb) {
        if (cb) cb();
    };
    this.Webprod_videoSaved_video = function() {
        this.facevideoUpload(this.afterfacevideoUpload);
    };
    this.afterfacevideoUpload = function(res) {
        this.log("upload face video");
        this.log(res);
        $(window.vrt).trigger("vrt_event_facevideo_upload", res.responseId);
    };
    this.setupPlayer = function() {
        this.log("setupPlayer / guideButtonVideo");
        if (this.videoType == "youtube") {
            this.player = window.ytInterface;
        } else {
            var browserName = null, nAgt = navigator.userAgent;
            if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browserName = "Chrome";
            } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browserName = "Firefox";
            }
            videojs.options.techOrder = [ "flash", "html5" ];
            if (browserName == "Chrome" || browserName == "Firefox") {
                videojs.options.techOrder = [ "html5", "flash" ];
            }
            this.player = window.vjsInterface;
        }
        var preloadfunc = this.player.preloadPlayer();
        this.dopreload(preloadfunc);
    };
    this.afterpreload = function(success) {
        if (this.currentMedia == -1) this.nextStep();
    };
    this.dopreload = function(preloadfunc) {
        if (preloadfunc) {
            preloadfunc(this.afterpreload);
        } else {
            this.afterpreload(true);
        }
    };
    this.stepComplete = function(res) {
        if (window.vrt.options && window.vrt.options.customData) {
            if (window.vrt.options.customData === true) {
                window.vrt.options.customData = {};
            }
            if (window.vrt.options.customDataInsertMediaId && window.vrt.options.customDataInsertMediaId === true) {
                window.vrt.options.customData.media_id = window.vrt.media_id;
            }
            if (window.vrt.options.customDataInsertMediaName && window.vrt.options.customDataInsertMediaName === true) {
                window.vrt.options.customData.media_name = window.vrt.media_name_real;
            }
            if (window.vrt.options.customDataInsertMediaPath && window.vrt.options.customDataInsertMediaPath === true) {
                window.vrt.options.customData.media_path = window.vrt.media_path_full;
            }
            if (window.vrt.options.customDataInsertMediaLength && window.vrt.options.customDataInsertMediaLength === true) {
                window.vrt.options.customData.media_length = window.vrt.media_length;
            }
            window.vrt.apiClientSaveCustomData(res.responseId, window.vrt.options.customData, function() {
                window.vrt.loader("postVideo", "default", false);
                $(window.vrt).trigger("vrt_event_video_step_completed", [ {
                    responseId: res.responseId,
                    insertedCustomData: true
                } ]);
            });
        } else {
            window.vrt.loader("postVideo", "default", false);
            $(window.vrt).trigger("vrt_event_video_step_completed", [ {
                responseId: res.responseId,
                insertedCustomData: false
            } ]);
        }
        window.vrt.stepCompleted = true;
    };
    this.nextStep = function() {
        this.log("nextStep");
        this.log(">>STEP nextStep " + this.currentMedia);
        if (this.currentMedia++ < this.mediaCount - 1) {
            window.vrt.stepCompleted = false;
            this.logChronoReset();
            this.log(this.currentMedia, "currentMedia");
            this.log("nextStep=" + this.currentMedia);
            if (this.currentMedia >= 0) {}
            this.media_name = this.clearname(this.videoList[this.currentMedia].name);
            this.media_name_real = this.videoList[this.currentMedia].name;
            if (this.videoList[this.currentMedia].id) {
                this.media_id = this.videoList[this.currentMedia].id;
            } else {
                this.media_id = this.media_name;
            }
            this.media_length = this.videoList[this.currentMedia].length;
            if (this.videoType == "youtube") {
                this.media_path = this.youtubeParser(this.videoList[this.currentMedia].path);
            } else {
                this.media_path = this.videoList[this.currentMedia].path;
            }
            this.media_path_full = this.videoList[this.currentMedia].path;
            this.log(">>STEP  YT path " + this.media_path);
            $(window.vrt).trigger("vrt_event_video_session_proceedToShow");
            this.proceedToShow();
        } else {
            $(window.vrt).trigger("vrt_event_video_session_complete");
        }
    };
    this.clearname = function(s) {
        if (s) return s.toString().replace(/[^a-z0-9]/gi, "_").toLowerCase(); else return s;
    };
    this.closeSession = function() {
        if (this.videoFullscreen) this.videoEndFullscreen();
        this.playerDispose();
        this.producer.disconnect();
        $("#" + this.producer.id).hide();
        this.log("close_session");
    };
    this.videoEndFullscreen = function() {};
    this.playerDispose = function() {
        if (this.player) {
            this.player.player_dispose();
        }
    };
    this.proceedToShow = function() {
        this.log("proceedToShow");
        this.player.loadPlayer(this.options.player);
        this.player_is_ready();
    };
    this.player_is_ready = function() {
        if (vrt.videoFullscreen) {
            this.llog("player_is_ready go fs");
            vrt.player.video_go_fullscreen();
        }
    };
    this.producerSetupConnection = function(cb) {
        this.log("!! filename " + this.producerStreamName);
        var url = "rtmp://" + this.producerStreamUrl + ":1935/live";
        this.log("!! url " + url);
        this.producer.setUrl(url);
        this.producer.setStreamWidth(this.producerStreamWidth);
        this.producer.setStreamHeight(this.producerStreamHeight);
        $(vrt).trigger("vrt_event_connection_setup");
        if (cb) cb();
    };
    this.producerConnection = function() {
        vrt.log("!!STEP producer connection " + Date.now());
        setTimeout(function() {
            vrt.producer.connect();
            $(vrt).trigger("vrt_event_connect_start");
        }, 500);
    };
    this.hideVideobox = function(cb) {
        this.log("hideVideoBox");
        var id = "videoDiv";
        $("#" + id).css("z-index", "-1000");
        $(".ui-dialog").css("z-index", "-1000");
        $("#vjsPlayer").hide();
        if (cb) cb();
    };
    this.loadProducer = function(swfPath) {
        this.log("loadProducer");
        this.log(">>STEP producer init");
        this.webProducerInit(swfPath);
    };
    this.popOverCe = function(type) {};
    this.llog = function(msg) {
        if (window.console && console.log) console.log(msg);
    };
    this.log = function(msg, display, mode) {
        if (!this.debug) return "";
        if (!msg) return "";
        var str = msg.toString().substring(0, 2);
        if (!this.debugEvt && str == "EV") return "";
        if (!this.debugTime && str == "TM") return "";
        if (!this.debugImportant && str == ">>") return "";
        if (!this.debugVImportant && str == "!!") return "";
        if (str == ">>" || str == "EV" || str == "TM" || str == "!!") {
            if (str == "TM") this.logTime(msg);
            if (console && console.log) console.log(msg);
            if (display != undefined && this.debug == true) {
                if (msg instanceof Object) {
                    $("#vrtVal_" + display + " span").html(JSON.stringify(msg));
                } else {
                    if (mode && mode == "a") $("#vrtVal_" + display + " span").append("<br/>" + JSON.stringify(msg)); else $("#vrtVal_" + display + " span").html(msg.toString());
                }
            }
        }
    };
    this.logTime = function(msg) {
        if (!msg) msg = "";
        var date = new Date();
        var datevalues = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), date.getTime() ];
        if (!this.debugTime) {} else {
            if (console && console.log && msg != "") console.log("TIME " + msg + ": " + datevalues[4] + " " + datevalues[5] + " " + datevalues[6]);
        }
        return datevalues;
    };
    this.chronoStart = [];
    this.chronoEnd = [];
    this.chronoMessagge = [];
    this.chronoALertStart = false;
    this.chronoALertEnd = false;
    this.chronoType = [ "recording", "playing", "producer_saving", "api_upload", "", "publish" ];
    this.logChronoReset = function() {
        this.chronoStart = [];
        this.chronoEnd = [];
        this.chronoMessagge = [];
        this.chronoALertStart = false;
        this.chronoALertEnd = false;
    };
    this.getTimeStampPlayerDiff = function() {
        var timeCheck = vrt.logTime();
        if (this.timePlayerStart == -1) return -1;
        return timeCheck[7] - this.timePlayerStart;
    };
    this.getTimeStampRecDiff = function() {
        var timeCheck = vrt.logTime();
        if (this.timeRecStart == -1) return -1;
        return timeCheck[7] - this.timeRecStart;
    };
    this.logChrono = function(pos, start, msg) {
        if (msg == undefined) msg = vrt.chronoType[pos];
        var echo = false;
        var echoHtml = false;
        var str = "";
        var strend = "";
        var startm = "end";
        if (start === true) startm = "start";
        var posm = "recorder";
        if (pos == 1) posm = "player";
        var timeCheck = vrt.logTime();
        $(vrt).trigger("vrt_event_" + posm + "_" + startm);
        if (this.debugChrono == undefined) {} else {
            echo = this.debugChrono;
        }
        if (pos == 0 && start == true) {
            this.timeRecStart = timeCheck[7];
        }
        if (pos == 0 && start == false) {
            this.timeRecStart = -1;
        }
        if (pos == 1 && start == true) {
            this.timePlayerStart = timeCheck[7];
        }
        if (pos == 1 && start == false) {
            this.timePlayerStart = -1;
        }
        if (start) {
            vrt.chronoMessagge[pos] = msg;
            vrt.chronoStart[pos] = timeCheck;
        } else {
            vrt.chronoEnd[pos] = timeCheck;
        }
        str = "";
        strend = "";
        if (vrt.chronoStart[0] && vrt.chronoStart[1] && vrt.chronoALertStart == false) {
            vrt.chronoALertStart = true;
            var afters = vrt.chronoStart[0], befores = vrt.chronoStart[1];
            var start_first = "player";
            if (afters[7] < befores[7]) {
                befores = vrt.chronoStart[0];
                afters = vrt.chronoStart[1];
                start_first = "recorder";
            }
            var difft = afters[7] - befores[7];
            if (echo && console && console.log) console.log("CHRONO DIFF START " + start_first + " start first by " + difft);
            this.eventList.startFirst = start_first;
            this.eventList.startFirstDiff = difft;
        }
        if (vrt.chronoEnd[0] && vrt.chronoEnd[1] && vrt.chronoALertEnd == false && vrt.chronoEnd[0][7] && vrt.chronoEnd[1][7]) {
            vrt.chronoALertEnd = true;
            var after = vrt.chronoEnd[0], before = vrt.chronoEnd[1];
            var end_first = "player";
            if (after[7] < before[7]) {
                before = vrt.chronoEnd[0];
                after = vrt.chronoEnd[1];
                end_first = "recorder";
            }
            var difft = after[7] - before[7];
            if (echo && console && console.log) console.log("CHRONO DIFF END " + end_first + " end first by " + difft);
            this.eventList.endFirst = end_first;
            this.eventList.endFirstDiff = difft;
        }
    };
    this.get_time_diff = function(datetimes, datetimee) {
        var datetime = datetimes;
        var now = datetimee;
        if (isNaN(datetime)) {
            return "";
        }
        if (datetime < now) {
            var milisec_diff = now - datetime;
        } else {
            var milisec_diff = datetime - now;
        }
        var days = Math.floor(milisec_diff / 1e3 / 60 / (60 * 24));
        var date_diff = new Date(milisec_diff);
        return date_diff.getMinutes() + " M " + date_diff.getSeconds() + " S " + date_diff.getMilliseconds() + " m ";
    };
    this.checkSafariMinVer = function(plat, ver) {
        var bver, ua = navigator.userAgent.toLowerCase();
        var isSafari = false;
        if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
            isSafari = true;
        }
        if (isSafari && (!plat || window.navigator.platform.indexOf(plat) >= 0)) return (bver = /Version\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false; else return true;
    };
    this.checkSafari = function() {
        var bver, ua = navigator.userAgent.toLowerCase();
        var isSafari = false;
        if (ua.indexOf("safari") != -1 && ua.indexOf("chrome") <= -1) {
            isSafari = true;
        }
        return isSafari;
    };
    this.checkIe = function() {
        return /msie|trident/i.test(navigator.userAgent);
    };
    this.checkIeVersion = function(version) {
        return navigator.userAgent.toLowerCase().indexOf("msie ") + version != -1 || navigator.userAgent.toLowerCase().indexOf("trident 6") != -1;
    };
    this.youtubeParser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
            return match[7];
        } else {
            return url;
        }
    };
    this.player_started_playing = function() {};
    this.setup_stop_playing = function() {
        if (this.timedOverPlayToEnd) {
            var time = this.media_length * 1e3 + this.avgPreLoadTime + 100;
            this.log("!!STEP vrt setup stop playing" + time);
            this.stop_handle = setTimeout(vrt.stop_playing, time);
            this.stop_handle_rec = setTimeout(vrt.stop_rec, time);
        } else {
            this.stop_handle = setTimeout(function() {}, 0);
            this.stop_handle_rec = setTimeout(function() {}, 0);
        }
    };
    this.skip_video = function() {
        $(vrt).trigger("vrt_event_skip_or_end_video");
        if (!window.vrt.stepCompleted) {
            vrt.stop_playing();
            vrt.stop_rec();
        } else {
            window.vrt.nextStep();
        }
    };
    this.setupPlaybackPositionPolling = function() {
        vrt.stop_polling_player_pos = setInterval(vrt.pollingPlayerPos, 1e3);
    };
    this.pollingPlayerPos = function() {
        vrt.addTS(vrt.createTS({
            status: 17
        }));
    };
    this.stop_playing = function() {
        vrt.log(">>STEP vrt stop play");
        vrt.player.video_stop(function() {
            vrt.logChrono(1, false, "player");
            vrt.player.video_end_fullscreen();
        });
        vrt.isPlaying = false;
        clearTimeout(vrt.stop_handle);
        vrt.exitcode = 1;
        vrt.loader("postVideo", "default", true);
        $("#videoDiv").css("visibility", "hidden");
    };
    this.stop_rec = function() {
        vrt.producer.unpublish();
        vrt.llog("REC STOP");
        clearTimeout(vrt.stop_handle_rec);
    };
    this.webProducerInit = function(path) {
        this.log("===WEBP Webpr_init");
        vrt.logTime("webProducerInit");
        vrt.log("!!PRODUCER webProducerInit");
        this.producer = new WebProducer({
            id: this.producerID,
            width: this.producerWidth,
            height: this.producerHeight,
            trace: false,
            path: path,
            remote_logger_name: window.vrt.producerStreamName
        });
        this.producer.once("ready", function() {
            $(window.vrt).trigger("vrt_event_producer_ready");
            var vrt = window.vrt;
            if (vrt.recorderCenter === true) {
                $("#producer").vrtCenterProd();
                $("#producerCamerafix").vrtCenter();
            }
            vrt.logTime("webpr ready");
            vrt.log("!!PRODUCER ready");
            vrt.log("===WEBP The producer is now ready");
            vrt.log("ready + producerConnStatus");
            vrt.popOverCe("pop_click_allow", "destroy");
            vrt.flash_allowed = true;
            this.setMirroredPreview(true);
            vrt.log("Is preview mirrored ? " + this.getMirroredPreview());
            if (vrt.recordingAudio) {
                this.setAudioStreamActive(true);
            } else {
                this.setAudioStreamActive(false);
            }
            vrt.llog("Is audio streaming active ? " + this.getAudioStreamActive());
            var numCameras = this.countCameras();
            vrt.log("===WEBP We have " + numCameras + " camera(s) available");
            if (numCameras == 0) {
                $(window.vrt).trigger("vrt_event_producer_no_camera_found");
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "no webcam",
                    type: "blocking"
                });
            } else if (numCameras == undefined) {
                $(window.vrt).trigger("vrt_event_producer_no_camera_found");
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "no webcam",
                    type: "blocking"
                });
            } else {
                $(window.vrt).trigger("vrt_event_producer_camera_found");
            }
            var self = this;
            var on_camera_unmuted = function() {
                vrt.log("!!on_camera_unmuted");
                vrt.producer.isCameraWorking();
                var toolong = function() {
                    $("#producerCamerafix").removeClass("vrtHide").show();
                    $("#producerCamerafix #retrybtn").off().on("click", function() {
                        vrt.producer.reloadFlashElement(function() {
                            $("#producerCamerafix").addClass("vrtHide").hide();
                            var timeout = setTimeout(toolong, 5e3);
                            vrt.producer.once("camera-unmuted", on_camera_unmuted.bind(self));
                        });
                    });
                };
                var timeout = setTimeout(toolong, 5e3);
                vrt.producer.once("camera-works", function() {
                    self.on_camera_unmuted_and_capturing();
                    $("#producerCamerafix").addClass("hide").hide().remove();
                    clearTimeout(timeout);
                });
            };
            this.once("camera-unmuted", on_camera_unmuted);
            this.on_camera_unmuted_and_capturing = function() {
                vrt.log("!!on_camera_unmuted_and_capturing");
                vrt.log("===WEBP Camera is now available");
                vrt.popOverCe("pop_click_allow", "destroy");
                vrt.popOverCe("pop_center");
                $(window.vrt).trigger("producer_init_camera_ok");
            };
            this.on("camera-muted", function() {
                vrt.log("!!PRODUCER camera muted");
                vrt.log("===WEBP The user has denied access to the camera");
                $(window.vrt).trigger("vrt_event_producer_camera_blocked");
            });
            var cameraMuted = this.isCameraMuted();
            if (cameraMuted) {
                vrt.log("!!PRODUCER camera already muted");
                vrt.log("===WEBP The user must approve camera access");
                vrt.popOverCe("pop_click_allow");
                vrt.log("user must approve camera", "producerConnStatus");
                $(window.vrt).trigger("vrt_event_producer_camera_muted");
            } else {
                vrt.log("!!PRODUCER camera already unmuted");
                vrt.log("camera aviable", "producerConnStatus");
                vrt.log("===WEBP The camera is available, user already approved. " + "It does not mean its working, we wait for 'camera-works'");
                on_camera_unmuted();
            }
            this.on("publish", function() {
                vrt.isRecording = true;
                $(vrt).trigger("vrtevent_player_ts", {
                    status: vrt.player.statusMap(20)
                });
                vrt.logChrono(0, true, "PRODUCER RECORDING");
                vrt.log("!!PRODUCER publish");
            });
            this.on("unpublish", function() {
                $(vrt).trigger("vrtevent_player_ts", {
                    status: vrt.player.statusMap(21)
                });
                vrt.logChrono(0, false, "PRODUCER RECORDING");
                vrt.isRecording = false;
                vrt.bufferTS = [];
                clearTimeout(vrt.stop_polling_player_pos);
                vrt.log("!!PRODUCER unpublish");
            });
            this.on("connect", function() {
                vrt.log("!!PRODUCER connect");
                vrt.log("Is preview mirrored ? ", this.getMirroredPreview());
                vrt.log("Is audio streaming active ? ", this.getAudioStreamActive());
                vrt.log("FPS ", this.getStreamFPS());
                setTimeout(function() {
                    $(window.vrt).trigger("vrt_event_producer_camera_ok");
                    window.vrt.vrtTrigLoadend("producer_init_ok");
                    $(vrt).trigger("vrtstep_connect");
                }, 500);
            });
            this.on("save", function(url) {
                vrt.log("!!PRODUCER save " + url);
                vrt.hideVideoBox();
                vrt.postPartecipate();
                vrt.facevideoUpload(url, vrt.stepComplete);
            });
            this.on("save-metadata", function(url) {});
            this.on("error", function(reason) {
                vrt.isRecording = false;
                vrt.log("!!PRODUCER error " + reason);
                vrt.logTime("webpr error");
                vrt.log(">>===WEBP ERROR: " + reason);
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "" + reason,
                    type: "blocking"
                });
            });
            this.on("disconnect", function() {
                vrt.isRecording = false;
                vrt.log("!!PRODUCER disconnect");
                vrt.logTime("webpr disconnect");
                vrt.log(">>STEP producer disconnected");
                vrt.trigger("vrtstep_disconnect");
            });
            if (vrt.options.apiClientOnly && vrt.options.apiClientOnly === true) {
                $(window.vrt).trigger("vrt_event_producer_camera_ok");
            }
        });
    };
    this.createFrame = function(data) {
        var w = ' width="600" ';
        if (data.width) {
            w = data.width;
            w = ' width="' + w + '" ';
        }
        var h = ' height="500" ';
        if (data.height) {
            h = data.height;
            h = ' height="' + h + '" ';
        }
        var src = "";
        if (data.src) {
            src = ' src="' + data.src + '" ';
        }
        var cssClass = "";
        if (data.btnCssClass) {
            cssClass = data.btnCssClass;
        }
        var btnText = "Close and proceed";
        if (data.btnText) {
            btnText = data.btnText;
        }
        var style = "";
        if (data.btnStyle) {
            style = data.btnStyle;
        }
        var btn = '<div id="vrtFrameCloseWrapper" style="width: 100%; "><button id="vrtFrameClose" class="' + cssClass + '" style="' + style + '">' + btnText + "</button></div>";
        var btnTop = "";
        var btnBottom = "";
        if (data.showBtnClose === false) {
            btn = "";
        }
        if (data.btnPosition == "top") {
            btnTop = btn;
        } else {
            btnBottom = btn;
        }
        var base_html = '<div id="vrtFrame" style="display: none">' + btnTop + '<div id="vrtFrameWrapper"><iframe ' + h + " " + w + ' allowTransparency="true" frameborder="0" ' + style + " " + src + ">";
        var inner_html = "";
        if (data.html) {
            inner_html = data.html;
        }
        var close_html = "</iframe></div>" + btnBottom + "</div>";
        $("#vrtFrameWr").html(base_html + inner_html + close_html);
        $("#vrtFrame").vrtCenter();
        $("#vrtFrame").show();
    };
    this.apiClientSaveCustomData = function(id, data, cb) {
        this.log(">>STEP insert custom data");
        this.log(data);
        this.ceclient.writeCustomData(id, data, cb);
    };
    this.apiClientSaveRespondentCustomData = function(id, data, cb) {
        this.log(">>STEP insert custom data");
        this.log(data);
        this.ceclient.writeRespondentCustomData(id, data, cb);
    };
    this.apiClientUploadLink = function(streamFileName, cb) {
        this.log(">>STEP api file upload " + streamFileName);
        this.log("EVT upload api file upload " + streamFileName);
        var dataToUpload = {};
        if (this.researchId) {
            dataToUpload = {
                link: streamFileName,
                researchId: this.researchId,
                mediaId: this.media_id
            };
            if (vrt.responseAtStart) {
                dataToUpload.responseId = vrt.responseList[vrt.currentMedia];
                if (this.respondentId) {
                    dataToUpload.respondent_id = this.respondentId;
                    dataToUpload.respondentId = this.respondentId;
                }
            }
        } else {
            dataToUpload = streamFileName;
            if (vrt.responseAtStart) {
                dataToUpload = {
                    link: streamFileName,
                    responseId: vrt.responseList[vrt.currentMedia]
                };
                if (this.respondentId) {
                    dataToUpload.respondent_id = this.respondentId;
                    dataToUpload.respondentId = this.respondentId;
                }
            }
        }
        this.ceclient.uploadLink(dataToUpload, cb);
    };
    this.apiClientWriteResponse = function(data, cb) {
        data = {};
        data.research_id = this.researchId;
        data.media_id = this.media_id;
        data.respondent_id = data.respondentd = this.respondentId;
        vrt.ceclient.writeResponse(data, cb);
    };
    this.apiClientSetup = function(cbSuccess, cbFail) {
        var apiClientSetupNext = function(ret) {
            vrt.apiClientRes(ret);
            if (ret) {
                if (console.log) console.log("Api login OK + success");
                vrt.results.apilogin = true;
                if (!vrt.options.researchId && !vrt.options.researchToken) {
                    if (cbSuccess) cbSuccess();
                    return;
                }
                var apiClientSetupLoadMedia = function(researchId) {
                    vrt.ceclient.loadMediaList(researchId, function(list) {
                        if (console.log) console.log("Api loadMediaList OK + success");
                        if (Array.isArray(list)) {
                            var ytCount = 0;
                            list.forEach(function(item) {
                                if (item.isYouTube) {
                                    ytCount++;
                                } else if (item.isStored) {
                                    vrt.ceclient.loadMedia(item.id, true, function(media) {
                                        item.path = media.presignedUrl;
                                    });
                                }
                            });
                            if (ytCount > 0 && ytCount < list.length) console.log("Api loadMediaList VIDEO TYPE MISMATCH: " + ytCount + "!=" + list.length);
                            vrt.initMediaList(ytCount == list.length ? "youtube" : "customserver", list);
                            if (cbSuccess) cbSuccess();
                        } else {
                            if (console.log) console.log("Api loadMediaList FAIL + danger");
                            if (cbFail) cbFail();
                        }
                    });
                };
                var apiClientCreateRespondent = function(cb) {
                    var respoData = {};
                    if (vrt.researchId) {
                        respoData.researchId = vrt.researchId;
                        respoData.research_id = vrt.researchId;
                    }
                    if (vrt.options.respondentCustomDataString) {
                        respoData.customData = vrt.options.respondentCustomDataString;
                    }
                    if (vrt.options.respondentName) {
                        respoData.name = vrt.options.respondentName;
                    }
                    vrt.ceclient.writeRespondent(respoData, function(res) {
                        vrt.respondentId = res.id;
                        $(vrt).trigger("vrt_event_respondent_created");
                        if (vrt.options.respondentCustomData) {
                            vrt.ceclient.writeRespondentCustomData(vrt.respondentId, vrt.options.respondentCustomData);
                        }
                        vrt.ceclient.writeRespondentCustomData(vrt.respondentId, {
                            vrt_locationHref: vrt.options.locationHref
                        });
                    });
                };
                if (vrt.options.researchToken) {
                    vrt.ceclient.loadResearch(vrt.options.researchToken, function(research) {
                        vrt.researchId = research.id;
                        vrt.researchTitle = research.title;
                        vrt.researchDesc = research.description;
                        vrt.customData = research.customData;
                        vrt.researchComplete = research.complete;
                        vrt.researchArchived = research.archived ? research.archived : false;
                        vrt.researchReady = research.ready;
                        vrt.researchOutUrlOriginal = vrt.researchOutUrl = research.outgoingUrl;
                        if (vrt.researchOutUrl && vrt.researchOutUrl.length > 0 && vrt.options.locationHref && vrt.options.locationHref.length > 0) {
                            var myRe = /{(.*?)}/g;
                            var myReN = /{(.*?)}/;
                            var str = vrt.researchOutUrlOriginal;
                            var exec = null;
                            while ((exec = myRe.exec(str)) !== null) {
                                var newval = vrt.gup(exec[1], vrt.options.locationHref);
                                if (newval !== null) {
                                    vrt.researchOutUrl = vrt.researchOutUrl.replace(exec[0], newval);
                                }
                            }
                        }
                        vrt.researchCustomData = research.customData;
                        apiClientSetupLoadMedia(research.id, apiClientCreateRespondent());
                    }, function(res) {});
                } else {
                    apiClientSetupLoadMedia(vrt.options.researchId, apiClientCreateRespondent());
                }
            } else {
                if (console.log) console.log("Api login FAIL + danger");
                vrt.results.apilogin = false;
                if (cbFail) cbFail();
            }
        };
        this.log("Api login in progress");
        this.log(">>STEP api init");
        this.ceclient.init({
            debug: true,
            http: this.apiHttps,
            domain: this.apiDomain,
            sandbox: vrt.options.apiSandbox,
            engineType: vrt.options.engineType,
            processVideo: vrt.options.processVideo
        });
        this.ceclient.logout(function() {
            if (this.appToken) {
                this.ceclient.setToken(this.appToken);
                apiClientSetupNext(true);
            } else {
                this.ceclient.login(this.apiUsername, this.apiPassword, apiClientSetupNext);
            }
        }.bind(this));
    };
    this.apiClientLogout = function() {
        this.log(">>STEP api logout");
        this.ceclient.logout();
    };
    this.apiClientRes = function(res) {
        vrt.results.apilogin = res;
        return res;
    };
    this.loaderHtml = function() {
        return ' <div id="vrtLoaderInner"> <div id="circleG"> <div id="circleG_1" class="circleG"> </div> <div id="circleG_2" class="circleG"> </div> <div id="circleG_3" class="circleG"> </div> </div> </div>';
    };
    this.loaderCss = function() {
        return " <style> #vrtLoader{width: 100%} #vrtLoaderInner{margin: 10px auto;} #circleG{width:87.5px}.circleG{background-color:#FFF;float:left;height:19px;margin-left:10px;width:19px;-moz-animation-name:bounce_circleG;-moz-animation-duration:1.35s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-moz-border-radius:13px;-webkit-animation-name:bounce_circleG;-webkit-animation-duration:1.35s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-webkit-border-radius:13px;-ms-animation-name:bounce_circleG;-ms-animation-duration:1.35s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-ms-border-radius:13px;-o-animation-name:bounce_circleG;-o-animation-duration:1.35s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;-o-border-radius:13px;animation-name:bounce_circleG;animation-duration:1.35s;animation-iteration-count:infinite;animation-direction:linear;border-radius:13px}#circleG_1{-moz-animation-delay:.27s;-webkit-animation-delay:.27s;-ms-animation-delay:.27s;-o-animation-delay:.27s;animation-delay:.27s}#circleG_2{-moz-animation-delay:.63s;-webkit-animation-delay:.63s;-ms-animation-delay:.63s;-o-animation-delay:.63s;animation-delay:.63s}#circleG_3{-moz-animation-delay:.8099999999999999s;-webkit-animation-delay:.8099999999999999s;-ms-animation-delay:.8099999999999999s;-o-animation-delay:.8099999999999999s;animation-delay:.8099999999999999s}@-moz-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-webkit-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-ms-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-o-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@keyframes bounce_circleG{50%{background-color:#2E2E2E}}  </style>";
    };
    this.loader = function(name, type, show) {
        if (!name) name = "vrtkLoader";
        if (!type) type = "default";
        if (show === undefined) show = false;
        var lhtml = this.loaderHtml();
        var lcss = this.loaderCss();
        if (show === true && $("#vrtLoader").html() == "") {
            $("#vrtLoader").html(lcss + lhtml);
            $("#circleG").vrtCenter();
        }
        if (show === false) {
            $("#vrtLoader").html("");
        }
    };
    this.openDialog = function(msg, closeFunc, position) {
        if (closeFunc) closeFunc();
    };
    this.gup = function(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    };
    this.msieversion = function() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
        if (msie > 0 || match) {
            return match ? parseInt(match[1]) : false;
        } else {
            return false;
        }
        return false;
    };
    this.initialized(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options);
}

var vrtTimer;

var vrtTotalSeconds;

function vrtCreateTimer(TimerID, Time) {
    vrtTimer = document.getElementById(TimerID);
    vrtTotalSeconds = Time;
    vrtUpdateTimer();
    window.setTimeout("vrtTick()", 1e3);
}

function vrtTick() {
    TotalSeconds -= 1;
    UpdateTimer();
    window.setTimeout("vrtTick()", 1e3);
}

function vrtUpdateTimer() {}

jQuery.fn.vrtCenterProd = function() {
    return this.each(function() {
        var el = $(this);
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2;
        var h_total = h;
        var css = {
            position: "absolute",
            left: w_total + "px",
            top: h_total + "px"
        };
        el.css(css);
    });
};

jQuery.fn.vrtCenter = function() {
    return this.each(function() {
        var el = $(this);
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2;
        var h_total = (h_box - h) / 2;
        var css = {
            position: "absolute",
            left: w_total + "px"
        };
        el.css(css);
    });
};