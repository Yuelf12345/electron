import io from 'socket.io-client'
const socket = io('http://127.0.0.1:3000', {
    query: {},
    transports: ['websocket', 'polling'],
    timeout: 5000,
})

export default socket


// 连接
export const connect = async (user_id: string) => {
    await socket.on('connect', () => {
        console.log('连接成功', user_id);
    });
    let res = await socket.emit("onLine", user_id);
    return res
}

interface PrivatMsg {
    sender: string,
    receiver: string,
    msg: string,
}
export const privatMsg = (data: PrivatMsg) => {
    socket.emit('sendPrivateMsg', data);
}