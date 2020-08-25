const controller = require('../controllers/commentController.js')
const express = require('express')

const router = express.Router()

console.log('i am here 2')

router.get('/:id', controller.getComments)

module.exports = router
