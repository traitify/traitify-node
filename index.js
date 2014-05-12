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

  createAssessment: function(params, callBack){
    var http = require('http');

    var options = {
        'hostname': params["host"], 
        "path":"/" + params["version"] + "/assessments",
        "method":"POST", 
        "json": true,
        "headers": {
          "Content-Type":"application/json", 
          "Accept": "application/json",
          "Authorization":'Basic ' + params["privateKey"] + ':x'
        }
    }

    var request = http.request(options, function (response) {
      response.on('data', function (chunk) {
        return callBack(JSON.parse(chunk));
      });
    });

    request.end('{"deck_id":"' + params["deckId"] + '"}'); 
  }
};


