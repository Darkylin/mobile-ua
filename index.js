var SPLIT_REG = /.*\(([^)]+)\) ([^)]+\)( *Version\/[\d.]+)?)[; ]*(\b.+)/,
    UA_HEADER_REG = /^[a-zA-Z\-]+/;

/**
 *
 * @param ua
 * @returns
 *      status : [int] 负数代表解析失败，0代表普通浏览器，1代表模拟器
 *      browser : [string] 浏览器名称，这个是该浏览器通俗叫法，比如微信(wechat)，新浪微博(weibo)，解析失败或模拟器等为undefined
 *      browserName : [string] 浏览器名称，这个是UA中的名称
 *
 */
function analyze(ua) {
    var splitResult = SPLIT_REG.exec(ua);
    // 广义上的正常UA
    if (splitResult) {
        return {
            systemInfo: splitResult[1],
            browserPlatform: splitResult[2],
            browserInfo: splitResult[4],
            source: ua,
            status: 0
        }
    } else {
        // 获取UA头
        var header = UA_HEADER_REG.exec(ua), processor;
        // 如果ua开头为数字或特殊字符，认为解析失败
        if (!header || !(processor = uaHeaderProcessors[header])) {
            return uaTxtProcessor(ua) || {
                    source: ua,
                    status: -1,
                    msg: 'unknown'
                }
        }
        return processor(ua);
    }
}
module.exports = analyze;

var testUa = 'Mozilla/5.0 (Linux; U; Android 4.2.2; zh-cn; 2014011 Build/HM2014011) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025469 Mobile Safari/533.1 MicroMessenger/6.2.5.54_re87237d.622 NetType/WIFI Language/zh_CN';
console.dir(analyze(testUa))