const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config({
  path: './.env'
})

const port = 8000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/products', require('./routes/productRouter.js'))
app.use('/comments', require('./routes/commentRouter.js'))
app.use('/orders', require('./routes/orderRouter'))

app.listen(port, () => console.log('Server running at http://localhost:' + port))
