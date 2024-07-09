require('dotenv').config()
const express = require('express')
const cors = require('cors')

const contatos = require('./contatos')
const produtos = require('./produtos')
const { verificaToken } = require('./midlewares')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/contatos', verificaToken , contatos)
app.use('/produtos', produtos)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})