const { Tray,Menu } = require('electron')

createTray = (app,win) => {
    // 托盘图片
      const tary = new Tray('./assets/logo.png')
      tary.setToolTip('This is my application.')
      tary.on('click', (e) => {
        // 点击shift
          if(e.shiftKey){
              app.quit()
          }else{
              win.isVisible()? win.hide() : win.show()
          }
      })
    // 托盘右键菜单
      tary.setContextMenu(Menu.buildFromTemplate([
          {
              label: '退出',
              click: () => {
                  app.quit()
              }
          }
      ]))
  }
  
  module.exports = {
      createTray
  }