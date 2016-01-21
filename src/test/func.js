ll = function(msg, prepend, append){
    if (window.console && console.log) {
        var d = performance.now();
        prepend ? '': prepend = '';
        console.log('=>'+prepend+': '+msg);
        $('#events').append('<div class="msgwrap"><div class="time">'+d.toFixed(2)+'</div><div class="type">'+prepend+'</div><div class="msg"> '+msg+'</div></div>');
    }
};
clog = function (msg) {
    ll(msg, 'EVENT');
};
dlog = function (msg) {
    ll(msg, 'DESCRIBE');
};
ilog = function (msg) {
    ll(msg, 'IT');
};
tlog = function (msg) {
    ll(msg, '');
};
/*
 TODO test list
 publish
 unpublish
 save
 event
 vrt_event_fatal_error
 vrt_event_create_response
 vrt_event_no_requirement
 vrt_event_browser_old
 vrt_event_recorder_publish
 vrt_event_recorder_unpublish
 vrt_event_producer_camera_blocked
 vrt_event_recorder_html5
 vrt_event_flash_no
 vrt_event_flash_old
 vrt_event_flash_is_present
 vrt_event_flash_version_ok

 vrt_event_preview_loaded: all objects are loaded
 vrt_event_producer_camera_ok: the user camera is ok
 producer_init_camera_ok  the user camera is ok (real=
 vrt_event_api_login_fail: login to api is failed
 vrt_event_producer_camera_muted: webcam is waiting for user permission
 vrt_event_producer_camera_blocked: user block webcam
 vrt_event_start_video_session: the first video stimuli is played and producer is recording
 vrt_event_video_step_completed: one video stimuli is ended and facevideos is uplodead, a responseId is received
 vrt_event_user_next_video: user is ready for next video
 vrt_event_skip_or_end_video: video stimuli reach the end or skipped by user
 vrt_event_video_session_complete: all video stimuli are played
 vrt_event_user_session_complete: user finish his session
 vrt_event_flash_old: the Flash version included is too old (Flash 11.1.0 is required)
 vrt_event_flash_no: there is no Flash included
 vrt_event_producer_no_camera_found: no camera found
 vrt_event_frame_open: use this event to open a frame OR user the openFrame() method
 vrt_event_frame_close: triggere by the closeFrame() method
 vrt_event_create_response: if the option responseAtStart is true, this event will send you the response id before the video play
 vrt_event_browser_old: this error is trigger when the browser is IE 9 or older

 */

/*
sequences
    setting
        html tag
        js object init
        platform check
            no ios
            mo old browser
            if flash
                check flash
    webcam
        have a webcam EVT[]
        webcam allowed EVT[]

 */
window.vrtTest = {
    time:{a:null,b:null,c:null,d:null},
    path:null,
    rid: null,
    haveWebcam:null,
    webcamAllowed:null,
    maxTimeDiffAllowed:300,
    responseID:null,
    type:null,
    videoext: null,
    isMobile: false,
    isDesktop: false,
    connected: null,
    hasPlay: false,
    hasRec: false,
    respondentId:null,
    responseId:[],
    tempdata: null,
    videoToTest: 0,
    isPlayAndPublishDone: false,
    handleIsPlayAndPublish: null,
    isStopAndUnpublishDone: false,
    handleIsStopAndUnpublish: null,
    currentMediaIndex: 0,
    stimuliNumber: null,
    proceedToShow: false
};

var mobilecheck = function() {
    return vrt.isAndroid || !vrt.requirement || vrt.isChromeMobile
};

var setType = function(type){
    if(window.vrtTest.type!=null) return;
    if(!type || type=='html5'){
        window.vrtTest.type='html5';
        window.vrtTest.videoext='webm';
    }else{
        window.vrtTest.type='flash';
        window.vrtTest.videoext='mp4';
    }
    $(vrtTest).trigger('vrttest_event_settype')
};

var vrtOnEvent = function(){

    $(vrt).on('vrt_event_recorder_html5', function () {
        clog('vrt_event_recorder_html5');
        setType('html5')
    });
    /* flash yes */
    $(vrt).on('vrt_event_flash_old', function () {
        clog('vrt_event_flash_old');
        setType('flash');
    });
    $(vrt).on('vrt_event_flash_no', function () {
        clog('vrt_event_flash_no');
        setType('flash');
    });
    $(vrt).on('vrt_event_flash_is_present', function () {
        clog('vrt_event_flash_is_present');
        setType('flash');
    });
    $(vrt).on('vrt_event_flash_version_ok', function () {
        clog('vrt_event_flash_version_ok');
        setType('flash');
    });
    /* flash yes end */
    $(vrt).on('producer_init_camera_ok', function () {
        clog('producer_init_camera_ok');
        window.vrtTest.haveWebcam=true;
        window.vrtTest.webcamAllowed=true;
    });
    $(vrt).on('vrt_event_producer_camera_found', function () {
        clog('vrt_event_producer_camera_found');
        window.vrtTest.haveWebcam=true;
    });
    $(vrt).on('vrt_event_producer_no_camera_found', function () {
        clog('vrt_event_producer_no_camera_found');
        window.vrtTest.haveWebcam=false;
    });
    $(vrt).on('vrt_event_streamname', function(e, data){
        clog('vrt_event_streamname');
        window.vrtTest.path=data.streamname;
    });
    $(vrt).on('producer_init_ok', function () {
        clog('producer_init_ok');
    });
    $(vrt).on('vrt_event_producer_camera_ok', function () {
        clog('vrt_event_producer_camera_ok');
        window.vrtTest.webcamAllowed=true;
    });
    $(vrt).on('vrt_event_producer_camera_muted', function () {
        clog('vrt_event_producer_camera_muted');
        window.vrtTest.webcamAllowed=false;
    });
    $(vrt).on('vrt_event_producer_camera_blocked', function () {
        clog('vrt_event_producer_camera_blocked');
        window.vrtTest.webcamAllowed=false;
    });
    $(vrt).on('vrtstep_connect', function () {
        clog('vrtstep_connect');
        window.vrtTest.connected=true;
    });
    $(vrt).on('vrt_event_respondent_created', function () {
        clog('vrt_event_respondent_created');
        tlog(vrt.respondentId);
        vrtTest.respondentId = vrt.respondentId;
    });
    $(vrt).on('vrtevent_player_ts', function (evt, data) {
        clog('vrtevent_player_ts_'+data.status);
        if(data.status==11){
            $(vrtTest).trigger('vrttest_player_play')
        }
    });
    $(vrt).on('vrt_event_video_step_completed', function (evt, data) {
        clog('vrt_event_video_step_completed');
        if(data.responseId){
            tlog(data.responseId);
            vrtTest.responseId.push(data.responseId);
            tlog(window.vrt.options.customData);
        }
    });
    $(vrt).on('vrt_event_video_session_proceedToShow', function () {
        clog('vrt_event_video_session_proceedToShow');
    });
    $(vrt).on('vrt_event_start_video_session', function () {
        clog('vrt_event_start_video_session');
    });
    $(vrt).on('vrt_event_user_next_video', function () {
        clog('vrt_event_user_next_video');
    });
    $(vrtTest).on('vrttest_player_play', function (e, data) {
        clog('vrttest_player_play');
        vrtTest.time.a = performance.now().toFixed(0);
        isPlayAndPublish()
    });
    $(vrt).on('vrt_event_recorder_publish', function (e, data) {
        clog('vrt_event_recorder_publish');
        vrtTest.time.b = performance.now().toFixed(0);
        isPlayAndPublish()
    });
    $(window.vrt).on('vrt_event_stimuli_end', function (e, data) {
        clog('vrt_event_stimuli_end');
        vrtTest.time.c = performance.now().toFixed(0);
        isStopAndUnpublish();
    });
    $(window.vrt).on('vrt_event_recorder_unpublish', function (e, data) {
        clog('vrt_event_recorder_unpublish');
        vrtTest.time.d = performance.now().toFixed(0);
        isStopAndUnpublish();
    });
};
function isPlayAndPublish(){
    if(vrtTest.time.a && vrtTest.time.b && !vrtTest.isPlayAndPublishDone){
        vrtTest.isPlayAndPublishDone = true;
        tlog('vrttest_playandpublish');
        $(vrtTest).trigger('vrttest_playandpublish')
    }
    vrtTest.handleIsPlayAndPublish = setTimeout(function(){
        if(!vrtTest.isPlayAndPublishDone){
            vrtTest.isPlayAndPublishDone = true;
            tlog('vrttest_playandpublish TO');
            $(vrtTest).trigger('vrttest_playandpublish')
        }
    },(vrtTest.maxTimeDiffAllowed*2));
};
function isStopAndUnpublish(){
    if(vrtTest.time.c && vrtTest.time.d && !vrtTest.isStopAndUnpublishDone){
        vrtTest.isStopAndUnpublishDone = true;
        tlog('vrttest_stopandunpublish');
        $(vrtTest).trigger('vrttest_stopandunpublish')
    }
    vrtTest.handleIsStopAndUnpublish = setTimeout(function(){
        if(!vrtTest.isStopAndUnpublishDone){
            vrtTest.isStopAndUnpublishDone = true;
            tlog('vrttest_stopandunpublish TO');
            $(vrtTest).trigger('vrttest_stopandunpublish')
        }
    },(vrtTest.maxTimeDiffAllowed*2));
};
function cleanUpStart() {
    vrtTest.time.a = 0;
    vrtTest.time.b = 0;
    vrtTest.isPlayAndPublishDone = false;
    if (vrtTest.handleIsPlayAndPublish) clearTimeout(vrtTest.handleIsPlayAndPublish);
    vrtTest.proceedToShow = false;
}
function cleanUpEnd(){
    vrtTest.time.c = 0;
    vrtTest.time.d = 0;
    vrtTest.isStopAndUnpublishDone = false;
    if(vrtTest.handleIsStopAndUnpublish) clearTimeout(vrtTest.handleIsStopAndUnpublish);
}
function isVideoListComplete(videoList) {
    if (videoList instanceof Array) {
        if (videoList.length <= 0) {
            return false;
        }
        for (var i = 0; i < videoList.length; i++) {
            if (videoList[i] instanceof Object) {
                if (!videoList[i].id) return false;
                if (!videoList[i].path) return false;
                if (!videoList[i].name) return false;
            } else return false;
        }
        return true;
    } else return false;
};

function alertMessage(msg){
    if(console.log)console.log('TEST MSG');
    if(console.log)console.log(msg);
};

function getFile(name,type){
    //http://mediabox.crowdemotion.co.uk:8082/contents/test_0__1535005240.json
    var ret =   fileExists("http://"+vrt.producerStreamUrl+":8082/contents/"+name+'.'+type);


    if(ret.status == 200){
        if(ret.response.length>500 && type == 'json'){
            return true;
        }else if(ret.response.length>3000 && type == 'mp4'){
            return true;
        }else if(ret.response.length>1){
            return true;
        }else return false;
    }else{
        return false
    }
};

function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        console.log('======fileExists======');
        console.log(req);

        return req;//req.status==200;
    } else {
        return false;
    }
};
var stopTest = function(msg){
    var m = msg ? msg+' ' :  '';
    throw new Error(m+"Aborting test.");
};
this.gup = function( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
};

window.gup = gup;