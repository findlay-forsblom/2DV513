const controller = require('../controllers/productController.js')
const express = require('express')

const router = express.Router()

router.get('/', controller.getProducts)

module.exports = router
