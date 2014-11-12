Traitify
=========

A small library providing access to traitify's api

## Installation

```shell
  npm install -g traitify
```

## Usage

#### Config
```js
  var traitify = require('traitify');
  
	traitify.setHost("lvh.me");
	traitify.setVersion("v1");
	traitify.setSecretKey("fakeKey");
```

#### Create Assessment
```js
  var deckId = "Your Deck Id";
  traitify.createAssessment(deckId, function(assessment){
  	// Use assessment here.
  	console.log(assessment);
  });
```

#### Get Assessment
```js
  var assessmentId = "Your Assessment Id";

  traitify.getAssessment(assessmentId, function(assessment){
    // Use assessment here.
    console.log(assessment);
  });
```

#### Get Assessment Slides
```js
  var assessmentId = "Your Assessment Id";

  traitify.getSlides(assessmentId, function(assessment){
    // Use assessment here.
    console.log(assessment);
  });
```

#### Set Assessment Slide
```js
  var assessmentId = "Your Assessment Id";

  traitify.setSlide(assessmentId, {"value":true, response_time: 1000}, function(assessment){
    // Use assessment here.
    console.log(assessment);
  });
```

#### Get Assessment Personality Types
```js
  var assessmentId = "Your Assessment Id";

  traitify.getPersonalityTypes(assessmentId, function(assessment){
    // Use assessment here.
    console.log(assessment);
  });
```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. test your code.

## Release History

* 0.1.0 Initial release
