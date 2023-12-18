<template>
    <div class="main-body">
        <div class="main-body-header">
            <div class="title">
                <b>online friends</b>
                <span>{{ friends.length }}</span>
            </div>
            <div class="header-content">
                <el-avatar v-for="(i) in friends" :key="i" :size="45" :src="imgUrl(i.avatar)" />
            </div>
        </div>
        <div class="main-body-content">
            <div class="title">
                <b>Messages</b>
                <div class="searchbox">
                    <div class="search active">
                        <input class="serachInput" v-model="search" ref="serachInput" />
                        <div class="searchicon">
                            <div class="nav-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon s-ion-icon" viewBox="0 0 512 512">
                                    <title>Search</title>
                                    <path
                                        d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body-content">
                <div class="friends">
                    <div class="friend" v-for="(friend) in friends" @click="friendClick(friend)">
                        <div class="friend-avatar">
                            <el-avatar :size="45" :src="imgUrl(friend.avatar)" />
                        </div>
                        <div class="friend-info">
                            <div>
                                <div class="friend-name">
                                    <span>{{ friend.nickname }}</span>
                                </div>
                                <div class="friend-message">
                                    <span v-html="lastMsg(friend.user_id)"></span>
                                </div>
                            </div>
                            <div class="unread-message" v-if="chatNumMap[friend.user_id] > 0">
                                {{ chatNumMap[friend.user_id] }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import useStore from '@/store';
import { storeToRefs } from 'pinia'
import { imgUrl } from '@/utils/util'
const search = ref('')
const { userStore, chatStore } = useStore()
const { userInfo, bgColor } = storeToRefs(userStore)
const { chatMap, chatNumMap } = storeToRefs(chatStore)
const lastMsg = (id: string) => {
    let chat;
    if (chatMap.value[id]) {
        const chats = chatMap.value[id][chatMap.value[id].length - 1]
        chat = chats.chat_message[chats.chat_message.length - 1]
        if (chat) {
            return chat.msg
        }
    }
}
const friendClick = (data: any) => {
    chatStore.setFriendInfo(data)
}
let friends = ref<any>([])
userStore.friends().then(() => {
    chatStore.getAllChatHistory(userInfo.value.user_id, userInfo.value.friends)
    friends.value = userInfo.value.friends
})


</script>

<style lang="scss" scoped>
.main-body {
    .title {
        display: flex;
        width: 100%;
        justify-content: space-between;

        &>b {
            font-size: 25px;
        }

        .searchbox {
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
        }

        .search {
            position: relative;
            display: flex;
            place-content: center;
            width: 4.5rem;
            text-align: center;
            font-size: 1.5rem;
            transition: width 300ms ease, flex-grow 300ms ease;
            height: 4rem;

            .serachInput {
                position: absolute;
                inset: 0rem 1rem;
                background: v-bind('bgColor');
                border-radius: 1.25rem;
                opacity: 1;
                transition: inset 300ms ease, padding 300ms ease, color 100ms ease, opacity 300ms ease;
                -webkit-appearance: none;
                border: none;
                padding: 0 1rem 0 1rem;
                font-size: 1rem;
                color: transparent;
            }

            .searchicon {
                position: absolute;
                inset: 0 0 0 auto;
                width: 4.5rem;
                height: 2.5rem;
                display: grid;
                place-content: center;
                transition: width 300ms ease;

                .nav-icon {
                    margin: 0.5rem;
                    width: 2rem;
                    height: 2rem;
                }
            }
        }

        .search:hover {
            width: 100%;

            .serachInput {
                color: #fff !important;

            }
        }

        .active .serachInput {
            inset: 0rem 0.25rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0 2.5rem 0 1rem;
            font-size: 20px;
            opacity: 1;
            transition: inset 300ms ease, padding 300ms ease, color 200ms ease 50ms, opacity 300ms ease;
        }
    }

    .main-body-header {
        width: 100%;

        .header-content {
            display: flex;
            gap: 10px;
        }
    }

    .body-content {
        flex: 1;
        display: flex;
        flex-direction: column;



        .friends {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;

            .friend {
                display: flex;

                .friend-info {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 10px;

                    .friend-name {
                        font-size: 15px;
                        font-weight: 600;
                    }

                    .friend-message {
                        font-size: calc(25px * 0.618);
                        color: #5a4ae8;
                    }

                    .unread-message {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        background: #5a4ae8;
                        text-align: center;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>