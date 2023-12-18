const { app, BrowserWindow, Menu } = require('electron');
const path = require("path");
const { createTray } = require('./utils/tray');
const mainMenu = require('./utils/menu');
const dialog = require('./utils/dialog');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            // preload: path.join(__dirname, './preload.js'),
        }
    })
    // win.loadFile(path.join(__dirname, "./dist/index.html")) ;
    win.loadURL('http://localhost:5173/#/login')
    // win.webContents.openDevTools();
    createTray(app, win);
    // 设置全局菜单 写成函数形式传递参数
    Menu.setApplicationMenu(mainMenu('我的消息', (args) => {
        console.log(args);
    }));

    // 右键
    win.webContents.on("context-menu", (e, params) => {
        // 打开文件夹
        // dialog.openDialog()
        // 保存文件
        // dialog.showSaveDialog()
        // 自定义
        dialog.showMessageBox()
    })

}


app.commandLine.appendSwitch('no-sandbox')
app.whenReady().then(createWindow)