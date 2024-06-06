import { UsuarioModel } from "../models/usuario.model.js"
import { handleError } from '../database/errors.js'

const getAllUsuarios = async (req, res) => {
    try {
        const users = await UsuarioModel.getAllUser()
        return res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Ocurrió un error al cargar datos.' });
    }
}

const createUser = async (req, res) => {
    try {
        const { nombre, balance } = req.body
        console.log(req.body)

        const newUser = {
            nombre,
            balance
        }
        const creacion = await UsuarioModel.createUser(newUser)
        return res.json(creacion)

    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.query
        const deleteUser = await UsuarioModel.deleteUser(id)
        if (!deleteUser) {
            return res.status(404).json({ ok: false, msg: 'Usuario no encontrado.' });
        }
        return res.json(deleteUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Ocurrió un error al eliminar el usuario.' });
    }
}

const putUser = async (req, res) => {
    try {
        const { id } = req.query

        const { name, balance } = req.body

        const updateUser = {
            name,
            balance,
            id
        }
        const updateUsers = await UsuarioModel.updateUser(updateUser)

        return res.json(updateUsers)

    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg: "fallo al actualizar" })
    }
}


export const UsuarioController = {
    getAllUsuarios,
    createUser,
    deleteUser,
    putUser
}