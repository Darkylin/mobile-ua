/**
 * ���ݹؼ��ָ�����Ӧ�Ĵ�����
 */

// ע�������������漰OPS�Ĵ���
var CRAWLER_KEYWORD_LIST = [
    'Apache-HttpClient',
    'Dalvik',
    'nagios',//������ӹ��ߣ�С�Ĳ�Ҫ��ɱ
    'spider-ads',
    'Java'
];

var processors = {
    // ������ http://www.infocus.com.cn/
    InFocus: infocus,
    // �����ֻ�
    Bird: bird,
    'Bird-L108': bird
};


//����������棨ģ������UAͷ������
CRAWLER_KEYWORD_LIST.forEach(function (crawlerName) {
    processors[crawlerName] = function () {
        return {
            status: 1,
            browserName: crawlerName
        }
    }
});

var UA_TXT_REG = /Googlebot/;
//���������UAͷ���д������ʧ���������������UA�ַ��������ж�
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
//���Դ�����UA��ȡ���ؼ��֣�����ȷ�Ͼ��崦����
function getKeyword(ua) {

}
module.exports = function (ua) {
    var keyword = getKeyword(ua);
};


// �����ֻ�
function bird(ua) {
    return {
        status: 0,
        browserName: 'bird'
    }
}
