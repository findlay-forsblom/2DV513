import React from 'react'
import './Phone.css'

import { Card, Button } from 'react-bootstrap'

const style = {
  width: '85px',
  height: '170px',
  display: 'block',
  margin: '5px auto'
}

const phone = (props) => {
  return (
    <Card style={{ width: '18rem', display: 'inline-block', margin: '0.5em' }}>
      <Card.Img variant='top' src={props.img} style={style} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          <b>Price</b>: {props.price}
        </Card.Text>
        <Card.Text>
          <b>Stock</b>: {props.stock}
        </Card.Text>
        {props.stock > 0 ?
          <Button variant='primary'>Add to basket</Button>
          : <Button variant='danger'>Out of stock</Button>}
      </Card.Body>
    </Card>
  )
}

export default phone
