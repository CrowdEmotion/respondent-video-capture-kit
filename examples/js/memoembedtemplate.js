/* MeMo Embed Template is a demo, which purpose is create a small code base
 * to implement MeMo Emebed in a web page/application.
 * Please read developer documentation at crowdemotion.co.uk.
 * After complete code setup and setting, edit you changes inside me
 */

var MEHelper = {
    /**
     * a simple console.log wrapper function
     * @returns {string} html markup
     */
    alertMessage: function (msg) {
        if (console.log) console.log(msg);
    },
    randomInt: function(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
var meHelper = MEHelper;
window.meHelper = meHelper;

/**
 * MemoEmbedTemplate is a js wrapper for MeMo Embed
 */
var MemoEmbedTemplate = {
    vrt: null,
    demoOptions: null,
    /**
     * default options for demo\template
     */
    demoDefaultOptions:  {
        targetId: 'memoEmbed', //string :tag wrapper id
        buttons: true,         //true|false: create demo markup buttons
        buttonsSkipTime: 5     //int: seconds before skip button appear, 0 will hide skip button
    },
    vrtOptions: null,
    /**
     * default options for MeMo Embed
     */
    defaultOptions: {
        researchToken: null,    //token tied to project
        appToken: null,         //user token
        streamName: 'me_',
        apiSandbox: true,       //true|false: if set to true, video will not analyzed
        debug: false,
        respondentCustomData: {user_video_behavior: 'delete_video'}, //save this pair key:value into API respondent metadata
        playerCentered: false, //true|false: video player is centered in the page
        recorderCentered: false, //true|false: recorder preview is centered in the page
        playerHorizontallyCentered: false, //true|false: video player is horizontally centered in parent element
        recorderHorizontallyCentered: false,   //true|false: recorder preview is horizontally centered in parent element
        fullscreen: false, //true|false: video will be played in full screen, not for YouTube
        randomOrder: false, //true|false: video will played in random orer
        savePlatform: true,
        recordingAudio: false,
        donottrack: false //will not save user browser
    },
    /**
     * demo\template object initialization
     * @param {object} options:  set up all the options for MeMo Embed - merge with variable this.defaultOptions
     * @param {object} demoOptions: set up all the options for this demo\template - merge with variable demoDefaultOptions
     */
    init: function (options, demoOptions) {
        this.demoOptions = demoOptions ? this.mergeObj(this.demoDefaultOptions, demoOptions) : this.demoDefaultOptions;
        this.options = this.mergeObj(this.defaultOptions, options);
        this.layoutInit();
        this.vrt = new Vrt(this.options);
        this.vrt.init();
        if(!window.vrt) window.vrt = this.vrt;
        this.eventHandle();
        this.layoutHandle();
    },
    /**
     * Inject demo layout into page markup
     */
    layoutInit: function () {
        if (this.demoOptions.buttons) {
            if ($('#' + this.demoOptions.targetId + ' #meButtons').length <= 0) {
                $('#' + this.demoOptions.targetId).prepend(this.layoutButton());
            }
            $('#' + this.demoOptions.targetId).prepend(this.layoutStyle());
            $('#' + this.demoOptions.targetId + ' #meButtons div').hide();
        }
    },
    /**
     * List of events listeners and methods for MeMo Embed demo markup
     */
    layoutHandle: function () {
        if (this.demoOptions.buttons) {
            this.layoutHandleButtons();
        }
    },
    /**
     * List of events listeners and methods for MeMo Embed demo buttons
     */
    layoutHandleButtons: function(){
        var _this = this;
        $('#meStart').on('click', function () {
                $('#meStart').hide().remove();
                $(vrt).trigger('vrt_event_start_video_session');
        });
        $('#meNext').on('click', function () {
            $('#meSkip').hide();
            $('#meNext').hide();
            meHelper.alertMessage();
            $(vrt).trigger('vrt_event_user_next_video');
        });
        $('#meSkip').on('click', function () {
                $('#meSkip').hide();
                meHelper.alertMessage;
                $(vrt).trigger('vrt_event_user_next_video');
        });
        $(vrt).on('vrt_event_video_session_complete', function () {
            $("#producertext").hide();
            $('#meNext').hide().remove();
            $('#meEnd').show();
        });
        $(vrt).on('vrt_event_producer_camera_ok', function () {
            meHelper.alertMessage('!!!!!! vrt_event_producer_camera_ok');
            $('#meButtons').show();
            $('#meStart').show();
        });
        $(vrt).on('vrtstep_play', function (evt, data) {
            $("#vrt object#producer").css("position", "absolute").css("left", "-1000000px").css("opacity", "0").css("height", "1%");
            $('#meSkip').hide();
            if(_this.demoOptions.buttonsSkipTime>0){
                setTimeout(
                    function () {
                        $('#meSkip').show()
                    }, (_this.demoOptions.buttonsSkipTime * 1000)
                );
            };
        });
        $(vrt).on('vrt_event_stimuli_end', function (evt, data) {
            $('#meSkip').hide();
        });
        $(vrt).on('vrt_event_recorder_save', function (evt, data) {
            meHelper.alertMessage('ME template: facevideo saved');
        });
        $(vrt).on('vrt_event_recorder_save_error', function (evt, data) {
            meHelper.alertMessage('ME template: facevideo not saved');
        });
// watch next video
        $(vrt).on('vrt_event_video_step_completed', function (evt, data) {
            $('#meNext').show();
            if (data.responseId) {
                meHelper.alertMessage('ME template: response id: ' + data.responseId);
                var d = new Date();
                //save data on API response metadata
                window.vrt.apiClientSaveCustomData(data.responseId, {time: d.getTime()});
            }
        });
        $(vrt).on('vrt_event_respondent_created', function () {
            //save data on API respondent metadata
            vrt.ceclient.writeRespondentCustomData(vrt.respondentId, {randomInteger:meHelper.randomInt(0,1000)});
        });
        $(vrt).on('vrt_event_respondent_created', function () {
            meHelper.alertMessage('Respondent session id: ' + vrt.respondentId);
        });
    },
    /**
     * List of events listeners and events for MeMo Embed
     */
    eventHandle: function () {
        var vrt = window.vrt;
        var _this = this;
        $(vrt).on('vrt_event_producer_camera_ok', function () {

        });
        $(vrt).on('vrtstep_play', function (evt, data) {

        });
        $(vrt).on('vrt_event_stimuli_end', function (evt, data) {

        });
        $(vrt).on('vrt_event_video_step_completed', function (evt, data) {

        });
        $(vrt).on('vrt_event_respondent_created', function () {

        });
        $(vrt).on('vrt_event_video_session_complete', function () {

        });
        $(vrt).on('vrt_event_api_login_fail', function () {
            meHelper.alertMessage('Error: API login fail');
            alert('No API login');
        });
        $(vrt).on('vrt_event_producer_no_camera_found', function () {
            meHelper.alertMessage('Error: No webcam found');
            alert('Your computer have no webcam')
        });
        $(vrt).on('vrt_event_producer_camera_blocked', function () {
            meHelper.alertMessage('Error: Webcam blocked by user');
        });
        $(vrt).on('vrt_event_producer_camera_muted', function () {
            meHelper.alertMessage('Please click on the "Allow" on your webcam request');
        });
        $(vrt).on('vrt_event_fatal_error', function () {
            meHelper.alertMessage('FATAL ERROR ');
        });
        $(vrt).on('vrt_event_browser_old', function () {
            alert('Your browser is too old.')
        });
        $(vrt).on('vrt_event_no_requirement', function () {
            alert('MeMo Embed is not compatible with iPad/iPhone/iPod');
        });
        $(vrt).on('vrt_event_producer_ready', function () {

        });
        $(vrt).on('vrt_event_flash_no', function () {
            meHelper.alertMessage('Error: no Adobe Flash founded');
            alert('No Flash detected on your computer');
        });
        $(vrt).on('vrt_event_flash_old', function () {
            meHelper.alertMessage('Error: the version of Adobe Flash is old');
            alert('the version of Adobe Flash on your computer is old');
        });
        $(vrt).on('vrtstep_play', function () {

        });
        $(vrt).on('vrtstep_stop', function () {

        });
        $(vrt).on('vrt_event_recorder_publish', function () {

        });
        $(vrt).on('vrt_event_recorder_unpublish', function () {

        });
        $(vrt).on('vrt_event_respondent_created', function () {

        });
    },
    /**
     * Add custom style to html page
     * @returns {string} html markup
     */
    layoutStyle: function () {
        return '<style> .meHide {display: none;} #meButtons{height: 1.5em} .meBtn{border: 1px solid #aaaaaa; width: 100px; text-align: center; margin: 5px 5px 5px 0;}</style>';
    },
    /**
     * Add 3 markup button:
     * - "start": start session
     * - "skip": optional skip video button
     * - "next video": see next video
     * @returns {string} html markup
     */
    layoutButton: function () {
        return '<div id="meButtons">' +
            '<div id="meStart" class="meBtn" >Start Session</div>' +
            '<div id="meSkip" class="meBtn" >Skip</div>' +
            '<div id="meNext" class="meBtn"  >Next video</div>' +
            '<div id="meEnd" >End session</div>' +
            '</div>';
    },
    mergeObj: function (obj1, obj2) {
        for (var attrname in obj2) {
            obj1[attrname] = obj2[attrname];
        }
        return obj1
    },
};

window.MemoEmbedTemplate = MemoEmbedTemplate;


            