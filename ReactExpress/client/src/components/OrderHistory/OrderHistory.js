import React, { useContext } from 'react'
import './OrderHistory.css'
import MyContext from '../../contexts/Mycontext'

const OrderHistory = (req, res, err) => {
  const contextValue = useContext(MyContext)

  var email = contextValue.orderHistory
  var orders = "No orders"

  if(req.location.data){
    email = email ? email : req.location.data.email
    orders = req.location.data.orders
  }

  contextValue.orderHistory = email
  
  return (
  <div className="row">
    <div className="col-75">
      <div className="container">
        <div className="row">
          <div className="col-50 text-center">
            <h3>Order history</h3>
            <p>Order history for user with email: {email}</p>
            <a className="btn btn-primary" href="/" role="button" width="fit-content">Home</a>     
            <div className="col-50 text-left" id="tableDiv">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order id</th>
                    <th scope="col">Total amount</th>
                    <th scope="col">Number of items</th>
                    <th scope="col">Order date</th>
                  </tr>
                </thead>
                <tbody>
                    {createTableRows(orders)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  )
}

function createTableRows(orders) {
  var rows = []
  var order = null
  for(var i = 1; i<=orders.length; i++){
    order = orders[i-1]
    let link = `/orderHistory?orderId=${order.order_number}&customer=${order.id_customer}`
    rows.push(<tr key={i}>
      <th scope="row">{i}</th>
      <td>{order.order_number}</td>
      <td>{order.order_total}</td>
      <td>{order.quantity_order}</td>
      <td>{new Date(order.order_date).toUTCString()}</td>
    </tr>)
  }

  return rows
}

export default OrderHistory
