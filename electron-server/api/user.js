const { uuid } = require('../utils/util');
// const db = require('../utils/db.js');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
let db;

~async function () {
    db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'yChats',
    })
}()

console.log('db', db);
const user = {
    // 刷新token
    refreshToken: async (ctx) => {
        const token = ctx.header.authorization.replace('Bearer ', '');
        try {
            decoded = jwt.verify(token, 'yCharts');
            console.log('decoded', decoded);
            const expirationDate = decoded.exp;
            const username = decoded.username;
            const now = new Date() / 1000;
            const timedeltaDate = expirationDate - now;
            if (timedeltaDate < 0) {
                console.log('refreshtoken失效');
                ctx.body = {
                    code: 401,
                    msg: 'refreshtoken失效'
                }
                return;
            } else {
                console.log('refreshtoken 距离过期', timedeltaDate / 60 / 60, 'h');
                ctx.body = {
                    code: 200,
                    msg: 'refreshtoken有效,刷新成功',
                    token: jwt.sign({ username: username }, 'yCharts', { expiresIn: 10 * 60 * 1000 }),
                }
            }
        } catch (error) {
            ctx.body = {
                code: 401,
                msg: 'refreshtoken失效'
            }
        }
    },
    // 注册
    userRegister: async (ctx) => {
        const { username, password } = ctx.request.body
        const user_id = uuid();
        const nickname = username;
        const gender = 1;
        const birthday = new Date();
        const avatar = `/img/default_avatar/avatar${Math.floor(Math.random() * 10)}.webp`;
        const friends = JSON.stringify([]);
        const blacklist = JSON.stringify([]);
        const applicationlist = JSON.stringify([]);
        const rejectlist = JSON.stringify([]);
        const loginTime = new Date();
        const lastLoginTime = new Date();
        const created_at = new Date();
        try {
            await db.query("insert into `users` (`user_id`,`username`,`password`,`nickname`,`gender`,`birthday`,`avatar`,`friends`,`blacklist`,`applicationlist`,`rejectlist`,`loginTime`,`lastLoginTime`,`created_at`) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                user_id, username, password, nickname, gender, birthday, avatar, friends, blacklist, applicationlist, rejectlist, loginTime, lastLoginTime, created_at,
            ])
            ctx.status = 200
            ctx.body = {
                code: 200,
                success: true,
                msg: '注册成功',
            }
        } catch (error) {
            ctx.status = 400
            ctx.body = {
                code: 200,
                success: false,
                msg: error,
            }
        }
    },
    // 用户登录
    userLogin: async (ctx) => {
        const { username, password } = ctx.request.body
        try {
            let rs = await db.query("select * from users where username =?", [username]);
            if (rs[0].length > 0) {
                let res
                for (let i = 0; i < rs[0].length; i++) {
                    const user = rs[0][i];
                    if (user.password == password) {
                        res = {
                            code: 200,
                            success: true,
                            msg: '登录成功',
                            data: {
                                ...user,
                                token: jwt.sign({ username: user.username }, 'yCharts', { expiresIn: 10 * 60 * 1000 }),
                                refresh_token: jwt.sign({ username: user.username }, 'yCharts', { expiresIn: '24h' })
                            }
                        };
                        found = true;
                        break; // 跳出循环
                    } else {
                        res = {
                            code: 204,
                            success: false,
                            msg: '密码错误',
                        };
                    }
                }
                ctx.body = res;
            } else {
                ctx.body = {
                    code: 202,
                    success: false,
                    msg: '用户不存在',
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    // 添加好友
    addFriends: async (ctx) => {
        ctx.body = '好友添加';
        const friend_id = 'zhansan_wangwu';
        const user_id = 'zhangsan_user_id';
        const friends_id = 'wangwu_user_id';
        const friend_nickname = '王五';
        const friend_avatar = '123456';
        const created_at = new Date();
        let rs = await db.query("insert into `friends` (`friend_id`,`user_id`,`friends_id`,`friend_nickname`,`friend_avatar`,`created_at`) value (?,?,?,?,?,?)", [
            friend_id, user_id, friends_id, friend_nickname, friend_avatar, created_at,
        ])
    },
    // 删除好友
    deleteFriends: async (ctx) => {
        ctx.body = '好友删除';
        const friend_id = 'zhansan_wangwu';
        const user_id = 'zhangsan_user_id';
        let rs = await db.query("delete from friends where friend_id =? and user_id =?", [friend_id, user_id]);
    },
    // 获取好友列表
    getFriends: async (ctx) => {
        const { user_id } = ctx.request.body
        console.log('user_id', user_id);
        // select u2.* f.created_at
        let rs = await db.query("select u2.* from users u1 JOIN friends f ON u1.user_id = f.user_id JOIN users u2 ON f.friends_id = u2.user_id where u1.user_id =?", [user_id]);
        ctx.body = {
            code: 200,
            success: true,
            msg: '获取好友列表成功',
            data: rs[0]
        }
    }
}
module.exports = user;