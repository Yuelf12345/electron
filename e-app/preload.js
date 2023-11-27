console.log('主进程中的一个JavaScript文件，它会在渲染进程在主进程启动之前被加载和执行。');


const { contextBridge, ipcRenderer, clipboard,nativeImage } = require('electron')


const handleSend = (msg) => {
    ipcRenderer.invoke('get-data', msg).then(res => {
        console.log('主进程返回信息', res)
    })
}

// 加navigator
const handleCopy = () => {
    navigator.clipboard.writeText('hhhhh')
}
const handleShow = () => {
    navigator.clipboard.readText().then(res => {
        console.log('主进程读取剪切板信息', res)
    })
}

const capture = async () => {
    await ipcRenderer.invoke('capture').then(sources => {
        console.log('capture返回', sources)
        for (const source of sources) {
            if (source.name === 'Entire Screen') {
                // 处理图片
                const str = source.thumbnail.crop({ x: 0, y: 0, width: 1366, height: 768 })
                return str.toDataURL()
            }
        }
    })
}

const toNativeImage =  () => {
   const img =  nativeImage.createFromPath('./assets/tary@2x.png')
   console.log(img);
}

// 在主进程中暴露 'myApi' 方法
contextBridge.exposeInMainWorld('myApi', {
    // 获取当前操作系统平台
    platform: process.platform,
    handleSend,
    handleCopy,
    handleShow,
    capture,
    toNativeImage
})


