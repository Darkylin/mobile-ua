var glob = require('glob'),
    _ = require('lodash'),
    path = require('path');

var map = {};

registProcessors('robotProcessor');
registProcessors('uaProcessor');

function registProcessors(dir) {
    glob.sync(dir+'/*.js', {cwd: __dirname})
        .forEach(function (filePath) {
            var processor = require(path.join(__dirname, filePath));
            _.extend(map, processor);
        });
}