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
