import { TransferenciaModel } from "../models/transferencia.model.js";

const getAllTransfer = async (req, res) => {
    try {
        const transfer = await TransferenciaModel.getAllTransfer()
        return res.json(transfer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: 'Error al Cargar transferencias.' });
    }
}

const createTransferencia = async (req, res) => {
    try {

        const { emisor, receptor, monto, fecha } = req.body

        const transferencia = await TransferenciaModel.create(emisor, receptor, monto, fecha)
        return res.status(201).json(transferencia)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const TransferenciaController = {
    getAllTransfer,
    createTransferencia
}