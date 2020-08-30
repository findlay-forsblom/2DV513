const controller = require('../controllers/commentController.js')
const express = require('express')

const router = express.Router()

router.get('/:id', controller.getComments)

module.exports = router
