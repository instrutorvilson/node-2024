const contatos = [
    {
        id:1,
        nome:'maria',
        email:'maria@gmail.com'
    },
    {
        id:2,
        nome:'joao',
        email:'joao@gmail.com'
    }
]

const compromissos = [
    {
        id:1,
        descricao:"Jogar bocha",
        data:"03/02/2024",
        local: {
            id: 1,
            nome: "cancha de bocha",
            rua: "Rua Carlos Honburg",
            bairro: "Wunderwald",
            cidade: "Pomerode",
            fone: " (47) 98851-1764"
        },
        contato: {
            id:2,
            nome:'joao',
            email:'joao@gmail.com'
        }
    }
]

const locais = [
    {
        id: 1,
        nome: "cancha de bocha",
        rua: "Rua Carlos Honburg",
        bairro: "Wunderwald",
        cidade: "Pomerode",
        fone: " (47) 98851-1764"
    }
]

module.exports = [contatos, compromissos, locais]