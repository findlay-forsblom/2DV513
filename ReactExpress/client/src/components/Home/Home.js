import React, { Component } from 'react'
import './Home.css'
import { Container, Row } from 'react-bootstrap'
import Phones from '../Phones/Phones'

const dict = {
  0: {
    sort: 'price',
    order: 'ASC'
  },
  1: {
    sort: 'price',
    order: 'DESC'
  },2: {
    sort: 'name',
    order: 'ASC'
  },
  3: {
    sort: 'name',
    order: 'DESC'
  }
}

class Home extends Component {
  componentDidMount () {
    window.fetch('./products')
    .then(res => res.json())
    .then(phones =>  this.setState({
      phones
    }) 
    )
  }

  fetchByOrder() {
    console.log('i am here lol')
    const select = document.getElementById('sort')
    const value = select.options[select.selectedIndex].value;

    fetch('./products/orderBy', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({
        sort:dict[value].sort,
        order:dict[value].order
      })
    })
    .then( (response) => {
      // onsole.log(response.data())
      return response.json()
       //do something awesome that makes the world a better place
    }).then(phones => {
      console.log(phones)
      this.setState({phones})
    });
  }

  state = {
    phones: []
  };

  render () {
    return (
      <Container>
      <Row>
      <div>
      <label for="cars">Order by</label>
      <select id="sort" onChange= {this.fetchByOrder.bind(this)} >
        <option value="0">Price ascending</option>
        <option value="1">Price descending</option>
        <option value="2">Alphabetical Order ascending</option>
        <option value="3">Alphabetical Order descending</option>
      </select>
      </div>
      </Row>
      <Row>
      <Phones phones = {this.state.phones}></Phones>
      </Row>
    </Container>
    )
  }
}


export default Home
