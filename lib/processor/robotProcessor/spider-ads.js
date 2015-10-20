// spider-ads

var reg = /[\d._]*/;
module.exports = {
    'spider-ads': function (ua) {
        return {
            browser: 'spiderAds',
            browserVersion: reg.exec(ua),
            isRobot: true
        }
    }
};