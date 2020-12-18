import React from 'react'

const Pagination = (props) => {
  const pageLinks = []
  const currentPage = 2

  for (let i = 0; i <= 5; i++) {
    const active = currentPage === i ? 'active' : ''
    pageLinks.push(<li className={`waves-effect ${active}`} key={i}><a href='#'>{i}</a></li>)
  }

  return (
    <div className = "container">
      <div className = "row">
        <ul className ="pagination">
          {pageLinks}
        </ul>
      </div>
    </div>
  )
}

export default Pagination
