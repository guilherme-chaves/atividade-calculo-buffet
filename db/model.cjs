const Sequelize = require('sequelize')
const database = require('./getDb.cjs');
const { sequelize } = database();

const eventConsumption = sequelize.define('eventConsumption', {
    idEvent: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateHour: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: Date.now()
    },
    numPeople: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    prediction: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    },
    consumption: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.0
    }
})

module.exports = () => { return eventConsumption }