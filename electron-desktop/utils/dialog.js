const { dialog, app } = require('electron');


function openDialog(options) {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog({
            buttonLabel: "打开文件夹",
            defaultPath: app.getPath("home"),
            properties: ["openDirectory", "createDirectory", "multiSelections", "openFile"]
        }).then(res => {
            console.log(res);
            if (res.canceled) {
                return;
            }
            win.webContents.executeJavaScript(`
                alert('${res.filePaths}')
            `)
        })
    });
}

function showSaveDialog(options) {
    return new Promise((resolve, reject) => {
        dialog.showSaveDialog({
            title: '保存文件',
            defaultPath: 'test.txt',
            buttonLabel: '保存',
            filters: [
                { name: 'Text', extensions: ['txt'] }
            ]
        }).then(res => {
            console.log(res);
            if (res.canceled) {
                return;
            }
            // win.webContents.executeJavaScript()
        })
    })
}

function showMessageBox() {
    return new Promise((resolve, reject) => {
        dialog.showMessageBox({
            type: 'info',
            title: '提示',
            message: '当前版本为测试版，请勿用于生产环境！',
            buttons: ['确定', '取消']
        }).then(res => {
            console.log(res);
        })
    })
}

module.exports = {
    openDialog,
    showSaveDialog,
    showMessageBox
}