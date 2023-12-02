const userList = [];
let socketList = {};

const ioMiddleware = async (io) => {
    io.on('connection', (socket) => {
        console.log('连接成功');

        socket.on("onLine", (userId) => {
            console.log('onLine', userId,socket.id);
            socketList[userId] = socket.id;
        });

        socket.on('sendMsg', (data) => {
            console.log('data',data);
            socket.to(socketList[data.receiver]).emit('receiveMsg', data.msg)
        })

      
        // // 当有新用户连接时，将其分配到对应的轨道上
        // socket.on("join", ({ user_id }) => {
        //     roomid = user_id;
        //     console.log(roomid, "进入房间");
        //     socket.join(roomid);
        //     io.in(roomid).emit("say", `${user_id}加入了`);
        // });

        // // 当用户1发送消息时，将其发送到对应用户的轨道上
        // socket.on('message', (msg) => {
        //     console.log('发送消息', msg);
        //     io.to(roomid).emit('message', msg);
        // });

        // // 通过房间号发送消息
        // socket.on("sendMsgByRoom", ({ user_id, msg }) => {
        //     console.log("通过房间号发送消息", user_id, msg);
        //     io.in(user_id).emit("receiveMsg", msg, socket.id);
        // });

        // // 当用户断开连接时，将其从所在轨道上移除
        // socket.on('disconnect', () => {
        //     console.log('移除轨道', roomid);
        //     socket.leave(roomid);
        // });
    });
};

module.exports = ioMiddleware;