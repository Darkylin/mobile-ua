var SPLIT_REG = /.*\(([^)]+)\) ([^)]+\)( *Version\/[\d.]+)?)[; ]*(\b.+)/,
    UA_HEADER_REG = /^[a-zA-Z\-]+/;

// 注意搜索引擎爬虫及OPS的处理
var CRAWLER_HEADER_LIST = [
    'Apache-HttpClient',
    'Dalvik',
    'nagios',//网络监视工具，小心不要误杀
    'spider-ads',
    'Java'
];

var uaHeaderProcessors = {
    // 富可视 http://www.infocus.com.cn/
    InFocus: function (ua) {
        return {
            status: 0,
            browserName: 'InFocus',
            os: '',
            phone: 'InFocus'
        }
    },
    // 波导手机
    Bird: uaHeaderBird,
    'Bird-L108': uaHeaderBird
}
function uaHeaderBird(ua) {
    return {
        status: 0,
        browserName: 'bird'
    }
}
//添加所有爬虫（模拟器）UA头处理函数
CRAWLER_HEADER_LIST.forEach(function (crawlerName) {
    uaHeaderProcessors[crawlerName] = function () {
        return {
            status: 1,
            browserName: crawlerName
        }
    }
});

var UA_TXT_REG = /Googlebot/;
//上面是针对UA头进行处理，如果失败再试试针对整个UA字符串进行判断
function uaTxtProcessor(ua) {
    var regResult = UA_TXT_REG.exec(ua);
    if (!regResult) {
        return null;
    }
    return {
        status: 1,
        browserName: regResult
    }
}
/**
 *
 * @param ua
 * @returns {
 *      status:[int] 负数代表解析失败，0代表普通浏览器，1代表模拟器
 *      browser:[string] 浏览器名称，这个是该浏览器通俗叫法，比如微信(wechat)，新浪微博(weibo)，解析失败或模拟器等为undefined
 *      browserName:[string] 浏览器名称，这个是UA中的名称
 * }
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

var testUa = 'Apache-HttpClient/4.0.1 (java 1.5)';
console.dir(analyze(testUa))