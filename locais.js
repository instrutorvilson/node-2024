const express = require('express')
router = express.Router()

const locais = require('./database/db')[2]

router.get('/', (req, res) => {
    res.send(locais)
})

router.post('/', (req, res) => {
    let local = {
        id: locais.length + 1,
        nome: req.body.nome,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade
    }
    locais.push(local)
    res.status(201).json(local)
})

router.put('/:id', (req, res) => {
    let local = locais.filter(x => x.id == req.params.id)[0]
    if (local == undefined) {
        res.status(404).json({ message: "Local não existe" })
    }

    local.id = req.params.id
    local.nome = req.body.nome
    local.rua = req.body.rua
    local.bairro = req.body.bairro
    local.cidade = req.body.cidade

    res.status(200).json(local)
})

router.get('/:id',(req, res) => {
    let local = locais.filter(x => x.id == req.params.id)[0]
    if(local == undefined){
        res.status(404).json({ message: "Local não existe"})
    }
          
    res.status(200).json(local)
})

router.delete('/:id',(req, res) => {
    let local = locais.filter(x => x.id == req.params.id)[0]
    if(local == undefined){
        res.status(404).json({ message: "Local não existe"})
    }
          
    locais.splice(local.id-1, 1)
    res.sendStatus(204)
})


module.exports = router