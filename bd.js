const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bd_node', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize