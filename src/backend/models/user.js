const { loadDb, saveDb } = require('../config/database');

const UserModel = {
  findByEmail(email) {
    const db = loadDb();
    return db.users.find(u => u.email === email) || null;
  },

  findById(id) {
    const db = loadDb();
    return db.users.find(u => u.id === id) || null;
  },

  create({ email, password }) {
    const db = loadDb();
    if (db.users.some(u => u.email === email)) {
      const err = new Error('Email already registered');
      err.code = 'DUPLICATE_EMAIL';
      throw err;
    }
    const user = {
      id: db.nextId++,
      email,
      password,
      created_at: new Date().toISOString(),
    };
    db.users.push(user);
    saveDb(db);
    return user;
  },
};

module.exports = UserModel;
