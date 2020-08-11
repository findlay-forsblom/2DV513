const express = require('express')
const path = require('path')

const port = 8000
const app = express()


app.listen(port, () => console.log('Server running at http://localhost:' + port))