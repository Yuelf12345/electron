import { defineStore } from 'pinia'
import { IUserInfo } from "@/utils/types"
import { Login, Register } from "@/api/user"

const userStore = defineStore('user', {
    state: () => ({
        userInfo: {
            user_id: '',
            username: '',
            password: '',
            nickname: '',
            gender: 1,
            birthday: '',
            avatar: '',
        }
    }),
    actions: {
        async login(userInfo: IUserInfo, isLogin: boolean) {
            let res
            if (isLogin) {
                res = await Login(userInfo)
            } else {
                res = await Register(userInfo)
            }
            return res.data;
        }
    }
})

export default userStore;