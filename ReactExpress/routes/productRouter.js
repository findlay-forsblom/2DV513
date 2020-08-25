const controller = require('../controllers/productController.js')
const express = require('express')

const router = express.Router()

router.get('/', controller.getProducts)
router.post('/orderBy', controller.orderBy)

module.exports = router
