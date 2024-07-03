const express = require('express')
const app = express()
const port = 3000
const contatos = require('./contatos')


app.use(express.json())

app.use('/contatos', contatos)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})