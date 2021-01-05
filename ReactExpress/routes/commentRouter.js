const controller = require('../controllers/commentController.js')
const express = require('express')

const router = express.Router()

router.get('/reviewer/:id', controller.getReviewer)
router.get('/reviewer/:id/:start', controller.getReviews)
router.get('/:id', controller.getComments)
router.post('/post/:id', controller.postComment)

module.exports = router
