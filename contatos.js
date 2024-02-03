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

const express = require('express')
router = express.Router()

router.get('/', (req, res) => {
    res.send(dados)
})

router.get('/:id', (req, res) => {
    let contato = dados.filter(x => x.id == req.params.id)
    res.send(contato[0])
})

router.post('/',(req, res)=>{
   let contato = {
    id: dados.length+1,
    nome: req.body.nome,
    email:req.body.email
   }
  dados.push(contato)
  res.status(201).json(contato)
})

router.put('/:id',(req, res)=>{
    let contato = dados.filter(x => x.id == req.params.id)[0]
    if (contato == undefined){
        res.status(404).json({
            message: "Contato não existe"
        })
    }

    contato.nome = req.body.nome
    contato.email = req.body.email

    res.status(200).json(contato)
})

router.delete('/:id', (req, res) => {
    let contato = dados.filter(x => x.id == req.params.id)[0]
    if (contato == undefined){
        res.status(404).json({
            message: "Contato não existe"
        })
    }
    dados.splice(contato.id-1,1)
    res.sendStatus(204)
})

module.exports = router