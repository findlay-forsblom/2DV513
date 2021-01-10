const db = require('../config/db')
const moment = require('moment')
const controller = {}
const regex = /\\/g

controller.postComment = async (req, res, next) => {
  const userName = req.body.username
  const rating = req.body.rating
  const title = req.body.title
  const comment = req.body.comment
  const productId = req.body.productId
  const sql = `CALL CreateComment('${comment}', '${moment().format('YYYY-MM-D')}','${title}', ${rating}, ${productId}, '${userName}')`
  try {
    db.query(sql, (err, result) => {
      if (err) {
        throw new Error('Could not create comment.')
      }
    })
  } catch (err) {
    res.send({ error: err.message })
  }
  res.send({ msg: 'Success!' })
}

controller.getComments = async (req, res, next) => {
  const id = req.params.id
  const sql =
  `SELECT title, body, created, rating, Cust.username, Cust.id_reveiwer, Com.product_id, Com.id_comment 
  FROM Phone_Db.Comment as Com
  JOIN Reveiwer as Cust on Cust.id_reveiwer = Com.reviewer_id
  Where Com.product_id = ${id}
  ORDER BY created DESC;`

  db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach(element => {
      element.created = moment(element.created).calendar()
      element.title = unescape(element.title.replace(regex, ''))
      element.body = unescape(element.body.replace(regex, ''))
    })
    res.send(results)
  })
}

controller.getReviewer = async (req, res, next) => {
  const reviewer = req.params.id
  console.log(reviewer)
  const sql =
  `SELECT username, count(id_comment) as comments, min(created) as first_comment
  FROM reveiwer, comment
  WHERE reviewer_id = id_reveiwer AND
  id_reveiwer = ${reviewer};`

  try {
    db.query(sql, (err, result) => {
      if (err) {
        throw new Error('Could not create comment.')
      }
      res.send(result)
    })
  } catch (err) {
    res.send({ error: err.message })
  }
}

controller.getReviews = async (req, res, next) => {
  const reviewer = req.params.id
  const start = req.params.start
  const page = start ? start + ', ' : ''
  console.log(reviewer, start)
  const reviewsSql =
  `
  SELECT name as product, title, comment.rating, created, body, img_url
  FROM reveiwer, comment, product
  WHERE reviewer_id = id_reveiwer AND 
  product_id = id_products AND
  id_reveiwer = ${reviewer}
  ORDER BY created DESC
  LIMIT ${page}20;
  `
  console.log(reviewsSql)

  db.query(reviewsSql, (err, reviewsRes) => {
    if (err) {
      throw new Error('Could not create comment.')
    }
    reviewsRes.forEach(element => {
      element.title = unescape(element.title.replace(regex, ''))
      element.body = unescape(element.body.replace(regex, ''))
    })
    res.send(reviewsRes)
  })
}

module.exports = controller
