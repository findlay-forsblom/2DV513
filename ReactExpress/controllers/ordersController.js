const controller = {}
const query = require('../libs/dbQuery')
const moment = require('moment')

controller.insertOrder = async (req, res, next) => {
  console.log(req.body)

  let sql = `INSERT INTO Customer(firstname,lastname, address,state,postal_code,email)
  VALUES('${req.body.firstname}','${req.body.lastname}', '${req.body.address}', '${req.body.state}', '${req.body.zip}', '${req.body.email}')`
  try {
    await query(sql)
  } catch (error) {
    if (error.errno !== 1062) {
      process.exit()
    }
  }
  sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  let result = await query(sql)
  const id = result[0].id_customer
  sql = `INSERT INTO Phone_Db.Order(Customer_id_customer, order_date) 
  VALUES('${id}', '${moment().format('YYYY-MM-D')}')`
  result = await query(sql)
  const orderId = result.insertId
  if (orderId) {
    const basket = req.body.basketItems
    // console.log(basket)
    for (const i in basket) {
      const item = basket[i]
      sql = `INSERT INTO Phone_Db.Product_Order(Product_id_products, quantity, order_number) 
  VALUES('${item.id}', '${item.quantity}', ${orderId})`
      result = await query(sql)
    }
  }
  res.send({ msg: 'Sucessfull' })
}

module.exports = controller
