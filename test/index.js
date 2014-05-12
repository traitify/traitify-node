var should = require('chai').should();
var nock = require('nock');
var traitify = require('../index');
nock.disableNetConnect();

function nockApiHelper(method, path, responseData, callBack, options){
  traitify.setHost("lvh.me");
  traitify.setVersion("v1");
  traitify.setPrivateKey("fakeKey");

  var api = nock("http://lvh.me")[method]("/v1"+path).reply(200, responseData);

  callBack();

  api.isDone(); // => true
}

describe('#Traitify', function() {
  it('Creates Assessment', function(done) {
    nockApiHelper("post", "/assessments", {id:"fakeAssessmentId"}, function(){
      traitify.createAssessment("fakeDeckId", function(data){
        data.id.should.equal("fakeAssessmentId");
        done();
      });
    });
  });

  it('Gets Assessment', function(done) {
    nockApiHelper("get", "/assessments/fakeAssessmentId", {id: "fakeAssessmentId"}, function(){
      traitify.getAssessment("fakeAssessmentId", function(data){
        data.id.should.equal("fakeAssessmentId");
        done();
      });
    })    
  });

  it('Gets Personality Types', function(done) {

    var responseData = {
      "personality_types":[
        {"personality_type":{
          "name":"Very Cool"
        },
        "score":100}
      ]
    };

    nockApiHelper("get", "/assessments/fakeAssessmentId/personality_types", responseData, function(){
      traitify.getPersonalityTypes("fakeAssessmentId", function(data){
        data.personality_types[0].score.should.equal(100);
        done();
      });
    });
  });

  it('Gets Assessment Slides', function(done) {
    var responseData = {
      "slides":[
        {"caption":"Very Cool"}
      ]
    };
    nockApiHelper("get", "/assessments/fakeAssessmentId/slides", responseData, function(){
      traitify.getSlides("fakeAssessmentId", function(data){
        data.slides[0].caption.should.equal("Very Cool");
        done();
      });
    });
  });

  it("Sets Assessment's Slide", function(done) {
    var responseData = {
      "slides":[
        {"caption":"Very Cool"}
      ]
    };
    nockApiHelper("put", "/assessments/fakeAssessmentId/slides/fakeSlideId", responseData, function(){
      traitify.setSlide("fakeAssessmentId", "fakeSlideId", {value: true, responseTime: 1000}, function(data){
        data.slides[0].caption.should.equal("Very Cool");
        done();
      });
    });
  });
});