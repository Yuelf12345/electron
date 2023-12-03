<template>
  <div class="center-container">
    <div id="emoji" class="emoji-display" v-cloak>
      <div class="chat-box">
        <div :key="messageItem.id" v-for="messageItem in chatMessageList" class="chat-line">
          <cite class="line-name">{{ messageItem.name }}</cite>
          <span class="line-content" v-html="messageItem.content"></span>
        </div>
      </div>
      <div class="input-panel">
        <div class="input-media">
          <el-button @click="toggleEmojiBox" class="emoji-button">
            +
          </el-button>
        </div>
        <div ref="inputBox" @click="handleBoxClick" class="input-box" enterkeyhint="send" contenteditable="true"></div>
        <div class="input-control">
          <button @click="doSend" class="send-button" type="button">
            发送
          </button>
        </div>
      </div>
      <div v-show="emoji.isVisible" class="emoji-box">
        <span @click="insertEmoji(item)" v-for="item in emoji.list" :key="item" class="emoji-item">
          <img :src="emoji.path + item + emoji.suffix" />
        </span>
        <ul class="emoji-list">
          <li class="emoji-item" v-for="i in 26" :key="i">
            <img :src="getImageUrl(i)" alt="emoji" loading="lazy" @click="insertEmoji(i)" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup >
import { ref, reactive, watch, onMounted, nextTick } from 'vue'
const emojiPath = "../assets/img/";
const emojiSuffix = ".png";
const emojiList = [...Array(8).keys()].map((item) => ++item);

let emojiMap = reactive({});
emojiList.forEach((item) => {
  let key = `[${item}]`;
  let fullPath = `${emojiPath}${item}${emojiSuffix}`;
  emojiMap[key] = fullPath;
});

let rangeOfInputBox;
const inputBox = ref();
let count = 1;

const getImageUrl = (name) => {
  return new URL(`../assets/img/EMOJI${name}.png`, import.meta.url).href
}
const emoji = reactive({
  isVisible: false,
  path: emojiPath,
  list: emojiList,
  suffix: emojiSuffix
})
const chatMessageList = reactive([])

function handleBoxClick(event) {
  let target = event.target;
  setCaretForEmoji(target);
}
function setCaretForEmoji(target) {
  if (target.tagName.toLowerCase() === "img") {
    let range = new Range();
    range.setStartBefore(target);
    range.collapse(true);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  }
}
function toggleEmojiBox() {
  emoji.isVisible = !emoji.isVisible;
}


function insertEmoji(name) {
  let emojiEl = document.createElement("img");
  emojiEl.src = `${emoji.path}${name}${emoji.suffix}`;

  if (!rangeOfInputBox) {
    rangeOfInputBox = new Range();
    rangeOfInputBox.selectNodeContents(inputBox.value);
  }

  if (rangeOfInputBox.collapsed) {
    rangeOfInputBox.insertNode(emojiEl);
  } else {
    rangeOfInputBox.deleteContents();
    rangeOfInputBox.insertNode(emojiEl);
  }
  rangeOfInputBox.collapse(false);
}
function doSend() {
  // let content = inputBox.value.innerHTML;

  // if (content !== "") {
  //   let name = "我";
  //   let messageItem = {
  //     id: count++,
  //     name,
  //     content
  //   };
  //   chatMessageList.push(messageItem);
  //   inputBox.value.innerHTML = "";
  // }
}

document.onselectionchange = () => {
  let selection = document.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    if (inputBox.value.contains(range.commonAncestorContainer)) {
      rangeOfInputBox = range;
    }
  }
};
</script>

<style scoped lang="scss">
.center-container {
  width: 360px;
  margin: 15px auto;
  padding: 15px;
  border: 1px dotted #369;
}

.chat-box {
  min-height: 40px;
  max-height: 300px;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #ececec;
  overflow: auto;
  line-height: 1.6;
}

.input-panel {
  display: flex;

  .input-media {
    padding: 0 10px;
    color: #666;
    font-size: 24px;
    align-self: flex-end;
    line-height: 1;
  }

  .emoji-button {
    display: block;
  }

  .input-main {
    flex: 1;
    align-self: flex-end;

    >.form-input {
      width: 100%;
      padding: 5px 10px;
      box-sizing: border-box;
      color: #333;
      border: 0 none;
      border-bottom: 1px solid #ccc;
      outline: none;
      font-size: 14px;
    }
  }

  .input-box {
    flex: 1;
    padding: 5px 10px 0 10px;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 14px;
    line-height: normal;
  }

  .input-control {
    padding: 0 0 0 10px;
    align-self: flex-end;
  }

  .send-button {
    display: block;
    padding: 8px 20px;
    border-radius: 4px;
    border: 0 none;
    background: #3298dc;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    outline: none;

    &:hover {
      background: #2793da;
    }
  }
}

.emoji-box {
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #773;
  border-radius: 4px;
}

.emoji-item {
  display: inline-block;
  padding: 5px;
  border: 1px dotted transparent;
  line-height: 1;
  cursor: pointer;

  &:hover {
    border-color: #786;
  }
}

.chat-line {
  font-size: 12px;
}

.line-name {
  color: #777;
  font-style: normal;

  &::after {
    content: ": ";
  }
}

.line-content {
  color: #333;

  >img {
    width: 16px;
    vertical-align: text-bottom;
  }
}
</style>