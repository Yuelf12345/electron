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
        socket.on('sendPrivateMsg', (data) => {
            console.log('data', data);
            socket.to(socketList[data.receiver]).emit('receiveMsg', data)
        })
    });
};

module.exports = ioMiddleware;