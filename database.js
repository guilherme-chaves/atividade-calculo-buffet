import sqlite3 from 'sqlite3';
import chainConsumption from './db/chainConsumption.js';
import chainGetList from './db/chainGetList.js';
import chainML from './db/chainML.js';
import chainNewEvent from './db/chainNewEvent.js';

const db = { connection: {} }

export default () => {
    const newEvent = async (date, numPeople, prediction) => {
        const { runChain } = chainNewEvent();
        runChain(date, numPeople, prediction);
    }
    
    const getLastEvents = async () => {
        const { runChain } = chainGetList();
        return runChain();
    }

    const getMLData = async () => {
        const { runChain } = chainML();
        return runChain();
    }
    
    const updateConsumption = async (idEvent, consumption) => {
        const { runChain  } = chainConsumption();
        runChain(idEvent, consumption);
    }

    return {
        newEvent,
        getLastEvents,
        getMLData,
        updateConsumption
    }
};
