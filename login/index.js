const socket = io();

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  socket.emit('login', { username, password });
});

socket.on('loginResult', (result) => {
  const msg = document.getElementById('message');
  if (result.success) {
    msg.textContent = "로그인 성공!";
    if (result.role === 'admin') {
      window.location.href = "/admin/index.html";
    } else {
      window.location.href = "/lib/index.html";
    }
  } else {
    msg.textContent = "로그인 실패: 아이디 또는 비밀번호를 확인하세요.";
  }
});
