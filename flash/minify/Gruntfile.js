/**
 * Created by stecrv on 02/12/14.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify : {
            default : {
                options: {
                    banner: '/* VRTK Crowdemotion.co.uk */ ',
                    mangle : false, compress: false
                },
                src: ['../js/external/swfobject.js','../js/recorder/webproducer.js','../js/APIClient/sha256.js','../js/APIClient/enc-base64-min.js'
                , '../js/APIClient/store.js','../js/APIClient/CEClient.js','../js/video/video-js-4-7/video.dev.js'
                , '../js/video_respondent_test/videoRespondentTestPlayer.js', '../js/video_respondent_test/videoRespondentTest.js'],
                dest: '../js/vrtk.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['uglify']);;


};
