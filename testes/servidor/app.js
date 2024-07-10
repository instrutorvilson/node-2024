var express = require('express')
const app = express()

app.get('/hello', (req, res) => {
    res.status(200).send('Olá mundo')
})

app.get('/consultar',(req, res) => {
    res.status(200).json({id:1, nome:'Jose'})
})

module.exports = app