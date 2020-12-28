const db = require('../config/db')
const controller = {}

controller.getProducts = async (req, res, next) => {
  const sql = 'SELECT * FROM product WHERE price > 250'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
  })
}

controller.orderBy = async (req, res, next) => {
  const col = req.body.sort
  const order = req.body.order
  const start = req.body.start
  const perPage = req.body.perPage

  console.log(start, perPage)

  let totalPhones = 0
  const sqlTotalPhones = `SELECT count(*) as total from Phone_Db.Product WHERE price > 250;`

  const sql = `SELECT * FROM Phone_Db.Product WHERE price > 250 ORDER BY ${col} ${order} LIMIT ${start}, ${perPage};`
  db.query(sql, (err, results) => {
    if (err) throw err
    db.query(sqlTotalPhones, (err, totalPhones) => {
      if (err) throw err
      res.send({total: totalPhones[0].total, phones: results})
    })
  })
}

module.exports = controller
