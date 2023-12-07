<template>
    <div class="friends-list">
        <div class="friend-item" v-for="i in userInfo.friends" v-slid @click="handleClick(i)"
            :class="{ 'friend-info-active': i.user_id === friendInfo.user_id }">
            <el-avatar :size="40" :src="imgUrl(i.avatar)" class="friend-avatar" />
            <div class="friend-info">
                <div class="friend-info-top">
                    <div class="friend-name">{{ i.nickname }}</div>
                    <div class="time">203/11/30</div>
                </div>
                <div class="message">
                    <div class="message-content">xxxxxx</div>
                    <div class="message-num" v-if="chatNumMap[i.user_id] > 0">{{ chatNumMap[i.user_id] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { imgUrl } from '@/utils/util'
import useStore from '@/store'
import { storeToRefs } from 'pinia'
const { userStore: { userInfo }, chatStore } = useStore()
const { friendInfo,chatNumMap } = storeToRefs(chatStore)
const handleClick = async (item: any) => {
    console.log(item);
    await chatStore.setFriendInfo(item, userInfo.user_id);
}
const handleMouseEnter = (item: any) => {
    console.log(friendInfo.value)
}
</script>
<style lang="scss" scoped>
.friends-list {
    height: 100%;
    width: 100%;

    .friend-info-active {
        background-color: darken(#e4ecfa, 4%);
    }

    & .friend-item {
        margin: 1%;
        height: 50px;
        width: auto;
        display: flex;
        // border: 2px solid white;
        align-items: center;
        padding: 1% 4%;

        img {
            // width: auto;
        }

        span {
            margin-left: 10px;
        }

        &:hover {
            // background: #f0f0f0;
        }

        .friend-avatar {
            width: 40px;
            height: 40px;
            margin: 0;
            padding: 0;
        }



        .friend-info {
            padding: 0 10px;
            width: 100%;
            display: flex;
            flex-direction: column;

            .friend-info-top {
                display: flex;
                justify-content: space-between;

                .time {
                    color: #556342;
                    font-size: 14px;
                }
            }
            .message{
                display: flex;
                justify-content: space-between;
                .message-num{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: #1286dd;
                    text-align: center;
                    color: #fff;
                    line-height: 20px;
                    font-size: 12px;
                }
            }
        }
    }
    .friend-item:hover {
        background: darken(#e4ecfa, 2%);
    }
}</style>