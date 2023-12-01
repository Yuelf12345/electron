const jwt = require('jsonwebtoken');

const checkToken = async (ctx, next) => {
    console.log('ctx', ctx.url);
    if (!ctx.url.includes('/avatar')) {
        let token = ctx.header.authorization.replace('Bearer ', '')
        console.log('token', token, token == 'null');
        if (token !== 'null') {
            try {
                console.log('ctx', ctx.url);
                decoded = jwt.verify(token, 'yCharts');
                console.log('decoded', decoded);
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
                    // console.log('Token 距离过期', timedeltaDate/60/60,'h');
                //    return;
                }
            } catch (error) {
                console.log('jwt', jwt);
                console.log('过期了', error);
                ctx.body = {
                    code: 401,
                    msg: 'Token 过期'
                }
                return;
            }
        }
    }
    await next();
}

module.exports = checkToken;