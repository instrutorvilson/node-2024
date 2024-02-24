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
const { Sequelize,DataTypes, Model } = require('sequelize')

app.get('/criamodelos', async (req, res) => {
    const sequelize = new Sequelize('bd_node', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres'
    })
    try {
        class User extends Model{}
        User.init({
            nome:{type: DataTypes.STRING, allowNull: false},
            email:{type: DataTypes.STRING, allowNull: false},
            fone:{type: DataTypes.STRING, allowNull: false},
        },{ sequelize })
        
        await sequelize.sync()

        res.send('Tabela de usuarios criada com sucesso')
    } catch (error) {
        res.send(error.message)
    }
})


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