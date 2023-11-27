const { Tray,Menu } = require('electron')

createTray = (app,win) => {
    const tary = new Tray('./assets/tary.png')
    tary.setToolTip('This is my application.')
    tary.on('click', (e) => {
        if(e.shiftKey){
            app.quit()
        }else{
            win.isVisible()? win.hide() : win.show()
        }
    })
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