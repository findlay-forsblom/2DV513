const db = require('../config/db')
const controller = {}

controller.getProducts = async (req, res, next) => {
  console.log('i am here')
  const sql = 'SELECT * FROM product WHERE price > 250'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
  })
}

module.exports = controller
