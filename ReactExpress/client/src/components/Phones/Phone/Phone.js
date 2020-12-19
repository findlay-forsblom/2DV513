import React from 'react'
import './Phone.css'
import Rating from '../../Rating/Rating'
import {Link} from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

const style = {
  width: '5.2rem',
  height: '9.3rem',
  display: 'block',
  margin: '5px auto'
}

const phone = (props) => {
  return (
    <Card style={{ width: '18rem', display: 'inline-block', margin: '0.5em' }}>
      <Card.Img variant='top' src={props.img} style={style} />
      <Card.Body>
        <Card.Title style = {{fontSize: '14px'}}>{props.name}</Card.Title>
        <Card.Text style = {{fontSize: '18px'}}>
          ${props.price}
        </Card.Text>
        <Card.Text>
          <b>Stock</b>: {props.stock}
        </Card.Text>
        <Link to={props.link}>
          <Rating rating={props.rating}/>
        </Link>
        {props.stock > 0 ?
          <Button variant='primary' onClick={props.handleClick}>Add to basket</Button>
          : <Button variant='danger'>Out of stock</Button>}
      </Card.Body>
    </Card>
  )
}

export default phone
