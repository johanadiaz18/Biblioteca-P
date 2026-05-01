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
 async add(req, res) {
    try {
        const libro = req.body;
        const fecha = libro["año-publicacion"];

        const [result] = await pool.query(
            'INSERT INTO Libros(nombre, autor, categoria, `año-publicacion`, ISBN, id) VALUES (?, ?, ?, ?, ?, ?)',
            [libro.nombre, libro.autor, libro.categoria, fecha, libro.ISBN, libro.id]
        );

        res.json({ "Id insertado": result.insertId });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
async delete(req, res) {
    try { 
        const libro = req.body;
        const [result] = await pool.query(
            'DELETE FROM Libros WHERE ISBN=(?)',
            [libro.ISBN]
        );

        res.json({ "Registros eliminados": result.affectedRows });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async update(req, res) {
    try {
        const { id, nombre, autor, categoria, ISBN } = req.body;
        const fecha = req.body["año-publicacion"];

        const [result] = await pool.query(
            'UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), `año-publicacion`=(?), ISBN=(?) WHERE id=(?)',
            [nombre, autor, categoria, fecha, ISBN, id]
        );

        if (result.affectedRows === 0)
            return res.status(404).json({ error: "Libro no encontrado" });

        res.json({
            "Registros actualizados": result.affectedRows
        });

    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
}
}
export const libro = new LibroController();
