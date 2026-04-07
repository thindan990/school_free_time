const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 메인 UI
app.use(express.static('public'));

// 랜덤채팅 UI
app.use('/chat', express.static('chat'));

let waitingUser = null;

io.on('connection', (socket) => {
    console.log('사용자 접속:', socket.id);

    // 연결되면 자동으로 join 이벤트 실행
    socket.emit('ready');

    socket.on('join', () => {
        if (waitingUser && waitingUser !== socket) {
            const partner = waitingUser;
            waitingUser = null;

            socket.partner = partner;
            partner.partner = socket;

            socket.emit('matched', { partnerId: partner.id });
            partner.emit('matched', { partnerId: socket.id });
        } else {
            waitingUser = socket;
            socket.emit('waiting');
        }
    });

    socket.on('message', (msg) => {
        if (socket.partner) {
            socket.partner.emit('message', msg);
        }
    });

    socket.on('disconnect', () => {
        if (waitingUser === socket) {
            waitingUser = null;
        }
        if (socket.partner) {
            socket.partner.emit('partner_left');
            socket.partner.partner = null;
        }
    });
});

http.listen(3000, () => {
    console.log('서버 실행 중: http://localhost:3000');
});