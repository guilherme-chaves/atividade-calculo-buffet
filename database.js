import dbOpts from './db/getDb.cjs'
import EventConsumption from './db/model.cjs'
const { sequelize, Op } = dbOpts();


export default () => {
    (async () => {
        try {
            await sequelize.sync();
        } catch (error) {
            console.log(error);
        }
    })();


    const newEvent = async (date, numPeople, prediction) => {
        try {
            const model = EventConsumption();
            await model.create({
                dateHour: date,
                numPeople,
                prediction
            });
        } catch(err) {
            console.log(error);
        }
    }
    
    const getLastEvents = async () => {
        try {
            const model = EventConsumption();
            const resultSelect = await model.findAll({
                order: [['idEvent', 'DESC']],
                limit: 25
            })
            return resultSelect;
        } catch (error) {
            console.log(error);
        }
    }

    const getMLData = async () => {
        try {
            const model = EventConsumption();
            const resultSelect = await model.findAll({
                attributes: ['numPeople', 'consumption'],
                order: [['numPeople', 'ASC']],
                where: {
                    [Op.not]: [
                        { consumption: 0 },
                    ]
                }
            });
            return resultSelect;
        } catch (error) {
            console.log(error);
        }
    }
    
    const updateConsumption = async (idEvent, consumption) => {
        try {
            const model = EventConsumption();
            await model.update({ consumption }, {
                where: {
                    idEvent
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return {
        newEvent,
        getLastEvents,
        getMLData,
        updateConsumption
    }
};
