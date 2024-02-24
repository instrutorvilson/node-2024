const express = require('express')
const router = express.Router()

const { Produto } = require('./modelos')

router.post('/', async(req, res) =>{
   try{
     const prod = await Produto.create(req.body)
     res.status(201).send(prod)
   }
   catch(error){
     res.status(400).send(error.message)
   }
})

router.get('/', async(req, res) =>{
    try{
      const produtos = await Produto.findAll()
      res.status(200).send(produtos)
    }
    catch(error){
      res.status(400).send(error.message)
    }
 })

 router.get('/:idproduto', async(req, res) =>{
    try{
      const produto = await Produto.findByPk( req.params.idproduto)
      res.status(200).send(produto)
    }
    catch(error){
      res.status(400).send(error.message)
    }
 })

module.exports = router