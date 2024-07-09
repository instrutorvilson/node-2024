require('dotenv').config()
const express = require('express')
const cors = require('cors')


const usuarios = require('./usuarios')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/usuarios', usuarios)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})