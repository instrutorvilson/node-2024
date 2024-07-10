const request = require('supertest')
const app = require('../servidor/app')
const assert = require('assert')
const expect = require('expect.js')

describe('Testando api de contatos', () =>{
    it('Should return ola when access /hello', (done)=>{
      request(app)
      .get('/hello')
      .end((err, res)=>{
        assert.equal(res.status, 200)
        assert.strictEqual(res.text,'Olá mundo')
        done()
      })
    })

    const contato = {id:1, nome:'Jose'}
    it('Should return id when access /consultar', (done)=>{
        request(app)
        .get('/consultar')
        .end((err, res)=>{
          assert.equal(res.status, 200)
          assert.strictEqual(res.body.id, contato.id)
          done()
        })
      })

      it('Should return object when access /consultar', (done)=>{
        request(app)
        .get('/consultar')
        .end((err, res)=>{
          assert.equal(res.status, 200)
          expect(res.body).to.be.an('object')
          done()
        })
      })
})