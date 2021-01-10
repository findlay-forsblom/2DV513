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
  LEFT JOIN (select sum(quantity) AS quantity_order, phone_db.product_order.order_number FROM phone_db.product_order 
    GROUP BY phone_db.product_order.order_number) AS quantities 
    ON quantities.order_number = phone_db.order.order_number;`
  // var sql = `SELECT * FROM phone_db.customer_history WHERE email = '${email}';`
  var result = await sendQuery(sql)
  res.send({ msg: result })
}

/**
 * Inserts order data into the database. First if a customer does not exist, it inserts a new customer.
 * Then inserts order into order table, followed by inserting each product into products table.
 */
controller.insertOrder = async (req, res, next) => {
  try {
    await sendQuery('START TRANSACTION;')
    const customer = await handleCustomer(req)
    const order = await handleOrder(customer[0].id_customer, req.body.total)
    if (orderId = order.insertId) {
      const basket = req.body.basketItems
      for (const i in basket) {
        const item = basket[i]
        if (item.quantity > 0) {
          const result = await handleProduct(item, orderId)
          if (result.affectedRows < 1) {
            throw new Error('Not enough products in stock.')
          }
        }
      }
    }

    await sendQuery('COMMIT;')
    res.send({ msg: 'Successful' })
  } catch (err) {
    await sendQuery('ROLLBACK;')
    res.send(500, { error: err.message })
  }
}

/**
 *  Handles queries to database. Uses dbQuery library.
 */
async function sendQuery (sql) {
  try {
    const result = await query(sql)
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
async function handleCustomer (req) {
  let sql = `INSERT INTO Customer(firstname,lastname, address,state,postal_code,email)
  VALUES('${req.body.firstname}','${req.body.lastname}', '${req.body.address}', '${req.body.state}', '${req.body.zip}', '${req.body.email}')
  ON DUPLICATE KEY UPDATE
  firstname = '${req.body.firstname}', 
  lastname = '${req.body.lastname}', 
  address = '${req.body.address}', 
  state = '${req.body.state}', 
  postal_code = '${req.body.zip}'`
  var result = await sendQuery(sql)

  sql = `SELECT id_customer FROM Customer WHERE email = '${req.body.email}'`
  result = await sendQuery(sql)

  return result
}

/**
 * Inserts order into the order table. Returns result of insert for next query.
 */
async function handleOrder (customerID, orderTotal) {
  const sql = `INSERT INTO Phone_Db.Order(Customer_id_customer, order_date, order_total) 
  VALUES('${customerID}', '${moment().format('YYYY-MM-D')}', ${orderTotal})`
  const result = await sendQuery(sql)

  return result
}

/**
 * Inserts product into products table.
 */
async function handleProduct (item, orderId) {
  // Insert with check if stock is enough.
  const sql = `INSERT INTO Phone_Db.Product_Order(Product_id_products, quantity, order_number)
  SELECT '${item.id}','${item.quantity}', '${orderId}'
  WHERE (SELECT stock FROM Phone_Db.Product WHERE id_products = ${item.id}) >= ${item.quantity}`
  const result = await sendQuery(sql)

  if (result.affectedRows > 0) {
    const removeStock = `UPDATE Phone_Db.Product SET stock = stock - ${item.quantity} WHERE id_products = ${item.id}`
    await sendQuery(removeStock)
  }

  return result
}

module.exports = controller
