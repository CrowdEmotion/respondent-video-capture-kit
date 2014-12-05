

function Vrt(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options) {


    //User settings
    this.videoList = null;
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

    //Producer
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

    //Various
    this.flash_allowed = false;
    this.ww = 0;            //windows width
    this.wh = 0;            //windows height
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

    //steps && user actions
    this.click_start = false;
    this.isRecording = false;
    this.isPlaying = false;
    this.currentMedia = -1;
    this.mediaCount = 0;
    this.streamName = '';
    this.stop_handle;
    this.stop_handle_rec;

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


    this.initialized = function (type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword, options) {

        if (options == undefined || options == null) options = {player: {}};

        if (options && options.fullscreen) {
            this.videoFullscreen = options.fullscreen && this.checkSafariMinVer(false, 6)
        } else {
            this.videoFullscreen = false
        }

        (options && options.skip != undefined) ? this.canSkip = options.skip : this.canSkip = false;
        (options && options.vrtID) ? this.vrtID = options.vrtID : this.vrtID = 'vrt';
        (options && options.producerID) ? this.producerID = options.producerID : this.producerID = 'producer';
        (options && options.producerWidth) ? this.producerWidth = options.producerWidth : this.producerWidth = 320;
        (options && options.producerHeight) ? this.producerHeight = options.producerHeight : this.producerHeight = 240;
        (options && options.debug != undefined) ? this.debug = options.debug : this.debug = false;
        (options && options.debugEvt != undefined) ? this.debugEvt = options.debugEvt : this.debugEvt = false;
        (options && options.debugTime != undefined) ? this.debugTime = options.debugTime : this.debugTime = false;
        (options && options.debugChrono != undefined) ? this.debugChrono = options.debugChrono : this.debugChrono = false;
        (options && options.debugChronoHtml != undefined) ? this.debugChronoHtml = options.debugChronoHtml : this.debugChronoHtml = false;
        (options && options.debugImportant != undefined) ? this.debugImportant = options.debugImportant : this.debugImportant = false;
        (options && options.debugVImportant != undefined) ? this.debugVImportant = options.debugVImportant : this.debugVImportant = false;
        (options && options.producerStreamWidth) ? this.producerStreamWidth = options.producerStreamWidth : this.producerStreamWidth = 640;
        (options && options.producerStreamHeight) ? this.producerStreamHeight = options.producerStreamHeight : this.producerStreamHeight = 480;
        (options && options.avgPreLoadTime) ? this.avgPreLoadTime = options.avgPreLoadTime : this.avgPreLoadTime = 0;
        (options && options.recorderCenter != undefined) ? this.recorderCenter = options.recAutoHide : this.recorderCenter = true;
        (options && options.randomOrder != undefined) ? this.randomOrder = options.randomOrder : this.randomOrder = false;

        this.options = options;
        if (options.player == undefined || options.player == null) options.player = {};

        (options && options.playerCentered != undefined) ? this.options.player.centered = options.playerCentered : this.options.player.centered = true;
        (options && options.playerWidth != undefined) ? this.options.player.width = options.playerWidth : this.options.player.Width = 640;
        (options && options.playerHeight != undefined) ? this.options.player.height = options.playerHeight : this.options.player.height = 400;

        this.mediaCount = list.length;
        this.videoType = type;
        this.videoList = list;
        this.producerStreamUrl = streamUrl;
        this.producerStreamName = this.clearname(streamName);
        this.calculateListData();
        this.randomizeOrderList();
        this.log(type, 'type');
        this.log(list, 'list');
        this.apiDomain = apiDomain;
        this.apiUsername = apiUser;
        this.apiPassword = apiPassword;
    };


    this.init = function() {
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


        //todo insert resizingWindovs

        this.playerVersion = swfobject.getFlashPlayerVersion();

        this.log("playerVersion");
        this.log(this.playerVersion.major);
        this.log(this.playerVersion.minor);

        this.log('EVT flash' + this.playerVersion.major);
        // TODO move Flash version check on the first page
        if (this.playerVersion.major == 0) {
            this.results.flash.present = false;
            $(window.vrt).trigger('vrt_event_flash_no');
            this.log('EVT no flash');
        }else{
            this.results.flash.present = true;
            $(window.vrt).trigger('vrt_event_flash_is_present');
        }

        if (swfobject.getFlashPlayerVersion("11.1.0")) {
            this.results.flash.version = true;
            $(window.vrt).trigger('vrt_event_flash_version_ok');
            this.loadProducer();
        } else {
            this.results.flash.version = false;
            this.log('Flash is old=' + this.playerVersion.major + '.' + this.playerVersion.minor);
            $(window.vrt).trigger('vrt_event_flash_old');
        }

        this.ceclient = new CEClient();

        this.apiClientSetup(
            function () {
                $(window.vrt).trigger('api_init_ok');
                if (console.log)console.log('apiClientSetup api login success');
            },
            function () {
                $(window.vrt).trigger('vrt_event_api_login_fail');
                if (console.log)console.log('apiClientSetup api login error');
            }
        );

        $(this).trigger('vrt_init_ok');
    };

    this.initVar = function () {
    };

    this.injectLayout = function () {
        var pre = this.vrtID;
        var certerstyle = "";//   "    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);";
        (this.options && this.options.mainStyle) ? '' : this.options.mainStyle = certerstyle;
        (this.options && this.options.recStyle) ? '' : this.options.recStyle = certerstyle;
        (this.options && this.options.videoStyle) ? '' : this.options.videoStyle = certerstyle;


        var html = " <div id='vrtWrapper' class='vrtWrap' style='" + this.options.mainStyle + "'> " +
            "<div id='vrtLoader'></div>" +
            "<div id='vrtFrameWr'></div>" +
            ((this.options.htmlRecorderPre) ? this.options.htmlRecorderPre : '') +
            "       <div id='vrtProducer' class='vrtWrap " + this.options.htmlRecorderClass + "' style='" + this.options.recStyle + "'>                      " +
            "           <div id='producer'></div>                                                                   " +
            "           <div class='clearfix'></div>                                                                " +
            "       </div>                                                                                          " +
            ((this.options.htmlRecorderPost) ? this.options.htmlRecorderPost : '') +
            ((this.options.htmlVideoPre) ? this.options.htmlVideoPre : '') +
            "<div id='vrtVideoWrapper' class='vrtWrap' style='" + this.options.videoStyle + "'>                                                      " +
            "      <div id='vrtvideo' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div id='videoDiv' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div id='ytPlayer' class='" + this.options.htmlVideoClass + "'></div>                                " +
            "      <div class='clearfix'></div>                                                                     " +
            "</div>                                                                                               " +
            ((this.options.htmlVideoPost) ? this.options.htmlVideoPost : '') +
            "<div id='vrtLogWrapper' class='vrtWrap'>                                                      " +
            "      <div id='vrtalert'></div>                                                                        " +
            "      <div id='vrt_timer_player'></div>                                                                       " +
            "      <div id='vrt_timer_recorder'></div>                                                                       " +
            "      <div class='clearfix'></div>                                                                     " +
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

    this.saveBufferedTS = function (cb) {
        var ar = vrt.bufferTS;
        if (ar instanceof Array && ar.length > 0) {
            for (var i = 0; i < ar.length; i++) {
                vrt.addTS(ar[i]);
            }
            vrt.bufferTS = [];
        }
        if (cb)cb();
    }

    this.vrtOnStartSequence = 0;
    this.vrtOn = function () {

        //internal event: start
        $(window.vrt).on('vrt_init_ok', function () {
            window.vrt.vrtTrigLoadend('vrt_init_ok');
        });
        $(window.vrt).on('producer_init_ok', function () {
            vrt.producerSetupConnection(vrt.producerConnection);
            window.vrt.vrtTrigLoadend('producer_init_ok');
        });
        $(window.vrt).on('api_init_ok', function () {
            window.vrt.vrtTrigLoadend('api_init_ok');
        });


        $(window.vrt).on('vrtstep_loaded', function () {
            vrt.log('EVT vrtstep_loaded');
            vrt.log('>>EVT vrtstep_loaded');
            vrt.player.video_play(vrt.showVisibility('#videoDiv'));
            //TODO open_video_window();  // HACK else the Flash player is not instantiated
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
            if (vrt.isPlaying == false) {
                streamName = this.videoList[this.currentMedia].streamCode;
                $(window.vrt).trigger('vrt_event_streamname', [{streamname:streamName}]);
                vrt.producer.publish(streamName);
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

        //external event
        $(window.vrt).on('vrt_event_start_video_session', function () {
            if (window.vrt.recAutoHide == false) {
                window.vrt.setupPlayer()
            } else {
                window.vrt.recorderHide(null, window.vrt.setupPlayer());
            }
        });

        $(window.vrt).on('vrt_event_user_next_video', function () {
            window.vrt.nextStep()
        });

        $(window.vrt).on('vrt_event_user_session_complete', function () {
            window.vrt.closeSession();
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

    };

    this.newTS = function(data){
        var dataTS = vrt.createTS(data);
        if (vrt.isRecording == true) {
            vrt.saveBufferedTS(
                function () {
                    vrt.addTS(dataTS)
                });
        } else {
            vrt.bufferTS.push(dataTS);
        }
    };

    this.createTS = function(data){
        return {
            'time': Date.now(),
            'player_ts': vrt.getTimeStampPlayerDiff(),
            'rec_ts': vrt.getTimeStampRecDiff(),
            'status': data.status,
            'content_id': this.media_id,
            'player_position' : vrt.player.getCurrentTime()
        };
    };

    this.addTS = function(TS, cbOk, cbNo){
        vrt.producer.addTimedMetadata(
            TS,
            function(){if(cbOk)cbOk()},
            function(){if(cbNo)cbNo()}
        );
    };

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
    }
    this.makeRandomString = function() {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

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
        /*
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        */
        /*
        var hash = 0;
        s = s.toString();
        if (s.length == 0) return s;
        for (i = 0; i < s.length; i++) {
            var char = s.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
        */
    };

    this.calculateListData = function (){

        for(var i = 0; i<this.mediaCount; i++){
            var d = new Date();
            var n = d.getTime();
            var pre = '';
            if(this.producerStreamName){
                var l = 4;
                if(this.producerStreamName.length<4) l = this.producerStreamName.length;
                pre = this.producerStreamName.substring(0,l);
            }
            this.videoList[i].streamCode = pre +'_'+ i +'_' + this.clearname(this.createHashCode(n));
            this.videoList[i].order = i;
        }
    };

    this.randomizeOrderList = function(){
        if(this.randomOrder===true && this.mediaCount>1){
            this.videoList =  this.shuffle(this.videoList);
        }
    }

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

    //TODO skipVideo
    this.skipVideo = function(){

    };
    this.facevideoUpload = function(url,cb){
        this.log(url,'fileUpload','a');
        this.log('!! '+url);

        this.apiClientUploadLink(url, cb);
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

    this.setupPlayer = function(){
        this.log('setupPlayer / guideButtonVideo');

        if(this.videoType=='youtube'){
            this.player = window.ytInterface;
        }else{
            //videojs.options.flash.swf = "videovideo-js.swf";
            videojs.options.techOrder = ["flash","html5"];
            this.player = window.vjsInterface;
        }

        var preloadfunc = this.player.preloadPlayer();

        this.dopreload(preloadfunc);
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

    this.stepComplete = function(res){

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
            window.vrt.apiClientSaveCustomData(res.responseId, window.vrt.options.customData,
                function() {
                    window.vrt.loader('postVideo','default',false);
                    $(window.vrt).trigger('vrt_event_video_step_completed', [{
                        responseId: res.responseId,
                        insertedCustomData: true
                    }])

                }
            );
        }else{
            window.vrt.loader('postVideo','default',false);
            $(window.vrt).trigger('vrt_event_video_step_completed',[{responseId: res.responseId,insertedCustomData:false}]);
        }


    };


    this.nextStep = function(){
        this.log('nextStep');
        this.log('>>STEP nextStep ' + this.currentMedia);
        if (this.currentMedia++ < this.mediaCount-1) {
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
        if (this.fullscreen_needed) this.videoEndFullscreen();
        this.playerDispose();

        this.log('close_session');

        // TODO finish session alert
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
    };

    this.player_is_ready = function(){

        // TODO fullscreen

        /*
         if (fullscreen_needed && !_player_is_fullscreen) {

         openDialog(__t.p_show_22, function () {
         video_go_fullscreen();
         player_is_ready_after();
         }, $.browser.msie || !checkSafariMinVer('Win', 6) ? 'bottom' : false);

         } else { */
        this.player_is_ready_after();
        //}
    };

    this.player_is_ready_after = function(){

        this.log('>>STEP player is ready aft');
        this.log('player_is_ready_after');

        // set inside the method onytplayerStateChange
        //OLD
        //this.is_player_ready = true;
        //this.startRecording();
        this.player.video_play();

    };

    this.startRecording = function() {
        this.log('startRecording');
        //if (!this.isRecording) {
            this.log('Producer recording starting');
            this.producerConnection();

        //}
    };

    this.producerSetupConnection = function(cb) {

        this.log(streamUrl);
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
        vrt.log('>>STEP producer connection')
        vrt.producer.connect();
        $(vrt).trigger('vrt_event_connect_start');
    };

    this.hideVideobox = function(cb){
        this.log('hideVideoBox');
        var id = 'videoDiv'; //id || 'videoDiv';
        $('#'+id).css('z-index','-1000');
        $('.ui-dialog').css('z-index','-1000');
        $('#vjsPlayer').hide();
        if(cb)cb();
    };

    this.loadProducer = function(){
        this.log('loadProducer');
        this.log('>>STEP producer init')

        //$('#'+this.producerID).css('display', 'inline-block');
        //$('#'+this.producerID).addClass('rotating-loader');

        this.webProducerInit();
    };

    // TODO popOverCe
    this.popOverCe = function(type){};

    // LOG FUNCTIONS
    this.log = function (msg , display ,mode) {

        if(!this.debug) return'';
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
                    if (mode && mode == 'a')
                        $('#vrtVal_' + display + ' span').append('<br/>' + JSON.stringify(msg));
                    else
                        $('#vrtVal_' + display + ' span').html(msg.toString());
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
        (start==true)? startm = 'start':'';
        var timeCheck = vrt.logTime();

        $(vrt).trigger('vrt_event_logchrono_'+this.chronoType[pos]+'_'+startm, [{time:timeCheck[7]}]);


        console.log('vrt_event_logchrono_'+this.chronoType[pos]+'_'+startm+'    '+timeCheck[7]);
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
            str = 'CHRONO '+pos+': ' +startm+ ' ' + msg +': '+vrt.chronoStart[pos][4]+' '+vrt.chronoStart[pos][5]+' '+vrt.chronoStart[pos][6];
            if (echo && console && console.log) console.log(str);

        }else{
            vrt.chronoEnd[pos] = timeCheck;
            str = 'CHRONO '+pos+': '+startm+ ' ' + msg +': '+vrt.chronoEnd[pos][4]+' '+vrt.chronoEnd[pos][5]+' '+vrt.chronoEnd[pos][6];
            strend = 'CHRONO '+pos+': '+ msg +' RESULTS: ' + vrt.get_time_diff(vrt.chronoStart[pos][7], vrt.chronoEnd[pos][7])
            if (echo && console && console.log) console.log(str);
            if (echo && console && console.log) console.log(strend);
        };

        //if(echoHtml && pos==1) $('#vrt_timer_player').append('<br/>'+str +'<br/>'+ strend);
        //if(echoHtml && pos==0) $('#vrt_timer_recorder').append('<br/>'+str +'<br/>'+ strend);
        str = ''; strend = '';

        $(vrt).trigger('vrt_eventList', [{event: this.chronoType[pos], position:startm, time: timeCheck[7], timeFull: timeCheck}]);


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
            $(vrt).trigger('vrt_eventList_startFirst', [{startFirst: start_first, timeDiff: difft}]);
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
            $(vrt).trigger('vrt_eventList_endFirst', [{endFirst: end_first, timeDiff: difft}]);
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
        var bver, isSafari = $.browser.safari && window.navigator.appVersion.indexOf('Chrome') < 0;

        if (isSafari && (!plat || window.navigator.platform.indexOf(plat) >= 0))
            return (bver = /Version\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false;
        else
            return true;
    };

    this.checkIe = function()
    {
        return (/msie|trident/i).test(navigator.userAgent)

    }

    this.checkIeVersion = function(version)
    {
        return ((navigator.userAgent.toLowerCase().indexOf('msie ')+version != -1) || (navigator.userAgent.toLowerCase().indexOf('trident 6') != -1));
    }

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
        var time =this.media_length * 1000 + this.avgPreLoadTime+ 100;
        this.log('!!STEP vrt setup stop playing' + time);
        this.stop_handle = setTimeout(vrt.stop_playing,time );
        this.stop_handle_rec = setTimeout(vrt.stop_rec,time );
    };

    this.setupPlaybackPositionPolling = function(){
        vrt.stop_polling_player_pos = setInterval(vrt.pollingPlayerPos, 500 );
    };

    this.pollingPlayerPos = function(){
        vrt.addTS(vrt.createTS({status:17}));
    };

    this.stop_playing =function() {
        vrt.log('>>STEP vrt stop play');
        vrt.player.video_stop(function(){vrt.logChrono(1, false, 'player');});
        vrt.isPlaying=false;
        clearTimeout(vrt.stop_handle);
        vrt.exitcode = 1;
        vrt.loader('postVideo','default',true);

        $('#videoDiv').css('visibility','hidden');
        //this.isRecording = false;
    };

    this.stop_rec =function() {
        vrt.producer.unpublish();
        //vrt.isRec=false;
        clearTimeout(vrt.stop_handle_rec);
        //this.isRecording = false;
    };

    // WEBPRODUCER FUNCTION
    this.webProducerInit = function(){
        this.log("===WEBP Webpr_init");
        vrt.logTime('webProducerInit');
        vrt.log('!!PRODUCER webProducerInit');
        this.producer = new WebProducer({
            id: this.producerID, // the html object id
            width: this.producerWidth, // these are sizes of the player on the page
            height: this.producerHeight, // not related to the stream resolution
            trace: false, // would enable debug logs in js console
            path: '../swf/'
        });

        this.producer.once('ready', function () {
            $(window.vrt).trigger('vrt_event_producer_ready');
            var vrt = window.vrt;
            if(vrt.recorderCenter===true)  $('#producer').vrtCenter();
            vrt.logTime('webpr ready');
            vrt.log('!!PRODUCER ready');
            vrt.log('===WEBP The producer is now ready');
            vrt.log('ready + producerConnStatus');

            vrt.popOverCe('pop_click_allow','destroy');
            vrt.flash_allowed = true;

            this.setMirroredPreview(true);
            vrt.log('Is preview mirrored ? ' + this.getMirroredPreview());
            this.setAudioStreamActive(false);
            vrt.log('Is audio streaming active ? ' + this.getAudioStreamActive());

            var numCameras = this.countCameras();

            vrt.log("===WEBP We have " + numCameras + " camera(s) available");
            if (numCameras == 0){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
            }else if (numCameras == undefined){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
            }else{
                $(window.vrt).trigger('vrt_event_producer_camera_found');
            }

            // checking user permissions on camera
            this.once('camera-unmuted', function () {
                vrt.log('!!PRODUCER camera unmuted');
                vrt.log('camera unmuted','producerConnStatus');
                vrt.log("===WEBP Camera is now available");

                vrt.popOverCe('pop_click_allow','destroy');
                vrt.popOverCe('pop_center');
                $(window.vrt).trigger('producer_init_ok');
                $(window.vrt).trigger('vrt_event_producer_camera_ok');
            });

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
                vrt.log("===WEBP The camera is available, user already approved");
                $(window.vrt).trigger('producer_init_ok');
                $(window.vrt).trigger('vrt_event_producer_camera_ok');
            }

            this.once('camera-unmuted', function () {
                vrt.log('!!PRODUCER camera unmuted');
                vrt.log("Camera is now available");
                vrt.log('camera aviable','producerConnStatus');
                this.setMirroredPreview(true);
                vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
                this.setAudioStreamActive(false);
                vrt.log('Is audio streaming active ? ', producer.getAudioStreamActive());
            });

            //producer.setCredentials("username", "password"); // if you want to emulate fmle auth
            this.on('publish',function(){
                vrt.isRecording = true;
                $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(20)});
                vrt.logChrono(0, true, 'PRODUCER RECORDING');
                vrt.log('!!PRODUCER publish');

            });
            this.on('unpublish',function(){
                $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(21)});
                vrt.logChrono(0, false, 'PRODUCER RECORDING');
                vrt.isRecording = false;
                vrt.bufferTS = [];
                clearTimeout(vrt.stop_polling_player_pos);
                vrt.log('!!PRODUCER unpublish');
            });
            this.on('disconnect',function(){
                //vrt.logChrono(0, false, 'PRODUCER RECORDING');
            });

            this.on('connect', function () {

                vrt.log('!!PRODUCER connect');

                this.setMirroredPreview(true);
                vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
                this.setAudioStreamActive(false);
                vrt.log('Is audio streaming active ? ', this.getAudioStreamActive());
                this.setStreamFPS(15);
                vrt.log('FPS ', this.getStreamFPS());
                $(vrt).trigger('vrtstep_connect');


            });

            this.on('save', function (url) {
                vrt.log('!!PRODUCER save ' + url);
                //vrt.logChrono(2, false, 'PRODUCER SAVING');
                vrt.hideVideoBox();
                vrt.postPartecipate();
                //vrt.logChrono(3, true, 'API UPLOD FILES');
                vrt.facevideoUpload(url, vrt.stepComplete);

            });

            this.on('save-metadata', function (url) {
                console.log("The metadata file has been saved to "+ url);
            });

            this.on('error', function (reason) {
                vrt.isRecording = false;
                vrt.log('!!PRODUCER error '+reason);
                vrt.logTime('webpr error');
                vrt.log(">>===WEBP ERROR: " + reason);
            });

            this.on('disconnect', function () {
                vrt.isRecording = false;
                vrt.log('!!PRODUCER disconnect');
                //vrt.logChrono(2, true, 'PRODUCER SAVING');
                vrt.logTime('webpr disconnect');
                vrt.log('>>STEP producer disconnected');
                vrt.trigger('vrtstep_disconnect');

                // TODO trigger event: producer disconnect w/ exit code

            });

        });
    }

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

    this.apiClientUploadLink = function(streamFileName, cb){
        this.log('>>STEP api file upload ' + streamFileName);
        this.log('EVT upload api file upload ' + streamFileName);
        this.ceclient.uploadLink(streamFileName,cb);
    };

    this.apiClientSetup = function(cbSuccess, cbFail){

        this.log('Api login in progress');
        this.log('>>STEP api init')
        this.ceclient.init(true, true, this.apiDomain);
        this.ceclient.logout(
                this.ceclient.login(this.apiUsername,this.apiPassword,
                    function(ret){
                        vrt.apiClientRes(ret);
                        if(ret){
                            if(console.log)console.log('Api login OK + success');
                            vrt.results.apilogin = true;
                            if(cbSuccess) cbSuccess();
                        }else{
                            if(console.log)console.log('Api login FAIL + danger');
                            vrt.results.apilogin = false;
                            if(cbFail) cbFail();
                        }
                    })
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
    }

    this.loaderCss = function (){
        return ' <style> #vrtLoader{width: 100%} #vrtLoaderInner{margin: 10px auto;} #circleG{width:87.5px}.circleG{background-color:#FFF;float:left;height:19px;margin-left:10px;width:19px;-moz-animation-name:bounce_circleG;-moz-animation-duration:1.35s;-moz-animation-iteration-count:infinite;-moz-animation-direction:linear;-moz-border-radius:13px;-webkit-animation-name:bounce_circleG;-webkit-animation-duration:1.35s;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:linear;-webkit-border-radius:13px;-ms-animation-name:bounce_circleG;-ms-animation-duration:1.35s;-ms-animation-iteration-count:infinite;-ms-animation-direction:linear;-ms-border-radius:13px;-o-animation-name:bounce_circleG;-o-animation-duration:1.35s;-o-animation-iteration-count:infinite;-o-animation-direction:linear;-o-border-radius:13px;animation-name:bounce_circleG;animation-duration:1.35s;animation-iteration-count:infinite;animation-direction:linear;border-radius:13px}#circleG_1{-moz-animation-delay:.27s;-webkit-animation-delay:.27s;-ms-animation-delay:.27s;-o-animation-delay:.27s;animation-delay:.27s}#circleG_2{-moz-animation-delay:.63s;-webkit-animation-delay:.63s;-ms-animation-delay:.63s;-o-animation-delay:.63s;animation-delay:.63s}#circleG_3{-moz-animation-delay:.8099999999999999s;-webkit-animation-delay:.8099999999999999s;-ms-animation-delay:.8099999999999999s;-o-animation-delay:.8099999999999999s;animation-delay:.8099999999999999s}@-moz-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-webkit-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-ms-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@-o-keyframes bounce_circleG{50%{background-color:#2E2E2E}}@keyframes bounce_circleG{50%{background-color:#2E2E2E}}  </style>';
    }
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

jQuery.fn.vrtCenter2 = function () {
    var w = $(window);
    console.log(this);
    console.log(w.width());
    console.log('('+w.width() + ' - ' + this.outerWidth() +') / 2) + ' + w.scrollLeft()+')');

    this.css({
        'position':'absolute',
        //'top':Math.abs(((w.height() - this.outerHeight()) / 2) + w.scrollTop()),
        'left':Math.abs(((w.width() - this.outerWidth()) / 2) + w.scrollLeft())
    });
    return this;
};
jQuery.fn.vrtCenter = function () {
    return this.each(function () {
        var el = $(this);
        var h = el.height();
        var w = el.width();
        var w_box = $(window).width();
        var h_box = $(window).height();
        var w_total = (w_box - w) / 2; //400
        var h_total = (h_box - h) / 2;
        var css = {"position": 'absolute', "left": w_total + "px"/*, "top": h_total + "px"*/};
        el.css(css)
    });
};
