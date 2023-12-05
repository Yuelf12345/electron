<template>
    <div class="chats" v-if="friendInfo.user_id"  @keydown.enter="enterSendMsg">
        <div class="chat-list" ref="chatContent">
            <div>
                <div v-for=" (chats, index) in chatHistory" :key="index">
                    <div class="chat-time">{{ chats.created_at }}</div>
                    <div v-for="item in chats.chat_message">
                        <div class="message others" v-if="item.sender != userInfo.user_id">
                            <div class="avatar">
                                <el-avatar :src="imgUrl(friendInfo.avatar)" />
                            </div>
                            <div class="content">
                                <p class="author_name">{{ friendInfo.nickname }}</p>
                                <div class="bubble  bubble_default left">
                                    <div class="bubble_cont">
                                        <div class="plain">
                                            <div v-if="item.type == 1" v-html="item.msg"></div>
                                            <img v-if="item.type == 2" :src="item.msg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="message me" v-else>
                            <div class="avatar">
                                <el-avatar :size="50" :src="imgUrl(userInfo.avatar)" />
                            </div>
                            <div class="content">
                                <div class="bubble  bubble_primary right">
                                    <div class="bubble_cont">
                                        <div class="plain">
                                            <div v-if="item.type == 1" v-html="item.msg"></div>
                                            <img v-if="item.type == 2" :src="item.msg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="chat-input" @click.stop="handleClick('input')">
            <div class="chat-btns">
                <div class="emoji-btn" @click.stop="handleClick('emoji')">
                    <svg class="icon"
                        style="width: 1.5em;height: 1.5em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3382">
                        <path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#272536"
                            p-id="3383"></path>
                        <path
                            d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036"
                            fill="#231F20" p-id="3384"></path>
                        <path
                            d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137"
                            fill="#231F20" p-id="3385"></path>
                        <path
                            d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048"
                            fill="#231F20" p-id="3386"></path>
                        <path
                            d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294"
                            fill="#231F20" p-id="3387"></path>
                    </svg>
                </div>
                <el-icon size="22">
                    <FolderOpened />
                </el-icon>
            </div>
            <el-scrollbar max-height="400px">
                <div v-show="inputType === 'input'" class="chat-input-text" @click="inputMsg.focus()">
                    <div id="msg-input" ref="inputMsg" class="chat-input-text-input" contenteditable="true"
                        spellcheck="false" autofocus @focusin="isFocused=true"  @focusout="isFocused=false" @click="msgInpuClick"></div>
                    <div style="display: flex;flex-direction: row-reverse;">
                        <el-button @click="handleSendMsg">发送(S)</el-button>
                    </div>
                </div>
                <div v-show="inputType === 'emoji'" class="chat-input-emoji">
                    <div v-if="recentlyEmojis.length > 0">
                        <span class="emoji-title">最近使用</span>
                        <ul class="emoji-list">
                            <li class="emoji-item" v-for="(i, index) in uniq(recentlyEmojis)" :key="index">
                                <img :src="getImageUrl(i)" alt="emoji" loading="lazy" @click="handleEmojiClick(i)" />
                            </li>
                        </ul>
                    </div>
                    <span class="emoji-title">全部表情</span>
                    <ul class="emoji-list">
                        <li class="emoji-item" v-for="i in 26" :key="i">
                            <img :src="getImageUrl(i)" alt="emoji" loading="lazy" @click="handleEmojiClick(i)" />
                        </li>
                    </ul>
                </div>
            </el-scrollbar>
        </div>
    </div>
    <div class="empty" v-else>
        <h1>yChats</h1>
    </div>
</template>
    
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { FolderOpened } from '@element-plus/icons-vue'
import { debounce, uniq } from 'lodash'
import { imgUrl } from '@/utils/util'
import socket, { privatMsg } from '@/utils/io'
import useStore from '@/store'
const { chatStore, userStore: { userInfo } } = useStore()
const { friendInfo, chatHistory, recentlyEmojis }: any = storeToRefs(chatStore)

// 获取图片地址
const getImageUrl = (name: number | unknown) => {
    return new URL(`../assets/img/EMOJI${name}.png`, import.meta.url).href
}

// 聊天文本框
const inputType = ref('input')  // 输入框类型
const isFocused = ref(true)  // 输入框类型
const inputMsg = ref()          // 输入框内容
let rangeInput: Range;          // 选中文本的范围

const handleClick = (type: string) => {
    inputType.value = type;
}
// const handleEmojiClick = (emoji: number|unknown) => {
//     let emojiImg = `<img src="${getImageUrl(emoji)}" width="25" height="25" style="vertical-align: middle;" />`
//     inputMsg.value.innerHTML += emojiImg;
// }

const msgInpuClick = (e: any) => {
    let target = e.target;
    setCaretForEmoji(target);
}
// 光标定位
const setCaretForEmoji = (target: any) => {
    if (target.tagName.toLowerCase() === "img") {
        let range = new Range();
        range.setStartBefore(target);
        range.collapse(true);

        let document = target.ownerDocument;
        if (document) {
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
        }
    }
}

const handleEmojiClick = (name: number | unknown) => {
    let emojiImg = document.createElement("img");
    emojiImg.style.width = "25px";
    emojiImg.style.height = "25px";
    emojiImg.src = getImageUrl(name)
    if (!rangeInput) {
        rangeInput = new Range();
        rangeInput.selectNodeContents(inputMsg.value);
    }
    if (rangeInput.collapsed) {
        rangeInput.insertNode(emojiImg);
    } else {
        rangeInput.deleteContents();
        rangeInput.insertNode(emojiImg);
    }
    rangeInput.collapse(false);

    // 记录最近使用表情
    if (recentlyEmojis.value.length > 10) {
        recentlyEmojis.value.shift()
    }
    recentlyEmojis.value.push(name)
}

// 监听选中表情
document.onselectionchange = () => {
    let selection: any = document.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (inputMsg.value.contains(range.commonAncestorContainer)) {
            rangeInput = range;
        }
    }
};

const enterSendMsg = (e:any) => {
    if (isFocused.value && e.keyCode === 13) {
        e.preventDefault();
        handleSendMsg()
    }
}

const handleSendMsg = debounce(() => {
    const msg = inputMsg.value.innerHTML;
    if (!msg) return
    let data = {
        type: 1,// 1 文本 2 图片 3 语音 4 视频 5 文件
        sender: userInfo.user_id,
        receiver: friendInfo.value.user_id,
        msg: msg
    }
    privatMsg(data)
    inputMsg.value.innerHTML = ''
    chatStore.setChatHistory(data)
}, 500)

// 初始化聊天记录
// if (chatHistory.value.length == 0) {
//     chatHistory.value = [
//         {
//             type: 1,
//             sender: friendInfo.value.user_id,
//             receiver: userInfo.user_id,
//             msg: '你好'
//         }, {
//             type: 1,
//             sender: userInfo.user_id,
//             receiver: friendInfo.value.user_id,
//             msg: '你好'
//         }
//     ]
// }

socket.on('receiveMsg', (data: any) => {
    chatStore.receiveChatHistory(data)
});

// 滚动到底部
watch(() => chatStore.chatHistory, () => {
    scrollToBottom()
}, {
    deep: true
})
const chatContent = ref()
const scrollToBottom = () => {
    nextTick(() => {
        chatContent.value.scrollTop = chatContent.value.scrollHeight - chatContent.value.offsetHeight
    })
}

</script>
<style lang="scss" scoped>
@function r($px) {
    @return calc(round($px * 1000 / 32) / 1000 * 1rem);
}

ul {
    list-style: none;
    padding: 0 5px;
}

.empty {
    width: 100%;
    height: 100%;
    display: flex;

    &>h1 {
        margin: auto;
    }
}

.chats {
    flex: 1;
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    $borderWidth: 0.0703rem;

    pre {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        white-space: pre-wrap;
        //word-break: initial;
    }

    .chat-list {
        flex: 1;
        height: 100%;
        overflow-y: scroll;
        margin-bottom: 10px;

        .chat-time {
            color: #b0b0b0;
            font-size: 12px;
            text-align: center;
        }

        &::-webkit-scrollbar {
            width: 0px;
        }

        &::after {
            content: "";
            display: block;
            clear: both;
            height: 10px;
        }
    }

    .message {
        margin-bottom: r(40);
        float: left;
        width: 100%;

        .avatar {
            width: r(80);
            height: r(80);
            border-radius: 50%;
            overflow: hidden;
        }

        .author_name {
            height: r(30);
            margin: 0 r(28);
            font-size: r(20);
            line-height: r(30);
            color: #b0b0b0;
        }

        .content {
            overflow: hidden;
        }

        &.me {
            float: right;
            text-align: right;
            clear: right;

            .avatar {
                float: right;
            }
        }

        &.others {
            float: left;
            text-align: left;
            clear: left;

            .avatar {
                float: left;
            }
        }

        animation: goup 0.5s;

        @keyframes goup {
            0% {
                transform: translate(0, r(60));
            }

            100% {
                transform: translate(0, 0);
            }
        }
    }

    .message_system {
        text-align: center;
        margin: r(-10) auto 0;
        max-width: 50%;
        font-size: 0;

        .content {
            display: inline-block;
            background-color: #dcdcdc;
            font-size: r(24);
            padding: r(10) r(18);
            color: #fff;
            border-radius: r(2);
        }
    }

    .bubble {
        max-width: r(470);
        min-height: r(80);
        display: inline-block;
        vertical-align: top;
        position: relative;
        text-align: left;
        font-size: r(28);
        border-radius: r(4);
        margin: 0 r(28);

        &:before {
            content: '';
            display: inline-block;
            box-sizing: border-box;
            width: r(14);
            height: r(14);
            position: absolute;
            top: r(30);
            background-color: inherit;
            border-right-color: inherit;
            border-bottom-color: inherit;
        }

        &.right {
            &:before {
                right: r(-6);
                transform: rotate(-45deg);
            }
        }

        &.left {
            &:before {
                left: r(-6);
                transform: rotate(135deg);
            }
        }

        &.bubble_default {
            background-color: #fff;
            border-color: #919191;

            &.left:before {
                border-color: #919191;
            }
        }

        &.bubble_primary {
            background-color: #90d936;
            border-color: #6c9a36;

            &.right:before {
                border-color: #6c9a36;
            }
        }

        &.bubble_image {
            border: none;

            &:before {
                display: none;
            }
        }
    }

    .bubble_cont {
        word-wrap: break-word;
        word-break: break-all;
        min-height: r(80);

        .plain {
            padding: r(18) r(20);

            img {
                width: r(48);
            }

            .hide {
                display: none;
            }

            .trans {
                display: block;
                cursor: pointer;
                margin-top: r(8);
                padding-top: r(8);
                color: #669a27;
                border-top: $borderWidth solid #dcdcdc;
            }
        }

        .picture {
            border-radius: r(4);
            overflow: hidden;
            position: relative;

            img {
                display: block;
                cursor: pointer;
                max-width: r(300);
                max-height: r(300);
            }
        }

        .video {

            img,
            video {
                max-width: r(300);
                max-height: r(300);
            }
        }
    }
}

.chat-input {
    background-color: #fff;
    border-radius: 20px;
    min-height: 76px;
    transition: height 400ms;
    -webkit-tap-highlight-color: #00000010;
    margin-bottom: 34px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .chat-btns {
        display: flex;
        gap: 5px;

        .emoji-btn {
            width: 20px;
            height: 20px;
            margin-right: 10px;
        }
    }

    .chat-input-emoji {
        height: 100px;
        width: 100%;

        .emoji-title {
            font-size: 12px;
            color: #8b8b8b;
        }

        .emoji-list {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            .emoji-item {
                width: 25px;
                height: 25px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }

    .chat-input-text {
        max-width: 100%;
        font-size: 20px;
        word-break: break-all;


        .chat-input-text-input {
            padding: 0px;
            height: 100%;
            width: 100%;
            font-size: 18px;
            outline: none;
            resize: none;

            img {
                width: 20px;
                height: 20px;
            }

            &::-webkit-scrollbar {
                width: 0px;
            }

            border: none;

        }

        // & input {
        //     // width: 100%;
        //     height: 100%;
        //     white-space: pre-line;
        //     // opacity: 0;
        // }
        // &> ::after {
        //     content: '|';
        //     font-weight: bolder;
        //     animation: flicker 1s infinite;
        // }
    }

    @keyframes flicker {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }
}
</style>