<template>
    <div class="friends">
        <div class="searchbox">
            <div class="search active">
                <input class="serachInput" v-model="search" ref="serachInput"  @keydown.enter="searchFriends" />
                <div class="searchicon">
                    <div class="nav-icon" @click="searchFriends">
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
        <div class="friends-list">
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

const friends = ref(userInfo.value.friends)
const searchFriends = ()=>{
    userStore.search(search.value)
}
</script>
<style lang="scss" scoped>
.friends {
    display: flex;
    flex-direction: column;
}

.searchbox {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}

.search {
    width: 100%;
    position: relative;
    display: flex;
    place-content: center;
    text-align: center;
    font-size: 1.5rem;
    transition: width 300ms ease,
    flex-grow 300ms ease;
    height: 4rem;
    .serachInput {
        position: absolute;
        inset: 0rem 1rem;
        color: #fff !important;
        background: v-bind('bgColor');
        inset: 0rem 0.25rem;
        height: 2.5rem;
        border-radius: 1.25rem;
        padding: 0 2.5rem 0 1rem;
        font-size: 20px;
        opacity: 1;
        transition: inset 300ms ease, padding 300ms ease, color 200ms ease 50ms, opacity 300ms ease;
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

.friends-list {
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
</style>