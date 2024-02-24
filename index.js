const express = require('express')
const app = express()
const port = 3000


const bd = require('./bd')
const { Produto, Categoria } = require('./modelos')


app.use(express.json())

app.get('/conexao', async (req, res) => {
    try {
        await bd.authenticate()
        res.send('autenticado con sucesso')
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/criartabela', async (req, res) => {
    try {     

        Categoria.hasMany(Produto)
        Produto.belongsTo(Categoria)

        await bd.sync()
        res.send("tabela produto criada com sucesso")
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})