import sqlite3 from 'sqlite3';
const db = { connection: {} }

export default () => {
    const result = { value: {} };

    const openDb = async (idEvent, consumption) => {
        db.connection = new sqlite3.Database('./db/database.db', runMigrations(idEvent, consumption));
        return db;
    }
    
    const runMigrations = async (idEvent, consumption) => {
        db.connection.run(`CREATE TABLE IF NOT EXISTS "eventConsumption"
                (
                    idEvent INTEGER PRIMARY KEY AUTOINCREMENT,
                    dateHour TEXT NOT NULL,
                    numPeople INTEGER NOT NULL,
                    prediction REAL NOT NULL,
                    consumption REAL DEFAULT 0
                )`, updateConsumption(idEvent, consumption))
    }

    const updateConsumption = async (idEvent, consumption) => {
        const stmt = db.connection.prepare(`UPDATE eventConsumption SET consumption = ? WHERE idEvent = ?`);
        stmt.bind(idEvent, consumption);
        stmt.run();
        stmt.finalize(closeDb);
    }

    const closeDb = () => {
        db.connection.close();
    }

    function runChain(idEvent, consumption) {
        openDb(idEvent, consumption);
        return result.value;
    }

    return { runChain }
}