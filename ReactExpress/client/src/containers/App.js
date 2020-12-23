import React, { Component } from 'react'
import logo from '../logo.svg'
import './App.css'
import Navbar from '../components/Navbar/Navbar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from '../components/Home/Home'
import ShoppingCarts from '../components/ShoppingCarts/ShoppingCarts'
import Comments from '../components/Comments/Comments'
import MyContext from '../contexts/Mycontext'
import Checkout from '../components/Checkout/Checkout'
import CompleteOrder from '../components/CompleteOrder/CompleteOrder'
import OrderHistory from '../components/OrderHistory/OrderHistory'

class App extends Component {
  state = {
    basket: 0,
    changeBasket: (val) => this.setState({
      basket: val
    }),
    items: [],
    setItems: (item) => this.setState({
      items: item
    })
  }

  render() {
    return (
      <div>
        <MyContext.Provider value={{
          state: this.state
        }}>
        <Router>
          <Navbar />
          <Route path="/shoppingBasket" component = {ShoppingCarts}/>
          <Route exact path ="/" component = {Home}/>
          <Route path= "/comments/:id" component = {Comments}/>
          <Route path="/checkout" component ={Checkout}/>
          <Route path="/completeOrder" component ={CompleteOrder}/>
          <Route path="/orderHistory" component ={OrderHistory}/>
        </Router>
        </MyContext.Provider>
      </div>
    )
  }
}

export default App
