const backend = require('express')
const mongoDriver = require('mongoose')
const personController = require('.')
const bodyParser = require('body-parser')
const mongoURI = 'mongodb://127.0.0.1:27017/nithin_db';

const app = backend()
app.use(bodyParser.json())

// Code to connect to the db with required settings
mongoDriver.connect(mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }). then( () => console.log('DB connected successfully')).catch(err => console.err(err))

// Routes
app.post('/persons', personController.createPerson)

app.get('/persons', personController.readAllPersons)

app.get('/persons/:id', personController.readPersonById)

app.put('/persons/:id', personController.updatePersonById)

app.delete('/persons/:id', personController.deletePersonById)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is running on port ', port)
})