/**
 * Created by stecrv on 24/10/14.
 */


$(document).ready(function () {
    mocha.setup('bdd');
    var assert = chai.assert,
        expect = chai.expect,
        should = chai.should();

    var mobilecheck = function() {
        var check = false;
        (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
    var isDesktop = mobilecheck() ? false : true;


    window.vrtTest = {time:{a:null,b:null,c:null,d:null},path:null,
                        haveWebcam:null,maxTimeDiffAllowed:300,responseID:null};



    $(window.vrt).on('vrt_event_producer_camera_found', function () {
        window.vrtTest.haveWebcam=true;
    });
    $(window.vrt).on('vrt_event_producer_no_camera_found', function () {
        window.vrtTest.haveWebcam=false;
    });

    $(window.vrt).on('vrt_event_streamname', function(e, data){
        window.vrtTest.path=data.streamname;
    });


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
    }



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
            it("is not a mobile browser", function(){
                expect(isDesktop).to.be.equal(true);
            });
            //it.skip("should be the browser compatible",function(){})
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
            it('should have Flash', function () {
                expect(vrt.results.flash.present).to.be.equal(true);
            });
            it('Flash version should be 11.1.0 or better', function () {
                expect(vrt.results.flash.present && vrt.results.flash.version).to.be.equal(true);
            });
        });

        describe('Mediabox object', function () {
            it("should have a webcam", function () {
                expect(vrtTest.haveWebcam).to.be.equal(true);
            });

            this.timeout(10000);
            it("webcam should be allowed", function (done) {
                this.done = done;
                $(window.vrt).on('producer_init_ok', function () {done()});
                $(window.vrt).on('vrt_event_producer_camera_ok',function () {done()});
                $(window.vrt).on('vrt_event_producer_camera_muted', function () {done('error')});
                $(window.vrt).on('vrt_event_producer_camera_blocked', function () {done('error')});
            });

            it("should connected to mediabox", function (done) {
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

        it("time between A and B should be less than "+vrtTest.maxTimeDiffAllowed+"ms", function (done) {
            setTimeout(function () {
                expect(vrtTest.time.b-vrtTest.time.a).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(0);
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

        it("time between D and C should be less than "+vrtTest.maxTimeDiffAllowed+"ms", function () {
            setTimeout(function () {
                expect(vrtTest.time.d-vrtTest.time.c).to.be.lessThan(vrtTest.maxTimeDiffAllowed).and.greaterThan(0);
            }, 2500);
        });

        describe('Files check',function(){
            it("should exist Timestamps file and have some data", function () {
                var isFile = getFile(window.vrtTest.path,'json');
                expect(isFile).to.be.equal(true);
            });
            it("should exist facevideo file and have some data", function () {
                var isFile = getFile(window.vrtTest.path,'mp4');
                expect(isFile).to.be.equal(true);
            });
            it.skip("should the API getting the facevideos file ", function () {});
            it.skip("should the API getting the timestamp file", function () {});
        });


        it("video step end and receive response id", function (done) {
            this.done = done;
            $(window.vrt).on('vrt_event_video_step_completed', function (e,data) {
                if (data.responseId) {
                    alertMessage('Facevideo uploaded with response id: ' + data.responseId);
                    done()
                }else{
                    done('not received any response ID');
                }

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




    });
    mocha.run();
});