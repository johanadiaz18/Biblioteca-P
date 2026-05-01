import {pool} from './database.js';


class LibroController{

    async getOne(req, res) {
    try {
        const [result] = await pool.query(
            'SELECT * FROM Libros WHERE id = ?',
            [req.params.id]
        );

        if (result.length === 0)
            return res.status(404).json({ error: "Libro no encontrado" });

        res.json(result[0]);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
async getAll(req, res) {
    try {
        const [result] = await pool.query('SELECT * FROM libros');

        if (result.length === 0) {
            return res.status(404).json({
                mensaje: "No hay libros cargados"
            });
        }

        res.json(result);

    } 
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
}

export const libro = new LibroController();
