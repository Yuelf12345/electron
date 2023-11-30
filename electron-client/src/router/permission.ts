import router from ".";

let whiteList = ["/login", "/404", "/401"];
let token = localStorage.getItem("y_t");
router.beforeEach(async (to, from, next) => {
    console.log(from);
    // 白名单
    if (whiteList.indexOf(to.path) !== -1) {
        next();
        return;
    }
    // 未登录
    if (!token) {
        next("/login");
        return;
    }
    next();
})