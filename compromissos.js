const express = require('express')
router = express.Router()

const contatos = [
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

const compromissos = [
    {
        id:1,
        descricao:"Jogar bocha",
        data:"03/02/2024",
        local: {
            id: 1,
            nome: "cancha de bocha",
            rua: "Rua Carlos Honburg",
            bairro: "Wunderwald",
            cidade: "Pomerode",
            fone: " (47) 98851-1764"
        },
        contato: {
            id:2,
            nome:'joao',
            email:'joao@gmail.com'
        }
    }
]

router.get("/", (req, res) => {
    res.status(200).json(compromissos)
})

router.post("/", (req, res) => {
    let compromisso = {
        id: compromissos.length+1,
        descricao:req.body.descricao,
        data: req.body.data,
        local: contatos.filter(x => x.id == req.body.local.id)[0],
        contato: req.body.contato
    }
    compromissos.push(compromisso)
    res.status(201).json(compromisso)
})



module.exports = router