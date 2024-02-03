const express = require('express')
const app = express()
const port = 3000

const dados = [
    {
        id:1,
        nome:'maria',
        email:'maria@gmail.com'
    },
    {
        id:2,
        nome:'joao',
        email:'joao@gmail.com'
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/contatos', (req, res) => {
    res.send(dados)
})

app.get('/contatos/:id', (req, res) => {
    let contato = dados.filter(x => x.id == req.params.id)
    res.send(contato[0])
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})