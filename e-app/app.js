const { app, BrowserWindow, ipcMain, dialog, globalShortcut, Menu, desktopCapturer } = require('electron');
const WinState = require('electron-window-state');
const path = require('path');
const mainMenu = require('./mainMenu')
const { createTray } = require('./tray')
// 右键菜单
const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Copy',
        click: () => {
            console.log('copy')
        }
    },
    {
        label: 'Paste',
        click: () => {
            console.log('paste')
        }
    },
    {
        label: 'Cut',
        click: () => {
            console.log('cut')
        }
    }])

app.commandLine.appendSwitch('no-sandbox')
const createWindow = () => {
    console.log('ready');
    const winState = new WinState({
        defaultWidth: 800,
        defaultHeight: 600,
    });
    const win = new BrowserWindow({

        width: winState.width,
        height: winState.height,
        x: winState.x,
        y: winState.y,

        // width:800,
        // height: 600,
        // x: 100,
        // y: 100,
        show: false, // 隐藏窗口
        // frame: false,   // 无边框
        // backgroundColor: '#6435c9', // 背景颜色
        // titleBarStyle: 'true',    // 隐藏标题栏
        // resizable: false, // 禁止改变窗口大小
        // fullscreen: true, // 全屏
        // fullscreenable: false, // 禁止全屏
        // movable: false, // 禁止拖动
        // minimizable: false, // 禁止最小化
        // maximizable: false, // 禁止最大化
        webPreferences: {
            // 渲染进程
            // nodeIntegration: true,
            // contextIsolation: false,
            // 预加载
            preload: path.join(__dirname, './preload.js'),
        },
    });

    win.loadFile('./index.html');
    // win.loadURL('https://github.com/')

    // 打开调试工具
    // win.webContents.openDevTools();
    // 加载完成
    win.webContents.on('did-finish-load', () => {
        console.log('finish')
    })
    win.webContents.on('dom-ready', () => {
        console.log('dom-ready')
    })

    // 右键菜单
    win.webContents.on("context-menu", (e, params) => {
        console.log("context-menu");
        // win.webContents.executeJavaScript(`
        //     alert('${params.selectionText}')
        // `)

        // 打开文件夹
        // dialog.showOpenDialog({
        //     buttonLabel: "打开文件夹",
        //     defaultPath:app.getPath("home"),
        //     properties: ["openDirectory","createDirectory","multiSelections","openFile"]
        // }).then(res => {
        //     console.log(res);
        //     if (res.canceled) {
        //         return;
        //     }
        //     win.webContents.executeJavaScript(`
        //         alert('${res.filePaths}')
        //     `)
        // })

        // dialog.showSaveDialog({
        //     title: '保存文件',
        //     defaultPath: 'test.txt',
        //     buttonLabel: '保存',
        //     filters: [
        //         { name: 'Text', extensions: ['txt'] }
        //     ]
        // }).then(res => {
        //     console.log(res);
        //     if (res.canceled) {
        //         return;
        //     }
        //     win.webContents.executeJavaScript()
        // })

        // dialog.showMessageBox({
        //     type: 'info',
        //     title: '提示',
        //     message: '当前版本为测试版，请勿用于生产环境！',
        //     buttons: ['确定','取消']
        // }).then(res => {
        //    console.log(res);
        // })

        contextMenu.popup()
    })

    // 注册全局快捷键
    // globalShortcut.register('G',()=>{
    //     console.log('G');
    //     globalShortcut.unregister('G')
    // })

    // 设置菜单
    Menu.setApplicationMenu(mainMenu('我的消息', (args) => {
        console.log(args);
    }))

    // 创建托盘
    createTray(app, win)

    ipcMain.handle('capture',async (e,args) => {
        return desktopCapturer.getSources({
            types: ['window', 'screen']
        }).then(sources => {
            console.log('主进程获取屏幕信息', sources)
            return sources
        })
    })

    // 关闭安全警告
    // process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

    win.once('ready-to-show', () => {
        win.show();
    });

    // 父子窗口通信
    // const win2 = new BrowserWindow({
    //     width: 400,
    //     height: 300,
    //     parent: win,
    //     modal: true,
    // })
    // win2.loadFile('./index.html');

    winState.manage(win); // 窗口最大化最小化等状态保存
}

app.on('window-all-closed', () => {
    console.log('closed');
    // Mac 平台关闭不会退出
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // Mac 平台下点击Dock图标时，如果没有其他窗口打开，则重建窗口
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 退出前
app.on('before-quit', () => {
    console.log('before-quit')
})

// 失去焦点
app.on('browser-window-blur', () => {
    console.log('browser-window-blur')
    // setTimeout(() => {
    //     app.quit();
    // }, 3000)
})
// 获得焦点
app.on('browser-window-focus', () => {
    console.log('browser-window-focus')
})

ipcMain.handle('get-data', (event, arg) => {
    console.log('Main process:', arg)
    return '主进程收到的消息'
})


// app.whenReady().then(createWindow)
app.on('ready', createWindow)