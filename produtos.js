const express = require('express')
const router = express.Router()
const validaProduto = require('./middlewares/validaProduto')

const { Produto } = require('./modelos')

router.post('/', validaProduto, async(req, res) =>{
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

 router.put('/:idproduto', async(req, res) =>{
    try{
      let produto = await Produto.findByPk(req.params.idproduto)
      if(produto != undefined){
        await Produto.update(req.body, { where : { id : req.params.idproduto}})
        res.status(200).send(req.body)
      }
      else
      res.status(404).send("Produto não cadastrado")
    }
    catch(error){
      res.status(400).send(error.message)
    }
 })

 router.delete('/:idproduto', async(req, res) =>{
    try{
      let produto = await Produto.findByPk(req.params.idproduto)
      if(produto != undefined){
        await Produto.destroy({ where : { id : req.params.idproduto}})
        res.status(204).send()
      }
      else
      res.status(404).send("Produto não cadastrado")
    }
    catch(error){
      res.status(400).send(error.message)
    }
 })


module.exports = router