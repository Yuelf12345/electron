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
        async setFriendInfo(friendInfo: any) {
            this.friendInfo = friendInfo
            this.chatHistory = this.chatMap[this.friendInfo.user_id]
            console.log('好友信息', this.chatHistory);
            this.chatNumMap[this.friendInfo.user_id] = 0
        },

        // 保存聊天记录
        async setChatHistory(data: any) {
            let lastChats = [];
            console.log('this.chatHistory',this.chatHistory);
            if (this.chatHistory.length > 0) {
                lastChats = this.chatHistory[this.chatHistory.length - 1].chat_message
            }
            lastChats.push(data)
            let res = await upDateChat({
                user_id: this.user_id, friendInfo: this.friendInfo, chatHistory: lastChats
            })
            console.log('当前好友聊天记录',this.chatHistory );
            console.log('更新聊天记录 ----->',lastChats, res);
        },

        // 接收聊天记录
        receiveChatHistory(data: any) {
            if (data.sender != this.friendInfo.user_id) {
                this.chatNumMap[data.sender] = this.chatNumMap[data.sender] || 0
                this.chatNumMap[data.sender] += 1
                let len = this.chatMap[data.sender].length
                this.chatMap[data.sender][len -1].chat_message.push(data)
            }
            console.log('接收聊天记录', data);
            this.setChatHistory(data)
        },

        async getAllChatHistory(user_id: string, friends: any[]) {
            this.user_id = user_id
            let res: any = await getAllChat({
                user_id: user_id, friends: friends
            })
            console.log('获取所有聊天记录 ----->', res);
            if (res.success) {
                this.chatMap = res.data
            }
        },
    }
})

export default chatStore;