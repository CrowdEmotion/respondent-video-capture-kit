/**
 * Created by stecrv on 24/10/14.
 */

/*
    List of tests (! important tests)

    1 - Setup
        - Browser & OS
            - is browser allowed and minimum version
            - is not mobile
        *- have VRTK data !
            - list of videos stimuli (each: url, length, name) !
            - type of video stimuli ( YT o Custom Server) !
            - is div #vrt present?                          DOMready
        *- can access to api !
            - login ok !
            - server up !
        *- can use mediabox !                                PRODready
            - domain allowed ok
            - server up !
            - is Flash allowed !
            - have a webcam
            - can connect() !                               WEBCall
            - webcam allowed !                              WEBCall

    2 - Video stimuli session
        - 2.1 Video recording !
            - is player playing         (A) !
            - is recorder publishing    (B) !
            - B start <200ms after A
            - is player stopping        (C) !
            - is recorder unpublish     (D) !
            - D happened <200ms after C       !
            - is TS sended !
            - is facevideo uploaded to mediabox !
            - is TS file uploaded to mediabox !
            - is API getting the facevideo from mediabox !
            - is API getting the TS file from mediabox !
            - is API releasing a response ID !
        - 2.2 After Video Session
            - if requested, poll appear
                - on close, poll disappear
            - on next action
                - if another videos are present, is going to the next video (2.1) !
                - or to the session close !

    Group of test according to browser/Flash object event
        DOMready    after DOM load
        PRODready   when this.producer.once('ready'
        WEBCall     webcam allowed
 */
$(document).ready(function () {
    mocha.setup('bdd');
    var assert = chai.assert,
        expect = chai.expect,
        should = chai.should();

    var evtTime = {a:null,b:null,c:null,d:null};
    window.vrtTest = {time:evtTime};


    function isVideoListComplete(videoList) {
        if (videoList instanceof Array) {
            if (videoList.length <= 0) {
                return false;
            }
            for (var i = 0; i < videoList.length; i++) {
                if (videoList[i] instanceof Object) {
                    if (!videoList[i].length) return false;
                    if (!videoList[i].path) return false;
                    if (!videoList[i].name) return false;
                } else return false;
            }
            return true;
        } else return false;
    };


    describe("Setup", function () {
        describe("Settings and base elements", function () {
            it("a div tag with 'vrt' id exist", function () {
                expect(document.getElementById('vrt')).to.be.not.equal(null);
            });
            it("a js VRT object exist", function () {
                expect(window.vrt instanceof Vrt).to.be.equal(true);
            });
            it("should video stimuli list have one or more videos", function () {
                expect(isVideoListComplete(vrt.videoList)).to.be.equal(true);
            });
        });

        describe('API login', function () {
            it('should login', function (done) {
                $(window.vrt).on('api_init_ok', function () {
                    done();
                });
                $(window.vrt).on('vrt_event_api_login_fail', function () {
                    done('error');
                });
            });
        });

        describe('Flash object', function () {
            it('should Flash exists', function () {
                expect(vrt.results.flash.present).to.be.equal(true);
            });
            it('should Flash version be 11.1.0 or better', function () {
                expect(vrt.results.flash.present && vrt.results.flash.version).to.be.equal(true);
            });
        });

        describe('Mediabox object', function () {
            it("should have a webcam", function (done) {
                console.log('should have a webcam');
                    //$(window.vrt).on('vrt_event_producer_ready', function () {
                        console.log('vrt_event_producer_ready');
                        $(window.vrt).on('vrt_event_producer_camera_found', function () {
                            console.log('vrt_event_producer_camera_found');
                            done();
                        });
                        $(window.vrt).on('vrt_event_producer_no_camera_found', function () {
                            console.log('vrt_event_producer_no_camera_found');
                            done('error');
                        });
                    //})
            });

            this.timeout(10000);
            it("should the webcam be allowed", function (done) {
                this.done = done;
                $(window.vrt).on('producer_init_ok', function () {done()});
                $(window.vrt).on('vrt_event_producer_camera_ok',function () {done()});
                $(window.vrt).on('vrt_event_producer_camera_muted', function () {done('error')});
                $(window.vrt).on('vrt_event_producer_camera_blocked', function () {done('error')});
            });

            it("should the mediabox connection working", function (done) {
                this.done = done;
                $(window.vrt).on('vrtstep_connect', function () {done()});
            });

        });

    });
    describe("Video session ", function () {

        this.timeout(8000);

        it("player play (A) and mediabox recording (B)", function (done) {
            $(vrt).on('vrt_event_video_session_proceedToShow', function (e,data) {
                $(vrt).on('vrt_event_logchrono_playing_start', function (e,data) {
                    vrtTest.time.a=data.time;
                    if( vrtTest.time.a>0 &&  vrtTest.time.b>0){done()};
                });
                $(vrt).on('vrt_event_logchrono_recording_start', function (e,data) {
                    vrtTest.time.b=data.time;
                    if( vrtTest.time.a>0 &&  vrtTest.time.b>0){done()};
                });
            });
            $(vrt).trigger('vrt_event_start_video_session');
        });

        it("time between A and B less than 200ms", function (done) {
            setTimeout(function () {
                expect(vrtTest.time.b-vrtTest.time.a).to.be.lessThan(200).and.greaterThan(0);
                done();
            }, 2500);
        });
        this.timeout(10000+2000 );
        //this.timeout((vrt.videoList[0].length*100)+2000)


        it("player stop (C) and recorder stop recording (D)", function (done) {
            this.done = done;
            $(window.vrt).on('vrt_event_logchrono_playing_end', function (e,data) {
                vrtTest.time.c=data.time;
                if( vrtTest.time.c>0 &&  vrtTest.time.d>0){done()};
            });
            $(window.vrt).on('vrt_event_logchrono_recording_end', function (e,data) {
                vrtTest.time.d=data.time;
                if( vrtTest.time.c>0 &&  vrtTest.time.d>0){done()};
            });
        });

        it("time between D and C less than 200ms", function () {
            setTimeout(function () {
                expect(vrtTest.time.d-vrtTest.time.c).to.be.lessThan(200).and.greaterThan(0);
            }, 2500);
        });

        it("video step end and receive response id", function (done) {
            this.done = done;
            $(window.vrt).on('vrt_event_video_step_completed', function (e,data) {
                if (data.responseId) {
                    alertMessage('Facevideo uploaded with response id: ' + data.responseId);
                }
                done();
            });
        });

        it("open post video frame", function (done) {
            $(window.vrt).on('vrt_event_frame_open', function (e,data) {
                done();
            });
            vrt.openFrame('https://docs.google.com/forms/d/1afP8KJKFIF3AMfAAjKqaLtLoFIdr5S3rSMRn2FCVyek/viewform',
                {
                    btnCssClass: 'button-choose pure-button',
                    btnPosition: 'top',
                    btnText: 'Next',
                    btnStyle: 'position: static; margin-bottom: 1em;'
                }
            );
        });


        it("close post video frame", function (done) {

            $(window.vrt).on('vrt_event_frame_close', function (e,data) {
                done();
            });
            setTimeout(function() {
                $('#vrtFrameClose').click();
            }, 3000 );
        });

        it("user session end", function (done) {
            $(window.vrt).on('vrt_event_user_session_complete', function (e,data) {
                done();
            });
            setTimeout(function() {
                $(vrt).trigger('vrt_event_user_session_complete');
            }, 3000 );
        });

        /*
        $(vrt).on('vrt_event_video_step_completed', function (evt, data) {
            alertMessage();
            //$('#next').show();
            if (data.responseId) {
                alertMessage('Facevideo uploaded with response id: ' + data.responseId);
            }
            vrt.openFrame('https://docs.google.com/forms/d/1afP8KJKFIF3AMfAAjKqaLtLoFIdr5S3rSMRn2FCVyek/viewform',
                {
                    btnCssClass: 'button-choose pure-button',
                    btnPosition: 'top',
                    btnText: 'Next',
                    btnStyle: 'position: static; margin-bottom: 1em;'
                }
            );
        });
        */



    });
    mocha.run();
});