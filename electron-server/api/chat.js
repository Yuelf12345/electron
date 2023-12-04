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
    // 更新好友聊天记录
    upDateChat: async (ctx) => {
        const { user_id, friendInfo, chatHistory } = ctx.request.body
        const chat_id = uuid();
        const sender_id = user_id;
        const receiver_id = friendInfo.user_id;
        const chat_message = JSON.stringify(chatHistory);
        const chat_datetime = new Date();
        const created_at = new Date();
        const deleted_at = null;
        const isDel = 1;
        const startTime = new Date().toLocaleDateString('zh-CN')
        const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN');

        // 根据 sender_id,receiver_id 和 created_at 查询今天是否存在聊天记录
        // 可以使用MySQL的DATE()函数将创建时间转换为日期格式，然后使用BETWEEN关键字筛选出在两个日期之间的数据。
        let rs = await db.query("select * from `chats` where `sender_id` =? and `receiver_id` =? and `created_at` between? and? and `isDel` =?", [
            sender_id, receiver_id, startTime, endTime, isDel
        ])
        // 如果聊天记录存在，则更新聊天记录
        if (rs[0].length > 0) {
            console.log('chat_message',chat_message);
            await db.query("update `chats` set `chat_message` =?,`chat_datetime` =? where `sender_id` =? and `receiver_id` =? and `created_at` between? and? and `isDel` =?", [
                chat_message, chat_datetime, sender_id, receiver_id, startTime, endTime, isDel])
        } else {
            // 如果不存在，则插入聊天记录
            await db.query("insert into `chats` (`chat_id`,`sender_id`,`receiver_id`,`chat_message`,`chat_datetime`,`created_at`,`deleted_at`,`isDel`) value (?,?,?,?,?,?,?,?)", [
                chat_id, sender_id, receiver_id, chat_message, chat_datetime, created_at, deleted_at, isDel
            ])
        }
        ctx.body = {
            code: 200,
            success: true,
            msg: '更新成功'
        };
    },

    // 获取好友聊天记录
    getChat: async (ctx) => {
        const { user_id, friendInfo } = ctx.request.body
        const sender_id = user_id;
        const receiver_id = friendInfo.user_id;
        const isDel = 1;
        const startTime = new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN');
        const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN');
        let rs = await db.query("select * from `chats` where `sender_id` =? and `receiver_id` =? and `created_at` between? and? and `isDel` =? ORDER BY created_at ASC", [
            sender_id, receiver_id, startTime, endTime, isDel
        ])
        let chatHistory = rs[0].map(item => {
            let created_at = (item.created_at.getMonth() + 1) + '-' + (item.created_at.getDate() < 10 ? '0' + item.created_at.getDate() : item.created_at.getDate()) + '  ' + item.created_at.getHours() + ':' + item.created_at.getMinutes() + ':' + item.created_at.getSeconds();
            return ({
                chat_message: item.chat_message,
                created_at: created_at,
            })
        });
        console.log('chatHistory', chatHistory);
        if (rs[0].length > 0) {
            ctx.body = {
                code: 200,
                success: true,
                msg: '获取成功',
                data: chatHistory
            }
        } else {
            ctx.body = {
                code: 200,
                success: true,
                msg: '获取成功,无聊天记录',
                data: []
            }
        }
    }
}
module.exports = chat;