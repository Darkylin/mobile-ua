//Apache-HttpClient/4.0.1 (java 1.5)

var reg = /Apache-HttpClient\/([^ ]+)/,
    vmReg = /\([^)]+\)/;

module.exports = {
    'Apache-HttpClient': function (ua) {
        var ver = reg.exec(ua),
            vm = vmReg.exec(ua);
        return {
            browser: 'apacheHttpClient',
            browserVersion: ver && ver[1],
            isRobot: true,
            extInfo: {
                vm: vm
            }
        }
    }
};