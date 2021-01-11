import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Comment from './Comment/Comment'
import './Comment/comment.css'
import Phones from '../Phones/Phones'
import { Form, Button, Header, Radio } from 'semantic-ui-react'

const style = {
  height: '500px',
  marginTop: '20px',
  overflowY: 'scroll'
}

const phoneStyle = {
  width: 'fit-content',
  margin: 'auto'
}

const Comments = (props) => {
  function addReviewForm (e) {
    e.preventDefault()
    e.target.nextSibling.style = 'display: block'
    e.target.remove()
  }
  // Product id
  let id = window.location.href.lastIndexOf('/')
  id = window.location.href.substring(id + 1, window.location.href.length)

  // For review form input handling.
  const history = useHistory()
  const [value, setValue] = useState(null)
  const handleChange = (event, { value }) => setValue(value)

  // Data handling.
  const [reviews, setComment] = useState([])
  const [phone, setPhone] = useState([])

  useEffect(() => {
    // Fetch comments
    const str = '/comments/' + id
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setComment(result)
        }
      )
  }, [])

  useEffect(() => {
    // Fetch product
    const str = '/products/' + id
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setPhone(result)
        }
      )
  }, [])

  const handleSubmit = (event) => {
    // Handle form submit.
    event.preventDefault()
    const username = event.target.elements.username.value
    const rating = value
    const title = event.target.elements.title.value
    const comment = event.target.elements.comment.value
    const productId = id

    if (username && rating && comment && productId) {
      window.fetch('./post/' + id, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          rating,
          title,
          comment,
          productId
        })
      })
      .then((response) => {
        return response.json()
      }).then(res => {
        if(res.error) {
          throw new Error(res.error)
        }
        history.go(0)
      }).catch((error) => {
        history.push({pathname: "/comments/" + id })
      })
    }
  }

  return (
    <div className="container">
      <div style={phoneStyle}>
        <Phones phones = {phone} startIndex = {0}></Phones>
      </div>
      <div style={style}>
        <Header as='h3' dividing>
        Reviews
        </Header>
        <a className="btn btn-primary" href="#" role="button" onClick={addReviewForm}>Write review</a>
        <div style={{display: "none"}}>
        <Form reply onSubmit={(event) => {handleSubmit(event)}}>
          <Form.Field control='input' type="text" label='Username' placeholder='Username..' name='username' />
          <Form.Field label="Rating"/>
          <Form.Group>
          <Radio label='1' name='radioGroup' value='1' checked={value === '1'} onChange={handleChange} />
          <Radio label='2' name='radioGroup' value='2' checked={value === '2'} onChange={handleChange} />
          <Radio label='3' name='radioGroup' value='3' checked={value === '3'} onChange={handleChange} />
          <Radio label='4' name='radioGroup' value='4' checked={value === '4'} onChange={handleChange} />
          <Radio label='5' name='radioGroup' value='5' checked={value === '5'} onChange={handleChange} />
          </Form.Group>
          <Form.Field control='input' type="text" label='Title' placeholder='Title...' name='title' />
          <Form.Field control='textarea' label='Comment' placeholder='Write your comment...' name='comment' />
          <Button content='Add Review' labelPosition='left' icon='edit' primary type="Submit"/>
        </Form>
        </div>
        <div className="comments-container">
        {reviews.map(comment => {
          
          return <Comment
            key={comment.id_comment} name={comment.username} user_id={comment.id_reveiwer} body={comment.title} comment={comment.body}
            time={comment.created} rating={comment.rating} />
        })}
        </div>
      </div>
    </div>
  )
}

export default Comments
