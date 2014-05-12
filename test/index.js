var should = require('chai').should();
var nock = require('nock');
var traitify = require('../index');
var createAssessment = traitify.createAssessment;
nock.disableNetConnect();

describe('#Traitify', function() {
  it('Creates Assessment', function(done) {

    var api = nock("http://lvh.me")
          .post("/v1/assessments")
          .reply(200, {id:"awesome"});

  	config = {
  		host:"lvh.me",
  		version:"v1",
  		privateKey:"fakeKey",
      deckId:"fakeDeckId"
  	};

    createAssessment(config, function(data){
      data.id.should.equal("awesome");
      done();
    });

    api.isDone(); // => true
  });
});