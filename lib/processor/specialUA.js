/**
 * 根据关键字给出对应的处理方案
 */

// 注意搜索引擎爬虫及OPS的处理
var CRAWLER_KEYWORD_LIST = [
    'Apache-HttpClient',
    'Dalvik',
    'nagios',//网络监视工具，小心不要误杀
    'spider-ads',
    'Java'
];

var processors = {
    // 富可视 http://www.infocus.com.cn/
    InFocus: infocus,
    // 波导手机
    Bird: bird,
    'Bird-L108': bird
};


//添加所有爬虫（模拟器）UA头处理函数
CRAWLER_KEYWORD_LIST.forEach(function (crawlerName) {
    processors[crawlerName] = function () {
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
//尝试从特殊UA中取出关键字，方便确认具体处理器
function getKeyword(ua) {

}
module.exports = function (ua) {
    var keyword = getKeyword(ua);
};


// 波导手机
function bird(ua) {
    return {
        status: 0,
        browserName: 'bird'
    }
}
