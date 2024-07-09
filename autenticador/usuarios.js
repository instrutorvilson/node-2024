const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../agenda/config')
const { validaCadastro, validaDadosLoginUser } = require('../agenda/midlewares')


router.post('/registrar', validaCadastro, validaDadosLoginUser, async (req, res) => {
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

router.post('/login', async (req, res) => {
    try {
        let cliente = await pool.connect()
        let dados = await cliente.query('select * from tb_usuarios where email = $1', [req.body.email])
        if (dados.rowCount > 0) {
            //comparar a senha        
            let ok = await bcrypt.compare(req.body.password, dados.rows[0].password)
            if (ok) {
                //gerar o token
                let token = jwt.sign(
                    {
                        id: dados.rows[0].id,
                        nome: dados.rows[0].nome,
                        email: dados.rows[0].email,
                        perfil: dados.rows[0].perfil
                    },
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' })
                res.status(200).send(token)
            }
            else
                res.status(404).send('Senha não confere')
        }
        else {
            res.status(404).send('Usuario não cadastrado')
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router