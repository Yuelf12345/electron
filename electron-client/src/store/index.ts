import useUserStore from "./user";

const useStore = () => ({
    userStore: useUserStore(),
})
export default useStore;