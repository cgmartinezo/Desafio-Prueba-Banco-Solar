import 'dotenv/config'
import express from 'express'

import usuarioRouter from './router/usuario.route.js'
import transferenciaRouter from './router/transferencia.route.js'

const app = express()

const __dirname = import.meta.dirname

// Middlewares req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.use('/', usuarioRouter)
app.use('/', transferenciaRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})