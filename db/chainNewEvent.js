import sqlite3 from 'sqlite3';
import { Sequelize } from 'sequelize/types';
const db = { connection: {} }

export default () => {
    const result = { value: {} };

    const openDb = async (date, numPeople, prediction) => {
        db.connection = new sqlite3.Database('./db/database.db', runMigrations(date, numPeople, prediction));
    }
    
    const runMigrations = async (date, numPeople, prediction) => {
        db.connection.run(`CREATE TABLE IF NOT EXISTS "eventConsumption"
                (
                    idEvent INTEGER PRIMARY KEY AUTOINCREMENT,
                    dateHour TEXT NOT NULL,
                    numPeople INTEGER NOT NULL,
                    prediction REAL NOT NULL,
                    consumption REAL DEFAULT 0
                )`, newEvent(date, numPeople, prediction))
    }

    const newEvent = async (date, numPeople, prediction) => {
        const stmt = db.connection.run(`INSERT INTO eventConsumption (dateHour, numPeople, prediction) VALUES (?, ?, ?)`);
        stmt.bind(date, numPeople, prediction);
        stmt.run();
        stmt.finalize(closeDb);
    }

    const closeDb = () => {
        db.connection.close();
    }

    function runChain(date, numPeople, prediction) {
        openDb(date, numPeople, prediction);
        return result.value;
    }

    return { runChain }
}