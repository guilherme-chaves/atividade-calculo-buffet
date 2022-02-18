import sqlite3 from 'sqlite3';
const db = { connection: {} }

export default () => {
    const result = { value: {} };

    const openDb = async () => {
        db.connection = new sqlite3.Database('./db/database.db', runMigrations);
        return db;
    }
    
    const runMigrations = async () => {
        db.connection.run(`CREATE TABLE IF NOT EXISTS "eventConsumption"
                (
                    idEvent INTEGER PRIMARY KEY AUTOINCREMENT,
                    dateHour TEXT NOT NULL,
                    numPeople INTEGER NOT NULL,
                    prediction REAL NOT NULL,
                    consumption REAL DEFAULT 0
                )`, getLastEvents)
    }

    const getLastEvents = async () => {
        const stmt = db.connection.prepare(`SELECT * FROM eventConsumption ORDER BY idEvent DESC LIMIT 25`);
        result.value = stmt.all();
        stmt.finalize(closeDb);
    }

    const closeDb = () => {
        db.connection.close();
    }

    function runChain() {
        openDb();
        return result.value;
    }

    return { runChain }
}