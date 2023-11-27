const { dialog, Menu } = require('electron');

const mainMenu = (args,cb) => {
    return Menu.buildFromTemplate([{
        label: '关闭',
        submenu: [
            {
                label: 'submeni-1'
            }
        ]
    }, {
        label: '最小化',
        submenu: [
            {
                label: 'submeni-1'
            }
        ]
    }, {
        label: '最大化',
        role: 'toggleFullScreen'
    }, {
        label: 'DevTools',
        role: 'toggledevtools'
    }, {
        label: 'dialog',
        click: () => {
            dialog.showMessageBox({
                type: 'info',
                title: 'title',
                message: args,
                buttons: ['ok', 'cancel']
            }),
            cb('hello electron')
        },
        // 快捷键
        accelerator: 'Shift+C'
    }]
    )
}

module.exports = mainMenu