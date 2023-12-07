// const jwt = require('jsonwebtoken');

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl1ZSIsImlhdCI6MTcwMTYwNDExNywiZXhwIjoxNzAxNjkwNTE3fQ.0cSLj6n8y7tgYNR11XFX_izaKxbCzOk13wLM5JONFWo'
// decoded = jwt.verify(token, 'yCharts');
// const expirationDate = decoded.exp;
// const now = new Date() /1000;
// const timedeltaDate = expirationDate - now;
// if (timedeltaDate < 0) { // 30 minutes
//     console.log('Token 过期', timedeltaDate * 60 * 1000);
// } else {
//     console.log('Token 距离过期', timedeltaDate /60/60);
// }

let arr = [
    {
        chat_id: 'aed6db54-b397-4d0f-ae14-9a772fd2185a',
        sender_id: 'c547e171-6567-4520-ac7e-4f032949d1b0',
        receiver_id: 'ea771619-8c9b-449b-be21-9bed4eb3080c',
        chat_message: [{"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}],
        chat_datetime: '2023 - 12-05T15: 12:08.000Z',
        created_at:' 2023 - 12-07T15: 12:08.000Z',
        deleted_at: null,
        isDel: 1
    },
    {
        chat_id: 'c547e171-6567-4520-ac7e-4f032949d1b0',
        sender_id: 'c547e171-6567-4520-ac7e-4f032949d1b0',
        receiver_id: 'ea771619-8c9b-449b-be21-9bed4eb3080c',
        chat_message: [{"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}],
        chat_datetime: '2023 - 12-05T15: 12: 12.000Z',
        created_at:' 2023 - 12-05T15: 12: 12.000Z',
        deleted_at: null,
        isDel: 1
    },
    {
        chat_id: 'e0a2a6f6-0db8-431a-8d83-892a823f8c94',
        sender_id: 'c547e171-6567-4520-ac7e-4f032949d1b0',
        receiver_id: '09aebf8d-f1ce-417f-a559-6dbabc066d7f',
        chat_message: [{"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}, {"msg": "zxc", "type": 1, "sender": "c547e171-6567-4520-ac7e-4f032949d1b0", "receiver": "ea771619-8c9b-449b-be21-9bed4eb3080c"}],
        chat_datetime: '2023 - 12-05T15: 12: 12.000Z',
        created_at:' 2023 - 12-06T15: 11: 56.000Z',
        deleted_at: null,
        isDel: 1
    }
]

let chatMap = {};
if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
        if (chatMap[(arr[i].receiver_id)] != undefined) {
            console.log(' chatMap[arr[i].receiver_id]', chatMap[arr[i].receiver_id]);
            chatMap[arr[i].receiver_id].push(arr[i]);

        } else {
            chatMap[arr[i].receiver_id]= [arr[i]];
        }
    }
}
console.log('chatMap',chatMap);