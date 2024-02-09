const express = require('express')
router = express.Router()
const dados = require('./database/db')[0]
const pg = require('pg')

const pool = new pg.Pool({connectionString: process.env.DATABASE})

 router.get('/conectar', async(req, res) => {
    /* pool.connect((err, client)=>{
        if(err){
            res.status(401).send({
                message: "conexão não autorizada",
                erro: err.message
            })            
        }
        res.status(201).send("conectado");
    })   */
    try{
       var client = await pool.connect()
       res.status(201).send("conectado");
    }
    catch(err){
        res.status(401).send({
            message: "conexão não autorizada",
            erro: err.message
        })  
    }
})

router.get('/', async(req, res) => {
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from categoria')
        res.status(200).send(dados.rows);
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
})

router.get('/:id', async(req, res) => {
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from categoria where id = $1',[req.params.id])
         if(dados.rowCount > 0)
           res.status(200).send(dados.rows[0])
         else{
            res.status(400).send({ message: "Categoria não cadastrada"});
         }
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
})

router.post('/', async(req, res)=>{
    try{
        var client = await pool.connect()
        var categoria = await client.query('insert into categoria(descricao)values($1) RETURNING *',[req.body.descricao])
        res.status(201).send(categoria.rows[0]);
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
     finally{
        if(client){
            client.release()
        }
     }
})

router.put('/:id', async(req, res)=>{
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from categoria where id = $1',[req.params.id])
        if(dados.rowCount > 0){
            dados = await client.query('update categoria set descricao = $1 where id = $2 RETURNING *',[req.body.descricao,req.params.id])
            res.status(200).send(dados.rows);
        }         
        else{
           res.status(400).send({ message: "Categoria não cadastrada"});
        }
        
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
     finally{
        if(client){
            client.release()
        }
     }
})

router.delete('/:id', async(req, res) => {
    try{
        var client = await pool.connect()
        var dados = await client.query('select * from categoria where id = $1',[req.params.id])
        if(dados.rowCount > 0){
            await client.query('delete from categoria where id = $1',[req.params.id])
            res.sendStatus(204)
        }         
        else{
           res.status(400).send({ message: "Categoria não cadastrada"});
        }        
     }
     catch(err){
         res.status(401).send({
             message: "conexão não autorizada",
             erro: err.message
         })  
     }
     finally{
        if(client){
            client.release()
        }
     }     
})

module.exports = router