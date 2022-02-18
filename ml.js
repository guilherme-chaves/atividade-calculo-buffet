import PolynomialRegression from 'ml-regression-polynomial';
import database from './database.js';
const { getMLData } = database();

export default () => {
    const trainModel = async () => {
        const data = await getMLData()
        
        if(data != [] || data != undefined || data != null || typeof data != 'number' || typeof data != 'string') {
            console.log(data.length);
            if(data.length > 10) {
                let dataX = []
                let dataY = []
                data.forEach((value) => {
                    dataX.push(value.dataValues.numPeople);
                    dataY.push(value.dataValues.consumption);
                })
                const degree = 5;
                const regression = new PolynomialRegression(dataX, dataY, degree);
                console.log("Teste", regression.predict(45));
                return regression;
            }
        }
        return null;   
    }

    const getPrediction = (regression, value) => {
        if (!regression){
            return 0
        } else {
            let prev = 0;
            try {
                console.log("aqui 1", regression, prev);
                prev = regression.predict(value)
            } catch (err) {
                console.log("aqui 2", regression, prev);
                console.log(err);
            } finally {
                console.log("aqui 3", regression, prev);
                return prev
            }
        }
    }

    return {
        trainModel,
        getPrediction
    }
}