/* Playcorder crowdemotion.co.uk 2015-5-26 14:37 */ var swfobject = function() {
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

"use strict";

var RemoteLogger = function(options) {
    this.base_url = options.base_url;
    this.name = options.name;
    this.interval = options.interval || 1e3;
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
        var dfr1 = new $.Deferred();
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
        var dfr = this.flushCORS(this.logs_flushing);
        var self = this;
        dfr.done(function() {
            self.flush_success.apply(self, arguments);
        });
        dfr.fail(function() {
            self.flush_error.apply(self, arguments);
        });
        return dfr;
    },
    flushCORS: function(data) {
        var url = this.base_url + "remotelogging/" + this.name;
        var dfr = jQuery.ajax({
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
        var self = this;
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
        var log = {
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
            this.remoteLoggerLog("userAgent", "userAgent", navigator.userAgent, "", "");
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
        params.allowscriptaccess = "sameDomain";
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

var ContentsMixin = {
    on_unpublish_check_content: function(streamName) {
        var self = this;
        var fileName = streamName + ".mp4";
        var destinationUrl = [ self.get_http_base_url(), "contents/", fileName ].join("");
        var metadataFileName = streamName + ".json";
        var metadataDestinationUrl = [ self.get_http_base_url(), "contents/", metadataFileName ].join("");
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
        var ret = [ this.get_http_base_url(), "api/" ].join("");
        return ret;
    },
    _content_ready: function(streamName, cb) {
        var url = [ this.get_http_api_base_url(), "contents/", streamName, "/ready" ].join("");
        var poll = function() {
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
        var url = [ this.get_http_api_base_url(), "contents/", contentName, "/delete" ].join("");
        jQuery.ajax({
            url: url,
            dataType: "jsonp"
        }).then(cb);
    }
};

WebProducer.extend(ContentsMixin);

var TimedMetadataMixin = {
    addTimedMetadataCORS: function(metadata, success, error) {
        var url = [ this.get_http_api_base_url(), "timedmetadata/", this.streamName, "/append" ].join("");
        var data = metadata;
        data.ts = data.ts || new Date().getTime() - this.publishStartTime;
        var dfr = jQuery.ajax({
            url: url,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            type: "post"
        }).fail(error).done(success);
        return dfr;
    },
    addTimedMetadataJSONP: function(metadata, success, error) {
        var url = [ this.get_http_api_base_url(), "timedmetadata/", this.streamName, "/append/jsonp" ].join("");
        var data = metadata;
        data.ts = data.ts || new Date().getTime() - this.publishStartTime;
        data = "data=" + encodeURIComponent(JSON.stringify(data));
        var dfr = new $.Deferred();
        var dfr_error = function(err) {
            dfr.reject(err);
        };
        var dfr_done = function(result, b, c) {
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

WebProducer.extend(TimedMetadataMixin);

var JobsMixin = {
    enableRealtimeAnalysis: function(engine, success, error) {
        var url = [ this.get_http_api_base_url(), "jobs/submit/jsonp" ].join("");
        var data = {
            streamName: this.streamName,
            engine: engine || "kanako_live"
        };
        var dfr = new $.Deferred();
        var dfr_error = function(err) {
            dfr.reject(err);
        };
        var dfr_done = function(result, b, c) {
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

var LoggingMixin = {
    remoteLogger: null,
    remoteLoggerStatsTask: null,
    remoteLoggerStatsTaskInterval: 1e3,
    remoteLoggerActivate: function(name) {
        var options = {
            base_url: null,
            name: name
        };
        var remoteLogger = new RemoteLogger(options);
        var producer = this;
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
            var url = producer.get_http_api_base_url();
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
    remoteLoggerLog: function(type, name, input, output) {
        if (!this.remoteLogger) {
            return;
        }
        var ignoredMethods = [ "getUrl", "getStreamBufferLength", "getStreamInfoDroppedFrames", "getStreamInfoCurrentBytesPerSecond", "getStreamInfoVideoLossRate", "getStreamCurrentFPS", "getCameraCurrentFPS" ];
        if (ignoredMethods.indexOf(name) !== -1) {
            return;
        }
        input = JSON.stringify(input);
        output = JSON.stringify(output);
        var args = Array.prototype.slice.call(arguments);
        args[2] = input;
        args[3] = output;
        var message = args.join("|");
        this.remoteLogger.log(message);
    },
    remoteLoggerLogStats: function() {
        this.remoteLoggerLog("streamingStats", "1s", null, this.getStats());
        if (this.remoteLogger) {
            this.remoteLogger.flush();
        }
    },
    remoteLoggerStatsTaskRun: function() {
        this.remoteLoggerStatsTaskRunning = true;
        var self = this;
        var fn = function() {
            self.remoteLoggerLogStats();
        };
        var time = this.remoteLoggerStatsTaskInterval;
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

WebProducer.extend(LoggingMixin);

var EventEmitterMixin = {
    on: function(event, fct) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    },
    off: function(event, fct) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    fire: function(event) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        var handlers = this._events[event].concat([]);
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    },
    once: function(event, fct) {
        var self = this;
        var wrapper = function() {
            self.off(event, wrapper);
            fct.apply(this, arguments);
        };
        this.on(event, wrapper);
    }
};

WebProducer.extend(EventEmitterMixin);

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
            if (options) {
                vjs.log.warn('Player "' + id + '" is already initialised. Options will not be applied.');
            }
            if (ready) {
                vjs.players[id].ready(ready);
            }
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

vjs.CDN_VERSION = "4.12";

vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://";

vjs["VERSION"] = "4.12.7";

vjs.options = {
    techOrder: [ "html5", "flash" ],
    html5: {},
    flash: {},
    width: 300,
    height: 150,
    defaultVolume: 0,
    playbackRates: [],
    inactivityTimeout: 2e3,
    children: {
        mediaLoader: {},
        posterImage: {},
        loadingSpinner: {},
        textTrackDisplay: {},
        bigPlayButton: {},
        controlBar: {},
        errorDisplay: {},
        textTrackSettings: {}
    },
    language: document.getElementsByTagName("html")[0].getAttribute("lang") || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || "en",
    languages: {},
    notSupportedMessage: "No compatible source was found for this video."
};

if (vjs.CDN_VERSION !== "GENERATED" + "_CDN_VSN") {
    videojs.options["flash"]["swf"] = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf";
}

vjs.addLanguage = function(code, data) {
    if (vjs.options["languages"][code] !== undefined) {
        vjs.options["languages"][code] = vjs.util.mergeOptions(vjs.options["languages"][code], data);
    } else {
        vjs.options["languages"][code] = data;
    }
    return vjs.options["languages"];
};

vjs.players = {};

if (typeof define === "function" && define["amd"]) {
    define("videojs", [], function() {
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
            if (key !== "layerX" && key !== "layerY" && key !== "keyLocation") {
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

vjs.isNaN = function(num) {
    return num !== num;
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
    }
    if (!vjs.cache[id]) {
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

vjs.hasClass = function(element, classToCheck) {
    return (" " + element.className + " ").indexOf(" " + classToCheck + " ") !== -1;
};

vjs.addClass = function(element, classToAdd) {
    if (!vjs.hasClass(element, classToAdd)) {
        element.className = element.className === "" ? classToAdd : element.className + " " + classToAdd;
    }
};

vjs.removeClass = function(element, classToRemove) {
    var classNames, i;
    if (!vjs.hasClass(element, classToRemove)) {
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

(function() {
    var track = document.createElement("track");
    track.kind = "captions";
    track.srclang = "en";
    track.label = "English";
    vjs.TEST_VID.appendChild(track);
})();

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

vjs.IS_IE8 = /MSIE\s8\.0/.test(vjs.USER_AGENT);

vjs.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);

vjs.BACKGROUND_SIZE_SUPPORTED = "backgroundSize" in vjs.TEST_VID.style;

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
    if (details.protocol === "http:") {
        details.host = details.host.replace(/:80$/, "");
    }
    if (details.protocol === "https:") {
        details.host = details.host.replace(/:443$/, "");
    }
    if (addToBody) {
        document.body.removeChild(div);
    }
    return details;
};

function _logType(type, args) {
    var argsArray, noop, console;
    argsArray = Array.prototype.slice.call(args);
    noop = function() {};
    console = window["console"] || {
        log: noop,
        warn: noop,
        error: noop
    };
    if (type) {
        argsArray.unshift(type.toUpperCase() + ":");
    } else {
        type = "log";
    }
    vjs.log.history.push(argsArray);
    argsArray.unshift("VIDEOJS:");
    if (console[type].apply) {
        console[type].apply(console, argsArray);
    } else {
        console[type](argsArray.join(" "));
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

vjs.xhr = function(options, callback) {
    var XHR, request, urlInfo, winLoc, fileUrl, crossOrigin, abortTimeout, successHandler, errorHandler;
    if (typeof options === "string") {
        options = {
            uri: options
        };
    }
    videojs.util.mergeOptions({
        method: "GET",
        timeout: 45 * 1e3
    }, options);
    callback = callback || function() {};
    successHandler = function() {
        window.clearTimeout(abortTimeout);
        callback(null, request, request.response || request.responseText);
    };
    errorHandler = function(err) {
        window.clearTimeout(abortTimeout);
        if (!err || typeof err === "string") {
            err = new Error(err);
        }
        callback(err, request);
    };
    XHR = window.XMLHttpRequest;
    if (typeof XHR === "undefined") {
        XHR = function() {
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
    request = new XHR();
    request.uri = options.uri;
    urlInfo = vjs.parseUrl(options.uri);
    winLoc = window.location;
    crossOrigin = urlInfo.protocol + urlInfo.host !== winLoc.protocol + winLoc.host;
    if (crossOrigin && window.XDomainRequest && !("withCredentials" in request)) {
        request = new window.XDomainRequest();
        request.onload = successHandler;
        request.onerror = errorHandler;
        request.onprogress = function() {};
        request.ontimeout = function() {};
    } else {
        fileUrl = urlInfo.protocol == "file:" || winLoc.protocol == "file:";
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.timedout) {
                    return errorHandler("timeout");
                }
                if (request.status === 200 || fileUrl && request.status === 0) {
                    successHandler();
                } else {
                    errorHandler();
                }
            }
        };
        if (options.timeout) {
            abortTimeout = window.setTimeout(function() {
                if (request.readyState !== 4) {
                    request.timedout = true;
                    request.abort();
                }
            }, options.timeout);
        }
    }
    try {
        request.open(options.method || "GET", options.uri, true);
    } catch (err) {
        return errorHandler(err);
    }
    if (options.withCredentials) {
        request.withCredentials = true;
    }
    if (options.responseType) {
        request.responseType = options.responseType;
    }
    try {
        request.send();
    } catch (err) {
        return errorHandler(err);
    }
    return request;
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

vjs.EventEmitter = function() {};

vjs.EventEmitter.prototype.allowedEvents_ = {};

vjs.EventEmitter.prototype.on = function(type, fn) {
    var ael = this.addEventListener;
    this.addEventListener = Function.prototype;
    vjs.on(this, type, fn);
    this.addEventListener = ael;
};

vjs.EventEmitter.prototype.addEventListener = vjs.EventEmitter.prototype.on;

vjs.EventEmitter.prototype.off = function(type, fn) {
    vjs.off(this, type, fn);
};

vjs.EventEmitter.prototype.removeEventListener = vjs.EventEmitter.prototype.off;

vjs.EventEmitter.prototype.one = function(type, fn) {
    vjs.one(this, type, fn);
};

vjs.EventEmitter.prototype.trigger = function(event) {
    var type = event.type || event;
    if (typeof event === "string") {
        event = {
            type: type
        };
    }
    event = vjs.fixEvent(event);
    if (this.allowedEvents_[type] && this["on" + type]) {
        this["on" + type](event);
    }
    vjs.trigger(this, event);
};

vjs.EventEmitter.prototype.dispatchEvent = vjs.EventEmitter.prototype.trigger;

vjs.Component = vjs.CoreObject.extend({
    init: function(player, options, ready) {
        this.player_ = player;
        this.options_ = vjs.obj.copy(this.options_);
        options = this.options(options);
        this.id_ = options["id"] || options["el"] && options["el"]["id"];
        if (!this.id_) {
            this.id_ = (player.id && player.id() || "no_player") + "_component_" + vjs.guid++;
        }
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
    var component, componentClass, componentName;
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
    this.childIndex_[component.id()] = null;
    this.childNameIndex_[component.name()] = null;
    var compEl = component.el();
    if (compEl && compEl.parentNode === this.contentEl()) {
        this.contentEl().removeChild(component.el());
    }
};

vjs.Component.prototype.initChildren = function() {
    var parent, parentOptions, children, child, name, opts, handleAdd;
    parent = this;
    parentOptions = parent.options();
    children = parentOptions["children"];
    if (children) {
        handleAdd = function(name, opts) {
            if (parentOptions[name] !== undefined) {
                opts = parentOptions[name];
            }
            if (opts === false) return;
            parent[name] = parent.addChild(name, opts);
        };
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
                handleAdd(name, opts);
            }
        } else {
            vjs.obj.each(children, handleAdd);
        }
    }
};

vjs.Component.prototype.buildCSSClass = function() {
    return "";
};

vjs.Component.prototype.on = function(first, second, third) {
    var target, type, fn, removeOnDispose, cleanRemover, thisComponent;
    if (typeof first === "string" || vjs.obj.isArray(first)) {
        vjs.on(this.el_, first, vjs.bind(this, second));
    } else {
        target = first;
        type = second;
        fn = vjs.bind(this, third);
        thisComponent = this;
        removeOnDispose = function() {
            thisComponent.off(target, type, fn);
        };
        removeOnDispose.guid = fn.guid;
        this.on("dispose", removeOnDispose);
        cleanRemover = function() {
            thisComponent.off("dispose", removeOnDispose);
        };
        cleanRemover.guid = fn.guid;
        if (first.nodeName) {
            vjs.on(target, type, fn);
            vjs.on(target, "dispose", cleanRemover);
        } else if (typeof first.on === "function") {
            target.on(type, fn);
            target.on("dispose", cleanRemover);
        }
    }
    return this;
};

vjs.Component.prototype.off = function(first, second, third) {
    var target, otherComponent, type, fn, otherEl;
    if (!first || typeof first === "string" || vjs.obj.isArray(first)) {
        vjs.off(this.el_, first, second);
    } else {
        target = first;
        type = second;
        fn = vjs.bind(this, third);
        this.off("dispose", fn);
        if (first.nodeName) {
            vjs.off(target, type, fn);
            vjs.off(target, "dispose", fn);
        } else {
            target.off(type, fn);
            target.off("dispose", fn);
        }
    }
    return this;
};

vjs.Component.prototype.one = function(first, second, third) {
    var target, type, fn, thisComponent, newFunc;
    if (typeof first === "string" || vjs.obj.isArray(first)) {
        vjs.one(this.el_, first, vjs.bind(this, second));
    } else {
        target = first;
        type = second;
        fn = vjs.bind(this, third);
        thisComponent = this;
        newFunc = function() {
            thisComponent.off(target, type, newFunc);
            fn.apply(this, arguments);
        };
        newFunc.guid = fn.guid;
        this.on(target, type, newFunc);
    }
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

vjs.Component.prototype.hasClass = function(classToCheck) {
    return vjs.hasClass(this.el_, classToCheck);
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
    this.removeClass("vjs-hidden");
    return this;
};

vjs.Component.prototype.hide = function() {
    this.addClass("vjs-hidden");
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
        if (num === null || vjs.isNaN(num)) {
            num = 0;
        }
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
    var touchStart, firstTouch, touchTime, couldBeTap, noTap, xdiff, ydiff, touchDistance, tapMovementThreshold, touchTimeThreshold;
    touchStart = 0;
    firstTouch = null;
    tapMovementThreshold = 10;
    touchTimeThreshold = 200;
    this.on("touchstart", function(event) {
        if (event.touches.length === 1) {
            firstTouch = vjs.obj.copy(event.touches[0]);
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
            if (touchTime < touchTimeThreshold) {
                event.preventDefault();
                this.trigger("tap");
            }
        }
    });
};

vjs.Component.prototype.enableTouchActivity = function() {
    var report, touchHolding, touchEnd;
    if (!this.player().reportUserActivity) {
        return;
    }
    report = vjs.bind(this.player(), this.player().reportUserActivity);
    this.on("touchstart", function() {
        report();
        this.clearInterval(touchHolding);
        touchHolding = this.setInterval(report, 250);
    });
    touchEnd = function(event) {
        report();
        this.clearInterval(touchHolding);
    };
    this.on("touchmove", report);
    this.on("touchend", touchEnd);
    this.on("touchcancel", touchEnd);
};

vjs.Component.prototype.setTimeout = function(fn, timeout) {
    fn = vjs.bind(this, fn);
    var timeoutId = setTimeout(fn, timeout);
    var disposeFn = function() {
        this.clearTimeout(timeoutId);
    };
    disposeFn.guid = "vjs-timeout-" + timeoutId;
    this.on("dispose", disposeFn);
    return timeoutId;
};

vjs.Component.prototype.clearTimeout = function(timeoutId) {
    clearTimeout(timeoutId);
    var disposeFn = function() {};
    disposeFn.guid = "vjs-timeout-" + timeoutId;
    this.off("dispose", disposeFn);
    return timeoutId;
};

vjs.Component.prototype.setInterval = function(fn, interval) {
    fn = vjs.bind(this, fn);
    var intervalId = setInterval(fn, interval);
    var disposeFn = function() {
        this.clearInterval(intervalId);
    };
    disposeFn.guid = "vjs-interval-" + intervalId;
    this.on("dispose", disposeFn);
    return intervalId;
};

vjs.Component.prototype.clearInterval = function(intervalId) {
    clearInterval(intervalId);
    var disposeFn = function() {};
    disposeFn.guid = "vjs-interval-" + intervalId;
    this.off("dispose", disposeFn);
    return intervalId;
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
    vjs.on(document, "keydown", vjs.bind(this, this.onKeyPress));
};

vjs.Button.prototype.onKeyPress = function(event) {
    if (event.which == 32 || event.which == 13) {
        event.preventDefault();
        this.onClick();
    }
};

vjs.Button.prototype.onBlur = function() {
    vjs.off(document, "keydown", vjs.bind(this, this.onKeyPress));
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
        this.on(player, "controlsvisible", this.update);
        this.on(player, this.playerEvent, this.update);
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
    this.on(document, "mousemove", this.onMouseMove);
    this.on(document, "mouseup", this.onMouseUp);
    this.on(document, "touchmove", this.onMouseMove);
    this.on(document, "touchend", this.onMouseUp);
    this.onMouseMove(event);
};

vjs.Slider.prototype.onMouseMove = function() {};

vjs.Slider.prototype.onMouseUp = function() {
    vjs.unblockTextSelection();
    this.removeClass("vjs-sliding");
    this.off(document, "mousemove", this.onMouseMove);
    this.off(document, "mouseup", this.onMouseUp);
    this.off(document, "touchmove", this.onMouseMove);
    this.off(document, "touchend", this.onMouseUp);
    this.update();
};

vjs.Slider.prototype.update = function() {
    if (!this.el_) return;
    var barProgress, progress = this.getPercent(), handle = this.handle, bar = this.bar;
    if (typeof progress !== "number" || progress !== progress || progress < 0 || progress === Infinity) {
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
    this.on(document, "keydown", this.onKeyPress);
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
    this.off(document, "keydown", this.onKeyPress);
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
        innerHTML: this.localize(this.options_["label"])
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
        this.update();
        this.on("keydown", this.onKeyPress);
        this.el_.setAttribute("aria-haspopup", true);
        this.el_.setAttribute("role", "button");
    }
});

vjs.MenuButton.prototype.update = function() {
    var menu = this.createMenu();
    if (this.menu) {
        this.removeChild(this.menu);
    }
    this.menu = menu;
    this.addChild(menu);
    if (this.items && this.items.length === 0) {
        this.hide();
    } else if (this.items && this.items.length > 1) {
        this.show();
    }
};

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
    if (event.which == 32 || event.which == 13) {
        if (this.buttonPressed_) {
            this.unpressButton();
        } else {
            this.pressButton();
        }
        event.preventDefault();
    } else if (event.which == 27) {
        if (this.buttonPressed_) {
            this.unpressButton();
        }
        event.preventDefault();
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
        this.poster_ = options["poster"] || "";
        this.controls_ = !!options["controls"];
        tag.controls = false;
        options.reportTouchActivity = false;
        this.isAudio(this.tag.nodeName.toLowerCase() === "audio");
        vjs.Component.call(this, this, options, ready);
        if (this.controls()) {
            this.addClass("vjs-controls-enabled");
        } else {
            this.addClass("vjs-controls-disabled");
        }
        if (this.isAudio()) {
            this.addClass("vjs-audio");
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
    if (this.tech) {
        this.tech.dispose();
    }
    vjs.Component.prototype.dispose.call(this);
};

vjs.Player.prototype.getTagSettings = function(tag) {
    var tagOptions, dataSetup, options = {
        sources: [],
        tracks: []
    };
    tagOptions = vjs.getElementAttributes(tag);
    dataSetup = tagOptions["data-setup"];
    if (dataSetup !== null) {
        vjs.obj.merge(tagOptions, vjs.JSON.parse(dataSetup || "{}"));
    }
    vjs.obj.merge(options, tagOptions);
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
    attrs = vjs.getElementAttributes(tag);
    vjs.obj.each(attrs, function(attr) {
        if (attr == "class") {
            el.className = attrs[attr];
        } else {
            el.setAttribute(attr, attrs[attr]);
        }
    });
    tag.id += "_html5_api";
    tag.className = "vjs-tech";
    tag["player"] = el["player"] = this;
    this.addClass("vjs-paused");
    this.width(this.options_["width"], true);
    this.height(this.options_["height"], true);
    tag.initNetworkState_ = tag.networkState;
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
    this.tech.dispose();
    this.tech = false;
};

vjs.Player.prototype.onLoadStart = function() {
    this.removeClass("vjs-ended");
    this.error(null);
    if (!this.paused()) {
        this.trigger("firstplay");
    } else {
        this.hasStarted(false);
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
    this.removeClass("vjs-ended");
    this.removeClass("vjs-paused");
    this.addClass("vjs-playing");
    this.hasStarted(true);
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
    this.addClass("vjs-ended");
    if (this.options_["loop"]) {
        this.currentTime(0);
        this.play();
    } else if (!this.paused()) {
        this.pause();
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

vjs.Player.prototype.onError;

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
                if (window["videojs"][this.techName].prototype.hasOwnProperty("setSource")) {
                    this.techCall("setSource", source);
                } else {
                    this.techCall("src", source.src);
                }
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
        this.setTimeout(function() {
            this.error({
                code: 4,
                message: this.localize(this.options()["notSupportedMessage"])
            });
        }, 0);
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
    if (!src) {
        src = "";
    }
    this.poster_ = src;
    this.techCall("setPoster", src);
    this.trigger("posterchange");
    return this;
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
        this.clearInterval(mouseInProgress);
        mouseInProgress = this.setInterval(onActivity, 250);
    };
    onMouseUp = function(event) {
        onActivity();
        this.clearInterval(mouseInProgress);
    };
    this.on("mousedown", onMouseDown);
    this.on("mousemove", onMouseMove);
    this.on("mouseup", onMouseUp);
    this.on("keydown", onActivity);
    this.on("keyup", onActivity);
    activityCheck = this.setInterval(function() {
        if (this.userActivity_) {
            this.userActivity_ = false;
            this.userActive(true);
            this.clearTimeout(inactivityTimeout);
            var timeout = this.options()["inactivityTimeout"];
            if (timeout > 0) {
                inactivityTimeout = this.setTimeout(function() {
                    if (!this.userActivity_) {
                        this.userActive(false);
                    }
                }, timeout);
            }
        }
    }, 250);
};

vjs.Player.prototype.playbackRate = function(rate) {
    if (rate !== undefined) {
        this.techCall("setPlaybackRate", rate);
        return this;
    }
    if (this.tech && this.tech["featuresPlaybackRate"]) {
        return this.techGet("playbackRate");
    } else {
        return 1;
    }
};

vjs.Player.prototype.isAudio_ = false;

vjs.Player.prototype.isAudio = function(bool) {
    if (bool !== undefined) {
        this.isAudio_ = !!bool;
        return this;
    }
    return this.isAudio_;
};

vjs.Player.prototype.networkState = function() {
    return this.techGet("networkState");
};

vjs.Player.prototype.readyState = function() {
    return this.techGet("readyState");
};

vjs.Player.prototype.textTracks = function() {
    return this.tech && this.tech["textTracks"]();
};

vjs.Player.prototype.remoteTextTracks = function() {
    return this.tech && this.tech["remoteTextTracks"]();
};

vjs.Player.prototype.addTextTrack = function(kind, label, language) {
    return this.tech && this.tech["addTextTrack"](kind, label, language);
};

vjs.Player.prototype.addRemoteTextTrack = function(options) {
    return this.tech && this.tech["addRemoteTextTrack"](options);
};

vjs.Player.prototype.removeRemoteTextTrack = function(track) {
    this.tech && this.tech["removeRemoteTextTrack"](track);
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
        playbackRateMenuButton: {},
        subtitlesButton: {},
        captionsButton: {},
        chaptersButton: {}
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
        this.on(player, "play", this.onPlay);
        this.on(player, "pause", this.onPause);
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
    this.removeClass("vjs-paused");
    this.addClass("vjs-playing");
    this.el_.children[0].children[0].innerHTML = this.localize("Pause");
};

vjs.PlayToggle.prototype.onPause = function() {
    this.removeClass("vjs-playing");
    this.addClass("vjs-paused");
    this.el_.children[0].children[0].innerHTML = this.localize("Play");
};

vjs.CurrentTimeDisplay = vjs.Component.extend({
    init: function(player, options) {
        vjs.Component.call(this, player, options);
        this.on(player, "timeupdate", this.updateContent);
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
        this.on(player, "timeupdate", this.updateContent);
        this.on(player, "loadedmetadata", this.updateContent);
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
        this.on(player, "timeupdate", this.updateContent);
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
        this.on(player, "timeupdate", this.updateARIAAttributes);
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
    this.player_.addClass("vjs-scrubbing");
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
    this.player_.removeClass("vjs-scrubbing");
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
        this.on(player, "progress", this.update);
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
        this.on(player, "timeupdate", this.updateContent);
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
        if (player.tech && player.tech["featuresVolumeControl"] === false) {
            this.addClass("vjs-hidden");
        }
        this.on(player, "loadstart", function() {
            if (player.tech["featuresVolumeControl"] === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        });
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
        this.on(player, "volumechange", this.updateARIAAttributes);
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
        this.on(player, "volumechange", this.update);
        if (player.tech && player.tech["featuresVolumeControl"] === false) {
            this.addClass("vjs-hidden");
        }
        this.on(player, "loadstart", function() {
            if (player.tech["featuresVolumeControl"] === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        });
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
        this.on(player, "volumechange", this.volumeUpdate);
        if (player.tech && player.tech["featuresVolumeControl"] === false) {
            this.addClass("vjs-hidden");
        }
        this.on(player, "loadstart", function() {
            if (player.tech["featuresVolumeControl"] === false) {
                this.addClass("vjs-hidden");
            } else {
                this.removeClass("vjs-hidden");
            }
        });
        this.addClass("vjs-menu-button");
    }
});

vjs.VolumeMenuButton.prototype.createMenu = function() {
    var menu = new vjs.Menu(this.player_, {
        contentElType: "div"
    });
    var vc = new vjs.VolumeBar(this.player_, this.options_["volumeBar"]);
    vc.on("focus", function() {
        menu.lockShowing();
    });
    vc.on("blur", function() {
        menu.unlockShowing();
    });
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

vjs.VolumeMenuButton.prototype.volumeUpdate = vjs.MuteToggle.prototype.update;

vjs.PlaybackRateMenuButton = vjs.MenuButton.extend({
    init: function(player, options) {
        vjs.MenuButton.call(this, player, options);
        this.updateVisibility();
        this.updateLabel();
        this.on(player, "loadstart", this.updateVisibility);
        this.on(player, "ratechange", this.updateLabel);
    }
});

vjs.PlaybackRateMenuButton.prototype.buttonText = "Playback Rate";

vjs.PlaybackRateMenuButton.prototype.className = "vjs-playback-rate";

vjs.PlaybackRateMenuButton.prototype.createEl = function() {
    var el = vjs.MenuButton.prototype.createEl.call(this);
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
    return this.player().tech && this.player().tech["featuresPlaybackRate"] && this.player().options()["playbackRates"] && this.player().options()["playbackRates"].length > 0;
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
        this.on(player, "ratechange", this.update);
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
        this.update();
        player.on("posterchange", vjs.bind(this, this.update));
    }
});

vjs.PosterImage.prototype.dispose = function() {
    this.player().off("posterchange", this.update);
    vjs.Button.prototype.dispose.call(this);
};

vjs.PosterImage.prototype.createEl = function() {
    var el = vjs.createEl("div", {
        className: "vjs-poster",
        tabIndex: -1
    });
    if (!vjs.BACKGROUND_SIZE_SUPPORTED) {
        this.fallbackImg_ = vjs.createEl("img");
        el.appendChild(this.fallbackImg_);
    }
    return el;
};

vjs.PosterImage.prototype.update = function() {
    var url = this.player().poster();
    this.setSrc(url);
    if (url) {
        this.show();
    } else {
        this.hide();
    }
};

vjs.PosterImage.prototype.setSrc = function(url) {
    var backgroundImage;
    if (this.fallbackImg_) {
        this.fallbackImg_.src = url;
    } else {
        backgroundImage = "";
        if (url) {
            backgroundImage = 'url("' + url + '")';
        }
        this.el_.style.backgroundImage = backgroundImage;
    }
};

vjs.PosterImage.prototype.onClick = function() {
    this.player_.play();
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
        this.on(player, "error", this.update);
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

(function() {
    var createTrackHelper;
    vjs.MediaTechController = vjs.Component.extend({
        init: function(player, options, ready) {
            options = options || {};
            options.reportTouchActivity = false;
            vjs.Component.call(this, player, options, ready);
            if (!this["featuresProgressEvents"]) {
                this.manualProgressOn();
            }
            if (!this["featuresTimeupdateEvents"]) {
                this.manualTimeUpdatesOn();
            }
            this.initControlsListeners();
            if (!this["featuresNativeTextTracks"]) {
                this.emulateTextTracks();
            }
            this.initTextTrackListeners();
        }
    });
    vjs.MediaTechController.prototype.initControlsListeners = function() {
        var player, activateControls;
        player = this.player();
        activateControls = function() {
            if (player.controls() && !player.usingNativeControls()) {
                this.addControlsListeners();
            }
        };
        this.ready(activateControls);
        this.on(player, "controlsenabled", activateControls);
        this.on(player, "controlsdisabled", this.removeControlsListeners);
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
    vjs.MediaTechController.prototype.manualProgressOn = function() {
        this.manualProgress = true;
        this.trackProgress();
    };
    vjs.MediaTechController.prototype.manualProgressOff = function() {
        this.manualProgress = false;
        this.stopTrackingProgress();
    };
    vjs.MediaTechController.prototype.trackProgress = function() {
        this.progressInterval = this.setInterval(function() {
            var bufferedPercent = this.player().bufferedPercent();
            if (this.bufferedPercent_ != bufferedPercent) {
                this.player().trigger("progress");
            }
            this.bufferedPercent_ = bufferedPercent;
            if (bufferedPercent === 1) {
                this.stopTrackingProgress();
            }
        }, 500);
    };
    vjs.MediaTechController.prototype.stopTrackingProgress = function() {
        this.clearInterval(this.progressInterval);
    };
    vjs.MediaTechController.prototype.manualTimeUpdatesOn = function() {
        var player = this.player_;
        this.manualTimeUpdates = true;
        this.on(player, "play", this.trackCurrentTime);
        this.on(player, "pause", this.stopTrackingCurrentTime);
        this.one("timeupdate", function() {
            this["featuresTimeupdateEvents"] = true;
            this.manualTimeUpdatesOff();
        });
    };
    vjs.MediaTechController.prototype.manualTimeUpdatesOff = function() {
        var player = this.player_;
        this.manualTimeUpdates = false;
        this.stopTrackingCurrentTime();
        this.off(player, "play", this.trackCurrentTime);
        this.off(player, "pause", this.stopTrackingCurrentTime);
    };
    vjs.MediaTechController.prototype.trackCurrentTime = function() {
        if (this.currentTimeInterval) {
            this.stopTrackingCurrentTime();
        }
        this.currentTimeInterval = this.setInterval(function() {
            this.player().trigger("timeupdate");
        }, 250);
    };
    vjs.MediaTechController.prototype.stopTrackingCurrentTime = function() {
        this.clearInterval(this.currentTimeInterval);
        this.player().trigger("timeupdate");
    };
    vjs.MediaTechController.prototype.dispose = function() {
        if (this.manualProgress) {
            this.manualProgressOff();
        }
        if (this.manualTimeUpdates) {
            this.manualTimeUpdatesOff();
        }
        vjs.Component.prototype.dispose.call(this);
    };
    vjs.MediaTechController.prototype.setCurrentTime = function() {
        if (this.manualTimeUpdates) {
            this.player().trigger("timeupdate");
        }
    };
    vjs.MediaTechController.prototype.initTextTrackListeners = function() {
        var player = this.player_, tracks, textTrackListChanges = function() {
            var textTrackDisplay = player.getChild("textTrackDisplay"), controlBar;
            if (textTrackDisplay) {
                textTrackDisplay.updateDisplay();
            }
        };
        tracks = this.textTracks();
        if (!tracks) {
            return;
        }
        tracks.addEventListener("removetrack", textTrackListChanges);
        tracks.addEventListener("addtrack", textTrackListChanges);
        this.on("dispose", vjs.bind(this, function() {
            tracks.removeEventListener("removetrack", textTrackListChanges);
            tracks.removeEventListener("addtrack", textTrackListChanges);
        }));
    };
    vjs.MediaTechController.prototype.emulateTextTracks = function() {
        var player = this.player_, textTracksChanges, tracks, script;
        if (!window["WebVTT"]) {
            script = document.createElement("script");
            script.src = player.options()["vtt.js"] || "../node_modules/vtt.js/dist/vtt.js";
            player.el().appendChild(script);
            window["WebVTT"] = true;
        }
        tracks = this.textTracks();
        if (!tracks) {
            return;
        }
        textTracksChanges = function() {
            var i, track, textTrackDisplay;
            textTrackDisplay = player.getChild("textTrackDisplay"), textTrackDisplay.updateDisplay();
            for (i = 0; i < this.length; i++) {
                track = this[i];
                track.removeEventListener("cuechange", vjs.bind(textTrackDisplay, textTrackDisplay.updateDisplay));
                if (track.mode === "showing") {
                    track.addEventListener("cuechange", vjs.bind(textTrackDisplay, textTrackDisplay.updateDisplay));
                }
            }
        };
        tracks.addEventListener("change", textTracksChanges);
        this.on("dispose", vjs.bind(this, function() {
            tracks.removeEventListener("change", textTracksChanges);
        }));
    };
    vjs.MediaTechController.prototype.textTracks_;
    vjs.MediaTechController.prototype.textTracks = function() {
        this.player_.textTracks_ = this.player_.textTracks_ || new vjs.TextTrackList();
        return this.player_.textTracks_;
    };
    vjs.MediaTechController.prototype.remoteTextTracks = function() {
        this.player_.remoteTextTracks_ = this.player_.remoteTextTracks_ || new vjs.TextTrackList();
        return this.player_.remoteTextTracks_;
    };
    createTrackHelper = function(self, kind, label, language, options) {
        var tracks = self.textTracks(), track;
        options = options || {};
        options["kind"] = kind;
        if (label) {
            options["label"] = label;
        }
        if (language) {
            options["language"] = language;
        }
        options["player"] = self.player_;
        track = new vjs.TextTrack(options);
        tracks.addTrack_(track);
        return track;
    };
    vjs.MediaTechController.prototype.addTextTrack = function(kind, label, language) {
        if (!kind) {
            throw new Error("TextTrack kind is required but was not provided");
        }
        return createTrackHelper(this, kind, label, language);
    };
    vjs.MediaTechController.prototype.addRemoteTextTrack = function(options) {
        var track = createTrackHelper(this, options["kind"], options["label"], options["language"], options);
        this.remoteTextTracks().addTrack_(track);
        return {
            track: track
        };
    };
    vjs.MediaTechController.prototype.removeRemoteTextTrack = function(track) {
        this.textTracks().removeTrack_(track);
        this.remoteTextTracks().removeTrack_(track);
    };
    vjs.MediaTechController.prototype.setPoster = function() {};
    vjs.MediaTechController.prototype["featuresVolumeControl"] = true;
    vjs.MediaTechController.prototype["featuresFullscreenResize"] = false;
    vjs.MediaTechController.prototype["featuresPlaybackRate"] = false;
    vjs.MediaTechController.prototype["featuresProgressEvents"] = false;
    vjs.MediaTechController.prototype["featuresTimeupdateEvents"] = false;
    vjs.MediaTechController.prototype["featuresNativeTextTracks"] = false;
    vjs.MediaTechController.withSourceHandlers = function(Tech) {
        Tech.registerSourceHandler = function(handler, index) {
            var handlers = Tech.sourceHandlers;
            if (!handlers) {
                handlers = Tech.sourceHandlers = [];
            }
            if (index === undefined) {
                index = handlers.length;
            }
            handlers.splice(index, 0, handler);
        };
        Tech.selectSourceHandler = function(source) {
            var handlers = Tech.sourceHandlers || [], can;
            for (var i = 0; i < handlers.length; i++) {
                can = handlers[i].canHandleSource(source);
                if (can) {
                    return handlers[i];
                }
            }
            return null;
        };
        Tech.canPlaySource = function(srcObj) {
            var sh = Tech.selectSourceHandler(srcObj);
            if (sh) {
                return sh.canHandleSource(srcObj);
            }
            return "";
        };
        Tech.prototype.setSource = function(source) {
            var sh = Tech.selectSourceHandler(source);
            if (!sh) {
                if (Tech.nativeSourceHandler) {
                    sh = Tech.nativeSourceHandler;
                } else {
                    vjs.log.error("No source hander found for the current source.");
                }
            }
            this.disposeSourceHandler();
            this.off("dispose", this.disposeSourceHandler);
            this.currentSource_ = source;
            this.sourceHandler_ = sh.handleSource(source, this);
            this.on("dispose", this.disposeSourceHandler);
            return this;
        };
        Tech.prototype.disposeSourceHandler = function() {
            if (this.sourceHandler_ && this.sourceHandler_.dispose) {
                this.sourceHandler_.dispose();
            }
        };
    };
    vjs.media = {};
})();

vjs.Html5 = vjs.MediaTechController.extend({
    init: function(player, options, ready) {
        var nodes, nodesLength, i, node, nodeName, removeNodes;
        if (options["nativeCaptions"] === false || options["nativeTextTracks"] === false) {
            this["featuresNativeTextTracks"] = false;
        }
        vjs.MediaTechController.call(this, player, options, ready);
        this.setupTriggers();
        var source = options["source"];
        if (source && (this.el_.currentSrc !== source.src || player.tag && player.tag.initNetworkState_ === 3)) {
            this.setSource(source);
        }
        if (this.el_.hasChildNodes()) {
            nodes = this.el_.childNodes;
            nodesLength = nodes.length;
            removeNodes = [];
            while (nodesLength--) {
                node = nodes[nodesLength];
                nodeName = node.nodeName.toLowerCase();
                if (nodeName === "track") {
                    if (!this["featuresNativeTextTracks"]) {
                        removeNodes.push(node);
                    } else {
                        this.remoteTextTracks().addTrack_(node["track"]);
                    }
                }
            }
            for (i = 0; i < removeNodes.length; i++) {
                this.el_.removeChild(removeNodes[i]);
            }
        }
        if (this["featuresNativeTextTracks"]) {
            this.on("loadstart", vjs.bind(this, this.hideCaptions));
        }
        if (vjs.TOUCH_ENABLED && player.options()["nativeControlsForTouch"] === true) {
            this.useNativeControls();
        }
        player.ready(function() {
            if (this.src() && this.tag && this.options_["autoplay"] && this.paused()) {
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
    var player = this.player_, track, trackEl, i, el = player.tag, attributes, newEl, clone;
    if (!el || this["movingMediaElementInDOM"] === false) {
        if (el) {
            clone = el.cloneNode(false);
            vjs.Html5.disposeMediaElement(el);
            el = clone;
            player.tag = null;
        } else {
            el = vjs.createEl("video");
            attributes = videojs.util.mergeOptions({}, player.tagAttributes);
            if (!vjs.TOUCH_ENABLED || player.options()["nativeControlsForTouch"] !== true) {
                delete attributes.controls;
            }
            vjs.setElementAttributes(el, vjs.obj.merge(attributes, {
                id: player.id() + "_html5_api",
                "class": "vjs-tech"
            }));
        }
        el["player"] = player;
        if (player.options_.tracks) {
            for (i = 0; i < player.options_.tracks.length; i++) {
                track = player.options_.tracks[i];
                trackEl = document.createElement("track");
                trackEl.kind = track.kind;
                trackEl.label = track.label;
                trackEl.srclang = track.srclang;
                trackEl.src = track.src;
                if ("default" in track) {
                    trackEl.setAttribute("default", "default");
                }
                el.appendChild(trackEl);
            }
        }
        vjs.insertFirst(el, player.el());
    }
    var settingsAttrs = [ "autoplay", "preload", "loop", "muted" ];
    for (i = settingsAttrs.length - 1; i >= 0; i--) {
        var attr = settingsAttrs[i];
        var overwriteAttrs = {};
        if (typeof player.options_[attr] !== "undefined") {
            overwriteAttrs[attr] = player.options_[attr];
        }
        vjs.setElementAttributes(el, overwriteAttrs);
    }
    return el;
};

vjs.Html5.prototype.hideCaptions = function() {
    var tracks = this.el_.querySelectorAll("track"), track, i = tracks.length, kinds = {
        captions: 1,
        subtitles: 1
    };
    while (i--) {
        track = tracks[i].track;
        if (track && track["kind"] in kinds && !tracks[i]["default"]) {
            track.mode = "disabled";
        }
    }
};

vjs.Html5.prototype.setupTriggers = function() {
    for (var i = vjs.Html5.Events.length - 1; i >= 0; i--) {
        this.on(vjs.Html5.Events[i], this.eventHandler);
    }
};

vjs.Html5.prototype.eventHandler = function(evt) {
    if (evt.type == "error" && this.error()) {
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
    if ("webkitDisplayingFullscreen" in video) {
        this.one("webkitbeginfullscreen", function() {
            this.player_.isFullscreen(true);
            this.one("webkitendfullscreen", function() {
                this.player_.isFullscreen(false);
                this.player_.trigger("fullscreenchange");
            });
            this.player_.trigger("fullscreenchange");
        });
    }
    if (video.paused && video.networkState <= video.HAVE_METADATA) {
        this.el_.play();
        this.setTimeout(function() {
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
    if (src === undefined) {
        return this.el_.src;
    } else {
        this.setSrc(src);
    }
};

vjs.Html5.prototype.setSrc = function(src) {
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

vjs.Html5.prototype.readyState = function() {
    return this.el_.readyState;
};

vjs.Html5.prototype.textTracks = function() {
    if (!this["featuresNativeTextTracks"]) {
        return vjs.MediaTechController.prototype.textTracks.call(this);
    }
    return this.el_.textTracks;
};

vjs.Html5.prototype.addTextTrack = function(kind, label, language) {
    if (!this["featuresNativeTextTracks"]) {
        return vjs.MediaTechController.prototype.addTextTrack.call(this, kind, label, language);
    }
    return this.el_.addTextTrack(kind, label, language);
};

vjs.Html5.prototype.addRemoteTextTrack = function(options) {
    if (!this["featuresNativeTextTracks"]) {
        return vjs.MediaTechController.prototype.addRemoteTextTrack.call(this, options);
    }
    var track = document.createElement("track");
    options = options || {};
    if (options["kind"]) {
        track["kind"] = options["kind"];
    }
    if (options["label"]) {
        track["label"] = options["label"];
    }
    if (options["language"] || options["srclang"]) {
        track["srclang"] = options["language"] || options["srclang"];
    }
    if (options["default"]) {
        track["default"] = options["default"];
    }
    if (options["id"]) {
        track["id"] = options["id"];
    }
    if (options["src"]) {
        track["src"] = options["src"];
    }
    this.el().appendChild(track);
    if (track.track["kind"] === "metadata") {
        track["track"]["mode"] = "hidden";
    } else {
        track["track"]["mode"] = "disabled";
    }
    track["onload"] = function() {
        var tt = track["track"];
        if (track.readyState >= 2) {
            if (tt["kind"] === "metadata" && tt["mode"] !== "hidden") {
                tt["mode"] = "hidden";
            } else if (tt["kind"] !== "metadata" && tt["mode"] !== "disabled") {
                tt["mode"] = "disabled";
            }
            track["onload"] = null;
        }
    };
    this.remoteTextTracks().addTrack_(track.track);
    return track;
};

vjs.Html5.prototype.removeRemoteTextTrack = function(track) {
    if (!this["featuresNativeTextTracks"]) {
        return vjs.MediaTechController.prototype.removeRemoteTextTrack.call(this, track);
    }
    var tracks, i;
    this.remoteTextTracks().removeTrack_(track);
    tracks = this.el()["querySelectorAll"]("track");
    for (i = 0; i < tracks.length; i++) {
        if (tracks[i] === track || tracks[i]["track"] === track) {
            tracks[i]["parentNode"]["removeChild"](tracks[i]);
            break;
        }
    }
};

vjs.Html5.isSupported = function() {
    try {
        vjs.TEST_VID["volume"] = .5;
    } catch (e) {
        return false;
    }
    return !!vjs.TEST_VID.canPlayType;
};

vjs.MediaTechController.withSourceHandlers(vjs.Html5);

vjs.Html5.nativeSourceHandler = {};

vjs.Html5.nativeSourceHandler.canHandleSource = function(source) {
    var match, ext;
    function canPlayType(type) {
        try {
            return vjs.TEST_VID.canPlayType(type);
        } catch (e) {
            return "";
        }
    }
    if (source.type) {
        return canPlayType(source.type);
    } else if (source.src) {
        match = source.src.match(/\.([^.\/\?]+)(\?[^\/]+)?$/i);
        ext = match && match[1];
        return canPlayType("video/" + ext);
    }
    return "";
};

vjs.Html5.nativeSourceHandler.handleSource = function(source, tech) {
    tech.setSrc(source.src);
};

vjs.Html5.nativeSourceHandler.dispose = function() {};

vjs.Html5.registerSourceHandler(vjs.Html5.nativeSourceHandler);

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

vjs.Html5.supportsNativeTextTracks = function() {
    var supportsTextTracks;
    supportsTextTracks = !!vjs.TEST_VID.textTracks;
    if (supportsTextTracks && vjs.TEST_VID.textTracks.length > 0) {
        supportsTextTracks = typeof vjs.TEST_VID.textTracks[0]["mode"] !== "number";
    }
    if (supportsTextTracks && vjs.IS_FIREFOX) {
        supportsTextTracks = false;
    }
    return supportsTextTracks;
};

vjs.Html5.prototype["featuresVolumeControl"] = vjs.Html5.canControlVolume();

vjs.Html5.prototype["featuresPlaybackRate"] = vjs.Html5.canControlPlaybackRate();

vjs.Html5.prototype["movingMediaElementInDOM"] = !vjs.IS_IOS;

vjs.Html5.prototype["featuresFullscreenResize"] = true;

vjs.Html5.prototype["featuresProgressEvents"] = true;

vjs.Html5.prototype["featuresNativeTextTracks"] = vjs.Html5.supportsNativeTextTracks();

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
        var source = options["source"], objId = player.id() + "_flash_api", playerOptions = player.options_, flashVars = vjs.obj.merge({
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
            this.ready(function() {
                this.setSource(source);
            });
        }
        vjs.insertFirst(this.el_, options["parentEl"]);
        if (options["startTime"]) {
            this.ready(function() {
                this.load();
                this.play();
                this["currentTime"](options["startTime"]);
            });
        }
        if (vjs.IS_FIREFOX) {
            this.ready(function() {
                this.on("mousemove", function() {
                    this.player().trigger({
                        type: "mousemove",
                        bubbles: false
                    });
                });
            });
        }
        player.on("stageclick", player.reportUserActivity);
        this.el_ = vjs.Flash.embed(options["swf"], this.el_, flashVars, params, attributes);
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
    return this.setSrc(src);
};

vjs.Flash.prototype.setSrc = function(src) {
    src = vjs.getAbsoluteURL(src);
    this.el_.vjs_src(src);
    if (this.player_.autoplay()) {
        var tech = this;
        this.setTimeout(function() {
            tech.play();
        }, 0);
    }
};

vjs.Flash.prototype["setCurrentTime"] = function(time) {
    this.lastSeekTarget_ = time;
    this.el_.vjs_setProperty("currentTime", time);
    vjs.MediaTechController.prototype.setCurrentTime.call(this);
};

vjs.Flash.prototype["currentTime"] = function(time) {
    if (this.seeking()) {
        return this.lastSeekTarget_ || 0;
    }
    return this.el_.vjs_getProperty("currentTime");
};

vjs.Flash.prototype["currentSrc"] = function() {
    if (this.currentSource_) {
        return this.currentSource_.src;
    } else {
        return this.el_.vjs_getProperty("currentSrc");
    }
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
    var api = vjs.Flash.prototype, readWrite = "rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), readOnly = "error,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight".split(","), i;
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

vjs.MediaTechController.withSourceHandlers(vjs.Flash);

vjs.Flash.nativeSourceHandler = {};

vjs.Flash.nativeSourceHandler.canHandleSource = function(source) {
    var type;
    if (!source.type) {
        return "";
    }
    type = source.type.replace(/;.*/, "").toLowerCase();
    if (type in vjs.Flash.formats) {
        return "maybe";
    }
    return "";
};

vjs.Flash.nativeSourceHandler.handleSource = function(source, tech) {
    tech.setSrc(source.src);
};

vjs.Flash.nativeSourceHandler.dispose = function() {};

vjs.Flash.registerSourceHandler(vjs.Flash.nativeSourceHandler);

vjs.Flash.formats = {
    "video/flv": "FLV",
    "video/x-flv": "FLV",
    "video/mp4": "MP4",
    "video/m4v": "MP4"
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
        this.setTimeout(function() {
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
    obj[vjs.expando] = placeHolder[vjs.expando];
    var newObj = par.childNodes[0];
    setTimeout(function() {
        newObj.style.display = "block";
    }, 1e3);
    return obj;
};

vjs.Flash.getEmbedCode = function(swf, flashVars, params, attributes) {
    var objTag = '<object type="application/x-shockwave-flash" ', flashVarsString = "", paramsString = "", attrsString = "";
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

vjs.Flash.streamingFormats = {
    "rtmp/mp4": "MP4",
    "rtmp/flv": "FLV"
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

vjs.Flash.rtmpSourceHandler = {};

vjs.Flash.rtmpSourceHandler.canHandleSource = function(source) {
    if (vjs.Flash.isStreamingType(source.type) || vjs.Flash.isStreamingSrc(source.src)) {
        return "maybe";
    }
    return "";
};

vjs.Flash.rtmpSourceHandler.handleSource = function(source, tech) {
    var srcParts = vjs.Flash.streamToParts(source.src);
    tech["setRtmpConnection"](srcParts.connection);
    tech["setRtmpStream"](srcParts.stream);
};

vjs.Flash.registerSourceHandler(vjs.Flash.rtmpSourceHandler);

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

vjs.TextTrackMode = {
    disabled: "disabled",
    hidden: "hidden",
    showing: "showing"
};

vjs.TextTrackKind = {
    subtitles: "subtitles",
    captions: "captions",
    descriptions: "descriptions",
    chapters: "chapters",
    metadata: "metadata"
};

(function() {
    vjs.TextTrack = function(options) {
        var tt, id, mode, kind, label, language, cues, activeCues, timeupdateHandler, changed, prop;
        options = options || {};
        if (!options["player"]) {
            throw new Error("A player was not provided.");
        }
        tt = this;
        if (vjs.IS_IE8) {
            tt = document.createElement("custom");
            for (prop in vjs.TextTrack.prototype) {
                tt[prop] = vjs.TextTrack.prototype[prop];
            }
        }
        tt.player_ = options["player"];
        mode = vjs.TextTrackMode[options["mode"]] || "disabled";
        kind = vjs.TextTrackKind[options["kind"]] || "subtitles";
        label = options["label"] || "";
        language = options["language"] || options["srclang"] || "";
        id = options["id"] || "vjs_text_track_" + vjs.guid++;
        if (kind === "metadata" || kind === "chapters") {
            mode = "hidden";
        }
        tt.cues_ = [];
        tt.activeCues_ = [];
        cues = new vjs.TextTrackCueList(tt.cues_);
        activeCues = new vjs.TextTrackCueList(tt.activeCues_);
        changed = false;
        timeupdateHandler = vjs.bind(tt, function() {
            this["activeCues"];
            if (changed) {
                this["trigger"]("cuechange");
                changed = false;
            }
        });
        if (mode !== "disabled") {
            tt.player_.on("timeupdate", timeupdateHandler);
        }
        Object.defineProperty(tt, "kind", {
            get: function() {
                return kind;
            },
            set: Function.prototype
        });
        Object.defineProperty(tt, "label", {
            get: function() {
                return label;
            },
            set: Function.prototype
        });
        Object.defineProperty(tt, "language", {
            get: function() {
                return language;
            },
            set: Function.prototype
        });
        Object.defineProperty(tt, "id", {
            get: function() {
                return id;
            },
            set: Function.prototype
        });
        Object.defineProperty(tt, "mode", {
            get: function() {
                return mode;
            },
            set: function(newMode) {
                if (!vjs.TextTrackMode[newMode]) {
                    return;
                }
                mode = newMode;
                if (mode === "showing") {
                    this.player_.on("timeupdate", timeupdateHandler);
                }
                this.trigger("modechange");
            }
        });
        Object.defineProperty(tt, "cues", {
            get: function() {
                if (!this.loaded_) {
                    return null;
                }
                return cues;
            },
            set: Function.prototype
        });
        Object.defineProperty(tt, "activeCues", {
            get: function() {
                var i, l, active, ct, cue;
                if (!this.loaded_) {
                    return null;
                }
                if (this["cues"].length === 0) {
                    return activeCues;
                }
                ct = this.player_.currentTime();
                i = 0;
                l = this["cues"].length;
                active = [];
                for (;i < l; i++) {
                    cue = this["cues"][i];
                    if (cue["startTime"] <= ct && cue["endTime"] >= ct) {
                        active.push(cue);
                    } else if (cue["startTime"] === cue["endTime"] && cue["startTime"] <= ct && cue["startTime"] + .5 >= ct) {
                        active.push(cue);
                    }
                }
                changed = false;
                if (active.length !== this.activeCues_.length) {
                    changed = true;
                } else {
                    for (i = 0; i < active.length; i++) {
                        if (indexOf.call(this.activeCues_, active[i]) === -1) {
                            changed = true;
                        }
                    }
                }
                this.activeCues_ = active;
                activeCues.setCues_(this.activeCues_);
                return activeCues;
            },
            set: Function.prototype
        });
        if (options.src) {
            loadTrack(options.src, tt);
        } else {
            tt.loaded_ = true;
        }
        if (vjs.IS_IE8) {
            return tt;
        }
    };
    vjs.TextTrack.prototype = vjs.obj.create(vjs.EventEmitter.prototype);
    vjs.TextTrack.prototype.constructor = vjs.TextTrack;
    vjs.TextTrack.prototype.allowedEvents_ = {
        cuechange: "cuechange"
    };
    vjs.TextTrack.prototype.addCue = function(cue) {
        var tracks = this.player_.textTracks(), i = 0;
        if (tracks) {
            for (;i < tracks.length; i++) {
                if (tracks[i] !== this) {
                    tracks[i].removeCue(cue);
                }
            }
        }
        this.cues_.push(cue);
        this["cues"].setCues_(this.cues_);
    };
    vjs.TextTrack.prototype.removeCue = function(removeCue) {
        var i = 0, l = this.cues_.length, cue, removed = false;
        for (;i < l; i++) {
            cue = this.cues_[i];
            if (cue === removeCue) {
                this.cues_.splice(i, 1);
                removed = true;
            }
        }
        if (removed) {
            this.cues.setCues_(this.cues_);
        }
    };
    var loadTrack, parseCues, indexOf;
    loadTrack = function(src, track) {
        vjs.xhr(src, vjs.bind(this, function(err, response, responseBody) {
            if (err) {
                return vjs.log.error(err);
            }
            track.loaded_ = true;
            parseCues(responseBody, track);
        }));
    };
    parseCues = function(srcContent, track) {
        if (typeof window["WebVTT"] !== "function") {
            return window.setTimeout(function() {
                parseCues(srcContent, track);
            }, 25);
        }
        var parser = new window["WebVTT"]["Parser"](window, window["vttjs"], window["WebVTT"]["StringDecoder"]());
        parser["oncue"] = function(cue) {
            track.addCue(cue);
        };
        parser["onparsingerror"] = function(error) {
            vjs.log.error(error);
        };
        parser["parse"](srcContent);
        parser["flush"]();
    };
    indexOf = function(searchElement, fromIndex) {
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
})();

vjs.TextTrackList = function(tracks) {
    var list = this, prop, i = 0;
    if (vjs.IS_IE8) {
        list = document.createElement("custom");
        for (prop in vjs.TextTrackList.prototype) {
            list[prop] = vjs.TextTrackList.prototype[prop];
        }
    }
    tracks = tracks || [];
    list.tracks_ = [];
    Object.defineProperty(list, "length", {
        get: function() {
            return this.tracks_.length;
        }
    });
    for (;i < tracks.length; i++) {
        list.addTrack_(tracks[i]);
    }
    if (vjs.IS_IE8) {
        return list;
    }
};

vjs.TextTrackList.prototype = vjs.obj.create(vjs.EventEmitter.prototype);

vjs.TextTrackList.prototype.constructor = vjs.TextTrackList;

vjs.TextTrackList.prototype.allowedEvents_ = {
    change: "change",
    addtrack: "addtrack",
    removetrack: "removetrack"
};

(function() {
    var event;
    for (event in vjs.TextTrackList.prototype.allowedEvents_) {
        vjs.TextTrackList.prototype["on" + event] = null;
    }
})();

vjs.TextTrackList.prototype.addTrack_ = function(track) {
    var index = this.tracks_.length;
    if (!("" + index in this)) {
        Object.defineProperty(this, index, {
            get: function() {
                return this.tracks_[index];
            }
        });
    }
    track.addEventListener("modechange", vjs.bind(this, function() {
        this.trigger("change");
    }));
    this.tracks_.push(track);
    this.trigger({
        type: "addtrack",
        track: track
    });
};

vjs.TextTrackList.prototype.removeTrack_ = function(rtrack) {
    var i = 0, l = this.length, result = null, track;
    for (;i < l; i++) {
        track = this[i];
        if (track === rtrack) {
            this.tracks_.splice(i, 1);
            break;
        }
    }
    this.trigger({
        type: "removetrack",
        track: rtrack
    });
};

vjs.TextTrackList.prototype.getTrackById = function(id) {
    var i = 0, l = this.length, result = null, track;
    for (;i < l; i++) {
        track = this[i];
        if (track.id === id) {
            result = track;
            break;
        }
    }
    return result;
};

vjs.TextTrackCueList = function(cues) {
    var list = this, prop;
    if (vjs.IS_IE8) {
        list = document.createElement("custom");
        for (prop in vjs.TextTrackCueList.prototype) {
            list[prop] = vjs.TextTrackCueList.prototype[prop];
        }
    }
    vjs.TextTrackCueList.prototype.setCues_.call(list, cues);
    Object.defineProperty(list, "length", {
        get: function() {
            return this.length_;
        }
    });
    if (vjs.IS_IE8) {
        return list;
    }
};

vjs.TextTrackCueList.prototype.setCues_ = function(cues) {
    var oldLength = this.length || 0, i = 0, l = cues.length, defineProp;
    this.cues_ = cues;
    this.length_ = cues.length;
    defineProp = function(i) {
        if (!("" + i in this)) {
            Object.defineProperty(this, "" + i, {
                get: function() {
                    return this.cues_[i];
                }
            });
        }
    };
    if (oldLength < l) {
        i = oldLength;
        for (;i < l; i++) {
            defineProp.call(this, i);
        }
    }
};

vjs.TextTrackCueList.prototype.getCueById = function(id) {
    var i = 0, l = this.length, result = null, cue;
    for (;i < l; i++) {
        cue = this[i];
        if (cue.id === id) {
            result = cue;
            break;
        }
    }
    return result;
};

(function() {
    "use strict";
    vjs.TextTrackDisplay = vjs.Component.extend({
        init: function(player, options, ready) {
            vjs.Component.call(this, player, options, ready);
            player.on("loadstart", vjs.bind(this, this.toggleDisplay));
            player.ready(vjs.bind(this, function() {
                if (player.tech && player.tech["featuresNativeTextTracks"]) {
                    this.hide();
                    return;
                }
                var i, tracks, track;
                player.on("fullscreenchange", vjs.bind(this, this.updateDisplay));
                tracks = player.options_["tracks"] || [];
                for (i = 0; i < tracks.length; i++) {
                    track = tracks[i];
                    this.player_.addRemoteTextTrack(track);
                }
            }));
        }
    });
    vjs.TextTrackDisplay.prototype.toggleDisplay = function() {
        if (this.player_.tech && this.player_.tech["featuresNativeTextTracks"]) {
            this.hide();
        } else {
            this.show();
        }
    };
    vjs.TextTrackDisplay.prototype.createEl = function() {
        return vjs.Component.prototype.createEl.call(this, "div", {
            className: "vjs-text-track-display"
        });
    };
    vjs.TextTrackDisplay.prototype.clearDisplay = function() {
        if (typeof window["WebVTT"] === "function") {
            window["WebVTT"]["processCues"](window, [], this.el_);
        }
    };
    var constructColor = function(color, opacity) {
        return "rgba(" + parseInt(color[1] + color[1], 16) + "," + parseInt(color[2] + color[2], 16) + "," + parseInt(color[3] + color[3], 16) + "," + opacity + ")";
    };
    var darkGray = "#222";
    var lightGray = "#ccc";
    var fontMap = {
        monospace: "monospace",
        sansSerif: "sans-serif",
        serif: "serif",
        monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
        monospaceSerif: '"Courier New", monospace',
        proportionalSansSerif: "sans-serif",
        proportionalSerif: "serif",
        casual: '"Comic Sans MS", Impact, fantasy',
        script: '"Monotype Corsiva", cursive',
        smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
    };
    var tryUpdateStyle = function(el, style, rule) {
        try {
            el.style[style] = rule;
        } catch (e) {}
    };
    vjs.TextTrackDisplay.prototype.updateDisplay = function() {
        var tracks = this.player_.textTracks(), i = 0, track;
        this.clearDisplay();
        if (!tracks) {
            return;
        }
        for (;i < tracks.length; i++) {
            track = tracks[i];
            if (track["mode"] === "showing") {
                this.updateForTrack(track);
            }
        }
    };
    vjs.TextTrackDisplay.prototype.updateForTrack = function(track) {
        if (typeof window["WebVTT"] !== "function" || !track["activeCues"]) {
            return;
        }
        var i = 0, property, cueDiv, overrides = this.player_["textTrackSettings"].getValues(), fontSize, cues = [];
        for (;i < track["activeCues"].length; i++) {
            cues.push(track["activeCues"][i]);
        }
        window["WebVTT"]["processCues"](window, track["activeCues"], this.el_);
        i = cues.length;
        while (i--) {
            cueDiv = cues[i].displayState;
            if (overrides.color) {
                cueDiv.firstChild.style.color = overrides.color;
            }
            if (overrides.textOpacity) {
                tryUpdateStyle(cueDiv.firstChild, "color", constructColor(overrides.color || "#fff", overrides.textOpacity));
            }
            if (overrides.backgroundColor) {
                cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
            }
            if (overrides.backgroundOpacity) {
                tryUpdateStyle(cueDiv.firstChild, "backgroundColor", constructColor(overrides.backgroundColor || "#000", overrides.backgroundOpacity));
            }
            if (overrides.windowColor) {
                if (overrides.windowOpacity) {
                    tryUpdateStyle(cueDiv, "backgroundColor", constructColor(overrides.windowColor, overrides.windowOpacity));
                } else {
                    cueDiv.style.backgroundColor = overrides.windowColor;
                }
            }
            if (overrides.edgeStyle) {
                if (overrides.edgeStyle === "dropshadow") {
                    cueDiv.firstChild.style.textShadow = "2px 2px 3px " + darkGray + ", 2px 2px 4px " + darkGray + ", 2px 2px 5px " + darkGray;
                } else if (overrides.edgeStyle === "raised") {
                    cueDiv.firstChild.style.textShadow = "1px 1px " + darkGray + ", 2px 2px " + darkGray + ", 3px 3px " + darkGray;
                } else if (overrides.edgeStyle === "depressed") {
                    cueDiv.firstChild.style.textShadow = "1px 1px " + lightGray + ", 0 1px " + lightGray + ", -1px -1px " + darkGray + ", 0 -1px " + darkGray;
                } else if (overrides.edgeStyle === "uniform") {
                    cueDiv.firstChild.style.textShadow = "0 0 4px " + darkGray + ", 0 0 4px " + darkGray + ", 0 0 4px " + darkGray + ", 0 0 4px " + darkGray;
                }
            }
            if (overrides.fontPercent && overrides.fontPercent !== 1) {
                fontSize = window.parseFloat(cueDiv.style.fontSize);
                cueDiv.style.fontSize = fontSize * overrides.fontPercent + "px";
                cueDiv.style.height = "auto";
                cueDiv.style.top = "auto";
                cueDiv.style.bottom = "2px";
            }
            if (overrides.fontFamily && overrides.fontFamily !== "default") {
                if (overrides.fontFamily === "small-caps") {
                    cueDiv.firstChild.style.fontVariant = "small-caps";
                } else {
                    cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
                }
            }
        }
    };
    vjs.TextTrackMenuItem = vjs.MenuItem.extend({
        init: function(player, options) {
            var track = this.track = options["track"], tracks = player.textTracks(), changeHandler, event;
            if (tracks) {
                changeHandler = vjs.bind(this, function() {
                    var selected = this.track["mode"] === "showing", track, i, l;
                    if (this instanceof vjs.OffTextTrackMenuItem) {
                        selected = true;
                        i = 0, l = tracks.length;
                        for (;i < l; i++) {
                            track = tracks[i];
                            if (track["kind"] === this.track["kind"] && track["mode"] === "showing") {
                                selected = false;
                                break;
                            }
                        }
                    }
                    this.selected(selected);
                });
                tracks.addEventListener("change", changeHandler);
                player.on("dispose", function() {
                    tracks.removeEventListener("change", changeHandler);
                });
            }
            options["label"] = track["label"] || track["language"] || "Unknown";
            options["selected"] = track["default"] || track["mode"] === "showing";
            vjs.MenuItem.call(this, player, options);
            if (tracks && tracks.onchange === undefined) {
                this.on([ "tap", "click" ], function() {
                    if (typeof window.Event !== "object") {
                        try {
                            event = new window.Event("change");
                        } catch (err) {}
                    }
                    if (!event) {
                        event = document.createEvent("Event");
                        event.initEvent("change", true, true);
                    }
                    tracks.dispatchEvent(event);
                });
            }
        }
    });
    vjs.TextTrackMenuItem.prototype.onClick = function() {
        var kind = this.track["kind"], tracks = this.player_.textTracks(), mode, track, i = 0;
        vjs.MenuItem.prototype.onClick.call(this);
        if (!tracks) {
            return;
        }
        for (;i < tracks.length; i++) {
            track = tracks[i];
            if (track["kind"] !== kind) {
                continue;
            }
            if (track === this.track) {
                track["mode"] = "showing";
            } else {
                track["mode"] = "disabled";
            }
        }
    };
    vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
        init: function(player, options) {
            options["track"] = {
                kind: options["kind"],
                player: player,
                label: options["kind"] + " off",
                "default": false,
                mode: "disabled"
            };
            vjs.TextTrackMenuItem.call(this, player, options);
            this.selected(true);
        }
    });
    vjs.CaptionSettingsMenuItem = vjs.TextTrackMenuItem.extend({
        init: function(player, options) {
            options["track"] = {
                kind: options["kind"],
                player: player,
                label: options["kind"] + " settings",
                "default": false,
                mode: "disabled"
            };
            vjs.TextTrackMenuItem.call(this, player, options);
            this.addClass("vjs-texttrack-settings");
        }
    });
    vjs.CaptionSettingsMenuItem.prototype.onClick = function() {
        this.player().getChild("textTrackSettings").show();
    };
    vjs.TextTrackButton = vjs.MenuButton.extend({
        init: function(player, options) {
            var tracks, updateHandler;
            vjs.MenuButton.call(this, player, options);
            tracks = this.player_.textTracks();
            if (this.items.length <= 1) {
                this.hide();
            }
            if (!tracks) {
                return;
            }
            updateHandler = vjs.bind(this, this.update);
            tracks.addEventListener("removetrack", updateHandler);
            tracks.addEventListener("addtrack", updateHandler);
            this.player_.on("dispose", function() {
                tracks.removeEventListener("removetrack", updateHandler);
                tracks.removeEventListener("addtrack", updateHandler);
            });
        }
    });
    vjs.TextTrackButton.prototype.createItems = function() {
        var items = [], track, tracks;
        if (this instanceof vjs.CaptionsButton && !(this.player().tech && this.player().tech["featuresNativeTextTracks"])) {
            items.push(new vjs.CaptionSettingsMenuItem(this.player_, {
                kind: this.kind_
            }));
        }
        items.push(new vjs.OffTextTrackMenuItem(this.player_, {
            kind: this.kind_
        }));
        tracks = this.player_.textTracks();
        if (!tracks) {
            return items;
        }
        for (var i = 0; i < tracks.length; i++) {
            track = tracks[i];
            if (track["kind"] === this.kind_) {
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
    vjs.CaptionsButton.prototype.update = function() {
        var threshold = 2;
        vjs.TextTrackButton.prototype.update.call(this);
        if (this.player().tech && this.player().tech["featuresNativeTextTracks"]) {
            threshold = 1;
        }
        if (this.items && this.items.length > threshold) {
            this.show();
        } else {
            this.hide();
        }
    };
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
        var items = [], track, tracks;
        tracks = this.player_.textTracks();
        if (!tracks) {
            return items;
        }
        for (var i = 0; i < tracks.length; i++) {
            track = tracks[i];
            if (track["kind"] === this.kind_) {
                items.push(new vjs.TextTrackMenuItem(this.player_, {
                    track: track
                }));
            }
        }
        return items;
    };
    vjs.ChaptersButton.prototype.createMenu = function() {
        var tracks = this.player_.textTracks() || [], i = 0, l = tracks.length, track, chaptersTrack, items = this.items = [];
        for (;i < l; i++) {
            track = tracks[i];
            if (track["kind"] == this.kind_) {
                if (!track.cues) {
                    track["mode"] = "hidden";
                    window.setTimeout(vjs.bind(this, function() {
                        this.createMenu();
                    }), 100);
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
            var cues = chaptersTrack["cues"], cue, mi;
            i = 0;
            l = cues.length;
            for (;i < l; i++) {
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
            options["selected"] = cue["startTime"] <= currentTime && currentTime < cue["endTime"];
            vjs.MenuItem.call(this, player, options);
            track.addEventListener("cuechange", vjs.bind(this, this.update));
        }
    });
    vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
        vjs.MenuItem.prototype.onClick.call(this);
        this.player_.currentTime(this.cue.startTime);
        this.update(this.cue.startTime);
    };
    vjs.ChaptersTrackMenuItem.prototype.update = function() {
        var cue = this.cue, currentTime = this.player_.currentTime();
        this.selected(cue["startTime"] <= currentTime && currentTime < cue["endTime"]);
    };
})();

(function() {
    "use strict";
    vjs.TextTrackSettings = vjs.Component.extend({
        init: function(player, options) {
            vjs.Component.call(this, player, options);
            this.hide();
            vjs.on(this.el().querySelector(".vjs-done-button"), "click", vjs.bind(this, function() {
                this.saveSettings();
                this.hide();
            }));
            vjs.on(this.el().querySelector(".vjs-default-button"), "click", vjs.bind(this, function() {
                this.el().querySelector(".vjs-fg-color > select").selectedIndex = 0;
                this.el().querySelector(".vjs-bg-color > select").selectedIndex = 0;
                this.el().querySelector(".window-color > select").selectedIndex = 0;
                this.el().querySelector(".vjs-text-opacity > select").selectedIndex = 0;
                this.el().querySelector(".vjs-bg-opacity > select").selectedIndex = 0;
                this.el().querySelector(".vjs-window-opacity > select").selectedIndex = 0;
                this.el().querySelector(".vjs-edge-style select").selectedIndex = 0;
                this.el().querySelector(".vjs-font-family select").selectedIndex = 0;
                this.el().querySelector(".vjs-font-percent select").selectedIndex = 2;
                this.updateDisplay();
            }));
            vjs.on(this.el().querySelector(".vjs-fg-color > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-bg-color > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".window-color > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-text-opacity > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-bg-opacity > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-window-opacity > select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-font-percent select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-edge-style select"), "change", vjs.bind(this, this.updateDisplay));
            vjs.on(this.el().querySelector(".vjs-font-family select"), "change", vjs.bind(this, this.updateDisplay));
            if (player.options()["persistTextTrackSettings"]) {
                this.restoreSettings();
            }
        }
    });
    vjs.TextTrackSettings.prototype.createEl = function() {
        return vjs.Component.prototype.createEl.call(this, "div", {
            className: "vjs-caption-settings vjs-modal-overlay",
            innerHTML: captionOptionsMenuTemplate()
        });
    };
    vjs.TextTrackSettings.prototype.getValues = function() {
        var el, bgOpacity, textOpacity, windowOpacity, textEdge, fontFamily, fgColor, bgColor, windowColor, result, name, fontPercent;
        el = this.el();
        textEdge = getSelectedOptionValue(el.querySelector(".vjs-edge-style select"));
        fontFamily = getSelectedOptionValue(el.querySelector(".vjs-font-family select"));
        fgColor = getSelectedOptionValue(el.querySelector(".vjs-fg-color > select"));
        textOpacity = getSelectedOptionValue(el.querySelector(".vjs-text-opacity > select"));
        bgColor = getSelectedOptionValue(el.querySelector(".vjs-bg-color > select"));
        bgOpacity = getSelectedOptionValue(el.querySelector(".vjs-bg-opacity > select"));
        windowColor = getSelectedOptionValue(el.querySelector(".window-color > select"));
        windowOpacity = getSelectedOptionValue(el.querySelector(".vjs-window-opacity > select"));
        fontPercent = window["parseFloat"](getSelectedOptionValue(el.querySelector(".vjs-font-percent > select")));
        result = {
            backgroundOpacity: bgOpacity,
            textOpacity: textOpacity,
            windowOpacity: windowOpacity,
            edgeStyle: textEdge,
            fontFamily: fontFamily,
            color: fgColor,
            backgroundColor: bgColor,
            windowColor: windowColor,
            fontPercent: fontPercent
        };
        for (name in result) {
            if (result[name] === "" || result[name] === "none" || name === "fontPercent" && result[name] === 1) {
                delete result[name];
            }
        }
        return result;
    };
    vjs.TextTrackSettings.prototype.setValues = function(values) {
        var el = this.el(), fontPercent;
        setSelectedOption(el.querySelector(".vjs-edge-style select"), values.edgeStyle);
        setSelectedOption(el.querySelector(".vjs-font-family select"), values.fontFamily);
        setSelectedOption(el.querySelector(".vjs-fg-color > select"), values.color);
        setSelectedOption(el.querySelector(".vjs-text-opacity > select"), values.textOpacity);
        setSelectedOption(el.querySelector(".vjs-bg-color > select"), values.backgroundColor);
        setSelectedOption(el.querySelector(".vjs-bg-opacity > select"), values.backgroundOpacity);
        setSelectedOption(el.querySelector(".window-color > select"), values.windowColor);
        setSelectedOption(el.querySelector(".vjs-window-opacity > select"), values.windowOpacity);
        fontPercent = values.fontPercent;
        if (fontPercent) {
            fontPercent = fontPercent.toFixed(2);
        }
        setSelectedOption(el.querySelector(".vjs-font-percent > select"), fontPercent);
    };
    vjs.TextTrackSettings.prototype.restoreSettings = function() {
        var values;
        try {
            values = JSON.parse(window.localStorage.getItem("vjs-text-track-settings"));
        } catch (e) {}
        if (values) {
            this.setValues(values);
        }
    };
    vjs.TextTrackSettings.prototype.saveSettings = function() {
        var values;
        if (!this.player_.options()["persistTextTrackSettings"]) {
            return;
        }
        values = this.getValues();
        try {
            if (!vjs.isEmpty(values)) {
                window.localStorage.setItem("vjs-text-track-settings", JSON.stringify(values));
            } else {
                window.localStorage.removeItem("vjs-text-track-settings");
            }
        } catch (e) {}
    };
    vjs.TextTrackSettings.prototype.updateDisplay = function() {
        var ttDisplay = this.player_.getChild("textTrackDisplay");
        if (ttDisplay) {
            ttDisplay.updateDisplay();
        }
    };
    function getSelectedOptionValue(target) {
        var selectedOption;
        if (target.selectedOptions) {
            selectedOption = target.selectedOptions[0];
        } else if (target.options) {
            selectedOption = target.options[target.options.selectedIndex];
        }
        return selectedOption.value;
    }
    function setSelectedOption(target, value) {
        var i, option;
        if (!value) {
            return;
        }
        for (i = 0; i < target.options.length; i++) {
            option = target.options[i];
            if (option.value === value) {
                break;
            }
        }
        target.selectedIndex = i;
    }
    function captionOptionsMenuTemplate() {
        return '<div class="vjs-tracksettings">' + '<div class="vjs-tracksettings-colors">' + '<div class="vjs-fg-color vjs-tracksetting">' + '<label class="vjs-label">Foreground</label>' + "<select>" + '<option value="">---</option>' + '<option value="#FFF">White</option>' + '<option value="#000">Black</option>' + '<option value="#F00">Red</option>' + '<option value="#0F0">Green</option>' + '<option value="#00F">Blue</option>' + '<option value="#FF0">Yellow</option>' + '<option value="#F0F">Magenta</option>' + '<option value="#0FF">Cyan</option>' + "</select>" + '<span class="vjs-text-opacity vjs-opacity">' + "<select>" + '<option value="">---</option>' + '<option value="1">Opaque</option>' + '<option value="0.5">Semi-Opaque</option>' + "</select>" + "</span>" + "</div>" + '<div class="vjs-bg-color vjs-tracksetting">' + '<label class="vjs-label">Background</label>' + "<select>" + '<option value="">---</option>' + '<option value="#FFF">White</option>' + '<option value="#000">Black</option>' + '<option value="#F00">Red</option>' + '<option value="#0F0">Green</option>' + '<option value="#00F">Blue</option>' + '<option value="#FF0">Yellow</option>' + '<option value="#F0F">Magenta</option>' + '<option value="#0FF">Cyan</option>' + "</select>" + '<span class="vjs-bg-opacity vjs-opacity">' + "<select>" + '<option value="">---</option>' + '<option value="1">Opaque</option>' + '<option value="0.5">Semi-Transparent</option>' + '<option value="0">Transparent</option>' + "</select>" + "</span>" + "</div>" + '<div class="window-color vjs-tracksetting">' + '<label class="vjs-label">Window</label>' + "<select>" + '<option value="">---</option>' + '<option value="#FFF">White</option>' + '<option value="#000">Black</option>' + '<option value="#F00">Red</option>' + '<option value="#0F0">Green</option>' + '<option value="#00F">Blue</option>' + '<option value="#FF0">Yellow</option>' + '<option value="#F0F">Magenta</option>' + '<option value="#0FF">Cyan</option>' + "</select>" + '<span class="vjs-window-opacity vjs-opacity">' + "<select>" + '<option value="">---</option>' + '<option value="1">Opaque</option>' + '<option value="0.5">Semi-Transparent</option>' + '<option value="0">Transparent</option>' + "</select>" + "</span>" + "</div>" + "</div>" + '<div class="vjs-tracksettings-font">' + '<div class="vjs-font-percent vjs-tracksetting">' + '<label class="vjs-label">Font Size</label>' + "<select>" + '<option value="0.50">50%</option>' + '<option value="0.75">75%</option>' + '<option value="1.00" selected>100%</option>' + '<option value="1.25">125%</option>' + '<option value="1.50">150%</option>' + '<option value="1.75">175%</option>' + '<option value="2.00">200%</option>' + '<option value="3.00">300%</option>' + '<option value="4.00">400%</option>' + "</select>" + "</div>" + '<div class="vjs-edge-style vjs-tracksetting">' + '<label class="vjs-label">Text Edge Style</label>' + "<select>" + '<option value="none">None</option>' + '<option value="raised">Raised</option>' + '<option value="depressed">Depressed</option>' + '<option value="uniform">Uniform</option>' + '<option value="dropshadow">Dropshadow</option>' + "</select>" + "</div>" + '<div class="vjs-font-family vjs-tracksetting">' + '<label class="vjs-label">Font Family</label>' + "<select>" + '<option value="">Default</option>' + '<option value="monospaceSerif">Monospace Serif</option>' + '<option value="proportionalSerif">Proportional Serif</option>' + '<option value="monospaceSansSerif">Monospace Sans-Serif</option>' + '<option value="proportionalSansSerif">Proportional Sans-Serif</option>' + '<option value="casual">Casual</option>' + '<option value="script">Script</option>' + '<option value="small-caps">Small Caps</option>' + "</select>" + "</div>" + "</div>" + "</div>" + '<div class="vjs-tracksettings-controls">' + '<button class="vjs-default-button">Defaults</button>' + '<button class="vjs-done-button">Done</button>' + "</div>";
    }
})();

vjs.JSON;

if (typeof window.JSON !== "undefined" && typeof window.JSON.parse === "function") {
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
    var options, mediaEl, player, i, e;
    var vids = document.getElementsByTagName("video");
    var audios = document.getElementsByTagName("audio");
    var mediaEls = [];
    if (vids && vids.length > 0) {
        for (i = 0, e = vids.length; i < e; i++) {
            mediaEls.push(vids[i]);
        }
    }
    if (audios && audios.length > 0) {
        for (i = 0, e = audios.length; i < e; i++) {
            mediaEls.push(audios[i]);
        }
    }
    if (mediaEls && mediaEls.length > 0) {
        for (i = 0, e = mediaEls.length; i < e; i++) {
            mediaEl = mediaEls[i];
            if (mediaEl && mediaEl.getAttribute) {
                if (mediaEl["player"] === undefined) {
                    options = mediaEl.getAttribute("data-setup");
                    if (options !== null) {
                        player = videojs(mediaEl);
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

(function(root) {
    var vttjs = root.vttjs = {};
    var cueShim = vttjs.VTTCue;
    var regionShim = vttjs.VTTRegion;
    var oldVTTCue = root.VTTCue;
    var oldVTTRegion = root.VTTRegion;
    vttjs.shim = function() {
        vttjs.VTTCue = cueShim;
        vttjs.VTTRegion = regionShim;
    };
    vttjs.restore = function() {
        vttjs.VTTCue = oldVTTCue;
        vttjs.VTTRegion = oldVTTRegion;
    };
})(this);

(function(root, vttjs) {
    var autoKeyword = "auto";
    var directionSetting = {
        "": true,
        lr: true,
        rl: true
    };
    var alignSetting = {
        start: true,
        middle: true,
        end: true,
        left: true,
        right: true
    };
    function findDirectionSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var dir = directionSetting[value.toLowerCase()];
        return dir ? value.toLowerCase() : false;
    }
    function findAlignSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var align = alignSetting[value.toLowerCase()];
        return align ? value.toLowerCase() : false;
    }
    function extend(obj) {
        var i = 1;
        for (;i < arguments.length; i++) {
            var cobj = arguments[i];
            for (var p in cobj) {
                obj[p] = cobj[p];
            }
        }
        return obj;
    }
    function VTTCue(startTime, endTime, text) {
        var cue = this;
        var isIE8 = /MSIE\s8\.0/.test(navigator.userAgent);
        var baseObj = {};
        if (isIE8) {
            cue = document.createElement("custom");
        } else {
            baseObj.enumerable = true;
        }
        cue.hasBeenReset = false;
        var _id = "";
        var _pauseOnExit = false;
        var _startTime = startTime;
        var _endTime = endTime;
        var _text = text;
        var _region = null;
        var _vertical = "";
        var _snapToLines = true;
        var _line = "auto";
        var _lineAlign = "start";
        var _position = 50;
        var _positionAlign = "middle";
        var _size = 50;
        var _align = "middle";
        Object.defineProperty(cue, "id", extend({}, baseObj, {
            get: function() {
                return _id;
            },
            set: function(value) {
                _id = "" + value;
            }
        }));
        Object.defineProperty(cue, "pauseOnExit", extend({}, baseObj, {
            get: function() {
                return _pauseOnExit;
            },
            set: function(value) {
                _pauseOnExit = !!value;
            }
        }));
        Object.defineProperty(cue, "startTime", extend({}, baseObj, {
            get: function() {
                return _startTime;
            },
            set: function(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Start time must be set to a number.");
                }
                _startTime = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "endTime", extend({}, baseObj, {
            get: function() {
                return _endTime;
            },
            set: function(value) {
                if (typeof value !== "number") {
                    throw new TypeError("End time must be set to a number.");
                }
                _endTime = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "text", extend({}, baseObj, {
            get: function() {
                return _text;
            },
            set: function(value) {
                _text = "" + value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "region", extend({}, baseObj, {
            get: function() {
                return _region;
            },
            set: function(value) {
                _region = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "vertical", extend({}, baseObj, {
            get: function() {
                return _vertical;
            },
            set: function(value) {
                var setting = findDirectionSetting(value);
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _vertical = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "snapToLines", extend({}, baseObj, {
            get: function() {
                return _snapToLines;
            },
            set: function(value) {
                _snapToLines = !!value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "line", extend({}, baseObj, {
            get: function() {
                return _line;
            },
            set: function(value) {
                if (typeof value !== "number" && value !== autoKeyword) {
                    throw new SyntaxError("An invalid number or illegal string was specified.");
                }
                _line = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "lineAlign", extend({}, baseObj, {
            get: function() {
                return _lineAlign;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _lineAlign = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "position", extend({}, baseObj, {
            get: function() {
                return _position;
            },
            set: function(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Position must be between 0 and 100.");
                }
                _position = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "positionAlign", extend({}, baseObj, {
            get: function() {
                return _positionAlign;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _positionAlign = setting;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "size", extend({}, baseObj, {
            get: function() {
                return _size;
            },
            set: function(value) {
                if (value < 0 || value > 100) {
                    throw new Error("Size must be between 0 and 100.");
                }
                _size = value;
                this.hasBeenReset = true;
            }
        }));
        Object.defineProperty(cue, "align", extend({}, baseObj, {
            get: function() {
                return _align;
            },
            set: function(value) {
                var setting = findAlignSetting(value);
                if (!setting) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _align = setting;
                this.hasBeenReset = true;
            }
        }));
        cue.displayState = undefined;
        if (isIE8) {
            return cue;
        }
    }
    VTTCue.prototype.getCueAsHTML = function() {
        return WebVTT.convertCueToDOMTree(window, this.text);
    };
    root.VTTCue = root.VTTCue || VTTCue;
    vttjs.VTTCue = VTTCue;
})(this, this.vttjs || {});

(function(root, vttjs) {
    var scrollSetting = {
        "": true,
        up: true
    };
    function findScrollSetting(value) {
        if (typeof value !== "string") {
            return false;
        }
        var scroll = scrollSetting[value.toLowerCase()];
        return scroll ? value.toLowerCase() : false;
    }
    function isValidPercentValue(value) {
        return typeof value === "number" && (value >= 0 && value <= 100);
    }
    function VTTRegion() {
        var _width = 100;
        var _lines = 3;
        var _regionAnchorX = 0;
        var _regionAnchorY = 100;
        var _viewportAnchorX = 0;
        var _viewportAnchorY = 100;
        var _scroll = "";
        Object.defineProperties(this, {
            width: {
                enumerable: true,
                get: function() {
                    return _width;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("Width must be between 0 and 100.");
                    }
                    _width = value;
                }
            },
            lines: {
                enumerable: true,
                get: function() {
                    return _lines;
                },
                set: function(value) {
                    if (typeof value !== "number") {
                        throw new TypeError("Lines must be set to a number.");
                    }
                    _lines = value;
                }
            },
            regionAnchorY: {
                enumerable: true,
                get: function() {
                    return _regionAnchorY;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("RegionAnchorX must be between 0 and 100.");
                    }
                    _regionAnchorY = value;
                }
            },
            regionAnchorX: {
                enumerable: true,
                get: function() {
                    return _regionAnchorX;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("RegionAnchorY must be between 0 and 100.");
                    }
                    _regionAnchorX = value;
                }
            },
            viewportAnchorY: {
                enumerable: true,
                get: function() {
                    return _viewportAnchorY;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("ViewportAnchorY must be between 0 and 100.");
                    }
                    _viewportAnchorY = value;
                }
            },
            viewportAnchorX: {
                enumerable: true,
                get: function() {
                    return _viewportAnchorX;
                },
                set: function(value) {
                    if (!isValidPercentValue(value)) {
                        throw new Error("ViewportAnchorX must be between 0 and 100.");
                    }
                    _viewportAnchorX = value;
                }
            },
            scroll: {
                enumerable: true,
                get: function() {
                    return _scroll;
                },
                set: function(value) {
                    var setting = findScrollSetting(value);
                    if (setting === false) {
                        throw new SyntaxError("An invalid or illegal string was specified.");
                    }
                    _scroll = setting;
                }
            }
        });
    }
    root.VTTRegion = root.VTTRegion || VTTRegion;
    vttjs.VTTRegion = VTTRegion;
})(this, this.vttjs || {});

(function(global) {
    var _objCreate = Object.create || function() {
        function F() {}
        return function(o) {
            if (arguments.length !== 1) {
                throw new Error("Object.create shim only accepts one parameter.");
            }
            F.prototype = o;
            return new F();
        };
    }();
    function ParsingError(errorData, message) {
        this.name = "ParsingError";
        this.code = errorData.code;
        this.message = message || errorData.message;
    }
    ParsingError.prototype = _objCreate(Error.prototype);
    ParsingError.prototype.constructor = ParsingError;
    ParsingError.Errors = {
        BadSignature: {
            code: 0,
            message: "Malformed WebVTT signature."
        },
        BadTimeStamp: {
            code: 1,
            message: "Malformed time stamp."
        }
    };
    function parseTimeStamp(input) {
        function computeSeconds(h, m, s, f) {
            return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1e3;
        }
        var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
        if (!m) {
            return null;
        }
        if (m[3]) {
            return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
        } else if (m[1] > 59) {
            return computeSeconds(m[1], m[2], 0, m[4]);
        } else {
            return computeSeconds(0, m[1], m[2], m[4]);
        }
    }
    function Settings() {
        this.values = _objCreate(null);
    }
    Settings.prototype = {
        set: function(k, v) {
            if (!this.get(k) && v !== "") {
                this.values[k] = v;
            }
        },
        get: function(k, dflt, defaultKey) {
            if (defaultKey) {
                return this.has(k) ? this.values[k] : dflt[defaultKey];
            }
            return this.has(k) ? this.values[k] : dflt;
        },
        has: function(k) {
            return k in this.values;
        },
        alt: function(k, v, a) {
            for (var n = 0; n < a.length; ++n) {
                if (v === a[n]) {
                    this.set(k, v);
                    break;
                }
            }
        },
        integer: function(k, v) {
            if (/^-?\d+$/.test(v)) {
                this.set(k, parseInt(v, 10));
            }
        },
        percent: function(k, v) {
            var m;
            if (m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/)) {
                v = parseFloat(v);
                if (v >= 0 && v <= 100) {
                    this.set(k, v);
                    return true;
                }
            }
            return false;
        }
    };
    function parseOptions(input, callback, keyValueDelim, groupDelim) {
        var groups = groupDelim ? input.split(groupDelim) : [ input ];
        for (var i in groups) {
            if (typeof groups[i] !== "string") {
                continue;
            }
            var kv = groups[i].split(keyValueDelim);
            if (kv.length !== 2) {
                continue;
            }
            var k = kv[0];
            var v = kv[1];
            callback(k, v);
        }
    }
    function parseCue(input, cue, regionList) {
        var oInput = input;
        function consumeTimeStamp() {
            var ts = parseTimeStamp(input);
            if (ts === null) {
                throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed timestamp: " + oInput);
            }
            input = input.replace(/^[^\sa-zA-Z-]+/, "");
            return ts;
        }
        function consumeCueSettings(input, cue) {
            var settings = new Settings();
            parseOptions(input, function(k, v) {
                switch (k) {
                  case "region":
                    for (var i = regionList.length - 1; i >= 0; i--) {
                        if (regionList[i].id === v) {
                            settings.set(k, regionList[i].region);
                            break;
                        }
                    }
                    break;

                  case "vertical":
                    settings.alt(k, v, [ "rl", "lr" ]);
                    break;

                  case "line":
                    var vals = v.split(","), vals0 = vals[0];
                    settings.integer(k, vals0);
                    settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
                    settings.alt(k, vals0, [ "auto" ]);
                    if (vals.length === 2) {
                        settings.alt("lineAlign", vals[1], [ "start", "middle", "end" ]);
                    }
                    break;

                  case "position":
                    vals = v.split(",");
                    settings.percent(k, vals[0]);
                    if (vals.length === 2) {
                        settings.alt("positionAlign", vals[1], [ "start", "middle", "end" ]);
                    }
                    break;

                  case "size":
                    settings.percent(k, v);
                    break;

                  case "align":
                    settings.alt(k, v, [ "start", "middle", "end", "left", "right" ]);
                    break;
                }
            }, /:/, /\s/);
            cue.region = settings.get("region", null);
            cue.vertical = settings.get("vertical", "");
            cue.line = settings.get("line", "auto");
            cue.lineAlign = settings.get("lineAlign", "start");
            cue.snapToLines = settings.get("snapToLines", true);
            cue.size = settings.get("size", 100);
            cue.align = settings.get("align", "middle");
            cue.position = settings.get("position", {
                start: 0,
                left: 0,
                middle: 50,
                end: 100,
                right: 100
            }, cue.align);
            cue.positionAlign = settings.get("positionAlign", {
                start: "start",
                left: "start",
                middle: "middle",
                end: "end",
                right: "end"
            }, cue.align);
        }
        function skipWhitespace() {
            input = input.replace(/^\s+/, "");
        }
        skipWhitespace();
        cue.startTime = consumeTimeStamp();
        skipWhitespace();
        if (input.substr(0, 3) !== "-->") {
            throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + oInput);
        }
        input = input.substr(3);
        skipWhitespace();
        cue.endTime = consumeTimeStamp();
        skipWhitespace();
        consumeCueSettings(input, cue);
    }
    var ESCAPE = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&lrm;": "‎",
        "&rlm;": "‏",
        "&nbsp;": " "
    };
    var TAG_NAME = {
        c: "span",
        i: "i",
        b: "b",
        u: "u",
        ruby: "ruby",
        rt: "rt",
        v: "span",
        lang: "span"
    };
    var TAG_ANNOTATION = {
        v: "title",
        lang: "lang"
    };
    var NEEDS_PARENT = {
        rt: "ruby"
    };
    function parseContent(window, input) {
        function nextToken() {
            if (!input) {
                return null;
            }
            function consume(result) {
                input = input.substr(result.length);
                return result;
            }
            var m = input.match(/^([^<]*)(<[^>]+>?)?/);
            return consume(m[1] ? m[1] : m[2]);
        }
        function unescape1(e) {
            return ESCAPE[e];
        }
        function unescape(s) {
            while (m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/)) {
                s = s.replace(m[0], unescape1);
            }
            return s;
        }
        function shouldAdd(current, element) {
            return !NEEDS_PARENT[element.localName] || NEEDS_PARENT[element.localName] === current.localName;
        }
        function createElement(type, annotation) {
            var tagName = TAG_NAME[type];
            if (!tagName) {
                return null;
            }
            var element = window.document.createElement(tagName);
            element.localName = tagName;
            var name = TAG_ANNOTATION[type];
            if (name && annotation) {
                element[name] = annotation.trim();
            }
            return element;
        }
        var rootDiv = window.document.createElement("div"), current = rootDiv, t, tagStack = [];
        while ((t = nextToken()) !== null) {
            if (t[0] === "<") {
                if (t[1] === "/") {
                    if (tagStack.length && tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
                        tagStack.pop();
                        current = current.parentNode;
                    }
                    continue;
                }
                var ts = parseTimeStamp(t.substr(1, t.length - 2));
                var node;
                if (ts) {
                    node = window.document.createProcessingInstruction("timestamp", ts);
                    current.appendChild(node);
                    continue;
                }
                var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
                if (!m) {
                    continue;
                }
                node = createElement(m[1], m[3]);
                if (!node) {
                    continue;
                }
                if (!shouldAdd(current, node)) {
                    continue;
                }
                if (m[2]) {
                    node.className = m[2].substr(1).replace(".", " ");
                }
                tagStack.push(m[1]);
                current.appendChild(node);
                current = node;
                continue;
            }
            current.appendChild(window.document.createTextNode(unescape(t)));
        }
        return rootDiv;
    }
    var strongRTLChars = [ 1470, 1472, 1475, 1478, 1488, 1489, 1490, 1491, 1492, 1493, 1494, 1495, 1496, 1497, 1498, 1499, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510, 1511, 1512, 1513, 1514, 1520, 1521, 1522, 1523, 1524, 1544, 1547, 1549, 1563, 1566, 1567, 1568, 1569, 1570, 1571, 1572, 1573, 1574, 1575, 1576, 1577, 1578, 1579, 1580, 1581, 1582, 1583, 1584, 1585, 1586, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1595, 1596, 1597, 1598, 1599, 1600, 1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610, 1645, 1646, 1647, 1649, 1650, 1651, 1652, 1653, 1654, 1655, 1656, 1657, 1658, 1659, 1660, 1661, 1662, 1663, 1664, 1665, 1666, 1667, 1668, 1669, 1670, 1671, 1672, 1673, 1674, 1675, 1676, 1677, 1678, 1679, 1680, 1681, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1689, 1690, 1691, 1692, 1693, 1694, 1695, 1696, 1697, 1698, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1717, 1718, 1719, 1720, 1721, 1722, 1723, 1724, 1725, 1726, 1727, 1728, 1729, 1730, 1731, 1732, 1733, 1734, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1745, 1746, 1747, 1748, 1749, 1765, 1766, 1774, 1775, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1807, 1808, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1878, 1879, 1880, 1881, 1882, 1883, 1884, 1885, 1886, 1887, 1888, 1889, 1890, 1891, 1892, 1893, 1894, 1895, 1896, 1897, 1898, 1899, 1900, 1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910, 1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1969, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2e3, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2036, 2037, 2042, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2074, 2084, 2088, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109, 2110, 2112, 2113, 2114, 2115, 2116, 2117, 2118, 2119, 2120, 2121, 2122, 2123, 2124, 2125, 2126, 2127, 2128, 2129, 2130, 2131, 2132, 2133, 2134, 2135, 2136, 2142, 2208, 2210, 2211, 2212, 2213, 2214, 2215, 2216, 2217, 2218, 2219, 2220, 8207, 64285, 64287, 64288, 64289, 64290, 64291, 64292, 64293, 64294, 64295, 64296, 64298, 64299, 64300, 64301, 64302, 64303, 64304, 64305, 64306, 64307, 64308, 64309, 64310, 64312, 64313, 64314, 64315, 64316, 64318, 64320, 64321, 64323, 64324, 64326, 64327, 64328, 64329, 64330, 64331, 64332, 64333, 64334, 64335, 64336, 64337, 64338, 64339, 64340, 64341, 64342, 64343, 64344, 64345, 64346, 64347, 64348, 64349, 64350, 64351, 64352, 64353, 64354, 64355, 64356, 64357, 64358, 64359, 64360, 64361, 64362, 64363, 64364, 64365, 64366, 64367, 64368, 64369, 64370, 64371, 64372, 64373, 64374, 64375, 64376, 64377, 64378, 64379, 64380, 64381, 64382, 64383, 64384, 64385, 64386, 64387, 64388, 64389, 64390, 64391, 64392, 64393, 64394, 64395, 64396, 64397, 64398, 64399, 64400, 64401, 64402, 64403, 64404, 64405, 64406, 64407, 64408, 64409, 64410, 64411, 64412, 64413, 64414, 64415, 64416, 64417, 64418, 64419, 64420, 64421, 64422, 64423, 64424, 64425, 64426, 64427, 64428, 64429, 64430, 64431, 64432, 64433, 64434, 64435, 64436, 64437, 64438, 64439, 64440, 64441, 64442, 64443, 64444, 64445, 64446, 64447, 64448, 64449, 64467, 64468, 64469, 64470, 64471, 64472, 64473, 64474, 64475, 64476, 64477, 64478, 64479, 64480, 64481, 64482, 64483, 64484, 64485, 64486, 64487, 64488, 64489, 64490, 64491, 64492, 64493, 64494, 64495, 64496, 64497, 64498, 64499, 64500, 64501, 64502, 64503, 64504, 64505, 64506, 64507, 64508, 64509, 64510, 64511, 64512, 64513, 64514, 64515, 64516, 64517, 64518, 64519, 64520, 64521, 64522, 64523, 64524, 64525, 64526, 64527, 64528, 64529, 64530, 64531, 64532, 64533, 64534, 64535, 64536, 64537, 64538, 64539, 64540, 64541, 64542, 64543, 64544, 64545, 64546, 64547, 64548, 64549, 64550, 64551, 64552, 64553, 64554, 64555, 64556, 64557, 64558, 64559, 64560, 64561, 64562, 64563, 64564, 64565, 64566, 64567, 64568, 64569, 64570, 64571, 64572, 64573, 64574, 64575, 64576, 64577, 64578, 64579, 64580, 64581, 64582, 64583, 64584, 64585, 64586, 64587, 64588, 64589, 64590, 64591, 64592, 64593, 64594, 64595, 64596, 64597, 64598, 64599, 64600, 64601, 64602, 64603, 64604, 64605, 64606, 64607, 64608, 64609, 64610, 64611, 64612, 64613, 64614, 64615, 64616, 64617, 64618, 64619, 64620, 64621, 64622, 64623, 64624, 64625, 64626, 64627, 64628, 64629, 64630, 64631, 64632, 64633, 64634, 64635, 64636, 64637, 64638, 64639, 64640, 64641, 64642, 64643, 64644, 64645, 64646, 64647, 64648, 64649, 64650, 64651, 64652, 64653, 64654, 64655, 64656, 64657, 64658, 64659, 64660, 64661, 64662, 64663, 64664, 64665, 64666, 64667, 64668, 64669, 64670, 64671, 64672, 64673, 64674, 64675, 64676, 64677, 64678, 64679, 64680, 64681, 64682, 64683, 64684, 64685, 64686, 64687, 64688, 64689, 64690, 64691, 64692, 64693, 64694, 64695, 64696, 64697, 64698, 64699, 64700, 64701, 64702, 64703, 64704, 64705, 64706, 64707, 64708, 64709, 64710, 64711, 64712, 64713, 64714, 64715, 64716, 64717, 64718, 64719, 64720, 64721, 64722, 64723, 64724, 64725, 64726, 64727, 64728, 64729, 64730, 64731, 64732, 64733, 64734, 64735, 64736, 64737, 64738, 64739, 64740, 64741, 64742, 64743, 64744, 64745, 64746, 64747, 64748, 64749, 64750, 64751, 64752, 64753, 64754, 64755, 64756, 64757, 64758, 64759, 64760, 64761, 64762, 64763, 64764, 64765, 64766, 64767, 64768, 64769, 64770, 64771, 64772, 64773, 64774, 64775, 64776, 64777, 64778, 64779, 64780, 64781, 64782, 64783, 64784, 64785, 64786, 64787, 64788, 64789, 64790, 64791, 64792, 64793, 64794, 64795, 64796, 64797, 64798, 64799, 64800, 64801, 64802, 64803, 64804, 64805, 64806, 64807, 64808, 64809, 64810, 64811, 64812, 64813, 64814, 64815, 64816, 64817, 64818, 64819, 64820, 64821, 64822, 64823, 64824, 64825, 64826, 64827, 64828, 64829, 64848, 64849, 64850, 64851, 64852, 64853, 64854, 64855, 64856, 64857, 64858, 64859, 64860, 64861, 64862, 64863, 64864, 64865, 64866, 64867, 64868, 64869, 64870, 64871, 64872, 64873, 64874, 64875, 64876, 64877, 64878, 64879, 64880, 64881, 64882, 64883, 64884, 64885, 64886, 64887, 64888, 64889, 64890, 64891, 64892, 64893, 64894, 64895, 64896, 64897, 64898, 64899, 64900, 64901, 64902, 64903, 64904, 64905, 64906, 64907, 64908, 64909, 64910, 64911, 64914, 64915, 64916, 64917, 64918, 64919, 64920, 64921, 64922, 64923, 64924, 64925, 64926, 64927, 64928, 64929, 64930, 64931, 64932, 64933, 64934, 64935, 64936, 64937, 64938, 64939, 64940, 64941, 64942, 64943, 64944, 64945, 64946, 64947, 64948, 64949, 64950, 64951, 64952, 64953, 64954, 64955, 64956, 64957, 64958, 64959, 64960, 64961, 64962, 64963, 64964, 64965, 64966, 64967, 65008, 65009, 65010, 65011, 65012, 65013, 65014, 65015, 65016, 65017, 65018, 65019, 65020, 65136, 65137, 65138, 65139, 65140, 65142, 65143, 65144, 65145, 65146, 65147, 65148, 65149, 65150, 65151, 65152, 65153, 65154, 65155, 65156, 65157, 65158, 65159, 65160, 65161, 65162, 65163, 65164, 65165, 65166, 65167, 65168, 65169, 65170, 65171, 65172, 65173, 65174, 65175, 65176, 65177, 65178, 65179, 65180, 65181, 65182, 65183, 65184, 65185, 65186, 65187, 65188, 65189, 65190, 65191, 65192, 65193, 65194, 65195, 65196, 65197, 65198, 65199, 65200, 65201, 65202, 65203, 65204, 65205, 65206, 65207, 65208, 65209, 65210, 65211, 65212, 65213, 65214, 65215, 65216, 65217, 65218, 65219, 65220, 65221, 65222, 65223, 65224, 65225, 65226, 65227, 65228, 65229, 65230, 65231, 65232, 65233, 65234, 65235, 65236, 65237, 65238, 65239, 65240, 65241, 65242, 65243, 65244, 65245, 65246, 65247, 65248, 65249, 65250, 65251, 65252, 65253, 65254, 65255, 65256, 65257, 65258, 65259, 65260, 65261, 65262, 65263, 65264, 65265, 65266, 65267, 65268, 65269, 65270, 65271, 65272, 65273, 65274, 65275, 65276, 67584, 67585, 67586, 67587, 67588, 67589, 67592, 67594, 67595, 67596, 67597, 67598, 67599, 67600, 67601, 67602, 67603, 67604, 67605, 67606, 67607, 67608, 67609, 67610, 67611, 67612, 67613, 67614, 67615, 67616, 67617, 67618, 67619, 67620, 67621, 67622, 67623, 67624, 67625, 67626, 67627, 67628, 67629, 67630, 67631, 67632, 67633, 67634, 67635, 67636, 67637, 67639, 67640, 67644, 67647, 67648, 67649, 67650, 67651, 67652, 67653, 67654, 67655, 67656, 67657, 67658, 67659, 67660, 67661, 67662, 67663, 67664, 67665, 67666, 67667, 67668, 67669, 67671, 67672, 67673, 67674, 67675, 67676, 67677, 67678, 67679, 67840, 67841, 67842, 67843, 67844, 67845, 67846, 67847, 67848, 67849, 67850, 67851, 67852, 67853, 67854, 67855, 67856, 67857, 67858, 67859, 67860, 67861, 67862, 67863, 67864, 67865, 67866, 67867, 67872, 67873, 67874, 67875, 67876, 67877, 67878, 67879, 67880, 67881, 67882, 67883, 67884, 67885, 67886, 67887, 67888, 67889, 67890, 67891, 67892, 67893, 67894, 67895, 67896, 67897, 67903, 67968, 67969, 67970, 67971, 67972, 67973, 67974, 67975, 67976, 67977, 67978, 67979, 67980, 67981, 67982, 67983, 67984, 67985, 67986, 67987, 67988, 67989, 67990, 67991, 67992, 67993, 67994, 67995, 67996, 67997, 67998, 67999, 68e3, 68001, 68002, 68003, 68004, 68005, 68006, 68007, 68008, 68009, 68010, 68011, 68012, 68013, 68014, 68015, 68016, 68017, 68018, 68019, 68020, 68021, 68022, 68023, 68030, 68031, 68096, 68112, 68113, 68114, 68115, 68117, 68118, 68119, 68121, 68122, 68123, 68124, 68125, 68126, 68127, 68128, 68129, 68130, 68131, 68132, 68133, 68134, 68135, 68136, 68137, 68138, 68139, 68140, 68141, 68142, 68143, 68144, 68145, 68146, 68147, 68160, 68161, 68162, 68163, 68164, 68165, 68166, 68167, 68176, 68177, 68178, 68179, 68180, 68181, 68182, 68183, 68184, 68192, 68193, 68194, 68195, 68196, 68197, 68198, 68199, 68200, 68201, 68202, 68203, 68204, 68205, 68206, 68207, 68208, 68209, 68210, 68211, 68212, 68213, 68214, 68215, 68216, 68217, 68218, 68219, 68220, 68221, 68222, 68223, 68352, 68353, 68354, 68355, 68356, 68357, 68358, 68359, 68360, 68361, 68362, 68363, 68364, 68365, 68366, 68367, 68368, 68369, 68370, 68371, 68372, 68373, 68374, 68375, 68376, 68377, 68378, 68379, 68380, 68381, 68382, 68383, 68384, 68385, 68386, 68387, 68388, 68389, 68390, 68391, 68392, 68393, 68394, 68395, 68396, 68397, 68398, 68399, 68400, 68401, 68402, 68403, 68404, 68405, 68416, 68417, 68418, 68419, 68420, 68421, 68422, 68423, 68424, 68425, 68426, 68427, 68428, 68429, 68430, 68431, 68432, 68433, 68434, 68435, 68436, 68437, 68440, 68441, 68442, 68443, 68444, 68445, 68446, 68447, 68448, 68449, 68450, 68451, 68452, 68453, 68454, 68455, 68456, 68457, 68458, 68459, 68460, 68461, 68462, 68463, 68464, 68465, 68466, 68472, 68473, 68474, 68475, 68476, 68477, 68478, 68479, 68608, 68609, 68610, 68611, 68612, 68613, 68614, 68615, 68616, 68617, 68618, 68619, 68620, 68621, 68622, 68623, 68624, 68625, 68626, 68627, 68628, 68629, 68630, 68631, 68632, 68633, 68634, 68635, 68636, 68637, 68638, 68639, 68640, 68641, 68642, 68643, 68644, 68645, 68646, 68647, 68648, 68649, 68650, 68651, 68652, 68653, 68654, 68655, 68656, 68657, 68658, 68659, 68660, 68661, 68662, 68663, 68664, 68665, 68666, 68667, 68668, 68669, 68670, 68671, 68672, 68673, 68674, 68675, 68676, 68677, 68678, 68679, 68680, 126464, 126465, 126466, 126467, 126469, 126470, 126471, 126472, 126473, 126474, 126475, 126476, 126477, 126478, 126479, 126480, 126481, 126482, 126483, 126484, 126485, 126486, 126487, 126488, 126489, 126490, 126491, 126492, 126493, 126494, 126495, 126497, 126498, 126500, 126503, 126505, 126506, 126507, 126508, 126509, 126510, 126511, 126512, 126513, 126514, 126516, 126517, 126518, 126519, 126521, 126523, 126530, 126535, 126537, 126539, 126541, 126542, 126543, 126545, 126546, 126548, 126551, 126553, 126555, 126557, 126559, 126561, 126562, 126564, 126567, 126568, 126569, 126570, 126572, 126573, 126574, 126575, 126576, 126577, 126578, 126580, 126581, 126582, 126583, 126585, 126586, 126587, 126588, 126590, 126592, 126593, 126594, 126595, 126596, 126597, 126598, 126599, 126600, 126601, 126603, 126604, 126605, 126606, 126607, 126608, 126609, 126610, 126611, 126612, 126613, 126614, 126615, 126616, 126617, 126618, 126619, 126625, 126626, 126627, 126629, 126630, 126631, 126632, 126633, 126635, 126636, 126637, 126638, 126639, 126640, 126641, 126642, 126643, 126644, 126645, 126646, 126647, 126648, 126649, 126650, 126651, 1114109 ];
    function determineBidi(cueDiv) {
        var nodeStack = [], text = "", charCode;
        if (!cueDiv || !cueDiv.childNodes) {
            return "ltr";
        }
        function pushNodes(nodeStack, node) {
            for (var i = node.childNodes.length - 1; i >= 0; i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
        function nextTextNode(nodeStack) {
            if (!nodeStack || !nodeStack.length) {
                return null;
            }
            var node = nodeStack.pop(), text = node.textContent || node.innerText;
            if (text) {
                var m = text.match(/^.*(\n|\r)/);
                if (m) {
                    nodeStack.length = 0;
                    return m[0];
                }
                return text;
            }
            if (node.tagName === "ruby") {
                return nextTextNode(nodeStack);
            }
            if (node.childNodes) {
                pushNodes(nodeStack, node);
                return nextTextNode(nodeStack);
            }
        }
        pushNodes(nodeStack, cueDiv);
        while (text = nextTextNode(nodeStack)) {
            for (var i = 0; i < text.length; i++) {
                charCode = text.charCodeAt(i);
                for (var j = 0; j < strongRTLChars.length; j++) {
                    if (strongRTLChars[j] === charCode) {
                        return "rtl";
                    }
                }
            }
        }
        return "ltr";
    }
    function computeLinePos(cue) {
        if (typeof cue.line === "number" && (cue.snapToLines || cue.line >= 0 && cue.line <= 100)) {
            return cue.line;
        }
        if (!cue.track || !cue.track.textTrackList || !cue.track.textTrackList.mediaElement) {
            return -1;
        }
        var track = cue.track, trackList = track.textTrackList, count = 0;
        for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
            if (trackList[i].mode === "showing") {
                count++;
            }
        }
        return ++count * -1;
    }
    function StyleBox() {}
    StyleBox.prototype.applyStyles = function(styles, div) {
        div = div || this.div;
        for (var prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                div.style[prop] = styles[prop];
            }
        }
    };
    StyleBox.prototype.formatStyle = function(val, unit) {
        return val === 0 ? 0 : val + unit;
    };
    function CueStyleBox(window, cue, styleOptions) {
        var isIE8 = /MSIE\s8\.0/.test(navigator.userAgent);
        var color = "rgba(255, 255, 255, 1)";
        var backgroundColor = "rgba(0, 0, 0, 0.8)";
        if (isIE8) {
            color = "rgb(255, 255, 255)";
            backgroundColor = "rgb(0, 0, 0)";
        }
        StyleBox.call(this);
        this.cue = cue;
        this.cueDiv = parseContent(window, cue.text);
        var styles = {
            color: color,
            backgroundColor: backgroundColor,
            position: "relative",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "inline"
        };
        if (!isIE8) {
            styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl";
            styles.unicodeBidi = "plaintext";
        }
        this.applyStyles(styles, this.cueDiv);
        this.div = window.document.createElement("div");
        styles = {
            textAlign: cue.align === "middle" ? "center" : cue.align,
            font: styleOptions.font,
            whiteSpace: "pre-line",
            position: "absolute"
        };
        if (!isIE8) {
            styles.direction = determineBidi(this.cueDiv);
            styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext";
        }
        this.applyStyles(styles);
        this.div.appendChild(this.cueDiv);
        var textPos = 0;
        switch (cue.positionAlign) {
          case "start":
            textPos = cue.position;
            break;

          case "middle":
            textPos = cue.position - cue.size / 2;
            break;

          case "end":
            textPos = cue.position - cue.size;
            break;
        }
        if (cue.vertical === "") {
            this.applyStyles({
                left: this.formatStyle(textPos, "%"),
                width: this.formatStyle(cue.size, "%")
            });
        } else {
            this.applyStyles({
                top: this.formatStyle(textPos, "%"),
                height: this.formatStyle(cue.size, "%")
            });
        }
        this.move = function(box) {
            this.applyStyles({
                top: this.formatStyle(box.top, "px"),
                bottom: this.formatStyle(box.bottom, "px"),
                left: this.formatStyle(box.left, "px"),
                right: this.formatStyle(box.right, "px"),
                height: this.formatStyle(box.height, "px"),
                width: this.formatStyle(box.width, "px")
            });
        };
    }
    CueStyleBox.prototype = _objCreate(StyleBox.prototype);
    CueStyleBox.prototype.constructor = CueStyleBox;
    function BoxPosition(obj) {
        var isIE8 = /MSIE\s8\.0/.test(navigator.userAgent);
        var lh, height, width, top;
        if (obj.div) {
            height = obj.div.offsetHeight;
            width = obj.div.offsetWidth;
            top = obj.div.offsetTop;
            var rects = (rects = obj.div.childNodes) && (rects = rects[0]) && rects.getClientRects && rects.getClientRects();
            obj = obj.div.getBoundingClientRect();
            lh = rects ? Math.max(rects[0] && rects[0].height || 0, obj.height / rects.length) : 0;
        }
        this.left = obj.left;
        this.right = obj.right;
        this.top = obj.top || top;
        this.height = obj.height || height;
        this.bottom = obj.bottom || top + (obj.height || height);
        this.width = obj.width || width;
        this.lineHeight = lh !== undefined ? lh : obj.lineHeight;
        if (isIE8 && !this.lineHeight) {
            this.lineHeight = 13;
        }
    }
    BoxPosition.prototype.move = function(axis, toMove) {
        toMove = toMove !== undefined ? toMove : this.lineHeight;
        switch (axis) {
          case "+x":
            this.left += toMove;
            this.right += toMove;
            break;

          case "-x":
            this.left -= toMove;
            this.right -= toMove;
            break;

          case "+y":
            this.top += toMove;
            this.bottom += toMove;
            break;

          case "-y":
            this.top -= toMove;
            this.bottom -= toMove;
            break;
        }
    };
    BoxPosition.prototype.overlaps = function(b2) {
        return this.left < b2.right && this.right > b2.left && this.top < b2.bottom && this.bottom > b2.top;
    };
    BoxPosition.prototype.overlapsAny = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (this.overlaps(boxes[i])) {
                return true;
            }
        }
        return false;
    };
    BoxPosition.prototype.within = function(container) {
        return this.top >= container.top && this.bottom <= container.bottom && this.left >= container.left && this.right <= container.right;
    };
    BoxPosition.prototype.overlapsOppositeAxis = function(container, axis) {
        switch (axis) {
          case "+x":
            return this.left < container.left;

          case "-x":
            return this.right > container.right;

          case "+y":
            return this.top < container.top;

          case "-y":
            return this.bottom > container.bottom;
        }
    };
    BoxPosition.prototype.intersectPercentage = function(b2) {
        var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)), y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)), intersectArea = x * y;
        return intersectArea / (this.height * this.width);
    };
    BoxPosition.prototype.toCSSCompatValues = function(reference) {
        return {
            top: this.top - reference.top,
            bottom: reference.bottom - this.bottom,
            left: this.left - reference.left,
            right: reference.right - this.right,
            height: this.height,
            width: this.width
        };
    };
    BoxPosition.getSimpleBoxPosition = function(obj) {
        var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
        var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
        var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;
        obj = obj.div ? obj.div.getBoundingClientRect() : obj.tagName ? obj.getBoundingClientRect() : obj;
        var ret = {
            left: obj.left,
            right: obj.right,
            top: obj.top || top,
            height: obj.height || height,
            bottom: obj.bottom || top + (obj.height || height),
            width: obj.width || width
        };
        return ret;
    };
    function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {
        function findBestPosition(b, axis) {
            var bestPosition, specifiedPosition = new BoxPosition(b), percentage = 1;
            for (var i = 0; i < axis.length; i++) {
                while (b.overlapsOppositeAxis(containerBox, axis[i]) || b.within(containerBox) && b.overlapsAny(boxPositions)) {
                    b.move(axis[i]);
                }
                if (b.within(containerBox)) {
                    return b;
                }
                var p = b.intersectPercentage(containerBox);
                if (percentage > p) {
                    bestPosition = new BoxPosition(b);
                    percentage = p;
                }
                b = new BoxPosition(specifiedPosition);
            }
            return bestPosition || specifiedPosition;
        }
        var boxPosition = new BoxPosition(styleBox), cue = styleBox.cue, linePos = computeLinePos(cue), axis = [];
        if (cue.snapToLines) {
            var size;
            switch (cue.vertical) {
              case "":
                axis = [ "+y", "-y" ];
                size = "height";
                break;

              case "rl":
                axis = [ "+x", "-x" ];
                size = "width";
                break;

              case "lr":
                axis = [ "-x", "+x" ];
                size = "width";
                break;
            }
            var step = boxPosition.lineHeight, position = step * Math.round(linePos), maxPosition = containerBox[size] + step, initialAxis = axis[0];
            if (Math.abs(position) > maxPosition) {
                position = position < 0 ? -1 : 1;
                position *= Math.ceil(maxPosition / step) * step;
            }
            if (linePos < 0) {
                position += cue.vertical === "" ? containerBox.height : containerBox.width;
                axis = axis.reverse();
            }
            boxPosition.move(initialAxis, position);
        } else {
            var calculatedPercentage = boxPosition.lineHeight / containerBox.height * 100;
            switch (cue.lineAlign) {
              case "middle":
                linePos -= calculatedPercentage / 2;
                break;

              case "end":
                linePos -= calculatedPercentage;
                break;
            }
            switch (cue.vertical) {
              case "":
                styleBox.applyStyles({
                    top: styleBox.formatStyle(linePos, "%")
                });
                break;

              case "rl":
                styleBox.applyStyles({
                    left: styleBox.formatStyle(linePos, "%")
                });
                break;

              case "lr":
                styleBox.applyStyles({
                    right: styleBox.formatStyle(linePos, "%")
                });
                break;
            }
            axis = [ "+y", "-x", "+x", "-y" ];
            boxPosition = new BoxPosition(styleBox);
        }
        var bestPosition = findBestPosition(boxPosition, axis);
        styleBox.move(bestPosition.toCSSCompatValues(containerBox));
    }
    function WebVTT() {}
    WebVTT.StringDecoder = function() {
        return {
            decode: function(data) {
                if (!data) {
                    return "";
                }
                if (typeof data !== "string") {
                    throw new Error("Error - expected string data.");
                }
                return decodeURIComponent(encodeURIComponent(data));
            }
        };
    };
    WebVTT.convertCueToDOMTree = function(window, cuetext) {
        if (!window || !cuetext) {
            return null;
        }
        return parseContent(window, cuetext);
    };
    var FONT_SIZE_PERCENT = .05;
    var FONT_STYLE = "sans-serif";
    var CUE_BACKGROUND_PADDING = "1.5%";
    WebVTT.processCues = function(window, cues, overlay) {
        if (!window || !cues || !overlay) {
            return null;
        }
        while (overlay.firstChild) {
            overlay.removeChild(overlay.firstChild);
        }
        var paddedOverlay = window.document.createElement("div");
        paddedOverlay.style.position = "absolute";
        paddedOverlay.style.left = "0";
        paddedOverlay.style.right = "0";
        paddedOverlay.style.top = "0";
        paddedOverlay.style.bottom = "0";
        paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
        overlay.appendChild(paddedOverlay);
        function shouldCompute(cues) {
            for (var i = 0; i < cues.length; i++) {
                if (cues[i].hasBeenReset || !cues[i].displayState) {
                    return true;
                }
            }
            return false;
        }
        if (!shouldCompute(cues)) {
            for (var i = 0; i < cues.length; i++) {
                paddedOverlay.appendChild(cues[i].displayState);
            }
            return;
        }
        var boxPositions = [], containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay), fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
        var styleOptions = {
            font: fontSize + "px " + FONT_STYLE
        };
        (function() {
            var styleBox, cue;
            for (var i = 0; i < cues.length; i++) {
                cue = cues[i];
                styleBox = new CueStyleBox(window, cue, styleOptions);
                paddedOverlay.appendChild(styleBox.div);
                moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);
                cue.displayState = styleBox.div;
                boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
            }
        })();
    };
    WebVTT.Parser = function(window, vttjs, decoder) {
        if (!decoder) {
            decoder = vttjs;
            vttjs = {};
        }
        if (!vttjs) {
            vttjs = {};
        }
        this.window = window;
        this.vttjs = vttjs;
        this.state = "INITIAL";
        this.buffer = "";
        this.decoder = decoder || new TextDecoder("utf8");
        this.regionList = [];
    };
    WebVTT.Parser.prototype = {
        reportOrThrowError: function(e) {
            if (e instanceof ParsingError) {
                this.onparsingerror && this.onparsingerror(e);
            } else {
                throw e;
            }
        },
        parse: function(data) {
            var self = this;
            if (data) {
                self.buffer += self.decoder.decode(data, {
                    stream: true
                });
            }
            function collectNextLine() {
                var buffer = self.buffer;
                var pos = 0;
                while (pos < buffer.length && buffer[pos] !== "\r" && buffer[pos] !== "\n") {
                    ++pos;
                }
                var line = buffer.substr(0, pos);
                if (buffer[pos] === "\r") {
                    ++pos;
                }
                if (buffer[pos] === "\n") {
                    ++pos;
                }
                self.buffer = buffer.substr(pos);
                return line;
            }
            function parseRegion(input) {
                var settings = new Settings();
                parseOptions(input, function(k, v) {
                    switch (k) {
                      case "id":
                        settings.set(k, v);
                        break;

                      case "width":
                        settings.percent(k, v);
                        break;

                      case "lines":
                        settings.integer(k, v);
                        break;

                      case "regionanchor":
                      case "viewportanchor":
                        var xy = v.split(",");
                        if (xy.length !== 2) {
                            break;
                        }
                        var anchor = new Settings();
                        anchor.percent("x", xy[0]);
                        anchor.percent("y", xy[1]);
                        if (!anchor.has("x") || !anchor.has("y")) {
                            break;
                        }
                        settings.set(k + "X", anchor.get("x"));
                        settings.set(k + "Y", anchor.get("y"));
                        break;

                      case "scroll":
                        settings.alt(k, v, [ "up" ]);
                        break;
                    }
                }, /=/, /\s/);
                if (settings.has("id")) {
                    var region = new (self.vttjs.VTTRegion || self.window.VTTRegion)();
                    region.width = settings.get("width", 100);
                    region.lines = settings.get("lines", 3);
                    region.regionAnchorX = settings.get("regionanchorX", 0);
                    region.regionAnchorY = settings.get("regionanchorY", 100);
                    region.viewportAnchorX = settings.get("viewportanchorX", 0);
                    region.viewportAnchorY = settings.get("viewportanchorY", 100);
                    region.scroll = settings.get("scroll", "");
                    self.onregion && self.onregion(region);
                    self.regionList.push({
                        id: settings.get("id"),
                        region: region
                    });
                }
            }
            function parseHeader(input) {
                parseOptions(input, function(k, v) {
                    switch (k) {
                      case "Region":
                        parseRegion(v);
                        break;
                    }
                }, /:/);
            }
            try {
                var line;
                if (self.state === "INITIAL") {
                    if (!/\r\n|\n/.test(self.buffer)) {
                        return this;
                    }
                    line = collectNextLine();
                    var m = line.match(/^WEBVTT([ \t].*)?$/);
                    if (!m || !m[0]) {
                        throw new ParsingError(ParsingError.Errors.BadSignature);
                    }
                    self.state = "HEADER";
                }
                var alreadyCollectedLine = false;
                while (self.buffer) {
                    if (!/\r\n|\n/.test(self.buffer)) {
                        return this;
                    }
                    if (!alreadyCollectedLine) {
                        line = collectNextLine();
                    } else {
                        alreadyCollectedLine = false;
                    }
                    switch (self.state) {
                      case "HEADER":
                        if (/:/.test(line)) {
                            parseHeader(line);
                        } else if (!line) {
                            self.state = "ID";
                        }
                        continue;

                      case "NOTE":
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;

                      case "ID":
                        if (/^NOTE($|[ \t])/.test(line)) {
                            self.state = "NOTE";
                            break;
                        }
                        if (!line) {
                            continue;
                        }
                        self.cue = new (self.vttjs.VTTCue || self.window.VTTCue)(0, 0, "");
                        self.state = "CUE";
                        if (line.indexOf("-->") === -1) {
                            self.cue.id = line;
                            continue;
                        }

                      case "CUE":
                        try {
                            parseCue(line, self.cue, self.regionList);
                        } catch (e) {
                            self.reportOrThrowError(e);
                            self.cue = null;
                            self.state = "BADCUE";
                            continue;
                        }
                        self.state = "CUETEXT";
                        continue;

                      case "CUETEXT":
                        var hasSubstring = line.indexOf("-->") !== -1;
                        if (!line || hasSubstring && (alreadyCollectedLine = true)) {
                            self.oncue && self.oncue(self.cue);
                            self.cue = null;
                            self.state = "ID";
                            continue;
                        }
                        if (self.cue.text) {
                            self.cue.text += "\n";
                        }
                        self.cue.text += line;
                        continue;

                      case "BADCUE":
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;
                    }
                }
            } catch (e) {
                self.reportOrThrowError(e);
                if (self.state === "CUETEXT" && self.cue && self.oncue) {
                    self.oncue(self.cue);
                }
                self.cue = null;
                self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
            }
            return this;
        },
        flush: function() {
            var self = this;
            try {
                self.buffer += self.decoder.decode();
                if (self.cue || self.state === "HEADER") {
                    self.buffer += "\n\n";
                    self.parse();
                }
                if (self.state === "INITIAL") {
                    throw new ParsingError(ParsingError.Errors.BadSignature);
                }
            } catch (e) {
                self.reportOrThrowError(e);
            }
            self.onflush && self.onflush();
            return this;
        }
    };
    global.WebVTT = WebVTT;
})(this, this.vttjs || {});

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
                    this.player.currentTime(this.player.duration());
                    this.player.ended();
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
        this.player.requestFullScreen();
    };
    this.video_end_fullscreen = function() {
        this.player.cancelFullScreen();
    };
    this.on_player_ready = function(el, cb) {
        this.player = el;
        this.isloadeddata = false;
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
    this.on_player_fullscreenchange = function(ev) {
        vrt.logTime("on_player_fullscreenchange");
        this.log("player [VJSnew]: on_player_fullscreenchange");
        this._player_is_fullscreen = !this._player_is_fullscreen;
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
                preload: "none"
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
        var el = document.getElementById("videoDiv");
        if (el.requestFullScreen) {
            el.requestFullScreen();
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
                wmode: this.decideWmode()
            };
            var atts = {
                id: "ytPlayer"
            };
            swfobject.embedSWF("http://www.youtube.com/apiplayer?" + "version=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playerapiid=player1", "videoDivConvict", p_w, p_h, "11.1", null, null, params, atts);
            if (options.centered && options.centered === true) $("#ytPlayer").vrtCenter();
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

function Vrt(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {
    this.videoList = null;
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
    this.swfPath = "../swf/";
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
    this.researchReady = false;
    this.researchOutUrl = null;
    this.initMediaList = function(type, list) {
        if (!list) return;
        this.mediaCount = list.length;
        this.videoType = type;
        this.videoList = list;
        this.calculateListData();
        this.randomizeOrderList();
        this.log(type, "type");
        this.log(list, "list");
    };
    this.initialized = function(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {
        if (typeof type == "object") {
            var data = type;
            list = data.list ? data.list : {};
            streamUrl = data.streamUrl ? data.streamUrl : null;
            streamName = data.streamName ? data.streamName : null;
            apiDomain = data.apiDomain ? data.apiDomain : null;
            apiUser = data.apiUser ? data.apiUser : null;
            apiPassword = data.apiPassword ? data.apiPassword : null;
            options = type;
            type = data.type ? data.type : null;
            this.newInit = true;
        }
        if (options == undefined || options == null) options = {
            player: {}
        };
        if (options && options.fullscreen) {
            this.videoFullscreen = options.fullscreen && this.checkSafariMinVer(false, 6);
        } else {
            this.videoFullscreen = false;
        }
        options && options.skip != undefined ? this.canSkip = options.skip : this.canSkip = false;
        options && options.vrtID ? this.vrtID = options.vrtID : this.vrtID = "vrt";
        options && options.producerID ? this.producerID = options.producerID : this.producerID = "producer";
        options && options.producerWidth ? this.producerWidth = options.producerWidth : this.producerWidth = 320;
        options && options.producerHeight ? this.producerHeight = options.producerHeight : this.producerHeight = 240;
        options && options.debug != undefined ? this.debug = options.debug : this.debug = false;
        options && options.debugEvt != undefined ? this.debugEvt = options.debugEvt : this.debugEvt = false;
        options && options.debugTime != undefined ? this.debugTime = options.debugTime : this.debugTime = false;
        options && options.debugChrono != undefined ? this.debugChrono = options.debugChrono : this.debugChrono = false;
        options && options.debugChronoHtml != undefined ? this.debugChronoHtml = options.debugChronoHtml : this.debugChronoHtml = false;
        options && options.debugImportant != undefined ? this.debugImportant = options.debugImportant : this.debugImportant = false;
        options && options.debugVImportant != undefined ? this.debugVImportant = options.debugVImportant : this.debugVImportant = false;
        options && options.producerStreamWidth ? this.producerStreamWidth = options.producerStreamWidth : this.producerStreamWidth = 640;
        options && options.producerStreamHeight ? this.producerStreamHeight = options.producerStreamHeight : this.producerStreamHeight = 480;
        options && options.avgPreLoadTime ? this.avgPreLoadTime = options.avgPreLoadTime : this.avgPreLoadTime = 0;
        options && options.recorderCenter != undefined ? this.recorderCenter = options.recorderCenter : this.recorderCenter = true;
        options && options.randomOrder != undefined ? this.randomOrder = options.randomOrder : this.randomOrder = false;
        options && options.apiHttps !== undefined ? this.apiHttps = options.apiHttps : this.apiHttps = true;
        options && options.continuosPlay !== undefined ? this.continuosPlay = options.continuosPlay : this.continuosPlay = false;
        options && options.swfPath != undefined ? this.swfPath = options.swfPath : this.swfPath = "../swf/";
        options && options.timedOverPlayToEnd != undefined ? this.timedOverPlayToEnd = options.timedOverPlayToEnd : this.timedOverPlayToEnd = false;
        this.options = options;
        if (options.player == undefined || options.player == null) options.player = {};
        options && options.playerCentered != undefined ? this.options.player.centered = options.playerCentered : this.options.player.centered = true;
        options && options.playerWidth != undefined ? this.options.player.width = options.playerWidth : this.options.player.Width = 640;
        options && options.playerHeight != undefined ? this.options.player.height = options.playerHeight : this.options.player.height = 400;
        options && options.apiSandbox != undefined ? this.options.apiSandbox = options.apiSandbox : this.options.apiSandbox = false;
        options && options.responseAtStart != undefined ? this.responseAtStart = options.responseAtStart : this.options.responseAtStart = false;
        if (this.newInit) {
            this.responseAtStart = options.responseAtStart = true;
        }
        options && options.engineType != undefined ? this.options.engineType = options.engineType : this.options.engineType = "kanako";
        options && options.respondentCustomDataString != undefined ? this.options.respondentCustomDataString = options.respondentCustomDataString : this.options.respondentCustomDataString = {};
        options && options.respondentCustomData != undefined ? this.options.respondentCustomData = options.respondentCustomData : this.options.respondentCustomData = {};
        options && options.respondentName != undefined ? this.options.respondentName = options.respondentName : this.options.respondentName = "";
        options && options.apiClientOnly != undefined ? this.options.apiClientOnly = options.apiClientOnly : this.options.apiClientOnly = false;
        this.producerStreamUrl = streamUrl;
        this.producerStreamName = this.clearname(streamName);
        this.initMediaList(type, list);
        this.apiDomain = apiDomain;
        this.apiUsername = apiUser;
        this.apiPassword = apiPassword;
        this.researchId = options.researchId;
        this.researchToken = options.researchToken;
        this.appToken = options.appToken;
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
        var html = " <div id='vrtWrapper' class='vrtWrap' style='" + this.options.mainStyle + "'> " + "<div id='vrtLoader'></div>" + "<div id='vrtFrameWr'></div>" + (this.options.htmlVideoPre ? this.options.htmlVideoPre : "") + "<div id='vrtVideoWrapper' class='vrtWrap' style='" + this.options.videoStyle + "'>                                                      " + "      <div id='vrtvideo' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='videoDiv' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='ytPlayer' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div class='clearfix'></div>                                                                     " + "</div>                                                                                               " + (this.options.htmlVideoPost ? this.options.htmlVideoPost : "") + (this.options.htmlRecorderPre ? this.options.htmlRecorderPre : "") + "       <div id='vrtProducer' class='vrtWrap " + this.options.htmlRecorderClass + "' style='" + this.options.recStyle + "'>                      " + "           <div id='producer'></div>                                                                   " + "           <div class='clearfix'></div>                                                                " + "       </div>                                                                                          " + (this.options.htmlRecorderPost ? this.options.htmlRecorderPost : "") + "<div id='vrtLogWrapper' class='vrtWrap'>                                                      " + "      <div id='vrtalert'></div>                                                                        " + "      <div id='vrt_timer_player'></div>                                                                       " + "      <div id='vrt_timer_recorder'></div>                                                                       " + "      <div class='clearfix'></div>                                                                     " + "</div>                                                                                               " + "</div>";
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
            }
            videojs.options.techOrder = [ "flash", "html5" ];
            if (browserName == "Chrome") {
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
        if (this.fullscreen_needed) this.videoEndFullscreen();
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
    };
    this.player_is_ready = function() {
        this.player_is_ready_after();
    };
    this.player_is_ready_after = function() {
        this.log(">>STEP player is ready aft");
        this.log("player_is_ready_after");
        this.player.video_play();
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
        var bver, isSafari = $.browser.safari && window.navigator.appVersion.indexOf("Chrome") < 0;
        if (isSafari && (!plat || window.navigator.platform.indexOf(plat) >= 0)) return (bver = /Version\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false; else return true;
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
            if (vrt.recorderCenter === true) $("#producer").vrtCenter();
            vrt.logTime("webpr ready");
            vrt.log("!!PRODUCER ready");
            vrt.log("===WEBP The producer is now ready");
            vrt.log("ready + producerConnStatus");
            vrt.popOverCe("pop_click_allow", "destroy");
            vrt.flash_allowed = true;
            this.setMirroredPreview(true);
            vrt.log("Is preview mirrored ? " + this.getMirroredPreview());
            this.setAudioStreamActive(false);
            vrt.log("Is audio streaming active ? " + this.getAudioStreamActive());
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
            this.once("camera-unmuted", function() {
                vrt.log("!!PRODUCER camera unmuted 1" + Date.now());
                vrt.log("camera unmuted", "producerConnStatus");
                vrt.log("===WEBP Camera is now available");
                vrt.popOverCe("pop_click_allow", "destroy");
                vrt.popOverCe("pop_center");
                $(window.vrt).trigger("producer_init_camera_ok");
            });
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
                vrt.log("===WEBP The camera is available, user already approved");
                $(window.vrt).trigger("producer_init_camera_ok");
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
                        if (vrt.options.respondentCustomData) {
                            vrt.ceclient.writeRespondentCustomData(vrt.respondentId, vrt.options.respondentCustomData);
                        }
                    });
                };
                if (vrt.options.researchToken) {
                    vrt.ceclient.loadResearch(vrt.options.researchToken, function(research) {
                        vrt.researchId = research.id;
                        vrt.researchTitle = research.title;
                        vrt.researchDesc = research.description;
                        vrt.customData = research.customData;
                        vrt.researchComplete = research.complete;
                        vrt.researchReady = research.ready;
                        vrt.researchOutUrl = research.outgoingUrl;
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

jQuery.fn.vrtCenter2 = function() {
    var w = $(window);
    console.log(this);
    console.log(w.width());
    console.log("(" + w.width() + " - " + this.outerWidth() + ") / 2) + " + w.scrollLeft() + ")");
    this.css({
        position: "absolute",
        left: Math.abs((w.width() - this.outerWidth()) / 2 + w.scrollLeft())
    });
    return this;
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