import React from 'react'
import './Navbar.css'

import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import MyContext from '../../contexts/Mycontext'

export const navbar = (props) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand href='#home'><Link to="/">React-Bootstrap</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"/>
        <Link to="/shoppingBasket">
        <MyContext.Consumer>
  {value => (
    value.state.basket == 0 ?
    null :
    <span class="badge badge-danger ml-2" id="notis" style ={{ cursor: 'pointer' }}>{value.state.basket}</span>)}
</MyContext.Consumer>
        <FontAwesomeIcon style ={{ fontSize: '1.5em', color: 'white', cursor: 'pointer' }} icon={faShoppingCart} />
        </Link>
        <Nav>
          <Nav.Link href="#deets">My Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default navbar
