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
                    banner: '/* Playcorder crowdemotion.co.uk ' + w + ' */ ',
                    mangle : false,
                    compress: false
                },
                src: [
                    'src/libs/swfobject.js',
                    'src/recorder/var.js',
                    'src/libs/browsercompatibility.js',
                    'src/APIClient/sha256.js',
                    'src/APIClient/enc-base64-min.js',
                    'src/APIClient/store.js',
                    'src/APIClient/CEClient.js',
                    'src/libs/video-js-4-7/video.dev.js',
                    'src/vrtk_player.js',
                    'src/vrtk.js'
                ],
                dest: 'dist/vrtk-v2.min.js'
            },
            concat : {
                options: {
                    banner: '/* Playcorder crowdemotion.co.uk ' + w + ' */ ',
                    mangle : false,
                    compress: false,
                    expand: true,
                    beautify: true
                },
                src: [
                    'src/libs/swfobject.js',
                    'src/recorder/var.js',
                    'src/libs/browsercompatibility.js',
                    'src/APIClient/sha256.js',
                    'src/APIClient/enc-base64-min.js',
                    'src/APIClient/store.js',
                    'src/APIClient/CEClient.js',
                    'src/libs/video-js-4-7/video.dev.js',
                    'src/vrtk_player.js',
                    'src/vrtk.js'
                ],
                dest: 'dist/vrtk-v2.all.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('concat', ['uglify']);

};
