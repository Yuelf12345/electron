const Koa = require('koa');
const Router = require('koa-router');
const KoaStatic = require('koa-static');
const {koaBody} = require('koa-body');
const User = require('./api/user')
const checkToken = require('./middleware/checkToken')
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
router.get('/getFriends', User.getFriends)
router.post('/addChat', User.addChat)
router.get('/getChat', User.getChat)

app.listen(3000, () => {
    console.log('服务器已启动请访问 http://localhost:3000/')
})