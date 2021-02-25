const sqlite3 = require('sqlite3').verbose();
const { Logger } = require('../../support')

const logger = Logger('SQLITE3')

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        throw Error(err.message)
    }
    logger.debug('Connected to the in-memory SQlite database.');
});

logger.debug('Creating tables.')

db.run(`CREATE TABLE inventory(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    location TEXT NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE);`, (err) => {
    if (err) {
        throw Error(err.message)
    }
    logger.debug('Table inventory successfully created.');
});



module.exports = db;