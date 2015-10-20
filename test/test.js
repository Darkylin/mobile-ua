var fs = require('fs'),
    UA = require('../index.js');

var log = fs.readFileSync('./access.uniq.log', {encoding: 'utf8'});


log.split('\n').forEach(function (str) {
    var uaInfo = UA(str);
    if (uaInfo.status < 0) {
        console.log(str);
    }
})
