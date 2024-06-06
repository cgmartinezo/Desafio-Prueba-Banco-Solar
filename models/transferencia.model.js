import { pool } from "../database/connection.database.js"
import { UsuarioModel } from "./usuario.model.js"

const getAllTransfer = async () => {
    const { rows } = await pool.query(`SELECT 
    t.id AS transferencia_id,
    e.id AS emisor_id,
    e.nombre AS emisor_nombre,
    r.id AS receptor_id,
    r.nombre AS receptor_nombre,
    t.monto,
    t.fecha
FROM 
    transferencias t
JOIN 
    usuarios e ON t.emisor = e.id
JOIN 
    usuarios r ON t.receptor = r.id;`)
    return rows

}

const create = async (emisor, receptor, monto) => {
    try {
        await pool.query('BEGIN')

        await UsuarioModel.updateBalance(emisor, -monto)
        await UsuarioModel.updateBalance(receptor, +monto)

        const query = {
            text: `
            INSERT INTO TRANSFERENCIAS (EMISOR,RECEPTOR,MONTO,FECHA) VALUES ($1,$2,$3, NOW()) RETURNING *
            `,
            values: [emisor, receptor, monto]
        }

        const { rows } = await pool.query(query)

        await pool.query('COMMIT')

        return rows[0]

    } catch (error) {
        console.log(error)
        await pool.query('ROLLBACK')
        throw error
    }
}

export const TransferenciaModel = {
    create,
    getAllTransfer
}