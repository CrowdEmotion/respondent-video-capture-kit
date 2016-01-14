/**
 * Created by stecrv on 24/10/14.
 */

//mocha.setup({ui:'bdd',progress:true});
mocha.setup({ui:'bdd'});
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();

var testList = function () {

    describe("Setup", function () {

        describe("Settings and base elements", function () {
            it("a div tag with 'vrt' id exist", function () {
                expect(document.getElementById('vrt')).to.be.not.equal(null);
            });
            it("a js VRT object exist", function () {
                expect(window.vrt instanceof Vrt).to.be.equal(true);
            });
            it("is not running on iOS (ipad, iphone, ipod)", function () {
                expect(window.vrt.browser.requirement).to.be.equal(true);
            });
        });
    });

    describe('Flash setup', function () {
        $(window.vrtTest).on('vrttest_event_settype', function () {
            if (window.vrtTest.type == 'flash') {
                describe('Flash object', function () {
                    it('should have Flash', function (done) {
                        this.done = done;
                        if (vrt.results.flash.present == true) {
                            done();
                        } else {
                            done('Flash not present');
                        }
                    });
                    it('Flash version should be 11.1.0 or better', function (done) {
                        this.done = done;
                        if (vrt.results.flash.present && vrt.results.flash.version == true) {
                            done();
                        } else {
                            done('Flash has and old');
                        }
                    });
                });
            } else if (window.vrtTest.type == 'html5') {
                it.skip("No Flash needed ", function () {
                });
            }
        });
    });


    describe("Load API data", function () {
            this.timeout(5000);

            it('API login', function (done) {
                this.done = done;
                $(window.vrt).on('api_init_ok', function () {
                    done();
                    vrtTest.rid = vrt.respondentId;
                });
                $(window.vrt).on('vrt_event_api_login_fail', function () {
                    done('error');
                    stopTest('No api login');
                });
            });
            it("should video stimuli list have one or more videos", function () {
                expect(isVideoListComplete(vrt.videoList)).to.be.equal(true);
            });
    });

    describe('Recorder setup', function () {

        it("should have a webcam", function (done) {
            this.done = done;
            if(vrtTest.haveWebcam===true){
                done()
            }
            $(window.vrt).on('vrt_event_producer_camera_found', function () {
                done()
            });
            $(window.vrt).on('vrt_event_producer_no_camera_found', function () {
                done('no camera found')
            });
        });

        it("webcam should be allowed", function (done) {
            this.done = done;
            this.timeout(5000);
            $(window.vrt).on('vrt_event_producer_camera_muted', function () {
                done('camera is blocked')
            });
            $(window.vrt).on('vrt_event_producer_camera_blocked', function () {
                done('camera is blocked')
            });
            $(window.vrt).on('producer_init_camera_ok', function () {
                done()
            });
        });

        it("should connected to mediabox", function (done) {
            this.done = done;
            this.timeout(10000);
            $(window.vrt).on('vrtstep_connect', function () {
                done()
            });
            if (vrtTest.connected === true) done();
        });

    });


    describe("Video begin ", function () {


        it("player play (A) and mediabox recording (B)", function (done) {
            $(vrt).on('vrt_event_video_session_proceedToShow', function (e, data) {
                $(vrtTest).on('vrttest_player_play', function (e, data) {
                    vrtTest.time.a = performance.now();
                    if (vrtTest.time.a > 0 && vrtTest.time.b > 0) {
                        done()
                    }
                    ;
                });
                $(vrt).on('vrt_event_recorder_publish', function (e, data) {
                    vrtTest.time.b = performance.now();
                    if (vrtTest.time.a > 0 && vrtTest.time.b > 0) {
                        done()
                    }
                    ;
                });
            });
            $(vrt).trigger('vrt_event_start_video_session');
        });
        this.timeout(5000);
        it("time between A and B should be less than " + vrtTest.maxTimeDiffAllowed + "ms", function (done) {
            this.done = done;
            setTimeout(function () {
                expect(vrtTest.time.b - vrtTest.time.a).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(-vrtTest.maxTimeDiffAllowed);
                done();
            }, 2500);

        });
    });

    describe("Video End ", function () {
        this.timeout(120000);

        it("player stop (C) and recorder stop recording (D)", function (done) {
            this.done = done;
            $(window.vrt).on('vrt_event_player_end', function (e, data) {
                vrtTest.time.c = performance.now();
                if (vrtTest.time.c > 0 && vrtTest.time.d > 0) {
                    done()
                }
                ;
            });
            $(window.vrt).on('vrt_event_recorder_unpublish', function (e, data) {
                vrtTest.time.d = performance.now();
                if (vrtTest.time.c > 0 && vrtTest.time.d > 0) {
                    done()
                }
                ;
            });
        });

        it("time between D and C should be less than " + vrtTest.maxTimeDiffAllowed + "ms", function (done) {
            this.done = done;
            setTimeout(function () {
                expect(vrtTest.time.d - vrtTest.time.c).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(-vrtTest.maxTimeDiffAllowed);
                done();
            }, 2500);
        });

    });

    describe('End session', function () {
        this.timeout(5000);
        it("user session end", function (done) {
            $(window.vrt).on('vrt_event_user_session_complete', function (e, data) {
                done();
            });
            setTimeout(function () {
                $(vrt).trigger('vrt_event_user_session_complete');
            }, 3000);
        });
    });

    describe("Results", function () {
        describe('Files check', function () {
            it.skip("should exist Timestamps file and have some data", function () {
                var isFile = getFile(window.vrtTest.path, 'json');
                expect(isFile).to.be.equal(true);
            });
            it.skip("should exist facevideo file and have some data", function () {
                var isFile = getFile(window.vrtTest.path, window.vrtTest.videoext);
                expect(isFile).to.be.equal(true);
            });
            it.skip("should exist the logs file ", function () {
            });
            it.skip("should have Respondent meta data", function () {
            });
            it.skip("should have Response meta data", function () {
            });
            //API NOT READY it.skip("should the API getting the facevideos file ", function () {});
            //API NOT READY it.skip("should the API getting the timestamp file", function () {});
        });
    });

    var d = $.Deferred();
    d.resolve();
    return d;
}


var testStart = function () {
    mocha.run();
};
