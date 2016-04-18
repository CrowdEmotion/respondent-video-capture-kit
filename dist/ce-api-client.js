/* Javascript client crowdemotion.co.uk 2016-4-18 10:21 */ var CryptoJS = CryptoJS || function(i, p) {
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
    this.editRespondentName = function(respondentId, data, callback) {
        javaRest.put("respondent/" + respondentId, '{"name" : "' + data + '"}', function(response) {
            if (callback) callback();
        }, function(jqXHR, textStatus) {
            if (callback) callback(jqXHR);
        }, true);
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
        var url = "media?research_id=" + researchId + "&sort=videoOrder";
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

javaRest.put = function(url, data, success, error, plain) {
    var dataput = plain ? data : JSON.stringify(data);
    var auth = javaRest.getAuthData("PUT", url);
    $.ajax({
        url: this.baseurl() + url,
        type: "PUT",
        contentType: "application/json",
        data: dataput,
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