import React, { Component } from 'react'
import './Home.css'
import './materialize.css'
import { Container, Row } from 'react-bootstrap'
import Phones from '../Phones/Phones'
import Pagination from '../Pagination/Pagination'
import phone from '../Phones/Phone/Phone'

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

let phonesPerPage = 8;

class Home extends Component {
  componentDidMount () {
    window.fetch('./products')
    .then(res => res.json())
    .then(phones => {
      this.setState({phones}) 
    } 
    )
  }

  fetchByOrder() {
    const select = document.getElementById('sort')
    const value = select.options[select.selectedIndex].value;
    const perPageElement = document.getElementById('perPage')
    phonesPerPage = perPageElement.options[perPageElement.selectedIndex].value

    fetch('./products/orderBy', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    
      //make sure to serialize your JSON body
      body: JSON.stringify({
        sort:dict[value].sort,
        order:dict[value].order,
        start: this.state.startIndex,
        perPage: phonesPerPage
      })
    })
    .then( (response) => {
      // onsole.log(response.data())
      return response.json()
       //do something awesome that makes the world a better place
    }).then(result => {
      this.setState({phones: result.phones, total: result.total})
    });
  }

  state = {
    phones: [],
    total: 0,
    currentPage: 1,
    startIndex: 0,
    stopIndex: phonesPerPage - 1
  };

  changeCurrentPage = (event) =>{
    const page = event.target.innerText
    console.log(page)
    const start = (page - 1) * 8
    this.setState({
      currentPage: parseInt(page, 10),
      startIndex: start,
      stopIndex: (start+ phonesPerPage - 1)
    }, ()=> {
      // Fetch new phones by pagination
      this.fetchByOrder()
    })
  }

  render () {

    const style = {
      fontSize: '15px',
      fontWeight: '600',
    }

    const noOfPages = Math.ceil( this.state.total / phonesPerPage)
    
    return (
      <Container>
      <Row>
      <div class="selects">
      <label style = {style} htmlFor="cars">Order by</label>
      <select className = "browser-default" defaultValue="hej" id="sort" onChange= {this.fetchByOrder.bind(this)} >
        <option hidden="true" value="0">Order by</option>
        <option default="true" disabled="disabled" value="0">Order by</option>
        <option value="0">Price ascending</option>
        <option value="1">Price descending</option>
        <option value="2">Alphabetical Order ascending</option>
        <option value="3">Alphabetical Order descending</option>
      </select>
      </div>
      <div>
      <label style = {style} htmlFor="cars">Phones per page</label>
      <select className = "browser-default" defaultValue="hej" id="perPage" onChange= {this.fetchByOrder.bind(this)} >
      <option hidden="true" value="50">Phones per page</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
      </div>
      </Row>
      <Row>
      <Phones phones = {this.state.phones} startIndex = {this.state.startIndex} stopIndex = {this.state.stopIndex}></Phones>
      </Row>
      <Pagination currentPage = {this.state.currentPage} noPages = {noOfPages} onChange= {this.changeCurrentPage}></Pagination>
    </Container>
    )
  }
}

export default Home
