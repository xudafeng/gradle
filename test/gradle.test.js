'use strict';

const gradle = require('..');
const assert = require('assert');

describe('test', function() {
  it('should be ok', function() {
    gradle({
      cwd: process.cwd()
    })
      .then(d => {
        console.log(d);
      })
      .catch(e => {
        console.log(e);
      });
  });
});

