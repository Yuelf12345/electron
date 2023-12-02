<template>
  <div>
    <!-- <div>
      <h2>A</h2>
      <el-button @click="connect('A')">连接A</el-button>
      <el-input type="textarea" v-model="message"></el-input>
      <el-input v-model="msg1"></el-input>
      <el-button @click="sendMsg('A')">发送A</el-button>
    </div>
    <div>
      <h2>B</h2>
      <el-button @click="connect('B')">连接B</el-button>
      <el-input type="textarea" v-model="message"></el-input>
      <el-input v-model="msg2"></el-input>
      <el-button @click="sendMsg('B')">发送A</el-button>
    </div> -->
  </div>
</template>
<script setup lang="ts">
// import { ref } from 'vue'
// import { io } from 'socket.io-client';
// const socket = ref(io('http://localhost:3000'));
// const msg1 = ref('');
// const msg2 = ref('');
// const connect = (user_id: string) => {
//   console.log(user_id);
//   socket.value.on('connect', () => {
//     console.log('连接成功', user_id);
//   });
//   let res = socket.value.emit("onLine", user_id);
//   console.log('--------------',res);
// }
// const message = ref<any>([])
// socket.value.on('receiveMsg', (data: any) => {
//   console.log('收到消息', data);
//   message.value.push(data);
// });

// const sendMsg = (user_id: string) => {
//   console.log('发送消息', user_id);
//   if (user_id == 'A') {
//     socket.value.emit('sendMsg', {
//       sender: 'A',
//       receiver: 'B',
//       msg: msg1.value
//     });
//     message.value.push(msg1.value)
//     msg1.value = ''
//   } else {
//     socket.value.emit('sendMsg', {
//       sender: 'B',
//       receiver: 'A',
//       msg: msg2.value
//     });
//     message.value.push(msg2.value)
//     msg2.value = ''
//   }
// }
</script>