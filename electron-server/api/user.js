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
                    token: jwt.sign({ username: username }, 'yCharts', { expiresIn: 10*60*1000 }),
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
        const avatar = `/img/default_avatar/avatar${Math.floor(Math.random() * 10) + 1}.webp`;
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
                                token: jwt.sign({ username: user.username }, 'yCharts', { expiresIn: 10*60*1000 }),
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
        const user_id = 'zhangsan_user_id';
        let rs = await db.query("select friends_id,friend_nickname,friend_avatar from friends where user_id =?", [user_id]);
        console.log(rs);
        ctx.body = JSON.stringify(rs[0]);
    },
    // 添加好友聊天记录
    addChat: async (ctx) => {
        const chat_id = 'zhangsan_to_lisi';
        const sender_id = 'zhangsan_user_id';
        const receiver_id = 'lisi_user_id';
        const chat_message = '[{"sender_id":"zhangsan_user_id","chat_message":"你好"},{"receiver_id":"lisi_user_id","chat_message":"你好你吗"}]';
        const chat_datetime = new Date();
        const created_at = new Date();
        const deleted_at = new Date();
        const isDel = 1;
        let rs = await db.query("insert into `chats` (`chat_id`,`sender_id`,`receiver_id`,`chat_message`,`chat_datetime`,`created_at`,`deleted_at`,`isDel`) value (?,?,?,?,?,?,?,?)", [
            chat_id, sender_id, receiver_id, chat_message, chat_datetime, created_at, deleted_at, isDel,
        ])
        ctx.body = '聊天';
    },
    // 获取好友聊天记录
    getChat: async (ctx) => {
        const sender_id = 'zhangsan_user_id';
        const receiver_id = 'lisi_user_id';
        let rs = await db.query("select * from chats where sender_id =? and receiver_id =? and isDel = 1 order by chat_datetime desc", [sender_id, receiver_id]);
        if (rs[0].length > 0) {
            ctx.body = re[0].chat_message
        } else {
            ctx.body = '无记录'
        }
    }
}
module.exports = user;