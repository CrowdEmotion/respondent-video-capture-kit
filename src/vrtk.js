//PlayCorder object

var scriptUrl = (function() {
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];
    var url;
    if (script.getAttribute.length !== undefined) {
      url = script.getAttribute('src')
    } else {
      url = script.getAttribute('src', 2);
    }
    url = url.split('/');
    url.pop();
    url = url.join('/');
    return url + '/';
}());

function Vrt(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options) {


    //User settings
    this.videoList = null;
    this.videoListOrdered = null;
    this.videoFullscreen = false;
    this.videoType = null; //youtube or customserver
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

    //Producer
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

    //Various
    this.flash_allowed = false;
    this.ww = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;            //windows width
    this.wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;            //windows height
    this.media_id = null;   //media played
    this.media_name = null;   //media played
    this.media_name_real = null;   //media played
    this.media_length = 0;  //media played
    this.media_path = null; //media played
    this.media_path_full = null; //media played
    this.exitcode = null;
    this.mainStyle = '';
    this.timeRecStart = -1;
    this.timePlayerStart = -1;
    this.bufferTS = [];
    this.bufferTSAll = [];
    this.bufferTSAllPushed = [];
    this.stepCompleted = false;
    this.timedOverPlayToEnd;
    this.continuosPlay = false;

    //steps && user actions
    this.click_start = false;
    this.isRecording = false;
    this.isRecordingPadding = false;
    this.isPlaying = false;
    this.currentMedia = -1;
    this.mediaCount = 0;
    this.streamName = '';
    this.stop_handle;
    this.stop_handle_rec;
    this.swfPath = scriptUrl;

    //player values
    this.vjs = false;
    this.player = null;
    this.is_player_ready = false;
    this.player_starts_recorder = false;
    this.avgPreLoadTime = 0;

    //api client values
    this.ceclient;
    this.apiUsername;
    this.apiPassword;
    this.apiDomain;
    this.eventList = {};
    this.responseId =null;
    this.results = {apilogin:null,flash:{present:null,version:null}};
    this.responseAtStart = false;
    this.engineType = 'kanako';
    this.processVideo = true;
    this.responseList = [];
    this.respondentId = null;
    this.newInit = false;

    this.researchTitle = '';
    this.researchDesc = '';
    this.customData = '';
    this.researchComplete = true;
    this.researchArchived = false;
    this.researchReady = false;
    this.researchOutUrl = null;
    this.researchOutUrlOriginal = null;
    this.recordingAudio = false;
    this.browser = {isChromeMobile: false, old: false, requirement: true, isAndroid: false};
    this.platform = null;
    this.producerVideo = null;
    this.isUploading = false;
    this.recordDropConn = false;


    this.reloadFlash = null;

    this.initMediaList = function (type, list) {
        if (!list)return;
        this.mediaCount = list.length;
        this.videoType = type;
        this.videoList =  list;
        this.videoListOrdered = list;
        this.calculateListData();
        this.randomizeOrderList();
        this.setOrderList();
        this.log(type, 'type');
        this.log(list, 'list');
    };
    this.checkOpt=function(options,k,def){
        return (options && options[k]!=null && options[k]!=undefined)? options[k] : def;
    };
    this.initialized = function (type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {

        if (typeof type == 'object') { //type include all
            var data = type;
            list        = data.list || {};
            //TODO change this
            //streamUrl   = data.streamUrl || "mediabox.crowdemotion.co.uk";
            //streamUrl   = data.streamUrl || "buildmachine.mediabox-v2.crowdemotion.co.uk";
            streamUrl   = data.streamUrl || "mediabox.crowdemotion.co.uk";
            streamName  = data.streamName || null;
            apiDomain   = data.apiDomain || "https://api.crowdemotion.co.uk";
            apiUser     = data.apiUser || null;
            apiPassword = data.apiPassword || null;
            options     = type;
            type        = data.type || null;
            this.newInit = true;
        }

        if (!options) options = { player: {} };
        if (!options.player) options.player = {};

        if (options.fullscreen) {
            this.videoFullscreen = options.fullscreen && this.checkSafariMinVer(false, 6);
        } else {
            this.videoFullscreen = false;
        }

        this.skip = options.skip || false;
        this.vrtID = options.vrtID || 'vrt';
        this.producerID = options.producerID || 'producer';
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
        this.recorderCentered = this.checkOpt(options,'recorderCentered',false);
        this.recorderHCentered = this.checkOpt(options,'recorderHorizontallyCentered',false);

        this.randomOrder = this.checkOpt(options,'randomOrder',false);
        this.customOrder = this.checkOpt(options, "customOrder", false);
        this.apiHttps = options.apiHttps || true;
        this.continuosPlay = this.checkOpt(options,'continuosPlay',false);
        this.swfPath = options.swfPath || scriptUrl;
        this.timedOverPlayToEnd = options.timedOverPlayToEnd || false;

        this.options = options;

        this.options.player.centered = this.checkOpt(options,'playerCentered',true);
        this.options.player.hcentered = this.checkOpt(options,'playerHorizontallyCentered',true);
        this.options.player.width = options.playerWidth || 640;
        this.options.player.height = options.playerHeight || 400;
        this.options.NotResizeBiggerPlayer = this.checkOpt(options,'NotResizeBiggerPlayer',false);
        if(this.options.NotResizeBiggerPlayer!==true){
            var biggerSize = null;
            var wparent = !!$('#vrt').parent().width() && $('#vrt').parent().width() > this.ww ? this.ww : $('#vrt').parent().width() ;
            wparent < options.player.width ? biggerSize = true : '';
            if(biggerSize==true){
                var pro = options.player.width / options.player.height;
                biggerSize = 'w';
                if(options.player.width < options.player.height){
                    biggerSize = 'h';
                };
                if(biggerSize == 'w'){
                    options.player.width = wparent;
                    options.player.height  = wparent / pro;
                }
            }
        }
        this.options.apiSandbox = this.checkOpt(options,'apiSandbox',false);
        this.options.savePlatform = this.checkOpt(options,'savePlatform',false);
        this.responseAtStart = this.checkOpt(options,'responseAtStart',true);
        this.options.engineType = options.engineType || 'kanako';
        this.options.respondentCustomDataString = options.respondentCustomDataString || {};
        this.options.respondentCustomData = options.respondentCustomData || {};
        this.options.respondentName = options.respondentName || '';
        this.options.apiClientOnly = this.checkOpt(options,'apiClientOnly',false);
        this.options.customData = options.customData || {};
        this.options.customDataInsertMediaName = true;
        this.options.customDataInsertMediaId = true;
        this.options.customDataInsertMediaPath = true;
        this.options.norclick = this.checkOpt(options,'norclick',false);
        this.options.referrer = (document.referrer)? document.referrer : '';
        this.options.locationHref = (document.location.href)? document.location.href : '';
        this.options.autoplay = this.checkOpt(options,'autoplay',true);
        this.options.swfobjectLocation = options.swfobjectLocation? options.swfobjectLocation : '//cdn.crowdemotion.co.uk/playcorder/swfobject.js';

        if (this.newInit) {
          this.responseAtStart = options.responseAtStart = true;
        }
        this.browser.isChromeMobile = this.checkChromeMobileVersion();
        this.browser.isAndroid = this.checkIsAndroid();
        this.options.saveSessionRespondent = this.checkOpt(options,'saveSessionRespondent',true);
        this.options.createUniqueRespondent = this.checkOpt(options,'createUniqueRespondent',true);
        this.options.doNotTrack = this.checkOpt(options,'donottrack',false);
        if(this.options.doNotTrack===true){
            this.options.saveSessionRespondent = false;
            this.options.createUniqueRespondent = false;
            vrtCookie.erase('vrt_urid');
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
        this.platform  = WebProducer.getPlatform();
        if(this.platform.version.split('.').length>0){
            var mv = this.platform.version.split('.')[0].toString();
            if(this.platform.name == 'IE' && mv <=9){
               this.browser.old = true;
            }
        }
        if(this.platform.product=='iPhone' || this.platform.product=='iPad' || this.platform.product=='iPod'){
            this.browser.requirement = false;
        }

            this.sendTSEvent = null;

    };


    this.init = function(cb) {
        this.log('>>STEP: vrt init');
        //this.log(arguments);

        window.vrt = this;

        this.log(this.mediaCount, 'mediaCount');
        this.log(this.currentMedia, 'currentMedia');
        this.log(this.producerStreamUrl, 'producerStreamUrl');
        this.log(this.producerStreamName, 'producerStreamName');

        this.injectLayout();
        this.initVar();
        this.vrtOn();

        if(vrt.browser.old){
            $(vrt).trigger('vrt_event_browser_old');
            $(vrt).trigger('vrt_event_error', {component:'browser',error:'the browser is old',type:'blocking'});
        }
        if(!vrt.browser.requirement){
            $(vrt).trigger('vrt_event_no_requirement');
            $(vrt).trigger('vrt_event_error', {component:'browser',error:'Using and iOS incompatible platform',type:'blocking'});
        }

        this.ceclient = new CEClient();
        this.apiClientSetup(function() {
                $(window.vrt).trigger("api_init_ok");
                if (console.log) console.log("apiClientSetup api login success");

                if (vrt.options.apiClientOnly && vrt.options.apiClientOnly === true) {} else {

                    var isff =  vrt.researchData.forceFlash;
                    if (WebProducer.typeAutoDetect() == "html5" && isff!==true) {
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

            },
            function () {
                $(window.vrt).trigger('vrt_event_api_login_fail');
                if (console.log)console.log('apiClientSetup api login error');
            }
        );
        $(this).trigger('vrt_init_ok');
        if(cb) cb();
    };

    this.loadFlashElements = function(){

            vrt.playerVersion = swfobject.getFlashPlayerVersion();
            vrt.log("playerVersion");
            vrt.log(vrt.playerVersion.major);
            vrt.log(vrt.playerVersion.minor);

            vrt.log('EVT flash' + vrt.playerVersion.major);
            // TODO move Flash version check on the first page
            if (vrt.playerVersion.major == 0) {
                vrt.results.flash.present = false;
                $(window.vrt).trigger('vrt_event_flash_no');
                vrt.log('EVT no flash');
            } else {
                vrt.results.flash.present = true;
                $(window.vrt).trigger('vrt_event_flash_is_present');
            }
            if (swfobject.getFlashPlayerVersion("11.1.0")) {
                vrt.results.flash.version = true;
                $(window.vrt).trigger('vrt_event_flash_version_ok');
                vrt.loadProducer(vrt.swfPath);
            } else {
                vrt.results.flash.version = false;
                vrt.log('Flash is old=' + vrt.playerVersion.major + '.' + vrt.playerVersion.minor);
                $(window.vrt).trigger('vrt_event_flash_old');
            }

    };
    this.initVar = function () {
    };

    this.injectLayout = function () {
        var pre = this.vrtID;
        var certerstyle = "";//   "    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";
        (this.options && this.options.mainStyle) ? '' : this.options.mainStyle = certerstyle;
        (this.options && this.options.recStyle) ? '' : this.options.recStyle = certerstyle;
        (this.options && this.options.videoStyle) ? '' : this.options.videoStyle = certerstyle;

        if(this.options.apiClientOnly && this.options.apiClientOnly===true){
            //this.options.mainStyle = '';
            this.options.recStyle  = 'height: 1px; width: 1px; position: absolute: left: -1000000px'
        }
        var html = " <div id='vrtWrapper' class='vrtWrap' style='" + this.options.mainStyle + "'> " +
            "<style>.vrtHide{display:none};.vrtClearfix{clear:both}</style>"+
            "<div id='vrtLoader'></div>" +
            "<div id='vrtFrameWr'></div>" +
            ((this.options.htmlVideoPre) ? this.options.htmlVideoPre : '') +
            "<div id='vrtVideoWrapper' class='vrtWrap' style='" + this.options.videoStyle + "'>                                                      " +
            "      <div id='vrtvideo' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div id='videoDiv' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div id='ytPlayer' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div class='vrtClearfix'></div>                                                                     " +
            "</div>                                                                                               " +
            ((this.options.htmlVideoPost) ? this.options.htmlVideoPost : '') +
            ((this.options.htmlRecorderPre) ? this.options.htmlRecorderPre : '') +
            "       <div id='vrtProducer' class='vrtWrap " + (this.options.htmlRecorderClass ? this.options.htmlRecorderClass : '') + "' style='" + this.options.recStyle + "'>                      " +
            "           <div class='vrtHide' id='producerCamerafix' style='display:none'>"  +
            "              Sorry, there is a problem accessing your camera. " +
            "              Please, check your browser dialogs in order to allow camera access and then click " +
            "             <input id='retrybtn' type='button' value='Try again'></div> " +
            "           <div id='producer'><video id='producer_video'></video></div>                                                                   " +
            "           <div class='vrtClearfix'></div>                                                                " +
            "       </div>                                                                                          " +
            ((this.options.htmlRecorderPost) ? this.options.htmlRecorderPost : '') +
            "<div id='vrtLogWrapper' class='vrtWrap'>                                                      " +
            "      <div id='vrtalert'></div>                                                                        " +
            "      <div id='vrt_timer_player'></div>                                                                       " +
            "      <div id='vrt_timer_recorder'></div>                                                                       " +
            "      <div class='vrtClearfix'></div>                                                                     " +
            "</div>                                                                                               " +
            "</div>";

        var debugHtml = "<div id='vrtValues' class='vrtWrap'>                                                             " +
            "          <h4>Info</h4>                                                                                " +
            "          <div id='vrtVal_type'>Type: <span></span></div>                                              " +
            "          <div id='vrtVal_mediaCount'>media count: <span></span></div>                                 " +
            "          <div id='vrtVal_currentMedia'>current media: <span></span></div>                             " +
            "          <div id='vrtVal_list'>List: <span></span></div>                                              " +
            "          <div id='vrtVal_producerStreamUrl'>Producer stream URL: <span></span></div>                  " +
            "          <div id='vrtVal_producerStreamName'>Producer stream name: <span></span></div>                " +
            "          <div id='vrtVal_producerConnStatus'>Producer conn status: <span>Not connected</span></div>   " +
            "          <div id='vrtVal_apiStatus'>API status: <span>Not connected</span></div>                      " +
            "          <div id='vrtVal_fileUpload'>Files: <span>Not connected</span></div>                          " +
            "      </div>                                                                                           " +
            "      <div id='vrtLog'></div>                                                                          "

        $("#" + pre).html(html);
        //if (vrt.options && vrt.options.player && vrt.options.player.width )$("#" + pre).width(vrt.options.player.width+'px');

    };

    /**
     * The function set recorder to visibility hidden, if not a altFunction is specified.
     * In some browser, if you use display: none, the swf object will be destroyed
     * @param altFunction
     * @param callback
     */
    this.recorderHide = function (altFunction, callback) {
        if (!altFunction) {
            $('#vrtProducer').css('visibility', 'hidden');
            $('#producer').css('visibility', 'hidden');
            $('#vrtProducer').css('z-index', -1000);
            $('#producer').css('z-index', -1000);
            $('#vrtProducer').css('height', '1px');
            $('#producer').css('width', '1px');
        } else {
            altFunction();
        }
        if (callback)callback();
    };

    this.recorderShow = function (altFunction, callback) {
        if (!altFunction) {
            $('#vrtProducer').css('visibility', 'visible');
            $('#producer').css('visibility', 'visible');
            $('#vrtProducer').css('z-index', 1000);
            $('#producer').css('z-index', 1000);
            $('#vrtProducer').css('height', '320px');
            $('#producer').css('width', '240px');
        } else {
            altFunction();
        }
        if (callback)callback();
    };

    this.trigger = function (type, data) {
        $(vrt).trigger(type, data);
    };


    this.vrtOnStartSequence = 0;
    this.vrtOn = function () {

        $(window.vrt).on('vrt_event_error', function (e, data) {
            if (data.type == 'blocking') {
                vrt.llog('blocking error: ' + data.error + ' in ' + data.component + '');
                window.vrt.fatalError = true;
            }else if(data.type == 'user_bloking') {
                vrt.llog('blocking error by user: ' + data.error + ' in ' + data.component + '');
                window.vrt.userError = true;
            }else {
                vrt.llog('error' + data.error + ' in ' + data.component + '');
            }
            if (window.vrt.fatalError == true) {
                window.vrt.stepCompleted = true;
                if (vrt.player && vrt.player.player && vrt.player.player.dispose) {
                    vrt.player.player.dispose();
                }
                $(window.vrt).trigger('vrt_event_fatal_error');
                //$(window.vrt).trigger('vrt_event_video_session_complete');
            }
        });
        $(window.vrt).on('vrt_event_producer_camera_ok', function () {
            vrt.llog('!! PlayCorder initialized correctly (vrt_event_producer_camera_ok)');
        });
        //internal event: start
        $(window.vrt).on('vrt_init_ok', function () {
            vrt.llog('!!--vrt_init_ok');
            window.vrt.vrtTrigLoadend('vrt_init_ok');
        });
        $(window.vrt).on('producer_init_camera_ok', function () {
            vrt.llog('!!--producer_init_camera_ok');
            //delay between camera allow and connection
            setTimeout(function(){
                    vrt.producerSetupConnection(vrt.producerConnection);
            },1000);
        });
        $(window.vrt).on('api_init_ok', function () {
            vrt.llog('!!--api_init_ok');
            window.vrt.vrtTrigLoadend('api_init_ok');
        });


        $(window.vrt).on('vrtstep_loaded', function () {
            vrt.log('EVT vrtstep_loaded');
            vrt.log('>>EVT vrtstep_loaded');
            if(vrt.responseAtStart===true){
                if(vrt.responseList[vrt.currentMedia]===undefined){
                    vrt.apiClientWriteResponse(
                        null, function(res){
                            vrt.responseList[vrt.currentMedia] = res.id;
                            $(window.vrt).trigger('vrt_event_create_response',[{data:res.id}]);
                            $(window.vrt).trigger('vrtstep_loaded_by_response');
                        }
                    );
                }
            }else {
                vrt.player.video_play(vrt.showVisibility('#videoDiv'));
            }
            //TODO open_video_window();  // HACK else the Flash player is not instantiated
        });

        $(window.vrt).on('vrtstep_loaded_by_response', function () {
                vrt.player.video_play(vrt.showVisibility('#videoDiv'));
        }) ;


        $(window.vrt).on('vrt_event_user_skip_video', function () {
            vrt.skip_video();
        });
        $(window.vrt).on('vrtstep_playerStateChange', function (e, data) {
            vrt.log('EVT vrtstep_playerStateChange ' + data.state + ' time ' + data.time[4] + ' ' + data.time[5] + ' ' + data.time[6]);
        });

        $(window.vrt).on('vrtevent_player_ts', function (e, data) {
            vrt.newTS(data);
        });

        $(window.vrt).on('vrtstep_loadplay', function () {
            vrt.log('EVT vrtstep_loadplay');

        });
        $(window.vrt).on('vrtstep_play', function (e, data) {
            vrt.log('EVT vrtstep_play caller ' + data.caller);

            if (!vrt.isPlaying) {
                vrt.llog('REC event');
                vrt.llog("REC event "+vrt.isPlaying+" on "+vrt.streamName);

                vrt.streamName = this.videoList[this.currentMedia].streamCode;
                $(window.vrt).trigger('vrt_event_streamname', [{streamname:vrt.streamName}]);
                vrt.llog("REC event streamname:  "+vrt.streamName);
                try {
                    vrt.producer.remoteLogger.name = vrt.streamName;
                    vrt.producer.publish(vrt.streamName);
                }catch(err){
                    vrt.llog('exception in producer.publish');
                    vrt.llog(err);
                    $(window.vrt).trigger('vrt_event_producer_error', [{data:err}]);
                }
                vrt.isPlaying = true;
                vrt.logChrono(1, true, 'player');
                vrt.setup_stop_playing();
                vrt.setupPlaybackPositionPolling();
            }

        });

        $(window.vrt).on('vrtstep_connect', function () {
            vrt.log('EVT vrtstep_connect ' + vrt.logTime());
        });

        $(window.vrt).on('vrt_event_publish', function () {

            vrt.log('EVT vrt_event_publish  ' + vrt.logTime());
        });

        $(window.vrt).on('vrtstep_disconnect', function () {
            vrt.log('EVT vrtstep_disconnect');
        });
        $(window.vrt).on('vrt_event_recorder_dropconnection', function () {
            vrt.log('EVT vrt_event_recorder_dropconnection: '+vrt.recordDropConn);
            if(vrt.responseList && vrt.currentMedia && vrt.responseList[vrt.currentMedia]) {
                window.vrt.apiClientSaveCustomData(vrt.responseList[vrt.currentMedia], {vrt_recorder_drop_connection:true}, function () {});
            }
        });

        //external event
        $(window.vrt).on('vrt_event_start_video_session', function () {
            if (window.vrt.recAutoHide == false) {
                window.vrt.setupPlayer();
            } else {
                window.vrt.recorderHide(null, window.vrt.setupPlayer());
            }
        });
        
        $(window.vrt).on('vrt_event_user_next_video', function () {
            window.vrt.skip_video();
        });

        $(window.vrt).on('vrt_event_user_session_complete', function () {
            setTimeout(function(){
                window.vrt.closeSession();
            },1000);
        });
        $(window.vrt).on('vrt_event_logchrono', function (e,data) {
            vrt.log('EVT vrt_event_logchrono');
            if (console && console.log) console.log(data);
        });


        $(window.vrt).on('vrt_event_frame_open', function (e, data) {
            vrt.log('EVT vrt_event_frame_open');
            vrt.createFrame(data);
        });

        $('#vrtWrapper').on('click', '#vrtFrameClose', function () {
            vrt.closeFrame();
        });

        $(window.vrt).on('vrt_event_video_step_completed', function () {
            if(vrt.continuosPlay===true){
                $(window.vrt).trigger('vrt_event_user_next_video');
            }

        });

        $(window.vrt).on('vrt_event_user_click_yes_camera', function () {
            vrt.llog('!! user click yes camera');
        });
        $(window.vrt).on('vrt_event_user_click_no_camera', function () {
            vrt.llog('!! user click no camera');
        });
        $(window.vrt).on('vrt_event_respondent_created', function () {
            vrt.saveUniqueRespondent();
        });

    };
    
    //wrap methods
    this.start = function (){
        $(window.vrt).trigger('vrt_event_start_video_session');
    };

    this.next = function (){
        $(window.vrt).trigger('vrt_event_user_next_video');
    };

    this.saveResponseMetadata = function (data , responseId){
        if(!responseId) responseId = vrt.responseList[vrt.currentMedia];
        this.apiClientSaveCustomData(responseId, data );
    };

    this.saveRespondentMetadata = function (data){
        if(vrt.respondentId && data ){} else  return false;
        this.apiClientSaveRespondentCustomData(vrt.respondentId,data);
    };

    this.vote = function(key, vote, responseId){
        if(!key) return false;
        if(!responseId) responseId = vrt.responseList[vrt.currentMedia];
        var saveVote ={};
        saveVote[key] = vote;
        vrt.saveResponseMetadata(saveVote,responseId);
    };



    //ok vrt_event_start_video_session
    //ok vrt_event_user_session_complete
    //?? turn on off fullscreen
    //?? pause play
    
    //end wrap methods

    this.newTS = function(data){
        if(vrt.streamName=='' || vrt.streamName==null || vrt.streamName==undefined) return ;
        if(data && data.status) {
            var dataTS = vrt.createTS(data);
            if (vrt.isRecordingPadding == true) {
                vrt.saveBufferedTS(
                    function () {
                        vrt.addTS(dataTS)
                    });
            } else {
                vrt.bufferTS.push(dataTS);
            }
        }
        else if(vrt.bufferTS.length>0){
            if (vrt.isRecordingPadding == true) {
                vrt.saveBufferedTS();
            }
        }
    };

    this.createResponseList = function(res){
        vrt.responseList[vrt.currentMedia] = res.id;
        //console.log('responseList');
        //console.log(vrt.responseList);
        $(window.vrt).trigger('vrt_event_create_response',[{data:res.id}]);
        $(window.vrt).trigger('vrtstep_loaded_by_response');
    }

    this.createTS = function(data){
        vrt.bufferTSAll.push(data);

        //vrt.llog('vrt.producer.streamTimeBase: '+ vrt.producer.streamTimeBase);
        var time_rec = vrt.producer.streamTimeBase > 0 ? vrt.producer.getStreamTime() : 0;
        return {
            'time': Date.now(), //browser time absolute
            'player_ts': vrt.getTimeStampPlayerDiff(),
            'rec_ts': vrt.getTimeStampRecDiff(),
            'time_recorder': time_rec, //flash time from the publish
            'status': data.status,
            'content_id': this.media_id,
            'player_position' : vrt.player.getCurrentTime()
        };
    };

    this.addTS = function(TS, cbOk, cbNo){
        if(!TS) return;
        //vrt.bufferTSAllPushed.push(TS);
        //vrt.llog('addTS');
        //vrt.llog(TS);
        //console.log('addTS');
        //console.log(vrt.producer.streamName);
        if(vrt.producer.streamName) {
            vrt.producer.addTimedMetadata(
                TS,
                function () {
                    //vrt.llog('added TS');
                    if (cbOk)cbOk()
                },
                function () {
                    //vrt.llog('no added TS');
                    if (cbNo)cbNo()
                }
            );
        }
    };

    this.saveBufferedTS = function (cb) {
        var ar = vrt.bufferTS;
        if (ar instanceof Array && ar.length > 0) {
            for (var i = 0; i < ar.length; i++) {
                setTimeout(function(ar){
                    window.vrt.addTS(ar);
                },(500), ar[i]);
            }
            vrt.bufferTS = [];
        }
        if (cb)cb();
    }


    this.openFrame = function(src, options){

        $(vrt).trigger('vrt_event_frame_open', [{src : src, html: options.html, width: options.width, height: options.height, showBtnClose: options.showBtnClose,
                                        btnCssClass: options.btnCssClass, btnStyle: options.btnStyle, btnText:options.btnText, btnPosition: options.btnPosition}]);
    };

    this.closeFrame = function(){
        $('#vrtFrame').hide();
        $(window.vrt).trigger('vrt_event_frame_close');
    };

    this.vrtTrigLoadend = function(evtname){
        window.vrt.vrtOnStartSequence++;
        vrt.log('EVT vrtOnStartSequence '+evtname+' '+ window.vrt.vrtOnStartSequence);
        if(window.vrt.vrtOnStartSequence>=3){
            vrt.log('!!--> vrt_event_preview_loaded ');
            $(window.vrt).trigger('vrt_event_preview_loaded');
        }
    };

    this.playerConnectionLatency = function(){
        return 0;
        if(vrt.videoType=='youtube'){
            return 0;
        }else{
            return 0;
        }
    };

    this.makeRandomString = function(limit) {
        var limit = limit||15;
        return Math.random().toString(36).substring(2, limit) +
            Math.random().toString(36).substring(2, limit);
    };

    this.createHashCode = function (str){
        var asString =  false; var seed = undefined;
        var i, l,
            hval = (seed === undefined) ? 0x811c9dc5 : seed;

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if( asString ){
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;

    };

    this.calculateListData = function (){

        for(var i = 0; i<this.mediaCount; i++){
            var d = new Date();
            var n = d.getTime();
            var pre = this.createHashCode(''+this.producerStreamName);
            var rs = this.makeRandomString(8);
            var respoId =  (vrt.respondentId)? vrt.respondentId : '';
            this.videoList[i].streamCode = respoId +'_'+pre +'_'+ i +'_' + n + '_' + rs;
            this.videoList[i].order = i;
        }
    };

    this.randomizeOrderList = function(){
        if(this.randomOrder===true && this.mediaCount>1){
            this.videoList =  this.shuffle(this.videoList);
        }
    };
    this._setCustomOrder = function(co){
        if(typeof co == "string" ){
            co = co.split(',');
            for(var yy = 0; yy < co.length; yy++){
                co[yy] = parseInt(co[yy]);
            }
        }else if(co instanceof Array){
            //ok
        }
        return co;
    };
    this._setOrderList = function(list,co) {
        var vl = [];

        for(var y = 0; y < list.length; y++){
            if(list[y].id){
                var pos = co.indexOf(parseInt(list[y].id));
                if(pos > -1){
                    vl[pos] = list[y];
                }
            };
        };
        return vl;
    };

    this.setOrderList = function() {
        if (this.customOrder && this.mediaCount > 1) {
            vrt.customOrder = this._setCustomOrder(vrt.customOrder);
            vrt.videoList = this._setOrderList(vrt.videoListOrdered, vrt.customOrder);
            vrt.mediaCount = vrt.videoList.length;
        }
    };

    this.shuffle = function(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    //mediaInfo, instance of this.videoList
    this.buildVideoSources = function(mediaInfo) {
        if(this.videoType == 'customserver') {

            this.sources = [
                { type: "video/mp4", src: mediaInfo.path }
            ];

        } else {
            this.sources = [
                { type: "video/youtube", src: mediaInfo.path_original }
            ];
        }
    };

    this.startButton = function(){
        $("#vrtGuidingButton").click( this, function (vrtObj) {
            vrt.click_start = true;
            vrt.hideAllAndStartPlayer();
            vrt.trigger('vrt_start_ok');
        });
    };

    this.canStartButton = function(){
        this.log('canStartButton');
        $('body').on('click','#vrtCanStartButton',  this.setupCanStartButton);
    };

    this.setupCanStartButton = function () {
        vrt.log('canStartButton click');
        vrt.click_start = true;
        $('#vrtGuidingButton').show();
        vrt.popOverCe('pop_start');
    };


    this.hideAllAndStartPlayer = function(){
        this.hideVisibility('#vrtProducer');
        this.hideVisibility('#vrtCanStartButtonWrapper');
        this.hideVisibility('#vrtGuidingButton');

        this.producer.height=1;
        this.producer.width=1;
    };

    this.hideVisibility = function(el){
        $(el).css('visibility','hidden');
        $(el).css('z-index',-1000);
    };
    this.showVisibility = function(el){
        $(el).css('visibility','visible');
        $(el).css('z-index',0);
    };


    this.facevideoUpload = function(url,cb, opts){
        this.log(url,'fileUpload','a');
        this.log('!! '+url);

        this.apiClientUploadLink(url, cb, opts);
    };

    this.externalDataSave = function(id, data,cb){
        this.log('externalDataSave' + id);
        this.log(data);
        this.apiClientSaveCustomData(id, data, cb);
    };


    //TODO hideVideoBox
    this.hideVideoBox= function(cb){
        if(cb)cb();
    };

    //TODO postPartecipate
    this.postPartecipate= function(cb){

        if(cb)cb();
    };

    this.Webprod_videoSaved_video = function(){
        this.facevideoUpload(this.afterfacevideoUpload);
    };

    this.afterfacevideoUpload = function(res){
        this.log('upload face video');
        this.log(res);
        $(window.vrt).trigger('vrt_event_facevideo_upload',res.responseId);
    };

    this.setupPlayer = function () {
        this.log("setupPlayer / guideButtonVideo");
        if (this.videoType == "youtube") {
            this.player = window.ytInterface
        } else {
            videojs.options.techOrder = ["html5", "flash"];
            if (this.checkIe() || this.checkEdge()) {
                videojs.options.techOrder = ["flash","html5"];
            }
            this.player = window.vjsInterface
        }
        var preloadfunc = this.player.preloadPlayer();
        this.dopreload(preloadfunc)
    };

    this.afterpreload = function (success) {

        // TODO preload managed properly

        //if (success) {
            if(this.currentMedia == -1)
                this.nextStep();
        //}
    };

    this.dopreload = function (preloadfunc) {
        if (preloadfunc) {
            preloadfunc(this.afterpreload);
        } else {
            this.afterpreload(true);
        }
    };

    this.stepComplete = function(res,err){

        vrt.isUploading = false;
        //console.log('vrt.isUploading: '+vrt.isUploading);
        if(err){
            res = {responseId:vrt.responseList[vrt.currentMedia]}
        }


        if(window.vrt.options && window.vrt.options.customData){
            if(window.vrt.options.customData===true){
                window.vrt.options.customData = {};
            }
            if(window.vrt.options.customDataInsertMediaId && window.vrt.options.customDataInsertMediaId===true){
                window.vrt.options.customData.media_id = window.vrt.media_id;
            }
            if(window.vrt.options.customDataInsertMediaName && window.vrt.options.customDataInsertMediaName===true){
                window.vrt.options.customData.media_name = window.vrt.media_name_real;
            }
            if(window.vrt.options.customDataInsertMediaPath && window.vrt.options.customDataInsertMediaPath===true) {
                window.vrt.options.customData.media_path = window.vrt.media_path_full;
            }
            if(window.vrt.options.customDataInsertMediaLength && window.vrt.options.customDataInsertMediaLength===true) {
                window.vrt.options.customData.media_length = window.vrt.media_length;
            }
            if(res && res.responseId) {
                window.vrt.apiClientSaveCustomData(res.responseId, window.vrt.options.customData,
                    function () {
                        window.vrt.loader('postVideo', 'default', false);
                        $(window.vrt).trigger('vrt_event_video_step_completed', [{
                            responseId: res.responseId,
                            insertedCustomData: true
                        }])
                    }
                );
            }
        }else{
            window.vrt.loader('postVideo','default',false);
            $(window.vrt).trigger('vrt_event_video_step_completed',[{responseId: res.responseId,insertedCustomData:false}]);
        }
        window.vrt.stepCompleted = true;
    };


    this.nextStep = function(){
        this.log('nextStep');
        this.log('>>STEP nextStep ' + this.currentMedia);
        if (this.currentMedia++ < this.mediaCount-1) {
            window.vrt.stepCompleted = false;
            this.logChronoReset();
            this.log(this.currentMedia,'currentMedia');
            this.log('nextStep=' + this.currentMedia);

            if (this.currentMedia >= 0) {
                // TODO trigger event: media info
            }

            this.media_name = this.clearname(this.videoList[this.currentMedia].name);
            this.media_name_real = this.videoList[this.currentMedia].name;

            if(this.videoList[this.currentMedia].id){
                this.media_id = this.videoList[this.currentMedia].id;
            }else{
                this.media_id = this.media_name;
            }

            this.media_length = this.videoList[this.currentMedia].length;

            if(this.videoType=='youtube'){
                this.media_path = this.youtubeParser(this.videoList[this.currentMedia].path);
            }else{
                this.media_path = this.videoList[this.currentMedia].path;
            }

            this.media_path_full = this.videoList[this.currentMedia].path;

            this.log('>>STEP  YT path ' + this.media_path);

            $(window.vrt).trigger('vrt_event_video_session_proceedToShow');
            this.proceedToShow();
            //$(vrt).trigger('vrt_event_video_session_complete');
        } else {
            $(window.vrt).trigger('vrt_event_video_session_complete');
        }
    };

    this.clearname = function(s){
        if(s)
            return s.toString().replace(/[^a-z0-9]/gi, '_').toLowerCase();
        else return s;
    };

    this.closeSession = function() {
        if (this.videoFullscreen) this.videoEndFullscreen();
        this.playerDispose();
        if(this.producerVideo && this.producerVideo.pause) this.producerVideo.pause();
        if(this.producer && this.producer.previewStop) this.producer.previewStop();
        if(this.producer && this.producer.disconnect) this.producer.disconnect();
        $('#'+this.producer.id).hide();
        this.log('close_session');
    };

    // TODO videoEndFullscreen
    this.videoEndFullscreen = function(){

    };

    this.playerDispose = function(){
        if(this.player){
            this.player.player_dispose();
        }
    };

    this.proceedToShow = function () {
        this.log('proceedToShow');
        this.player.loadPlayer(this.options.player);
        this.player_is_ready();
    };

    this.player_is_ready = function(){

        if (vrt.videoFullscreen ){// && !vrt.player._player_is_fullscreen) {
            this.llog('player_is_ready go fs');
            vrt.player.video_go_fullscreen();
        };
    };

    this.producerSetupConnection = function(cb) {

        //this.log(streamUrl);
        this.log('!! filename ' + this.producerStreamName);
        var url = 'rtmp://' + this.producerStreamUrl + ':1935/live'; // "live/" is the RTMP application name, always the same.
        this.log('!! url ' + url);

        this.producer.setUrl(url);
        this.producer.setStreamWidth(this.producerStreamWidth);
        this.producer.setStreamHeight(this.producerStreamHeight);

        $(vrt).trigger('vrt_event_connection_setup');

        if(cb)cb();
    };

    this.producerConnection = function() {
        vrt.log('!!STEP producer connection '+ Date.now());
        setTimeout(function(){
            vrt.producer.connect();
            $(vrt).trigger('vrt_event_connect_start');
        },500);
    };

    this.hideVideobox = function(cb){
        this.log('hideVideoBox');
        var id = 'videoDiv'; //id || 'videoDiv';
        $('#'+id).css('z-index','-1000');
        $('.ui-dialog').css('z-index','-1000');
        $('#vjsPlayer').hide();
        if(cb)cb();
    };

    this.loadProducer = function(swfPath){
        this.log('loadProducer');
        this.log('>>STEP producer init')

        //$('#'+this.producerID).css('display', 'inline-block');
        //$('#'+this.producerID).addClass('rotating-loader');

        this.webProducerInit(swfPath);
    };

    // TODO popOverCe
    this.popOverCe = function(type){};

    // LOG FUNCTIONS
    this.llog = function (msg) {
        if (window.console && console.log) console.log(msg);
    };

    this.log = function (msg , display ,mode) {

        if(!this.debug) return'';if(!msg) return'';
        var str = msg.toString().substring(0,2);

        if(!this.debugEvt && str=='EV') return'';
        if(!this.debugTime && str=='TM') return'';
        if(!this.debugImportant && str=='>>') return'';
        if(!this.debugVImportant && str=='!!') return'';

        if(str=='>>' || str=='EV' || str=='TM' || str=='!!') {
            if(str == 'TM') this.logTime(msg);
            if (console && console.log) console.log(msg);
            if (display != undefined && this.debug == true) {
                if (msg instanceof Object) {
                    $('#vrtVal_' + display + ' span').html(JSON.stringify(msg));
                } else {
                    if (mode && mode == "a")$("#vrtVal_" + display + " span").append("<br/>" + JSON.stringify(msg)); else $("#vrtVal_" + display + " span").html(msg.toString())
                }
            }
        }
    };

    this.logTime = function(msg){

        if(!msg) msg='';
        var date = new Date();
        var datevalues = [
            date.getFullYear()
            ,date.getMonth()+1
            ,date.getDate()
            ,date.getHours()
            ,date.getMinutes()
            ,date.getSeconds()
            ,date.getMilliseconds()
            ,date.getTime()
        ];
        if(!this.debugTime){}
        else {
            if (console && console.log && msg!='') console.log('TIME '+ msg +': '+datevalues[4]+' '+datevalues[5]+' '+datevalues[6]);
        }
        return datevalues;
    };

    this.chronoStart = [];
    this.chronoEnd = [];
    this.chronoMessagge = [];
    this.chronoALertStart = false;
    this.chronoALertEnd = false;
    this.chronoType = ['recording','playing','producer_saving','api_upload','','publish'];

    this.logChronoReset = function(){
        this.chronoStart = [];
        this.chronoEnd = [];
        this.chronoMessagge = [];
        this.chronoALertStart = false;
        this.chronoALertEnd = false;
    };

    this.getTimeStampPlayerDiff = function(){
        var timeCheck = vrt.logTime();
        if(this.timePlayerStart == -1) return -1;
        return timeCheck[7] - this.timePlayerStart;
    };

    this.getTimeStampRecDiff = function(){
        var timeCheck = vrt.logTime();
        if(this.timeRecStart == -1) return -1;
        return timeCheck[7] - this.timeRecStart;
    };

    //0 recorder, 1 player
    this.logChrono = function (pos, start, msg){

        if(msg == undefined) msg = vrt.chronoType[pos];


        var echo = false ; var echoHtml = false; var str = ''; var strend = '';

        //(this.debugChronoHtml==undefined)? '': echoHtml = this.debugChronoHtml  ;

        var startm='end';
        if(start===true) startm = 'start';
        var posm='recorder';
        if(pos==1) posm = 'player';
        var timeCheck = vrt.logTime();

        //$(vrt).trigger('vrt_event_logchrono_'+this.chronoType[pos]+'_'+startm, [{time:timeCheck[7]}]);
        $(vrt).trigger('vrt_event_'+posm+'_'+startm);

        //console.log('vrt_event_logchrono_'+this.chronoType[pos]+'_'+startm+'    '+timeCheck[7]);
        if(this.debugChrono==undefined){}else{echo = this.debugChrono  ;}
        if(pos==0 && start == true){
            this.timeRecStart = timeCheck[7];
        }
        if(pos==0 && start == false){
            this.timeRecStart = -1;
        }
        if(pos==1 && start == true){
            this.timePlayerStart = timeCheck[7];
        }
        if(pos==1 && start == false){
            this.timePlayerStart = -1;
        }
        //$(vrt).trigger('vrt_event_logchrono', [{pos : pos, start: start, time:timeCheck[7]}]);
        if(start){
            vrt.chronoMessagge[pos] = msg;
            vrt.chronoStart[pos] = timeCheck;
            //str = "CHRONO " + pos + ": " + startm + " " + msg + ": " + vrt.chronoStart[pos][4] + " " + vrt.chronoStart[pos][5] + " " + vrt.chronoStart[pos][6];
            //if (echo && console && console.log)console.log(str)
        } else {
            vrt.chronoEnd[pos] = timeCheck;
            //str = "CHRONO " + pos + ": " + startm + " " + msg + ": " + vrt.chronoEnd[pos][4] + " " + vrt.chronoEnd[pos][5] + " " + vrt.chronoEnd[pos][6];
            //strend = "CHRONO " + pos + ": " + msg + " RESULTS: " + vrt.get_time_diff(vrt.chronoStart[pos][7], vrt.chronoEnd[pos][7]);
            //if (echo && console && console.log)console.log(str);
            //if (echo && console && console.log)console.log(strend)
        };

        //if(echoHtml && pos==1) $('#vrt_timer_player').append('<br/>'+str +'<br/>'+ strend);
        //if(echoHtml && pos==0) $('#vrt_timer_recorder').append('<br/>'+str +'<br/>'+ strend);
        str = ''; strend = '';

        //$(vrt).trigger('vrt_eventList', [{event: this.chronoType[pos], position:startm, time: timeCheck[7], timeFull: timeCheck}]);



        if(vrt.chronoStart[0] && vrt.chronoStart[1] && vrt.chronoALertStart==false){
            vrt.chronoALertStart=true;
            var afters = vrt.chronoStart[0], befores = vrt.chronoStart[1];
            var start_first = 'player';
            if(afters[7]<befores[7]){
                befores = vrt.chronoStart[0];
                afters = vrt.chronoStart[1];
                start_first = 'recorder';
            }
            var difft = afters[7]-befores[7];
            if (echo && console && console.log) console.log('CHRONO DIFF START '+ start_first +' start first by '+ (difft));

            this.eventList.startFirst = start_first;
            this.eventList.startFirstDiff = difft;
            //$(vrt).trigger('vrt_eventList_startFirst', [{startFirst: start_first, timeDiff: difft}]);
        }

        if(vrt.chronoEnd[0] && vrt.chronoEnd[1] && vrt.chronoALertEnd==false && vrt.chronoEnd[0][7] && vrt.chronoEnd[1][7]){
            vrt.chronoALertEnd=true;
            var after = vrt.chronoEnd[0], before = vrt.chronoEnd[1];
            var end_first = 'player';
            if(after[7]<before[7]){
                before = vrt.chronoEnd[0];
                after = vrt.chronoEnd[1];
                end_first = 'recorder';
            }
            var difft = after[7]-before[7];
            if (echo && console && console.log) console.log('CHRONO DIFF END '+ end_first +' end first by '+ (difft));
            this.eventList.endFirst = end_first;
            this.eventList.endFirstDiff = difft;
            //$(vrt).trigger('vrt_eventList_endFirst', [{endFirst: end_first, timeDiff: difft}]);
        }

    };

    this.get_time_diff = function( datetimes, datetimee )
    {
        var datetime = datetimes;
        var now = datetimee;

        if( isNaN(datetime) )
        {
            return "";
        }

        if (datetime < now) {
            var milisec_diff = now - datetime;
        }else{
            var milisec_diff = datetime - now;
        }

        var days = Math.floor(milisec_diff / 1000 / 60 / (60 * 24));

        var date_diff = new Date( milisec_diff );

        return /* days + " Days "+ date_diff.getHours() + " Hours " + */ date_diff.getMinutes() + " M " + date_diff.getSeconds() + " S "+ date_diff.getMilliseconds() + " m ";

    }
    // BROWSER FUNCTIONS
    this.checkSafariMinVer = function(plat, ver) {

        var bver, ua = navigator.userAgent.toLowerCase();
        var isSafari = false;
        if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') <= -1) {
            isSafari = true;
        }

        if (isSafari && (!plat || window.navigator.platform.indexOf(plat) >= 0))
            return (bver = /Version\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false;
        else
            return true;
    };

    this.checkSafari = function() {
        var bver, ua = navigator.userAgent.toLowerCase();
        var isSafari = false;
        if (ua.indexOf('safari') != -1 && ua.indexOf('chrome') <= -1) {
            isSafari = true;
        }
        return isSafari;
    };

    this.checkIe = function() {
        return (/msie|trident/i).test(navigator.userAgent)
    };

    this.checkEdge = function() {
        return (/Edge\/\d+/i).test(navigator.userAgent)
    };

    this.checkIeVersion = function(version) //todo fixit
    {
        return ((navigator.userAgent.toLowerCase().indexOf('msie ')+version != -1) || (navigator.userAgent.toLowerCase().indexOf('trident 6') != -1));
    };

    this.checkChromeMobileVersion = function(version)
    {
        return (navigator.userAgent).indexOf('Android')!==-1  && (navigator.userAgent).indexOf('Chrome')!==-1;
    };
    this.checkIsAndroid = function(version)
    {
        return (navigator.userAgent).indexOf('Android')!==-1 ;
    };

    this.youtubeParser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        }else{
            return url;
        }
    };


    this.player_started_playing = function() {
        // TODO open_video_window();
        //this.setup_stop_playing();
    };

    this.setup_stop_playing =function() {
        if(this.timedOverPlayToEnd){
            var time =this.media_length * 1000 + this.avgPreLoadTime+ 100;
            this.log('!!STEP vrt setup stop playing' + time);
            this.stop_handle = setTimeout(vrt.stop_playing,time );
            this.stop_handle_rec = setTimeout(vrt.stop_rec,time );
        }else{
            this.stop_handle = setTimeout(function(){},0);
            this.stop_handle_rec = setTimeout(function(){},0);
        }
    };

    this.skip_video = function () {
        $(vrt).trigger('vrt_event_skip_or_end_video');
        if (!window.vrt.stepCompleted) {
            vrt.stop_playing();
            vrt.stop_rec();
        } else {
            window.vrt.nextStep();
        }
    };

    this.setupPlaybackPositionPolling = function(){
        vrt.stop_polling_player_pos = setInterval(vrt.pollingPlayerPos, 1000 );
    };

    this.pollingPlayerPos = function(){
        console.log('polling on '+ vrt.producer.streamName);
        if(vrt.producer && vrt.producer.streamName)
            vrt.addTS(vrt.createTS({status:17}));
    };

    this.stop_playing =function() {
        vrt.log('>>STEP vrt stop play');
        vrt.player.video_stop(function(){
            vrt.logChrono(1, false, 'player');
            vrt.player.video_end_fullscreen();
            $(vrt).trigger('vrtstep_stop');
        });
        vrt.isPlaying=false;
        clearTimeout(vrt.stop_handle);
        vrt.exitcode = 1;
        vrt.loader('postVideo','default',true);
        $('#videoDiv').css('visibility','hidden');
    };

    this.stop_rec =function() {
        vrt.llog('REC STOP call unpublish');
        vrt.recordDropConn = false;
        vrt.producer.unpublish();
        //vrt.isRec=false;
        clearTimeout(vrt.stop_handle_rec);
        //this.isRecording = false;
    };

    this.afterSave =function(err,data){
        if(vrt.handleAfterSave) clearTimeout(vrt.handleAfterSave);
        if(err){
            vrt.log('!!PRODUCER unpublish->save ERROR TIMEOUT');
            $(window.vrt).trigger('vrt_event_recorder_save_error');
            $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'facevideo not saved timeout',type:'normal'});
            vrt.log('!!PRODUCER err ');
            vrt.hideVideoBox();
            vrt.postPartecipate();
            vrt.facevideoUpload(null, function(){vrt.stepComplete(null, err)});
            //vrt.stepComplete(null, err);
        }else{
            vrt.log('!!PRODUCER unpublish->save OK');
            $(window.vrt).trigger('vrt_event_recorder_save');
            vrt.hideVideoBox();
            vrt.postPartecipate();
            vrt.facevideoUpload(data, vrt.stepComplete);
        }
    };

    this.calculateUnpublishTimeout = function(){
        var max = 120000; //2minutes
        var base = 6000; //6sec
        var length = 10;

        if(!vrt.videoList[vrt.currentMedia]){
            length = max;
        }else if(vrt.videoList[vrt.currentMedia].lengthMS) {
            length = vrt.videoList[vrt.currentMedia].lengthMS;
        }else{
            length = vrt.videoList[vrt.currentMedia].length * 100;
        };

        var to = (length/10+base > max ) ? max : length/10+base;
        vrt.llog('TIMEOUT SAVE: '+to);
        return to;
    };

    this.afterSaveTimeout = function(){
        var to_unp = vrt.calculateUnpublishTimeout(vrt.videoList[vrt.currentMedia])
        vrt.llog('to_unp: '+to_unp);
        vrt.handleAfterSave = setTimeout(function(){
            vrt.llog('handleAfterSave to_unp');
            vrt.afterSave('no save', null);
        },to_unp);
    };

    // WEBPRODUCER FUNCTION
    this.webProducerInit = function(path){
        this.log("===WEBP Webpr_init");
        vrt.logTime('webProducerInit');
        vrt.log('!!PRODUCER webProducerInit');
        var isff =  false;
        if(vrt.researchData && vrt.researchData.forceFlash){
            isff = vrt.researchData.forceFlash ? "flash" : false;
        }
        this.Producer = WebProducer.webProducerClassGet(isff);
        this.producer = new this.Producer({ // Producer[ FlashProducer | HTML5Producer ]
            id: this.producerID, // the html object id
            width: this.producerWidth, // these are sizes of the player on the page
            height: this.producerHeight, // not related to the stream resolution
            trace: true, // would enable debug logs in js console
            path: path,
            remote_logger_name: window.vrt.producerStreamName
        });

        this.producer.once('ready', function () {
            $(window.vrt).trigger('vrt_event_producer_ready');
            var vrt = window.vrt;
            if(vrt.recorderCentered===true)  {
                $('#vrtProducer '+'#'+vrt.producerID).css({'width':vrt.producerWidth+'px'});
                $('#producer').vrtCenterProd();
                $('#producerCamerafix').vrtCenter();
                //$("#producer video").vrtCenter();
            }
            if(vrt.recorderHCentered===true)  {
                $('#producer').vrtHCenterProd();
                $('#producerCamerafix').vrtHCenter();
                //$("#producer video").vrtCenter();
            }
            vrt.logTime('webpr ready');
            vrt.log('!!PRODUCER ready');
            vrt.log('===WEBP The producer is now ready');
            vrt.log('ready + producerConnStatus');

            vrt.popOverCe('pop_click_allow','destroy');
            vrt.flash_allowed = true;

            this.setMirroredPreview(true);
            vrt.log('Is preview mirrored ? ' + this.getMirroredPreview());

            if(vrt.recordingAudio) {
                vrt.producer.setAudioStreamActive(true);
            }else{
                vrt.producer.setAudioStreamActive(false);
            }
            //vrt.llog('Is audio streaming active ? ' + vrt.producer.getAudioStreamActive(vrt.recordingAudio));

            var numCameras = this.countCameras();

            vrt.log("===WEBP We have " + numCameras + " camera(s) available");
            if (numCameras == 0){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
                $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'no webcam',type:'blocking'});
            }else if (numCameras == undefined){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
                $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'no webcam',type:'blocking'});
            }else{
                $(window.vrt).trigger('vrt_event_producer_camera_found');
            };


            var on_camera_unmuted = function () {
                vrt.log('!!on_camera_unmuted');
                // now camera has been unmuted but we want to check that it
                // actually works. So we ask the producer to perform the check
                // and we wait for 'camera-works' response event. if it takes
                // too long we assume somthing is wrong and we advice the user
                // to check the browser
                var self = this;
                if(self.document) self = vrt.producer;
                vrt.producer.isCameraWorking();

                var toolong = function () {
                  $('#producerCamerafix').removeClass('vrtHide').show();
                  $('#producerCamerafix #retrybtn').off().on('click', function () {
                      //$(vrt).trigger('vrt_event_user_click_no_camera');
                      vrt.producer.reloadFlashElement(function () {
                          $('#producerCamerafix').addClass('vrtHide').hide();
                          var timeout = setTimeout(toolong, 5000);
                          vrt.producer.once('camera-unmuted', on_camera_unmuted.bind(self));
                      });
                  });
                  /*
                  $('#producerCamerafix button#yesbtn').off().on('click', function () {
                      $('#producerCamerafix').addClass('vrtHide').hide();
                      $(vrt).trigger('vrt_event_user_click_yes_camera');
                  });
                  */
                };

                var timeout = setTimeout(toolong, 5000);

                vrt.producer.once('camera-works', function () {
                  // yay, at this point we are sure that camera works and we
                  // can go on
                  // vrt.llog('camera-works');
                  self.on_camera_unmuted_and_capturing();
                  $('#producerCamerafix').addClass('hide').hide().remove();
                  clearTimeout(timeout);
                }.bind(self));
            };

            // checking user permissions on camera
            this.once('camera-unmuted', on_camera_unmuted.bind(self));

            this.on_camera_unmuted_and_capturing = function () {
                vrt.log("!!on_camera_unmuted_and_capturing");
                vrt.log("===WEBP Camera is now available");
                vrt.popOverCe('pop_click_allow','destroy');
                vrt.popOverCe('pop_center');
                vrt.producerVideo = document.getElementById('producer_video');
                $(window.vrt).trigger('producer_init_camera_ok');
            };

            this.on('camera-muted', function () {
                vrt.log('!!PRODUCER camera muted');
                vrt.log("===WEBP The user has denied access to the camera");
                $(window.vrt).trigger('vrt_event_producer_camera_blocked');
            });

            var cameraMuted = this.isCameraMuted();

            if (cameraMuted) {
                vrt.log('!!PRODUCER camera already muted');
                vrt.log("===WEBP The user must approve camera access");
                vrt.popOverCe('pop_click_allow');
                vrt.log('user must approve camera','producerConnStatus');
                $(window.vrt).trigger('vrt_event_producer_camera_muted');
            } else {
                vrt.log('!!PRODUCER camera already unmuted');
                vrt.log('camera aviable','producerConnStatus');
                vrt.log("===WEBP The camera is available, user already approved. " +
                  "It does not mean its working, we wait for 'camera-works'");
                on_camera_unmuted();
                // $(window.vrt).trigger('producer_init_camera_ok');
            }
            //producer.setCredentials("username", "password"); // if you want to emulate fmle auth
            this.on('publish',function(){
                vrt.isRecording = true;
                vrt.recordDropConn = true;
                //vrt.llog('vrt.isRecording:' + vrt.isRecording);
                vrt.sendTSEvent = setInterval(
                    function(){vrt.newTS();},
                    1000
                );
                setTimeout(
                    function(){
                        vrt.isRecordingPadding=true;
                        vrt.llog('vrt.isRecordingPadding:' + vrt.isRecordingPadding);
                    }
                    ,500);
                $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(20)});
                vrt.logChrono(0, true, 'PRODUCER RECORDING');
                $(vrt).trigger('vrt_event_recorder_publish');
                vrt.log('!!PRODUCER publish');
            });

            vrt.on_unpublish = function(){
                $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(21)});
                if(vrt.recordDropConn) {
                    $(vrt).trigger('vrt_event_recorder_dropconnection');
                    $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'unxpected unpublish',type:'normal'});
                }
                vrt.logChrono(0, false, 'PRODUCER RECORDING');
                vrt.isRecording =  false;
                vrt.isRecordingPadding =  false;
                clearInterval(vrt.sendTSEvent);
                vrt.bufferTS = [];
                clearTimeout(vrt.stop_polling_player_pos);
                $(vrt).trigger('vrt_event_recorder_unpublish');
                vrt.log('!!PRODUCER unpublish');
                vrt.afterSaveTimeout();
            };

            this.on('unpublish',function(){
                vrt.on_unpublish();
            });

            this.on('connect', function () {

                vrt.log('!!PRODUCER connect');
                //this.setMirroredPreview(true);
                vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
                //this.setAudioStreamActive(false);
                //vrt.log('Is audio streaming active ? ', this.getAudioStreamActive());
                //this.setStreamFPS(15);
                vrt.log('FPS ', this.getStreamFPS());
                setTimeout(function(){
                    $(window.vrt).trigger('vrt_event_producer_camera_ok');
                    window.vrt.vrtTrigLoadend('producer_init_ok');
                    $(vrt).trigger('vrtstep_connect');
                },500);
            });
            vrt.on_save = function(url){
                vrt.llog('producer on save');
                vrt.afterSave(null, url);
            };
            this.on('save', function (url) {
                vrt.on_save(url);
            });

            this.on('save-metadata', function (url) {
               //  console.log("The metadata file has been saved to "+ url);
            });

            this.on('error', function (reason) {
                vrt.isRecording = false;
                vrt.isRecordingPadding = false;
                clearInterval(vrt.sendTSEvent);
                vrt.log('!!PRODUCER error '+reason);
                vrt.logTime('webpr error');
                vrt.log(">>===WEBP ERROR: " + reason);
                $(window.vrt).trigger('vrt_event_error', {component:'producer',error:''+ reason,type:'blocking'});
            });

            this.on('janus-session-error', function (reason) {
                $(window.vrt).trigger('vrt_event_error_session_error');
                $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'janus-session-error',type:'blocking'});
            });
            this.on('janus-plugin-error', function (reason) {
                $(window.vrt).trigger('vrt_event_error_plugin_error');
                $(window.vrt).trigger('vrt_event_error', {component:'producer',error:'janus-plugin-error',type:'blocking'});
            });

            this.on('disconnect', function () {
                vrt.isRecording = false;
                vrt.isRecordingPadding = false;
                clearInterval(vrt.sendTSEvent);
                vrt.log('!!PRODUCER disconnect');
                //vrt.logChrono(2, true, 'PRODUCER SAVING');
                vrt.logTime('webpr disconnect');
                vrt.log('>>STEP producer disconnected');
                vrt.trigger('vrtstep_disconnect');

                // TODO trigger event: producer disconnect w/ exit code

            });

            if(vrt.options.apiClientOnly && vrt.options.apiClientOnly===true){
                $(window.vrt).trigger('vrt_event_producer_camera_ok');
            }

        });
    };

    /*
    this.reloadFlash = function(){
        if(vrt.producer.el){
            vrt.producer.reloadFlashElement(
                function () {vrt.producer.isCameraCapturing();}
                ,'producer',vrt.producer.el
            )
        }
    };

    $(window.vrt).on('vrt_event_reload_flash',function(){
        vrt.reloadFlash();
    });
    */

    this.createFrame = function(data){

        var w = ' width="600" ';
        if(data.width){
            w = data.width;
            w =  ' width="'+w+'" ';
        }
        var h = ' height="500" ';
        if(data.height){
            h = data.height;
            h =  ' height="'+h+'" ';
        }
        var src =  '';
        if(data.src){
            src =  ' src="'+data.src+'" ';
        }
        var cssClass =  '';
        if(data.btnCssClass){
            cssClass =  data.btnCssClass;
        }
        var btnText = 'Close and proceed';
        if(data.btnText){
            btnText = data.btnText;
        }
        var style =  '';
        if(data.btnStyle){
            style =  data.btnStyle;
        }
        var btn = '<div id="vrtFrameCloseWrapper" style="width: 100%; "><button id="vrtFrameClose" class="'+cssClass+'" style="'+style+'">'+btnText+'</button></div>';
        var btnTop = '';
        var btnBottom = '';
        if(data.showBtnClose===false){
            btn = '';
        }
        if(data.btnPosition=='top'){
            btnTop = btn;
        }else{
            btnBottom = btn;
        }


        var base_html = '<div id="vrtFrame" style="display: none">'+btnTop+'<div id="vrtFrameWrapper"><iframe '+ h +' '+ w +' allowTransparency="true" frameborder="0" '+style+' '+src+'>';
        var inner_html = '';
        if(data.html){
            inner_html =  data.html;
        }


        var close_html = '</iframe></div>'+btnBottom+'</div>';

        $('#vrtFrameWr').html(base_html+inner_html+close_html);
        $('#vrtFrame').vrtCenter();
        $('#vrtFrame').show();
    };

    //API

    this.apiClientSaveCustomData= function(id, data, cb){
        this.log('>>STEP insert custom data');
        this.log(data);
        this.ceclient.writeCustomData(id, data,cb);
    };

    this.apiClientSaveRespondentCustomData= function(id, data, cb){
        this.log('>>STEP insert custom data');
        this.log(data);
        this.ceclient.writeRespondentCustomData(id, data,cb);
    };

    this.apiClientUploadLink = function(streamFileName, cb){
        this.log('>>STEP api file upload ' + streamFileName);
        this.log('EVT upload api file upload ' + streamFileName);
        // todo insert response on upload link

        var dataToUpload = {}
        if(this.researchId){
            dataToUpload = { link: streamFileName, researchId: this.researchId, mediaId: this.media_id } ;
            if(vrt.responseAtStart){
                dataToUpload.responseId = vrt.responseList[vrt.currentMedia];
                if(this.respondentId){
                    dataToUpload.respondent_id = this.respondentId;
                    dataToUpload.respondentId = this.respondentId;
                }
            }
        } else{
            dataToUpload  = streamFileName;
            if(vrt.responseAtStart){
                dataToUpload = { link: streamFileName, responseId: vrt.responseList[vrt.currentMedia]  };
                if(this.respondentId){
                    dataToUpload.respondent_id = this.respondentId;
                    dataToUpload.respondentId = this.respondentId;
                }
            }
        }
        //console.log('>>>>>>>>dataToUpload');
        //console.log(dataToUpload);
        if(!vrt.isUploading){
            vrt.isUploading = true;
            //console.log('vrt.isUploading: '+vrt.isUploading);
            this.ceclient.uploadLinkRepeat(dataToUpload, cb);
        }

    };

    this.apiClientWriteResponse = function (data, cb) {
        data = {};
        data.research_id = this.researchId;
        data.media_id = this.media_id;
        data.respondent_id = data.respondentd = this.respondentId;
        //this.llog('>>>>>>>>writeResponse');
        //this.llog(data);
        vrt.ceclient.writeResponseRepeat(data, cb)
    };

    this.saveUniqueRespondent = function(){
        if (vrt.options.createUniqueRespondent) {
            var cookieV = vrtCookie.read('vrt_urid');
            if (!cookieV) {
                vrtCookie.create('vrt_urid', vrt.respondentId, 1825);
                cookieV = vrt.respondentId;
            }
            if (!vrt.options.respondentName) {
                vrt.ceclient.editRespondentName(vrt.respondentId,cookieV);
            }
            vrt.ceclient.writeRespondentCustomData( vrt.respondentId, {'vrt_urid': cookieV});
        };
    };

    this.apiClientSetup = function(cbSuccess, cbFail){

        var apiClientSetupNext = function(ret){
            vrt.apiClientRes(ret);
            if(ret){

                if(console.log)console.log('Api login OK + success');
                vrt.results.apilogin = true;

                if(!vrt.options.researchId && !vrt.options.researchToken) {
                    if(cbSuccess) cbSuccess();
                    return;
                }

                var apiClientSetupLoadMedia = function(researchId) {
                    vrt.ceclient.loadMediaList(researchId, function(list){
                        if(console.log)console.log('Api loadMediaList OK + success');

                        if(Array.isArray(list)) {

                            // HACK first decides type, mixed not permitted
                            var ytCount=0;
                            list.forEach(function(item){
                                if(item.isYouTube) {
                                    ytCount++;
                                } else
                                if(item.isStored) {
                                    vrt.ceclient.loadMedia(item.id, true, function(media){
                                        item.path = media.presignedUrl;
                                    });
                                }
                            });

                            if(ytCount > 0 && ytCount < list.length)
                                console.log('Api loadMediaList VIDEO TYPE MISMATCH: ' + ytCount +'!='+ list.length);

                            vrt.initMediaList(
                                ytCount == list.length ? 'youtube' : 'customserver',
                                list);

                            if(cbSuccess) cbSuccess();

                        } else {

                            if(console.log)console.log('Api loadMediaList FAIL + danger');
                            if(cbFail) cbFail();
                        }
                    });
                };

                var apiPostCreateRespondent = function(res){

                        vrt.respondentId = res.id;
                        if(vrt.options.saveSessionRespondent == true) {
                            vrtCookie.create('vrt_rid_' + vrt.researchId, res.id);
                        }

                        $(vrt).trigger('vrt_event_respondent_created');
                        vrt.llog('respondent num: ' + vrt.respondentId);
                        if(vrt.options.respondentCustomData){
                            vrt.ceclient.writeRespondentCustomData(vrt.respondentId,vrt.options.respondentCustomData );
                        }
                        var vrtdata = {'vrt_locationHref': vrt.options.locationHref};
                        if(vrt.options.savePlatform && vrt.options.savePlatform===true){
                            vrtdata = {'vrt_locationHref': vrt.options.locationHref, 'vrt_platform': {}, 'vrt_ua': {}};
                            vrt.platform.description  ? vrtdata.vrt_platform =  vrt.platform.description : '';
                            vrt.platform.ua  ?vrtdata.vrt_ua = vrt.platform.ua : '';
                        }
                        vrtdata.isTesting  = vrt.options.apiSandbox ?  vrt.options.apiSandbox : false;
                        if(vrt.customOrder){
                            vrtdata.custom_order = vrt.customOrder.toString();
                        }
                        vrt.ceclient.writeRespondentCustomData(vrt.respondentId,vrtdata);

                };


                var apiClientCreateRespondent = function(cb){

                    if(vrt.options.saveSessionRespondent == true){
                        var haveRid = vrtCookie.read('vrt_rid_'+vrt.researchId);
                        if(haveRid){
                            vrt.respondentId = haveRid;
                            $(vrt).trigger('vrt_event_respondent_created');
                        }
                    }

                    if(!vrt.respondentId){
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
                        vrt.ceclient.writeRespondentRepeat(respoData, function(res){apiPostCreateRespondent(res)});
                    }
                };

                if(vrt.options.researchToken) {
                    vrt.ceclient.loadResearch(vrt.options.researchToken, function(research){
                        //console.log('research');console.log(research);
                        vrt.researchId = research.id;
                        vrt.researchTitle = research.title;
                        vrt.researchDesc = research.description;
                        vrt.customData = research.customData;
                        vrt.researchData = vrt.customData ? JSON.parse(vrt.customData) : {};
                        vrt.researchComplete = research.complete;
                        vrt.researchArchived = research.archived? research.archived:false;
                        vrt.researchReady = research.ready;
                        vrt.researchOutUrlOriginal = vrt.researchOutUrl = research.outgoingUrl;
                        if(vrt.researchOutUrl && vrt.researchOutUrl.length>0 && vrt.options.locationHref && vrt.options.locationHref.length >0){
                            var myRe = /{(.*?)}/g;
                            var myReN = /{(.*?)}/;
                            var str = vrt.researchOutUrlOriginal;
                            var exec = null;
                            while ((exec = myRe.exec(str)) !== null) {
                                var newval = vrt.gup(exec[1],vrt.options.locationHref);
                                if(newval!==null){
                                    vrt.researchOutUrl = vrt.researchOutUrl.replace(exec[0],newval);
                                }
                            }
                        }
                        vrt.researchCustomData = research.customData;
                        apiClientSetupLoadMedia(research.id, apiClientCreateRespondent());
                    }, function(res){
                        //console.log(res);
                    });
                } else {
                    apiClientSetupLoadMedia(vrt.options.researchId, apiClientCreateRespondent());
                }





            }else{
                if(console.log)console.log('Api login FAIL + danger');
                vrt.results.apilogin = false;
                if(cbFail) cbFail();
            }
        };


        this.log('Api login in progress');
        this.log('>>STEP api init')
        //this.ceclient.init(true, this.apiHttps, this.apiDomain, vrt.options.apiSandbox);
        this.ceclient.init({debug: true, http: this.apiHttps, domain: this.apiDomain, sandbox: vrt.options.apiSandbox, engineType:vrt.options.engineType,processVideo:vrt.options.processVideo});
        this.ceclient.logout(function(){
                if(this.appToken) {
                    this.ceclient.setToken(this.appToken);
                    apiClientSetupNext(true);
                } else {
                    this.ceclient.login(this.apiUsername, this.apiPassword, apiClientSetupNext);
                }
            }.bind(this)
        );
    };

    this.apiClientLogout = function(){
        this.log('>>STEP api logout')
        this.ceclient.logout();
    };

    this.apiClientRes = function(res){
        vrt.results.apilogin = res;
        return res;
    };

    //**** LAYOUT **/
    this.loaderHtml = function (){
        return ' <div id="vrtLoaderInner"> <div id="circleG"> <div id="circleG_1" class="circleG"> </div> <div id="circleG_2" class="circleG"> </div> <div id="circleG_3" class="circleG"> </div> </div> </div>';
    };

    this.loaderCss = function (){
        return ' <style> #vrtLoader{width: 100%} #vrtLoaderInner{margin: 10px auto;} #circleG{width:87.5px}.circleG{background-color:#FFF;float:left;height:19px;margin-left:10px;width:19px;-moz-animation-name:bounce_circleG;-moz-animation-duration:1.35s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-moz-border-radius:13px;-webkit-animation-name:bounce_circleG;-webkit-animation-duration:1.35s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-webkit-border-radius:13px;-ms-animation-name:bounce_circleG;-ms-animation-duration:1.35s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-ms-border-radius:13px;-o-animation-name:bounce_circleG;-o-animation-duration:1.35s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;-o-border-radius:13px;animation-name:bounce_circleG;animation-duration:1.35s;animation-iteration-count:infinite;animation-direction:linear;border-radius:13px}#circleG_1{-moz-animation-delay:.27s;-webkit-animation-delay:.27s;-ms-animation-delay:.27s;-o-animation-delay:.27s;animation-delay:.27s}#circleG_2{-moz-animation-delay:.63s;-webkit-animation-delay:.63s;-ms-animation-delay:.63s;-o-animation-delay:.63s;animation-delay:.63s}#circleG_3{-moz-animation-delay:.8099999999999999s;-webkit-animation-delay:.8099999999999999s;-ms-animation-delay:.8099999999999999s;-o-animation-delay:.8099999999999999s;animation-delay:.8099999999999999s}@-moz-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-webkit-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-ms-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-o-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@keyframes bounce_circleG{50%{background-color:#2E2E2E}}  </style>';
    };
    this.loader = function(name, type,show){
        if(!name) name = 'vrtkLoader'; if(!type) type = 'default'; if(show===undefined) show = false;

        var lhtml =  this.loaderHtml();
        var lcss =  this.loaderCss();

        if(show===true && ($('#vrtLoader').html()=='')){
            $('#vrtLoader').html(lcss + lhtml);
            $('#circleG').vrtCenter();
        };
        if(show===false){
            $('#vrtLoader').html('');
        };


    };

    this.openDialog = function (msg, closeFunc, position) {
        if(closeFunc) closeFunc();
        /*
        $('#dialog-message').html('<div>'+msg+'</div>');
        $('#dialog-message').dialog({
            modal: true,
            close: closeFunc,
            closeOnEscape: false,
            draggable: false,
            resizable: false,
            minWidth: 500,
            position: position ? position : 'top center',
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        }); */
    };

    //url checker gup('q', 'hxxp://example.com/?q=abc')
    this.gup = function( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    };

    this.msieversion = function() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/)
        if (msie > 0 || match){
            return match ? parseInt(match[1]) : false;
        }else{
            return false;
        }

        return false;
    };

    this.canAutoplay = function(){
        return (vrt.options.autoplay && !vrt.browser.isChromeMobile ) ;
    };

    this.initialized(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options);
};

var vrtTimer;
var vrtTotalSeconds;


function vrtCreateTimer(TimerID, Time) {
    vrtTimer = document.getElementById(TimerID);
    vrtTotalSeconds = Time;

    vrtUpdateTimer()
    window.setTimeout("vrtTick()", 1000);

}

function vrtTick() {
    TotalSeconds -= 1;
    UpdateTimer()
    window.setTimeout("vrtTick()", 1000);
}

function vrtUpdateTimer() {
    //Timer.innerHTML = TotalSeconds;
}

jQuery.fn.vrtCenterProd = function () {
    return this.each(function () {
        var el = $(this);
        if(!el) return'';
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2; //400
        var h_total = (h);
        var css = {"position": 'absolute', "left": w_total + "px", "top": h_total + "px"};
        el.css(css)
    });
};
jQuery.fn.vrtHCenterProd = function () {
    return this.each(function () {
        var el = $(this);
        if(!el) return'';
        if(el.prop("tagName") == 'OBJECT'){
            var h = el.height();
            var w = el.width();
            var w_box = $(window).width();
            var h_box = $(window).height();
            var w_left = el.position();
            w_left =  (w_left.left)? w_left.left: w_left;
            var w_total = ((w_box - w) / 2) - w_left; //400
            var h_total = (h);
            var css = {"position": 'relative', "left": w_total + "px"};
        }else{
            var css = {"text-align":'center', "margin-left": 'auto',"margin-right": 'auto'};
            el.hasClass('vrtHide')? '':css.display = 'block';
        }

        el.css(css);
    });
};
jQuery.fn.vrtCenter = function () {
    return this.each(function () {
        var el = $(this);
        if(!el) return'';
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2; //400
        var h_total = (h_box - h) / 2;
        var css = {"position": 'absolute', "left": w_total + "px", "top": h_total + "px"};
        el.css(css)
    });
};
jQuery.fn.vrtHCenter = function () {
    $('#vjsPlayer').css({'margin-left':'auto','margin-right':'auto'});
    return this.each(function () {
        var el = $(this);
        if(!el) return'';
        if(el.prop("tagName") == 'OBJECT'){
            var h = el.height();
            var w = el.width();
            var w_box = $(window).width();
            var h_box = $(window).height();
            var w_total = (w_box - w) / 2; //400
            var h_total = (h);
            var css = {"position": 'relative', "left": w_total + "px"};
        }else{
            var css = {"text-align":'center', "margin-left": 'auto',"margin-right": 'auto'};
            el.hasClass('vrtHide')? '':css.display = 'block';
        }
        el.css(css)
    });
};
