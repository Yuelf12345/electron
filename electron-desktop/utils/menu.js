const { Menu } = require('electron');

const mainMenu = (args,cb) => {
  return Menu.buildFromTemplate(
    // label:菜单名 submenu:二级菜单 role:内置事件 click:点击事件 accelerator:快捷键
    [{
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
    } ,{
      label: 'dialog',
      click: () => {
        cb('hello electron')
      },
      accelerator: 'Shift+C'
    }]
  )
}

module.exports = mainMenu