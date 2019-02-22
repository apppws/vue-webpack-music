// 检查NodeJS和npm的版本
require('./check-versions')()
    // 获取配置
var config = require('../config')
    // 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// 一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var axios = require('axios')
    // 一个express中间件，用于将http请求代理到其他服务器
    // 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
    // 这里使用该插件可以将前端开发中涉及到的请求代理到API服务器上，方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./webpack.prod.conf') :
    require('./webpack.dev.conf')

// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
var port = process.env.PORT || config.dev.port
    // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
    // 定义 HTTP 代理表，代理到 API 服务器
var proxyTable = config.dev.proxyTable
    // 创建1个 express 实例
var app = express()
    // 根据webpack配置文件创建Compiler对象
var compiler = webpack(webpackConfig)

//  抓取qq音乐推荐歌单列表 后端代理 设置headers
var apiRoutes = express.Router()
apiRoutes.get('/getDiscList', function(req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
apiRoutes.get('/lyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(response => {
        var ret = response.data
        if (typeof ret === 'string') {
            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch(error => {
        console.log(error)
    })
})

apiRoutes.get('/getSongList', function(req, res) {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        var ret = response.data
            // 返回的是JSONP格式的话
        if (typeof ret === 'string') {
            var reg = /^\w+\(({.+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })

})


app.use('/api', apiRoutes)
    // webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
    // 编译绑定后将得到的产物存放在内存中而没有写进磁盘
    // 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    })
    // webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {}
    })
    // 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载s
compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })
    // 将 proxyTable 中的代理请求配置挂在到express服务器上
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 重定向不存在的URL，常用于SPA
app.use(require('connect-history-api-fallback')())

// 使用webpack开发中间件
// 即将webpack编译后输出到内存中的文件资源挂到express服务器上
app.use(devMiddleware)

// 将热重载中间件挂在到express服务器上
app.use(hotMiddleware)

// 静态资源的路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
    // 将静态资源挂到express服务器上
app.use(staticPath, express.static('./static'))
    // 应用的地址信息，例如：http://localhost:8080
var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})

console.log('> Starting dev server...')
    // webpack开发中间件合法（valid）之后输出提示语到控制台，表明服务器已启动
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
        // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
})

var server = app.listen(port)
    // 启动express服务器并监听相应的端口（8080）
module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
}
