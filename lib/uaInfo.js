var alias = require('../resource/uaAlias');

function UAInfo(arg) {
    if (this instanceof UAInfo) {
        return new UAInfo(arg);
    }
    var browser = arg.browser;
    this.browser = browser;//�����UA����
    this.browserName = alias[browser] || browser;//�����ͨ����
    this.browserVersion = arg.browserVersion;//������汾

    this.os = arg.os;//�ֻ�ϵͳ
    this.osVersion = arg.osVersion;//�ֻ�ϵͳ�汾

    this.device = arg.device;//�ֻ�Ʒ��
    this.deviceModel = arg.deviceModel;//�ֻ��ͺ�

    this.isRobot = arg.isRobot;//��UA�ж��ǻ������ʻ�����ʵ�û�����

    this.extInfo = arg.extInfo || {};//������Ϣ
}

var proto = UAInfo.prototype;
proto.isAndroid = function () {
    return this.os == 'android';
};
proto.isIos = function () {
    return this.os == 'ios';
};
proto.isWp = function () {
    return this.os == 'winphone';
};
proto.toString = function () {
    return this.os + '/' + this.osVersion + ' ' +
        this.browserName + '/' + this.browserVersion + ' ' +
        this.device + '/' + this.deviceModel + ' ' +
        JSON.stringify(this.extInfo)
};

module.exports = UAInfo;