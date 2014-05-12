Traitify
=========

A small library providing access to traitify's api

## Installation

```shell
  npm install traitify -g
```

## Usage

```js
  var traitify = require('traitify');
  var config = {
  	host:"lvh.me",
  	version:"v1",
  	privateKey:"fakeKey",
    deckId:"fakeDeckId"
  };

  traitify.createAssessment(options, function(assessment){
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
