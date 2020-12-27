import React, {useContext, useEffect, useState} from 'react'
import ShoppingCart from './ShoppingCart/ShoppingCart'
import MyContext from '../../contexts/Mycontext'
import { Link } from 'react-router-dom'

const ShoppingCarts = (props) => {
  const contextValue = useContext(MyContext)
  const [items, setItems] = useState([])

  useEffect(() => {
    const items = contextValue.state.items
    setItems(items)
  }, [])

  const calculateTotal = () => {
    let total = 0
    items.forEach(item => {
      total += item.price * item.quantity
    })
    contextValue.state.total = total
    return total
  }

  const changeAmount = (id, event) => {
    const items = contextValue.state.items
    items.forEach(item => {
      if (item.id === id) {
        item.quantity = event.target.value
      }
    })
    const changeBasket = contextValue.state.setItems
    changeBasket(items)
    setItems(items)
  }

  const removeItem = (id) => {
    console.log('deleting')
    let items = contextValue.state.items
    items = items.filter(item => item.id !== id)
    setItems(items)
    const changeBasket = contextValue.state.setItems
    const changeNumber = contextValue.state.changeBasket
    changeBasket(items)
    changeNumber(items.length)
  }
  return (
    <div className="container">
      <table id="cart" className="table table-hover table-condensed">
                <thead>
                <tr>
                  <th style={{width: '50%'}}>Product</th>
                  <th style= {{width: '10%'}}>Price</th>
                  <th style= {{width: '8%'}}>Quantity</th>
                  <th style={{width: '22%'}} className="text-center">Subtotal</th>
                  <th style={{width: '10%'}}></th>
                </tr>
              </thead>
              <tbody>
              {
              items.map((element,i) => {
                return <ShoppingCart
                id = {i +1}
                price ={element.price}
                img = {element.img}
                name = {element.name}
                amount = {element.quantity}
                handleAmount = {changeAmount.bind(this, element.id)}
                handleDelete = {removeItem.bind(this, element.id)}
                key = {element.id}/>
              }) }

              </tbody>
              <tfoot>
            
                <tr>
                  <td><Link to ='/' className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
                  <td colspan="2" className="hidden-xs"></td>
                  <td className="hidden-xs text-center"><strong>Total ${calculateTotal()}</strong></td>
                  <td><Link to='/checkout' className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link></td>
                </tr>
              </tfoot>
            </table>
    </div>
  )
}

export default ShoppingCarts
