import React, {useContext} from 'react'
import { useHistory } from "react-router"
import './Checkout.css'
import MyContext from '../../contexts/Mycontext'

const Checkout = () => {
  let history = useHistory()

  const contextValue = useContext(MyContext)
  const basketItems = contextValue.state.items
  const total = contextValue.state.total
  console.log(contextValue.state, "Context value")

  const changeBasket = contextValue.state.changeBasket
  const setBasket = contextValue.state.setItems

  const save = (e) => {
    e.preventDefault()
    const firstname = e.target.elements.firstname.value
    const lastname = e.target.elements.lastname.value
    const address = e.target.elements.address.value
    const email = e.target.elements.email.value
    const city = e.target.elements.city.value
    const state = e.target.elements.state.value
    const zip = e.target.elements.zip.value
    console.log('i saving')
    console.log(basketItems)

    window.fetch('./orders/createOrder', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname,
        lastname,
        address,
        email,
        city,
        state,
        zip,
        basketItems,
        total
      })
    })
    .then( (response) => {
      // onsole.log(response.data())
      return response.json()

    }).then(res => {
      changeBasket(0)
      setBasket([])
      history.push({pathname: "/completeOrder",
        state: {email: email, total: contextValue.state.total}
      })
    })
  }
  return (
    <div className="row">
  <div className="col-75">
    <div className="container">
      <form onSubmit = {save}>

        <div className="row">
          <div className="col-50">
            <h3>Billing Address</h3>
            <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
            <input type="text" id="fname" name="firstname" placeholder="John"/>
            <label htmlFor="lname"><i className="fa fa-user"></i> Last Name</label>
            <input type="text" id="lname" name="lastname" placeholder="Doe"/>
            <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com"/>
            <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
            <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
            <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
            <input type="text" id="city" name="city" placeholder="New York"/>

            <div className="row">
              <div className="col-50">
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" placeholder="NY"/>
              </div>
              <div className="col-50">
                <label htmlFor="zip">Zip</label>
                <input type="text" id="zip" name="zip" placeholder="10001"/>
              </div>
            </div>
          </div>

          <div className="col-50">
            <h3>Payment</h3>
            <label htmlFor="fname">Accepted Cards</label>
            <div className="icon-container">
              <i className="fa fa-cc-visa" style={{color: 'navy'}}></i>
              <i className="fa fa-cc-amex" style={{color: 'blue'}}></i>
              <i className="fa fa-cc-mastercard" style={{color: 'red'}}></i>
              <i className="fa fa-cc-discover" style={{color: 'orange'}}></i>
            </div>
            <label htmlFor="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="John More Doe"/>
            <label htmlFor="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
            <label htmlFor="expmonth">Exp Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="September"/>

            <div className="row">
              <div className="col-50">
                <label htmlFor="expyear">Exp Year</label>
                <input type="text" id="expyear" name="expyear" placeholder="2018"/>
              </div>
              <div className="col-50">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="352"/>
              </div>
            </div>
          </div>

        </div>
        <input type="submit" value="Confirm Order" className="btn" />
      </form>
    </div>
  </div>

</div>
  )
}

export default Checkout
