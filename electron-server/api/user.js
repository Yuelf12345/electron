// const db = require('../utils/db.js');
const mysql = require('mysql2/promise');

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
    // 注册
    userRegister: async (ctx) => {
        ctx.body = '注册成功'
        const user_id = 'wangwu_user_id';
        const username = '王五';
        const password = '123456';  // jwt加密
        const nickname = '隔壁老张';
        const gender = 1;
        const birthday = new Date();
        const avatar = '123456';
        const friends = JSON.stringify(['1111', '22222222', '3333']);
        const blacklist = JSON.stringify(['1111', '22222222', '3333']);
        const applicationlist = JSON.stringify(['1111', '22222222', '3333']);
        const rejectlist = JSON.stringify(['1111', '22222222', '3333']);
        const loginTime = new Date();
        const lastLoginTime = new Date();
        const created_at = new Date();
        let rs = await db.query("insert into `users` (`user_id`,`username`,`password`,`nickname`,`gender`,`birthday`,`avatar`,`friends`,`blacklist`,`applicationlist`,`rejectlist`,`loginTime`,`lastLoginTime`,`created_at`) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            user_id, username, password, nickname, gender, birthday, avatar, friends, blacklist, applicationlist, rejectlist, loginTime, lastLoginTime, created_at,
        ])
    },
    // 用户登录
    userLogin: async (ctx) => {
        // const user_id = 'wangwu_user_id';
        const username = '王五';
        const password = '123456'; // 加密
        let rs = await db.query("select * from users where username =? and password =?", [username, password]);
        if (rs[0].length > 0) {
            ctx.body = '登录成功'
        } else {
            ctx.body = '登录失败'
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