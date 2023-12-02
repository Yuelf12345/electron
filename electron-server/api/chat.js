const { uuid } = require('../utils/util');
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
const chat = {
    // 添加好友聊天记录
    addChat: async (ctx) => {
        const { user_id ,friendInfo,chatHistory} = ctx.request.body
        const chat_id = uuid();
        const sender_id = user_id;
        const receiver_id = friendInfo.user_id;
        const chat_message = JSON.stringify(chatHistory);
        const chat_datetime = new Date();
        const created_at = new Date();
        const deleted_at = new Date();
        const isDel = 1;
        console.log('00000000000',sender_id,receiver_id);
        let rs = await db.query("insert into `chats` (`chat_id`,`sender_id`,`receiver_id`,`chat_message`,`chat_datetime`,`created_at`,`deleted_at`,`isDel`) value (?,?,?,?,?,?,?,?)", [
            chat_id, sender_id, receiver_id, chat_message, chat_datetime, created_at, deleted_at, isDel,
        ])
        ctx.body = '聊天';
    },
    // 保存好友聊天记录
    saveChat: async (ctx) => {
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
module.exports = chat;