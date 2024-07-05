const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const pool = require('./config')


router.post('/registrar', async (req, res) => {
    try {
        let hashSenha = await bcrypt.hash(req.body.password, 10)
        let cliente = await pool.connect()
        let dados = await cliente.query('select * from tb_usuarios where email = $1', [req.body.email])

        if (dados.rowCount > 0) {
           res.status(400).send('Já existe um usuário com este email.')
        }
        else {
            let sql = 'insert into tb_usuarios(nome, email, password, perfil)values($1,$2,$3,$4)'
            dados = [req.body.nome, req.body.email, hashSenha, req.body.perfil]
            await cliente.query(sql, dados)
            cliente.end()
            res.status(201).send('Usuário criado com sucesso')
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/login', (req, res) => {
    res.send('login')
})


module.exports = router