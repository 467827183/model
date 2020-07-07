const testConfig={
    COMMONTEXT:'這裏是测试'
}
const proConfig={
    COMMONTEXT:'這裏是正式'
}
module.exports = {
    // 测试打包配置
    "TEST":{
        constant:testConfig,
    },
    // 正式打包配置
    "PRO":{
        constant:proConfig,
    }
}