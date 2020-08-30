const db = require('../config/db')
const controller = {}
const query = require('../libs/dbQuery')
const moment = require('moment')

controller.insertOrder = async (req, res, next) => {
  console.log('I am here lols')
  console.log(req.body)

  let sql = `INSERT INTO Customer(firstname,lastname, address,state,postal_code,email)
  VALUES('${req.body.firstname}','${req.body.lastname}', '${req.body.address}', '${req.body.state}', '${req.body.zip}', '${req.body.email}')`
  try {
    const result = await query(sql)
    console.log(result)
    // console.log(result)
  } catch (error) {
    console.log(error.errno)
    if (error.errno !== 1062) {
      process.exit()
    }
  }
  sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  let result = await query(sql)
  console.log(result)
  const id = result[0].id_customer
  console.log(id)
  sql = `INSERT INTO Phone_Db.Order(Customer_id_customer, order_date) 
  VALUES('${id}', '${moment().format('YYYY-MM-D')}')`
  result = await query(sql)
  const orderId = result.insertId
  if (orderId) {
    const basket = req.body.basketItems
    // console.log(basket)
    for (const i in basket) {
      const item = basket[i]
      console.log(item)
      sql = `INSERT INTO Phone_Db.Product_Order(Product_id_products, quantity, order_number) 
  VALUES('${item.id}', '${item.quantity}', ${orderId})`
      result = await query(sql)
    }
  }
  console.log(' chathe me outside')
  // db.query(sql, async (err, results) => {
  //   if (err) {
  //     if (err.errno === 1062) {
  //       console.log('jo')
  //       try {
  //         sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  //         const result = await db.query(sql)
  //         console.log(result)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //       // sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  //       // db.query(sql, (err, results) => {
  //       //   if (err) {
  //       //     console.log(err)
  //       //   }
  //       //   console.log(results)
  //       //   const id = results[0].id_customer
  //       //   console.log(id)
  //       // })
  //     }
  //   }
  //   // res.send(results)
  // })
}

module.exports = controller
