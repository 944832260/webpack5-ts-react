const proxy = [
    {
        path: [],
        target: 'http://tc-dev-gateway.dhwy.cn',
        isDevelop: false,
    },//研发环境
];

module.exports = {
    ip: '0.0.0.0',
    port: 9001,
    proxy
};