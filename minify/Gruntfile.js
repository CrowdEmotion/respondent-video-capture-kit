/**
 * Created by stecrv on 02/12/14.
 */
module.exports = function(grunt) {

    var w = new Date();
    w = w.getFullYear()+'-'+ (w.getMonth()+1) +'-'+ w.getDate()+ ' '+w.getHours() +':'+ w.getMinutes();

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify : {
            default : {
                options: {
                    banner: '/* Playcorder crowdemotion.co.uk '+w+' */ ',
                    mangle : false,
                    compress: false
                },
                src: ['../flash/js/external/swfobject.js',
                    '../flash/js/recorder/webproducer.js',
                    '../flash/js/recorder/browsercompatibility.js',
                    '../flash/js/APIClient/sha256.js',
                    '../flash/js/APIClient/enc-base64-min.js'
                , '../flash/js/APIClient/store.js',
                    '../flash/js/APIClient/CEClient.js',
                    '../flash/js/video/video-js-4-7/video.dev.js'
                , '../flash/js/video_respondent_test/videoRespondentTestPlayer.js',
                    '../flash/js/video_respondent_test/videoRespondentTest.js'],

                dest: '../flash/js/vrtk.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['uglify']);;


};
