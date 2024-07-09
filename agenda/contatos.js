const express = require('express')
const router = express.Router()
const pool = require('./config')
const { validaCadastro } = require('./midlewares')

router.get('/', async (req, res) => {
   try {
      let cliente = await pool.connect()
      let dados = await cliente.query('select * from tb_contatos')
      cliente.end()
      res.send(dados.rows)
   } catch (error) {
      res.send(error.message)
   }
   
})

router.post('/', validaCadastro, async (req, res) => {
   try {          
         let cliente = await pool.connect()
         let dados =
            await cliente.query(
               'insert into tb_contatos(nome, email)values($1,$2) RETURNING *',
               [req.body.nome, req.body.email])
         
         cliente.end()
   
         res.status(201).send(dados.rows[0])      
      
   } catch (error) {
      res.send(error.message)
   }
})

router.delete('/:id', async (req, res) => {
   try {
      let cliente = await pool.connect()
      await cliente.query('delete from tb_contatos where id = $1', [req.params.id])
      cliente.end()
      res.status(204).send('')      
   } catch (error) {
      res.status(404).send(error.message)
   }

})

router.get('/:id', async (req, res) => {
   try {
      let cliente = await pool.connect()
      let dados = await cliente.query('select * from tb_contatos where id = $1',
       [req.params.id])

       cliente.end()
      if (dados.rowCount > 0)
         res.status(200).send(dados.rows[0])
      else
         res.status(404).send('Contato não encontrado')
      
   } catch (error) {
      res.status(404).send(error.message)
   }
})

router.put('/:id', validaCadastro, async(req, res) => {
   try {
      let cliente = await pool.connect()
      let dados = await cliente.query('select * from tb_contatos where id = $1',[req.params.id])

      if(dados.rowCount > 0){
        let novosValores = [req.body.nome, req.body.email, req.params.id]
        await cliente.query('update tb_contatos set nome = $1, email = $2 where id = $3', novosValores)
        
        cliente.end()

        res.status(200).send('Contato alterado com sucesso')
      }else{
         res.status(404).send('Contato não encontrado') 
      }
   } catch (error) {
      res.status(404).send(error.message) 
   }
   
})




module.exports = router