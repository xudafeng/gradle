'use strict';

const gradle = require('..');
const assert = require('assert');

describe('test', () => {
  it('should be ok', () => {
    assert.ok(gradle);
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

