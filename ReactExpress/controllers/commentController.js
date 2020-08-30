const db = require('../config/db')
const moment = require('moment')
const controller = {}

controller.getComments = async (req, res, next) => {
  const id = req.params.id
  const sql = `SELECT title, created, rating, Cust.username, Com.product_id, Com.id_comment 
  FROM Phone_Db.Comment as Com
  JOIN Reveiwer as Cust on Cust.id_reveiwer = Com.reviewer_id
  Where Com.product_id = ${id}
  ;`
  const regex = /\\/g
  db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach(element => {
      element.created = moment(element.created).calendar()
      element.title = unescape(element.title.replace(regex, ''))
    })
    res.send(results)
  })
}

module.exports = controller
