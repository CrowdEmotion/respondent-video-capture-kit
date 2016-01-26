/**
 * Created by stecrv on 24/10/14.
 */

//mocha.setup({ui:'bdd',progress:true});
mocha.setup({ui: 'bdd'});
var assert = chai.assert,
    expect = chai.expect,
    should = chai.should();
var testSuite = null;
var testListResult = function () {

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
            //API NOT READY it.skip("should the API getting the facevideos file ", function () {});
            //API NOT READY it.skip("should the API getting the timestamp file", function () {});
        });
        describe('DB check', function () {
            dlog(this.title);
            it("should have Respondent data ", function () {
                ilog(this.test.title);
                cl(vrtTest.results);
                expect(vrtTest.results.db.respondent).to.not.be.empty;
            });
            it("should have Response data ", function () {
                ilog(this.test.title);
                expect(vrtTest.results.db.responses).to.not.be.empty;
            });
            it("should have the same number of Responses and Video stimuli  ", function () {
                ilog(this.test.title);
                expect(vrtTest.results.db.responses.length).to.be.equal(vrtTest.results.db.stimuli.length);
            });
            it("should have Respondent meta data", function () {
                ilog(this.test.title);
                var datanum = 0;
                if(vrtTest.results.db.respondentMetadata.data)
                    datanum = Object.keys(vrtTest.results.db.respondentMetadata.data).length;
                expect(datanum).to.be.greaterThan(0);
            });
            it("should every Response have meta data", function () {
                ilog(this.test.title);
                var datas = 0;
                for(var i = 0; i < vrtTest.results.db.responsesMetadata.length; i++){
                    if(vrtTest.results.db.responsesMetadata && vrtTest.results.db.responsesMetadata[i] && vrtTest.results.db.responsesMetadata[i].data ){
                        if(Object.keys(vrtTest.results.db.responsesMetadata[i].data).length>0){
                            datas++;
                        }
                    }
                }
                expect(vrtTest.results.db.responses.length).to.be.equal(datas);
            });

        });
    });

    var d = $.Deferred();
    d.resolve();
    return d;
}
