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

  secretKey: "secretKey",
  setSecretKey: function(secretKey){
    this.secretKey = secretKey;
    this.privateKey = secretKey;
  },

  privateKey: "secretKey",
  setPrivateKey: function(secretKey){
    this.secretKey = secretKey;
    this.privateKey = secretKey;
  },

  request: function(method, path, params, callBack){
    var http = require('https');

    var options = {
        'hostname': this.host,
        "path":"/" + this.version + path,
        "method": method,
        "json": true,
        "headers": {
          "Content-Type":"application/json",
          "Accept": "application/json",
          "Authorization":'Basic ' + this.secretKey + ':x'
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
  },

  getPersonalityTraits: function(assessmentId, callBack){
    this.get("/assessments/" + assessmentId + "/personality_traits", String(), callBack);
  },

  getCareerMatches: function(assessmentId, params, callBack){
    var url = "/assessments/" + assessmentId + "/matches/careers?x=1"

    url = this.appendParams(url, params);

    this.get(url, String(), callBack);
  },

  getResults: function(assessmentId, data, params, callBack){
    var url = "/assessments/" + assessmentId + "?x=1"

    if(data != undefined){
      url += "&data=" + data.join(",");
    }

    url = this.appendParams(url, params);

    this.get(url, String(), callBack);
  },

  appendParams: function(url, params){
    if(params["imagePack"] != undefined){
      url += "&image_pack=" + params["imagePack"];
    }
    if(params["numberOfMatches"] != undefined){
      url += "&number_of_matches=" + params["numberOfMatches"];
    }
    if(params["experienceLevels"] != undefined){
      url += "&experience_levels=" + params["experienceLevels"];
    }
    return url;
  }
};


