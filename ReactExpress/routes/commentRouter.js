const controller = require('../controllers/commentController.js')
const express = require('express')

const router = express.Router()

router.get('/:id', controller.getComments)
router.post('/post/:id', controller.postComment)

module.exports = router
