import React, { Component } from 'react'
import './Home.css'
import './materialize.css'
import { Container, Row } from 'react-bootstrap'
import Phones from '../Phones/Phones'
import Pagination from '../Pagination/Pagination'

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

const PHONES_PER_PAGE = 8

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
    phones: [],
    currentPage: 1,
    startIndex: 0,
    stopIndex: PHONES_PER_PAGE -1
  };

  changeCurrentPage (page) {
    this.setState({currentPage: page})
  }

  render () {

    const style = {
      fontSize: '15px',
      fontWeight: '600',
    }
    if (this.state.phones.length > 0 && this.state.currentPage > 1) {
      this.setState({startIndex: (this.state.currentPage - 1) * 8})
      this.setState({stopIndex: (this.state.startIndex + PHONES_PER_PAGE -1 )})
    }

    const noOfPages = this.state.phones.length / PHONES_PER_PAGE
    return (
      <Container>
      <Row>
      <div>
      <label style = {style} for="cars">Order by</label>
      <select className = "browser-default" id="sort" onChange= {this.fetchByOrder.bind(this)} >
        <option value="0">Price ascending</option>
        <option value="1">Price descending</option>
        <option value="2">Alphabetical Order ascending</option>
        <option value="3">Alphabetical Order descending</option>
      </select>
      </div>
      </Row>
      <Row>
      <Phones phones = {this.state.phones} startIndex = {this.state.startIndex} stopIndex = {this.state.stopIndex}></Phones>
      </Row>
      <Pagination currentPage = {this.state.currentPage} noPages = {noOfPages}></Pagination>
    </Container>
    )
  }
}


export default Home
