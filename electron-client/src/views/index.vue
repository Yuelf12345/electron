<template>
    <div class="container">
        <div class="content">
            <div class="user-info">
                <el-avatar shape="square" :size="50" :src="imgUrl(userInfo.avatar)" />
                <span>{{ userInfo.nickname }}</span>
            </div>
            <div class="content-view">
                <router-view></router-view>
            </div>
            <div style="height: 100px;">
                <Navbar></Navbar>
            </div>
        </div>
        <div class="content">
            <Chats></Chats>
        </div>
    </div>
</template>
<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import Chats from '@/components/chats.vue'
import useStore from '@/store'
import { imgUrl } from '@/utils/util'
const { userStore, userStore: { userInfo } } = useStore()
console.log('userStore', userStore, userInfo);

</script>
<style lang="scss" scoped>
.container {
    cursor: pointer;
    user-select: none;
    width: auto;
    max-width: 100vw;
    height: 90vh;
    border-radius: 1rem;
    display: grid;
    grid-template-columns: 30% 1fr;
    overflow: hidden;
    background: #e4ecfa;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    .content {
        height: 90vh;
        border: 1px solid white;
        display: flex;
        flex-direction: column;

        .user-info {
            display: flex;
            align-items: center;
            padding: 1%;

            img {
                width: auto;
            }

            span {
                margin-left: 10px;
            }
        }

        .content-view {
            flex: 1;
            min-width: 200px;
            width: 100%;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0px;
            }
        }
    }
}
</style>