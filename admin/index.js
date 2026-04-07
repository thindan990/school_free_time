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
    div.addEventListener('click', () => {
      socket.emit('updateSeat', { id: seat.id, occupied: !seat.occupied });
    });
    container.appendChild(div);
  });
});
document.getElementById('home-btn').addEventListener('click', () => {
    window.location.href = "/";
});