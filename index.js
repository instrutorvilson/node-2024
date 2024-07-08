require('dotenv').config()
const express = require('express')
const cors = require('cors')

const port = 3000
const contatos = require('./contatos')
const produtos = require('./produtos')
const usuarios = require('./usuarios')
const { verificaToken } = require('./midlewares')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/contatos', verificaToken , contatos)
app.use('/produtos', produtos)
app.use('/usuarios', usuarios)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})