import originJSONP from 'jsonp'   //原始jsonp 

// 向外暴露一个jsonp 
export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    // 返回一个回调函数 
    return new Promise((resolve, reject) => {
        //   调用原始jsonp 数据
        originJSONP(url, option, (err, data) => {
            // 如果err 为空成功返回数据  
            if (!err) {
                resolve(data)
                // 否则错误
            } else {
                reject(err)
            }
        })
    })
}

// 合并url
function param(data) {
    let url = ''
    // 如果url有值 value 就等于 key对应的 value 
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        // url拼接
        url += `&${k}=${encodeURIComponent(value)}`
    }
    //   返回输出一个url
    return url ? url.substring(1) : ''
}
