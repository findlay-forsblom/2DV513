const db = require('../config/db')
const controller = {}

/**
 * Query to get the brands
 */
controller.getBrands = async (req, res, next) => {
  const sql = 'SELECT * FROM brand'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
  })
}

/**
 * Query to recieve a particular product
 */
controller.getProduct = async (req, res, next) => {
  const sql = `SELECT * FROM product WHERE id_products = ${req.params.id}`
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
  })
}

/**
 * Query that get all phones from the database
 * There were phones in the csv files that contained phones that cost less than 0 dollars
 * That is why the "WHERE" clause is used.
 */
controller.getProducts = async (req, res, next) => {
  const sql = 'SELECT * FROM product WHERE price > 0'
  db.query(sql, (err, results) => {
    if (err) throw err
    res.send(results)
  })
}

/**
 * Function that decides how to order the phones retrieved from the database
 */
controller.orderBy = async (req, res, next) => {
  const col = req.body.sort
  const order = req.body.order
  const start = req.body.start
  const perPage = req.body.perPage
  const brand = req.body.brand

  const orderStr = order == null ? '' : `ORDER BY ${col} ${order} `
  const limitStr = perPage < 0 ? ';' : `LIMIT ${start}, ${perPage};`
  const brandStr = brand == '' ? '' : `AND Brand_idBrand = ${brand} `

  // Query to get total number of phones, for pagination.
  const sqlTotalPhones = `SELECT count(*) as total from Phone_Db.Product WHERE price > 0 ${brandStr};`

  // Query to get phone products.
  const sql = `SELECT * FROM Phone_Db.Product WHERE price > 0 ${brandStr}${orderStr}${limitStr}`
  db.query(sql, (err, results) => {
    if (err) throw err
    db.query(sqlTotalPhones, (err, totalPhones) => {
      if (err) throw err
      res.send({ total: totalPhones[0].total, phones: results })
    })
  })
}

module.exports = controller
