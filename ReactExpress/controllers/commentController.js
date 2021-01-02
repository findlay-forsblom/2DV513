const db = require('../config/db')
const moment = require('moment')
const { query } = require('express')
const controller = {}

controller.postComment = async (req, res, next) => {
  const userName = req.body.username
  const rating = req.body.rating
  const title = req.body.title
  const comment = req.body.comment
  const productId = req.body.productId
  console.log(req.body)
  const sql = `CALL CreateComment('${comment}', '${moment().format('YYYY-MM-D')}','${title}', ${rating}, ${productId}, '${userName}')`
  console.log(sql)
  db.query(sql, (err, result) => {
    if(err) {
      console.log(err)
    }
    console.log(result)
  })
  res.send({msg: "Success!"})
}

controller.getComments = async (req, res, next) => {
  const id = req.params.id
  const sql = `SELECT title, body, created, rating, Cust.username, Com.product_id, Com.id_comment 
  FROM Phone_Db.Comment as Com
  JOIN Reveiwer as Cust on Cust.id_reveiwer = Com.reviewer_id
  Where Com.product_id = ${id}
  ORDER BY created DESC;`
  const regex = /\\/g
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

module.exports = controller
