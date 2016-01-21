/**
 * Created by stecrv on 24/10/14.
 */

//mocha.setup({ui:'bdd',progress:true});
mocha.setup({ui: 'bdd'});
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();
var testSuite = null;
var testList = function () {

    describe("Setup", function () {
        dlog(this.title);
        it("connection protocol is https or run in localhost", function () {
            ilog(this.test.title);
            if (document.location.hostname == "localhost") {
                expect(document.location.hostname).to.be.equal('localhost');
            } else {
                expect(document.location.protocol).to.be.equal('https:');
            }

        });
        it("a div tag with 'vrt' id exist", function () {
            ilog(this.test.title);
            expect(document.getElementById('vrt')).to.be.not.equal(null);
        });
        it("a js VRT object exist", function () {
            ilog(this.test.title);
            expect(window.vrt instanceof Vrt).to.be.equal(true);
        });
        it("is not running on iOS (ipad, iphone, ipod)", function () {
            ilog(this.test.title);
            expect(window.vrt.browser.requirement).to.be.equal(true);
        });
    });

    describe('Flash setup', function () {
        dlog(this.title);
        $(window.vrtTest).on('vrttest_event_settype', function () {
            if (window.vrtTest.type == 'flash') {
                describe('Flash object', function () {
                    dlog(this.title);
                    it('should have Flash', function (done) {
                        ilog(this.test.title);
                        this.done = done;
                        if (vrt.results.flash.present == true) {
                            done();
                        } else {
                            done('Flash not present');
                        }
                    });
                    it('Flash version should be 11.1.0 or better', function (done) {
                        ilog(this.test.title);
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
                    ilog(this.test.title);
                });
            }
        });
    });

    describe("Load API data", function () {
        dlog(this.title);
        this.timeout(5000);

        it('API login', function (done) {
            ilog(this.test.title);
            this.done = done;
            $(window.vrt).on('api_init_ok', function () {
                vrtTest.rid = vrt.respondentId;
                done();
            });
            $(window.vrt).on('vrt_event_api_login_fail', function () {
                done('error');
                stopTest('No api login');
            });
        });
        it("should video stimuli list have one or more videos", function () {
            ilog(this.test.title);
            expect(isVideoListComplete(vrt.videoList)).to.be.equal(true);
        });
    });

    describe('Recorder setup', function () {
        dlog(this.title);
        it("should have a webcam", function (done) {
            ilog(this.test.title);
            this.done = done;
            if (vrtTest.haveWebcam === true) {
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
            ilog(this.test.title);
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
            ilog(this.test.title);
            this.done = done;
            this.timeout(10000);
            $(window.vrt).on('vrtstep_connect', function () {
                done()
            });
            if (vrtTest.connected === true) done();
        });

    });
    setTimeout(function () {
    }, 2000)
    //start     vrt_event_start_video_session
    //          vrt_event_video_step_completed
    //next      vrt_event_user_next_video
    //          vrt_event_video_session_complete
    //end
    describe("view videos", function () {
        dlog(this.title);
        testSuite = this;
        window.testSuite = testSuite;
        var viewVideoTest = function () {

            describe("Video begin ", function () {
                dlog(this.title);
                before('clean up',function(){
                    ilog('clean up video begin');
                    cleanUpStart();
                    vrtTest.currentMediaIndex++;
                });
                it("player play (A) and mediabox recording (B) in less than  " + vrtTest.maxTimeDiffAllowed + "ms", function (done) {
                    ilog(this.test.title);
                    this.done = done;
                    this.timeout(5000);
                    cleanUpStart();
                    $(vrt).on('vrt_event_video_session_proceedToShow', function (e, data) {

                        $(vrtTest).on('vrttest_player_play', function (e, data) {
                            vrtTest.time.a = performance.now().toFixed(0);
                            isPlayAndPublish()
                        });
                        $(vrt).on('vrt_event_recorder_publish', function (e, data) {
                            vrtTest.time.b = performance.now().toFixed(0);
                            isPlayAndPublish()
                        });
                    });
                    $(vrtTest).on('vrttest_playandpublish', function (e, data) {
                        tlog('vrtTest.time.a:' + vrtTest.time.a);
                        tlog('vrtTest.time.b:' + vrtTest.time.b);
                        if (vrtTest.handleIsPlayAndPublish) clearTimeout(vrtTest.handleIsPlayAndPublish);
                        if (vrtTest.time.a && vrtTest.time.b) {
                            expect(vrtTest.time.b - vrtTest.time.a).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(-vrtTest.maxTimeDiffAllowed);
                            done();
                        } else if (!vrtTest.time.a && vrtTest.time.b) {
                            done('play event did not happen');
                        } else if (vrtTest.time.a && !vrtTest.time.b) {
                            done('publish event did not happen');
                        } else if (!vrtTest.time.a && !vrtTest.time.b) {
                            done('play and publish did not happen');
                        }
                    });

                    if (vrt.currentMedia == -1)
                        $(vrt).trigger('vrt_event_start_video_session');
                    else {
                        $(vrt).trigger('vrt_event_user_next_video');
                    }
                });
            });


            describe("Video End ", function () {
                dlog(this.title);
                this.timeout(120000);
                before('clean up',function(){
                    ilog('clean up video end');
                    cleanUpEnd();
                });
                it("player stop (C) and recorder stop recording (D)  in less than  " + vrtTest.maxTimeDiffAllowed + "ms", function (done) {
                    ilog(this.test.title);
                    this.done = done;
                    cleanUpEnd();
                    $(window.vrt).on('vrt_event_stimuli_end', function (e, data) {
                        vrtTest.time.c = performance.now().toFixed(0);
                        isStopAndUnpublish();
                    });
                    $(window.vrt).on('vrt_event_recorder_unpublish', function (e, data) {
                        vrtTest.time.d = performance.now().toFixed(0);
                        isStopAndUnpublish();
                    });
                    $(vrtTest).on('vrttest_stopandunpublish', function (e, data) {
                        tlog('vrtTest.time.c:' + vrtTest.time.c);
                        tlog('vrtTest.time.d:' + vrtTest.time.d);
                        if (vrtTest.handleIsStopAndUnpublish) clearTimeout(vrtTest.handleIsStopAndUnpublish);
                        if (vrtTest.time.c && vrtTest.time.d) {
                            expect(vrtTest.time.d - vrtTest.time.c).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(-vrtTest.maxTimeDiffAllowed);
                            done();
                        } else if (!vrtTest.time.c && vrtTest.time.d) {
                            done('stop event did not happen');
                        } else if (vrtTest.time.c && !vrtTest.time.d) {
                            done('unpublish event did not happen');
                        } else if (!vrtTest.time.c && !vrtTest.time.d) {
                            done('stop and unpublish did not happen');
                        }
                    });
                });

                it("video has a response id and video has custom data saved", function (done) {
                    ilog(this.test.title);
                    this.timeout(2000);
                    this.done = done;
                    $(window.vrt).on('vrt_event_video_step_completed', function (e, data) {
                        var r = false, c = false;
                        if (data.responseId) {
                            r = true;
                        }
                        if (!((window.vrt.options.customData !== false) != data.insertedCustomData)) { //have the same value
                            c = true
                        }
                        if (r && c) {
                            done()
                        } else if (!r && !c) {
                            done('no response id and custom data saved')
                        } else if (!r) {
                            done('no response id')
                        } else if (!c) {
                            done('no custom data saved')
                        }
                    });
                });
            });
        };


        var n = 0;

        while (n < vrtTest.stimuliNumber) {
            n++;
            viewVideoTest.bind(window.testSuite)();
        }

    });

    describe("User end session", function () {
        dlog(this.title);
        it("user session end", function (done) {
            ilog(this.test.title);
            this.done = done;
            $(window.vrt).on('vrt_event_user_session_complete', function (e, data) {
                done();
            });
            setTimeout(function () {
                $(vrt).trigger('vrt_event_user_session_complete');
            }, 1000);
        });
    });

    describe("Results TO DO ", function () {
        dlog(this.title);
        describe('Files check', function () {
            dlog(this.title);
            it.skip("should exist Timestamps file and have some data", function () {
                ilog(this.test.title);
                var isFile = getFile(window.vrtTest.path, 'json');
                expect(isFile).to.be.equal(true);
            });
            it.skip("should exist facevideo file and have some data", function () {
                ilog(this.test.title);
                ilog(this.test.title);
                var isFile = getFile(window.vrtTest.path, window.vrtTest.videoext);
                expect(isFile).to.be.equal(true);
            });
            it.skip("should exist the logs file ", function () {
                ilog(this.test.title);
            });
            it.skip("should have Respondent meta data", function () {
                ilog(this.test.title);
            });
            it.skip("should have Response meta data", function () {
                ilog(this.test.title);
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

var apiLoadData = function (ceInit, rkey, akey, cb) {
    var d = $.Deferred();
    var ceClient = new CEClient(ceInit);
    ceClient.setToken(akey);
    ceClient.loadResearch(rkey, function (res) {
        ceClient.loadMediaList(res.id,
            function (res, err) {
                ceClient.logout();
                cb(res, err);
            });
    });
};
