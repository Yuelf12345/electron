import useUserStore from "./user";
import usechatStore from "./chat";

const useStore = () => ({
    userStore: useUserStore(),
    chatStore: usechatStore(),
})
export default useStore;