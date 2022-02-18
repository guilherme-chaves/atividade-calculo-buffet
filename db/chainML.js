import sqlite3 from 'sqlite3';
const db = { connection: {} }

export default () => {
    const result = { value: {} };

    const openDb = async () => {
        db.connection = new sqlite3.Database('./db/database.db', runMigrations);
    }
    
    const runMigrations = async () => {
        db.connection.run(`CREATE TABLE IF NOT EXISTS "eventConsumption"
                (
                    idEvent INTEGER PRIMARY KEY AUTOINCREMENT,
                    dateHour TEXT NOT NULL,
                    numPeople INTEGER NOT NULL,
                    prediction REAL NOT NULL,
                    consumption REAL DEFAULT 0
                )`, getMLData)
    }

    const getMLData = async () => {
        const stmt = db.connection.prepare(`SELECT numPeople, consumption FROM eventConsumption ORDER BY numPeople ASC`);
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