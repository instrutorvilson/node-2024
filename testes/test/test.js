const assert = require('assert')
const Calculadora = require('../calculos/calculadora')

describe('Primeira suite de testes',()=>{
  
    it('Should return -1 if value not exists', ()=>{
       //Arrange
        const numeros = [1, 2, 3]
       //Act
       const resultado = numeros.indexOf(4) 
       //Assertion
       assert.equal(resultado, -1)
    })
})

describe('Testando calculos', ()=>{
    var calculadora = ''
    before(()=>{ //hook
       calculadora = new Calculadora()
    })
    it('should return 8 when add(5,3)',()=>{
        const resultadoEsperado = 8        
        const resultado = calculadora.add(5,3)
        assert.equal(resultado, resultadoEsperado)
    })

    it('should return 2 when subtract(5,3)',()=>{
        const resultadoEsperado = 2       
        const resultado = calculadora.subtract(5,3)
        assert.equal(resultado, resultadoEsperado)
    })

    it('should return 3 when divide(15,5)',()=>{
        const resultadoEsperado = 3.1      
        const resultado = calculadora.divide(15.5,5)
        assert.equal(resultado, resultadoEsperado)
    })

    it('should throw Error when divide by Zero',()=>{           
        assert.throws(()=>{calculadora.divide(15,0)}, Error)
    })
})