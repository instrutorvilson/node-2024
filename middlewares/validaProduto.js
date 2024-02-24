module.exports = (req, res, next) => {
    
    if(req.body.descricao == null || req.body.descricao == ''){
     res.status(404).send("A descrição precisa ser informada!")
     return
   }

   if(req.body.preco == null || req.body.preco == ''){
    res.status(404).send("O preço precisa ser informado!")
    return
  }

   next()
}