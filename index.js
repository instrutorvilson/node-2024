const express = require('express')
const app = express()
const port = 3000

const produto = require('./produtos')
const categoria = require('./categorias')

app.use(express.json())
app.use('/produtos', produto)
app.use('/categorias', categoria)

const bd = require('./bd')
const { Produto, Categoria } = require('./modelos')
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

        Categoria.hasMany(Produto , {foreignKey: 'categoryId'})
        Produto.belongsTo(Categoria, {foreignKey: 'categoryId'})

        await bd.sync()
        res.send("tabela produto criada com sucesso")
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})