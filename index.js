/**
 * traitify
 * https://github.com/brentertz/traitify
 *
 * Copyright (c) 2014 Brent Ertz
 * Licensed under the MIT license.
 */

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
  host: "your host",
  setHost: function(host){
    this.host = host;
  },

  version: "version",
  setVersion: function(version){
    this.version = version;
  },

  privateKey: "privateKey",
  setPrivateKey: function(privateKey){
    this.privateKey = privateKey;
  },


  request: function(method, path, params, callBack){
    var http = require('http');

    var options = {
        'hostname': this.host, 
        "path":"/" + this.version + path,
        "method": method, 
        "json": true,
        "headers": {
          "Content-Type":"application/json", 
          "Accept": "application/json",
          "Authorization":'Basic ' + this.privateKey + ':x'
        }
    }

    var request = http.request(options, function (response) {
      var responseData = String();

      response.on('data', function (chunk) {
        responseData += chunk
      });
      
      response.on('end', function () {
        callBack(JSON.parse(responseData));
      });
    });

    request.end(params); 
  },

  get: function(path, params, callBack){
    this.request("GET", path, params, callBack);
  },

  put: function(path, params, callBack){
    this.request("PUT", path, params, callBack);
  },

  post: function(path, params, callBack){
    this.request("POST", path, params, callBack);
  },

  createAssessment: function(deckId, callBack){
    this.post("/assessments", '{"deck_id":"' + deckId + '"}', callBack); 
  },

  getAssessment: function(assessmentId, callBack){
    this.get("/assessments/" + assessmentId, String(), callBack); 
  },

  getSlides: function(assessmentId, callBack){
    this.get("/assessments/" + assessmentId + "/slides", String(), callBack); 
  },

  setSlide: function(assessmentId, slideId, params, callBack){
    this.put("/assessments/" + assessmentId + "/slides/" + slideId, params, callBack); 
  },

  getPersonalityTypes: function(assessmentId, callBack){
    this.get("/assessments/" + assessmentId + "/personality_types", String(), callBack); 
  }
};


