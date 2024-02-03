const express = require('express')
router = express.Router()

const contatos = require('./database/db')[0]
const compromissos = require('./database/db')[1]
const locais = require('./database/db')[2]


router.get("/", (req, res) => {
    res.status(200).json(compromissos)
})

router.post("/", (req, res) => {
    let compromisso = {
        id: compromissos.length+1,
        descricao:req.body.descricao,
        data: req.body.data,
        local: locais.filter(x => x.id = req.body.local.id)[0],
        contato: contatos.filter(x => x.id == req.body.contato.id)[0],
    }
    compromissos.push(compromisso)
    res.status(201).json(compromisso)
})



module.exports = router