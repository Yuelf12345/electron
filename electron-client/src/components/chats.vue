<template>
    <div class="chats">
        <div class="chat-list">
            <div class="message others" v-for=" i in 2">
                <div class="avatar" data-author-id="lj">
                    <el-avatar :size="50" src="" />
                </div>
                <div class="content">
                    <p class="author_name">雷军</p>
                    <div class="bubble  bubble_default left">
                        <div class="bubble_cont">
                            <div class="plain">
                                <pre>小米的朋友 你好，are you ok？</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="message me" v-for=" i in 2">
                <div class="avatar" data-author-id="me">
                    <el-avatar :size="50" src="" />
                </div>
                <div class="content">
                    <p class="author_name">小米的朋友</p>
                    <div class="bubble  bubble_primary right">
                        <div class="bubble_cont">
                            <div class="plain">
                                <pre>我觉得能放个80集美剧已经很牛了！</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chat-input">
            <div class="card">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.chats {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @function r($px) {
        @return round($px *1000 / 32) / 1000 * 1rem;
    }

    $borderWidth: 0.0703rem;

    pre {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        white-space: pre-wrap;
        //word-break: initial;
    }
    .chat-list{
        flex: 1;
    }

    .message {
        margin-bottom: r(40);
        float: left;
        width: 100%;

        .avatar {
            width: r(80);
            height: r(80);
            margin-top: r(30);
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

.card {
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0px 1.5px 5.4px rgba(0, 0, 0, 0.054), 0px 3.7px 10.9px rgba(0, 0, 0, 0.068), 0px 7px 16.8px rgba(0, 0, 0, 0.074), 0px 12.5px 24.6px rgba(0, 0, 0, 0.076), 0px 23.4px 38.1px rgba(0, 0, 0, 0.08), 0px 56px 80px rgba(0, 0, 0, 0.1);
    height: 76px;
    margin-top: 16vh;
    transition: height 400ms;
    -webkit-tap-highlight-color: #00000010;
    margin-bottom: 20px;
}
</style>