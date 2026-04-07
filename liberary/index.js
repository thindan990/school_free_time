const socket = io();

socket.emit('getSeats');

socket.on('seatsUpdated', (seats) => {
  const container = document.getElementById('seat-map');
  container.innerHTML = '';
  seats.forEach(seat => {
    const div = document.createElement('div');
    div.classList.add('seat');
    div.classList.add(seat.occupied ? 'occupied' : 'free');
    div.textContent = seat.id;
    container.appendChild(div);
  });

  // 추천 알고리즘 적용
  const recommended = recommendSeat(seats);
  if (recommended) {
    const seatDiv = container.children[recommended.id - 1];
    seatDiv.classList.add('recommended');
    document.getElementById('recommendation').textContent =
      `추천 좌석: ${recommended.id}번`;
  } else {
    document.getElementById('recommendation').textContent =
      '추천 가능한 좌석이 없습니다.';
  }
});

// 추천 알고리즘: 인접 회피 + 가운데 선호
function recommendSeat(seats) {
  const available = seats.filter(s => !s.occupied);
  const candidates = available.filter(s => {
    const left = seats.find(x => x.id === s.id - 1);
    const right = seats.find(x => x.id === s.id + 1);
    return !(left && left.occupied) && !(right && right.occupied);
  });
  const mid = Math.floor(seats.length / 2);
  candidates.sort((a, b) => Math.abs(a.id - mid) - Math.abs(b.id - mid));
  return candidates[0] || null;
}