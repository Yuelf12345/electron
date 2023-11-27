// const fsp = require("node:fs/promises")
// console.log(fsp);

console.log('渲染进程使用主进程', window.myApi)

const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
    myApi.handleSend('Render Process')
})

document.querySelector('#copy').addEventListener('click', () => {
    myApi.handleCopy()
})
document.querySelector('#show').addEventListener('click', () => {
    myApi.handleShow()
})
document.querySelector('#navigateImg').addEventListener('click', () => {
    myApi.toNativeImage()
})
document.querySelector('#capture').addEventListener('click', async () => {
    let res = await myApi.capture()
    console.log(res);
    document.querySelector('#img').src = res
})