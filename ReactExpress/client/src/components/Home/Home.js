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
  },
  4: {
    sort: 'any',
    order: null
  }
}

let phonesPerPage = -1;
let brandID = null

class Home extends Component {
  componentDidMount () {
    this.fetchByOrder()

    window.fetch('./products/brands')
    .then(res => res.json())
    .then(brands => {
      this.setState({brands}) 
    })
  }

  fetchByOrder() {
    // Handle sorting 
    const select = document.getElementById('sort')
    const value = select.options[select.selectedIndex].value;
    // Handle pagination
    const perPageElement = document.getElementById('perPage')
    phonesPerPage = perPageElement.options[perPageElement.selectedIndex].value
    // Handle selection by brand
    const brandElement = document.getElementById('brands')
    brandID = brandElement.options[brandElement.selectedIndex].value

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
        perPage: phonesPerPage,
        brand: brandID
      })
    })
    .then( (response) => {
      return response.json()
    }).then(result => {
      this.setState({phones: result.phones, total: result.total})
    });
  }

  state = {
    phones: [],
    brands: [],
    total: 0,
    currentPage: 1,
    startIndex: 0
  };

  changeCurrentPage = (event) =>{
    const page = event.target.innerText
    const start = (page - 1) * 12
    this.setState({
      currentPage: parseInt(page, 10),
      startIndex: start
    }, ()=> {
      // Fetch new phones by pagination
      this.fetchByOrder()
    })
  }

  createBrands = () => {
    const rows = []
    const brands = this.state.brands
    rows.push(<option key={brands.length} value=''>All brands</option>)
    for(var i = 0; i<brands.length; i++){
      rows.push(<option key={i} value={brands[i].idBrand}>{brands[i].name}</option>)
    }
    return rows
    
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
      <div className="selects">
      <label style = {style} htmlFor="cars">Order by</label>
      <select className = "browser-default" defaultValue="hej" id="sort" onChange= {this.fetchByOrder.bind(this)} >
        <option hidden={true} value="4">Order by</option>
        <option default={true} disabled="disabled" value="4">Order by</option>
        <option value="0">Price ascending</option>
        <option value="1">Price descending</option>
        <option value="2">Alphabetical Order ascending</option>
        <option value="3">Alphabetical Order descending</option>
      </select>
      </div>
      <div className="selects">
      <label style = {style} htmlFor="cars">Phones per page</label>
      <select className = "browser-default" defaultValue="hej" id="perPage" onChange= {this.fetchByOrder.bind(this)} >
      <option hidden={true} value="12">Phones per page</option>
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
      </div>
      <div>
      <label style = {style} htmlFor="cars">Filter by brand</label>
      <select className = "browser-default" defaultValue="hej" id="brands" onChange= {this.fetchByOrder.bind(this)} >
      <option hidden={true} value=''>Select brand</option>
        {this.createBrands()}
      </select>
      </div>
      </Row>
      <Row>
      <Phones phones = {this.state.phones} startIndex = {this.state.startIndex}></Phones>
      </Row>
      <Pagination currentPage = {this.state.currentPage} noPages = {noOfPages} onChange= {this.changeCurrentPage}></Pagination>
    </Container>
    )
  }
}

export default Home
