import React from 'react'
import { Container } from 'react-bootstrap'

export const orders = (props) => {
  const style = {
    maxWidth: '20em'
  }
  return (
  <Container>
  <form class="form-inline" style= {style}>
        <input class="form-control mr-sm-2" type="search" placeholder="Search For order" aria-label="Search"/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
  </Container>

  )
}

export default orders
