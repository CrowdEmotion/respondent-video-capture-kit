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
            this.timeout(20000);
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
                    this.timeout(7000);
                    cleanUpStart();
                    $(vrtTest).on('vrttest_playandpublish', function (e, data) {
                        $(vrtTest).off('vrttest_playandpublish');
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
                //TODO set timeout according to video legnth
                this.timeout( vrt.videoList[vrt.currentMedia]*2 );
                before('clean up',function(){
                    ilog('clean up video end');
                    cleanUpEnd();
                });
                it("player stop (C) and recorder stop recording (D)  in less than  " + vrtTest.maxTimeDiffAllowed + "ms", function (done) {
                    ilog(this.test.title);
                    this.done = done;
                    cleanUpEnd();

                    $(vrtTest).on('vrttest_stopandunpublish', function (e, data) {
                        $(vrtTest).off('vrttest_stopandunpublish');
                        this.done = done;
                        setTimeout(
                            function(){
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
                            }.bind(this)
                        ,1000)
                    }.bind(this));
                });

                it("video has a response id and video has custom data saved", function (done) {
                    ilog(this.test.title);
                    this.timeout(7000);
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



                it("video playback and video stimuli length should be similiar ", function () {
                    ilog(this.test.title);
                    if (vrtTest.time.a && vrtTest.time.c) {
                        vrtTest.time.playback =  vrtTest.time.c - vrtTest.time.a;
                        expect(vrtTest.stimuli[vrt.currentMedia].lengthMS - vrtTest.time.playback).to.be.lessThan((vrtTest.maxTimeDiffAllowed*2)).and.greaterThan(- (vrtTest.maxTimeDiffAllowed*2));
                    }
                });
                it("video recording and video stimuli length should be similiar", function () {
                    ilog(this.test.title);
                    if (vrtTest.time.b && vrtTest.time.d) {
                        vrtTest.time.recorder =  vrtTest.time.d - vrtTest.time.b;
                        expect(vrtTest.stimuli[vrt.currentMedia].lengthMS - vrtTest.time.recorder).to.be.lessThan((vrtTest.maxTimeDiffAllowed*2)).and.greaterThan(- (vrtTest.maxTimeDiffAllowed*2));
                    }
                });
                it("video playback and video recording length should be similiar", function () {
                    ilog(this.test.title);
                    //vrtTest.results.stimuli.push({time:vrtTest.time});
                    if (vrtTest.time.playback && vrtTest.time.recorder) {
                        expect(vrtTest.time.playback - vrtTest.time.recorder).to.be.lessThan((vrtTest.maxTimeDiffAllowed*2)).and.greaterThan(- (vrtTest.maxTimeDiffAllowed*2));
                    }

                });

                it("video recording must have a save event", function () {
                    ilog(this.test.title);
                    var e  = vrtTest.time.e
                    vrtTest.time.e = null;
                    expect(e).to.be.greaterThan(0);
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
            this.timeout(6000);
            $(window.vrt).on('vrt_event_user_session_complete', function (e, data) {
                done();
            });
            setTimeout(function () {
                $(vrtTest).trigger('vrttest_end');
                $(vrt).trigger('vrt_event_user_session_complete');
            }, 5000);
        });
    });

    describe("TO DO ", function () {
        dlog(this.title);
        it.skip("check project options", function () {
            ilog(this.test.title);
        });
        it.skip("check project status (open,close,archivied)", function () {
            ilog(this.test.title);
        });


    });

    var d = $.Deferred();
    d.resolve();
    return d;
}


