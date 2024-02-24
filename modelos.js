const { Sequelize, DataTypes } = require('sequelize')
const bd = require('./bd')

const Produto = bd.define("tb_produtos", {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL,
    }
});

const Categoria = bd.define("tb_categorias", {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ativa: {
        type: DataTypes.BOOLEAN,
    }
});

module.exports = { Produto, Categoria }