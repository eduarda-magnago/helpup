// db/database.js
import * as SQLite from 'expo-sqlite';

let dbInstance = null;

export async function getDB() {
    if (!dbInstance) {
        dbInstance = await SQLite.openDatabaseAsync('app.db');
        await dbInstance.execAsync(`
          CREATE TABLE IF NOT EXISTS session (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER
          );
          CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT, id_voluntario INTEGER, id_organizacao INTEGER, nota INTEGER, comentario TEXT, data_avaliacao TEXT
          );
          CREATE TABLE IF NOT EXISTS habilidades (
            id INTEGER PRIMARY KEY AUTOINCREMENT, id_voluntario INTEGER, titulo TEXT
          );
        `);
    }
    return dbInstance;
}

export async function addHabilidades(userId, text) {
    const db = await getDB();
    await db.runAsync('INSERT INTO habilidades (user_id, text) VALUES (?, ?)', [
        userId,
        text
    ]);
}
