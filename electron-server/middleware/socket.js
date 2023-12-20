const userList = [];
let socketList = {};// {user_id:socket_id}

const ioMiddleware = async (io) => {
    io.on('connection', (socket) => {
        console.log('连接成功');
       socket.on("onLine", (userId) => {
            console.log('onLine', userId, socket.id);
            socketList[userId] = socket.id;
            console.log('socketList',socketList);
        });
        socket.on('sendPrivateMsg',async (data) => {
            console.log('data11111', data,socketList,socketList[data.receiver]);
            await socket.to(socketList[data.receiver]).emit('receiveMsg', data)
        })
        socket.on('disconnect', (userId) => {
            delete  socketList[userId]
            console.log('disconnect', userId, socket.id);
        })
    });
};

module.exports = ioMiddleware;