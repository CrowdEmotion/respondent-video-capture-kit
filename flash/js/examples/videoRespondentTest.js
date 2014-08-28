

function Vrt(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options) {


    //User settings
    this.videoList = null;
    this.videoFullscreen = false;
    this.videoType = null; //youtube or ceserver
    this.canSkip = false;
    this.debug = false

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
    this.stream_code = null

    //Various
    this.flash_allowed = false;
    this.ww = 0;            //windows width
    this.wh = 0;            //windows height
    this.media_id = null;   //media played
    this.media_length = 0;  //media played
    this.media_path = null; //media played
    this.exitcode = null;



    //steps && user actions
    this.click_start = false;
    this.is_recording_started = false;
    this.currentMedia = -1;
    this.mediaCount = 0;

    //player values
    this.vjs = false;
    this.player = null;
    this.is_player_ready = false;
    this.player_starts_recorder = false;

    //api client values
    this.ceclient;
    this.apiUsername, this.apiPassword, this.apiDomain;


    this.initialized = function(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options){
        if(options && options.fullscreen) {this.videoFullscreen = options.fullscreen && this.checkSafariMinVer(false,6)} else {  this.videoFullscreen = false };
        (options && options.skip)? this.canSkip = options.skip : this.canSkip = false;
        (options && options.vrtID)? this.vrtID = options.vrtID : this.vrtID = 'vrt';
        (options && options.producerID)? this.producerID = options.producerID : this.producerID = 'producer';
        (options && options.producerWidth)? this.producerWidth = options.producerWidth : this.producerWidth = 320;
        (options && options.producerHeight)? this.producerHeight = options.producerHeight : this.producerHeight = 240;
        (options && options.debug)? this.debug = options.debug : this.debug = false;
        (options && options.producerStreamWidth)? this.producerStreamWidth = options.producerStreamWidth : this.producerStreamWidth = 640;
        (options && options.producerStreamHeight)? this.producerStreamHeight = options.producerStreamHeight : this.producerStreamHeight = 480;

        this.mediaCount = list.length;
        this.videoType  = type;
        this.videoList  = list;
        this.producerStreamUrl = streamUrl;
        this.producerStreamName = this.clearname(streamName);
        this.calculateStreamCode();
        this.log(type,'type');
        this.log(list,'list');
        this.apiDomain = apiDomain;
        this.apiUsername = apiUser;
        this.apiPassword = apiPassword;
    }


    this.init = function (type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options) {
        this.log('>>STEP: vrt init');
        this.log(arguments);

        window.vrt = this;

        this.log(this.mediaCount,'mediaCount');
        this.log(this.currentMedia,'currentMedia');
        this.log(this.producerStreamUrl,'producerStreamUrl');
        this.log(this.producerStreamName,'producerStreamName');

        this.injectLayout();
        this.vrtOn();


        //todo insert resizingWindovs

        this.playerVersion = swfobject.getFlashPlayerVersion();

        this.log("playerVersion");
        this.log(this.playerVersion.major);
        this.log(this.playerVersion.minor);

        this.log('EVT flash'+this.playerVersion.major);
        // TODO move Flash version check on the first page
        if (this.playerVersion.major == 0) {
            $(window.vrt).trigger('vrt_event_flash_no');
            this.log('EVT no flash');
        }

        if (swfobject.getFlashPlayerVersion("11.1.0")) {
            this.loadProducer();
        } else {
            $(window.vrt).trigger('vrt_event_flash_old');
            this.log('Flash is old=' + this.playerVersion.major + '.' + this.playerVersion.minor);
        }


        this.ceclient =  new CEClient();


        this.apiClientSetup(
            function(){
                $(window.vrt).trigger('api_init_ok');
                if(console.log)console.log('apiClientSetup api login success')
            },
            function(){
                //vrt.alertAndRestart(vrt.__t.p_api_login_fail);
                $(window.vrt).trigger('vrt_event_api_login_fail');
                if(console.log)console.log('apiClientSetup api login error')
            }
        );

        $(this).trigger('vrt_init_ok');
    };

    this.injectLayout = function(){
        var pre = this.vrtID;
        $("#"+pre).html(
                " <div id='vrtProducer' class='vrtWrap'> " +
                "       <div id='vrtProducer' class='vrtWrap'>                                                          "+
                "           <div id='producer'></div>                                                                   "+
                "           <div class='clearfix'></div>                                                                "+
                "       </div>                                                                                          "+
                "       <div id='vrtVideoWrapper' class='vrtWrap'>                                                      "+
                "      <div id='vrtvideo'></div>                                                                        "+
                "      <div id='vrtalert'></div>                                                                        "+
                "      <div id='videoDiv'></div>                                                                        "+
                "      <div id='ytPlayer'></div>                                                                        "+
                "      <div class='clearfix'></div>                                                                     "+
                "  </div>                                                                                               "+
                "     <!-- <div id='vrtValues' class='vrtWrap'>                                                             "+
                "          <h4>Info</h4>                                                                                "+
                "          <div id='vrtVal_type'>Type: <span></span></div>                                              "+
                "          <div id='vrtVal_mediaCount'>media count: <span></span></div>                                 "+
                "          <div id='vrtVal_currentMedia'>current media: <span></span></div>                             "+
                "          <div id='vrtVal_list'>List: <span></span></div>                                              "+
                "          <div id='vrtVal_producerStreamUrl'>Producer stream URL: <span></span></div>                  "+
                "          <div id='vrtVal_producerStreamName'>Producer stream name: <span></span></div>                "+
                "          <div id='vrtVal_producerConnStatus'>Producer conn status: <span>Not connected</span></div>   "+
                "          <div id='vrtVal_apiStatus'>API status: <span>Not connected</span></div>                      "+
                "          <div id='vrtVal_fileUpload'>Files: <span>Not connected</span></div>                          "+
                "      </div>                                                                                           "+
                "      <div id='vrtLog'></div>                 --->                                                          "
        );
    }

    this.vrtOnStartSequence = 0;
    this.vrtOn = function(){

        $(window.vrt).on('vrt_init_ok', function() {
            window.vrt.vrtTrigLoadend('vrt_init_ok');
        });
        $(window.vrt).on('producer_init_ok', function() {
            window.vrt.vrtTrigLoadend('producer_init_ok');
        });
        $(window.vrt).on('api_init_ok', function() {
            window.vrt.vrtTrigLoadend('api_init_ok');
        });


        $(window.vrt).on('vrt_event_start_video_session', function() {
            window.vrt.setupPlayer();
        });

        $(window.vrt).on('vrt_event_user_next_video', function() {
            window.vrt.nextStep()
        });

        $(window.vrt).on('vrt_event_user_session_complete', function() {
            window.vrt.closeSession();
        });




    };

    this.vrtTrigLoadend = function(evtname){
        window.vrt.vrtOnStartSequence++;
        vrt.log('EVT vrtOnStartSequence '+evtname+' '+ window.vrt.vrtOnStartSequence);
        if(window.vrt.vrtOnStartSequence>=3){
            $(window.vrt).trigger('vrt_event_preview_loaded');
        }
    };


    this.createHashCode = function (s){
        var hash = 0;
        s = s.toString();
        if (s.length == 0) return s;
        for (i = 0; i < s.length; i++) {
            var char = s.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

    this.calculateStreamCode = function (){

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
        }
        /*
         if(count($media) > 0) {
         $info = '';
         foreach($media as $medium) {
         $info .= ',  "'.$medium['Media']['id'] .'_'.Security::hash( strtotime('now')).'"';

         }
         echo substr($info,1);
         }
         ?>];
         */
    };


    //mediaInfo, instance of this.videoList
    this.buildVideoSources = function(mediaInfo) {
        if(this.videoType == 'customserver') {

            this.sources = [
                { type: "video/mp4", src: mediaInfo.path }
            ];

            /*
             if(!media_info.mp4only) {
             var webm = media_info.path.replace('.mp4','.webm');
             sources.push({ type: "video/webm", src: webm });
             }
             */
        } else {
            this.sources = [
                { type: "video/youtube", src: mediaInfo.path_original }
            ];
        }
    };

    this.startButton = function(){
        $("#vrtGuidingButton").click( this, function (vrtObj) {

            //TODO uncomment
            // $('#recorder_wrapper').popover('destroy');
            // $('#guiding_button').popover('destroy');
            // $('#alertcromeplacer').popover('destroy');
            // $('#media_showing_title').hide();
            // $('#media_showing_title').hide();
            // $("#guiding_button").hide();
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
        //$('#recorder_wrapper').popover('destroy');
        //$('#vrt')
        $('#vrtGuidingButton').show();
        vrt.popOverCe('pop_start');
    };


    this.hideAllAndStartPlayer = function(){
        //this.log('hideAllAndStartPlayer');
        this.hideSimple('#vrtProducer');
        this.hideSimple('#vrtCanStartButtonWrapper');
        this.hideSimple('#vrtGuidingButton');

        this.producer.height=1;
        this.producer.width=1;

    };

    this.hideSimple = function(el){
        $(el).css('visibility','hidden');
        $(el).css('z-index',-1000);
        $(el).css('position','absolute');
        $(el).css('top','1000000px');
        $(el).css('left','1000000px');

    };
    //TODO skipVideo
    this.skipVideo = function(){

    };

    this.facevideoUpload = function(url,cb){

        this.log(url,'fileUpload','a');
        this.apiClientUploadLink(url, cb);

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
    }
    // former guideButtonVideo
    this.setupPlayer = function(){
        this.log('setupPlayer / guideButtonVideo');

        if(this.videoType=='youtube'){
            this.player = window.ytInterface;
        }else{
            this.player = window.vjsInterface;
        }


        var preloadfunc = this.player.preloadPlayer();

        this.dopreload(preloadfunc);
    }

    this.afterpreload = function (success) {
        if (success) {
            //$('#loader-modal').modal('hide');
            if(this.currentMedia == -1)
                this.nextStep();

        }else {
            //$('#loader-modal').modal('hide');
            //openDialog(__t.p_show_04 + ' <a href="javascript:closeDialog(); $(\'#loader-modal\').modal(\'hide\'); nextStep();">' +
            //    __t.p_show_here + '</a> ' + __t.p_show_05, dopreload);
        }
    };

    this.dopreload = function (preloadfunc) {
        if (preloadfunc) {
            // TODO $('#loader-modal').modal({ keyboard: false });
            preloadfunc(this.afterpreload);
        } else {
            this.afterpreload(true);
        }
    };

    this.stepComplete = function(res){
        $(window.vrt).trigger('vrt_event_video_step_completed',[{responseId: res.responseId}]);
    };

    this.nextStep = function(){
        this.log('nextStep');
        this.log('>>STEP nextStep ' + this.currentMedia);
        if (this.currentMedia++ < this.mediaCount-1) {

            this.log(this.currentMedia,'currentMedia');
            this.log('nextStep=' + this.currentMedia);

            if (this.currentMedia >= 0) {
                //TODO $('#media_showing_summary').text(__t.p_show_item + ' ' + (current_media + 1) + ' ' + __t.p_show_of + ' ' + media_count + ':');
                //$('#media_showing_title').html('<em>"' + media_info[current_media].name + '"</em> (' + media_info[current_media].length + "'')");
            }

            this.media_id = this.clearname(this.videoList[this.currentMedia].name); //was media_info[current_media].id
            this.media_length = this.videoList[this.currentMedia].length;
            this.media_path = this.youtubeParser(this.videoList[this.currentMedia].path);
            this.log('>>STEP  YT path ' + this.media_path);

            this.proceedToShow();
        } else {
            $(window.vrt).trigger('vrt_event_video_session_complete');
            //this.closeSession();
        }
    };

    this.clearname = function(s){
        if(s)
            return s.toString().replace(/[^a-z0-9]/gi, '_').toLowerCase();
        else return s;
    }

    this.closeSession = function() {
        if (this.fullscreen_needed) this.videoEndFullscreen();
        this.playerDispose();

        this.log('close_session');
        //todo: finish session alert


    }

    //todo videoEndFullscreen
    this.videoEndFullscreen = function(){

    }

    this.playerDispose = function(){
        if(this.player){
            this.player.player_dispose();
        }
    }

    this.proceedToShow = function () {
        this.log('proceedToShow');

        //TODO hideStartPlayer();

        this.player.loadPlayer();


        if (this.is_player_ready){

            this.player_is_ready();
        }


    };

    this.player_is_ready = function(){

        //if(console.log) console.log('player_is_ready');
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

        this.is_player_ready = true; //set ready insede the method onytplayerStateChange

        /* Old code
         if (this.player_starts_recorder){
         this.player.video_play(this.media_path);
         }else{
         */
        this.startRecording();
        /*
         }
         */

    };

    this.startRecording = function() {

        this.log('startRecording');
        if (!this.is_recording_started) {
            this.log('Producer recording starting');
            this.producerConnection();
            this.is_recording_started = true;
        }
    };

    // former tryToConnect
    this.producerConnection = function() {
        this.log('>>STEP producer connection')
        this.log('producerConnection/tryToConnect');
        //producer.setCredentials("username", "password"); // if you want to emulate fmle auth
        var streamName = this.videoList[this.currentMedia].streamCode; // stream name will reflect in the recorded filename

        this.log('STREAM HERE');
        this.log(streamUrl);
        this.log('filename ' + this.producerStreamName);
        var url = 'rtmp://' + this.producerStreamUrl + ':1935/live'; // "live/" is the RTMP application name, always the same.
        this.log('url ' + url);

        this.producer.setUrl(url);
        this.producer.setStreamName(streamName);
        this.producer.setStreamWidth(this.producerStreamWidth);
        this.producer.setStreamHeight(this.producerStreamHeight);

        this.producer.connect();

        //if(cb)cb();
        //setTimeout(function () { producer.disconnect(); }, 10000000);

    }


    this.hideVideobox = function(cb){
        this.log('hideVideoBox');
        var id = 'videoDiv'; //id || 'videoDiv';
        $('#'+id).css('z-index','-1000');
        $('.ui-dialog').css('z-index','-1000');
        $('#vjsPlayer').hide();
        if(cb)cb();
    };

    //TODO resizingWindow
    this.resizingWindow = function(){
        $( window ).resize(function() {
            if(this.click_start==false){
                //popOverCe(pop_center);
                //popOverCe(pop_start);
                if(this.ww == $(window).width() && this.wh < $(window).height()){
                    $('#alertcromeplacer').popover('destroy');
                }else{
                    this.popOverCe("pop_chromeask");
                }
                //popOverCe(pop_chromeask);
                this.ww = $(window).width();
                this.wh = $(window).height();
            }
        });
    };

    this.loadProducer = function(){
        this.log('loadProducer');
        this.log('>>STEP producer init')

        $('#'+this.producerID).css('display', 'inline-block');
        //$('#'+this.producerID).addClass('rotating-loader');

        this.webProducerInit();
    }

    //DIALOG E POPOcER
    //TODO openDialog
    this.openDialog = function(){};

    //TODO popOverCe
    this.popOverCe = function(type){};


    //USER ACTIONS

    //LOG FUNCTIONS
    this.log = function (msg , display,mode) {

        if(msg.toString().substring(0,2)=='>>' || msg.toString().substring(0,2)=='EV') {
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
    }

    this.alertAndRestart = function(msg) {
        alert(this.__t.p_show_08 + ' ['+ msg +']');
        //document.location.href = document.location.href;
    }

    //BROWSER FUNCTIONS
    this.checkSafariMinVer = function(plat, ver) {
        var bver, isSafari = $.browser.safari && window.navigator.appVersion.indexOf('Chrome') < 0;

        if (isSafari && (!plat || window.navigator.platform.indexOf(plat) >= 0))
            return (bver = /Version\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false;
        else
            return true;
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
        this.setup_stop_playing();
    }

    this.setup_stop_playing =function() {

        this.log('>>STEP vrt setup stop playing');

        this.stop_handle = setTimeout(vrt.stop_playing, this.media_length * 1000 + 100);

        //clearTimeout(stop_handle);
    }

    this.stop_playing =function() {
        vrt.log('>>STEP vrt stop play');
        vrt.log('stop_playing');
        vrt.player.video_stop();
        //TODO uncoment
        //if(checkSafariMinVer('Win', 6)) hideVideoBox('videoDivParent');    //videoDialog.dialog('close');
        //video_after_close_window();
        clearTimeout(vrt.stop_handle);
        this.exitcode = 1;
        this.producer.disconnect();
        $('#videoDiv').css('visibility','hidden');
        //this.is_recording_started = false;
    }

    //WEBPRODUCER FUNCTION
    this.webProducerInit = function(){
        this.log("===WEBP Webpr_init");

        this.producer = new WebProducer({
            id: this.producerID, // the html object id
            width: this.producerWidth, // these are sizes of the player on the page
            height: this.producerHeight, // not related to the stream resolution
            trace: false, // would enable debug logs in js console
            path: '../swf/'
        });

        this.producer.once('ready', function () {
            var vrt = window.vrt;
            vrt.log('>>STEP producer ready');
            vrt.log('===WEBP The producer is now ready');
            vrt.log('ready','producerConnStatus');

            vrt.popOverCe('pop_click_allow','destroy');
            vrt.flash_allowed = true;

            this.setMirroredPreview(true);
            vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
            this.setAudioStreamActive(false);
            vrt.log('Is audio streaming active ? ', this.getAudioStreamActive());

            var numCameras = this.countCameras();

            vrt.log("===WEBP We have " + numCameras + " camera(s) available");
            if (numCameras == 0){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
                //return vrt.alertAndRestart('there is no camera availalbe, please connect a camera and turn on');
            }
            if (numCameras == undefined){
                $(window.vrt).trigger('vrt_event_producer_no_camera_found');
                //return vrt.alertAndRestart('There is no camera availalbe, please connect a camera turn on.');
            }
            // checking user permissions on camera
            this.once('camera-unmuted', function () {
                vrt.log('>>STEP producer camera unmuted');
                vrt.log('camera unmuted','producerConnStatus');
                vrt.log("===WEBP Camera is now available");
                //webcamTestHelper();
                vrt.popOverCe('pop_click_allow','destroy');
                //TODO $('#recorder_wrapper').popover('destroy');
                vrt.popOverCe('pop_click_allow', 'destroy');
                vrt.popOverCe('pop_center');
                $(window.vrt).trigger('producer_init_ok');
                $(window.vrt).trigger('vrt_event_producer_camera_ok');
            });
            this.on('camera-muted', function () {
                vrt.log('camera muted','producerConnStatus');
                vrt.log("===WEBP The user has denied access to the camera");
                //vrt.alertAndRestart(__t.p_show_06);
                $(window.vrt).trigger('vrt_event_producer_camera_blocked');
            });


            var cameraMuted = this.isCameraMuted();

            if (cameraMuted) {
                vrt.log("===WEBP The user must approve camera access");
                vrt.popOverCe('pop_click_allow');
                vrt.log('user must approve camera','producerConnStatus');
               // $(window.vrt).trigger('vrt_event_producer_camera_blocked');
            } else {
                // NO this.webcamTestHelperResize();
                // NO thiswebcamTestHelper();
                vrt.log('camera aviable','producerConnStatus');
                vrt.log("===WEBP The camera is available, user already approved");
                //TODO $('#recorder_wrapper').popover('destroy')
                $(window.vrt).trigger('producer_init_ok');
                $(window.vrt).trigger('vrt_event_producer_camera_ok');
            }

            this.once('camera-unmuted', function () {
                vrt.log('>>STEP producer camera unmuted');
                vrt.log("Camera is now available");
                vrt.log('camera aviable','producerConnStatus');
                this.setMirroredPreview(true);
                vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
                this.setAudioStreamActive(false);
                vrt.log('Is audio streaming active ? ', producer.getAudioStreamActive());
            });

            //producer.setCredentials("username", "password"); // if you want to emulate fmle auth
            this.on('connect', function () {
                vrt.log('>>STEP producer connect');
                this.setMirroredPreview(true);
                vrt.log('Is preview mirrored ? ', this.getMirroredPreview());
                this.setAudioStreamActive(false);
                vrt.log('Is audio streaming active ? ', this.getAudioStreamActive());

                console.log('ON CONNECTED');
                vrt.log('connected','producerConnStatus');
                this.setStreamFPS(15);
                vrt.log('FPS ', this.getStreamFPS());

                vrt.log("===WEBP We are now streaming live on our channel" + vrt.is_recording_started);
                vrt.log(this.getStreamName());
                //TODO $('#recorder_wrapper').popover('destroy')

                if (!vrt.player_starts_recorder) {
                    $('#videoDiv').css('visibility','visible');
                    //TODO open_video_window();  // HACK else the Flash player is not instantiated
                    vrt.player.video_play();
                    //vrt.showVideoBox();
                    vrt.setup_stop_playing();
                }

            });

            this.on('save', function (url) {
                vrt.log('>>STEP producer save');
                vrt.log("===WEBP Save: The file has been saved to " + url);
                vrt.hideVideoBox();
                vrt.postPartecipate();
                vrt.facevideoUpload(url, vrt.stepComplete);
                //vrt.is_recording_started = false;
            });

            this.on('error', function (reason) {
                vrt.log("===WEBP ERROR: ", reason);
                //TODO vrt.alertAndRestart(this.webpr_error_list(reason));
            });

            this.on('disconnect', function () {
                vrt.log('>>STEP producer disconnected');
                vrt.is_recording_started = false;
                //todo uncomment
                /**
                 vrt.log("===WEBP The producer has been disconnected");


                 if(this.exitcode!=1){
                    vrt.alertAndRestart(vrt.__t.p_show_27);
                }
                 **/
            });

        });
    }


    //API

    this.apiClientUploadLink = function(streamFileName, cb){
        this.log('>>STEP api file upload ' + streamFileName);
        this.ceclient.uploadLink(streamFileName,cb);
    };

    this.apiClientSetup = function(cbSuccess, cbFail){

        this.log('Api login in progress');
        this.log('>>STEP api init')
        this.ceclient.init(true, false, this.apiDomain);
        this.ceclient.login(this.apiUsername,this.apiPassword,
            function(ret){
                if(ret){
                    if(console.log)console.log('Api login OK + success');
                    if(cbSuccess) cbSuccess();
                }else{
                    if(console.log)console.log('Api login FAIL + danger');
                    if(cbFail) cbFail();
                }
            });

    };

    this.apiClientLogout = function(res){
        this.log('>>STEP api logout')
        if(res.responseId){
            if(console.log)console.log(res);
            if(console.log)console.log('Uploaded file to api with response id: '+res.responseId +' success');
        }else{
            if(console.log)console.log('Upload error status: '+res.statusText + ' [' + res.status + '] warning');
        }
        this.ceclient.logout();
    };


    // STRING FUNCTION

    this.__t = {
        p_show_action: "Action",
        p_show_01: "Please click on the \"Allow\" button in the Adobe Flash Player security request",
        p_show_01a: "Click to proceed!",
        p_show_02: "Adjust your webcam so that your face appears at the centre of the box.",
        p_show_03: "Please click on the Start button when ready.",
        p_show_04: "There was a problem preloading the items: please check your Internet connection and use a recent browser. Click Ok to retry or click",
        p_show_here: "here",
        p_show_05: "to proceed anyway with the test.",
        p_show_06: "You did not allow Flash to use the webcam.",
        p_show_07: "Please refresh the page and follow the instructions.",
        p_show_08: "There was an error sending data to the servers, sorry.\\nThe test has to be started over.",
        p_show_item: "Item",
        p_show_of: "of",
        p_show_09: "The test session is finished.",
        p_show_09a: "Click OK to proceed.",
        p_show_11: "Please click on the \"Allow\" button in the Adobe Flash Player security request.",
        p_show_check: "Check",
        p_show_12: "Position your face in the oval (leave out the hair): play with the position of the webcam and the lights to obtain the best image. Press the Calibrate button when you are ready",
        p_show_13: "then follow the red dot with your eyes without moving your head or using the keyboard or the mouse.",
        p_show_14: "There is no webcam, or it has a resolution lower than 640x480 pixels, or you did not allow Adobe Flash to use it.",
        p_show_15: "Please check the webcam, refresh the page and follow the instructions again.",
        p_show_16: "There were multiple errors saving data back to our servers. Please verify that your Internet connection is working.",
        p_show_17: "If the errors persist, please contact out support at",
        p_show_18: "The browser window or the computer screen are too small to let the test be precise enough.\nPlease resize the window, turn off all the browser toolbars or use a bigger monitor or another computer.",
        p_show_19: "Please maximize the browser window.",
        p_show_20: "The installed version of Flash is too old, or the plugin has been disabled.",
        p_show_21: "To get the latest version, please visit",
        p_show_22: "Click on the Ok button to go fullscreen.",
        p_show_23: "Do you want to share this video?",
        p_show_24: "Setup complete",
        p_show_25: "If Chrome infobar appear, please click on ALLOW",
        p_show_26: "Skip",
        p_show_27: "No connection aviable. . Please connect your device to internet and retry",
        p_show_28: "No camera found. Please connect one webcam and click and retry",
        p_show_29: "We cannot register. Please restart",
        p_show_30: "The flash plugin is blocked or not installed in your browser",
        p_show_bestfilt_1: "All",
        p_show_bestfilt_2: "Friends",
        p_show_bestfilt_3: "My",
        p_api_login_fail: "API login fail"

    };

    //alerts
    //allow flash player
    this.pop_click_allow =   {name: 'pop_click_allow', placement: 'top', trigger: 'manual',  content: this.__t.p_show_01 },
        //
        this.pop_center =        {name: 'pop_center', placement: 'top', trigger: 'manual',  html: true,
            content: function(){return $('#popover_content_wrapper_center').html();} },
        //click to start play
        this.pop_start  =   {name: 'pop_start',placement: 'top', trigger: 'manual', offset: 20, title: this.__t.p_show_24, content: this.__t.p_show_01a },
        //chrome permission
        this.pop_chromeask  =   {name: 'pop_chromeask',placement: 'bottom', trigger: 'manual',
            content: function(){return $('#popover_chromealert').html();} }

    this.initialized(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options);
    //this.init(type, list, streamUrl, streamName, apiDomain, apiUser, apiPassword,  options);
};



