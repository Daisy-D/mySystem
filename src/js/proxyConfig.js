let proxyUrl = "http://101.200.233.12:8076"
module.exports = {
    name: "mooc后台",
    proxyTable: {
        "/tkExamine": {
            target: 'http://testdemo.xfcampus.com',
            pathRewrite: {
                "^/tkExamine": "/tkExamine"
            }
        },
        '/course': {
            target: proxyUrl,
            pathRewrite: {
                "^/course": "/course"
            }
        },
        '/background': {
            target: proxyUrl,
            pathRewrite: {
                "^/background": "/background"
            }
        },
        '/statisticsCtrl': {
            target: proxyUrl,
            pathRewrite: {
                "^/statisticsCtrl": "/statisticsCtrl"
            }
        },
        '/finance': {
            target: proxyUrl,
            pathRewrite: {
                "^/finance": "/finance"
            }
        },
        '/userManage': {
            target: proxyUrl,
            pathRewrite: {
                "^/userManage": "/userManage"
            }
        },
        '/discuss':{
            target: proxyUrl,
            pathRewrite: {
                "^/discuss": "/discuss"
            }
        }

    }
}
