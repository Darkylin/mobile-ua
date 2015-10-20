//Dalvik是Google公司自己设计用于Android平台的Java虚拟机
//Dalvik/1.6.0 (Linux; U; Android 4.1.1; MI 2A MIUI/JLB54.0)

var reg = /Dalvik\/([^ ]+)/;
module.exports = {
    Dalvik: function (ua) {
        var ver = reg.exec(ua);
        return {
            browser: 'dalvik',
            browserVersion: ver && ver[1],
            isRobot: true
        }
    }
};
