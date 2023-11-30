import { defineStore } from 'pinia'
import { IUserInfo } from "@/utils/types"
import { Login, Register } from "@/api/user"
import router from '@/router'

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
            friends: [],
            blacklist: [],
            applicationList: [],
            rejectList: [],
            loginTime: '',
            lastLoginTime: '',
            created_at: '',
            token: '',
            refresh_token: '',
        }
    }),
    actions: {
        async login(userInfo: IUserInfo, isLogin: boolean) {
            let res
            if (isLogin) {
                res = await Login(userInfo)
                let data = res.data
                if (data.success) {
                    this.userInfo = data.data
                    localStorage.setItem('y_t', data.data.token)
                    localStorage.setItem('y_r_t', data.data.refresh_token)
                    router.push('/')
                }
            } else {
                res = await Register(userInfo)
            }
            return res.data;
        }
    }
})

export default userStore;