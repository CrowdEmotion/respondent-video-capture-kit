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
    this.hasStarted = false;
    this.hasStopped = false;
    this._player_is_fullscreen = false;

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
    CE  RECORDER        YOUTUBE                         VIDEOJS
    10                   case -1: 'unstarted';
    11                   case 1:  'playing';            playing
    12                   case 0:  'ended';              ended
    13                   case 2:  'paused';             paused
    14                   case 3:  'buffering';          buffering
    15                   case 5:  'video cued'          ---
    16                   various                        ---
    17                   idle                           ---
    19                   ---                            error
    20   publish         ---                            ---
    21   unpublish       ---                            ---
    */
    this.statusMap = function(status, type){
        var r = -1;
        if(status >= 20) r =  status; //recorder
        if(type == 'yt'){
            if(status==-1){ r = 10; }
            if(status==0) { r = 12; }
            if(status==1) { r = 11; }
            if(status==2){ r = 13; }
            if(status==3){ r = 14; }
            if(status==5){ r = 15; }
        }
        if(type == 'videojs'){
            if(status=='playing'){ r = 11; }
            if(status=='buffering'){ r = 14; }
            if(status=='error'){ r = 19; }
            if(status=='ended'){ r = 12; }
            if(status=='paused'){ r = 13; }
        }
        //console.log('statusMap: ' + status + ' to ' + r);
        return r;
    },
    this.blockRClick= function(id){

        var myVideo = document.getElementById(id);
        if (myVideo.addEventListener) {
            myVideo.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            }, false);
        } else {
            myVideo.attachEvent('oncontextmenu', function() {
                window.event.returnValue = false;
            });
        }


        var object = $('#'+id+' object');
        if(object){
        //    object.attr('menu',false);
        //    object.append('<param menu="false" />');
        }


    },
    this.on_player_fullscreenchange = function (ev) {
        vrt.logTime('on_player_fullscreenchange');
        vrt.log("player [VJSnew]: on_player_fullscreenchange");
        vrt.player._player_is_fullscreen = !vrt.player._player_is_fullscreen;
    }
}

// TODO video.js implementation

function VjsInterface() {

    this.inheritFrom = PlayerInterface;
    this.inheritFrom();
    this.isloadeddata = false;


    this.video_play = function (cb) {

        if (this.player) {
            this.log("player [VJSnew]: play");

            //this.log( media_path_pre + '  ' + media_path );
            if (typeof (this.player) !== 'undefined' && this.player.src) {
                var source = vrt.media_path;
                if(source.slice(-3)=='flv') {
                    this.player.src([{type: "video/flv", src: vrt.media_path}]);
                }else {
                    this.player.src([{type: "video/mp4", src: vrt.media_path}]);
                }
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
        this.log('video end');
    };

    this.video_stop = function (cb) {
        if (this.player) {
            this.log("player [VJSnew]: stop");
            this.logTime('video_stop');
            this.player.src();
            this.isloadeddata = false;
            try{
                if(this.player.techName == 'Html5'){
                    this.player.pause();
                    //this.player.currentTime(this.player.duration());
                    //this.player.ended();
                }else if(!this.player.ended() && !this.player.paused()){
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

        }
        if(cb)cb();
    };


    this.video_after_close_window = function () {
    };

    this.video_go_fullscreen = function () {
        if(this.player){
            if(vrt.msieversion()==11 || vrt.checkSafari() ){
                this.player.requestFullwindow();
            }else if(this.player.requestFullscreen){
                this.player.requestFullscreen();
            }
        };
    };

    this.video_end_fullscreen = function () {
        if(this.player.exitFullscreen){
            this.player.exitFullscreen()
        }else{
            this.player.cancelFullScreen();
        }

    };

    this.on_player_ready = function (el, cb) {
        this.player = el;
        this.isloadeddata = false;

//        var myVideo = document.getElementById("myVideo");
        vrt.player.blockRClick('videoDiv');

        this.player.on("play",              vrt.player.on_player_play); // play loadeddata
        this.player.on("firstplay",         vrt.player.on_player_firstplay); // play loadeddata
        this.player.on("error",             vrt.player.on_player_error);
        this.player.on("fullscreenchange",  vrt.player.on_player_fullscreenchange);
        this.player.on('pause', function() {
            vrt.log('EVT YSP pause');
            $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap('paused','videojs')});
        });
        this.player.on('ended', function() {
            vrt.log('EVT YSP ended');
            $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap('ended','videojs')});
            vrt.player.on_player_end();
        });
        this.player.on('loadedalldata',  vrt.player.loadedalldata );
        this.player.on('loadeddata',     vrt.player.loadeddata );
        this.player.on('loadedmetadata', vrt.player.loadedmetadata );
        this.player.on('loadstart',      function() {   vrt.log("EVT YSP loadstart")});
        this.player.on('progress',       function() {   vrt.log("EVT YSP progress")});
        this.player.on('seeked',         function() {   vrt.log("EVT YSP seeked")});
        this.player.on('waiting',        function() {
            $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap('buffering','videojs')});
            vrt.log("EVT ysp waiting")
        });

        $(vrt).trigger('vrtstep_loaded');

        vrt.player_is_ready();
    };

    this.on_player_end = function (cb) {
        $(vrt).trigger('vrt_event_stimuli_end');
        if(!vrt.timedOverPlayToEnd){
            vrt.skip_video();
        }
    };

    this.on_player_play = function (cb) {
        vrt.log("EVT YSP  on_player_play");
        //TODO CHECK THIS, double event
       // $(vrt).trigger('vrtstep_play',{caller:'on_player_play'});
    };

    this.on_player_firstplay = function (cb) {
        vrt.log("EVT YSP on_player_firstplay");
    };

    this.loadeddata = function (cb) {
        vrt.log("EVT YSP loadeddata");
        if(!vrt.player.isloadeddata) {
            vrt.player.isloadeddata = true;
            $(vrt).trigger('vrtevent_player_ts', {status: vrt.player.statusMap('playing', 'videojs')});
            $(vrt).trigger('vrtstep_play', {caller: 'loadedalldata'});
        }
    };

    this.loadedalldata = function (cb) {
        vrt.log("EVT YSP loadedalldata");
        if(!vrt.player.isloadeddatas && this.techName!="Html5") {
            vrt.player.isloadeddata = true;
            $(vrt).trigger('vrtevent_player_ts', {status: vrt.player.statusMap('playing', 'videojs')});
            $(vrt).trigger('vrtstep_play', {caller: 'loadedalldata'});
        }
    };

    this.loadedmetadata = function (cb) {
        vrt.log("EVT YSP loadedmetadata");
        /*
        if(this.isloadeddata==false) {
            $(vrt).trigger('vrtevent_player_ts', {status: vrt.player.statusMap('playing', 'videojs')});
            $(vrt).trigger('vrtstep_play', {caller: 'loadedmetadata'});
            vrt.player.isloadeddata = true;
        }
        */
    };

    this.on_player_error = function (e) {
        vrt.log("EVT YSP loadedalldata "+e);
        $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap('error','videojs')});
        $(window.vrt).trigger('vrt_event_error', {component:'player',error:'player error',type:'blocking'});
    };


    this.player_dispose = function () {
        this.player.dispose();
        vrt.logTime('player_dispose');
    };

    this.getCurrentTime = function(){
        return vrt.player.player.currentTime();
    }

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
            videojs(videoObj[0], { "controls": false, "autoplay": false, "preload": "none", menu: false}, vjs_on_player_ready);
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
            if (vrt.videoFullscreen) {
                // enlarge video
                if (vrt.player.hasFullscreen) {
                    // as the screen
                    $('#ytPlayer').width(window.screen.width + 'px').height(window.screen.height + 'px');
                } else {
                    // as the window
                    // HACK highly dependent on dialog() internal object hierarchy implementation
                    var w = $(window).innerWidth() - 20, h = $(window).innerHeight();
                    $('#ytPlayer body').css('left', '0px').css('top', '0px').width(w + 'px').height(h + 'px');
                    $('#ytPlayer').width(w - 20 + 'px').height(h - 60 + 'px');
                }
            }
             */

            this.player.loadVideoById(vrt.media_path, 0, 'small'); // TODO: dynamic (was 'medium')
            if(cb)cb();
        }else{

        }
    };

    this.video_stop = function (cb) {
        this.log('>>STEP player stop');
        vrt.logTime('YtInterface video_stop');

        if (this.player) {
            this.log("player [YT]: stop");
            this.player.stopVideo();

            // TODO remove object to uniform lifetime of Flash object between browsers
            //swfobject.removeSWF('ytPlayer');
            //this.player = null;
        }
        if(cb)cb();
    };

    this.video_after_close_window = function () {
        this.is_player_ready = false;
    };

    this.video_go_fullscreen = function () {

        return '';
        // HACK YT player doesn't support fullscreen

        var el = document.getElementById('videoDiv');
        if (el.requestFullScreen) {
            el.requestFullScreen();
        } else if(el.requestFullscreen){
            el.requestFullscreen();
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

        return '';

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

    this.getCurrentTime = function(){
        if(vrt.player.player) {
            return vrt.player.player.getCurrentTime();
        }else{
            return 0;
        }
    };

    this.onytplayerError = function (newState) {
        this.log("player error [YT]: " +newState);
        $(window.vrt).trigger('vrt_event_error', {component:'player',error:'player error'+ newState,type:'blocking'});
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

            var params = { allowScriptAccess: "always", allowFullScreen: true, wmode: this.decideWmode(), menu: false }; //, bgcolor: '#FFF4D5'
            var atts = { id: "ytPlayer" };
            swfobject.embedSWF("https://www.youtube.com/apiplayer?" +
                    "version=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playerapiid=player1",
                "videoDivConvict", p_w, p_h, "11.1", null, null, params, atts);
            if(options.centered && options.centered===true)  $('#ytPlayer').vrtCenter();

            vrt.player.blockRClick('ytPlayer');

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

    // vrt.player_is_ready();
    vrt.player.blockRClick('ytPlayer');

    $(vrt).trigger('vrtstep_loaded');
};

window.onytplayerError = function (newState) {
    $(window.vrt).trigger('vrt_event_error', {component:'player',error:'player error'+ newState,type:'blocking'});
};

window.onytplayerStateChange = function (newState) {
    vrt.logTime('onytplayerStateChange '+newState);

    // TODO sync recording when buffering

    $(vrt).trigger('vrtevent_player_ts', {status:vrt.player.statusMap(newState,'yt')});

    $(vrt).trigger('vrtstep_playerStateChange', [{state: newState, time:vrt.logTime('YT')}])


    if (newState == 3) {
        $(vrt).trigger('vrtstep_play', {caller:'onytplayerStateChange3'})
    }

    if (newState == 1) {
        $(vrt).trigger('vrtstep_play', {caller:'onytplayerStateChange1'})
    }
    if (newState == 0){
        $(vrt).trigger('vrt_event_stimuli_end');
        if(!vrt.timedOverPlayToEnd){
            vrt.skip_video();
        }
    }



};
