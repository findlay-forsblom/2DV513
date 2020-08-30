const controller = require('../controllers/ordersController.js')
const express = require('express')

const router = express.Router()

router.post('/createOrder', controller.insertOrder)

module.exports = router
