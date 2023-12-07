const http = require('http');
const socketIo = require('socket.io');
const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const {koaBody} = require('koa-body');
const cors = require('koa2-cors')  
const User = require('./api/user')
const Chat = require('./api/chat')
const checkToken = require('./middleware/checkToken')

const ioMiddleware = require('./middleware/socket')

// const mysql = require('mysql2/promise');

// let db;

// ~async function(){
//     db = await mysql.createConnection({
//         host:'localhost',
//         user:'root',
//         password:'123456',
//         database:'yChats',
//     })
// }()

// console.log('db',db);

const app = new Koa();
const router = new Router();
// app.use(cors({
//     origin: '*',    // 前端地址
//     credentials: true
// }));
app.use(checkToken)
app.use(koaBody());
app.use(KoaStatic(__dirname + '/public'));
app.use(router.routes());

router.get('/',ctx=>{
    ctx.body = `<h1>Hello World</h1>`
})
router.get('/refresh_token',User.refreshToken)
// 注册
router.post('/register', User.userRegister)
router.post('/login', User.userLogin)
router.post('/addFriends', User.addFriends)
router.post('/getFriends', User.getFriends)

// 聊天
router.post('/upDateChat', Chat.upDateChat)
router.post('/getChat', Chat.getChat)
router.post('/getAllChat', Chat.getAllChat)


// 使用app.callback()来处理请求,不然报错 （索引）:1 Uncaught (in promise) undefined
const server =  http.createServer(app.callback())
let io = socketIo(server,{ cors: true })
ioMiddleware(io)

server.listen(3000, () => {
    console.log('服务器已启动请访问 http://localhost:3000/')
})