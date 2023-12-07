import { defineStore } from 'pinia'
import { IUserInfo } from "@/utils/types"
import { Login, Register, getFriends } from "@/api/user"
import router from '@/router'
import { connect } from '@/utils/io'

const userStore = defineStore('user', {
    state: () => ({
        connected: false,
        socket_id: '',
        userInfo: {
            user_id: '',
            username: '',
            password: '',
            nickname: '',
            gender: 1,
            birthday: '',
            avatar: '',
            friends: [] as any[],
            blacklist: [],
            applicationList: [],
            rejectList: [],
            loginTime: '',
            lastLoginTime: '',
            created_at: '',
            token: '',
            refresh_token: '',
        },
        bgColor:'#fff'
    }),
    actions: {
        async login(userInfo: IUserInfo, isLogin: boolean) {
            let res:any
            if (isLogin) {
                res = await Login(userInfo)
                console.log('Login----->res', res);
                if (res.success) {
                    this.userInfo = res.data
                    localStorage.setItem('y_t', res.data.token)
                    localStorage.setItem('y_r_t', res.data.refresh_token)
                     await connect(res.data.user_id).then((res)=>{
                        if(res.connected){
                            this.connected = true
                            this.socket_id = res.id
                        }
                        
                    })
                    router.push('/')
                    this.friends()
                }
            } else {
                res = await Register(userInfo)
            }
            return res;
        },
        async friends() {
            let res
            res = await getFriends({ user_id: this.userInfo.user_id })
            console.log('getFriends---->res', res);
            if (res.success) {
                this.userInfo.friends = res.data
            }
            // return res;
        },
    },
    persist: true
})

export default userStore;