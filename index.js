import express from 'express'
import cors from 'cors'
import database from './database.js'
import ml from './ml.js'
const app = express()
const { getLastEvents, newEvent, updateConsumption } = database();
const { trainModel, getPrediction } = ml();
const port = 3000
const model = { regression: {} }

trainModel().then((regr) => {
    model.regression = regr
})


// Ativa o CORS para requisições feitas na rede local
const corsOptions = {
  origin: 'http://localhost'
};

app.use(cors(corsOptions))
app.use(express.json())
// Serve a pasta 'public' para acessos a rota raiz do servidor
app.use('/', express.static('public'))


// Recebe as requisições do método POST a rota /result e retorna o valor + 2
app.get('/listaeventos', (req, res) => {
    getLastEvents().then((result) => {
        res.status(200).json(result)
    })
    return
})


// Recebe as requisições do método POST a rota /result e retorna o valor + 2
app.post('/novoevento', (req, res) => {
    try {
        let data = req.body
        if(typeof data.datehour === 'string' && typeof data.people === 'number'){
            getPrediction(model.regression, data.people).then((prediction) => {
                console.log(prediction);
                newEvent(data.datehour, data.people, prediction).then((prediction) => {
                    res.status(200).json({ prediction })
                })
            })
            return
        } else {
          res.status(400).json({message: `Requisição com dados inválidos!!`})
          return
        }
    } catch (error) {
        res.status(500).json({error})
        return
    }
})


// Recebe as requisições do método POST a rota /result e retorna o valor + 2
app.post('/consumo', (req, res) => {
    try {
        let data = req.body
        // Verifica se a propriedade value existe e é um número
        if(typeof data.id === 'number' && typeof data.consumo === 'number'){
            updateConsumption(data.id, data.consumo).then(() => {
                model.regression = trainModel().then(() => {
                    res.sendStatus(200)
                })
            })
            return
        } else {
            res.status(400).json({message: `Requisição com dados inválidos!!`})
            return
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        return
    }
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
