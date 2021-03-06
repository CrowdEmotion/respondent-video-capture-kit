/* Playcorder crowdemotion.co.uk 2016-7-11 14:30 */ var WebProducer = function(modules) {
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
    var FlashProducer, HTML5Producer, api, e, error, message, platform;
    platform = __webpack_require__(2);
    window.FlashProducer = FlashProducer = __webpack_require__(4);
    HTML5Producer = null;
    try {
        HTML5Producer = __webpack_require__(5);
    } catch (error) {
        e = error;
        if (console && console.error) {
            message = "Can't use HTML5Producer -> " + e.message;
            console.error(message, e);
        }
    }
    api = {
        getPlatform: function() {
            return platform;
        },
        typeAutoDetect: function() {
            var major, ref;
            if (console && console.log) {
                console.log("platform", platform);
            }
            if (HTML5Producer === null) {
                return "flash";
            }
            major = platform.version.split(".")[0];
            major = parseInt(major);
            if (platform.name === "Node.js") {
                if (major >= 4) {
                    return "html5";
                }
            }
            if ((ref = platform.name) === "Chrome" || ref === "Chrome Mobile") {
                if (major >= 39) {
                    return "html5";
                }
            }
            if (platform.name.indexOf("Firefox") >= 0 || window.navigator.userAgent.indexOf("Firefox") >= 0) {
                major = platform.version.split(".")[0];
                major = parseInt(major);
                if (major >= 37) {
                    return "html5";
                }
            }
            return "flash";
        },
        webProducerClassGet: function(type) {
            var error1;
            type = type || api.typeAutoDetect();
            if (console && console.log) {
                console.log("WebProducer type", type);
            }
            try {
                if (type === "html5") {
                    return HTML5Producer;
                }
            } catch (error1) {
                e = error1;
            }
            return FlashProducer;
        }
    };
    module.exports = api;
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
                    name = "Microsoft Edge";
                    version = data[1];
                    layout = [ "Trident" ];
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
                    if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && name != "IE" && name != "Microsoft Edge") {
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
}, function(module, exports) {
    module.exports = function(module) {
        if (!module.webpackPolyfill) {
            module.deprecate = function() {};
            module.paths = [];
            module.children = [];
            module.webpackPolyfill = 1;
        }
        return module;
    };
}, function(module, exports) {
    module.exports = function(modules) {
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
        var RemoteLogger = __webpack_require__(4);
        var FlashProducer = function(options) {
            if (!options || !options.id) {
                return alert("You must provide an id for the web producer");
            }
            this.id = options.id;
            this.width = options.width || 320;
            this.height = options.height || 240;
            this.el = null;
            this.trace = options.trace;
            this.streamName = null;
            FlashProducer[this.id] = this;
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
                    this.remoteLoggerLog("platform", "platform", [], __webpack_require__(5));
                }
            }
        };
        FlashProducer.log = function(id) {
            if (console && console.log) {
                var producer = FlashProducer[id];
                if (producer.trace) {
                    console.log.apply(console, arguments);
                }
            }
        };
        FlashProducer.js_event = function(producerId, eventName, arg1, arg2) {
            var producer = FlashProducer[producerId];
            if (producer.trace) {
                FlashProducer.log(producerId, eventName, arg1, arg2);
            }
            producer.fire(eventName, arg1, arg2);
            producer.remoteLoggerLog("flashEventTriggered", eventName, [ arg1, arg2 ]);
        };
        FlashProducer.extend = function(source) {
            for (var prop in source) {
                FlashProducer.prototype[prop] = source[prop];
            }
        };
        FlashProducer.prototype = {
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
        var ContentsMixin = __webpack_require__(7);
        FlashProducer.extend(ContentsMixin);
        var TimedMetadataMixin = __webpack_require__(8);
        FlashProducer.extend(TimedMetadataMixin);
        var JobsMixin = __webpack_require__(2);
        FlashProducer.extend(JobsMixin);
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
        FlashProducer.extend(LoadBalancingMixin);
        var CamerafixMixin = __webpack_require__(9);
        FlashProducer.extend(CamerafixMixin);
        var LoggingMixin = __webpack_require__(10);
        FlashProducer.extend(LoggingMixin);
        var EventEmitterMixin = __webpack_require__(11);
        FlashProducer.extend(EventEmitterMixin);
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
        FlashProducer.mixins = {
            ContentsMixin: ContentsMixin,
            TimedMetadataMixin: TimedMetadataMixin,
            JobsMixin: JobsMixin,
            LoadBalancingMixin: LoadBalancingMixin,
            CamerafixMixin: CamerafixMixin,
            LoggingMixin: LoggingMixin,
            EventEmitterMixin: EventEmitterMixin
        };
        FlashProducer.RemoteLogger = RemoteLogger;
        module.exports = FlashProducer;
    }, function(module, exports, __webpack_require__) {
        var JobsMixin, jQuery;
        jQuery = __webpack_require__(3);
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
    }, function(module, exports) {
        var e, jquery;
        try {
            jquery = window.jQuery || window.$;
        } catch (_error) {
            e = _error;
            console.error(e);
        }
        module.exports = jquery;
    }, function(module, exports, __webpack_require__) {
        var RemoteLogger, jQuery;
        jQuery = __webpack_require__(3);
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
        }).call(exports, __webpack_require__(6)(module), function() {
            return this;
        }());
    }, function(module, exports) {
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
        jQuery = __webpack_require__(3);
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
        var TimedMetadataMixin, jQuery;
        jQuery = __webpack_require__(3);
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
    }, function(module, exports) {
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
        RemoteLogger = __webpack_require__(4);
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
    }, function(module, exports) {
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
}, function(module, exports, __webpack_require__) {
    var $, Adapter, ContentsMixin, EventEmitterMixin, FlashProducer, HTML5Producer, Hub, JanusRecorder, JobsMixin, LoggingMixin, TimedMetadataMixin, Urls, mixins, bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    }, extend = function(child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    }, hasProp = {}.hasOwnProperty;
    Adapter = __webpack_require__(6);
    $ = __webpack_require__(7);
    FlashProducer = __webpack_require__(4);
    mixins = FlashProducer.mixins;
    Hub = __webpack_require__(8);
    Urls = __webpack_require__(9);
    JanusRecorder = __webpack_require__(10);
    EventEmitterMixin = mixins.EventEmitterMixin;
    ContentsMixin = mixins.ContentsMixin;
    TimedMetadataMixin = mixins.TimedMetadataMixin;
    JobsMixin = mixins.JobsMixin;
    LoggingMixin = mixins.LoggingMixin;
    HTML5Producer = function(superClass) {
        extend(HTML5Producer, superClass);
        function HTML5Producer(options) {
            this.previewStop = bind(this.previewStop, this);
            this.previewStartError = bind(this.previewStartError, this);
            this.previewStartSuccess = bind(this.previewStartSuccess, this);
            var el, self;
            this.constructor.extend(EventEmitterMixin);
            this.constructor.extend(ContentsMixin);
            this.constructor.extend(TimedMetadataMixin);
            this.constructor.extend(JobsMixin);
            this.constructor.extend(LoggingMixin);
            HTML5Producer.__super__.constructor.apply(this, arguments);
            this.urls = new Urls();
            this.hub = new Hub();
            this.options = options;
            this.id = options.id;
            this.width = options.width || 320;
            this.height = options.height || 240;
            this.el = null;
            this.trace = options.trace;
            this.path = options.path;
            this.streamTimeBase = 0;
            this.style = options.style || "display:block;text-align:left;";
            this.fps = 15;
            this.streamWidth = 640;
            this.streamHeight = 480;
            if (options.remote_logger_name) {
                this.remoteLoggerActivate(options.remote_logger_name);
                this.remoteLoggerLog("jsMethodCalled", "constructor", [ options ]);
                if (window.navigator && window.navigator.userAgent) {
                    this.remoteLoggerLog("userAgent", "userAgent", navigator.userAgent, "", "");
                }
                self = this;
                this.on("*", function() {
                    return self.remoteLoggerLogEvent.apply(this, arguments);
                });
            }
            this.mirroredPreview = false;
            this.audioStreamActive = true;
            this.cameraMuted = true;
            this.streamName = null;
            this.slowLinkLast = Date.now();
            this.useJanusIceServers = false;
            if (options.id) {
                el = document.getElementById(options.id);
                el = $(el).find("video")[0];
                $(el).show();
                this.elementMediaLocalSet(el);
                el.volume = 0;
                el.height = options.height;
                el.width = options.width;
                this.el = el;
            }
            this.slowLinkThrottleTime = 5e3;
            this.slowLinkThrottlePercent = .5;
            this.adaptationStatus = 0;
            this.rampUpStartTimeout = 1e4;
            this.adaptationRampUpSize = 1e4;
            this.adaptationRampUpTime = 3e3;
            this.adaptationMinBitrate = 32e3;
            this.adaptationMaxBitrate = 512e3 * 2;
            this.previewStart();
            this.janusLibInit();
        }
        HTML5Producer.prototype.remoteLoggerLogEvent = function(event, args) {
            args = Array.prototype.slice.call(arguments, 0);
            event = args.shift();
            this.remoteLoggerLog("event", event, args);
        };
        HTML5Producer.prototype.previewStart = function() {
            var video;
            this.remoteLoggerLog("jsMethodCalled", "previewStart");
            video = {
                mandatory: {},
                optional: [ {
                    maxFrameRate: this.fps * 1
                }, {
                    maxWidth: this.streamWidth
                }, {
                    maxHeight: this.streamHeight
                } ]
            };
            return Adapter.getUserMedia({
                video: video,
                audio: this.audioStreamActive
            }, this.previewStartSuccess, this.previewStartError);
        };
        HTML5Producer.prototype.previewStartSuccess = function(stream) {
            this.stream = stream;
            this.cameraMuted = false;
            this.fire("camera-unmuted");
            return this.pluginLocalStream(stream);
        };
        HTML5Producer.prototype.previewStartError = function() {
            this.cameraMuted = true;
            return this.fire("camera-muted");
        };
        HTML5Producer.prototype.previewStop = function() {
            var tracks;
            if (this.stream) {
                if (this.stream.stop) {
                    return this.stream.stop();
                } else {
                    tracks = this.stream.getTracks();
                    return tracks.forEach(function(track) {
                        return track.stop();
                    });
                }
            }
        };
        HTML5Producer.prototype.setUrl = function(url) {
            var host;
            this.remoteLoggerLog("jsMethodCalled", "setUrl", url);
            host = url.split("/")[2].split(":")[0];
            return this.urls.hostSet(host);
        };
        HTML5Producer.prototype.connect = function() {
            var self;
            self = this;
            this.remoteLoggerLog("jsMethodCalled", "connect");
            this.urls.instanceCycle();
            this.urls.once("url-changed", function(urls) {
                self.connectUrlChanged(urls);
                return self.fire("url-changed", self.urls);
            });
            return this.once("connect", function() {
                return self.connectSuccess();
            });
        };
        HTML5Producer.prototype.connectSuccess = function() {
            return this.pluginReconfigure();
        };
        HTML5Producer.prototype.pluginReconfigure = function() {
            var payload;
            payload = {
                request: "configure",
                "video-bitrate-max": this.videoBitrate,
                "video-keyframe-interval": this.videoKeyframeIntervalOverride || this.videoKeyframeInterval
            };
            this.remoteLoggerLog("janusPluginCall", "configure", payload);
            if (this.plugin) {
                return this.plugin.send({
                    message: payload
                });
            }
        };
        HTML5Producer.prototype.pluginMessageSlowLink = function(message) {
            var elapsed;
            this.log("slow_link: current bandwidth is " + this.videoBitrate);
            elapsed = Date.now() - this.slowLinkLast;
            this.fire("slow_link_raw");
            if (elapsed < this.slowLinkThrottleTime) {
                return;
            }
            this.fire("slow_link");
            this.slowLinkLast = Date.now();
            this.remoteLoggerLog("event", "slow_link");
            if (this.unpublishExpected) {
                return;
            }
            this.videoBitrate *= this.slowLinkThrottlePercent;
            this.videoBitrate = Math.floor(this.videoBitrate);
            this.videoBitrate = Math.max(this.videoBitrate, this.adaptationMinBitrate);
            this.log("slow_link: adjusting bandwidth to " + this.videoBitrate);
            this.pluginReconfigure();
            if (this.adaptationStatus === 1 || this.adaptationStatus === 2) {
                return this.adaptationStatus = 2;
            }
        };
        HTML5Producer.prototype.adaptationPoll = function() {
            var elapsed, self;
            if (this.unpublishExpected) {
                return;
            }
            elapsed = Date.now() - this.slowLinkLast;
            self = this;
            if (this.adaptationStatus === 0) {
                if (elapsed > this.rampUpStartTimeout) {
                    this.adaptationStatus = 1;
                }
                setTimeout(function() {
                    return self.adaptationPoll();
                }, 1e3);
                return;
            }
            if (this.adaptationStatus === 1) {
                this.videoBitrate += this.adaptationRampUpSize;
                this.videoBitrate = Math.floor(this.videoBitrate);
                this.log("ramp_up: adjusting bandwidth to " + this.videoBitrate);
                this.pluginReconfigure();
                if (this.videoBitrate < this.adaptationMaxBitrate) {
                    return setTimeout(function() {
                        return self.adaptationPoll();
                    }, this.adaptationRampUpTime);
                }
            }
        };
        HTML5Producer.prototype.adaptationStart = function() {
            this.adaptationStatus = 0;
            this.slowLinkLast = Date.now();
            return this.adaptationPoll();
        };
        HTML5Producer.prototype.connectUrlChanged = function(urls) {
            var iceServer;
            this.hub.urlSet(urls.urlHub);
            this.server = urls.urlJanus;
            iceServer = {
                url: "turn:" + urls.instanceIp + ":3478?transport=tcp",
                username: "pino",
                credential: "pino"
            };
            this.iceServers = [ iceServer ];
            if (this.useJanusIceServers) {
                this.iceServers = void 0;
            }
            this.remoteLoggerLog("iceServers", "iceServers", this.iceServers);
            this.log("iceServer", iceServer);
            return this.sessionInit();
        };
        HTML5Producer.prototype.disconnect = function() {
            this.remoteLoggerLog("janusPluginCall", "disconnect");
            this.unpublishExpected = true;
            return this.session.destroy();
        };
        HTML5Producer.prototype.publish = function(streamName) {
            var self;
            this.remoteLoggerLog("janusPluginCall", "publish");
            self = this;
            this.recordingStart(streamName, this.stream);
            this.once("publish", function() {
                return self.publishDone();
            });
            this.persuadeEarlyKeyframe();
            return this.once("publish", function() {
                setTimeout(function() {
                    return self.persuadeEarlyKeyframeStop();
                }, 1e3);
                return self.adaptationStart();
            });
        };
        HTML5Producer.prototype.persuadeEarlyKeyframe = function() {
            var self;
            this.videoKeyframeIntervalOverride = 500;
            self = this;
            return setTimeout(function() {
                return self.persuadeEarlyKeyframeStop();
            }, 5e3);
        };
        HTML5Producer.prototype.persuadeEarlyKeyframeStop = function() {
            return this.videoKeyframeIntervalOverride = false;
        };
        HTML5Producer.prototype.publishDone = function() {
            this.hub.streams.publish(this.streamName);
            this.streamTimeBase = Date.now();
            this.once("unpublish", this.unpublishCheckUnexpected.bind(this));
            return this.unpublishExpected = false;
        };
        HTML5Producer.prototype.unpublish = function() {
            var self;
            this.remoteLoggerLog("janusPluginCall", "unpublish");
            self = this;
            this.recordingStop();
            this.unpublishExpected = true;
            return this.once("unpublish", function() {
                return self.unpublishDone();
            });
        };
        HTML5Producer.prototype.unpublishDone = function() {
            var self;
            self = this;
            this.adaptationStatus = 2;
            this.hub.streams.unpublish(this.streamName);
            this.hub.contents.checkReady(this.streamName, "webm");
            this.hub.contents.once("save", function(url, streamName) {
                return self.fire("save", url, streamName);
            });
            return this.hub.contents.once("save-metadata", function(url, streamName) {
                return self.fire("save-metadata", url, streamName);
            });
        };
        HTML5Producer.prototype.unpublishCheckUnexpected = function() {
            if (!this.unpublishExpected) {
                return console.log("UNEXPECTED UNPUBLISH EVENT, connection closed prematurely");
            }
        };
        HTML5Producer.prototype.log = function(message) {
            var args, e, error, msg;
            try {
                this.remoteLoggerLog("log", "trace", Array.prototype.slice.call(arguments));
            } catch (error) {
                e = error;
            }
            if (!this.trace) {
                return;
            }
            msg = arguments;
            args = null;
            if (typeof arguments[0] === "string") {
                msg = arguments[0];
                args = [].slice.call(arguments);
                args.shift();
            }
            if (console && console.log) {
                return console.log("HTML5Producer:", msg, args);
            }
        };
        HTML5Producer.prototype._CORS_support = function() {
            if (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest()) {
                return true;
            }
            if (typeof window.XDomainRequest !== "undefined") {
                return true;
            }
            return false;
        };
        HTML5Producer.prototype.isCameraWorking = function() {
            var fn;
            fn = function(_this) {
                return function() {
                    return _this.fire("camera-works");
                };
            }(this);
            return setTimeout(fn, 1e3);
        };
        HTML5Producer.prototype.getStreamTime = function() {
            return Date.now() - this.streamTimeBase;
        };
        HTML5Producer.prototype.setMirroredPreview = function(val) {
            var rot;
            this.mirroredPreview = val;
            if (!this.el) {
                return;
            }
            rot = "rotateY(0deg)";
            if (this.mirroredPreview) {
                rot = "rotateY(180deg)";
            }
            $(this.el).css("transform", rot);
            $(this.el).css("-webkit-transform", rot);
            return $(this.el).css("-moz-transform", rot);
        };
        HTML5Producer.prototype.getMirroredPreview = function() {
            return this.mirroredPreview;
        };
        HTML5Producer.prototype.setAudioStreamActive = function(val) {
            return this.audioStreamActive = val;
        };
        HTML5Producer.prototype.getAudioStreamActive = function() {
            return this.audioStreamActive;
        };
        HTML5Producer.prototype.countCameras = function() {
            return 1;
        };
        HTML5Producer.prototype.isCameraMuted = function() {
            return this.cameraMuted;
        };
        HTML5Producer.prototype.setStreamWidth = function(width) {
            return this.streamWidth = width;
        };
        HTML5Producer.prototype.getStreamWidth = function(width) {
            return this.streamWidth;
        };
        HTML5Producer.prototype.setStreamHeight = function(height) {
            return this.streamHeight = height;
        };
        HTML5Producer.prototype.getStreamHeight = function(height) {
            return this.streamHeight;
        };
        HTML5Producer.prototype.setStreamFPS = function(fps) {
            return this.fps = fps;
        };
        HTML5Producer.prototype.getStreamFPS = function(fps) {
            return this.fps;
        };
        HTML5Producer.prototype.setStreamQuality = function(quality) {
            return this.videoStreamQuality = quality;
        };
        HTML5Producer.prototype.getStreamQuality = function(quality) {
            return this.videoStreamQuality;
        };
        HTML5Producer.prototype.setStreamBufferTime = function(bufferTime) {
            return this.bufferTime = bufferTime;
        };
        HTML5Producer.prototype.getStreamBufferTime = function(bufferTime) {
            return this.bufferTime;
        };
        HTML5Producer.prototype.setStreamBandwidth = function(bandwidth) {
            if (this.videoBitrate !== bandwidth) {
                this.videoBitrate = bandwidth;
                return this.pluginReconfigure();
            }
        };
        HTML5Producer.prototype.getStreamBandwidth = function(bandwidth) {
            return this.videoBitrate;
        };
        HTML5Producer.prototype.getStats = function() {
            return {
                message: "HTML5 webrtc stats are not supported yet"
            };
        };
        HTML5Producer.prototype.get_http_base_url = function() {
            return this.urls.urlHttp + "/";
        };
        return HTML5Producer;
    }(JanusRecorder);
    module.exports = HTML5Producer;
}, function(module, exports) {
    "use strict";
    var RTCPeerConnection = null;
    var getUserMedia = null;
    var attachMediaStream = null;
    var reattachMediaStream = null;
    var webrtcDetectedBrowser = null;
    var webrtcDetectedVersion = null;
    function trace(text) {
        if (text[text.length - 1] === "\n") {
            text = text.substring(0, text.length - 1);
        }
        if (window.performance) {
            var now = (window.performance.now() / 1e3).toFixed(3);
            console.log(now + ": " + text);
        } else {
            console.log(text);
        }
    }
    function maybeFixConfiguration(pcConfig) {
        if (!pcConfig) {
            return;
        }
        for (var i = 0; i < pcConfig.iceServers.length; i++) {
            if (pcConfig.iceServers[i].hasOwnProperty("urls")) {
                pcConfig.iceServers[i].url = pcConfig.iceServers[i].urls;
                delete pcConfig.iceServers[i].urls;
            }
        }
    }
    if (navigator.mozGetUserMedia) {
        console.log("This appears to be Firefox");
        webrtcDetectedBrowser = "firefox";
        webrtcDetectedVersion = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
        RTCPeerConnection = function(pcConfig, pcConstraints) {
            maybeFixConfiguration(pcConfig);
            return new mozRTCPeerConnection(pcConfig, pcConstraints);
        };
        window.RTCSessionDescription = mozRTCSessionDescription;
        window.RTCIceCandidate = mozRTCIceCandidate;
        getUserMedia = navigator.mozGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;
        MediaStreamTrack.getSources = function(successCb) {
            setTimeout(function() {
                var infos = [ {
                    kind: "audio",
                    id: "default",
                    label: "",
                    facing: ""
                }, {
                    kind: "video",
                    id: "default",
                    label: "",
                    facing: ""
                } ];
                successCb(infos);
            }, 0);
        };
        window.createIceServer = function(url, username, password) {
            var iceServer = null;
            var urlParts = url.split(":");
            if (urlParts[0].indexOf("stun") === 0) {
                iceServer = {
                    url: url
                };
            } else if (urlParts[0].indexOf("turn") === 0) {
                if (webrtcDetectedVersion < 27) {
                    var turnUrlParts = url.split("?");
                    if (turnUrlParts.length === 1 || turnUrlParts[1].indexOf("transport=udp") === 0) {
                        iceServer = {
                            url: turnUrlParts[0],
                            credential: password,
                            username: username
                        };
                    }
                } else {
                    iceServer = {
                        url: url,
                        credential: password,
                        username: username
                    };
                }
            }
            return iceServer;
        };
        window.createIceServers = function(urls, username, password) {
            var iceServers = [];
            for (var i = 0; i < urls.length; i++) {
                var iceServer = window.createIceServer(urls[i], username, password);
                if (iceServer !== null) {
                    iceServers.push(iceServer);
                }
            }
            return iceServers;
        };
        attachMediaStream = function(element, stream) {
            console.log("Attaching media stream");
            element.mozSrcObject = stream;
        };
        reattachMediaStream = function(to, from) {
            console.log("Reattaching media stream");
            to.mozSrcObject = from.mozSrcObject;
        };
    } else if (navigator.webkitGetUserMedia) {
        console.log("This appears to be Chrome");
        webrtcDetectedBrowser = "chrome";
        var result = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        if (result !== null) {
            webrtcDetectedVersion = parseInt(result[2], 10);
        } else {
            webrtcDetectedVersion = 999;
        }
        window.createIceServer = function(url, username, password) {
            var iceServer = null;
            var urlParts = url.split(":");
            if (urlParts[0].indexOf("stun") === 0) {
                iceServer = {
                    url: url
                };
            } else if (urlParts[0].indexOf("turn") === 0) {
                iceServer = {
                    url: url,
                    credential: password,
                    username: username
                };
            }
            return iceServer;
        };
        window.createIceServers = function(urls, username, password) {
            return {
                urls: urls,
                credential: password,
                username: username
            };
        };
        RTCPeerConnection = function(pcConfig, pcConstraints) {
            return new webkitRTCPeerConnection(pcConfig, pcConstraints);
        };
        getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
        navigator.getUserMedia = getUserMedia;
        attachMediaStream = function(element, stream) {
            if (typeof element.srcObject !== "undefined") {
                element.srcObject = stream;
            } else if (typeof element.mozSrcObject !== "undefined") {
                element.mozSrcObject = stream;
            } else if (typeof element.src !== "undefined") {
                element.src = URL.createObjectURL(stream);
            } else {
                console.log("Error attaching stream to element.");
            }
        };
        reattachMediaStream = function(to, from) {
            to.src = from.src;
        };
    } else {
        console.log("Browser does not appear to be WebRTC-capable");
    }
    function requestUserMedia(constraints) {
        return new Promise(function(resolve, reject) {
            var onSuccess = function(stream) {
                resolve(stream);
            };
            var onError = function(error) {
                reject(error);
            };
            try {
                getUserMedia(constraints, onSuccess, onError);
            } catch (e) {
                reject(e);
            }
        });
    }
    exports["getUserMedia"] = getUserMedia;
    exports["attachMediaStream"] = attachMediaStream;
    exports["webrtcDetectedBrowser"] = webrtcDetectedBrowser;
    exports["webrtcDetectedVersion"] = webrtcDetectedVersion;
    exports["RTCPeerConnection"] = RTCPeerConnection;
    exports["RTCIceCandidate"] = RTCIceCandidate;
    exports["RTCSessionDescription"] = RTCSessionDescription;
}, function(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
    (function(global, factory) {
        if (typeof module === "object" && typeof module.exports === "object") {
            module.exports = global.document ? factory(global, true) : function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
        } else {
            factory(global);
        }
    })(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
        var arr = [];
        var document = window.document;
        var slice = arr.slice;
        var concat = arr.concat;
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var support = {};
        var version = "2.2.3", jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context);
        }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };
        jQuery.fn = jQuery.prototype = {
            jquery: version,
            constructor: jQuery,
            selector: "",
            length: 0,
            toArray: function() {
                return slice.call(this);
            },
            get: function(num) {
                return num != null ? num < 0 ? this[num + this.length] : this[num] : slice.call(this);
            },
            pushStack: function(elems) {
                var ret = jQuery.merge(this.constructor(), elems);
                ret.prevObject = this;
                ret.context = this.context;
                return ret;
            },
            each: function(callback) {
                return jQuery.each(this, callback);
            },
            map: function(callback) {
                return this.pushStack(jQuery.map(this, function(elem, i) {
                    return callback.call(elem, i, elem);
                }));
            },
            slice: function() {
                return this.pushStack(slice.apply(this, arguments));
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            eq: function(i) {
                var len = this.length, j = +i + (i < 0 ? len : 0);
                return this.pushStack(j >= 0 && j < len ? [ this[j] ] : []);
            },
            end: function() {
                return this.prevObject || this.constructor();
            },
            push: push,
            sort: arr.sort,
            splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            if (i === length) {
                target = this;
                i--;
            }
            for (;i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            target[name] = jQuery.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        jQuery.extend({
            expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
            isReady: true,
            error: function(msg) {
                throw new Error(msg);
            },
            noop: function() {},
            isFunction: function(obj) {
                return jQuery.type(obj) === "function";
            },
            isArray: Array.isArray,
            isWindow: function(obj) {
                return obj != null && obj === obj.window;
            },
            isNumeric: function(obj) {
                var realStringObj = obj && obj.toString();
                return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
            },
            isPlainObject: function(obj) {
                var key;
                if (jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype || {}, "isPrototypeOf")) {
                    return false;
                }
                for (key in obj) {}
                return key === undefined || hasOwn.call(obj, key);
            },
            isEmptyObject: function(obj) {
                var name;
                for (name in obj) {
                    return false;
                }
                return true;
            },
            type: function(obj) {
                if (obj == null) {
                    return obj + "";
                }
                return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
            },
            globalEval: function(code) {
                var script, indirect = eval;
                code = jQuery.trim(code);
                if (code) {
                    if (code.indexOf("use strict") === 1) {
                        script = document.createElement("script");
                        script.text = code;
                        document.head.appendChild(script).parentNode.removeChild(script);
                    } else {
                        indirect(code);
                    }
                }
            },
            camelCase: function(string) {
                return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
            },
            nodeName: function(elem, name) {
                return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
            },
            each: function(obj, callback) {
                var length, i = 0;
                if (isArrayLike(obj)) {
                    length = obj.length;
                    for (;i < length; i++) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                } else {
                    for (i in obj) {
                        if (callback.call(obj[i], i, obj[i]) === false) {
                            break;
                        }
                    }
                }
                return obj;
            },
            trim: function(text) {
                return text == null ? "" : (text + "").replace(rtrim, "");
            },
            makeArray: function(arr, results) {
                var ret = results || [];
                if (arr != null) {
                    if (isArrayLike(Object(arr))) {
                        jQuery.merge(ret, typeof arr === "string" ? [ arr ] : arr);
                    } else {
                        push.call(ret, arr);
                    }
                }
                return ret;
            },
            inArray: function(elem, arr, i) {
                return arr == null ? -1 : indexOf.call(arr, elem, i);
            },
            merge: function(first, second) {
                var len = +second.length, j = 0, i = first.length;
                for (;j < len; j++) {
                    first[i++] = second[j];
                }
                first.length = i;
                return first;
            },
            grep: function(elems, callback, invert) {
                var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
                for (;i < length; i++) {
                    callbackInverse = !callback(elems[i], i);
                    if (callbackInverse !== callbackExpect) {
                        matches.push(elems[i]);
                    }
                }
                return matches;
            },
            map: function(elems, callback, arg) {
                var length, value, i = 0, ret = [];
                if (isArrayLike(elems)) {
                    length = elems.length;
                    for (;i < length; i++) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                } else {
                    for (i in elems) {
                        value = callback(elems[i], i, arg);
                        if (value != null) {
                            ret.push(value);
                        }
                    }
                }
                return concat.apply([], ret);
            },
            guid: 1,
            proxy: function(fn, context) {
                var tmp, args, proxy;
                if (typeof context === "string") {
                    tmp = fn[context];
                    context = fn;
                    fn = tmp;
                }
                if (!jQuery.isFunction(fn)) {
                    return undefined;
                }
                args = slice.call(arguments, 2);
                proxy = function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };
                proxy.guid = fn.guid = fn.guid || jQuery.guid++;
                return proxy;
            },
            now: Date.now,
            support: support
        });
        if (typeof Symbol === "function") {
            jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        function isArrayLike(obj) {
            var length = !!obj && "length" in obj && obj.length, type = jQuery.type(obj);
            if (type === "function" || jQuery.isWindow(obj)) {
                return false;
            }
            return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
        }
        var Sizzle = function(window) {
            var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                }
                return 0;
            }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
                var i = 0, len = list.length;
                for (;i < len; i++) {
                    if (list[i] === elem) {
                        return i;
                    }
                }
                return -1;
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" + ".*" + ")\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
                ID: new RegExp("^#(" + identifier + ")"),
                CLASS: new RegExp("^\\.(" + identifier + ")"),
                TAG: new RegExp("^(" + identifier + "|[*])"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
            }, unloadHandler = function() {
                setDocument();
            };
            try {
                push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ? function(target, els) {
                        push_native.apply(target, slice.call(els));
                    } : function(target, els) {
                        var j = target.length, i = 0;
                        while (target[j++] = els[i++]) {}
                        target.length = j - 1;
                    }
                };
            }
            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
                results = results || [];
                if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
                    return results;
                }
                if (!seed) {
                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;
                    if (documentIsHTML) {
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
                            if (m = match[1]) {
                                if (nodeType === 9) {
                                    if (elem = context.getElementById(m)) {
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }
                                } else {
                                    if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                        results.push(elem);
                                        return results;
                                    }
                                }
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;
                            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }
                        if (support.qsa && !compilerCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;
                            } else if (context.nodeName.toLowerCase() !== "object") {
                                if (nid = context.getAttribute("id")) {
                                    nid = nid.replace(rescape, "\\$&");
                                } else {
                                    context.setAttribute("id", nid = expando);
                                }
                                groups = tokenize(selector);
                                i = groups.length;
                                nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
                                while (i--) {
                                    groups[i] = nidselect + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");
                                newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                            }
                            if (newSelector) {
                                try {
                                    push.apply(results, newContext.querySelectorAll(newSelector));
                                    return results;
                                } catch (qsaError) {} finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }
            function createCache() {
                var keys = [];
                function cache(key, value) {
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        delete cache[keys.shift()];
                    }
                    return cache[key + " "] = value;
                }
                return cache;
            }
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }
            function assert(fn) {
                var div = document.createElement("div");
                try {
                    return !!fn(div);
                } catch (e) {
                    return false;
                } finally {
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    div = null;
                }
            }
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"), i = arr.length;
                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }
            function siblingCheck(a, b) {
                var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
                if (diff) {
                    return diff;
                }
                if (cur) {
                    while (cur = cur.nextSibling) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }
                return a ? 1 : -1;
            }
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    argument = +argument;
                    return markFunction(function(seed, matches) {
                        var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
                        while (i--) {
                            if (seed[j = matchIndexes[i]]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }
            support = Sizzle.support = {};
            isXML = Sizzle.isXML = function(elem) {
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };
            setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);
                if ((parent = document.defaultView) && parent.top !== parent) {
                    if (parent.addEventListener) {
                        parent.addEventListener("unload", unloadHandler, false);
                    } else if (parent.attachEvent) {
                        parent.attachEvent("onunload", unloadHandler);
                    }
                }
                support.attributes = assert(function(div) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });
                support.getElementsByTagName = assert(function(div) {
                    div.appendChild(document.createComment(""));
                    return !div.getElementsByTagName("*").length;
                });
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);
                support.getById = assert(function(div) {
                    docElem.appendChild(div).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });
                if (support.getById) {
                    Expr.find["ID"] = function(id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m ? [ m ] : [];
                        }
                    };
                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    delete Expr.find["ID"];
                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }
                Expr.find["TAG"] = support.getElementsByTagName ? function(tag, context) {
                    if (typeof context.getElementsByTagName !== "undefined") {
                        return context.getElementsByTagName(tag);
                    } else if (support.qsa) {
                        return context.querySelectorAll(tag);
                    }
                } : function(tag, context) {
                    var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                    if (tag === "*") {
                        while (elem = results[i++]) {
                            if (elem.nodeType === 1) {
                                tmp.push(elem);
                            }
                        }
                        return tmp;
                    }
                    return results;
                };
                Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };
                rbuggyMatches = [];
                rbuggyQSA = [];
                if (support.qsa = rnative.test(document.querySelectorAll)) {
                    assert(function(div) {
                        docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" + "<select id='" + expando + "-\r\\' msallowcapture=''>" + "<option selected=''></option></select>";
                        if (div.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }
                        if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }
                        if (!div.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });
                    assert(function(div) {
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("name", "D");
                        if (div.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }
                if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
                    assert(function(div) {
                        support.disconnectedMatch = matches.call(div, "div");
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }
                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
                hasCompare = rnative.test(docElem.compareDocumentPosition);
                contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                    var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                    return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
                } : function(a, b) {
                    if (b) {
                        while (b = b.parentNode) {
                            if (b === a) {
                                return true;
                            }
                        }
                    }
                    return false;
                };
                sortOrder = hasCompare ? function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if (compare) {
                        return compare;
                    }
                    compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                    if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
                        if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                            return -1;
                        }
                        if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                            return 1;
                        }
                        return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                    }
                    return compare & 4 ? -1 : 1;
                } : function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                    if (!aup || !bup) {
                        return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                    } else if (aup === bup) {
                        return siblingCheck(a, b);
                    }
                    cur = a;
                    while (cur = cur.parentNode) {
                        ap.unshift(cur);
                    }
                    cur = b;
                    while (cur = cur.parentNode) {
                        bp.unshift(cur);
                    }
                    while (ap[i] === bp[i]) {
                        i++;
                    }
                    return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
                };
                return document;
            };
            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
            };
            Sizzle.matchesSelector = function(elem, expr) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                expr = expr.replace(rattributeQuotes, "='$1']");
                if (support.matchesSelector && documentIsHTML && !compilerCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                    try {
                        var ret = matches.call(elem, expr);
                        if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {}
                }
                return Sizzle(expr, document, null, [ elem ]).length > 0;
            };
            Sizzle.contains = function(context, elem) {
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };
            Sizzle.attr = function(elem, name) {
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }
                var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
                return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            };
            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };
            Sizzle.uniqueSort = function(results) {
                var elem, duplicates = [], j = 0, i = 0;
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);
                if (hasDuplicate) {
                    while (elem = results[i++]) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }
                sortInput = null;
                return results;
            };
            getText = Sizzle.getText = function(elem) {
                var node, ret = "", i = 0, nodeType = elem.nodeType;
                if (!nodeType) {
                    while (node = elem[i++]) {
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                return ret;
            };
            Expr = Sizzle.selectors = {
                cacheLength: 50,
                createPseudo: markFunction,
                match: matchExpr,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(match) {
                        match[1] = match[1].replace(runescape, funescape);
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }
                        return match.slice(0, 4);
                    },
                    CHILD: function(match) {
                        match[1] = match[1].toLowerCase();
                        if (match[1].slice(0, 3) === "nth") {
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +(match[7] + match[8] || match[3] === "odd");
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }
                        return match;
                    },
                    PSEUDO: function(match) {
                        var excess, unquoted = !match[6] && match[2];
                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";
                        } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }
                        return match.slice(0, 3);
                    }
                },
                filter: {
                    TAG: function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ? function() {
                            return true;
                        } : function(elem) {
                            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                        };
                    },
                    CLASS: function(className) {
                        var pattern = classCache[className + " "];
                        return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                        });
                    },
                    ATTR: function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);
                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }
                            result += "";
                            return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                        };
                    },
                    CHILD: function(type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                        return first === 1 && last === 0 ? function(elem) {
                            return !!elem.parentNode;
                        } : function(elem, context, xml) {
                            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                            if (parent) {
                                if (simple) {
                                    while (dir) {
                                        node = elem;
                                        while (node = node[dir]) {
                                            if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                                return false;
                                            }
                                        }
                                        start = dir = type === "only" && !start && "nextSibling";
                                    }
                                    return true;
                                }
                                start = [ forward ? parent.firstChild : parent.lastChild ];
                                if (forward && useCache) {
                                    node = parent;
                                    outerCache = node[expando] || (node[expando] = {});
                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                    cache = uniqueCache[type] || [];
                                    nodeIndex = cache[0] === dirruns && cache[1];
                                    diff = nodeIndex && cache[2];
                                    node = nodeIndex && parent.childNodes[nodeIndex];
                                    while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                        if (node.nodeType === 1 && ++diff && node === elem) {
                                            uniqueCache[type] = [ dirruns, nodeIndex, diff ];
                                            break;
                                        }
                                    }
                                } else {
                                    if (useCache) {
                                        node = elem;
                                        outerCache = node[expando] || (node[expando] = {});
                                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex;
                                    }
                                    if (diff === false) {
                                        while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                                            if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                                if (useCache) {
                                                    outerCache = node[expando] || (node[expando] = {});
                                                    uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                                                    uniqueCache[type] = [ dirruns, diff ];
                                                }
                                                if (node === elem) {
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                diff -= last;
                                return diff === first || diff % first === 0 && diff / first >= 0;
                            }
                        };
                    },
                    PSEUDO: function(pseudo, argument) {
                        var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                        if (fn[expando]) {
                            return fn(argument);
                        }
                        if (fn.length > 1) {
                            args = [ pseudo, pseudo, "", argument ];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                                var idx, matched = fn(seed, argument), i = matched.length;
                                while (i--) {
                                    idx = indexOf(seed, matched[i]);
                                    seed[idx] = !(matches[idx] = matched[i]);
                                }
                            }) : function(elem) {
                                return fn(elem, 0, args);
                            };
                        }
                        return fn;
                    }
                },
                pseudos: {
                    not: markFunction(function(selector) {
                        var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                        return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
                            while (i--) {
                                if (elem = unmatched[i]) {
                                    seed[i] = !(matches[i] = elem);
                                }
                            }
                        }) : function(elem, context, xml) {
                            input[0] = elem;
                            matcher(input, null, xml, results);
                            input[0] = null;
                            return !results.pop();
                        };
                    }),
                    has: markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),
                    contains: markFunction(function(text) {
                        text = text.replace(runescape, funescape);
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),
                    lang: markFunction(function(lang) {
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function(elem) {
                            var elemLang;
                            do {
                                if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),
                    target: function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },
                    root: function(elem) {
                        return elem === docElem;
                    },
                    focus: function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },
                    enabled: function(elem) {
                        return elem.disabled === false;
                    },
                    disabled: function(elem) {
                        return elem.disabled === true;
                    },
                    checked: function(elem) {
                        var nodeName = elem.nodeName.toLowerCase();
                        return nodeName === "input" && !!elem.checked || nodeName === "option" && !!elem.selected;
                    },
                    selected: function(elem) {
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }
                        return elem.selected === true;
                    },
                    empty: function(elem) {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },
                    parent: function(elem) {
                        return !Expr.pseudos["empty"](elem);
                    },
                    header: function(elem) {
                        return rheader.test(elem.nodeName);
                    },
                    input: function(elem) {
                        return rinputs.test(elem.nodeName);
                    },
                    button: function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },
                    text: function(elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },
                    first: createPositionalPseudo(function() {
                        return [ 0 ];
                    }),
                    last: createPositionalPseudo(function(matchIndexes, length) {
                        return [ length - 1 ];
                    }),
                    eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [ argument < 0 ? argument + length : argument ];
                    }),
                    even: createPositionalPseudo(function(matchIndexes, length) {
                        var i = 0;
                        for (;i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    odd: createPositionalPseudo(function(matchIndexes, length) {
                        var i = 1;
                        for (;i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (;--i >= 0; ) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),
                    gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (;++i < length; ) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };
            Expr.pseudos["nth"] = Expr.pseudos["eq"];
            for (i in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {
                submit: true,
                reset: true
            }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();
            tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }
                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;
                while (soFar) {
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push(tokens = []);
                    }
                    matched = false;
                    if (match = rcombinators.exec(soFar)) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }
                    if (!matched) {
                        break;
                    }
                }
                return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
            };
            function toSelector(tokens) {
                var i = 0, len = tokens.length, selector = "";
                for (;i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }
            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir, checkNonElements = base && dir === "parentNode", doneName = done++;
                return combinator.first ? function(elem, context, xml) {
                    while (elem = elem[dir]) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            return matcher(elem, context, xml);
                        }
                    }
                } : function(elem, context, xml) {
                    var oldCache, uniqueCache, outerCache, newCache = [ dirruns, doneName ];
                    if (xml) {
                        while (elem = elem[dir]) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                if (matcher(elem, context, xml)) {
                                    return true;
                                }
                            }
                        }
                    } else {
                        while (elem = elem[dir]) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                outerCache = elem[expando] || (elem[expando] = {});
                                uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                                if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                    return newCache[2] = oldCache[2];
                                } else {
                                    uniqueCache[dir] = newCache;
                                    if (newCache[2] = matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                };
            }
            function elementMatcher(matchers) {
                return matchers.length > 1 ? function(elem, context, xml) {
                    var i = matchers.length;
                    while (i--) {
                        if (!matchers[i](elem, context, xml)) {
                            return false;
                        }
                    }
                    return true;
                } : matchers[0];
            }
            function multipleContexts(selector, contexts, results) {
                var i = 0, len = contexts.length;
                for (;i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }
            function condense(unmatched, map, filter, context, xml) {
                var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
                for (;i < len; i++) {
                    if (elem = unmatched[i]) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }
                return newUnmatched;
            }
            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function(seed, results, context, xml) {
                    var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);
                        i = temp.length;
                        while (i--) {
                            if (elem = temp[i]) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }
                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if (elem = matcherOut[i]) {
                                        temp.push(matcherIn[i] = elem);
                                    }
                                }
                                postFinder(null, matcherOut = [], temp, xml);
                            }
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }
                    } else {
                        matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }
            function matcherFromTokens(tokens) {
                var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                    return elem === checkContext;
                }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
                    return indexOf(checkContext, elem) > -1;
                }, implicitRelative, true), matchers = [ function(elem, context, xml) {
                    var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                    checkContext = null;
                    return ret;
                } ];
                for (;i < len; i++) {
                    if (matcher = Expr.relative[tokens[i].type]) {
                        matchers = [ addCombinator(elementMatcher(matchers), matcher) ];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                        if (matcher[expando]) {
                            j = ++i;
                            for (;j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                                value: tokens[i - 2].type === " " ? "*" : ""
                            })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                        }
                        matchers.push(matcher);
                    }
                }
                return elementMatcher(matchers);
            }
            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || .1, len = elems.length;
                    if (outermost) {
                        outermostContext = context === document || context || outermost;
                    }
                    for (;i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            if (!context && elem.ownerDocument !== document) {
                                setDocument(elem);
                                xml = !documentIsHTML;
                            }
                            while (matcher = elementMatchers[j++]) {
                                if (matcher(elem, context || document, xml)) {
                                    results.push(elem);
                                    break;
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique;
                            }
                        }
                        if (bySet) {
                            if (elem = !matcher && elem) {
                                matchedCount--;
                            }
                            if (seed) {
                                unmatched.push(elem);
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while (matcher = setMatchers[j++]) {
                            matcher(unmatched, setMatched, context, xml);
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results);
                                    }
                                }
                            }
                            setMatched = condense(setMatched);
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                            Sizzle.uniqueSort(results);
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup;
                    }
                    return unmatched;
                };
                return bySet ? markFunction(superMatcher) : superMatcher;
            }
            compile = Sizzle.compile = function(selector, match) {
                var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
                if (!cached) {
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                    cached.selector = selector;
                }
                return cached;
            };
            select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
                results = results || [];
                if (match.length === 1) {
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;
                        } else if (compiled) {
                            context = context.parentNode;
                        }
                        selector = selector.slice(tokens.shift().value.length);
                    }
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];
                        if (Expr.relative[type = token.type]) {
                            break;
                        }
                        if (find = Expr.find[type]) {
                            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }
                                break;
                            }
                        }
                    }
                }
                (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
                return results;
            };
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
            support.detectDuplicates = !!hasDuplicate;
            setDocument();
            support.sortDetached = assert(function(div1) {
                return div1.compareDocumentPosition(document.createElement("div")) & 1;
            });
            if (!assert(function(div) {
                div.innerHTML = "<a href='#'></a>";
                return div.firstChild.getAttribute("href") === "#";
            })) {
                addHandle("type|href|height|width", function(elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }
            if (!support.attributes || !assert(function(div) {
                div.innerHTML = "<input/>";
                div.firstChild.setAttribute("value", "");
                return div.firstChild.getAttribute("value") === "";
            })) {
                addHandle("value", function(elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }
            if (!assert(function(div) {
                return div.getAttribute("disabled") == null;
            })) {
                addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
                    }
                });
            }
            return Sizzle;
        }(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        var dir = function(elem, dir, until) {
            var matched = [], truncate = until !== undefined;
            while ((elem = elem[dir]) && elem.nodeType !== 9) {
                if (elem.nodeType === 1) {
                    if (truncate && jQuery(elem).is(until)) {
                        break;
                    }
                    matched.push(elem);
                }
            }
            return matched;
        };
        var siblings = function(n, elem) {
            var matched = [];
            for (;n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    matched.push(n);
                }
            }
            return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
        var risSimple = /^.[^:#\[\.,]*$/;
        function winnow(elements, qualifier, not) {
            if (jQuery.isFunction(qualifier)) {
                return jQuery.grep(elements, function(elem, i) {
                    return !!qualifier.call(elem, i, elem) !== not;
                });
            }
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function(elem) {
                    return elem === qualifier !== not;
                });
            }
            if (typeof qualifier === "string") {
                if (risSimple.test(qualifier)) {
                    return jQuery.filter(qualifier, elements, not);
                }
                qualifier = jQuery.filter(qualifier, elements);
            }
            return jQuery.grep(elements, function(elem) {
                return indexOf.call(qualifier, elem) > -1 !== not;
            });
        }
        jQuery.filter = function(expr, elems, not) {
            var elem = elems[0];
            if (not) {
                expr = ":not(" + expr + ")";
            }
            return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1;
            }));
        };
        jQuery.fn.extend({
            find: function(selector) {
                var i, len = this.length, ret = [], self = this;
                if (typeof selector !== "string") {
                    return this.pushStack(jQuery(selector).filter(function() {
                        for (i = 0; i < len; i++) {
                            if (jQuery.contains(self[i], this)) {
                                return true;
                            }
                        }
                    }));
                }
                for (i = 0; i < len; i++) {
                    jQuery.find(selector, self[i], ret);
                }
                ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
                ret.selector = this.selector ? this.selector + " " + selector : selector;
                return ret;
            },
            filter: function(selector) {
                return this.pushStack(winnow(this, selector || [], false));
            },
            not: function(selector) {
                return this.pushStack(winnow(this, selector || [], true));
            },
            is: function(selector) {
                return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
            }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context, root) {
            var match, elem;
            if (!selector) {
                return this;
            }
            root = root || rootjQuery;
            if (typeof selector === "string") {
                if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
                    match = [ null, selector, null ];
                } else {
                    match = rquickExpr.exec(selector);
                }
                if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                } else if (!context || context.jquery) {
                    return (context || root).find(selector);
                } else {
                    return this.constructor(context).find(selector);
                }
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;
            } else if (jQuery.isFunction(selector)) {
                return root.ready !== undefined ? root.ready(selector) : selector(jQuery);
            }
            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }
            return jQuery.makeArray(selector, this);
        };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        jQuery.fn.extend({
            has: function(target) {
                var targets = jQuery(target, this), l = targets.length;
                return this.filter(function() {
                    var i = 0;
                    for (;i < l; i++) {
                        if (jQuery.contains(this, targets[i])) {
                            return true;
                        }
                    }
                });
            },
            closest: function(selectors, context) {
                var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
                for (;i < l; i++) {
                    for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                        if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur);
                            break;
                        }
                    }
                }
                return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
            },
            index: function(elem) {
                if (!elem) {
                    return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
                }
                if (typeof elem === "string") {
                    return indexOf.call(jQuery(elem), this[0]);
                }
                return indexOf.call(this, elem.jquery ? elem[0] : elem);
            },
            add: function(selector, context) {
                return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
            },
            addBack: function(selector) {
                return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
            }
        });
        function sibling(cur, dir) {
            while ((cur = cur[dir]) && cur.nodeType !== 1) {}
            return cur;
        }
        jQuery.each({
            parent: function(elem) {
                var parent = elem.parentNode;
                return parent && parent.nodeType !== 11 ? parent : null;
            },
            parents: function(elem) {
                return dir(elem, "parentNode");
            },
            parentsUntil: function(elem, i, until) {
                return dir(elem, "parentNode", until);
            },
            next: function(elem) {
                return sibling(elem, "nextSibling");
            },
            prev: function(elem) {
                return sibling(elem, "previousSibling");
            },
            nextAll: function(elem) {
                return dir(elem, "nextSibling");
            },
            prevAll: function(elem) {
                return dir(elem, "previousSibling");
            },
            nextUntil: function(elem, i, until) {
                return dir(elem, "nextSibling", until);
            },
            prevUntil: function(elem, i, until) {
                return dir(elem, "previousSibling", until);
            },
            siblings: function(elem) {
                return siblings((elem.parentNode || {}).firstChild, elem);
            },
            children: function(elem) {
                return siblings(elem.firstChild);
            },
            contents: function(elem) {
                return elem.contentDocument || jQuery.merge([], elem.childNodes);
            }
        }, function(name, fn) {
            jQuery.fn[name] = function(until, selector) {
                var matched = jQuery.map(this, fn, until);
                if (name.slice(-5) !== "Until") {
                    selector = until;
                }
                if (selector && typeof selector === "string") {
                    matched = jQuery.filter(selector, matched);
                }
                if (this.length > 1) {
                    if (!guaranteedUnique[name]) {
                        jQuery.uniqueSort(matched);
                    }
                    if (rparentsprev.test(name)) {
                        matched.reverse();
                    }
                }
                return this.pushStack(matched);
            };
        });
        var rnotwhite = /\S+/g;
        function createOptions(options) {
            var object = {};
            jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
                object[flag] = true;
            });
            return object;
        }
        jQuery.Callbacks = function(options) {
            options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
            var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
                locked = options.once;
                fired = firing = true;
                for (;queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {
                        if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
                if (!options.memory) {
                    memory = false;
                }
                firing = false;
                if (locked) {
                    if (memory) {
                        list = [];
                    } else {
                        list = "";
                    }
                }
            }, self = {
                add: function() {
                    if (list) {
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && jQuery.type(arg) !== "string") {
                                    add(arg);
                                }
                            });
                        })(arguments);
                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },
                remove: function() {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
                },
                empty: function() {
                    if (list) {
                        list = [];
                    }
                    return this;
                },
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() {
                    return !list;
                },
                lock: function() {
                    locked = queue = [];
                    if (!memory) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function() {
                    return !!locked;
                },
                fireWith: function(context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },
                fired: function() {
                    return !!fired;
                }
            };
            return self;
        };
        jQuery.extend({
            Deferred: function(func) {
                var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                }, deferred = {};
                promise.pipe = promise.then;
                jQuery.each(tuples, function(i, tuple) {
                    var list = tuple[2], stateString = tuple[3];
                    promise[tuple[1]] = list.add;
                    if (stateString) {
                        list.add(function() {
                            state = stateString;
                        }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                    }
                    deferred[tuple[0]] = function() {
                        deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                        return this;
                    };
                    deferred[tuple[0] + "With"] = list.fireWith;
                });
                promise.promise(deferred);
                if (func) {
                    func.call(deferred, deferred);
                }
                return deferred;
            },
            when: function(subordinate) {
                var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);
                        } else if (!--remaining) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                }, progressValues, progressContexts, resolveContexts;
                if (length > 1) {
                    progressValues = new Array(length);
                    progressContexts = new Array(length);
                    resolveContexts = new Array(length);
                    for (;i < length; i++) {
                        if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                            resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
                        } else {
                            --remaining;
                        }
                    }
                }
                if (!remaining) {
                    deferred.resolveWith(resolveContexts, resolveValues);
                }
                return deferred.promise();
            }
        });
        var readyList;
        jQuery.fn.ready = function(fn) {
            jQuery.ready.promise().done(fn);
            return this;
        };
        jQuery.extend({
            isReady: false,
            readyWait: 1,
            holdReady: function(hold) {
                if (hold) {
                    jQuery.readyWait++;
                } else {
                    jQuery.ready(true);
                }
            },
            ready: function(wait) {
                if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                    return;
                }
                jQuery.isReady = true;
                if (wait !== true && --jQuery.readyWait > 0) {
                    return;
                }
                readyList.resolveWith(document, [ jQuery ]);
                if (jQuery.fn.triggerHandler) {
                    jQuery(document).triggerHandler("ready");
                    jQuery(document).off("ready");
                }
            }
        });
        function completed() {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);
            jQuery.ready();
        }
        jQuery.ready.promise = function(obj) {
            if (!readyList) {
                readyList = jQuery.Deferred();
                if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
                    window.setTimeout(jQuery.ready);
                } else {
                    document.addEventListener("DOMContentLoaded", completed);
                    window.addEventListener("load", completed);
                }
            }
            return readyList.promise(obj);
        };
        jQuery.ready.promise();
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
            var i = 0, len = elems.length, bulk = key == null;
            if (jQuery.type(key) === "object") {
                chainable = true;
                for (i in key) {
                    access(elems, fn, i, key[i], true, emptyGet, raw);
                }
            } else if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) {
                    raw = true;
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null;
                    } else {
                        bulk = fn;
                        fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value);
                        };
                    }
                }
                if (fn) {
                    for (;i < len; i++) {
                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }
            return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
        };
        var acceptData = function(owner) {
            return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
            this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
            register: function(owner, initial) {
                var value = initial || {};
                if (owner.nodeType) {
                    owner[this.expando] = value;
                } else {
                    Object.defineProperty(owner, this.expando, {
                        value: value,
                        writable: true,
                        configurable: true
                    });
                }
                return owner[this.expando];
            },
            cache: function(owner) {
                if (!acceptData(owner)) {
                    return {};
                }
                var value = owner[this.expando];
                if (!value) {
                    value = {};
                    if (acceptData(owner)) {
                        if (owner.nodeType) {
                            owner[this.expando] = value;
                        } else {
                            Object.defineProperty(owner, this.expando, {
                                value: value,
                                configurable: true
                            });
                        }
                    }
                }
                return value;
            },
            set: function(owner, data, value) {
                var prop, cache = this.cache(owner);
                if (typeof data === "string") {
                    cache[data] = value;
                } else {
                    for (prop in data) {
                        cache[prop] = data[prop];
                    }
                }
                return cache;
            },
            get: function(owner, key) {
                return key === undefined ? this.cache(owner) : owner[this.expando] && owner[this.expando][key];
            },
            access: function(owner, key, value) {
                var stored;
                if (key === undefined || key && typeof key === "string" && value === undefined) {
                    stored = this.get(owner, key);
                    return stored !== undefined ? stored : this.get(owner, jQuery.camelCase(key));
                }
                this.set(owner, key, value);
                return value !== undefined ? value : key;
            },
            remove: function(owner, key) {
                var i, name, camel, cache = owner[this.expando];
                if (cache === undefined) {
                    return;
                }
                if (key === undefined) {
                    this.register(owner);
                } else {
                    if (jQuery.isArray(key)) {
                        name = key.concat(key.map(jQuery.camelCase));
                    } else {
                        camel = jQuery.camelCase(key);
                        if (key in cache) {
                            name = [ key, camel ];
                        } else {
                            name = camel;
                            name = name in cache ? [ name ] : name.match(rnotwhite) || [];
                        }
                    }
                    i = name.length;
                    while (i--) {
                        delete cache[name[i]];
                    }
                }
                if (key === undefined || jQuery.isEmptyObject(cache)) {
                    if (owner.nodeType) {
                        owner[this.expando] = undefined;
                    } else {
                        delete owner[this.expando];
                    }
                }
            },
            hasData: function(owner) {
                var cache = owner[this.expando];
                return cache !== undefined && !jQuery.isEmptyObject(cache);
            }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function dataAttr(elem, key, data) {
            var name;
            if (data === undefined && elem.nodeType === 1) {
                name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
                data = elem.getAttribute(name);
                if (typeof data === "string") {
                    try {
                        data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                    } catch (e) {}
                    dataUser.set(elem, key, data);
                } else {
                    data = undefined;
                }
            }
            return data;
        }
        jQuery.extend({
            hasData: function(elem) {
                return dataUser.hasData(elem) || dataPriv.hasData(elem);
            },
            data: function(elem, name, data) {
                return dataUser.access(elem, name, data);
            },
            removeData: function(elem, name) {
                dataUser.remove(elem, name);
            },
            _data: function(elem, name, data) {
                return dataPriv.access(elem, name, data);
            },
            _removeData: function(elem, name) {
                dataPriv.remove(elem, name);
            }
        });
        jQuery.fn.extend({
            data: function(key, value) {
                var i, name, data, elem = this[0], attrs = elem && elem.attributes;
                if (key === undefined) {
                    if (this.length) {
                        data = dataUser.get(elem);
                        if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                            i = attrs.length;
                            while (i--) {
                                if (attrs[i]) {
                                    name = attrs[i].name;
                                    if (name.indexOf("data-") === 0) {
                                        name = jQuery.camelCase(name.slice(5));
                                        dataAttr(elem, name, data[name]);
                                    }
                                }
                            }
                            dataPriv.set(elem, "hasDataAttrs", true);
                        }
                    }
                    return data;
                }
                if (typeof key === "object") {
                    return this.each(function() {
                        dataUser.set(this, key);
                    });
                }
                return access(this, function(value) {
                    var data, camelKey;
                    if (elem && value === undefined) {
                        data = dataUser.get(elem, key) || dataUser.get(elem, key.replace(rmultiDash, "-$&").toLowerCase());
                        if (data !== undefined) {
                            return data;
                        }
                        camelKey = jQuery.camelCase(key);
                        data = dataUser.get(elem, camelKey);
                        if (data !== undefined) {
                            return data;
                        }
                        data = dataAttr(elem, camelKey, undefined);
                        if (data !== undefined) {
                            return data;
                        }
                        return;
                    }
                    camelKey = jQuery.camelCase(key);
                    this.each(function() {
                        var data = dataUser.get(this, camelKey);
                        dataUser.set(this, camelKey, value);
                        if (key.indexOf("-") > -1 && data !== undefined) {
                            dataUser.set(this, key, value);
                        }
                    });
                }, null, value, arguments.length > 1, null, true);
            },
            removeData: function(key) {
                return this.each(function() {
                    dataUser.remove(this, key);
                });
            }
        });
        jQuery.extend({
            queue: function(elem, type, data) {
                var queue;
                if (elem) {
                    type = (type || "fx") + "queue";
                    queue = dataPriv.get(elem, type);
                    if (data) {
                        if (!queue || jQuery.isArray(data)) {
                            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
                        } else {
                            queue.push(data);
                        }
                    }
                    return queue || [];
                }
            },
            dequeue: function(elem, type) {
                type = type || "fx";
                var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                    jQuery.dequeue(elem, type);
                };
                if (fn === "inprogress") {
                    fn = queue.shift();
                    startLength--;
                }
                if (fn) {
                    if (type === "fx") {
                        queue.unshift("inprogress");
                    }
                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }
                if (!startLength && hooks) {
                    hooks.empty.fire();
                }
            },
            _queueHooks: function(elem, type) {
                var key = type + "queueHooks";
                return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
                    empty: jQuery.Callbacks("once memory").add(function() {
                        dataPriv.remove(elem, [ type + "queue", key ]);
                    })
                });
            }
        });
        jQuery.fn.extend({
            queue: function(type, data) {
                var setter = 2;
                if (typeof type !== "string") {
                    data = type;
                    type = "fx";
                    setter--;
                }
                if (arguments.length < setter) {
                    return jQuery.queue(this[0], type);
                }
                return data === undefined ? this : this.each(function() {
                    var queue = jQuery.queue(this, type, data);
                    jQuery._queueHooks(this, type);
                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            dequeue: function(type) {
                return this.each(function() {
                    jQuery.dequeue(this, type);
                });
            },
            clearQueue: function(type) {
                return this.queue(type || "fx", []);
            },
            promise: function(type, obj) {
                var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                    if (!--count) {
                        defer.resolveWith(elements, [ elements ]);
                    }
                };
                if (typeof type !== "string") {
                    obj = type;
                    type = undefined;
                }
                type = type || "fx";
                while (i--) {
                    tmp = dataPriv.get(elements[i], type + "queueHooks");
                    if (tmp && tmp.empty) {
                        count++;
                        tmp.empty.add(resolve);
                    }
                }
                resolve();
                return defer.promise(obj);
            }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
        var isHidden = function(elem, el) {
            elem = el || elem;
            return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
        };
        function adjustCSS(elem, prop, valueParts, tween) {
            var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function() {
                return tween.cur();
            } : function() {
                return jQuery.css(elem, prop, "");
            }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
            if (initialInUnit && initialInUnit[3] !== unit) {
                unit = unit || initialInUnit[3];
                valueParts = valueParts || [];
                initialInUnit = +initial || 1;
                do {
                    scale = scale || ".5";
                    initialInUnit = initialInUnit / scale;
                    jQuery.style(elem, prop, initialInUnit + unit);
                } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
            }
            if (valueParts) {
                initialInUnit = +initialInUnit || +initial || 0;
                adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
                if (tween) {
                    tween.unit = unit;
                    tween.start = initialInUnit;
                    tween.end = adjusted;
                }
            }
            return adjusted;
        }
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([\w:-]+)/;
        var rscriptType = /^$|\/(?:java|ecma)script/i;
        var wrapMap = {
            option: [ 1, "<select multiple='multiple'>", "</select>" ],
            thead: [ 1, "<table>", "</table>" ],
            col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
            tr: [ 2, "<table><tbody>", "</tbody></table>" ],
            td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
            _default: [ 0, "", "" ]
        };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        function getAll(context, tag) {
            var ret = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== "undefined" ? context.querySelectorAll(tag || "*") : [];
            return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], ret) : ret;
        }
        function setGlobalEval(elems, refElements) {
            var i = 0, l = elems.length;
            for (;i < l; i++) {
                dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
            }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts, selection, ignored) {
            var elem, tmp, tag, wrap, contains, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
            for (;i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem);
                    } else if (!rhtml.test(elem)) {
                        nodes.push(context.createTextNode(elem));
                    } else {
                        tmp = tmp || fragment.appendChild(context.createElement("div"));
                        tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase();
                        wrap = wrapMap[tag] || wrapMap._default;
                        tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                        j = wrap[0];
                        while (j--) {
                            tmp = tmp.lastChild;
                        }
                        jQuery.merge(nodes, tmp.childNodes);
                        tmp = fragment.firstChild;
                        tmp.textContent = "";
                    }
                }
            }
            fragment.textContent = "";
            i = 0;
            while (elem = nodes[i++]) {
                if (selection && jQuery.inArray(elem, selection) > -1) {
                    if (ignored) {
                        ignored.push(elem);
                    }
                    continue;
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(fragment.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp);
                }
                if (scripts) {
                    j = 0;
                    while (elem = tmp[j++]) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem);
                        }
                    }
                }
            }
            return fragment;
        }
        (function() {
            var fragment = document.createDocumentFragment(), div = fragment.appendChild(document.createElement("div")), input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("checked", "checked");
            input.setAttribute("name", "t");
            div.appendChild(input);
            support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
            div.innerHTML = "<textarea>x</textarea>";
            support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        })();
        var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
            return true;
        }
        function returnFalse() {
            return false;
        }
        function safeActiveElement() {
            try {
                return document.activeElement;
            } catch (err) {}
        }
        function on(elem, types, selector, data, fn, one) {
            var origFn, type;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined;
                }
                for (type in types) {
                    on(elem, type, selector, data, types[type], one);
                }
                return elem;
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined;
            } else if (fn == null) {
                if (typeof selector === "string") {
                    fn = data;
                    data = undefined;
                } else {
                    fn = data;
                    data = selector;
                    selector = undefined;
                }
            }
            if (fn === false) {
                fn = returnFalse;
            } else if (!fn) {
                return elem;
            }
            if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments);
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
            }
            return elem.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        }
        jQuery.event = {
            global: {},
            add: function(elem, types, handler, data, selector) {
                var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
                if (!elemData) {
                    return;
                }
                if (handler.handler) {
                    handleObjIn = handler;
                    handler = handleObjIn.handler;
                    selector = handleObjIn.selector;
                }
                if (!handler.guid) {
                    handler.guid = jQuery.guid++;
                }
                if (!(events = elemData.events)) {
                    events = elemData.events = {};
                }
                if (!(eventHandle = elemData.handle)) {
                    eventHandle = elemData.handle = function(e) {
                        return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
                    };
                }
                types = (types || "").match(rnotwhite) || [ "" ];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    special = jQuery.event.special[type] || {};
                    handleObj = jQuery.extend({
                        type: type,
                        origType: origType,
                        data: data,
                        handler: handler,
                        guid: handler.guid,
                        selector: selector,
                        needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                        namespace: namespaces.join(".")
                    }, handleObjIn);
                    if (!(handlers = events[type])) {
                        handlers = events[type] = [];
                        handlers.delegateCount = 0;
                        if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                            if (elem.addEventListener) {
                                elem.addEventListener(type, eventHandle);
                            }
                        }
                    }
                    if (special.add) {
                        special.add.call(elem, handleObj);
                        if (!handleObj.handler.guid) {
                            handleObj.handler.guid = handler.guid;
                        }
                    }
                    if (selector) {
                        handlers.splice(handlers.delegateCount++, 0, handleObj);
                    } else {
                        handlers.push(handleObj);
                    }
                    jQuery.event.global[type] = true;
                }
            },
            remove: function(elem, types, handler, selector, mappedTypes) {
                var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
                if (!elemData || !(events = elemData.events)) {
                    return;
                }
                types = (types || "").match(rnotwhite) || [ "" ];
                t = types.length;
                while (t--) {
                    tmp = rtypenamespace.exec(types[t]) || [];
                    type = origType = tmp[1];
                    namespaces = (tmp[2] || "").split(".").sort();
                    if (!type) {
                        for (type in events) {
                            jQuery.event.remove(elem, type + types[t], handler, selector, true);
                        }
                        continue;
                    }
                    special = jQuery.event.special[type] || {};
                    type = (selector ? special.delegateType : special.bindType) || type;
                    handlers = events[type] || [];
                    tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                    origCount = j = handlers.length;
                    while (j--) {
                        handleObj = handlers[j];
                        if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                            handlers.splice(j, 1);
                            if (handleObj.selector) {
                                handlers.delegateCount--;
                            }
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                    }
                    if (origCount && !handlers.length) {
                        if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                            jQuery.removeEvent(elem, type, elemData.handle);
                        }
                        delete events[type];
                    }
                }
                if (jQuery.isEmptyObject(events)) {
                    dataPriv.remove(elem, "handle events");
                }
            },
            dispatch: function(event) {
                event = jQuery.event.fix(event);
                var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (dataPriv.get(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
                args[0] = event;
                event.delegateTarget = this;
                if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                    return;
                }
                handlerQueue = jQuery.event.handlers.call(this, event, handlers);
                i = 0;
                while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                    event.currentTarget = matched.elem;
                    j = 0;
                    while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                        if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
                            event.handleObj = handleObj;
                            event.data = handleObj.data;
                            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                            if (ret !== undefined) {
                                if ((event.result = ret) === false) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                            }
                        }
                    }
                }
                if (special.postDispatch) {
                    special.postDispatch.call(this, event);
                }
                return event.result;
            },
            handlers: function(event, handlers) {
                var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
                if (delegateCount && cur.nodeType && (event.type !== "click" || isNaN(event.button) || event.button < 1)) {
                    for (;cur !== this; cur = cur.parentNode || this) {
                        if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                            matches = [];
                            for (i = 0; i < delegateCount; i++) {
                                handleObj = handlers[i];
                                sel = handleObj.selector + " ";
                                if (matches[sel] === undefined) {
                                    matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [ cur ]).length;
                                }
                                if (matches[sel]) {
                                    matches.push(handleObj);
                                }
                            }
                            if (matches.length) {
                                handlerQueue.push({
                                    elem: cur,
                                    handlers: matches
                                });
                            }
                        }
                    }
                }
                if (delegateCount < handlers.length) {
                    handlerQueue.push({
                        elem: this,
                        handlers: handlers.slice(delegateCount)
                    });
                }
                return handlerQueue;
            },
            props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " + "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(event, original) {
                    if (event.which == null) {
                        event.which = original.charCode != null ? original.charCode : original.keyCode;
                    }
                    return event;
                }
            },
            mouseHooks: {
                props: ("button buttons clientX clientY offsetX offsetY pageX pageY " + "screenX screenY toElement").split(" "),
                filter: function(event, original) {
                    var eventDoc, doc, body, button = original.button;
                    if (event.pageX == null && original.clientX != null) {
                        eventDoc = event.target.ownerDocument || document;
                        doc = eventDoc.documentElement;
                        body = eventDoc.body;
                        event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                        event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
                    }
                    if (!event.which && button !== undefined) {
                        event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
                    }
                    return event;
                }
            },
            fix: function(event) {
                if (event[jQuery.expando]) {
                    return event;
                }
                var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
                if (!fixHook) {
                    this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
                }
                copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
                event = new jQuery.Event(originalEvent);
                i = copy.length;
                while (i--) {
                    prop = copy[i];
                    event[prop] = originalEvent[prop];
                }
                if (!event.target) {
                    event.target = document;
                }
                if (event.target.nodeType === 3) {
                    event.target = event.target.parentNode;
                }
                return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
            },
            special: {
                load: {
                    noBubble: true
                },
                focus: {
                    trigger: function() {
                        if (this !== safeActiveElement() && this.focus) {
                            this.focus();
                            return false;
                        }
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        if (this === safeActiveElement() && this.blur) {
                            this.blur();
                            return false;
                        }
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        if (this.type === "checkbox" && this.click && jQuery.nodeName(this, "input")) {
                            this.click();
                            return false;
                        }
                    },
                    _default: function(event) {
                        return jQuery.nodeName(event.target, "a");
                    }
                },
                beforeunload: {
                    postDispatch: function(event) {
                        if (event.result !== undefined && event.originalEvent) {
                            event.originalEvent.returnValue = event.result;
                        }
                    }
                }
            }
        };
        jQuery.removeEvent = function(elem, type, handle) {
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle);
            }
        };
        jQuery.Event = function(src, props) {
            if (!(this instanceof jQuery.Event)) {
                return new jQuery.Event(src, props);
            }
            if (src && src.type) {
                this.originalEvent = src;
                this.type = src.type;
                this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse;
            } else {
                this.type = src;
            }
            if (props) {
                jQuery.extend(this, props);
            }
            this.timeStamp = src && src.timeStamp || jQuery.now();
            this[jQuery.expando] = true;
        };
        jQuery.Event.prototype = {
            constructor: jQuery.Event,
            isDefaultPrevented: returnFalse,
            isPropagationStopped: returnFalse,
            isImmediatePropagationStopped: returnFalse,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = returnTrue;
                if (e) {
                    e.preventDefault();
                }
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = returnTrue;
                if (e) {
                    e.stopPropagation();
                }
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = returnTrue;
                if (e) {
                    e.stopImmediatePropagation();
                }
                this.stopPropagation();
            }
        };
        jQuery.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(orig, fix) {
            jQuery.event.special[orig] = {
                delegateType: fix,
                bindType: fix,
                handle: function(event) {
                    var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                    if (!related || related !== target && !jQuery.contains(target, related)) {
                        event.type = handleObj.origType;
                        ret = handleObj.handler.apply(this, arguments);
                        event.type = fix;
                    }
                    return ret;
                }
            };
        });
        jQuery.fn.extend({
            on: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn);
            },
            one: function(types, selector, data, fn) {
                return on(this, types, selector, data, fn, 1);
            },
            off: function(types, selector, fn) {
                var handleObj, type;
                if (types && types.preventDefault && types.handleObj) {
                    handleObj = types.handleObj;
                    jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                    return this;
                }
                if (typeof types === "object") {
                    for (type in types) {
                        this.off(type, selector, types[type]);
                    }
                    return this;
                }
                if (selector === false || typeof selector === "function") {
                    fn = selector;
                    selector = undefined;
                }
                if (fn === false) {
                    fn = returnFalse;
                }
                return this.each(function() {
                    jQuery.event.remove(this, types, fn, selector);
                });
            }
        });
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function manipulationTarget(elem, content) {
            return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
        }
        function disableScript(elem) {
            elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
            return elem;
        }
        function restoreScript(elem) {
            var match = rscriptTypeMasked.exec(elem.type);
            if (match) {
                elem.type = match[1];
            } else {
                elem.removeAttribute("type");
            }
            return elem;
        }
        function cloneCopyEvent(src, dest) {
            var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
            if (dest.nodeType !== 1) {
                return;
            }
            if (dataPriv.hasData(src)) {
                pdataOld = dataPriv.access(src);
                pdataCur = dataPriv.set(dest, pdataOld);
                events = pdataOld.events;
                if (events) {
                    delete pdataCur.handle;
                    pdataCur.events = {};
                    for (type in events) {
                        for (i = 0, l = events[type].length; i < l; i++) {
                            jQuery.event.add(dest, type, events[type][i]);
                        }
                    }
                }
            }
            if (dataUser.hasData(src)) {
                udataOld = dataUser.access(src);
                udataCur = jQuery.extend({}, udataOld);
                dataUser.set(dest, udataCur);
            }
        }
        function fixInput(src, dest) {
            var nodeName = dest.nodeName.toLowerCase();
            if (nodeName === "input" && rcheckableType.test(src.type)) {
                dest.checked = src.checked;
            } else if (nodeName === "input" || nodeName === "textarea") {
                dest.defaultValue = src.defaultValue;
            }
        }
        function domManip(collection, args, callback, ignored) {
            args = concat.apply([], args);
            var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
                return collection.each(function(index) {
                    var self = collection.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html());
                    }
                    domManip(self, args, callback, ignored);
                });
            }
            if (l) {
                fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first;
                }
                if (first || ignored) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (;i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"));
                            }
                        }
                        callback.call(collection[i], node, i);
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src);
                                    }
                                } else {
                                    jQuery.globalEval(node.textContent.replace(rcleanScript, ""));
                                }
                            }
                        }
                    }
                }
            }
            return collection;
        }
        function remove(elem, selector, keepData) {
            var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
            for (;(node = nodes[i]) != null; i++) {
                if (!keepData && node.nodeType === 1) {
                    jQuery.cleanData(getAll(node));
                }
                if (node.parentNode) {
                    if (keepData && jQuery.contains(node.ownerDocument, node)) {
                        setGlobalEval(getAll(node, "script"));
                    }
                    node.parentNode.removeChild(node);
                }
            }
            return elem;
        }
        jQuery.extend({
            htmlPrefilter: function(html) {
                return html.replace(rxhtmlTag, "<$1></$2>");
            },
            clone: function(elem, dataAndEvents, deepDataAndEvents) {
                var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
                if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                    destElements = getAll(clone);
                    srcElements = getAll(elem);
                    for (i = 0, l = srcElements.length; i < l; i++) {
                        fixInput(srcElements[i], destElements[i]);
                    }
                }
                if (dataAndEvents) {
                    if (deepDataAndEvents) {
                        srcElements = srcElements || getAll(elem);
                        destElements = destElements || getAll(clone);
                        for (i = 0, l = srcElements.length; i < l; i++) {
                            cloneCopyEvent(srcElements[i], destElements[i]);
                        }
                    } else {
                        cloneCopyEvent(elem, clone);
                    }
                }
                destElements = getAll(clone, "script");
                if (destElements.length > 0) {
                    setGlobalEval(destElements, !inPage && getAll(elem, "script"));
                }
                return clone;
            },
            cleanData: function(elems) {
                var data, elem, type, special = jQuery.event.special, i = 0;
                for (;(elem = elems[i]) !== undefined; i++) {
                    if (acceptData(elem)) {
                        if (data = elem[dataPriv.expando]) {
                            if (data.events) {
                                for (type in data.events) {
                                    if (special[type]) {
                                        jQuery.event.remove(elem, type);
                                    } else {
                                        jQuery.removeEvent(elem, type, data.handle);
                                    }
                                }
                            }
                            elem[dataPriv.expando] = undefined;
                        }
                        if (elem[dataUser.expando]) {
                            elem[dataUser.expando] = undefined;
                        }
                    }
                }
            }
        });
        jQuery.fn.extend({
            domManip: domManip,
            detach: function(selector) {
                return remove(this, selector, true);
            },
            remove: function(selector) {
                return remove(this, selector);
            },
            text: function(value) {
                return access(this, function(value) {
                    return value === undefined ? jQuery.text(this) : this.empty().each(function() {
                        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                            this.textContent = value;
                        }
                    });
                }, null, value, arguments.length);
            },
            append: function() {
                return domManip(this, arguments, function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.appendChild(elem);
                    }
                });
            },
            prepend: function() {
                return domManip(this, arguments, function(elem) {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        var target = manipulationTarget(this, elem);
                        target.insertBefore(elem, target.firstChild);
                    }
                });
            },
            before: function() {
                return domManip(this, arguments, function(elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this);
                    }
                });
            },
            after: function() {
                return domManip(this, arguments, function(elem) {
                    if (this.parentNode) {
                        this.parentNode.insertBefore(elem, this.nextSibling);
                    }
                });
            },
            empty: function() {
                var elem, i = 0;
                for (;(elem = this[i]) != null; i++) {
                    if (elem.nodeType === 1) {
                        jQuery.cleanData(getAll(elem, false));
                        elem.textContent = "";
                    }
                }
                return this;
            },
            clone: function(dataAndEvents, deepDataAndEvents) {
                dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
                deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                return this.map(function() {
                    return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
                });
            },
            html: function(value) {
                return access(this, function(value) {
                    var elem = this[0] || {}, i = 0, l = this.length;
                    if (value === undefined && elem.nodeType === 1) {
                        return elem.innerHTML;
                    }
                    if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()]) {
                        value = jQuery.htmlPrefilter(value);
                        try {
                            for (;i < l; i++) {
                                elem = this[i] || {};
                                if (elem.nodeType === 1) {
                                    jQuery.cleanData(getAll(elem, false));
                                    elem.innerHTML = value;
                                }
                            }
                            elem = 0;
                        } catch (e) {}
                    }
                    if (elem) {
                        this.empty().append(value);
                    }
                }, null, value, arguments.length);
            },
            replaceWith: function() {
                var ignored = [];
                return domManip(this, arguments, function(elem) {
                    var parent = this.parentNode;
                    if (jQuery.inArray(this, ignored) < 0) {
                        jQuery.cleanData(getAll(this));
                        if (parent) {
                            parent.replaceChild(elem, this);
                        }
                    }
                }, ignored);
            }
        });
        jQuery.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(name, original) {
            jQuery.fn[name] = function(selector) {
                var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
                for (;i <= last; i++) {
                    elems = i === last ? this : this.clone(true);
                    jQuery(insert[i])[original](elems);
                    push.apply(ret, elems.get());
                }
                return this.pushStack(ret);
            };
        });
        var iframe, elemdisplay = {
            HTML: "block",
            BODY: "block"
        };
        function actualDisplay(name, doc) {
            var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], "display");
            elem.detach();
            return display;
        }
        function defaultDisplay(nodeName) {
            var doc = document, display = elemdisplay[nodeName];
            if (!display) {
                display = actualDisplay(nodeName, doc);
                if (display === "none" || !display) {
                    iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                    doc = iframe[0].contentDocument;
                    doc.write();
                    doc.close();
                    display = actualDisplay(nodeName, doc);
                    iframe.detach();
                }
                elemdisplay[nodeName] = display;
            }
            return display;
        }
        var rmargin = /^margin/;
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function(elem) {
            var view = elem.ownerDocument.defaultView;
            if (!view || !view.opener) {
                view = window;
            }
            return view.getComputedStyle(elem);
        };
        var swap = function(elem, options, callback, args) {
            var ret, name, old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        };
        var documentElement = document.documentElement;
        (function() {
            var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal, container = document.createElement("div"), div = document.createElement("div");
            if (!div.style) {
                return;
            }
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = div.style.backgroundClip === "content-box";
            container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" + "padding:0;margin-top:1px;position:absolute";
            container.appendChild(div);
            function computeStyleTests() {
                div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" + "position:relative;display:block;" + "margin:auto;border:1px;padding:1px;" + "top:1%;width:50%";
                div.innerHTML = "";
                documentElement.appendChild(container);
                var divStyle = window.getComputedStyle(div);
                pixelPositionVal = divStyle.top !== "1%";
                reliableMarginLeftVal = divStyle.marginLeft === "2px";
                boxSizingReliableVal = divStyle.width === "4px";
                div.style.marginRight = "50%";
                pixelMarginRightVal = divStyle.marginRight === "4px";
                documentElement.removeChild(container);
            }
            jQuery.extend(support, {
                pixelPosition: function() {
                    computeStyleTests();
                    return pixelPositionVal;
                },
                boxSizingReliable: function() {
                    if (boxSizingReliableVal == null) {
                        computeStyleTests();
                    }
                    return boxSizingReliableVal;
                },
                pixelMarginRight: function() {
                    if (boxSizingReliableVal == null) {
                        computeStyleTests();
                    }
                    return pixelMarginRightVal;
                },
                reliableMarginLeft: function() {
                    if (boxSizingReliableVal == null) {
                        computeStyleTests();
                    }
                    return reliableMarginLeftVal;
                },
                reliableMarginRight: function() {
                    var ret, marginDiv = div.appendChild(document.createElement("div"));
                    marginDiv.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;" + "display:block;margin:0;border:0;padding:0";
                    marginDiv.style.marginRight = marginDiv.style.width = "0";
                    div.style.width = "1px";
                    documentElement.appendChild(container);
                    ret = !parseFloat(window.getComputedStyle(marginDiv).marginRight);
                    documentElement.removeChild(container);
                    div.removeChild(marginDiv);
                    return ret;
                }
            });
        })();
        function curCSS(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
            if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }
            if (computed) {
                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }
            return ret !== undefined ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
            return {
                get: function() {
                    if (conditionFn()) {
                        delete this.get;
                        return;
                    }
                    return (this.get = hookFn).apply(this, arguments);
                }
            };
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ], emptyStyle = document.createElement("div").style;
        function vendorPropName(name) {
            if (name in emptyStyle) {
                return name;
            }
            var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
            while (i--) {
                name = cssPrefixes[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        }
        function setPositiveNumber(elem, value, subtract) {
            var matches = rcssNum.exec(value);
            return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
            var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0, val = 0;
            for (;i < 4; i += 2) {
                if (extra === "margin") {
                    val += jQuery.css(elem, extra + cssExpand[i], true, styles);
                }
                if (isBorderBox) {
                    if (extra === "content") {
                        val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    }
                    if (extra !== "margin") {
                        val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                } else {
                    val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                    if (extra !== "padding") {
                        val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                    }
                }
            }
            return val;
        }
        function getWidthOrHeight(elem, name, extra) {
            var valueIsBorderBox = true, val = name === "width" ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
            if (document.msFullscreenElement && window.top !== window) {
                if (elem.getClientRects().length) {
                    val = Math.round(elem.getBoundingClientRect()[name] * 100);
                }
            }
            if (val <= 0 || val == null) {
                val = curCSS(elem, name, styles);
                if (val < 0 || val == null) {
                    val = elem.style[name];
                }
                if (rnumnonpx.test(val)) {
                    return val;
                }
                valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
                val = parseFloat(val) || 0;
            }
            return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
        }
        function showHide(elements, show) {
            var display, elem, hidden, values = [], index = 0, length = elements.length;
            for (;index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                values[index] = dataPriv.get(elem, "olddisplay");
                display = elem.style.display;
                if (show) {
                    if (!values[index] && display === "none") {
                        elem.style.display = "";
                    }
                    if (elem.style.display === "" && isHidden(elem)) {
                        values[index] = dataPriv.access(elem, "olddisplay", defaultDisplay(elem.nodeName));
                    }
                } else {
                    hidden = isHidden(elem);
                    if (display !== "none" || !hidden) {
                        dataPriv.set(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                    }
                }
            }
            for (index = 0; index < length; index++) {
                elem = elements[index];
                if (!elem.style) {
                    continue;
                }
                if (!show || elem.style.display === "none" || elem.style.display === "") {
                    elem.style.display = show ? values[index] || "" : "none";
                }
            }
            return elements;
        }
        jQuery.extend({
            cssHooks: {
                opacity: {
                    get: function(elem, computed) {
                        if (computed) {
                            var ret = curCSS(elem, "opacity");
                            return ret === "" ? "1" : ret;
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: true,
                columnCount: true,
                fillOpacity: true,
                flexGrow: true,
                flexShrink: true,
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                order: true,
                orphans: true,
                widows: true,
                zIndex: true,
                zoom: true
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(elem, name, value, extra) {
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                    return;
                }
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (value !== undefined) {
                    type = typeof value;
                    if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                        value = adjustCSS(elem, name, ret);
                        type = "number";
                    }
                    if (value == null || value !== value) {
                        return;
                    }
                    if (type === "number") {
                        value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                    }
                    if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                        style[name] = "inherit";
                    }
                    if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                        style[name] = value;
                    }
                } else {
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                        return ret;
                    }
                    return style[name];
                }
            },
            css: function(elem, name, extra, styles) {
                var val, num, hooks, origName = jQuery.camelCase(name);
                name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
                if (hooks && "get" in hooks) {
                    val = hooks.get(elem, true, extra);
                }
                if (val === undefined) {
                    val = curCSS(elem, name, styles);
                }
                if (val === "normal" && name in cssNormalTransform) {
                    val = cssNormalTransform[name];
                }
                if (extra === "" || extra) {
                    num = parseFloat(val);
                    return extra === true || isFinite(num) ? num || 0 : val;
                }
                return val;
            }
        });
        jQuery.each([ "height", "width" ], function(i, name) {
            jQuery.cssHooks[name] = {
                get: function(elem, computed, extra) {
                    if (computed) {
                        return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra);
                        }) : getWidthOrHeight(elem, name, extra);
                    }
                },
                set: function(elem, value, extra) {
                    var matches, styles = extra && getStyles(elem), subtract = extra && augmentWidthOrHeight(elem, name, extra, jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles);
                    if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
                        elem.style[name] = value;
                        value = jQuery.css(elem, name);
                    }
                    return setPositiveNumber(elem, value, subtract);
                }
            };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, computed) {
            if (computed) {
                return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
                    marginLeft: 0
                }, function() {
                    return elem.getBoundingClientRect().left;
                })) + "px";
            }
        });
        jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
            if (computed) {
                return swap(elem, {
                    display: "inline-block"
                }, curCSS, [ elem, "marginRight" ]);
            }
        });
        jQuery.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(prefix, suffix) {
            jQuery.cssHooks[prefix + suffix] = {
                expand: function(value) {
                    var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [ value ];
                    for (;i < 4; i++) {
                        expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                    }
                    return expanded;
                }
            };
            if (!rmargin.test(prefix)) {
                jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
            }
        });
        jQuery.fn.extend({
            css: function(name, value) {
                return access(this, function(elem, name, value) {
                    var styles, len, map = {}, i = 0;
                    if (jQuery.isArray(name)) {
                        styles = getStyles(elem);
                        len = name.length;
                        for (;i < len; i++) {
                            map[name[i]] = jQuery.css(elem, name[i], false, styles);
                        }
                        return map;
                    }
                    return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
                }, name, value, arguments.length > 1);
            },
            show: function() {
                return showHide(this, true);
            },
            hide: function() {
                return showHide(this);
            },
            toggle: function(state) {
                if (typeof state === "boolean") {
                    return state ? this.show() : this.hide();
                }
                return this.each(function() {
                    if (isHidden(this)) {
                        jQuery(this).show();
                    } else {
                        jQuery(this).hide();
                    }
                });
            }
        });
        function Tween(elem, options, prop, end, easing) {
            return new Tween.prototype.init(elem, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
            constructor: Tween,
            init: function(elem, options, prop, end, easing, unit) {
                this.elem = elem;
                this.prop = prop;
                this.easing = easing || jQuery.easing._default;
                this.options = options;
                this.start = this.now = this.cur();
                this.end = end;
                this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
            },
            cur: function() {
                var hooks = Tween.propHooks[this.prop];
                return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
            },
            run: function(percent) {
                var eased, hooks = Tween.propHooks[this.prop];
                if (this.options.duration) {
                    this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
                } else {
                    this.pos = eased = percent;
                }
                this.now = (this.end - this.start) * eased + this.start;
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this);
                }
                if (hooks && hooks.set) {
                    hooks.set(this);
                } else {
                    Tween.propHooks._default.set(this);
                }
                return this;
            }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
            _default: {
                get: function(tween) {
                    var result;
                    if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                        return tween.elem[tween.prop];
                    }
                    result = jQuery.css(tween.elem, tween.prop, "");
                    return !result || result === "auto" ? 0 : result;
                },
                set: function(tween) {
                    if (jQuery.fx.step[tween.prop]) {
                        jQuery.fx.step[tween.prop](tween);
                    } else if (tween.elem.nodeType === 1 && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                    } else {
                        tween.elem[tween.prop] = tween.now;
                    }
                }
            }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
            set: function(tween) {
                if (tween.elem.nodeType && tween.elem.parentNode) {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        };
        jQuery.easing = {
            linear: function(p) {
                return p;
            },
            swing: function(p) {
                return .5 - Math.cos(p * Math.PI) / 2;
            },
            _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function createFxNow() {
            window.setTimeout(function() {
                fxNow = undefined;
            });
            return fxNow = jQuery.now();
        }
        function genFx(type, includeWidth) {
            var which, i = 0, attrs = {
                height: type
            };
            includeWidth = includeWidth ? 1 : 0;
            for (;i < 4; i += 2 - includeWidth) {
                which = cssExpand[i];
                attrs["margin" + which] = attrs["padding" + which] = type;
            }
            if (includeWidth) {
                attrs.opacity = attrs.width = type;
            }
            return attrs;
        }
        function createTween(value, prop, animation) {
            var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
            for (;index < length; index++) {
                if (tween = collection[index].call(animation, prop, value)) {
                    return tween;
                }
            }
        }
        function defaultPrefilter(elem, props, opts) {
            var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = dataPriv.get(elem, "fxshow");
            if (!opts.queue) {
                hooks = jQuery._queueHooks(elem, "fx");
                if (hooks.unqueued == null) {
                    hooks.unqueued = 0;
                    oldfire = hooks.empty.fire;
                    hooks.empty.fire = function() {
                        if (!hooks.unqueued) {
                            oldfire();
                        }
                    };
                }
                hooks.unqueued++;
                anim.always(function() {
                    anim.always(function() {
                        hooks.unqueued--;
                        if (!jQuery.queue(elem, "fx").length) {
                            hooks.empty.fire();
                        }
                    });
                });
            }
            if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
                opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
                display = jQuery.css(elem, "display");
                checkDisplay = display === "none" ? dataPriv.get(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
                if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                    style.display = "inline-block";
                }
            }
            if (opts.overflow) {
                style.overflow = "hidden";
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
            for (prop in props) {
                value = props[prop];
                if (rfxtypes.exec(value)) {
                    delete props[prop];
                    toggle = toggle || value === "toggle";
                    if (value === (hidden ? "hide" : "show")) {
                        if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                            hidden = true;
                        } else {
                            continue;
                        }
                    }
                    orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
                } else {
                    display = undefined;
                }
            }
            if (!jQuery.isEmptyObject(orig)) {
                if (dataShow) {
                    if ("hidden" in dataShow) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access(elem, "fxshow", {});
                }
                if (toggle) {
                    dataShow.hidden = !hidden;
                }
                if (hidden) {
                    jQuery(elem).show();
                } else {
                    anim.done(function() {
                        jQuery(elem).hide();
                    });
                }
                anim.done(function() {
                    var prop;
                    dataPriv.remove(elem, "fxshow");
                    for (prop in orig) {
                        jQuery.style(elem, prop, orig[prop]);
                    }
                });
                for (prop in orig) {
                    tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                    if (!(prop in dataShow)) {
                        dataShow[prop] = tween.start;
                        if (hidden) {
                            tween.end = tween.start;
                            tween.start = prop === "width" || prop === "height" ? 1 : 0;
                        }
                    }
                }
            } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
                style.display = display;
            }
        }
        function propFilter(props, specialEasing) {
            var index, name, easing, value, hooks;
            for (index in props) {
                name = jQuery.camelCase(index);
                easing = specialEasing[name];
                value = props[index];
                if (jQuery.isArray(value)) {
                    easing = value[1];
                    value = props[index] = value[0];
                }
                if (index !== name) {
                    props[name] = value;
                    delete props[index];
                }
                hooks = jQuery.cssHooks[name];
                if (hooks && "expand" in hooks) {
                    value = hooks.expand(value);
                    delete props[name];
                    for (index in value) {
                        if (!(index in props)) {
                            props[index] = value[index];
                            specialEasing[index] = easing;
                        }
                    }
                } else {
                    specialEasing[name] = easing;
                }
            }
        }
        function Animation(elem, properties, options) {
            var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
                delete tick.elem;
            }), tick = function() {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
                for (;index < length; index++) {
                    animation.tweens[index].run(percent);
                }
                deferred.notifyWith(elem, [ animation, percent, remaining ]);
                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [ animation ]);
                    return false;
                }
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (;index < length; index++) {
                        animation.tweens[index].run(1);
                    }
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [ animation, 1, 0 ]);
                        deferred.resolveWith(elem, [ animation, gotoEnd ]);
                    } else {
                        deferred.rejectWith(elem, [ animation, gotoEnd ]);
                    }
                    return this;
                }
            }), props = animation.props;
            propFilter(props, animation.opts.specialEasing);
            for (;index < length; index++) {
                result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
                if (result) {
                    if (jQuery.isFunction(result.stop)) {
                        jQuery._queueHooks(animation.elem, animation.opts.queue).stop = jQuery.proxy(result.stop, result);
                    }
                    return result;
                }
            }
            jQuery.map(props, createTween, animation);
            if (jQuery.isFunction(animation.opts.start)) {
                animation.opts.start.call(elem, animation);
            }
            jQuery.fx.timer(jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            }));
            return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        }
        jQuery.Animation = jQuery.extend(Animation, {
            tweeners: {
                "*": [ function(prop, value) {
                    var tween = this.createTween(prop, value);
                    adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                    return tween;
                } ]
            },
            tweener: function(props, callback) {
                if (jQuery.isFunction(props)) {
                    callback = props;
                    props = [ "*" ];
                } else {
                    props = props.match(rnotwhite);
                }
                var prop, index = 0, length = props.length;
                for (;index < length; index++) {
                    prop = props[index];
                    Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                    Animation.tweeners[prop].unshift(callback);
                }
            },
            prefilters: [ defaultPrefilter ],
            prefilter: function(callback, prepend) {
                if (prepend) {
                    Animation.prefilters.unshift(callback);
                } else {
                    Animation.prefilters.push(callback);
                }
            }
        });
        jQuery.speed = function(speed, easing, fn) {
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            if (opt.queue == null || opt.queue === true) {
                opt.queue = "fx";
            }
            opt.old = opt.complete;
            opt.complete = function() {
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
                if (opt.queue) {
                    jQuery.dequeue(this, opt.queue);
                }
            };
            return opt;
        };
        jQuery.fn.extend({
            fadeTo: function(speed, to, easing, callback) {
                return this.filter(isHidden).css("opacity", 0).show().end().animate({
                    opacity: to
                }, speed, easing, callback);
            },
            animate: function(prop, speed, easing, callback) {
                var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || dataPriv.get(this, "finish")) {
                        anim.stop(true);
                    }
                };
                doAnimation.finish = doAnimation;
                return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
            },
            stop: function(type, clearQueue, gotoEnd) {
                var stopQueue = function(hooks) {
                    var stop = hooks.stop;
                    delete hooks.stop;
                    stop(gotoEnd);
                };
                if (typeof type !== "string") {
                    gotoEnd = clearQueue;
                    clearQueue = type;
                    type = undefined;
                }
                if (clearQueue && type !== false) {
                    this.queue(type || "fx", []);
                }
                return this.each(function() {
                    var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
                    if (index) {
                        if (data[index] && data[index].stop) {
                            stopQueue(data[index]);
                        }
                    } else {
                        for (index in data) {
                            if (data[index] && data[index].stop && rrun.test(index)) {
                                stopQueue(data[index]);
                            }
                        }
                    }
                    for (index = timers.length; index--; ) {
                        if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                            timers[index].anim.stop(gotoEnd);
                            dequeue = false;
                            timers.splice(index, 1);
                        }
                    }
                    if (dequeue || !gotoEnd) {
                        jQuery.dequeue(this, type);
                    }
                });
            },
            finish: function(type) {
                if (type !== false) {
                    type = type || "fx";
                }
                return this.each(function() {
                    var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                    data.finish = true;
                    jQuery.queue(this, type, []);
                    if (hooks && hooks.stop) {
                        hooks.stop.call(this, true);
                    }
                    for (index = timers.length; index--; ) {
                        if (timers[index].elem === this && timers[index].queue === type) {
                            timers[index].anim.stop(true);
                            timers.splice(index, 1);
                        }
                    }
                    for (index = 0; index < length; index++) {
                        if (queue[index] && queue[index].finish) {
                            queue[index].finish.call(this);
                        }
                    }
                    delete data.finish;
                });
            }
        });
        jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
            var cssFn = jQuery.fn[name];
            jQuery.fn[name] = function(speed, easing, callback) {
                return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
            };
        });
        jQuery.each({
            slideDown: genFx("show"),
            slideUp: genFx("hide"),
            slideToggle: genFx("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(name, props) {
            jQuery.fn[name] = function(speed, easing, callback) {
                return this.animate(props, speed, easing, callback);
            };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
            var timer, i = 0, timers = jQuery.timers;
            fxNow = jQuery.now();
            for (;i < timers.length; i++) {
                timer = timers[i];
                if (!timer() && timers[i] === timer) {
                    timers.splice(i--, 1);
                }
            }
            if (!timers.length) {
                jQuery.fx.stop();
            }
            fxNow = undefined;
        };
        jQuery.fx.timer = function(timer) {
            jQuery.timers.push(timer);
            if (timer()) {
                jQuery.fx.start();
            } else {
                jQuery.timers.pop();
            }
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
            if (!timerId) {
                timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
            }
        };
        jQuery.fx.stop = function() {
            window.clearInterval(timerId);
            timerId = null;
        };
        jQuery.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        };
        jQuery.fn.delay = function(time, type) {
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            return this.queue(type, function(next, hooks) {
                var timeout = window.setTimeout(next, time);
                hooks.stop = function() {
                    window.clearTimeout(timeout);
                };
            });
        };
        (function() {
            var input = document.createElement("input"), select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
            input.type = "checkbox";
            support.checkOn = input.value !== "";
            support.optSelected = opt.selected;
            select.disabled = true;
            support.optDisabled = !opt.disabled;
            input = document.createElement("input");
            input.value = "t";
            input.type = "radio";
            support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
            attr: function(name, value) {
                return access(this, jQuery.attr, name, value, arguments.length > 1);
            },
            removeAttr: function(name) {
                return this.each(function() {
                    jQuery.removeAttr(this, name);
                });
            }
        });
        jQuery.extend({
            attr: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (typeof elem.getAttribute === "undefined") {
                    return jQuery.prop(elem, name, value);
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = name.toLowerCase();
                    hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
                }
                if (value !== undefined) {
                    if (value === null) {
                        jQuery.removeAttr(elem, name);
                        return;
                    }
                    if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    elem.setAttribute(name, value + "");
                    return value;
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                ret = jQuery.find.attr(elem, name);
                return ret == null ? undefined : ret;
            },
            attrHooks: {
                type: {
                    set: function(elem, value) {
                        if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                            var val = elem.value;
                            elem.setAttribute("type", value);
                            if (val) {
                                elem.value = val;
                            }
                            return value;
                        }
                    }
                }
            },
            removeAttr: function(elem, value) {
                var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
                if (attrNames && elem.nodeType === 1) {
                    while (name = attrNames[i++]) {
                        propName = jQuery.propFix[name] || name;
                        if (jQuery.expr.match.bool.test(name)) {
                            elem[propName] = false;
                        }
                        elem.removeAttribute(name);
                    }
                }
            }
        });
        boolHook = {
            set: function(elem, value, name) {
                if (value === false) {
                    jQuery.removeAttr(elem, name);
                } else {
                    elem.setAttribute(name, name);
                }
                return name;
            }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
            var getter = attrHandle[name] || jQuery.find.attr;
            attrHandle[name] = function(elem, name, isXML) {
                var ret, handle;
                if (!isXML) {
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                    attrHandle[name] = handle;
                }
                return ret;
            };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
            prop: function(name, value) {
                return access(this, jQuery.prop, name, value, arguments.length > 1);
            },
            removeProp: function(name) {
                return this.each(function() {
                    delete this[jQuery.propFix[name] || name];
                });
            }
        });
        jQuery.extend({
            prop: function(elem, name, value) {
                var ret, hooks, nType = elem.nodeType;
                if (nType === 3 || nType === 8 || nType === 2) {
                    return;
                }
                if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                    name = jQuery.propFix[name] || name;
                    hooks = jQuery.propHooks[name];
                }
                if (value !== undefined) {
                    if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret;
                    }
                    return elem[name] = value;
                }
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret;
                }
                return elem[name];
            },
            propHooks: {
                tabIndex: {
                    get: function(elem) {
                        var tabindex = jQuery.find.attr(elem, "tabindex");
                        return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        });
        if (!support.optSelected) {
            jQuery.propHooks.selected = {
                get: function(elem) {
                    var parent = elem.parentNode;
                    if (parent && parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                    return null;
                },
                set: function(elem) {
                    var parent = elem.parentNode;
                    if (parent) {
                        parent.selectedIndex;
                        if (parent.parentNode) {
                            parent.parentNode.selectedIndex;
                        }
                    }
                }
            };
        }
        jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
            jQuery.propFix[this.toLowerCase()] = this;
        });
        var rclass = /[\t\r\n\f]/g;
        function getClass(elem) {
            return elem.getAttribute && elem.getAttribute("class") || "";
        }
        jQuery.fn.extend({
            addClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function(j) {
                        jQuery(this).addClass(value.call(this, j, getClass(this)));
                    });
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnotwhite) || [];
                    while (elem = this[i++]) {
                        curValue = getClass(elem);
                        cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
                        if (cur) {
                            j = 0;
                            while (clazz = classes[j++]) {
                                if (cur.indexOf(" " + clazz + " ") < 0) {
                                    cur += clazz + " ";
                                }
                            }
                            finalValue = jQuery.trim(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            removeClass: function(value) {
                var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
                if (jQuery.isFunction(value)) {
                    return this.each(function(j) {
                        jQuery(this).removeClass(value.call(this, j, getClass(this)));
                    });
                }
                if (!arguments.length) {
                    return this.attr("class", "");
                }
                if (typeof value === "string" && value) {
                    classes = value.match(rnotwhite) || [];
                    while (elem = this[i++]) {
                        curValue = getClass(elem);
                        cur = elem.nodeType === 1 && (" " + curValue + " ").replace(rclass, " ");
                        if (cur) {
                            j = 0;
                            while (clazz = classes[j++]) {
                                while (cur.indexOf(" " + clazz + " ") > -1) {
                                    cur = cur.replace(" " + clazz + " ", " ");
                                }
                            }
                            finalValue = jQuery.trim(cur);
                            if (curValue !== finalValue) {
                                elem.setAttribute("class", finalValue);
                            }
                        }
                    }
                }
                return this;
            },
            toggleClass: function(value, stateVal) {
                var type = typeof value;
                if (typeof stateVal === "boolean" && type === "string") {
                    return stateVal ? this.addClass(value) : this.removeClass(value);
                }
                if (jQuery.isFunction(value)) {
                    return this.each(function(i) {
                        jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
                    });
                }
                return this.each(function() {
                    var className, i, self, classNames;
                    if (type === "string") {
                        i = 0;
                        self = jQuery(this);
                        classNames = value.match(rnotwhite) || [];
                        while (className = classNames[i++]) {
                            if (self.hasClass(className)) {
                                self.removeClass(className);
                            } else {
                                self.addClass(className);
                            }
                        }
                    } else if (value === undefined || type === "boolean") {
                        className = getClass(this);
                        if (className) {
                            dataPriv.set(this, "__className__", className);
                        }
                        if (this.setAttribute) {
                            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
                        }
                    }
                });
            },
            hasClass: function(selector) {
                var className, elem, i = 0;
                className = " " + selector + " ";
                while (elem = this[i++]) {
                    if (elem.nodeType === 1 && (" " + getClass(elem) + " ").replace(rclass, " ").indexOf(className) > -1) {
                        return true;
                    }
                }
                return false;
            }
        });
        var rreturn = /\r/g, rspaces = /[\x20\t\r\n\f]+/g;
        jQuery.fn.extend({
            val: function(value) {
                var hooks, ret, isFunction, elem = this[0];
                if (!arguments.length) {
                    if (elem) {
                        hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                        if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                            return ret;
                        }
                        ret = elem.value;
                        return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret;
                    }
                    return;
                }
                isFunction = jQuery.isFunction(value);
                return this.each(function(i) {
                    var val;
                    if (this.nodeType !== 1) {
                        return;
                    }
                    if (isFunction) {
                        val = value.call(this, i, jQuery(this).val());
                    } else {
                        val = value;
                    }
                    if (val == null) {
                        val = "";
                    } else if (typeof val === "number") {
                        val += "";
                    } else if (jQuery.isArray(val)) {
                        val = jQuery.map(val, function(value) {
                            return value == null ? "" : value + "";
                        });
                    }
                    hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                    if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                        this.value = val;
                    }
                });
            }
        });
        jQuery.extend({
            valHooks: {
                option: {
                    get: function(elem) {
                        var val = jQuery.find.attr(elem, "value");
                        return val != null ? val : jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
                    }
                },
                select: {
                    get: function(elem) {
                        var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
                        for (;i < max; i++) {
                            option = options[i];
                            if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                                value = jQuery(option).val();
                                if (one) {
                                    return value;
                                }
                                values.push(value);
                            }
                        }
                        return values;
                    },
                    set: function(elem, value) {
                        var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
                        while (i--) {
                            option = options[i];
                            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                                optionSet = true;
                            }
                        }
                        if (!optionSet) {
                            elem.selectedIndex = -1;
                        }
                        return values;
                    }
                }
            }
        });
        jQuery.each([ "radio", "checkbox" ], function() {
            jQuery.valHooks[this] = {
                set: function(elem, value) {
                    if (jQuery.isArray(value)) {
                        return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
                    }
                }
            };
            if (!support.checkOn) {
                jQuery.valHooks[this].get = function(elem) {
                    return elem.getAttribute("value") === null ? "on" : elem.value;
                };
            }
        });
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        jQuery.extend(jQuery.event, {
            trigger: function(event, data, elem, onlyHandlers) {
                var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
                cur = tmp = elem = elem || document;
                if (elem.nodeType === 3 || elem.nodeType === 8) {
                    return;
                }
                if (rfocusMorph.test(type + jQuery.event.triggered)) {
                    return;
                }
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespaces.sort();
                }
                ontype = type.indexOf(":") < 0 && "on" + type;
                event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
                event.isTrigger = onlyHandlers ? 2 : 3;
                event.namespace = namespaces.join(".");
                event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                event.result = undefined;
                if (!event.target) {
                    event.target = elem;
                }
                data = data == null ? [ event ] : jQuery.makeArray(data, [ event ]);
                special = jQuery.event.special[type] || {};
                if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                    return;
                }
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    bubbleType = special.delegateType || type;
                    if (!rfocusMorph.test(bubbleType + type)) {
                        cur = cur.parentNode;
                    }
                    for (;cur; cur = cur.parentNode) {
                        eventPath.push(cur);
                        tmp = cur;
                    }
                    if (tmp === (elem.ownerDocument || document)) {
                        eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                    }
                }
                i = 0;
                while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                    event.type = i > 1 ? bubbleType : special.bindType || type;
                    handle = (dataPriv.get(cur, "events") || {})[event.type] && dataPriv.get(cur, "handle");
                    if (handle) {
                        handle.apply(cur, data);
                    }
                    handle = ontype && cur[ontype];
                    if (handle && handle.apply && acceptData(cur)) {
                        event.result = handle.apply(cur, data);
                        if (event.result === false) {
                            event.preventDefault();
                        }
                    }
                }
                event.type = type;
                if (!onlyHandlers && !event.isDefaultPrevented()) {
                    if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
                        if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
                            tmp = elem[ontype];
                            if (tmp) {
                                elem[ontype] = null;
                            }
                            jQuery.event.triggered = type;
                            elem[type]();
                            jQuery.event.triggered = undefined;
                            if (tmp) {
                                elem[ontype] = tmp;
                            }
                        }
                    }
                }
                return event.result;
            },
            simulate: function(type, elem, event) {
                var e = jQuery.extend(new jQuery.Event(), event, {
                    type: type,
                    isSimulated: true
                });
                jQuery.event.trigger(e, null, elem);
                if (e.isDefaultPrevented()) {
                    event.preventDefault();
                }
            }
        });
        jQuery.fn.extend({
            trigger: function(type, data) {
                return this.each(function() {
                    jQuery.event.trigger(type, data, this);
                });
            },
            triggerHandler: function(type, data) {
                var elem = this[0];
                if (elem) {
                    return jQuery.event.trigger(type, data, elem, true);
                }
            }
        });
        jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
            };
        });
        jQuery.fn.extend({
            hover: function(fnOver, fnOut) {
                return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
            }
        });
        support.focusin = "onfocusin" in window;
        if (!support.focusin) {
            jQuery.each({
                focus: "focusin",
                blur: "focusout"
            }, function(orig, fix) {
                var handler = function(event) {
                    jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
                };
                jQuery.event.special[fix] = {
                    setup: function() {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix);
                        if (!attaches) {
                            doc.addEventListener(orig, handler, true);
                        }
                        dataPriv.access(doc, fix, (attaches || 0) + 1);
                    },
                    teardown: function() {
                        var doc = this.ownerDocument || this, attaches = dataPriv.access(doc, fix) - 1;
                        if (!attaches) {
                            doc.removeEventListener(orig, handler, true);
                            dataPriv.remove(doc, fix);
                        } else {
                            dataPriv.access(doc, fix, attaches);
                        }
                    }
                };
            });
        }
        var location = window.location;
        var nonce = jQuery.now();
        var rquery = /\?/;
        jQuery.parseJSON = function(data) {
            return JSON.parse(data + "");
        };
        jQuery.parseXML = function(data) {
            var xml;
            if (!data || typeof data !== "string") {
                return null;
            }
            try {
                xml = new window.DOMParser().parseFromString(data, "text/xml");
            } catch (e) {
                xml = undefined;
            }
            if (!xml || xml.getElementsByTagName("parsererror").length) {
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        };
        var rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document.createElement("a");
        originAnchor.href = location.href;
        function addToPrefiltersOrTransports(structure) {
            return function(dataTypeExpression, func) {
                if (typeof dataTypeExpression !== "string") {
                    func = dataTypeExpression;
                    dataTypeExpression = "*";
                }
                var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
                if (jQuery.isFunction(func)) {
                    while (dataType = dataTypes[i++]) {
                        if (dataType[0] === "+") {
                            dataType = dataType.slice(1) || "*";
                            (structure[dataType] = structure[dataType] || []).unshift(func);
                        } else {
                            (structure[dataType] = structure[dataType] || []).push(func);
                        }
                    }
                }
            };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
            var inspected = {}, seekingTransport = structure === transports;
            function inspect(dataType) {
                var selected;
                inspected[dataType] = true;
                jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                    var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                    if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                        options.dataTypes.unshift(dataTypeOrTransport);
                        inspect(dataTypeOrTransport);
                        return false;
                    } else if (seekingTransport) {
                        return !(selected = dataTypeOrTransport);
                    }
                });
                return selected;
            }
            return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
            var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
            for (key in src) {
                if (src[key] !== undefined) {
                    (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
                }
            }
            if (deep) {
                jQuery.extend(true, target, deep);
            }
            return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
            var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
            while (dataTypes[0] === "*") {
                dataTypes.shift();
                if (ct === undefined) {
                    ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
                }
            }
            if (ct) {
                for (type in contents) {
                    if (contents[type] && contents[type].test(ct)) {
                        dataTypes.unshift(type);
                        break;
                    }
                }
            }
            if (dataTypes[0] in responses) {
                finalDataType = dataTypes[0];
            } else {
                for (type in responses) {
                    if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                        finalDataType = type;
                        break;
                    }
                    if (!firstDataType) {
                        firstDataType = type;
                    }
                }
                finalDataType = finalDataType || firstDataType;
            }
            if (finalDataType) {
                if (finalDataType !== dataTypes[0]) {
                    dataTypes.unshift(finalDataType);
                }
                return responses[finalDataType];
            }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
            var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
            if (dataTypes[1]) {
                for (conv in s.converters) {
                    converters[conv.toLowerCase()] = s.converters[conv];
                }
            }
            current = dataTypes.shift();
            while (current) {
                if (s.responseFields[current]) {
                    jqXHR[s.responseFields[current]] = response;
                }
                if (!prev && isSuccess && s.dataFilter) {
                    response = s.dataFilter(response, s.dataType);
                }
                prev = current;
                current = dataTypes.shift();
                if (current) {
                    if (current === "*") {
                        current = prev;
                    } else if (prev !== "*" && prev !== current) {
                        conv = converters[prev + " " + current] || converters["* " + current];
                        if (!conv) {
                            for (conv2 in converters) {
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                    if (conv) {
                                        if (conv === true) {
                                            conv = converters[conv2];
                                        } else if (converters[conv2] !== true) {
                                            current = tmp[0];
                                            dataTypes.unshift(tmp[1]);
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                        if (conv !== true) {
                            if (conv && s.throws) {
                                response = conv(response);
                            } else {
                                try {
                                    response = conv(response);
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    };
                                }
                            }
                        }
                    }
                }
            }
            return {
                state: "success",
                data: response
            };
        }
        jQuery.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: location.href,
                type: "GET",
                isLocal: rlocalProtocol.test(location.protocol),
                global: true,
                processData: true,
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": allTypes,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": true,
                    "text json": jQuery.parseJSON,
                    "text xml": jQuery.parseXML
                },
                flatOptions: {
                    url: true,
                    context: true
                }
            },
            ajaxSetup: function(target, settings) {
                return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
            },
            ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
            ajaxTransport: addToPrefiltersOrTransports(transports),
            ajax: function(url, options) {
                if (typeof url === "object") {
                    options = url;
                    url = undefined;
                }
                options = options || {};
                var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while (match = rheaders.exec(responseHeadersString)) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [ statusCode[code], map[code] ];
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };
                deferred.promise(jqXHR).complete = completeDeferred.add;
                jqXHR.success = jqXHR.done;
                jqXHR.error = jqXHR.fail;
                s.url = ((url || s.url || location.href) + "").replace(rhash, "").replace(rprotocol, location.protocol + "//");
                s.type = options.method || options.type || s.method || s.type;
                s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ];
                if (s.crossDomain == null) {
                    urlAnchor = document.createElement("a");
                    try {
                        urlAnchor.href = s.url;
                        urlAnchor.href = urlAnchor.href;
                        s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
                    } catch (e) {
                        s.crossDomain = true;
                    }
                }
                if (s.data && s.processData && typeof s.data !== "string") {
                    s.data = jQuery.param(s.data, s.traditional);
                }
                inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
                if (state === 2) {
                    return jqXHR;
                }
                fireGlobals = jQuery.event && s.global;
                if (fireGlobals && jQuery.active++ === 0) {
                    jQuery.event.trigger("ajaxStart");
                }
                s.type = s.type.toUpperCase();
                s.hasContent = !rnoContent.test(s.type);
                cacheURL = s.url;
                if (!s.hasContent) {
                    if (s.data) {
                        cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                        delete s.data;
                    }
                    if (s.cache === false) {
                        s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                    }
                }
                if (s.ifModified) {
                    if (jQuery.lastModified[cacheURL]) {
                        jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                    }
                    if (jQuery.etag[cacheURL]) {
                        jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                    }
                }
                if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                    jqXHR.setRequestHeader("Content-Type", s.contentType);
                }
                jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
                for (i in s.headers) {
                    jqXHR.setRequestHeader(i, s.headers[i]);
                }
                if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                    return jqXHR.abort();
                }
                strAbort = "abort";
                for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    jqXHR[i](s[i]);
                }
                transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
                if (!transport) {
                    done(-1, "No Transport");
                } else {
                    jqXHR.readyState = 1;
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxSend", [ jqXHR, s ]);
                    }
                    if (state === 2) {
                        return jqXHR;
                    }
                    if (s.async && s.timeout > 0) {
                        timeoutTimer = window.setTimeout(function() {
                            jqXHR.abort("timeout");
                        }, s.timeout);
                    }
                    try {
                        state = 1;
                        transport.send(requestHeaders, done);
                    } catch (e) {
                        if (state < 2) {
                            done(-1, e);
                        } else {
                            throw e;
                        }
                    }
                }
                function done(status, nativeStatusText, responses, headers) {
                    var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                    if (state === 2) {
                        return;
                    }
                    state = 2;
                    if (timeoutTimer) {
                        window.clearTimeout(timeoutTimer);
                    }
                    transport = undefined;
                    responseHeadersString = headers || "";
                    jqXHR.readyState = status > 0 ? 4 : 0;
                    isSuccess = status >= 200 && status < 300 || status === 304;
                    if (responses) {
                        response = ajaxHandleResponses(s, jqXHR, responses);
                    }
                    response = ajaxConvert(s, response, jqXHR, isSuccess);
                    if (isSuccess) {
                        if (s.ifModified) {
                            modified = jqXHR.getResponseHeader("Last-Modified");
                            if (modified) {
                                jQuery.lastModified[cacheURL] = modified;
                            }
                            modified = jqXHR.getResponseHeader("etag");
                            if (modified) {
                                jQuery.etag[cacheURL] = modified;
                            }
                        }
                        if (status === 204 || s.type === "HEAD") {
                            statusText = "nocontent";
                        } else if (status === 304) {
                            statusText = "notmodified";
                        } else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error;
                        }
                    } else {
                        error = statusText;
                        if (status || !statusText) {
                            statusText = "error";
                            if (status < 0) {
                                status = 0;
                            }
                        }
                    }
                    jqXHR.status = status;
                    jqXHR.statusText = (nativeStatusText || statusText) + "";
                    if (isSuccess) {
                        deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]);
                    } else {
                        deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]);
                    }
                    jqXHR.statusCode(statusCode);
                    statusCode = undefined;
                    if (fireGlobals) {
                        globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]);
                    }
                    completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]);
                    if (fireGlobals) {
                        globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]);
                        if (!--jQuery.active) {
                            jQuery.event.trigger("ajaxStop");
                        }
                    }
                }
                return jqXHR;
            },
            getJSON: function(url, data, callback) {
                return jQuery.get(url, data, callback, "json");
            },
            getScript: function(url, callback) {
                return jQuery.get(url, undefined, callback, "script");
            }
        });
        jQuery.each([ "get", "post" ], function(i, method) {
            jQuery[method] = function(url, data, callback, type) {
                if (jQuery.isFunction(data)) {
                    type = type || callback;
                    callback = data;
                    data = undefined;
                }
                return jQuery.ajax(jQuery.extend({
                    url: url,
                    type: method,
                    dataType: type,
                    data: data,
                    success: callback
                }, jQuery.isPlainObject(url) && url));
            };
        });
        jQuery._evalUrl = function(url) {
            return jQuery.ajax({
                url: url,
                type: "GET",
                dataType: "script",
                async: false,
                global: false,
                "throws": true
            });
        };
        jQuery.fn.extend({
            wrapAll: function(html) {
                var wrap;
                if (jQuery.isFunction(html)) {
                    return this.each(function(i) {
                        jQuery(this).wrapAll(html.call(this, i));
                    });
                }
                if (this[0]) {
                    wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        wrap.insertBefore(this[0]);
                    }
                    wrap.map(function() {
                        var elem = this;
                        while (elem.firstElementChild) {
                            elem = elem.firstElementChild;
                        }
                        return elem;
                    }).append(this);
                }
                return this;
            },
            wrapInner: function(html) {
                if (jQuery.isFunction(html)) {
                    return this.each(function(i) {
                        jQuery(this).wrapInner(html.call(this, i));
                    });
                }
                return this.each(function() {
                    var self = jQuery(this), contents = self.contents();
                    if (contents.length) {
                        contents.wrapAll(html);
                    } else {
                        self.append(html);
                    }
                });
            },
            wrap: function(html) {
                var isFunction = jQuery.isFunction(html);
                return this.each(function(i) {
                    jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
                });
            },
            unwrap: function() {
                return this.parent().each(function() {
                    if (!jQuery.nodeName(this, "body")) {
                        jQuery(this).replaceWith(this.childNodes);
                    }
                }).end();
            }
        });
        jQuery.expr.filters.hidden = function(elem) {
            return !jQuery.expr.filters.visible(elem);
        };
        jQuery.expr.filters.visible = function(elem) {
            return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
        };
        var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add) {
            var name;
            if (jQuery.isArray(obj)) {
                jQuery.each(obj, function(i, v) {
                    if (traditional || rbracket.test(prefix)) {
                        add(prefix, v);
                    } else {
                        buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
                    }
                });
            } else if (!traditional && jQuery.type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
                }
            } else {
                add(prefix, obj);
            }
        }
        jQuery.param = function(a, traditional) {
            var prefix, s = [], add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
            }
            if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
                jQuery.each(a, function() {
                    add(this.name, this.value);
                });
            } else {
                for (prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            return s.join("&").replace(r20, "+");
        };
        jQuery.fn.extend({
            serialize: function() {
                return jQuery.param(this.serializeArray());
            },
            serializeArray: function() {
                return this.map(function() {
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                }).filter(function() {
                    var type = this.type;
                    return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
                }).map(function(i, elem) {
                    var val = jQuery(this).val();
                    return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                        return {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                    }) : {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }).get();
            }
        });
        jQuery.ajaxSettings.xhr = function() {
            try {
                return new window.XMLHttpRequest();
            } catch (e) {}
        };
        var xhrSuccessStatus = {
            0: 200,
            1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
            var callback, errorCallback;
            if (support.cors || xhrSupported && !options.crossDomain) {
                return {
                    send: function(headers, complete) {
                        var i, xhr = options.xhr();
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }
                        for (i in headers) {
                            xhr.setRequestHeader(i, headers[i]);
                        }
                        callback = function(type) {
                            return function() {
                                if (callback) {
                                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
                                    if (type === "abort") {
                                        xhr.abort();
                                    } else if (type === "error") {
                                        if (typeof xhr.status !== "number") {
                                            complete(0, "error");
                                        } else {
                                            complete(xhr.status, xhr.statusText);
                                        }
                                    } else {
                                        complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                                            binary: xhr.response
                                        } : {
                                            text: xhr.responseText
                                        }, xhr.getAllResponseHeaders());
                                    }
                                }
                            };
                        };
                        xhr.onload = callback();
                        errorCallback = xhr.onerror = callback("error");
                        if (xhr.onabort !== undefined) {
                            xhr.onabort = errorCallback;
                        } else {
                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === 4) {
                                    window.setTimeout(function() {
                                        if (callback) {
                                            errorCallback();
                                        }
                                    });
                                }
                            };
                        }
                        callback = callback("abort");
                        try {
                            xhr.send(options.hasContent && options.data || null);
                        } catch (e) {
                            if (callback) {
                                throw e;
                            }
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        jQuery.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(text) {
                    jQuery.globalEval(text);
                    return text;
                }
            }
        });
        jQuery.ajaxPrefilter("script", function(s) {
            if (s.cache === undefined) {
                s.cache = false;
            }
            if (s.crossDomain) {
                s.type = "GET";
            }
        });
        jQuery.ajaxTransport("script", function(s) {
            if (s.crossDomain) {
                var script, callback;
                return {
                    send: function(_, complete) {
                        script = jQuery("<script>").prop({
                            charset: s.scriptCharset,
                            src: s.url
                        }).on("load error", callback = function(evt) {
                            script.remove();
                            callback = null;
                            if (evt) {
                                complete(evt.type === "error" ? 404 : 200, evt.type);
                            }
                        });
                        document.head.appendChild(script[0]);
                    },
                    abort: function() {
                        if (callback) {
                            callback();
                        }
                    }
                };
            }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
                this[callback] = true;
                return callback;
            }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
            var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
            if (jsonProp || s.dataTypes[0] === "jsonp") {
                callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
                if (jsonProp) {
                    s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
                } else if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
                }
                s.converters["script json"] = function() {
                    if (!responseContainer) {
                        jQuery.error(callbackName + " was not called");
                    }
                    return responseContainer[0];
                };
                s.dataTypes[0] = "json";
                overwritten = window[callbackName];
                window[callbackName] = function() {
                    responseContainer = arguments;
                };
                jqXHR.always(function() {
                    if (overwritten === undefined) {
                        jQuery(window).removeProp(callbackName);
                    } else {
                        window[callbackName] = overwritten;
                    }
                    if (s[callbackName]) {
                        s.jsonpCallback = originalSettings.jsonpCallback;
                        oldCallbacks.push(callbackName);
                    }
                    if (responseContainer && jQuery.isFunction(overwritten)) {
                        overwritten(responseContainer[0]);
                    }
                    responseContainer = overwritten = undefined;
                });
                return "script";
            }
        });
        jQuery.parseHTML = function(data, context, keepScripts) {
            if (!data || typeof data !== "string") {
                return null;
            }
            if (typeof context === "boolean") {
                keepScripts = context;
                context = false;
            }
            context = context || document;
            var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
            if (parsed) {
                return [ context.createElement(parsed[1]) ];
            }
            parsed = buildFragment([ data ], context, scripts);
            if (scripts && scripts.length) {
                jQuery(scripts).remove();
            }
            return jQuery.merge([], parsed.childNodes);
        };
        var _load = jQuery.fn.load;
        jQuery.fn.load = function(url, params, callback) {
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
            }
            var selector, type, response, self = this, off = url.indexOf(" ");
            if (off > -1) {
                selector = jQuery.trim(url.slice(off));
                url = url.slice(0, off);
            }
            if (jQuery.isFunction(params)) {
                callback = params;
                params = undefined;
            } else if (params && typeof params === "object") {
                type = "POST";
            }
            if (self.length > 0) {
                jQuery.ajax({
                    url: url,
                    type: type || "GET",
                    dataType: "html",
                    data: params
                }).done(function(responseText) {
                    response = arguments;
                    self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
                }).always(callback && function(jqXHR, status) {
                    self.each(function() {
                        callback.apply(this, response || [ jqXHR.responseText, status, jqXHR ]);
                    });
                });
            }
            return this;
        };
        jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
            jQuery.fn[type] = function(fn) {
                return this.on(type, fn);
            };
        });
        jQuery.expr.filters.animated = function(elem) {
            return jQuery.grep(jQuery.timers, function(fn) {
                return elem === fn.elem;
            }).length;
        };
        function getWindow(elem) {
            return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
        }
        jQuery.offset = {
            setOffset: function(elem, options, i) {
                var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
                if (position === "static") {
                    elem.style.position = "relative";
                }
                curOffset = curElem.offset();
                curCSSTop = jQuery.css(elem, "top");
                curCSSLeft = jQuery.css(elem, "left");
                calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
                if (calculatePosition) {
                    curPosition = curElem.position();
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                } else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }
                if (jQuery.isFunction(options)) {
                    options = options.call(elem, i, jQuery.extend({}, curOffset));
                }
                if (options.top != null) {
                    props.top = options.top - curOffset.top + curTop;
                }
                if (options.left != null) {
                    props.left = options.left - curOffset.left + curLeft;
                }
                if ("using" in options) {
                    options.using.call(elem, props);
                } else {
                    curElem.css(props);
                }
            }
        };
        jQuery.fn.extend({
            offset: function(options) {
                if (arguments.length) {
                    return options === undefined ? this : this.each(function(i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
                }
                var docElem, win, elem = this[0], box = {
                    top: 0,
                    left: 0
                }, doc = elem && elem.ownerDocument;
                if (!doc) {
                    return;
                }
                docElem = doc.documentElement;
                if (!jQuery.contains(docElem, elem)) {
                    return box;
                }
                box = elem.getBoundingClientRect();
                win = getWindow(doc);
                return {
                    top: box.top + win.pageYOffset - docElem.clientTop,
                    left: box.left + win.pageXOffset - docElem.clientLeft
                };
            },
            position: function() {
                if (!this[0]) {
                    return;
                }
                var offsetParent, offset, elem = this[0], parentOffset = {
                    top: 0,
                    left: 0
                };
                if (jQuery.css(elem, "position") === "fixed") {
                    offset = elem.getBoundingClientRect();
                } else {
                    offsetParent = this.offsetParent();
                    offset = this.offset();
                    if (!jQuery.nodeName(offsetParent[0], "html")) {
                        parentOffset = offsetParent.offset();
                    }
                    parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
                }
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            },
            offsetParent: function() {
                return this.map(function() {
                    var offsetParent = this.offsetParent;
                    while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                        offsetParent = offsetParent.offsetParent;
                    }
                    return offsetParent || documentElement;
                });
            }
        });
        jQuery.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(method, prop) {
            var top = "pageYOffset" === prop;
            jQuery.fn[method] = function(val) {
                return access(this, function(elem, method, val) {
                    var win = getWindow(elem);
                    if (val === undefined) {
                        return win ? win[prop] : elem[method];
                    }
                    if (win) {
                        win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
                    } else {
                        elem[method] = val;
                    }
                }, method, val, arguments.length);
            };
        });
        jQuery.each([ "top", "left" ], function(i, prop) {
            jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);
                    return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
                }
            });
        });
        jQuery.each({
            Height: "height",
            Width: "width"
        }, function(name, type) {
            jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            }, function(defaultExtra, funcName) {
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                    return access(this, function(elem, type, value) {
                        var doc;
                        if (jQuery.isWindow(elem)) {
                            return elem.document.documentElement["client" + name];
                        }
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;
                            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
                        }
                        return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable, null);
                };
            });
        });
        jQuery.fn.extend({
            bind: function(types, data, fn) {
                return this.on(types, null, data, fn);
            },
            unbind: function(types, fn) {
                return this.off(types, null, fn);
            },
            delegate: function(selector, types, data, fn) {
                return this.on(types, selector, data, fn);
            },
            undelegate: function(selector, types, fn) {
                return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
            },
            size: function() {
                return this.length;
            }
        });
        jQuery.fn.andSelf = jQuery.fn.addBack;
        if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return jQuery;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
        var _jQuery = window.jQuery, _$ = window.$;
        jQuery.noConflict = function(deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }
            return jQuery;
        };
        if (!noGlobal) {
            window.jQuery = window.$ = jQuery;
        }
        return jQuery;
    });
}, function(module, exports, __webpack_require__) {
    var $, EventEmitterMixin, Hub, HubContents, HubJobs, HubStreams;
    $ = __webpack_require__(7);
    EventEmitterMixin = __webpack_require__(4).mixins.EventEmitterMixin;
    HubContents = function() {
        HubContents.extend = function(source) {
            var prop;
            for (prop in source) {
                this.prototype[prop] = source[prop];
            }
        };
        function HubContents() {
            this.constructor.extend(EventEmitterMixin);
            this.url = null;
        }
        HubContents.prototype.urlSet = function(url) {
            this.url = url;
            return this.urlStatic = url.replace("/api", "");
        };
        HubContents.prototype.checkReady = function(name, kind) {
            var destinationUrl, fileName, metadataFileName, metadataUrl, self;
            self = this;
            kind = kind || "mp4";
            fileName = [ name, kind ].join(".");
            destinationUrl = this.urlStatic + "/" + fileName;
            metadataFileName = [ name, "json" ].join(".");
            metadataUrl = this.urlStatic + "/" + metadataFileName;
            return this._checkReadyPoll(name, function() {
                self.fire("save", destinationUrl, name);
                return self.fire("save-metadata", metadataUrl, name);
            });
        };
        HubContents.prototype._checkReadyPoll = function(name, cb) {
            var poll, url;
            url = this.url + "/" + name + "/ready";
            poll = function() {
                var d;
                d = $.ajax({
                    url: url,
                    dataType: "jsonp"
                });
                d.done(function(result) {
                    if (result.error) {
                        return setTimeout(poll, 1e3);
                    }
                    return cb(result);
                });
                return d.fail(function() {
                    return setTimeout(poll, 1e3);
                });
            };
            return poll();
        };
        return HubContents;
    }();
    HubJobs = function() {
        HubJobs.extend = function(source) {
            var prop;
            for (prop in source) {
                this.prototype[prop] = source[prop];
            }
        };
        function HubJobs() {
            this.constructor.extend(EventEmitterMixin);
            this.url = null;
        }
        HubJobs.prototype.urlSet = function(url) {
            return this.url = url;
        };
        HubJobs.prototype.enableRealtimeAnalysis = function(engine, success, error) {
            var data, dfr, dfr_done, dfr_error, url;
            url = this.url + "/submit/jsonp";
            data = {
                streamName: this.streamName,
                engine: engine || "kanako_live"
            };
            dfr = new $.Deferred();
            dfr_error = function(err) {
                dfr.reject(err);
            };
            dfr_done = function(result, b, c) {
                if (result.error) {
                    return dfr_error(result.error, b, c);
                }
                dfr.resolve(result, b, c);
            };
            $.ajax({
                url: url,
                dataType: "jsonp",
                contentType: "application/json",
                data: data,
                type: "get"
            }).fail(dfr_error).fail(error).done(dfr_done).done(success);
            return dfr;
        };
        return HubJobs;
    }();
    HubStreams = function() {
        HubStreams.extend = function(source) {
            var prop;
            for (prop in source) {
                this.prototype[prop] = source[prop];
            }
        };
        function HubStreams() {
            this.constructor.extend(EventEmitterMixin);
            this.url = null;
        }
        HubStreams.prototype.urlSet = function(url1) {
            this.url = url1;
        };
        HubStreams.prototype.publish = function(streamName) {
            var data, dfr, url;
            url = this.url + "/on_publish";
            data = {
                streamName: streamName
            };
            dfr = $.ajax({
                url: url,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                type: "post"
            });
            return dfr;
        };
        HubStreams.prototype.unpublish = function(streamName) {
            var data, dfr, url;
            url = this.url + "/on_publish_done";
            data = {
                streamName: streamName
            };
            dfr = $.ajax({
                url: url,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                type: "post"
            });
            return dfr;
        };
        return HubStreams;
    }();
    Hub = function() {
        function Hub() {
            this.url = null;
            this.contents = new HubContents();
            this.jobs = new HubJobs();
            this.streams = new HubStreams();
        }
        Hub.prototype.urlSet = function(url) {
            this.url = url;
            this.contents.urlSet(this.url + "/contents");
            this.jobs.urlSet(this.url + "/jobs");
            return this.streams.urlSet(this.url + "/janus");
        };
        Hub.prototype.info = function() {
            return $.ajax({
                url: this.url + "/info/jsonp",
                dataType: "jsonp"
            });
        };
        return Hub;
    }();
    module.exports = Hub;
}, function(module, exports, __webpack_require__) {
    var EventEmitterMixin, Hub, Urls;
    Hub = __webpack_require__(8);
    EventEmitterMixin = __webpack_require__(4).mixins.EventEmitterMixin;
    Urls = function() {
        Urls.extend = function(source) {
            var prop;
            for (prop in source) {
                this.prototype[prop] = source[prop];
            }
        };
        function Urls() {
            this.constructor.extend(EventEmitterMixin);
            this.host = this.portHttp = this.protocol = this.instanceIp = this.instanceIpPrivate = null;
            this.urlHttp = this.urlHub = null;
            this.hostSet();
            this.update();
        }
        Urls.prototype.hostSet = function(host) {
            var url;
            this.host = host;
            url = window.location.href;
            host = url.split("/")[2].split(":")[0];
            return this.update();
        };
        Urls.prototype.update = function() {
            var url;
            this.portRtmp = 1935;
            this.portHttp = 80;
            url = window.location.href;
            this.protocol = url.split(":")[0];
            if (this.protocol === "file") {
                this.protocol = "https";
            }
            if (this.protocol === "https") {
                this.portHttp = 443;
            }
            this.urlHttp = this.protocol + "://" + this.host + ":" + this.portHttp;
            if (this.instanceIpPrivate) {
                this.urlHttp += "/bounce/" + this.instanceIpPrivate;
            }
            this.urlHub = this.urlHttp + "/api";
            return this.urlJanus = this.urlHttp + "/janus";
        };
        Urls.prototype.instanceCycle = function() {
            var d, hub, self;
            hub = new Hub();
            hub.urlSet(this.urlHub);
            self = this;
            d = hub.info();
            return d.done(function(info) {
                return self.instanceCyleSuccess(info);
            });
        };
        Urls.prototype.instanceCyleSuccess = function(info) {
            this.instanceIpPrivate = info.ipPrivate;
            this.instanceIp = info.ip;
            this.update();
            return this.fire("url-changed", this);
        };
        return Urls;
    }();
    module.exports = Urls;
}, function(module, exports, __webpack_require__) {
    var Adapter, EventEmitterMixin, Janus, JanusRecorder;
    Janus = __webpack_require__(11);
    Adapter = __webpack_require__(6);
    EventEmitterMixin = __webpack_require__(4).EventEmitterMixin;
    JanusRecorder = function() {
        JanusRecorder.extend = function(source) {
            var prop;
            for (prop in source) {
                this.prototype[prop] = source[prop];
            }
        };
        JanusRecorder.prototype.server = "http://boot2docker:80/bounce/127.0.0.1/janus";
        function JanusRecorder() {
            this.constructor.extend(EventEmitterMixin);
            if (window.location.protocol === "https:") {
                this.server = this.server.replace("http:", "https:");
            }
            this.session = null;
            this.plugin = null;
            this.streamRemote = null;
            this.streamLocal = null;
            this.elementMediaLocal = null;
            this.elementMediaRemote = null;
            this.iceServers = null;
            this.videoKeyframeInterval = 5e3;
            this.videoKeyframeIntervalOverride = false;
            this.videoBitrate = 64e3;
        }
        JanusRecorder.prototype.log = function(message) {
            if (console && console.log) {
                return console.log("JanusRecorder", arguments);
            }
        };
        JanusRecorder.prototype.logStats = function() {
            return this.plugin.webrtcStuff.pc.getStats(function(stats) {
                stats = stats.result();
                console.log(stats);
                stats.forEach(function(stat) {
                    var names;
                    names = stat.names();
                    return names.forEach(function(name) {
                        var value;
                        value = stat.stat(name);
                        return console.log(stat.id, name, value);
                    });
                });
            });
        };
        JanusRecorder.prototype.janusLibInit = function() {
            var janusOptions, self;
            this.log("janus lib init");
            self = this;
            janusOptions = {
                debug: false,
                callback: function() {
                    return self.janusLibInitSuccess();
                }
            };
            Janus.init(janusOptions);
        };
        JanusRecorder.prototype.janusLibInitSuccess = function() {
            var later, self;
            self = this;
            later = function() {
                return self.fire("ready");
            };
            return setTimeout(later, 100);
        };
        JanusRecorder.prototype.sessionInit = function() {
            var self;
            this.log("session init");
            self = this;
            if (!Janus.isWebrtcSupported()) {
                alert("No WebRTC Support..");
                return;
            }
            this.session = new Janus({
                server: this.server,
                iceServers: this.iceServers,
                success: function() {
                    return self.sessionSuccess();
                },
                error: function(error) {
                    return self.sessionError(error);
                },
                destroyed: function() {
                    return self.sessionDestroyed(arguments);
                }
            });
        };
        JanusRecorder.prototype.sessionSuccess = function() {
            return this.pluginInit();
        };
        JanusRecorder.prototype.sessionDestroyed = function() {
            this.fire("disconnect");
            return this.log("session destroyed", arguments);
        };
        JanusRecorder.prototype.sessionError = function(error) {
            this.log("session error");
            return this.fire("janus-session-error", error);
        };
        JanusRecorder.prototype.pluginInit = function() {
            var self;
            this.log("plugin init");
            self = this;
            this.session.attach({
                plugin: "janus.plugin.recordplay",
                success: function(plugin) {
                    return self.pluginReady(plugin);
                },
                consentDialog: function(_on) {
                    return self.log("User should approve camera access", _on);
                },
                onmessage: function(message, jsep) {
                    return self.pluginMessageHandle(message, jsep);
                },
                onlocalstream: function(stream) {
                    return self.pluginLocalStream(stream);
                },
                onremotestream: function(stream) {
                    return self.pluginRemoteStream(stream);
                },
                oncleanup: function() {
                    return self.pluginCleanup();
                },
                error: function(error) {
                    return self.pluginError(error);
                }
            });
        };
        JanusRecorder.prototype.pluginError = function(error) {
            this.log("plugin error");
            return this.fire("janus-plugin-error", error);
        };
        JanusRecorder.prototype.pluginReady = function(plugin) {
            this.log("plugin ready");
            this.plugin = plugin;
            this.fire("connect");
        };
        JanusRecorder.prototype.pluginMessageHandle = function(message, jsep) {
            var event, result, self;
            self = this;
            result = message.result;
            if (!result) {
                return self.pluginMessageError(message, jsep);
            }
            if (!result.status) {
                return this.log("skipping message", message, jsep);
            }
            event = result.status;
            if (event === "preparing") {
                return self.pluginMessagePreparing(message, jsep);
            }
            if (event === "recording") {
                return self.pluginMessageRecording(message, jsep);
            }
            if (event === "playing") {
                return self.pluginMessagePlaying(message, jsep);
            }
            if (event === "stopped") {
                return self.pluginMessageStopped(message, jsep);
            }
            if (event === "slow_link") {
                return self.pluginMessageSlowLink(message, jsep);
            }
            return this.log("Unknown event", event);
        };
        JanusRecorder.prototype.pluginMessageError = function(message, jsep) {
            return this.log("plugin message error", message, jsep);
        };
        JanusRecorder.prototype.pluginMessagePreparing = function(message, jsep) {
            var plugin, self;
            plugin = this.plugin;
            self = this;
            return plugin.createAnswer({
                jsep: jsep,
                media: {
                    audioSend: false,
                    videoSend: false
                },
                success: function(jsep) {
                    self.log("Local SDP", jsep.sdp);
                    return plugin.send({
                        message: {
                            request: start
                        },
                        jsep: jsep
                    });
                },
                error: function(error) {
                    return self.log("WebRtc Error", error);
                }
            });
        };
        JanusRecorder.prototype.pluginMessageRecording = function(message, jsep) {
            var id;
            this.plugin.handleRemoteJsep({
                jsep: jsep
            });
            id = message.result.id;
            this.fire("publish", this.streamName);
            return this.log("Recording started with id", id);
        };
        JanusRecorder.prototype.pluginMessagePlaying = function() {
            return this.log("plugin is playing");
        };
        JanusRecorder.prototype.pluginMessageStopped = function(message) {
            var id;
            id = message.result.id;
            this.log("Recording stopped with id", id);
            return this.fire("unpublish", this.streamName);
        };
        JanusRecorder.prototype.pluginMessageSlowLink = function(message) {
            return console.log("slow_link");
        };
        JanusRecorder.prototype.pluginLocalStream = function(stream) {
            this.log("plugin got a local stream", stream);
            this.streamLocal = stream;
            return this.attachMediaStream(this.elementMediaLocal, stream);
        };
        JanusRecorder.prototype.pluginRemoteStream = function(stream) {
            this.log("plugin got a remote stream", stream);
            this.streamRemote = stream;
            return this.attachMediaStream(this.elementMediaRemote, stream);
        };
        JanusRecorder.prototype.pluginCleanup = function() {
            return this.log("plugin cleanup");
        };
        JanusRecorder.prototype.attachMediaStream = function(el, stream) {
            if (!el || !stream) {
                return this.log("missing something here", el, stream);
            }
            Adapter.attachMediaStream(el, stream);
            this.log("preview has been started", el, stream);
            return setTimeout(function() {
                return el.play();
            }, 100);
        };
        JanusRecorder.prototype.elementMediaRemoteSet = function(element) {
            this.elementMediaRemote = element;
            return this.attachMediaStream(this.elementMediaRemote, this.streamRemote);
        };
        JanusRecorder.prototype.elementMediaLocalSet = function(element) {
            this.elementMediaLocal = element;
            return this.attachMediaStream(this.elementMediaLocal, this.streamLocal);
        };
        JanusRecorder.prototype.recordingStart = function(streamName, stream) {
            var plugin, ref, self;
            this.streamName = streamName;
            plugin = this.plugin;
            self = this;
            if (plugin != null) {
                if ((ref = plugin.webrtcStuff) != null) {
                    ref.sdpSent = false;
                }
            }
            return plugin.createOffer({
                stream: stream,
                media: {
                    video: true,
                    audio: this.audioStreamActive
                },
                success: function(jsep) {
                    var body;
                    body = {
                        request: "record",
                        name: streamName,
                        filename: streamName
                    };
                    return plugin.send({
                        message: body,
                        jsep: jsep
                    });
                },
                error: function() {
                    self.log("error starting the recording", arguments);
                    return plugin.hangup();
                }
            });
        };
        JanusRecorder.prototype.recordingStop = function() {
            var plugin, stop;
            plugin = this.plugin;
            stop = {
                request: "stop"
            };
            if (plugin) {
                return plugin.send({
                    message: stop
                });
            }
        };
        return JanusRecorder;
    }();
    module.exports = JanusRecorder;
}, function(module, exports, __webpack_require__) {
    var jQuery = __webpack_require__(7);
    var $ = __webpack_require__(7);
    var adapter = __webpack_require__(6);
    var RTCPeerConnection = adapter.RTCPeerConnection;
    var RTCIceCandidate = adapter.RTCIceCandidate;
    var RTCSessionDescription = adapter.RTCSessionDescription;
    var getUserMedia = adapter.getUserMedia;
    var attachMediaStream = adapter.attachMediaStream;
    var webrtcDetectedBrowser = adapter.webrtcDetectedBrowser;
    var webrtcDetectedVersion = adapter.webrtcDetectedVersion;
    Janus.sessions = {};
    Janus.extensionId = "hapfgfdkleiggjjpfpenajgdnfckjpaj";
    Janus.isExtensionEnabled = function() {
        if (window.navigator.userAgent.match("Chrome")) {
            var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
            var maxver = 33;
            if (window.navigator.userAgent.match("Linux")) maxver = 35;
            if (chromever >= 26 && chromever <= maxver) {
                return true;
            }
            return $("#janus-extension-installed").length > 0;
        } else {
            return true;
        }
    };
    Janus.noop = function() {};
    Janus.init = function(options) {
        options = options || {};
        options.autoimport = options.autoimport || false;
        options.callback = typeof options.callback == "function" ? options.callback : Janus.noop;
        if (Janus.initDone === true) {
            options.callback();
        } else {
            if (typeof console == "undefined" || typeof console.log == "undefined") console = {
                log: function() {}
            };
            Janus.log = options.debug === true ? console.log.bind(console) : Janus.noop;
            Janus.log("Initializing library");
            Janus.initDone = true;
            window.onbeforeunload = function() {
                Janus.log("Closing window");
                for (var s in Janus.sessions) {
                    Janus.log("Destroying session " + s);
                    Janus.sessions[s].destroy();
                }
            };
            function addJs(src) {
                if (src === "jquery.min.js") {
                    if (window.jQuery) {
                        options.callback();
                        return;
                    }
                }
                var oHead = document.getElementsByTagName("head").item(0);
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.src = src;
                oScript.onload = function() {
                    Janus.log("Library " + src + " loaded");
                    if (src === "jquery.min.js") {
                        options.callback();
                    }
                };
                oHead.appendChild(oScript);
            }
            if (options.autoimport) {
                addJs("adapter.js");
                addJs("jquery.min.js");
            } else {
                options.callback();
            }
        }
    };
    Janus.isWebrtcSupported = function() {
        if (RTCPeerConnection === null || getUserMedia === null) {
            return false;
        }
        return true;
    };
    function Janus(gatewayCallbacks) {
        if (Janus.initDone === undefined) {
            gatewayCallbacks.error("Library not initialized");
            return {};
        }
        if (!Janus.isWebrtcSupported()) {
            gatewayCallbacks.error("WebRTC not supported by this browser");
            return {};
        }
        Janus.log("Library initialized: " + Janus.initDone);
        gatewayCallbacks = gatewayCallbacks || {};
        gatewayCallbacks.success = typeof gatewayCallbacks.success == "function" ? gatewayCallbacks.success : jQuery.noop;
        gatewayCallbacks.error = typeof gatewayCallbacks.error == "function" ? gatewayCallbacks.error : jQuery.noop;
        gatewayCallbacks.destroyed = typeof gatewayCallbacks.destroyed == "function" ? gatewayCallbacks.destroyed : jQuery.noop;
        if (gatewayCallbacks.server === null || gatewayCallbacks.server === undefined) {
            gatewayCallbacks.error("Invalid gateway url");
            return {};
        }
        var websockets = false;
        var ws = null;
        var servers = null, serversIndex = 0;
        var server = gatewayCallbacks.server;
        if ($.isArray(server)) {
            Janus.log("Multiple servers provided (" + server.length + "), will use the first that works");
            server = null;
            servers = gatewayCallbacks.server;
            Janus.log(servers);
        } else {
            if (server.indexOf("ws") === 0) {
                websockets = true;
                Janus.log("Using WebSockets to contact Janus");
            } else {
                websockets = false;
                Janus.log("Using REST API to contact Janus");
            }
            Janus.log(server);
        }
        var iceServers = gatewayCallbacks.iceServers;
        if (iceServers === undefined || iceServers === null) iceServers = [ {
            url: "stun:stun.l.google.com:19302"
        } ];
        var ipv6Support = gatewayCallbacks.ipv6;
        if (ipv6Support === undefined || ipv6Support === null) ipv6Support = false;
        var maxev = null;
        if (gatewayCallbacks.max_poll_events !== undefined && gatewayCallbacks.max_poll_events !== null) maxev = gatewayCallbacks.max_poll_events;
        if (maxev < 1) maxev = 1;
        var connected = false;
        var sessionId = null;
        var pluginHandles = {};
        var that = this;
        var retries = 0;
        var transactions = {};
        createSession(gatewayCallbacks);
        this.getServer = function() {
            return server;
        };
        this.isConnected = function() {
            return connected;
        };
        this.getSessionId = function() {
            return sessionId;
        };
        this.destroy = function(callbacks) {
            destroySession(callbacks);
        };
        this.attach = function(callbacks) {
            createHandle(callbacks);
        };
        function randomString(len) {
            charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var randomString = "";
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            return randomString;
        }
        function eventHandler() {
            if (sessionId == null) return;
            Janus.log("Long poll...");
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                return;
            }
            var longpoll = server + "/" + sessionId + "?rid=" + new Date().getTime();
            if (maxev !== undefined && maxev !== null) longpoll = longpoll + "&maxev=" + maxev;
            $.ajax({
                type: "GET",
                url: longpoll,
                cache: false,
                timeout: 6e4,
                success: handleEvent,
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                    retries++;
                    if (retries > 3) {
                        connected = false;
                        gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
                        return;
                    }
                    eventHandler();
                },
                dataType: "json"
            });
        }
        function handleEvent(json) {
            retries = 0;
            if (!websockets && sessionId !== undefined && sessionId !== null) setTimeout(eventHandler, 200);
            Janus.log("Got event on session " + sessionId);
            Janus.log(json);
            if (!websockets && $.isArray(json)) {
                for (var i = 0; i < json.length; i++) {
                    handleEvent(json[i]);
                }
                return;
            }
            if (json["janus"] === "keepalive") {
                return;
            } else if (json["janus"] === "ack") {
                return;
            } else if (json["janus"] === "success") {
                var transaction = json["transaction"];
                if (transaction !== null && transaction !== undefined) {
                    var reportSuccess = transactions[transaction];
                    if (reportSuccess !== null && reportSuccess !== undefined) {
                        reportSuccess(json);
                    }
                    transactions[transaction] = null;
                }
                return;
            } else if (json["janus"] === "webrtcup") {
                return;
            } else if (json["janus"] === "hangup") {
                var sender = json["sender"];
                if (sender === undefined || sender === null) {
                    Janus.log("Missing sender...");
                    return;
                }
                var pluginHandle = pluginHandles[sender];
                if (pluginHandle === undefined || pluginHandle === null) {
                    Janus.log("This handle is not attached to this session");
                    return;
                }
                pluginHandle.hangup();
            } else if (json["janus"] === "detached") {
                var sender = json["sender"];
                if (sender === undefined || sender === null) {
                    Janus.log("Missing sender...");
                    return;
                }
                var pluginHandle = pluginHandles[sender];
                if (pluginHandle === undefined || pluginHandle === null) {
                    Janus.log("This handle is not attached to this session");
                    return;
                }
                pluginHandle.ondetached();
                pluginHandle.detach();
            } else if (json["janus"] === "error") {
                Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                var transaction = json["transaction"];
                if (transaction !== null && transaction !== undefined) {
                    var reportSuccess = transactions[transaction];
                    if (reportSuccess !== null && reportSuccess !== undefined) {
                        reportSuccess(json);
                    }
                    transactions[transaction] = null;
                }
                return;
            } else if (json["janus"] === "event") {
                var sender = json["sender"];
                if (sender === undefined || sender === null) {
                    Janus.log("Missing sender...");
                    return;
                }
                var plugindata = json["plugindata"];
                if (plugindata === undefined || plugindata === null) {
                    Janus.log("Missing plugindata...");
                    return;
                }
                Janus.log("  -- Event is coming from " + sender + " (" + plugindata["plugin"] + ")");
                var data = plugindata["data"];
                Janus.log(data);
                var pluginHandle = pluginHandles[sender];
                if (pluginHandle === undefined || pluginHandle === null) {
                    Janus.log("This handle is not attached to this session");
                    return;
                }
                var jsep = json["jsep"];
                if (jsep !== undefined && jsep !== null) {
                    Janus.log("Handling SDP as well...");
                    Janus.log(jsep);
                }
                var callback = pluginHandle.onmessage;
                if (callback !== null && callback !== undefined) {
                    Janus.log("Notifying application...");
                    callback(data, jsep);
                } else {
                    Janus.log("No provided notification callback");
                }
            } else {
                Janus.log("Unknown message '" + json["janus"] + "'");
            }
        }
        function keepAlive() {
            if (server === null || !websockets || !connected) return;
            setTimeout(keepAlive, 3e4);
            var request = {
                janus: "keepalive",
                session_id: sessionId,
                transaction: randomString(12)
            };
            ws.send(JSON.stringify(request));
        }
        function createSession(callbacks) {
            var transaction = randomString(12);
            var request = {
                janus: "create",
                transaction: transaction
            };
            if (server === null && $.isArray(servers)) {
                server = servers[serversIndex];
                if (server.indexOf("ws") === 0) {
                    websockets = true;
                    Janus.log("Server #" + (serversIndex + 1) + ": trying WebSockets to contact Janus");
                } else {
                    websockets = false;
                    Janus.log("Server #" + (serversIndex + 1) + ": trying REST API to contact Janus");
                }
                Janus.log(server);
            }
            if (websockets) {
                ws = new WebSocket(server);
                ws.onerror = function() {
                    Janus.log("Error connecting to the Janus WebSockets server...");
                    if ($.isArray(servers)) {
                        serversIndex++;
                        if (serversIndex == servers.length) {
                            callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                            return;
                        }
                        server = null;
                        setTimeout(function() {
                            createSession(callbacks);
                        }, 200);
                        return;
                    }
                    callbacks.error("Error connecting to the Janus WebSockets server: Is the gateway down?");
                };
                ws.onopen = function() {
                    transactions[transaction] = function(json) {
                        Janus.log("Create session:");
                        Janus.log(json);
                        if (json["janus"] !== "success") {
                            Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                            callbacks.error(json["error"].reason);
                            return;
                        }
                        setTimeout(keepAlive, 3e4);
                        connected = true;
                        sessionId = json.data["id"];
                        Janus.log("Created session: " + sessionId);
                        Janus.sessions[sessionId] = that;
                        callbacks.success();
                    };
                    ws.send(JSON.stringify(request));
                };
                ws.onmessage = function(event) {
                    handleEvent(JSON.parse(event.data));
                };
                ws.onclose = function() {
                    if (server === null || !connected) return;
                    connected = false;
                    gatewayCallbacks.error("Lost connection to the gateway (is it down?)");
                };
                return;
            }
            $.ajax({
                type: "POST",
                url: server,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log("Create session:");
                    Janus.log(json);
                    if (json["janus"] !== "success") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                        callbacks.error(json["error"].reason);
                        return;
                    }
                    connected = true;
                    sessionId = json.data["id"];
                    Janus.log("Created session: " + sessionId);
                    Janus.sessions[sessionId] = that;
                    eventHandler();
                    callbacks.success();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                    if ($.isArray(servers)) {
                        serversIndex++;
                        if (serversIndex == servers.length) {
                            callbacks.error("Error connecting to any of the provided Janus servers: Is the gateway down?");
                            return;
                        }
                        server = null;
                        setTimeout(function() {
                            createSession(callbacks);
                        }, 200);
                        return;
                    }
                    if (errorThrown === "") callbacks.error(textStatus + ": Is the gateway down?"); else callbacks.error(textStatus + ": " + errorThrown);
                },
                dataType: "json"
            });
        }
        function destroySession(callbacks, syncRequest) {
            syncRequest = syncRequest === true;
            Janus.log("Destroying session " + sessionId + " (sync=" + syncRequest + ")");
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                callbacks.success();
                return;
            }
            if (sessionId === undefined || sessionId === null) {
                Janus.log("No session to destroy");
                callbacks.success();
                gatewayCallbacks.destroyed();
                return;
            }
            delete Janus.sessions[sessionId];
            for (ph in pluginHandles) {
                var phv = pluginHandles[ph];
                Janus.log("Destroying handle " + phv.id + " (" + phv.plugin + ")");
                destroyHandle(phv.id, null, syncRequest);
            }
            var request = {
                janus: "destroy",
                transaction: randomString(12)
            };
            if (websockets) {
                request["session_id"] = sessionId;
                ws.send(JSON.stringify(request));
                callbacks.success();
                gatewayCallbacks.destroyed();
                return;
            }
            $.ajax({
                type: "POST",
                url: server + "/" + sessionId,
                async: syncRequest,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log("Destroyed session:");
                    Janus.log(json);
                    sessionId = null;
                    connected = false;
                    if (json["janus"] !== "success") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                    }
                    callbacks.success();
                    gatewayCallbacks.destroyed();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                    sessionId = null;
                    connected = false;
                    callbacks.success();
                    gatewayCallbacks.destroyed();
                },
                dataType: "json"
            });
        }
        function createHandle(callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            callbacks.consentDialog = typeof callbacks.consentDialog == "function" ? callbacks.consentDialog : jQuery.noop;
            callbacks.onmessage = typeof callbacks.onmessage == "function" ? callbacks.onmessage : jQuery.noop;
            callbacks.onlocalstream = typeof callbacks.onlocalstream == "function" ? callbacks.onlocalstream : jQuery.noop;
            callbacks.onremotestream = typeof callbacks.onremotestream == "function" ? callbacks.onremotestream : jQuery.noop;
            callbacks.ondata = typeof callbacks.ondata == "function" ? callbacks.ondata : jQuery.noop;
            callbacks.ondataopen = typeof callbacks.ondataopen == "function" ? callbacks.ondataopen : jQuery.noop;
            callbacks.oncleanup = typeof callbacks.oncleanup == "function" ? callbacks.oncleanup : jQuery.noop;
            callbacks.ondetached = typeof callbacks.ondetached == "function" ? callbacks.ondetached : jQuery.noop;
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                callbacks.error("Is the gateway down? (connected=false)");
                return;
            }
            var plugin = callbacks.plugin;
            if (plugin === undefined || plugin === null) {
                Janus.log("Invalid plugin");
                callbacks.error("Invalid plugin");
                return;
            }
            var transaction = randomString(12);
            var request = {
                janus: "attach",
                plugin: plugin,
                transaction: transaction
            };
            if (websockets) {
                transactions[transaction] = function(json) {
                    Janus.log("Create handle:");
                    Janus.log(json);
                    if (json["janus"] !== "success") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                        callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                        return;
                    }
                    var handleId = json.data["id"];
                    Janus.log("Created handle: " + handleId);
                    var pluginHandle = {
                        session: that,
                        plugin: plugin,
                        id: handleId,
                        webrtcStuff: {
                            started: false,
                            myStream: null,
                            mySdp: null,
                            pc: null,
                            dataChannel: null,
                            dtmfSender: null,
                            trickle: true,
                            iceDone: false,
                            sdpSent: false,
                            bitrate: {
                                value: null,
                                bsnow: null,
                                bsbefore: null,
                                tsnow: null,
                                tsbefore: null,
                                timer: null
                            }
                        },
                        getId: function() {
                            return handleId;
                        },
                        getPlugin: function() {
                            return plugin;
                        },
                        getBitrate: function() {
                            return getBitrate(handleId);
                        },
                        send: function(callbacks) {
                            sendMessage(handleId, callbacks);
                        },
                        data: function(callbacks) {
                            sendData(handleId, callbacks);
                        },
                        dtmf: function(callbacks) {
                            sendDtmf(handleId, callbacks);
                        },
                        consentDialog: callbacks.consentDialog,
                        onmessage: callbacks.onmessage,
                        createOffer: function(callbacks) {
                            prepareWebrtc(handleId, callbacks);
                        },
                        createAnswer: function(callbacks) {
                            prepareWebrtc(handleId, callbacks);
                        },
                        handleRemoteJsep: function(callbacks) {
                            prepareWebrtcPeer(handleId, callbacks);
                        },
                        onlocalstream: callbacks.onlocalstream,
                        onremotestream: callbacks.onremotestream,
                        ondata: callbacks.ondata,
                        ondataopen: callbacks.ondataopen,
                        oncleanup: callbacks.oncleanup,
                        ondetached: callbacks.ondetached,
                        hangup: function() {
                            cleanupWebrtc(handleId);
                        },
                        detach: function(callbacks) {
                            destroyHandle(handleId, callbacks);
                        }
                    };
                    pluginHandles[handleId] = pluginHandle;
                    callbacks.success(pluginHandle);
                };
                request["session_id"] = sessionId;
                ws.send(JSON.stringify(request));
                return;
            }
            $.ajax({
                type: "POST",
                url: server + "/" + sessionId,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log("Create handle:");
                    Janus.log(json);
                    if (json["janus"] !== "success") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                        callbacks.error("Ooops: " + json["error"].code + " " + json["error"].reason);
                        return;
                    }
                    var handleId = json.data["id"];
                    Janus.log("Created handle: " + handleId);
                    var pluginHandle = {
                        session: that,
                        plugin: plugin,
                        id: handleId,
                        webrtcStuff: {
                            started: false,
                            myStream: null,
                            mySdp: null,
                            pc: null,
                            dataChannel: null,
                            dtmfSender: null,
                            trickle: true,
                            iceDone: false,
                            sdpSent: false,
                            bitrate: {
                                value: null,
                                bsnow: null,
                                bsbefore: null,
                                tsnow: null,
                                tsbefore: null,
                                timer: null
                            }
                        },
                        getId: function() {
                            return handleId;
                        },
                        getPlugin: function() {
                            return plugin;
                        },
                        getBitrate: function() {
                            return getBitrate(handleId);
                        },
                        send: function(callbacks) {
                            sendMessage(handleId, callbacks);
                        },
                        data: function(callbacks) {
                            sendData(handleId, callbacks);
                        },
                        dtmf: function(callbacks) {
                            sendDtmf(handleId, callbacks);
                        },
                        consentDialog: callbacks.consentDialog,
                        onmessage: callbacks.onmessage,
                        createOffer: function(callbacks) {
                            prepareWebrtc(handleId, callbacks);
                        },
                        createAnswer: function(callbacks) {
                            prepareWebrtc(handleId, callbacks);
                        },
                        handleRemoteJsep: function(callbacks) {
                            prepareWebrtcPeer(handleId, callbacks);
                        },
                        onlocalstream: callbacks.onlocalstream,
                        onremotestream: callbacks.onremotestream,
                        ondata: callbacks.ondata,
                        ondataopen: callbacks.ondataopen,
                        oncleanup: callbacks.oncleanup,
                        ondetached: callbacks.ondetached,
                        hangup: function() {
                            cleanupWebrtc(handleId);
                        },
                        detach: function(callbacks) {
                            destroyHandle(handleId, callbacks);
                        }
                    };
                    pluginHandles[handleId] = pluginHandle;
                    callbacks.success(pluginHandle);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                },
                dataType: "json"
            });
        }
        function sendMessage(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                callbacks.error("Is the gateway down? (connected=false)");
                return;
            }
            var message = callbacks.message;
            var jsep = callbacks.jsep;
            var request = {
                janus: "message",
                body: message,
                transaction: randomString(12)
            };
            if (jsep !== null && jsep !== undefined) request.jsep = jsep;
            Janus.log("Sending message to plugin (handle=" + handleId + "):");
            Janus.log(request);
            if (websockets) {
                request["session_id"] = sessionId;
                request["handle_id"] = handleId;
                ws.send(JSON.stringify(request));
                return;
            }
            $.ajax({
                type: "POST",
                url: server + "/" + sessionId + "/" + handleId,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log(json);
                    Janus.log("Message sent!");
                    if (json["janus"] === "success") {
                        var plugindata = json["plugindata"];
                        if (plugindata === undefined || plugindata === null) {
                            Janus.log("Request succeeded, but missing plugindata...");
                            callbacks.success();
                            return;
                        }
                        Janus.log("Synchronous transaction successful (" + plugindata["plugin"] + ")");
                        var data = plugindata["data"];
                        Janus.log(data);
                        callbacks.success(data);
                        return;
                    } else if (json["janus"] !== "ack") {
                        if (json["error"] !== undefined && json["error"] !== null) {
                            Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                            callbacks.error(json["error"].code + " " + json["error"].reason);
                        } else {
                            Janus.log("Unknown error");
                            callbacks.error("Unknown error");
                        }
                        return;
                    }
                    callbacks.success();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                    callbacks.error(textStatus + ": " + errorThrown);
                },
                dataType: "json"
            });
        }
        function sendTrickleCandidate(handleId, candidate) {
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                return;
            }
            var request = {
                janus: "trickle",
                candidate: candidate,
                transaction: randomString(12)
            };
            Janus.log("Sending trickle candidate (handle=" + handleId + "):");
            Janus.log(request);
            if (websockets) {
                request["session_id"] = sessionId;
                request["handle_id"] = handleId;
                ws.send(JSON.stringify(request));
                return;
            }
            $.ajax({
                type: "POST",
                url: server + "/" + sessionId + "/" + handleId,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log(json);
                    Janus.log("Candidate sent!");
                    if (json["janus"] !== "ack") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                        return;
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                },
                dataType: "json"
            });
        }
        function sendData(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (config.dataChannel === null || config.dataChannel === undefined) {
                Janus.log("Invalid data channel");
                callbacks.error("Invalid data channel");
                return;
            }
            var text = callbacks.text;
            if (text === null || text === undefined) {
                Janus.log("Invalid text");
                callbacks.error("Invalid text");
                return;
            }
            Janus.log("Sending string on data channel: " + text);
            config.dataChannel.send(text);
            callbacks.success();
        }
        function sendDtmf(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (config.dtmfSender === null || config.dtmfSender === undefined) {
                if (config.myStream !== undefined && config.myStream !== null) {
                    var tracks = config.myStream.getAudioTracks();
                    if (tracks !== null && tracks !== undefined && tracks.length > 0) {
                        var local_audio_track = tracks[0];
                        config.dtmfSender = config.pc.createDTMFSender(local_audio_track);
                        Janus.log("Created DTMF Sender");
                        config.dtmfSender.ontonechange = function(tone) {
                            Janus.log("Sent DTMF tone: " + tone.tone);
                        };
                    }
                }
                if (config.dtmfSender === null || config.dtmfSender === undefined) {
                    Janus.log("Invalid DTMF configuration");
                    callbacks.error("Invalid DTMF configuration");
                    return;
                }
            }
            var dtmf = callbacks.dtmf;
            if (dtmf === null || dtmf === undefined) {
                Janus.log("Invalid DTMF parameters");
                callbacks.error("Invalid DTMF parameters");
                return;
            }
            var tones = dtmf.tones;
            if (tones === null || tones === undefined) {
                Janus.log("Invalid DTMF string");
                callbacks.error("Invalid DTMF string");
                return;
            }
            var duration = dtmf.duration;
            if (duration === null || duration === undefined) duration = 500;
            var gap = dtmf.gap;
            if (gap === null || gap === undefined) gap = 50;
            Janus.log("Sending DTMF string " + tones + " (duration " + duration + "ms, gap " + gap + "ms");
            config.dtmfSender.insertDTMF(tones, duration, gap);
        }
        function destroyHandle(handleId, callbacks, syncRequest) {
            syncRequest = syncRequest === true;
            Janus.log("Destroying handle " + handleId + " (sync=" + syncRequest + ")");
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            cleanupWebrtc(handleId);
            if (!connected) {
                Janus.log("Is the gateway down? (connected=false)");
                callbacks.error("Is the gateway down? (connected=false)");
                return;
            }
            var request = {
                janus: "detach",
                transaction: randomString(12)
            };
            if (websockets) {
                request["session_id"] = sessionId;
                request["handle_id"] = handleId;
                ws.send(JSON.stringify(request));
                var pluginHandle = pluginHandles[handleId];
                delete pluginHandles[handleId];
                callbacks.success();
                return;
            }
            $.ajax({
                type: "POST",
                url: server + "/" + sessionId + "/" + handleId,
                async: syncRequest,
                cache: false,
                contentType: "application/json",
                data: JSON.stringify(request),
                success: function(json) {
                    Janus.log("Destroyed handle:");
                    Janus.log(json);
                    if (json["janus"] !== "success") {
                        Janus.log("Ooops: " + json["error"].code + " " + json["error"].reason);
                    }
                    var pluginHandle = pluginHandles[handleId];
                    delete pluginHandles[handleId];
                    callbacks.success();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    Janus.log(textStatus + ": " + errorThrown);
                    var pluginHandle = pluginHandles[handleId];
                    delete pluginHandles[handleId];
                    callbacks.success();
                },
                dataType: "json"
            });
        }
        function streamsDone(handleId, jsep, media, callbacks, stream) {
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (stream !== null && stream !== undefined) Janus.log(stream);
            config.myStream = stream;
            Janus.log("streamsDone:");
            if (stream !== null && stream !== undefined) Janus.log(stream);
            var pc_config = {
                iceServers: iceServers
            };
            var pc_constraints = {
                optional: [ {
                    DtlsSrtpKeyAgreement: true
                } ]
            };
            if (ipv6Support === true) {
                pc_constraints.optional.push({
                    googIPv6: true
                });
            }
            Janus.log("Creating PeerConnection:");
            Janus.log(pc_constraints);
            config.pc = new RTCPeerConnection(pc_config, pc_constraints);
            Janus.log(config.pc);
            if (config.pc.getStats && webrtcDetectedBrowser == "chrome") config.bitrate.value = "0 kbps";
            Janus.log("Preparing local SDP and gathering candidates (trickle=" + config.trickle + ")");
            config.pc.onicecandidate = function(event) {
                if (event.candidate == null) {
                    Janus.log("End of candidates.");
                    config.iceDone = true;
                    if (config.trickle === true) {
                        sendTrickleCandidate(handleId, {
                            completed: true
                        });
                    } else {
                        sendSDP(handleId, callbacks);
                    }
                } else {
                    Janus.log("candidates: " + JSON.stringify(event.candidate));
                    if (config.trickle === true) {
                        sendTrickleCandidate(handleId, event.candidate);
                    }
                }
            };
            if (stream !== null && stream !== undefined) {
                Janus.log("Adding local stream");
                config.pc.addStream(stream);
                pluginHandle.onlocalstream(stream);
            }
            config.pc.onaddstream = function(remoteStream) {
                Janus.log("Handling Remote Stream:");
                Janus.log(remoteStream);
                if (config.pc.getStats && webrtcDetectedBrowser == "chrome") {
                    Janus.log("Starting bitrate monitor");
                    config.bitrate.timer = setInterval(function() {
                        config.pc.getStats(function(stats) {
                            var results = stats.result();
                            for (var i = 0; i < results.length; i++) {
                                var res = results[i];
                                if (res.type == "ssrc" && res.stat("googFrameHeightReceived")) {
                                    config.bitrate.bsnow = res.stat("bytesReceived");
                                    config.bitrate.tsnow = res.timestamp;
                                    if (config.bitrate.bsbefore === null || config.bitrate.tsbefore === null) {
                                        config.bitrate.bsbefore = config.bitrate.bsnow;
                                        config.bitrate.tsbefore = config.bitrate.tsnow;
                                    } else {
                                        var bitRate = Math.round((config.bitrate.bsnow - config.bitrate.bsbefore) * 8 / (config.bitrate.tsnow - config.bitrate.tsbefore));
                                        config.bitrate.value = bitRate + " kbits/sec";
                                        config.bitrate.bsbefore = config.bitrate.bsnow;
                                        config.bitrate.tsbefore = config.bitrate.tsnow;
                                    }
                                }
                            }
                        });
                    }, 1e3);
                }
                pluginHandle.onremotestream(remoteStream.stream);
            };
            if (isDataEnabled(media)) {
                Janus.log("Creating data channel");
                var onDataChannelMessage = function(event) {
                    Janus.log("Received message on data channel: " + event.data);
                    pluginHandle.ondata(event.data);
                };
                var onDataChannelStateChange = function() {
                    var dcState = config.dataChannel !== null ? config.dataChannel.readyState : "null";
                    Janus.log("State change on data channel: " + dcState);
                    if (dcState === "open") {
                        pluginHandle.ondataopen();
                    }
                };
                var onDataChannelError = function(error) {
                    Janus.log("Got error on data channel:");
                    Janus.log(error);
                };
                config.dataChannel = config.pc.createDataChannel("JanusDataChannel", {
                    ordered: false
                });
                config.dataChannel.onmessage = onDataChannelMessage;
                config.dataChannel.onopen = onDataChannelStateChange;
                config.dataChannel.onclose = onDataChannelStateChange;
                config.dataChannel.onerror = onDataChannelError;
            }
            if (jsep === null || jsep === undefined) {
                createOffer(handleId, media, callbacks);
            } else {
                config.pc.setRemoteDescription(new RTCSessionDescription(jsep), function() {
                    Janus.log("Remote description accepted!");
                    createAnswer(handleId, media, callbacks);
                }, callbacks.error);
            }
        }
        function prepareWebrtc(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : webrtcError;
            var jsep = callbacks.jsep;
            var media = callbacks.media;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (config.pc !== undefined && config.pc !== null) {
                Janus.log("Updating existing media session");
                if (jsep === null || jsep === undefined) {
                    createOffer(handleId, media, callbacks);
                } else {
                    config.pc.setRemoteDescription(new RTCSessionDescription(jsep), function() {
                        Janus.log("Remote description accepted!");
                        createAnswer(handleId, media, callbacks);
                    }, callbacks.error);
                }
                return;
            }
            config.trickle = isTrickleEnabled(callbacks.trickle);
            if (callbacks.stream && !callbacks.stream.ended) {
                streamsDone(handleId, jsep, media, callbacks, callbacks.stream);
                return;
            }
            if (isAudioSendEnabled(media) || isVideoSendEnabled(media)) {
                var constraints = {
                    mandatory: {},
                    optional: []
                };
                pluginHandle.consentDialog(true);
                var videoSupport = isVideoSendEnabled(media);
                if (videoSupport === true && media != undefined && media != null) {
                    if (media.video === "lowres") {
                        if (!navigator.mozGetUserMedia) {
                            videoSupport = {
                                mandatory: {
                                    maxHeight: "240",
                                    maxWidth: "320"
                                },
                                optional: []
                            };
                            Janus.log("Adding media constraint (low-res video)");
                            Janus.log(videoSupport);
                        } else {
                            Janus.log("Firefox doesn't support media constraints at the moment, ignoring low-res video");
                        }
                    } else if (media.video === "hires") {
                        if (!navigator.mozGetUserMedia) {
                            videoSupport = {
                                mandatory: {
                                    minHeight: "720",
                                    minWidth: "1280"
                                },
                                optional: []
                            };
                            Janus.log("Adding media constraint (hi-res video)");
                            Janus.log(videoSupport);
                        } else {
                            Janus.log("Firefox doesn't support media constraints at the moment, ignoring hi-res video");
                        }
                    } else if (media.video === "screen") {
                        if (window.location.protocol !== "https:") {
                            Janus.log("Screen sharing only works on HTTPS, try the https:// version of this page");
                            pluginHandle.consentDialog(false);
                            callbacks.error("Screen sharing only works on HTTPS, try the https:// version of this page");
                            return;
                        }
                        var cache = {};
                        function callbackUserMedia(error, stream) {
                            pluginHandle.consentDialog(false);
                            if (error) {
                                callbacks.error(error);
                            } else {
                                streamsDone(handleId, jsep, media, callbacks, stream);
                            }
                        }
                        function getScreenMedia(constraints, gsmCallback) {
                            Janus.log("Adding media constraint (screen capture)");
                            Janus.log(constraints);
                            getUserMedia(constraints, function(stream) {
                                gsmCallback(null, stream);
                            }, function(error) {
                                pluginHandle.consentDialog(false);
                                gsmCallback(error);
                            });
                        }
                        if (window.navigator.userAgent.match("Chrome")) {
                            var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
                            var maxver = 33;
                            if (window.navigator.userAgent.match("Linux")) maxver = 35;
                            if (chromever >= 26 && chromever <= maxver) {
                                constraints = {
                                    video: {
                                        mandatory: {
                                            googLeakyBucket: true,
                                            maxWidth: window.screen.width,
                                            maxHeight: window.screen.height,
                                            maxFrameRate: 3,
                                            chromeMediaSource: "screen"
                                        }
                                    },
                                    audio: isAudioSendEnabled(media)
                                };
                                getScreenMedia(constraints, callbackUserMedia);
                            } else {
                                var pending = window.setTimeout(function() {
                                    error = new Error("NavigatorUserMediaError");
                                    error.name = 'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)';
                                    pluginHandle.consentDialog(false);
                                    return callbacks.error(error);
                                }, 1e3);
                                cache[pending] = [ callbackUserMedia, null ];
                                window.postMessage({
                                    type: "janusGetScreen",
                                    id: pending
                                }, "*");
                            }
                        } else if (window.navigator.userAgent.match("Firefox")) {
                            var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
                            if (ffver >= 33) {
                                constraints = {
                                    video: {
                                        mozMediaSource: "window",
                                        mediaSource: "window"
                                    },
                                    audio: isAudioSendEnabled(media)
                                };
                                getScreenMedia(constraints, function(err, stream) {
                                    callbackUserMedia(err, stream);
                                    if (!err) {
                                        var lastTime = stream.currentTime;
                                        var polly = window.setInterval(function() {
                                            if (!stream) window.clearInterval(polly);
                                            if (stream.currentTime == lastTime) {
                                                window.clearInterval(polly);
                                                if (stream.onended) {
                                                    stream.onended();
                                                }
                                            }
                                            lastTime = stream.currentTime;
                                        }, 500);
                                    }
                                });
                            } else {
                                var error = new Error("NavigatorUserMediaError");
                                error.name = "Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)";
                                pluginHandle.consentDialog(false);
                                callbacks.error(error);
                                return;
                            }
                        }
                        window.addEventListener("message", function(event) {
                            if (event.origin != window.location.origin) return;
                            if (event.data.type == "janusGotScreen" && cache[event.data.id]) {
                                var data = cache[event.data.id];
                                var callback = data[0];
                                delete cache[event.data.id];
                                if (event.data.sourceId === "") {
                                    var error = new Error("NavigatorUserMediaError");
                                    error.name = "You cancelled the request for permission, giving up...";
                                    pluginHandle.consentDialog(false);
                                    callbacks.error(error);
                                } else {
                                    constraints = {
                                        audio: isAudioSendEnabled(media),
                                        video: {
                                            mandatory: {
                                                chromeMediaSource: "desktop",
                                                maxWidth: window.screen.width,
                                                maxHeight: window.screen.height,
                                                maxFrameRate: 3
                                            },
                                            optional: [ {
                                                googLeakyBucket: true
                                            }, {
                                                googTemporalLayeredScreencast: true
                                            } ]
                                        }
                                    };
                                    constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
                                    getScreenMedia(constraints, callback);
                                }
                            } else if (event.data.type == "janusGetScreenPending") {
                                window.clearTimeout(event.data.id);
                            }
                        });
                    }
                }
                if (media === null || media === undefined || media.video !== "screen") {
                    MediaStreamTrack.getSources(function(sources) {
                        var audioExist = sources.some(function(source) {
                            return source.kind === "audio";
                        }), videoExist = sources.some(function(source) {
                            return source.kind === "video";
                        });
                        if (!audioExist && !videoExist) {
                            pluginHandle.consentDialog(false);
                            callbacks.error("No capture device found");
                            return false;
                        }
                        getUserMedia({
                            audio: audioExist && isAudioSendEnabled(media),
                            video: videoExist && videoSupport
                        }, function(stream) {
                            pluginHandle.consentDialog(false);
                            streamsDone(handleId, jsep, media, callbacks, stream);
                        }, function(error) {
                            pluginHandle.consentDialog(false);
                            callbacks.error(error);
                        });
                    });
                }
            } else {
                streamsDone(handleId, jsep, media, callbacks);
            }
        }
        function prepareWebrtcPeer(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : webrtcError;
            var jsep = callbacks.jsep;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (jsep !== undefined && jsep !== null) {
                if (config.pc === null) {
                    Janus.log("Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep");
                    callbacks.error("No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep");
                    return;
                }
                config.pc.setRemoteDescription(new RTCSessionDescription(jsep), function() {
                    Janus.log("Remote description accepted!");
                    callbacks.success();
                }, callbacks.error);
            } else {
                callbacks.error("Invalid JSEP");
            }
        }
        function createOffer(handleId, media, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            Janus.log("Creating offer (iceDone=" + config.iceDone + ")");
            var mediaConstraints = {
                offerToReceiveAudio: isAudioRecvEnabled(media) || isAudioSendEnabled(media),
                offerToReceiveVideo: isVideoRecvEnabled(media) || isVideoSendEnabled(media)
            };
            Janus.log(mediaConstraints);
            config.pc.createOffer(function(offer) {
                Janus.log(offer);
                if (config.mySdp === null || config.mySdp === undefined) {
                    Janus.log("Setting local description");
                    config.mySdp = offer.sdp;
                    config.pc.setLocalDescription(offer);
                }
                if (!config.iceDone && !config.trickle) {
                    Janus.log("Waiting for all candidates...");
                    return;
                }
                if (config.sdpSent) {
                    Janus.log("Offer already sent, not sending it again");
                    return;
                }
                Janus.log("Offer ready");
                Janus.log(callbacks);
                config.sdpSent = true;
                callbacks.success(offer);
            }, callbacks.error, mediaConstraints);
        }
        function createAnswer(handleId, media, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            Janus.log("Creating answer (iceDone=" + config.iceDone + ")");
            var mediaConstraints = {
                offerToReceiveAudio: isAudioRecvEnabled(media),
                offerToReceiveVideo: isVideoRecvEnabled(media)
            };
            Janus.log(mediaConstraints);
            config.pc.createAnswer(function(answer) {
                Janus.log(answer);
                if (config.mySdp === null || config.mySdp === undefined) {
                    Janus.log("Setting local description");
                    config.mySdp = answer.sdp;
                    config.pc.setLocalDescription(answer);
                }
                if (!config.iceDone && !config.trickle) {
                    Janus.log("Waiting for all candidates...");
                    return;
                }
                if (config.sdpSent) {
                    Janus.log("Answer already sent, not sending it again");
                    return;
                }
                config.sdpSent = true;
                callbacks.success(answer);
            }, callbacks.error, mediaConstraints);
        }
        function sendSDP(handleId, callbacks) {
            callbacks = callbacks || {};
            callbacks.success = typeof callbacks.success == "function" ? callbacks.success : jQuery.noop;
            callbacks.error = typeof callbacks.error == "function" ? callbacks.error : jQuery.noop;
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            Janus.log("Sending offer/answer SDP...");
            if (config.mySdp === null || config.mySdp === undefined) {
                Janus.log("Local SDP instance is invalid, not sending anything...");
                return;
            }
            config.mySdp = config.pc.localDescription;
            if (config.sdpSent) {
                Janus.log("Offer/Answer SDP already sent, not sending it again");
                return;
            }
            Janus.log(callbacks);
            config.sdpSent = true;
            callbacks.success(config.mySdp);
        }
        function getBitrate(handleId) {
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (config.bitrate.value === undefined || config.bitrate.value === null) return "Feature unsupported by browser";
            return config.bitrate.value;
        }
        function webrtcError(error) {
            Janus.log("WebRTC error:");
            Janus.log(error);
        }
        function cleanupWebrtc(handleId) {
            Janus.log("Cleaning WebRTC stuff");
            var pluginHandle = pluginHandles[handleId];
            var config = pluginHandle.webrtcStuff;
            if (config.bitrate.timer) clearInterval(config.bitrate.timer);
            config.bitrate.timer = null;
            config.bitrate.bsnow = null;
            config.bitrate.bsbefore = null;
            config.bitrate.tsnow = null;
            config.bitrate.tsbefore = null;
            config.bitrate.value = null;
            if (config.myStream !== null && config.myStream !== undefined) {
                Janus.log("Stopping local stream");
                if (config.myStream.stop) {
                    config.myStream.stop();
                } else {
                    var tracks = config.myStream.getTracks();
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                }
                config.myStream.ended = true;
            }
            config.myStream = null;
            try {
                config.pc.close();
            } catch (e) {}
            config.pc = null;
            config.mySdp = null;
            config.iceDone = false;
            config.sdpSent = false;
            config.dataChannel = null;
            config.dtmfSender = null;
            pluginHandle.oncleanup();
        }
        function isAudioSendEnabled(media) {
            Janus.log("isAudioSendEnabled:");
            Janus.log(media);
            if (media === undefined || media === null) return true;
            if (media.audio === false) return false;
            if (media.audioSend === undefined || media.audioSend === null) return true;
            return media.audioSend === true;
        }
        function isAudioRecvEnabled(media) {
            Janus.log("isAudioRecvEnabled:");
            Janus.log(media);
            if (media === undefined || media === null) return true;
            if (media.audio === false) return false;
            if (media.audioRecv === undefined || media.audioRecv === null) return true;
            return media.audioRecv === true;
        }
        function isVideoSendEnabled(media) {
            Janus.log("isVideoSendEnabled:");
            Janus.log(media);
            if (media === undefined || media === null) return true;
            if (media.video === false) return false;
            if (media.videoSend === undefined || media.videoSend === null) return true;
            return media.videoSend === true;
        }
        function isVideoRecvEnabled(media) {
            Janus.log("isVideoRecvEnabled:");
            Janus.log(media);
            if (media === undefined || media === null) return true;
            if (media.video === false) return false;
            if (media.videoRecv === undefined || media.videoRecv === null) return true;
            return media.videoRecv === true;
        }
        function isDataEnabled(media) {
            Janus.log("isDataEnabled:");
            Janus.log(media);
            if (media === undefined || media === null) return false;
            return media.data === true;
        }
        function isTrickleEnabled(trickle) {
            Janus.log("isTrickleEnabled:");
            Janus.log(trickle);
            if (trickle === undefined || trickle === null) return true;
            return trickle === true;
        }
    }
    module.exports = Janus;
} ]);

Date.now = Date.now || function() {
    return +new Date();
};

window.console = window.console || function() {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(s) {};
    return c;
}();

var vrtCookie = {};

vrtCookie.create = function(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

vrtCookie.read = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

vrtCookie.erase = function(name) {
    if (vrtCookie && vrtCookie.create) vrtCookie.create(name, "", -1);
};

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
    this.uploadLinkRepeat = function(mediaURL, cb) {
        var ceclient = this;
        javaRest.facevideo.uploadLinkRepeat(mediaURL, function(res) {
            if (res && res.responseId) {
                ceclient.responseId = res.responseId;
                if (cb) cb(res, false);
            } else {
                ceclient.responseId = null;
                if (cb) cb(null, true);
            }
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
    this.writeResponseRepeat = function(data, callback) {
        javaRest.postAuthRepeat("response" + javaRest.queryUrl(), data, function(response) {
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
    this.writeRespondentRepeat = function(data, callback) {
        if (data.customData && typeof data.customData == "object") {
            data.customData = JSON.stringify(data.customData);
        }
        javaRest.postAuthRepeat("respondent" + javaRest.queryUrl(), data, function(response) {
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

javaRest.postAuthRepeat = function(url, data, success, error, retry) {
    if (console && console.log) {
        console.log("postAuthRepeat " + " " + url + " retry");
    }
    var auth = javaRest.getAuthData("POST", url);
    retry === undefined ? retry = 0 : retry = retry + 1;
    var max_retry = 3;
    var call = $.ajax({
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
        dataType: "json"
    });
    call.done(success);
    call.fail(function(e) {
        if (retry < max_retry) {
            setTimeout(function() {
                javaRest.postAuthRepeat(url, data, success, error, retry);
            }, Math.pow(retry, retry) * 100 + 100);
        } else {
            if (error) error();
        }
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

javaRest.facevideo.uploadLinkRepeat = function(videoLink, callback) {
    if (typeof videoLink == "string") {
        videoLink = {
            link: videoLink
        };
    }
    javaRest.postAuthRepeat("facevideo/upload" + javaRest.queryUrl(), videoLink, function(response) {
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
            if (status == "seeked") {
                r = 15;
            }
            if (status == "play") {
                r = 32;
            }
            if (status == "fullscreen_change") {
                r = 33;
            }
        }
        return r;
    }, this.blockRClick = function(id) {
        if (vrt.options.norclick == false) return;
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
        vrt.player._player_is_fullscreen = !vrt.player._player_is_fullscreen;
        $(vrt).trigger("vrtevent_player_ts", {
            status: vrt.player.statusMap("fullscreen_change", "videojs")
        });
        vrt.logTime("on_player_fullscreenchange");
        vrt.log("player [VJSnew]: on_player_fullscreenchange");
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
            if (vrt.canAutoplay()) {
                setTimeout(function() {
                    vrt.player.player.play();
                }, 0);
            }
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
        this.player.on("ended", vrt.player.on_player_end);
        this.player.on("loadedalldata", vrt.player.loadedalldata);
        this.player.on("loadeddata", vrt.player.loadeddata);
        this.player.on("loadedmetadata", vrt.player.loadedmetadata);
        this.player.on("loadstart", function() {
            vrt.log("EVT YSP loadstart");
        });
        this.player.on("progress", function() {});
        this.player.on("seeked", function() {
            vrt.log("EVT YSP seeked");
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("seeked", "videojs")
            });
        });
        this.player.on("waiting", function() {
            vrt.log("EVT ysp waiting");
            $(vrt).trigger("vrtevent_player_ts", {
                status: vrt.player.statusMap("buffering", "videojs")
            });
        });
        if (vrt.options.recorderCentered && vrt.options.recorderCentered === true) {
            $("#videoDiv").vrtCenter();
        }
        if (vrt.options.recorderHCentered && vrt.options.recorderHCentered === true) {
            $("#videoDiv").vrtHCenter();
        }
        $(vrt).trigger("vrtstep_loaded");
        vrt.player_is_ready();
    };
    this.on_player_end = function(cb) {
        vrt.log("EVT YSP ended");
        $(vrt).trigger("vrt_event_stimuli_end");
        $(vrt).trigger("vrtevent_player_ts", {
            status: vrt.player.statusMap("ended", "videojs")
        });
        if (!vrt.timedOverPlayToEnd) {
            vrt.skip_video();
        }
    };
    this.on_player_play = function(cb) {
        vrt.llog("EVT YSP  on_player_play");
        $(vrt).trigger("vrtevent_player_ts", {
            status: vrt.player.statusMap("play", "videojs")
        });
    };
    this.on_player_firstplay = function(cb) {
        vrt.llog("EVT YSP on_player_firstplay");
    };
    this.loadeddata = function(cb) {
        vrt.llog("EVT YSP loadeddata");
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
        if (!vrt.player.isloadeddata && this.techName != "Html5") {
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
        vrt.llog("EVT YSP loadedmetadata");
    };
    this.on_player_error = function(e) {
        vrt.llog("EVT YSP loadedalldata " + e);
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
            var optionsplayer = {
                controls: false,
                autoplay: false,
                preload: "none",
                menu: false
            };
            if (!vrt.canAutoplay()) {
                optionsplayer = {
                    controls: true,
                    bigPlayButton: true,
                    BigPlayButton: true,
                    bigplaybutton: true,
                    autoplay: false,
                    preload: "none",
                    menu: false
                };
            }
            videojs(videoObj[0], optionsplayer, vjs_on_player_ready);
            if (options.centered && options.centered === true) $("#videoDiv").vrtCenter();
            if (options.hcentered && options.hcentered === true) $("#videoDiv").vrtHCenter();
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
        vrt.log("preloading start");
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
            if (vrt.canAutoplay()) this.player.loadVideoById(vrt.media_path, 0, "small"); else this.player.cueVideoById(vrt.media_path, 0, "small");
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
            var self = this;
            this.player_starts_recorder = false;
            var p_w = this.width;
            var p_h = this.height;
            if (options && options.width) p_w = this.width = options.width;
            if (options && options.height) p_h = this.height = options.height;
            $("#videoDiv").append('<div id="ytPlayer"></div>');
            var tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            window.onYouTubeIframeAPIReady = function() {
                vrt.logTime("NEW onYouTubePlayerReady");
                vrt.log("NEW player [YT]: onYouTubePlayerReady");
                var ytoptions = {
                    height: p_h,
                    width: p_w,
                    playerVars: {
                        controls: 0
                    },
                    events: {
                        onReady: function(event) {
                            if (vrt.options.player && vrt.options.player.centered && vrt.options.player.centered === true) {
                                $("#ytPlayer").vrtCenter();
                            }
                            if (vrt.options.player && vrt.options.player.hcentered && vrt.options.player.hcentered === true) {
                                $("#ytPlayer").vrtHCenter();
                            }
                            $(vrt).trigger("vrtstep_loaded");
                        },
                        onLoad: function(event) {
                            if (vrt.options.player && vrt.options.player.centered && vrt.options.player.centered === true) {
                                $("#ytPlayer").vrtCenter();
                            }
                            if (vrt.options.player && vrt.options.player.hcentered && vrt.options.player.hcentered === true) {
                                $("#ytPlayer").vrtHCenter();
                            }
                        },
                        onStateChange: onytplayerStateChange,
                        onError: onytplayerError
                    }
                };
                if (!vrt.canAutoplay()) {
                    ytoptions.playerVars = {
                        controls: 1,
                        autoplay: 0
                    };
                }
                vrt.player.player = new YT.Player("ytPlayer", ytoptions);
            };
            if (options.centered && options.centered === true) $("#ytPlayer").vrtCenter();
            if (options.hcentered && options.hcentered === true) $("#ytPlayer").vrtHCenter();
            vrt.player.blockRClick("ytPlayer");
            if (cbSuccess) cbSuccess();
        } else {
            $(vrt).trigger("vrtstep_loaded");
        }
    };
    this.player_dispose = function() {
        this.log(">>STEP player dispose");
        vrt.logTime("YtInterface player_dispose");
        $("#ytPlayer").remove();
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
    vrt.logTime("OLD onYouTubePlayerReady");
    vrt.log("OLD player [YT]: onYouTubePlayerReady");
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
    newState = newState.data;
    vrt.llog("onytplayerStateChange " + newState);
    vrt.llog("vrtevent_player_ts: " + vrt.player.statusMap(newState, "yt"));
    $(vrt).trigger("vrtevent_player_ts", {
        status: vrt.player.statusMap(newState, "yt")
    });
    $(vrt).trigger("vrtstep_playerStateChange", [ {
        state: newState,
        time: vrt.logTime("YT")
    } ]);
    if (newState == 3) {
        if (vrt.canAutoplay()) $(vrt).trigger("vrtstep_play", {
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
    this.Producer = null;
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
    this.recorderCentered = false;
    this.recorderHCentered = false;
    this.randomOrder = false;
    this.customOrder = false;
    this.flash_allowed = false;
    this.ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
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
    this.bufferTSAll = [];
    this.bufferTSAllPushed = [];
    this.stepCompleted = false;
    this.timedOverPlayToEnd;
    this.continuosPlay = false;
    this.click_start = false;
    this.isRecording = false;
    this.isRecordingPadding = false;
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
    this.browser = {
        isChromeMobile: false,
        old: false,
        requirement: true,
        isAndroid: false
    };
    this.platform = null;
    this.producerVideo = null;
    this.isUploading = false;
    this.recordDropConn = false;
    this.reloadFlash = null;
    this.initMediaList = function(type, list) {
        if (!list) return;
        this.mediaCount = list.length;
        this.videoType = type;
        this.videoList = list;
        this.videoListOrdered = list;
        this.calculateListData();
        this.randomizeOrderList();
        this.setOrderList();
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
        this.recorderCentered = this.checkOpt(options, "recorderCentered", false);
        this.recorderHCentered = this.checkOpt(options, "recorderHorizontallyCentered", false);
        this.randomOrder = this.checkOpt(options, "randomOrder", false);
        this.customOrder = this.checkOpt(options, "customOrder", false);
        this.apiHttps = options.apiHttps || true;
        this.continuosPlay = this.checkOpt(options, "continuosPlay", false);
        this.swfPath = options.swfPath || scriptUrl;
        this.timedOverPlayToEnd = options.timedOverPlayToEnd || false;
        this.options = options;
        this.options.player.centered = this.checkOpt(options, "playerCentered", true);
        this.options.player.hcentered = this.checkOpt(options, "playerHorizontallyCentered", true);
        this.options.player.width = options.playerWidth || 640;
        this.options.player.height = options.playerHeight || 400;
        this.options.NotResizeBiggerPlayer = this.checkOpt(options, "NotResizeBiggerPlayer", false);
        if (this.options.NotResizeBiggerPlayer !== true) {
            var biggerSize = null;
            var wparent = !!$("#vrt").parent().width() && $("#vrt").parent().width() > this.ww ? this.ww : $("#vrt").parent().width();
            wparent < options.player.width ? biggerSize = true : "";
            if (biggerSize == true) {
                var pro = options.player.width / options.player.height;
                biggerSize = "w";
                if (options.player.width < options.player.height) {
                    biggerSize = "h";
                }
                if (biggerSize == "w") {
                    options.player.width = wparent;
                    options.player.height = wparent / pro;
                }
            }
        }
        this.options.apiSandbox = this.checkOpt(options, "apiSandbox", false);
        this.options.savePlatform = this.checkOpt(options, "savePlatform", false);
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
        this.options.norclick = this.checkOpt(options, "norclick", false);
        this.options.referrer = document.referrer ? document.referrer : "";
        this.options.locationHref = document.location.href ? document.location.href : "";
        this.options.autoplay = this.checkOpt(options, "autoplay", true);
        this.options.swfobjectLocation = options.swfobjectLocation ? options.swfobjectLocation : "//cdn.crowdemotion.co.uk/playcorder/swfobject.js";
        if (this.newInit) {
            this.responseAtStart = options.responseAtStart = true;
        }
        this.browser.isChromeMobile = this.checkChromeMobileVersion();
        this.browser.isAndroid = this.checkIsAndroid();
        this.options.saveSessionRespondent = this.checkOpt(options, "saveSessionRespondent", true);
        this.options.createUniqueRespondent = this.checkOpt(options, "createUniqueRespondent", true);
        this.options.doNotTrack = this.checkOpt(options, "donottrack", false);
        if (this.options.doNotTrack === true) {
            this.options.saveSessionRespondent = false;
            this.options.createUniqueRespondent = false;
            vrtCookie.erase("vrt_urid");
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
        this.platform = WebProducer.getPlatform();
        if (this.platform.version.split(".").length > 0) {
            var mv = this.platform.version.split(".")[0].toString();
            if (this.platform.name == "IE" && mv <= 9) {
                this.browser.old = true;
            }
        }
        if (this.platform.product == "iPhone" || this.platform.product == "iPad" || this.platform.product == "iPod") {
            this.browser.requirement = false;
        }
        this.sendTSEvent = null;
    };
    this.init = function(cb) {
        this.log(">>STEP: vrt init");
        window.vrt = this;
        this.log(this.mediaCount, "mediaCount");
        this.log(this.currentMedia, "currentMedia");
        this.log(this.producerStreamUrl, "producerStreamUrl");
        this.log(this.producerStreamName, "producerStreamName");
        this.injectLayout();
        this.initVar();
        this.vrtOn();
        if (vrt.browser.old) {
            $(vrt).trigger("vrt_event_browser_old");
            $(vrt).trigger("vrt_event_error", {
                component: "browser",
                error: "the browser is old",
                type: "blocking"
            });
        }
        if (!vrt.browser.requirement) {
            $(vrt).trigger("vrt_event_no_requirement");
            $(vrt).trigger("vrt_event_error", {
                component: "browser",
                error: "Using and iOS incompatible platform",
                type: "blocking"
            });
        }
        this.ceclient = new CEClient();
        this.apiClientSetup(function() {
            $(window.vrt).trigger("api_init_ok");
            if (console.log) console.log("apiClientSetup api login success");
            if (vrt.options.apiClientOnly && vrt.options.apiClientOnly === true) {} else {
                var isff = vrt.researchData.forceFlash;
                if (WebProducer.typeAutoDetect() == "html5" && isff !== true) {
                    vrt.playerVersion = false;
                    vrt.results.flash.version = false;
                    $(window.vrt).trigger("vrt_event_recorder_html5");
                    vrt.loadProducer(vrt.swfPath);
                } else {
                    var head = document.getElementsByTagName("head")[0];
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.onreadystatechange = function() {
                        if (this.readyState == "complete") vrt.loadFlashElements().bind(vrt);
                    };
                    script.onload = vrt.loadFlashElements;
                    script.src = vrt.options.swfobjectLocation;
                    head.appendChild(script);
                }
            }
        }, function() {
            $(window.vrt).trigger("vrt_event_api_login_fail");
            if (console.log) console.log("apiClientSetup api login error");
        });
        $(this).trigger("vrt_init_ok");
        if (cb) cb();
    };
    this.loadFlashElements = function() {
        vrt.playerVersion = swfobject.getFlashPlayerVersion();
        vrt.log("playerVersion");
        vrt.log(vrt.playerVersion.major);
        vrt.log(vrt.playerVersion.minor);
        vrt.log("EVT flash" + vrt.playerVersion.major);
        if (vrt.playerVersion.major == 0) {
            vrt.results.flash.present = false;
            $(window.vrt).trigger("vrt_event_flash_no");
            vrt.log("EVT no flash");
        } else {
            vrt.results.flash.present = true;
            $(window.vrt).trigger("vrt_event_flash_is_present");
        }
        if (swfobject.getFlashPlayerVersion("11.1.0")) {
            vrt.results.flash.version = true;
            $(window.vrt).trigger("vrt_event_flash_version_ok");
            vrt.loadProducer(vrt.swfPath);
        } else {
            vrt.results.flash.version = false;
            vrt.log("Flash is old=" + vrt.playerVersion.major + "." + vrt.playerVersion.minor);
            $(window.vrt).trigger("vrt_event_flash_old");
        }
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
        var html = " <div id='vrtWrapper' class='vrtWrap' style='" + this.options.mainStyle + "'> " + "<style>.vrtHide{display:none};.vrtClearfix{clear:both}</style>" + "<div id='vrtLoader'></div>" + "<div id='vrtFrameWr'></div>" + (this.options.htmlVideoPre ? this.options.htmlVideoPre : "") + "<div id='vrtVideoWrapper' class='vrtWrap' style='" + this.options.videoStyle + "'>                                                      " + "      <div id='vrtvideo' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='videoDiv' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div id='ytPlayer' class='" + this.options.htmlVideoClass + "'></div>                                " + "      <div class='vrtClearfix'></div>                                                                     " + "</div>                                                                                               " + (this.options.htmlVideoPost ? this.options.htmlVideoPost : "") + (this.options.htmlRecorderPre ? this.options.htmlRecorderPre : "") + "       <div id='vrtProducer' class='vrtWrap " + this.options.htmlRecorderClass + "' style='" + this.options.recStyle + "'>                      " + "           <div class='vrtHide' id='producerCamerafix' style='display:none'>" + "              Sorry, there is a problem accessing your camera. " + "              Please, check your browser dialogs in order to allow camera access and then click " + "             <input id='retrybtn' type='button' value='Try again'></div> " + "           <div id='producer'><video id='producer_video'></video></div>                                                                   " + "           <div class='vrtClearfix'></div>                                                                " + "       </div>                                                                                          " + (this.options.htmlRecorderPost ? this.options.htmlRecorderPost : "") + "<div id='vrtLogWrapper' class='vrtWrap'>                                                      " + "      <div id='vrtalert'></div>                                                                        " + "      <div id='vrt_timer_player'></div>                                                                       " + "      <div id='vrt_timer_recorder'></div>                                                                       " + "      <div class='vrtClearfix'></div>                                                                     " + "</div>                                                                                               " + "</div>";
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
            if (!vrt.isPlaying) {
                vrt.llog("REC event");
                vrt.llog("REC event " + vrt.isPlaying + " on " + vrt.streamName);
                vrt.streamName = this.videoList[this.currentMedia].streamCode;
                $(window.vrt).trigger("vrt_event_streamname", [ {
                    streamname: vrt.streamName
                } ]);
                vrt.llog("REC event streamname:  " + vrt.streamName);
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
        $(window.vrt).on("vrt_event_recorder_dropconnection", function() {
            vrt.log("EVT vrt_event_recorder_dropconnection: " + vrt.recordDropConn);
            if (vrt.responseList && vrt.currentMedia && vrt.responseList[vrt.currentMedia]) {
                window.vrt.apiClientSaveCustomData(vrt.responseList[vrt.currentMedia], {
                    vrt_recorder_drop_connection: true
                }, function() {});
            }
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
            setTimeout(function() {
                window.vrt.closeSession();
            }, 1e3);
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
        $(window.vrt).on("vrt_event_respondent_created", function() {
            vrt.saveUniqueRespondent();
        });
    };
    this.start = function() {
        $(window.vrt).trigger("vrt_event_start_video_session");
    };
    this.next = function() {
        $(window.vrt).trigger("vrt_event_user_next_video");
    };
    this.saveResponseMetadata = function(data, responseId) {
        if (!responseId) responseId = vrt.responseList[vrt.currentMedia];
        this.apiClientSaveCustomData(responseId, data);
    };
    this.saveRespondentMetadata = function(data) {
        if (vrt.respondentId && data) {} else return false;
        this.apiClientSaveRespondentCustomData(vrt.respondentId, data);
    };
    this.vote = function(key, vote, responseId) {
        if (!key) return false;
        if (!responseId) responseId = vrt.responseList[vrt.currentMedia];
        var saveVote = {};
        saveVote[key] = vote;
        vrt.saveResponseMetadata(saveVote, responseId);
    };
    this.newTS = function(data) {
        if (vrt.streamName == "" || vrt.streamName == null || vrt.streamName == undefined) return;
        if (data && data.status) {
            var dataTS = vrt.createTS(data);
            if (vrt.isRecordingPadding == true) {
                vrt.saveBufferedTS(function() {
                    vrt.addTS(dataTS);
                });
            } else {
                vrt.bufferTS.push(dataTS);
            }
        } else if (vrt.bufferTS.length > 0) {
            if (vrt.isRecordingPadding == true) {
                vrt.saveBufferedTS();
            }
        }
    };
    this.createResponseList = function(res) {
        vrt.responseList[vrt.currentMedia] = res.id;
        $(window.vrt).trigger("vrt_event_create_response", [ {
            data: res.id
        } ]);
        $(window.vrt).trigger("vrtstep_loaded_by_response");
    };
    this.createTS = function(data) {
        vrt.bufferTSAll.push(data);
        var time_rec = vrt.producer.streamTimeBase > 0 ? vrt.producer.getStreamTime() : 0;
        return {
            time: Date.now(),
            player_ts: vrt.getTimeStampPlayerDiff(),
            rec_ts: vrt.getTimeStampRecDiff(),
            time_recorder: time_rec,
            status: data.status,
            content_id: this.media_id,
            player_position: vrt.player.getCurrentTime()
        };
    };
    this.addTS = function(TS, cbOk, cbNo) {
        if (!TS) return;
        if (vrt.producer.streamName) {
            vrt.producer.addTimedMetadata(TS, function() {
                if (cbOk) cbOk();
            }, function() {
                if (cbNo) cbNo();
            });
        }
    };
    this.saveBufferedTS = function(cb) {
        var ar = vrt.bufferTS;
        if (ar instanceof Array && ar.length > 0) {
            for (var i = 0; i < ar.length; i++) {
                setTimeout(function(ar) {
                    window.vrt.addTS(ar);
                }, 500, ar[i]);
            }
            vrt.bufferTS = [];
        }
        if (cb) cb();
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
            var respoId = vrt.respondentId ? vrt.respondentId : "";
            this.videoList[i].streamCode = respoId + "_" + pre + "_" + i + "_" + n + "_" + rs;
            this.videoList[i].order = i;
        }
    };
    this.randomizeOrderList = function() {
        if (this.randomOrder === true && this.mediaCount > 1) {
            this.videoList = this.shuffle(this.videoList);
        }
    };
    this._setCustomOrder = function(co) {
        if (typeof co == "string") {
            co = co.split(",");
            for (var yy = 0; yy < co.length; yy++) {
                co[yy] = parseInt(co[yy]);
            }
        } else if (co instanceof Array) {}
        return co;
    };
    this._setOrderList = function(list, co) {
        var vl = [];
        for (var y = 0; y < list.length; y++) {
            if (list[y].id) {
                var pos = co.indexOf(parseInt(list[y].id));
                if (pos > -1) {
                    vl[pos] = list[y];
                }
            }
        }
        return vl;
    };
    this.setOrderList = function() {
        if (this.customOrder && this.mediaCount > 1) {
            vrt.customOrder = this._setCustomOrder(vrt.customOrder);
            vrt.videoList = this._setOrderList(vrt.videoListOrdered, vrt.customOrder);
            vrt.mediaCount = vrt.videoList.length;
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
            videojs.options.techOrder = [ "html5", "flash" ];
            if (this.checkIe() || this.checkEdge()) {
                videojs.options.techOrder = [ "flash", "html5" ];
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
    this.stepComplete = function(res, err) {
        vrt.isUploading = false;
        if (err) {
            res = {
                responseId: vrt.responseList[vrt.currentMedia]
            };
        }
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
            if (res && res.responseId) {
                window.vrt.apiClientSaveCustomData(res.responseId, window.vrt.options.customData, function() {
                    window.vrt.loader("postVideo", "default", false);
                    $(window.vrt).trigger("vrt_event_video_step_completed", [ {
                        responseId: res.responseId,
                        insertedCustomData: true
                    } ]);
                });
            }
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
        if (this.producerVideo && this.producerVideo.pause) this.producerVideo.pause();
        if (this.producer && this.producer.previewStop) this.producer.previewStop();
        if (this.producer && this.producer.disconnect) this.producer.disconnect();
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
    this.checkEdge = function() {
        return /Edge\/\d+/i.test(navigator.userAgent);
    };
    this.checkIeVersion = function(version) {
        return navigator.userAgent.toLowerCase().indexOf("msie ") + version != -1 || navigator.userAgent.toLowerCase().indexOf("trident 6") != -1;
    };
    this.checkChromeMobileVersion = function(version) {
        return navigator.userAgent.indexOf("Android") !== -1 && navigator.userAgent.indexOf("Chrome") !== -1;
    };
    this.checkIsAndroid = function(version) {
        return navigator.userAgent.indexOf("Android") !== -1;
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
        console.log("polling on " + vrt.producer.streamName);
        if (vrt.producer && vrt.producer.streamName) vrt.addTS(vrt.createTS({
            status: 17
        }));
    };
    this.stop_playing = function() {
        vrt.log(">>STEP vrt stop play");
        vrt.player.video_stop(function() {
            vrt.logChrono(1, false, "player");
            vrt.player.video_end_fullscreen();
            $(vrt).trigger("vrtstep_stop");
        });
        vrt.isPlaying = false;
        clearTimeout(vrt.stop_handle);
        vrt.exitcode = 1;
        vrt.loader("postVideo", "default", true);
        $("#videoDiv").css("visibility", "hidden");
    };
    this.stop_rec = function() {
        vrt.llog("REC STOP call unpublish");
        vrt.recordDropConn = false;
        vrt.producer.unpublish();
        clearTimeout(vrt.stop_handle_rec);
    };
    this.afterSave = function(err, data) {
        if (vrt.handleAfterSave) clearTimeout(vrt.handleAfterSave);
        if (err) {
            vrt.log("!!PRODUCER unpublish->save ERROR TIMEOUT");
            $(window.vrt).trigger("vrt_event_recorder_save_error");
            $(window.vrt).trigger("vrt_event_error", {
                component: "producer",
                error: "facevideo not saved timeout",
                type: "normal"
            });
            vrt.log("!!PRODUCER err ");
            vrt.hideVideoBox();
            vrt.postPartecipate();
            vrt.facevideoUpload(null, function() {
                vrt.stepComplete(null, err);
            });
        } else {
            vrt.log("!!PRODUCER unpublish->save OK");
            $(window.vrt).trigger("vrt_event_recorder_save");
            vrt.hideVideoBox();
            vrt.postPartecipate();
            vrt.facevideoUpload(data, vrt.stepComplete);
        }
    };
    this.calculateUnpublishTimeout = function() {
        var max = 12e4;
        var base = 6e3;
        var length = 10;
        if (!vrt.videoList[vrt.currentMedia]) {
            length = max;
        } else if (vrt.videoList[vrt.currentMedia].lengthMS) {
            length = vrt.videoList[vrt.currentMedia].lengthMS;
        } else {
            length = vrt.videoList[vrt.currentMedia].length * 100;
        }
        var to = length / 10 + base > max ? max : length / 10 + base;
        vrt.llog("TIMEOUT SAVE: " + to);
        return to;
    };
    this.afterSaveTimeout = function() {
        var to_unp = vrt.calculateUnpublishTimeout(vrt.videoList[vrt.currentMedia]);
        vrt.llog("to_unp: " + to_unp);
        vrt.handleAfterSave = setTimeout(function() {
            vrt.llog("handleAfterSave to_unp");
            vrt.afterSave("no save", null);
        }, to_unp);
    };
    this.webProducerInit = function(path) {
        this.log("===WEBP Webpr_init");
        vrt.logTime("webProducerInit");
        vrt.log("!!PRODUCER webProducerInit");
        var isff = false;
        if (vrt.researchData && vrt.researchData.forceFlash) {
            isff = vrt.researchData.forceFlash ? "flash" : false;
        }
        this.Producer = WebProducer.webProducerClassGet(isff);
        this.producer = new this.Producer({
            id: this.producerID,
            width: this.producerWidth,
            height: this.producerHeight,
            trace: true,
            path: path,
            remote_logger_name: window.vrt.producerStreamName
        });
        this.producer.once("ready", function() {
            $(window.vrt).trigger("vrt_event_producer_ready");
            var vrt = window.vrt;
            if (vrt.recorderCentered === true) {
                $("#vrtProducer " + "#" + vrt.producerID).css({
                    width: vrt.producerWidth + "px"
                });
                $("#producer").vrtCenterProd();
                $("#producerCamerafix").vrtCenter();
            }
            if (vrt.recorderHCentered === true) {
                $("#producer").vrtHCenterProd();
                $("#producerCamerafix").vrtHCenter();
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
                vrt.producer.setAudioStreamActive(true);
            } else {
                vrt.producer.setAudioStreamActive(false);
            }
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
            var on_camera_unmuted = function() {
                vrt.log("!!on_camera_unmuted");
                var self = this;
                if (self.document) self = vrt.producer;
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
                }.bind(self));
            };
            this.once("camera-unmuted", on_camera_unmuted.bind(self));
            this.on_camera_unmuted_and_capturing = function() {
                vrt.log("!!on_camera_unmuted_and_capturing");
                vrt.log("===WEBP Camera is now available");
                vrt.popOverCe("pop_click_allow", "destroy");
                vrt.popOverCe("pop_center");
                vrt.producerVideo = document.getElementById("producer_video");
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
                vrt.recordDropConn = true;
                vrt.sendTSEvent = setInterval(function() {
                    vrt.newTS();
                }, 1e3);
                setTimeout(function() {
                    vrt.isRecordingPadding = true;
                    vrt.llog("vrt.isRecordingPadding:" + vrt.isRecordingPadding);
                }, 500);
                $(vrt).trigger("vrtevent_player_ts", {
                    status: vrt.player.statusMap(20)
                });
                vrt.logChrono(0, true, "PRODUCER RECORDING");
                $(vrt).trigger("vrt_event_recorder_publish");
                vrt.log("!!PRODUCER publish");
            });
            vrt.on_unpublish = function() {
                $(vrt).trigger("vrtevent_player_ts", {
                    status: vrt.player.statusMap(21)
                });
                if (vrt.recordDropConn) {
                    $(vrt).trigger("vrt_event_recorder_dropconnection");
                    $(window.vrt).trigger("vrt_event_error", {
                        component: "producer",
                        error: "unxpected unpublish",
                        type: "normal"
                    });
                }
                vrt.logChrono(0, false, "PRODUCER RECORDING");
                vrt.isRecording = false;
                vrt.isRecordingPadding = false;
                clearInterval(vrt.sendTSEvent);
                vrt.bufferTS = [];
                clearTimeout(vrt.stop_polling_player_pos);
                $(vrt).trigger("vrt_event_recorder_unpublish");
                vrt.log("!!PRODUCER unpublish");
                vrt.afterSaveTimeout();
            };
            this.on("unpublish", function() {
                vrt.on_unpublish();
            });
            this.on("connect", function() {
                vrt.log("!!PRODUCER connect");
                vrt.log("Is preview mirrored ? ", this.getMirroredPreview());
                vrt.log("FPS ", this.getStreamFPS());
                setTimeout(function() {
                    $(window.vrt).trigger("vrt_event_producer_camera_ok");
                    window.vrt.vrtTrigLoadend("producer_init_ok");
                    $(vrt).trigger("vrtstep_connect");
                }, 500);
            });
            vrt.on_save = function(url) {
                vrt.llog("producer on save");
                vrt.afterSave(null, url);
            };
            this.on("save", function(url) {
                vrt.on_save(url);
            });
            this.on("save-metadata", function(url) {});
            this.on("error", function(reason) {
                vrt.isRecording = false;
                vrt.isRecordingPadding = false;
                clearInterval(vrt.sendTSEvent);
                vrt.log("!!PRODUCER error " + reason);
                vrt.logTime("webpr error");
                vrt.log(">>===WEBP ERROR: " + reason);
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "" + reason,
                    type: "blocking"
                });
            });
            this.on("janus-session-error", function(reason) {
                $(window.vrt).trigger("vrt_event_error_session_error");
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "janus-session-error",
                    type: "blocking"
                });
            });
            this.on("janus-plugin-error", function(reason) {
                $(window.vrt).trigger("vrt_event_error_plugin_error");
                $(window.vrt).trigger("vrt_event_error", {
                    component: "producer",
                    error: "janus-plugin-error",
                    type: "blocking"
                });
            });
            this.on("disconnect", function() {
                vrt.isRecording = false;
                vrt.isRecordingPadding = false;
                clearInterval(vrt.sendTSEvent);
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
        if (!vrt.isUploading) {
            vrt.isUploading = true;
            this.ceclient.uploadLinkRepeat(dataToUpload, cb);
        }
    };
    this.apiClientWriteResponse = function(data, cb) {
        data = {};
        data.research_id = this.researchId;
        data.media_id = this.media_id;
        data.respondent_id = data.respondentd = this.respondentId;
        vrt.ceclient.writeResponseRepeat(data, cb);
    };
    this.saveUniqueRespondent = function() {
        if (vrt.options.createUniqueRespondent) {
            var cookieV = vrtCookie.read("vrt_urid");
            if (!cookieV) {
                vrtCookie.create("vrt_urid", vrt.respondentId, 1825);
                cookieV = vrt.respondentId;
            }
            if (!vrt.options.respondentName) {
                vrt.ceclient.editRespondentName(vrt.respondentId, cookieV);
            }
            vrt.ceclient.writeRespondentCustomData(vrt.respondentId, {
                vrt_urid: cookieV
            });
        }
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
                var apiPostCreateRespondent = function(res) {
                    vrt.respondentId = res.id;
                    if (vrt.options.saveSessionRespondent == true) {
                        vrtCookie.create("vrt_rid_" + vrt.researchId, res.id);
                    }
                    $(vrt).trigger("vrt_event_respondent_created");
                    vrt.llog("respondent num: " + vrt.respondentId);
                    if (vrt.options.respondentCustomData) {
                        vrt.ceclient.writeRespondentCustomData(vrt.respondentId, vrt.options.respondentCustomData);
                    }
                    var vrtdata = {
                        vrt_locationHref: vrt.options.locationHref
                    };
                    if (vrt.options.savePlatform && vrt.options.savePlatform === true) {
                        vrtdata = {
                            vrt_locationHref: vrt.options.locationHref,
                            vrt_platform: {},
                            vrt_ua: {}
                        };
                        vrt.platform.description ? vrtdata.vrt_platform = vrt.platform.description : "";
                        vrt.platform.ua ? vrtdata.vrt_ua = vrt.platform.ua : "";
                    }
                    vrtdata.isTesting = vrt.options.apiSandbox ? vrt.options.apiSandbox : false;
                    if (vrt.customOrder) {
                        vrtdata.custom_order = vrt.customOrder.toString();
                    }
                    vrt.ceclient.writeRespondentCustomData(vrt.respondentId, vrtdata);
                };
                var apiClientCreateRespondent = function(cb) {
                    if (vrt.options.saveSessionRespondent == true) {
                        var haveRid = vrtCookie.read("vrt_rid_" + vrt.researchId);
                        if (haveRid) {
                            vrt.respondentId = haveRid;
                            $(vrt).trigger("vrt_event_respondent_created");
                        }
                    }
                    if (!vrt.respondentId) {
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
                        vrt.ceclient.writeRespondentRepeat(respoData, function(res) {
                            apiPostCreateRespondent(res);
                        });
                    }
                };
                if (vrt.options.researchToken) {
                    vrt.ceclient.loadResearch(vrt.options.researchToken, function(research) {
                        vrt.researchId = research.id;
                        vrt.researchTitle = research.title;
                        vrt.researchDesc = research.description;
                        vrt.customData = research.customData;
                        vrt.researchData = vrt.customData ? JSON.parse(vrt.customData) : {};
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
    this.canAutoplay = function() {
        return vrt.options.autoplay && !vrt.browser.isChromeMobile;
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
        if (!el) return "";
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

jQuery.fn.vrtHCenterProd = function() {
    return this.each(function() {
        var el = $(this);
        if (!el) return "";
        if (el.prop("tagName") == "OBJECT") {
            var h = el.height();
            var w = el.width();
            var w_box = $(window).width();
            var h_box = $(window).height();
            var w_left = el.position();
            w_left = w_left.left ? w_left.left : w_left;
            var w_total = (w_box - w) / 2 - w_left;
            var h_total = h;
            var css = {
                position: "relative",
                left: w_total + "px"
            };
        } else {
            var css = {
                "text-align": "center",
                "margin-left": "auto",
                "margin-right": "auto"
            };
            el.hasClass("vrtHide") ? "" : css.display = "block";
        }
        el.css(css);
    });
};

jQuery.fn.vrtCenter = function() {
    return this.each(function() {
        var el = $(this);
        if (!el) return "";
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2;
        var h_total = (h_box - h) / 2;
        var css = {
            position: "absolute",
            left: w_total + "px",
            top: h_total + "px"
        };
        el.css(css);
    });
};

jQuery.fn.vrtHCenter = function() {
    $("#vjsPlayer").css({
        "margin-left": "auto",
        "margin-right": "auto"
    });
    return this.each(function() {
        var el = $(this);
        if (!el) return "";
        if (el.prop("tagName") == "OBJECT") {
            var h = el.height();
            var w = el.width();
            var w_box = $(window).width();
            var h_box = $(window).height();
            var w_total = (w_box - w) / 2;
            var h_total = h;
            var css = {
                position: "relative",
                left: w_total + "px"
            };
        } else {
            var css = {
                "text-align": "center",
                "margin-left": "auto",
                "margin-right": "auto"
            };
            el.hasClass("vrtHide") ? "" : css.display = "block";
        }
        el.css(css);
    });
};