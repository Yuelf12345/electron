const jwt = require('jsonwebtoken');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl1ZSIsImlhdCI6MTcwMTYwNDExNywiZXhwIjoxNzAxNjkwNTE3fQ.0cSLj6n8y7tgYNR11XFX_izaKxbCzOk13wLM5JONFWo'
decoded = jwt.verify(token, 'yCharts');
const expirationDate = decoded.exp;
const now = new Date() /1000;
const timedeltaDate = expirationDate - now;
if (timedeltaDate < 0) { // 30 minutes
    console.log('Token 过期', timedeltaDate * 60 * 1000);
} else {
    console.log('Token 距离过期', timedeltaDate /60/60);
}