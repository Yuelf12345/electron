<template>
    <div class="container">
        <div class="content">
            <div class="user-info">
                <el-avatar shape="square" :size="50" :src="`http://localhost:3000${userInfo.avatar}`" />
                <span>{{ userInfo.nickname }}</span>
            </div>
            <div class="friends-list">
                <div class="friend-item" v-for="i in 20" v-slid>
                    <el-avatar :size="40" src="" class="friend-avatar" />
                    <div class="friend-info">
                        <div class="friend-info-top">
                            <div class="friend-name">李四</div>
                            <div class="time">203/11/30</div>
                        </div>
                        <div class="message">xxxxxx</div>
                    </div>
                </div>
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
const { userStore, userStore: { userInfo } } = useStore()
console.log('userStore', userStore, userInfo);

</script>
<style lang="scss" scoped>
.container {
    width: auto;
    max-width: 80vw;
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

        .friends-list {
            flex: 1;
            min-width: 200px;
            width: 100%;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                width: 0px;
            }

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
    }
}</style>