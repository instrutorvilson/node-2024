class Calculadora {
    add(n1, n2){
        return n1 + n2 
    }

    subtract(n1, n2){
        return n1 - n2
    }

    multiply(n1, n2){
        return n1 * n2
    }

    divide(n1, n2){
        if(n2 == 0)
          throw new Error("Não é possivel dividir por zero")
        return n1 / n2
    }
}

module.exports = Calculadora