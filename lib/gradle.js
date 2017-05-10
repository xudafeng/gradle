'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require('win-spawn');

const _ = require('./helper');

const checkEnv = options => {
  return new Promise((resolve, reject) => {
    _.exec(`which gradle`).then(gradle => {
      options.gradle = gradle;
      resolve(options);
    });
  });
};

const gradleBuild = options => {
  return new Promise((resolve, reject) => {
    var cwd = path.resolve(options.cwd);
    var gradleProcess = spawn(options.gradle, options.args || ['assembleDebug'], {
      cwd: cwd
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
  return checkEnv(options)
    .then(gradleBuild);
};
