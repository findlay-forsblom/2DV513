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
  console.log('I am here lol 3')
  const col = req.body.sort
  const order = req.body.order

  const sql = `SELECT * FROM Phone_Db.Product WHERE price > 250 ORDER BY ${col} ${order};`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
    // console.log(results)
  })

}

module.exports = controller
