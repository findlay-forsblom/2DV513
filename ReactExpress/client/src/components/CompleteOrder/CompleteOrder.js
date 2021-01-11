import React, { useContext } from 'react'
import { useHistory } from 'react-router'
import './CompleteOrder.css'
import MyContext from '../../contexts/Mycontext'

const CompleteOrder = (props) => {
  const history = useHistory()
  const contextValue = useContext(MyContext)
  var email = 'No email available.'

  if (props.location.state) {
    email = props.location.state.email
    const myStorage = window.localStorage
    myStorage.setItem('currentEmail', email)
  }

  const insertInfo = () => {
    if (props.location.state.error) {
      return(<div><div class="alert alert-danger" role="alert">
      {props.location.state.error}
      </div>
      <h3>Order failed for <b>{email}</b>.</h3>
      <p>Please try to place order again</p></div>)
    } else {
      return (<div><h3>Order completed.</h3>
        <p>Order confirmation was not sent to <b>{email}</b> since this is a school project.</p>
        <p>Thank you for the order!</p></div>)
    }
  }

  const save = (e) => {
    e.preventDefault()

    const changeCurrentEmail = contextValue.state.changeCurrentEmail
    changeCurrentEmail(email)

    // Fetch order history and go to history page.
    fetch('./orders/fetchHistory', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Serialize json body.
      body: JSON.stringify({
        email: email
      })
    })
    .then((response) => {
      return response.json()
    }).then(res => {
      // Go to history page.
      history.push({
        pathname: '/orderHistory',
        data: {email: email, orders: res.msg}
     })
    });
  }
  return (
  <div className="row">
    <div className="col-75">
      <div className="container">
        <div className="row">
          <div className="col-50 text-center">
            {insertInfo()}
            <form onSubmit={save}>
                <input className="btn btn-warning" type="submit" value="Order history"></input>
                <a className="btn btn-primary" href="/" role="button">Home</a>
            </form>                   
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CompleteOrder
