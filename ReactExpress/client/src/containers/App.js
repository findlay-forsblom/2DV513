import React, { Component } from 'react'
import logo from '../logo.svg'
import './App.css'
import Navbar from '../components/Navbar/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import ShoppingCart from '../components/ShoppingCart/ShoppingCart'
import Comments from '../components/Comments/Comments'


const app = (props) => {
    return (
      <div>
        <Router>
          <Navbar />
          <Route path="/shoppingBasket" component = {ShoppingCart}/>
          <Route exact path ="/" component = {Home}/>
          <Route path= "/comments/:id" component = {Comments}/>
        </Router>
      </div>
    )
}

export default app
