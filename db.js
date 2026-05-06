const sqlite3 = require('sqlite3').verbose();

// 사용자 DB
const userDB = new sqlite3.Database('./shadow.sqlite');

// 좌석 DB
const seatDB = new sqlite3.Database('./seats.sqlite');

// 사용자 DB 초기화
userDB.serialize(() => {
  userDB.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  userDB.run(`INSERT OR IGNORE INTO users (username, password, role)
              VALUES ('student', 'abcd', 'user')`);//init data
});

// 좌석 DB 초기화
seatDB.serialize(() => {
  seatDB.run(`CREATE TABLE IF NOT EXISTS seats (
    id INTEGER PRIMARY KEY,
    cluster TEXT,
    type TEXT,
    occupied INTEGER,
    posX INTEGER,
    posY INTEGER
  )`);
  //init data
  seatDB.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
              VALUES (1, 'C1', 'circle', 0, 120, 80)`);
  seatDB.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
              VALUES (2, 'C1', 'circle', 0, 160, 100)`);
  seatDB.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
              VALUES (3, 'R1', 'row', 0, 300, 200)`);
  seatDB.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
              VALUES (4, 'R1', 'row', 0, 340, 200)`);
});

module.exports = { userDB, seatDB };
