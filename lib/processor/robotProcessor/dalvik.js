//Dalvik��Google��˾�Լ��������Androidƽ̨��Java�����
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
