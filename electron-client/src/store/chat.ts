import { defineStore } from 'pinia'
import { addChat, saveChat, getChat } from "@/api/chat"

const chatStore = defineStore('chat', {
    state: () => ({
        user_id: '',
        friendInfo: {
            user_id: '',
            username: '',
            password: '',
            nickname: '',
            gender: 1,
            birthday: '',
            avatar: '',
        },
        recentlyEmojis:[],
        chatHistory: [] as any[],
        chatMap: {} as any,
    }),

    actions: {
        setFriendInfo(friendInfo: any, user_id: string) {
            this.friendInfo = friendInfo
            console.log(this.friendInfo);   
            this.user_id = user_id
        },
        // 保存聊天记录
        async setChatHistory(data: any) {
            this.chatHistory.push(data)
            let res = await addChat({
                user_id: this.user_id, friendInfo: this.friendInfo, chatHistory: this.chatHistory
            })
            console.log('----', res);

        }
    }
})

export default chatStore;