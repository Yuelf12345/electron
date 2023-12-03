const jwt = require('jsonwebtoken');

const checkToken = async (ctx, next) => {
    if (!ctx.url.includes('/avatar') &&!ctx.url.includes('/login')  && ctx.header.authorization != undefined) {
        let token = ctx.header.authorization.replace('Bearer ', '')
        console.log('请求头是否携带token', token);
        if (token !== 'null') {
            try {
                console.log('请求接口', ctx.url);
                decoded = jwt.verify(token, 'yCharts');
                const expirationDate = decoded.exp;
                const now = new Date() / 1000;
                const timedeltaDate = expirationDate - now;
                if (timedeltaDate < 0) { // 30 minutes
                    console.log('Token 过期', timedeltaDate * 60 * 1000);
                    ctx.body = {
                        code: 401,
                        msg: 'Token 过期'
                    }
                    return;
                } else {
                    console.log('Token 距离过期', timedeltaDate/60/60,'h');
                }
            } catch (error) {
                console.log('过期了', error);
                ctx.body = {
                    code: 401,
                    msg: 'Token 过期'
                }
                return;
            }
        }else{
            console.log('没有携带token',token);
            ctx.body = {
                code: 401,
                msg: '未登录'
            }
            return
        }
    }
    await next();
}

module.exports = checkToken;