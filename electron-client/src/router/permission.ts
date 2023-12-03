import router from ".";

let whiteList = ["/login", "/404", "/401"];

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem("y_t");
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