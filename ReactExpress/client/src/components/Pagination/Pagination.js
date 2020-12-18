import React from 'react'

const Pagination = (props) => {
  const pageLinks = []

  const style = {
    fontSize: '20px',
    fontWeight: '500'
  }

  for (let i = 1; i <= props.noPages; i++) {
    const active = props.currentPage === i ? 'active' : ''
    pageLinks.push(<li className={`waves-effect ${active}`} style={style} key={i}><a href='#'>{i}</a></li>)
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
