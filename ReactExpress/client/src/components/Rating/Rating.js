import React from 'react'
import './Rating.scss'

const rating = (props) => {
  return (
    <div className="wrapper">
      <div className="rating-holder">
        <div className="c-rating c-rating--small" data-rating-value={Math.round(props.rating)}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
      </div>
    </div>
  )
}
export default rating
