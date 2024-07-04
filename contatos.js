const express = require('express')
const router = express.Router()
const pool = require('./config')

var db = []

router.get('/', async(req, res)=>{
   try{
      let cliente = await pool.connect()
      var dados = await cliente.query('select * from tb_contatos')
      res.send(dados.rows)     
    }catch(error){
     res.send(error.message)
    }   
 })
 
 router.post('/', async(req, res) => {
     try {
         var cliente = await pool.connect()
        var dados = 
         await cliente.query(
         'insert into tb_contatos(nome, email)values($1,$2) RETURNING *',
         [req.body.nome, req.body.email])
         res.status(201).send(dados.rows[0])
     } catch (error) {
       res.send(error.message)
     }
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