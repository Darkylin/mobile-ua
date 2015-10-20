//Java/1.7.0_09

var reg = /[\d._]*/;
module.exports = {
    Java: function (ua) {
        return {
            browser: 'java',
            browserVersion: reg.exec(ua),
            isRobot: true
        }
    }
};