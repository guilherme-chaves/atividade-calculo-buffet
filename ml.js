import PolynomialRegression from 'ml-regression-polynomial';
import database from './database.js';
const { getMLData } = database();

export default () => {
    const trainModel = async () => {
        const data = await getMLData()
        
        if(data != [] || data != undefined || data != null || typeof data != 'number' || typeof data != 'string') {
            const dataX = []
            const dataY = []
            const degree = 5;
            if(dataX.length > 10 && dataY.length > 10) {
                const regression = new PolynomialRegression(dataX, dataY, degree);
                return regression;
            }
        }
        return null;   
    }

    const getPrediction = (regression, value) => {
        let prev = 0;
        if (regression === null){
            return 0
        }
        try {
            prev = regression.predict(value)
        } catch (err) {
            console.log(err);
        } finally {
            return prev
        }
    }

    return {
        trainModel,
        getPrediction
    }
}