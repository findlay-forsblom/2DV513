const controller = {}
const query = require('../libs/dbQuery')
const moment = require('moment')

/**
 * Fetches the order history of a user. Joins data from three tables. 
 */
controller.fetchHistory = async (req, res, next) => {
  var email = req.body.email
  var sql = `
  SELECT phone_db.order.order_number, order_date, order_total, id_customer, quantity_order FROM phone_db.order
  RIGHT JOIN (SELECT id_customer FROM Customer WHERE email = '${email}') AS customers ON 
    customers.id_customer = Customer_id_customer
  LEFT JOIN (select sum(quantity) AS quantity_order, phone_db.product_order.order_number FROM phone_db.product_order GROUP BY phone_db.product_order.order_number) AS quantities ON
    quantities.order_number = phone_db.order.order_number
  `
  var customerID = await sendQuery(sql)
  res.send({msg: customerID})
}

/**
 * Inserts order data into the database. First if a customer does not exist, it inserts a new customer.
 * Then inserts order into order table, followed by inserting each product into products table.
 */
controller.insertOrder = async (req, res, next) => {
  const customer = await handleCustomer(req)
  const order = await handleOrder(customer[0].id_customer, req.body.total)
  
  if (orderId = order.insertId) {
    const basket = req.body.basketItems

    for (const i in basket) {
      const item = basket[i]
      if(item.quantity > 0) {
        await handleProduct(item, orderId)
      }
    }
  }
  res.send({ msg: 'Successful' })
}

/**
 *  Handles queries to database. Uses dbQuery library.
 */
async function sendQuery(sql) {
  try {
    let result = await query(sql)
    return result
  } catch (error) {
    console.log(error)
    if (error.errno !== 1062) {
      process.exit()
    }
  }
}

/**
 * Inserts customer to customer table if not available, then fetches customer id for next query.
 */
async function handleCustomer(req) {
  let sql = `INSERT IGNORE INTO Customer(firstname,lastname, address,state,postal_code,email)
  VALUES('${req.body.firstname}','${req.body.lastname}', '${req.body.address}', '${req.body.state}', '${req.body.zip}', '${req.body.email}')`
  var result = await sendQuery(sql)

  sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  result = await sendQuery(sql)

  return result
}

/**
 * Inserts order into the order table. Returns result of insert for next query.
 */
async function handleOrder(customerID, orderTotal) {
  let sql = `INSERT INTO Phone_Db.Order(Customer_id_customer, order_date, order_total) 
  VALUES('${customerID}', '${moment().format('YYYY-MM-D')}', ${orderTotal})`
  result = await sendQuery(sql)

  return result
}

/**
 * Inserts product into products table.
 */
async function handleProduct(item, orderId) {
  let sql = `INSERT INTO Phone_Db.Product_Order(Product_id_products, quantity, order_number) 
  VALUES('${item.id}', '${item.quantity}', ${orderId})`
  let result = await sendQuery(sql)

  return result
}

module.exports = controller
