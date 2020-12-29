import React from 'react'
import './ShoppingCart.css'

const style = {
  height: '75px',
  width: '50px'
}

const shoppingCart = (props) => {
  return (
    <tr>
      <td data-th="Product">
        <div class="row">
          <div class="col-sm-2 hidden-xs"><img src={props.img} style={style} alt="..." class="img-responsive"/></div>
          <div class="col-sm-10 lol">
            <h4 class="nomargin">Product {props.id}</h4>
            <p>{props.name}</p>
          </div>
        </div>
      </td>
      <td data-th="Price">${props.price}</td>
      <td data-th="Quantity">
        <input type="number" class="form-control text-center" max={props.stock} min="0" value={props.amount} onChange={props.handleAmount} />
      </td>
      <td data-th="Subtotal" class="text-center">{props.price * props.amount}</td>
      <td class="actions" data-th="">
        <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o" onClick= {props.handleDelete}></i></button>
      </td>
    </tr>
  )
}

export default shoppingCart
