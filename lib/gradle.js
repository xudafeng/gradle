'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('win-spawn');

const _ = require('./helper');

const checkEnv = cwd => {
  return new Promise((resolve, reject) => {
    _.exec(`which gradle`).then(gradle => {
      resolve({
        gradle: gradle,
        cwd: cwd
      });
    });
  });
};

const gradleBuild = data => {
  return new Promise((resolve, reject) => {
    var gradleProcess = spawn(data.gradle, ['assembleDebug'], {
      cwd: data.cwd
    });

    gradleProcess.on('error', function(err) {
      reject(err);
    });

    gradleProcess.stdout.setEncoding('utf8');
    gradleProcess.stderr.setEncoding('utf8');

    gradleProcess.stdout.on('data', function(data) {
      console.log(data.trim());
    });

    gradleProcess.stderr.on('data', function(data) {
      console.log(data.trim());
    });

    gradleProcess.on('exit', function(code) {
      if (code !== 0) {
        reject(new Error('build failed'));
      } else {
        resolve('build success!');
      }
    });
  });
};

module.exports = options => {
  var cwd = path.resolve(options.cwd);
  return checkEnv(cwd).then(gradleBuild);
};
