const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./set.sqlite');

db.serialize(() => {
  // 사용자 테이블
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  // 좌석 테이블
  db.run(`CREATE TABLE IF NOT EXISTS seats (
    id INTEGER PRIMARY KEY,
    cluster TEXT,
    type TEXT,
    occupied INTEGER,
    posX INTEGER,
    posY INTEGER
  )`);

  // 예시 좌석 데이터 (직접 좌표 지정)
  db.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
          VALUES (1, 'C1', 'circle', 0, 120, 80)`);
  db.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
          VALUES (2, 'C1', 'circle', 0, 160, 100)`);
  db.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
          VALUES (3, 'R1', 'row', 0, 300, 200)`);
  db.run(`INSERT OR IGNORE INTO seats (id, cluster, type, occupied, posX, posY)
          VALUES (4, 'R1', 'row', 0, 340, 200)`);

  // 사용자 계정 데이터
  db.run(`INSERT OR IGNORE INTO users (username, password, role)
          VALUES ('admin', '1234', 'admin')`);
  db.run(`INSERT OR IGNORE INTO users (username, password, role)
          VALUES ('student', 'abcd', 'user')`);
});

module.exports = db;
