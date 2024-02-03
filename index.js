const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

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

app.post('/contatos',(req, res)=>{
   let contato = {
    id: dados.length+1,
    nome: req.body.nome,
    email:req.body.email
   }
  dados.push(contato)
  res.status(201).json(contato)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/**
 * get -> contatos
 * get -> contatos/1
 * delete -> contatos/1
 * put -> contatos/1
 * post -> contatos
 */