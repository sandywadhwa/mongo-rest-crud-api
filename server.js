const express = require('express')
const app = express()
const config = require('./backend/config/config');
const port = config.web_port
const dbconnect = require('./backend/db/connect');
const todoRouter = require('./backend/routes/todoRouter')
var bodyParser = require('body-parser')

// Connect to Database
dbconnect();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/todos', todoRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

