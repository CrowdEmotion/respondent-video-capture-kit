//PLAYER vj
function PlayerInterface() {
    this.player = null;
    this.player_starts_recorder = false;
    this.timeout_alert = 0,
    this.videos_preload = null,
    this.media_path_pre = 'http://none',
    this.test_media_path = this.media_path_pre + 'throughput_test.mp4', // TODO: HTTPS support, document.location.protocol
    this.enough_bandwidth = false,
    this.videos_preload = null,
    this.hasFullscreen = false,
    this.sources = '',
    this.swf = '',
    this.width = 640;
    this.height = 400;

    this.log = function (msg) {
        if (console.log) {
            console.log('player log: ');
            console.log(msg);
        }
    },
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
            ];
            if (console && console.log) console.log('TIME ' + msg +': '+datevalues[4]+' '+datevalues[5]+' '+datevalues[6]);
    },
    this.decideWmode = function() {
        return this.checkChromeMinVer("MacIntel", 17) ? "direct" : "opaque";
    },
    this.checkChromeMinVer = function(plat, ver) {
        var bver;

        if(window.navigator.appVersion.indexOf('Chrome') >= 0 && window.navigator.platform.indexOf(plat) >= 0)
            return (bver=/Chrome\/([0-9A-z]+)/.exec(window.navigator.appVersion)) ? bver[1] >= ver : false;
        else
            return true;
    }
    /*
    CE  RECORDER        YOUTUBE                         VIDEJS
    10                   case -1:return 'unstarted';
    11                   case 1: return 'playing';
    12                   case 0: return 'ended';
    13                   case 2: return 'paused';
    14                   case 3: return 'buffering';
    15                   case 5: return 'video cued';
    16                   various
    17                   idle
    20                   publish
    21                   unpublish
    */
    this.statusMap = function(status, type){
        if(status >= 20) return status;
        if(type = 'yt'){
            if(status==-1){
                return 10;
            }
            if(status==0){
                return 12;
            }
            if(status==1){
                return 11;
            }
            if(status==2){
                return 13;
            }
            if(status==3){
                return 14;
            }
            if(status==5){
                return 15;
            }
        }
    }
}

// TODO video.js implementation

function VjsInterface() {

    this.inheritFrom = PlayerInterface;
    this.inheritFrom();


    this.video_play = function (cb) {

        if (this.player) {
            this.log("player [VJSnew]: play");

            /*
            if(fullscreen_needed && $.browser.msie && $.browser.version >= 9) {
                var w = $(window).innerWidth()-20, h = $(window).innerHeight();
                $('#videoDiv').parent().parent().css('left','0px').css('top','0px').width(w+'px').height(h+'px');
            }
            */

            //this.log( media_path_pre + '  ' + media_path );
            if (typeof (this.player) !== 'undefined' && this.player.src) {
                this.player.src([{ type: "video/mp4", src: vrt.media_path }]);
            }

            this.log( 'video_play' );
            this.logTime('video_play');
            // this.player.currentTime(0);
            //vrt.logChrono(1,'player', true);
            this.player.play();
            if(cb)cb();
        }else{

        }

    };

    this.videoEnd = function () {
        this.log('ended');
    };

    this.video_stop = function (cb) {
        if (this.player) {
            this.log("player [VJSnew]: stop");
            this.logTime('video_stop');
            this.player.src();
            try{
                if(!this.player.ended() && !this.player.paused()){
                    this.player.pause();
                }else{

                }
            }catch(e){
                this.log(">> ERROR player [VJSnew]: stop")
                this.log(e);
            }
            //vjsplayer.ended();
            //producer hideVideoBox();
            //vjsplayer.currentTime(vjsplayer.duration());  // 1000000 ?
            //vjsplayer.src('');
            if(cb)cb();
        }
    };


    this.video_after_close_window = function () {
    };

    this.video_go_fullscreen = function () {
        this.player.requestFullScreen();
    };

    this.video_end_fullscreen = function () {
        this.player.cancelFullScreen();
    };

    this.on_player_ready = function (el, cb) {
        this.player = el;


        this.player.on("play", vrt.player.on_player_play); // play loadeddata
        this.player.on("firstplay", vrt.player.on_player_firstplay); // play loadeddata
        this.player.on("error", vrt.player.on_player_error);
        this.player.on("fullscreenchange", vrt.player.on_player_fullscreenchange);
        this.player.on('pause', function() {
            vrt.log('vjsplayer pause');
            //vrt.player.player.src('');
        });
        this.player.on('loadedalldata',     vrt.player.loadedalldata);
        this.player.on('loadeddata',        vrt.player.loadeddata);
        this.player.on('loadedmetadata', function() {   vrt.log("EVT loadedmetadata")});
        this.player.on('loadstart',      function() {   vrt.log("EVT loadstart")});
        this.player.on('progress',       function() {   vrt.log("EVT progress")});
        this.player.on('seeked',         function() {   vrt.log("EVT seeked")});
        this.player.on('waiting',        function() {   vrt.log("EVT waiting")});

        $(vrt).trigger('vrtstep_loaded');
    };

    this.loadeddata = false;

    this.on_player_play = function (cb) {
        vrt.log("EVT on_player_play");
        vrt.logTime('vjs on_player_play');
        //TODO CHECK THIS, double event
       // $(vrt).trigger('vrtstep_play',{caller:'on_player_play'});
    };

    this.on_player_firstplay = function (cb) {
        vrt.log("EVT on_player_firstplay");
        vrt.logTime('vjs on_player_firstplay');
    };

    this.loadeddata = function (cb) {
        vrt.log("EVT loadeddata");
        vrt.logTime('vjs loadeddata');
        $(vrt).trigger('vrtstep_play',{caller:'loadeddata'});
        this.loadeddata = true;
    };

    this.loadedalldata = function (cb) {
        vrt.log("EVT loadedalldata");
        vrt.logTime('vjs loadedalldata');
        this.loadeddata = true;
    };

    this.on_player_error = function (e) {
        vrt.log('>>'+e);
        vrt.logTime('on_player_error')
    };

    this.on_player_fullscreenchange = function (ev) {
        vrt.logTime('on_player_fullscreenchange')
        this.log("player [VJSnew]: on_player_fullscreenchange");
        this._player_is_fullscreen = !this._player_is_fullscreen;
    };

    this.player_dispose = function () {
        this.player.dispose();
        vrt.logTime('player_dispose');
    };

    this.loadPlayer = function (options) {
        vrt.logTime('loadPlayer');
        //TODO if(((videojs.options.techOrder && videojs.options.techOrder[0] == 'flash')) open_video_window();  // HACK else the Flash player is not instantiated

        // load player only first time
        if(!this.player) {

            var p_w = this.width;
            var p_h = this.height;
            if(options && options.width) p_w =this.width = options.width;
            if(options && options.height) p_h =this.height = options.height;

            this.player_starts_recorder = false;

            var videoObj = $('#videoDiv').prepend('<video id="vjsPlayer" class="video-js vjs-default-skin" width="'+p_w+'" height="'+p_h+'" poster=""> </video>').children();

            // { preload: 'auto' };
            videojs(videoObj[0], { "controls": false, "autoplay": false, "preload": "none" }, vjs_on_player_ready);
            //$(vrt).trigger('vrtstep_loaded');
            if(options.centered && options.centered===true)  $('#videoDiv').vrtCenter();
        }else{
            $(vrt).trigger('vrtstep_loaded');
        }
    };

    this.timeout_alert = 0,
    this.videos_preload = null,
    this.test_media_path = this.media_path_pre + 'throughput_test.mp4', // TODO: HTTPS support, document.location.protocol
    this.enough_bandwidth = false;
    this.videos_preload = null;

    this.watchdog_start = function() {
        clearTimeout(this.timeout_alert);
        this.timeout_alert = setTimeout(function(){ call_callback(false); }, 10000);
    };

    this.call_callback = function(success) {
        this.videos_preload.off();
        clearTimeout(this.timeout_alert);
        try {
            this.videos_preload = this.videos_preload[0];
            this.videos_preload.pause();
            this.videos_preload.currentTime = 1000000;
            this.videos_preload.src = '';
        } catch (e) {}
        this.videos_preload = null;
        callback(success || this.enough_bandwidth);
    };

    this.preloadPlayer = function () {
        this.log('preloading start');

        // BUG: in IE VIDEO either doesn't work or generates unwanted calls that logs out the user
       //TODO check if(vrt.videoList.length < 1 || (vrt.checkIeVersion(10) ||  (!vrt.checkSafariMinVer('Win', 6)))) return null;
        return this.setupPreLoadPlayer()

    };

    this.setupPreLoadPlayer = function (callback) {


        this.videos_preload = $('<video preload="auto" />');

        // TODO check what loadeddata means https://developer.mozilla.org/en-US/docs/Mozilla_event_reference/loadeddata
        /*
       // TODO 1 videos preload
        this.videos_preload
            .on('loadstart', function(ev){
                //this.log(('loadstart ');
                this.watchdog_start();
            })
            .on('progress', function(ev){
                this.watchdog_start();

                var bufferedPercent = this.videos_preload[0].duration ? this.videos_preload[0].buffered.end(0) / this.videos_preload[0].duration : 0;
                this.log('progress ['+ bufferedPercent +']');

                //if(bufferedPercent == 1)
                //  call_callback(true);
            })
            .on('loadeddata', function(ev){
                //this.log(('loadeddata');
                //$(vrt).trigger('vrtstep_play');
            })
            .on('canplay', function(ev){
                //this.log(('canplay');
            })
            .on('canplaythrough', function(ev){
                //this.log(('canplaythrough');
                this.enough_bandwidth = true;
                this.call_callback(true);
            })
            .on('waiting', function(ev){
                //this.log(('waiting');
            })
            .on('error', function(ev){
                //this.log(('preloading error');
                this.call_callback(false);
            });

        // TODO 2 test preload
        // HACK IE 9 does NOT support adding source tags dynamically
        if($.browser.msie)
            this.videos_preload.attr('src', test_media_path);
        else {
            var sources = '';
            if(this.videos_preload[0].canPlayType('video/mp4')) sources += '<source src="'+ this.test_media_path +'" type="video/mp4">';
            else if(this.videos_preload[0].canPlayType('video/webm')) sources += '<source src="'+ this.test_media_path.replace('.mp4', '.webm') +'" type="video/webm">';
            this.videos_preload.append(sources);
        }

        //$('body').append(videos_preload);
        this.videos_preload[0].load();
*/
        this.log('preloading end');
    };


}

function vjs_on_player_ready(){
    vrt.player.on_player_ready(this);
}

// PLAYER YouTube

function YtInterface() {

    this.inheritFrom = PlayerInterface;
    this.inheritFrom();

    this.video_play = function (cb) {
        this.log('>>STEP video play '+ vrt.media_path);
        vrt.logTime('YtInterface video_play');
        if (this.player) {
            this.log("player [YT]: play" + vrt.media_path);

            // TODO fullscreen

            /*
            if (this.fullscreen_needed) {
                // enlarge video
                if (this.hasFullscreen) {
                    // as the screen
                    $('#ytPlayer').width(window.screen.width + 'px').height(window.screen.height + 'px');
                } else {
                    // as the window
                    // HACK highly dependent on dialog() internal object hierarchy implementation
                    var w = $(window).innerWidth() - 20, h = $(window).innerHeight();
                    $('#ytPlayer').parent().parent().parent().css('left', '0px').css('top', '0px').width(w + 'px').height(h + 'px');
                    $('#ytPlayer').width(w - 20 + 'px').height(h - 60 + 'px');
                }
            }
             */

            this.player.loadVideoById(vrt.media_path, 0, 'small'); // TODO: dynamic (was 'medium')
            if(cb)cb();
        }else{

        }
    };

    this.video_stop = function () {
        this.log('>>STEP player stop');
        vrt.logTime('YtInterface video_stop');
        if (this.player) {
            this.log("player [YT]: stop");
            this.player.stopVideo();

            // TODO remove object to uniform lifetime of Flash object between browsers
            //swfobject.removeSWF('ytPlayer');
            //this.player = null;
        }
    };

    this.video_after_close_window = function () {
        this.is_player_ready = false;
    };

    this.video_go_fullscreen = function () {

        // HACK YT player doesn't support fullscreen

        var el = document.getElementById('videoDiv');
        if (el.requestFullScreen) {
            el.requestFullScreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        } else {
            // very old browsers
            this.hasFullscreen = false;
        }

        this._player_is_fullscreen = true;
    };

    this.video_end_fullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        this._player_is_fullscreen = false;
    };

    /*
     unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5):

     Player's new state: -1
     Player's new state: 5
     Player's new state: -1
     Player's new state: -1
     Player's new state: 3
     Player's new state: 1
     */
    this.state2string = function (state) {
        switch (state) {
            case -1:
                return 'unstarted';
                break;
            case 0:
                return 'ended';
                break;
            case 1:
                return 'playing';
                break;
            case 2:
                return 'paused';
                break;
            case 3:
                return 'buffering';
                break;
            case 5:
                return 'video cued';
                break;
            default:
                return 'unknown [' + state + ']';
                break;
        }
    };



    this.onytplayerError = function (newState) {
        this.log("player error [YT]: " + state2string(newState));
        this.alertAndRestart('YT');
    };

    this.loadPlayer = function (options, cbSuccess) {
        this.log('>>STEP player load');
        vrt.logTime('YtInterface loadPlayer');

        // load player only one time
        if (!this.player) {

            this.player_starts_recorder = false;

            var p_w = this.width;
            var p_h = this.height;
            if(options && options.width) p_w =this.width = options.width;
            if(options && options.height) p_h =this.height = options.height;

            $('#videoDiv').append('<div id="videoDivConvict"></div>');

            var params = { allowScriptAccess: "always", allowFullScreen: true, wmode: this.decideWmode() }; //, bgcolor: '#FFF4D5'
            var atts = { id: "ytPlayer" };
            swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                    "version=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playerapiid=player1",
                "videoDivConvict", p_w, p_h, "11.1", null, null, params, atts);
            if(options.centered && options.centered===true)  $('#ytPlayer').vrtCenter();

            if(cbSuccess)cbSuccess();
        }else{
            $(vrt).trigger('vrtstep_loaded');
        }
    };

    this.player_dispose = function () {
        this.log('>>STEP player dispose');
        vrt.logTime('YtInterface player_dispose');
        swfobject.removeSWF("ytPlayer");
        $('#videoDiv').remove();  // also exits from fullscreen in FF
    };

    this.preloadPlayer = function () {
        this.log('>>STEP player pre-load');
    };
}

var playerInterface = new PlayerInterface();
var vjsInterface = new VjsInterface();
var ytInterface = new YtInterface();
window.playerInterface = playerInterface;
window.vjsInterface = vjsInterface;
window.ytInterface = ytInterface;


window.onYouTubePlayerReady =function() {
    vrt.logTime('onYouTubePlayerReady');
    vrt.log("player [YT]: onYouTubePlayerReady");

    vrt.player.player = document.getElementById("ytPlayer");
    vrt.player.player.addEventListener("onStateChange", "onytplayerStateChange");
    vrt.player.player.addEventListener("onError", "onytplayerError");

    $(vrt).trigger('vrtstep_loaded');
};

window.onytplayerStateChange = function (newState) {
    vrt.logTime('onytplayerStateChange '+newState);

    // TODO sync recording when buffering

    $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(newState)});

    $(vrt).trigger('vrtstep_playerStateChange', [{state: newState, time:vrt.logTime('YT')}])


    if (newState == 3) {
        $(vrt).trigger('vrtstep_play', {caller:'onytplayerStateChange3'})
    }

    if (newState == 1) {
        $(vrt).trigger('vrtstep_play', {caller:'onytplayerStateChange1'})
    }




};