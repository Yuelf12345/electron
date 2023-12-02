<template>
    <div class="friends-list">
        <div class="friend-item" v-for="i in userInfo.friends" v-slid @click="handleClick(i)">
            <el-avatar :size="40" :src="imgUrl(i.avatar)" class="friend-avatar" />
            <div class="friend-info">
                <div class="friend-info-top">
                    <div class="friend-name">{{ i.nickname }}</div>
                    <div class="time">203/11/30</div>
                </div>
                <div class="message">xxxxxx</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { imgUrl } from '@/utils/util'
import useStore from '@/store'
const { userStore: { userInfo }, chatStore } = useStore()

const handleClick = async (item: any) => {
    await chatStore.setFriendInfo(item,userInfo.user_id);
}
</script>
<style lang="scss" scoped>
.friends-list {
    height: 100%;
    width: 100%;

    & .friend-item {
        margin: 1%;
        height: 50px;
        width: auto;
        display: flex;
        border: 1px solid white;
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
            }
        }
    }

}
</style>