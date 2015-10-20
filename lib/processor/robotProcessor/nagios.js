//nagios

var reg = /[\d._]*/;
module.exports = {
    nagios: function (ua) {
        return {
            browser: 'nagios',
            browserVersion: reg.exec(ua),
            isRobot: true
        }
    }
};
