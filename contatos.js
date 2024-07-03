const express = require('express')
const router = express.Router()

var db = []

router.get('/',(req, res)=>{
    res.send(db)
 })
 
 router.post('/',(req, res) => {
     let contato = {
         id: db.length + 1,
         nome: req.body.nome,
         email: req.body.email
     }
     db.push(contato)
     res.status(201).send(contato)
 })

 router.delete('/:id',(req, res) => {
    db = db.filter(ct => ct.id != req.params.id)
    res.status(204).send('')
 })

 router.get('/:id', (req, res) => {
    let aux = db.filter(ct => ct.id == req.params.id)
    res.status(200).send(aux[0])
 })

 router.put('/:id', (req, res) => {
    let aux = db.filter(ct => ct.id == req.params.id)
    if(aux.length > 0){
       aux[0].nome = req.body.nome  
       aux[0].email = req.body.email
       res.status(200).send('Contato alterado com sucesso!')
    }else{
        res.status(404).send('Contato não encontrado')
    }
 })



 
 module.exports = router