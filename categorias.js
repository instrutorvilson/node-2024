const express = require('express')
const router = express.Router()

const bd = require('./bd')
const { Categoria } = require('./modelos')

router.post('/', async(req, res) =>{
   try{
     const cat = await Categoria.create(req.body)
     res.status(201).send(cat)
   }
   catch(error){
     res.status(400).send(error.message)
   }
})

router.get('/', async(req, res) =>{
    try{
      const categorias = await Categoria.findAll()
      res.status(200).send(categorias)
    }
    catch(error){
      res.status(400).send(error.message)
    }
 })

module.exports = router