'use strict';

const path = require('path');
const spawn = require('cross-spawn');
const child_process = require('child_process');

const _ = require('./helper');

const checkEnv = options => {
  return new Promise((resolve, reject) => {

    if (_.platform.isWindows) {

      if (process.env.GRADLE_HOME) {
        options.gradle = 'gradle';
        resolve(options);
      } else {
        reject('please install gradle');
      }
    } else {
      try {
        const res = child_process.execSync('which gradle');
        options.gradle = res.toString().trim();
        resolve(options);
      } catch (e) {
        reject('please install gradle');
      }
    }
  });
};

const gradleBuild = options => {
  return new Promise((resolve, reject) => {
    var cwd = path.resolve(options.cwd);

    try {
      var gradleProcess = spawn.sync(options.gradle, options.args || ['assembleDebug'], {
        cwd: cwd
      });
      const str = gradleProcess.output.toString();

      if (/BUILD\s+FAILED/.test(str.trim())) {
        reject(str);
      } else {
        resolve(str);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = options => {
  return checkEnv(options)
    .then(gradleBuild);
};
