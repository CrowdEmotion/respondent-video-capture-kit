
$(document).ready(function () {


    var streamUrlDomain, // This is the Url to stream the content
        streamName, // This is the name of the stream
        streamFileName; // This the file name of the file created,

    var producerSetupCamera, producerSetupConnection, producerStreamDisconnect; // Do not set

    var producer = new WebProducer({
        id: rvckConfiguration.recorderID, // the html object id
        width: 320 * 1.5, // these are sizes of the player on the page
        height: 240 * 1.5, // not related to the stream resolution
        trace: false // would enable debug logs in js console
    });

    window.producer = producer;

    var ceclient = new CEClient();
    var apiUsername, apiPassword;

    window.ceclient = ceclient;

    // Recorder events

    producer.once('ready', function () {

        producerSetupCamera = function (cbSuccess, cbFail) {

            log('The producer is now ready');
            log("These are methods supported by producer flash object", producer.methods);

            // check there is a camera available
            var numCameras = producer.countCameras();
            log("We have " + numCameras + " camera(s) available");
            if (numCameras == 0) return alert('there is no camera availalbe');

            // checking user permissions on camera
            producer.once('camera-unmuted', function () {
                log("Camera is now available");
                producer.setMirroredPreview(true);
                log('Is preview mirrored ? ' + producer.getMirroredPreview());
                producer.setAudioStreamActive(false);
                log('Is audio streaming active ? ' + producer.getAudioStreamActive());

                //setupClient();
                if(cbSuccess) cbSuccess();
            });

            producer.on('camera-muted', function () {
                log("The user has denied access to the camera", 'danger');
            });

            var cameraMuted = producer.isCameraMuted();
            if (cameraMuted) {
                log("The user must approve camera access", 'warning');
            } else {
                log("The camera is available, user already approved");
                if(cbSuccess) cbSuccess(); //activateRecButton();
            }

        };

        producerSetupConnection = function (cbAfterSetup, cbAfterConnect, cbAfterDisconnect, cbAfterSave, cbAfterError) {

            //producer.setCredentials("username", "password"); // if you want to emulate fmle auth
            log('filename ' + streamName);
            var url = 'rtmp://' + streamUrlDomain + ':1935/live'; // "live/" is the RTMP application name, always the same.
            log('url ' + url);
            producer.setUrl(url);
            producer.setStreamName(streamName);
            producer.setStreamWidth(640);
            producer.setStreamHeight(480);

            producer.on('connect', function () {
                setStatusConnection(1);
                log("We are now streaming live on our channel", 'success');
                if(cbAfterConnect) cbAfterConnect();
            });

            producer.on('disconnect', function () {
                setStatusConnection(0);
                log("The producer has been disconnected");
                if(cbAfterDisconnect) cbAfterDisconnect();
            });

            producer.on('error', function (reason) {
                log("ERROR: " + reason);
                if (reason == 'NetConnection.Connect.Failed') {
                    log('No streaming connection aviable', 'danger');
                }
                if(cbAfterError) cbAfterError();
            });

            producer.on('save', function (url) {
                log("The file has been saved to " + url, 'success');
                streamFileName = url;
                //uploadLink();
                if(cbAfterSave) cbAfterSave();
            });

            producer.connect();
            if(cbAfterSetup) cbAfterSetup();
        };

        producerStreamDisconnect = function(){
            producer.disconnect();
        }

    });

    // API CLIENT functions
    var  apiClientSetup = function(cb){
        log('Api login in progress');
        ceclient.init(true, true, rvckConfiguration.apiDomain);
        ceclient.login(apiUsername,apiPassword,
            function(ret){
                if(ret){
                    log('Api login OK','success');
                    if(cb) cb();
                }else{
                    log('Api login FAIL','danger');
                }
            });

    };

    var apiClientUploadLink = function(){
        ceclient.uploadLink(streamFileName,apiClientLogout);
    };

    var apiClientLogout = function(res){
        if(res.responseId){
            log(res);
            log('Uploaded file to api with response id: '+res.responseId,'success');
        }else{
            log('Upload error status: '+res.statusText + ' [' + res.status + ']','warning');
        }
        ceclient.logout();
    };


    // Sequence functions
    var afterSaveConnectData = function(){
        log('afterSaveConnectData');
        log('Api login in progress','info');
        setTimeout(function(){
            //message before login
            apiClientSetup(afterApiClientSetup);
            }, 100);

    }

    var afterApiClientSetup = function(){
        log('afterSetupClient');
        producerSetupCamera(afterProducerSetupCamera);
    }

    var afterProducerSetupCamera = function(){
        log('afterSetupCamera');
        activateRecButton();
    }

    var afterRecStart = function (){
        log('afterRecStart');
        activateStopButton();
    }

    var afterStopRec = function (){
        log('afterStopRec');
        activateRecButton();
        apiClientUploadLink();
    }

    // Display functions

    function activateStopButton() {
        $('#recButton').removeClass('active').addClass('disabled');
        $('#stopButton').removeClass('disabled').addClass('active');
    }

    function activateRecButton() {
        logHide();
        $('#recButton').removeClass('disabled').addClass('active');
        $('#stopButton').removeClass('active').addClass('disabled');
    }

    function setStatusConnection(status) {
        if (status == 1) {
            $('#status').removeClass('label-danger').addClass('label-success').html('Streaming video    ');
            $('#connectButton').removeClass('active').addClass('disabled');
        }
        if (status == 0) {
            $('#status').removeClass('label-success').addClass('label-danger').html('Not streaming');
            $('#connectButton').removeClass('disabled').addClass('active');
        }
    }

    //Log function
    function logHide() {
        //$('#message').removeClass().addClass('invisible').html('');
        $('#message').removeClass().addClass('alert').addClass('alert-info').html(' ');
    }

    function log(msg, status) {
        $('#log').prepend(msg + '<br/>');
        if(console && console.log)console.log(msg);
        if (status) {
            $('#message').removeClass().addClass('alert').addClass('alert-' + status).html(msg);
        }


    }

    // GUI Event functions

    $('#connectButton').click(
        function () {
            streamUrlDomain = $('#domainNameInput').val();
            streamName = $('#streamNameInput').val();
            apiUsername = $('#apiUsernameInput').val();
            apiPassword = $('#apiPasswordInput').val();
            afterSaveConnectData();
        });

    $('#recButton').click(function () {
        log('recording', 'success');
        producerSetupConnection(afterRecStart, null, null, apiClientUploadLink);
    });

    $('#stopButton').click(function () {
        log('stop recording - uploading file', 'success');
        producerStreamDisconnect(afterStopRec);
    });

    //init
    var init = function(){
        log(init);
        if(rvckConfiguration.streamDomain!=null){
            streamUrlDomain = rvckConfiguration.streamDomain;
            $('#domainNameInput').val(streamUrlDomain);
        }
        if(rvckConfiguration.streamName!=null){
            streamName = rvckConfiguration.streamName;
            $('#streamNameInput').val(streamName);
        }
        if(rvckConfiguration.apiUsername!=null){
            apiUsername = rvckConfiguration.apiUsername;
            $('#apiUsernameInput').val(apiUsername);
        }
        if(rvckConfiguration.apiPassword!=null){
            apiPassword = rvckConfiguration.apiPassword;
            $('#apiPasswordInput').val(apiPassword);
        }
    };

    init();



});

