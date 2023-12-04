import { defineStore } from 'pinia'
import { upDateChat, getChat } from "@/api/chat"

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
        recentlyEmojis: [],
        chatHistory: {} as any,
        chatMap: {} as any,
    }),

    actions: {
        async setFriendInfo(friendInfo: any, user_id: string) {
            this.friendInfo = friendInfo
            this.user_id = user_id
            console.log('切换好友聊天记录', this.chatMap);
            if (!this.chatMap[this.friendInfo.user_id]) {
                let res: any = await getChat({
                    user_id: this.user_id, friendInfo: this.friendInfo
                })
                console.log('获取聊天记录 ----->', res);
                if (res.code === 200) {
                    this.chatMap[this.friendInfo.user_id] = res.data
                }
            }
            this.chatHistory = this.chatMap[this.friendInfo.user_id]
        },
        // 保存聊天记录
        async setChatHistory(data: any) {
            let lastChats = this.chatHistory[this.chatHistory.length - 1].chat_message
            lastChats.push(data)
            console.log('lastChats', lastChats);

            console.log('存储数据', this.chatHistory, data);
            let res = await upDateChat({
                user_id: this.user_id, friendInfo: this.friendInfo, chatHistory: lastChats
            })
            console.log('更新聊天记录 ----->', res);
        }
    }
})

export default chatStore;