import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Modal from 'react-modal'
import Rating from '../Rating/Rating'
import './Reviewer.css'
import { Link } from 'react-router-dom'

const style = {
  height: '200px',
  width: '200px'
}

const userBox = {
  width: '120px'
}

const infoBox = {
  width: '200px'
}

const Reviewer = (props) => {
  Modal.setAppElement('body')

  // Data handling.
  const [reviewer, setReviewer] = useState([])
  const [reviews, setReviews] = useState([])
  const [currentReview, setCurrent] = useState([])

  const params = new URLSearchParams(props.location.search)
  const reviewerId = params.get('id')

  useEffect(() => {
    // Fetch review
    const str = '/comments/reviewer/' + reviewerId
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setReviewer(result[0])
        }
      )
  }, [])

  useEffect(() => {
    const str = `/comments/reviewer/${reviewerId}/${0}`
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setReviews(result)
        }
      )
  }, [])

  const fetchReviews = (start, event) => {
    // Fetch review
    const str = `/comments/reviewer/${reviewerId}/${start}`
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setReviews(reviews.concat(result))
        }
      )
  }

  const createTableRows = (reviews) => {
    // Create each review row for table output.
    var rows = []
    var review = null
    for (var i = 1; i <= reviews.length; i++) {
      review = reviews[i - 1]
      rows.push(<tr key={i} onClick={openModal.bind(this, review)} id='data-row'>
        <th scope='row'>{i}</th>
        <td>{review.product}</td>
        <td>{review.title}</td>
        <td>{review.rating}</td>
        <td>{moment(review.created).utc().format('DD/MM/YYYY')}</td>
      </tr>)
    }
    return rows
  }

  // Functions and objects for modal.
  const customStyles = {
    content: {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      maxWidth              : '400px'
    }
  };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal (review, event) {
        setCurrent(review)
        setIsOpen(true)
    }

    function closeModal(){
        setIsOpen(false);
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="d-flex justify-content-center">
                    <div className="col-sm">
                        <img style={style} className="img-thumbnail" src="https://react.semantic-ui.com/images/avatar/large/matt.jpg"></img>
                    </div>
                    <div className="col-sm my-auto">
                        <div className="row">
                            <div className="col" style={userBox}>
                            <p><b>Username: </b></p>
                            <p><b>Reviews:</b></p>
                            <p><b>First review:</b></p>
                            </div>
                            <div className="col" style={infoBox}>
                            <p>{reviewer.username}</p>
                            <p>{reviewer.comments}</p>
                            <p>{moment(reviewer.first_comment).utc().format('DD/MM/YYYY')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <h3>Reviews</h3>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Review">

                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <div className="d-flex justify-content-center"><img src={currentReview.img_url}></img></div>
                <br></br>
                <h5>Product</h5>
                <p>{currentReview.product}</p>
                <h5>{reviewer.username}'s Rating</h5>
                <Rating rating={currentReview.rating}></Rating>
                <h5>Title</h5>
                <p>{currentReview.title}</p>
                <h5>Comment</h5>
                <p>{currentReview.body}</p>
            </Modal>
            <div className="row">
            <div className="col-50 text-left" id="tableDiv">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Comment title</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody id="table-body">
                        {createTableRows(reviews)}
                    </tbody>
                </table>
                {reviewer.comments > reviews.length ? <Link to={"./reviewer?id=" + reviewerId} onClick={fetchReviews.bind(this, reviews.length)}>Load more</Link> : <p></p>}
                </div>
            </div>
        </div>
    )
}

export default Reviewer
