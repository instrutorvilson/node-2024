const express = require('express')

const port = 3000
const contatos = require('./contatos')
const produtos = require('./produtos')

const app = express()
app.use(express.json())

app.use('/contatos', contatos)
app.use('/produtos', produtos)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})