import { defineStore } from 'pinia'
import { upDateChat, getChat, getAllChat } from "@/api/chat"

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
        chatNumMap: {} as any,
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
            this.chatNumMap[this.friendInfo.user_id] = 0
        },
        // 保存聊天记录
        async setChatHistory(data: any) {
            let lastChats = [];
            if (this.chatHistory.length > 0) {
                lastChats = this.chatHistory[this.chatHistory.length - 1].chat_message
            } else {
                this.chatMap[this.friendInfo.user_id].push({
                    'chat_message': [data]
                })
            }
            lastChats.push(data)
            let res = await upDateChat({
                user_id: this.user_id, friendInfo: this.friendInfo, chatHistory: lastChats
            })
            console.log('更新聊天记录 ----->', res);
        },

        receiveChatHistory(data: any) {
            console.log('所有聊天记录', this.chatMap);
            this.chatMap[data.sender] = this.chatMap[data.sender] || []
            this.chatMap[data.sender].push({
                'chat_message': [data]
            })
            if (data.sender != this.friendInfo.user_id) {
                this.chatNumMap[data.sender] = this.chatNumMap[data.sender] || 0
                this.chatNumMap[data.sender] += 1
            }
            console.log('接收聊天记录', data);
            console.log('接收聊天记录', this.chatNumMap);
            this.setChatHistory(data)
        },

        async getAllChatHistory(user_id: string, friends: any[]) {
            let res = await getAllChat({
                user_id: user_id, friends: friends
            })
            console.log('获取所有聊天记录 ----->', res);

        },
    }
})

export default chatStore;