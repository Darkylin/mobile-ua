var alias = require('../resource/uaAlias');

function UAInfo(arg) {
    if (this instanceof UAInfo) {
        return new UAInfo(arg);
    }
    var browser = arg.browser;
    this.browser = browser;//浏览器UA用名
    this.browserName = alias[browser] || browser;//浏览器通用名
    this.browserVersion = arg.browserVersion;//浏览器版本

    this.os = arg.os;//手机系统
    this.osVersion = arg.osVersion;//手机系统版本

    this.device = arg.device;//手机品牌
    this.deviceModel = arg.deviceModel;//手机型号

    this.isRobot = arg.isRobot;//由UA判断是机器访问还是真实用户访问

    this.extInfo = arg.extInfo || {};//其他信息
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