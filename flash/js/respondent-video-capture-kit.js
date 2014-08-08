$(document).ready(function () {

    var streamUrlDomain, // This is the Url to stream the content
        streamName, // This is the name of the stream
        streamFileName; // This the file name of the file created,

    var setupCamera, setupConnection; // Do not set

    var producer = new WebProducer({
        id: 'producer', // the html object id
        width: 320 * 2, // these are sizes of the player on the page
        height: 240 * 2, // not related to the stream resolution
        trace: false // would enable debug logs in js console
    });

    window.producer = producer;

    // Recorder events

    producer.once('ready', function () {

        setupCamera = function () {

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
                alertHide();
                canRecStart();
            });

            producer.on('camera-muted', function () {
                log("The user has denied access to the camera", 'danger');
            });

            var cameraMuted = producer.isCameraMuted();
            if (cameraMuted) {
                log("The user must approve camera access", 'warning');
            } else {
                log("The camera is available, user already approved");
                alertHide();
                canRecStart();
            }

        }

        setupConnection = function () {

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
            });

            producer.on('disconnect', function () {
                setStatusConnection(0);
                log("The producer has been disconnected", 'warning');
            });

            producer.on('error', function (reason) {
                log("ERROR: " + reason);
                if (reason == 'NetConnection.Connect.Failed') {
                    log('No streaming connection aviable', 'danger');
                }
            });

            producer.on('save', function (url) {
                log("The file has been saved to " + url, 'success');
                streamFileName = url;
                setupClient();
            });

            producer.connect();
            canRecStop();
        }

    });

    // API CLIENT functions

    var ceclient = new CEClient();
    var apiUsername, apiPassword;

    var execLogout = function(res){
        if(res.responseId){
            log(res);
            log('Uploaded file to api with response id: '+res.responseId,'success');
        }else{
            log('Upload error status: '+res.statusText + ' [' + res.status + ']','warning');
        }
        canRecStart();
        ceclient.logout();
    };

    var setupClient = function(){
        log('Api login in progress','info');
        ceclient.init(true, true);
        ceclient.login(apiUsername,apiPassword,
            function(ret){
                if(ret){
                    log('Api login OK','success');
                    ceclient.uploadLink(streamFileName,execLogout);
                }else{
                    log('Api login FAIL','danger');
                }
            });

    }

    // Event functions

    $('#connectButton').click(
        function () {
            streamUrlDomain = $('#domainNameInput').val();
            streamName = $('#streamNameInput').val();
            apiUsername = $('#apiUsernameInput').val();
            apiPassword = $('#apiPasswordInput').val();
            setupCamera();
        });

    $('#stopButton').click(function () {
        log('stop recording', 'success');
        producer.disconnect();
    });

    $('#recButton').click(function () {
        log('recording', 'success');
        setupConnection();
    });

    // Display functions

    function canRecStop() {
        $('#recButton').removeClass('active').addClass('disabled');
        $('#stopButton').removeClass('disabled').addClass('active');
    }

    function canRecStart() {
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
    function alertHide() {
        $('#message').removeClass().addClass('invisible').html('');
    }

    function log(msg, status) {
        $('#log').prepend(msg + '<br/>');
        if(console && console.log)console.log(msg)
        if (status) {
            $('#message').removeClass().addClass('alert').addClass('alert-' + status).html(msg);
        }
    }

    //init
    var init = function(){
        if(rvckConfiguration.streamDomain!=null){
            streamUrlDomain = rvckConfiguration.streamDomain;
            $('#domainNameInput').val(streamUrlDomain);
        }
        if(rvckConfiguration.streamName!=null){
            streamName = rvckConfiguration.streamName
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
    }
    init();

});

