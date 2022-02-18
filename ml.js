import PolynomialRegression from 'ml-regression-polynomial';
import database from './database.js';
const { getMLData } = database();

export default () => {
    const trainModel = async () => {
        const data = await getMLData()
        
        if(data != [] || data != undefined || data != null || typeof data != 'number' || typeof data != 'string') {
            // É necessário ao menos 10 (dez) valores cadastrados para que a aplicação gere um modelo
            if(data.length > 10) {
                let dataX = []
                let dataY = []
                data.forEach((value) => {
                    dataX.push(value.dataValues.numPeople);
                    dataY.push(value.dataValues.consumption);
                })
                const degree = 5;
                const regression = new PolynomialRegression(dataX, dataY, degree);
                return regression;
            }
        }
        return null;   
    }

    const getPrediction = (regression, value) => {
        if (!regression){
            // Valor retornado caso não exista modelo
            return 0
        } else {
            let prev = 0;
            try {
                // Caso o modelo exista, tente produzir um valor baseado na entrada
                prev = regression.predict(value)
            } catch (err) {
                console.log(err);
            } finally {
                return prev
            }
        }
    }

    return {
        trainModel,
        getPrediction
    }
}