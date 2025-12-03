// db/habilidades.js
import { getDB } from "./database";

// Load all habilidades for a volunteer
export async function getHabilidades(userId) {
    const db = await getDB();
    return db.getAllAsync(
        "SELECT id, titulo FROM habilidades WHERE id_voluntario = ?",
        [userId]
    );
}

// Add new habilidade
export async function addHabilidade(userId, titulo) {
    const db = await getDB();
    await db.runAsync(
        "INSERT INTO habilidades (id_voluntario, titulo) VALUES (?, ?)",
        [userId, titulo]
    );
}

// Update habilidade text
export async function updateHabilidade(id, newTitle) {
    const db = await getDB();
    await db.runAsync(
        "UPDATE habilidades SET titulo = ? WHERE id = ?",
        [newTitle, id]
    );
}

// Delete habilidade
export async function deleteHabilidade(id) {
    const db = await getDB();
    await db.runAsync("DELETE FROM habilidades WHERE id = ?", [id]);
}
