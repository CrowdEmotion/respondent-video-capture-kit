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
    this.log = function (msg) {
        if (console.log)console.log(msg)
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
}

// TODO video.js implementation

function VjsInterface() {

    this.inheritFrom = PlayerInterface;
    this.inheritFrom();


    this.video_play = function () {
    };

    this.videoEnd = function () {
    };

    this.video_stop = function (cb) {
    };


    this.video_after_close_window = function () {
    };

    this.video_go_fullscreen = function () {
    };

    this.video_end_fullscreen = function () {
    };

    this.on_player_ready = function () {
    };

    this.on_player_play = function () {
    };

    this.on_player_error = function (e) {
    };

    this.on_player_fullscreenchange = function (ev) {
    };

    this.player_dispose = function () {
    };

    this.loadPlayer = function () {
    };


    this.preloadPlayer = function () {
    };


    this._setupPreload = function (callback) {
    };

}


// PLAYER YouTube

function YtInterface() {

    this.inheritFrom = PlayerInterface;
    this.inheritFrom();

    this.video_play = function () {
        this.log('>>STEP video play '+ vrt.media_path);
        if (this.player) {
            this.log("player [YT]: play");

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
        }else{

        }
    };

    this.video_stop = function () {
        this.log('>>STEP player stop');
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

    this.loadPlayer = function (cbSuccess) {
        this.log('>>STEP player load');


        // load player only one time
        if (!this.player) {

            this.player_starts_recorder = false;

            $('#videoDiv').append('<div id="videoDivConvict"></div>');

            var params = { allowScriptAccess: "always", allowFullScreen: true, wmode: this.decideWmode() }; //, bgcolor: '#FFF4D5'
            var atts = { id: "ytPlayer" };
            swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                    "version=3&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playerapiid=player1",
                "videoDivConvict", "640", "400", "11.1", null, null, params, atts);
            if(cbSuccess)cbSuccess();
        }
    };

    this.player_dispose = function () {
        this.log('>>STEP player dispose');
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
    vrt.log("player [YT]: onYouTubePlayerReady");

    vrt.player.player = document.getElementById("ytPlayer");
    vrt.player.player.addEventListener("onStateChange", "onytplayerStateChange");
    vrt.player.player.addEventListener("onError", "onytplayerError");

    vrt.player_is_ready();

};

window.onytplayerStateChange = function (newState) {

    //if(console.log)console.log("player state [YT]: " + state2string(newState));

    // TODO sync recording when buffering

    if (newState == 3 || newState == 1) {
        vrt.startRecording();
    }

    if (newState == 1) {
        this.player_started_playing();
    }

};