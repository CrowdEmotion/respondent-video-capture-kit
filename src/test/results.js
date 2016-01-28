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


    describe('DB check', function () {
        dlog(this.title);
        it("should have Respondent data ", function () {
            jsl(vrtTest.results);
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
            if (vrtTest.results.db.respondentMetadata.data)
                datanum = Object.keys(vrtTest.results.db.respondentMetadata.data).length;
            expect(datanum).to.be.greaterThan(0);
        });
        it("should every Response have meta data", function () {
            ilog(this.test.title);
            var datas = 0;
            for (var i = 0; i < vrtTest.results.db.responsesMetadata.length; i++) {
                if (vrtTest.results.db.responsesMetadata && vrtTest.results.db.responsesMetadata[i] && vrtTest.results.db.responsesMetadata[i].data) {
                    if (Object.keys(vrtTest.results.db.responsesMetadata[i].data).length > 0) {
                        datas++;
                    }
                }
            }
            expect(vrtTest.results.db.responses.length).to.be.equal(datas);
        });

    });


    describe('Files check', function () {
        dlog(this.title);
        testSuite = this;
        window.testSuite = testSuite;
        var fileTest = function(index){
            it("should facevideo file status must be 2", function (done) {
                ilog(this.test.title);
                if(vrtTest.results.db.facevideos[index].statusMessage=='sandboxed'){
                    expect(vrtTest.results.db.facevideos[index].statusMessage).to.be.equal('sandboxed');
                }else if(vrtTest.results.db.facevideos[index].status==2){
                    expect(vrtTest.results.db.facevideos[index].status).to.be.equal(2);
                }
                done()
            });
            it("should facevideo file analysis message be sandboxed or complete", function (done) {
                ilog(this.test.title);
                if(vrtTest.results.db.facevideos[index].statusMessage=='sandboxed'){
                    expect(vrtTest.results.db.facevideos[index].statusMessage).to.be.equal('sandboxed');
                }else{
                    expect(vrtTest.results.db.facevideos[index].statusMessage).to.be.equal('Analysis complete');
                }
                done()
            });
            it("should exist Timestamps file", function (done) {
                ilog(this.test.title);
                expect(fileExists(vrtTest.results.files.timedmetadatas[index])).to.be.equal(200);
                done()
            });
            it("should exist facevideo file", function (done) {
                ilog(this.test.title);
                expect(fileExists(vrtTest.results.files.facevideos[index])).to.be.equal(200);
                done()
            });
            it("should exist the logs file ", function (done) {
                ilog(this.test.title);
                expect(fileExists(vrtTest.results.files.logs[index])).to.be.equal(200);
                done()
            });
        };
        var n = 0;
        while (n < vrtTest.results.db.responses.length ) {
            fileTest.bind(window.testSuite)(n);
            n++;
        }

    });


    var d = $.Deferred();
    d.resolve();
    return d;
};
