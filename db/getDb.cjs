const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/database.sqlite',
});

module.exports = () => { return { sequelize, Op } };