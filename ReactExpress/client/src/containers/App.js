import React, { Component } from 'react'
import logo from '../logo.svg'
import './App.css'
import Phone from '../components/Phone/Phone'
import Navbar from '../components/Navbar/Navbar'
import { Container, Row } from 'react-bootstrap'
import Phones from '../components/Phones/Phones'

class App extends Component {
  componentDidMount () {
    window.fetch('./products')
    .then(res => res.json())
    .then(phones =>  this.setState({
      phones
    }) )
  }

  state = {
    phones: []
  };


  render () {
    return (
      <div>
        <Navbar />
        <Container>
          <Row>
          <Phones phones = {this.state.phones}></Phones>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
