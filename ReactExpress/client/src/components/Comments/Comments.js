import React, { useState, useEffect } from 'react'
import Comment from './Comment/Comment'
import './Comment/comment.css'
import Phones from '../Phones/Phones'
import { Form, Button, Header, Input, TextArea, Checkbox } from 'semantic-ui-react'

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
  const [reviews, setComment] = useState([])
  const [phone, setPhone] = useState([])
  let id = window.location.href.lastIndexOf('/')
  id = window.location.href.substring(id + 1, window.location.href.length)
  useEffect(() => {
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
    const str = '/products/' + id
    window.fetch(str)
      .then(res => res.json())
      .then(
        (result) => {
          setPhone(result)
        }
      )
  }, [])

  console.log(phone[0])

  return (
    <div className="container">
      <div style={phoneStyle}>
        <Phones phones = {phone} startIndex = {0}></Phones>
      </div>
      <div style={style}>
        <Header as='h3' dividing>
        Reviews
        </Header>
        <div>
        <Form reply method="POST" action="/comments/post/:id">
          <Form.Field
            control={Input}
            type="text"
            label='Full name'
            placeholder='Full name'
          />
          <Form.Field
            control={Input}
            type="number"
            label='Rating'
            placeholder='0'
            min='1'
            max='5'
          />
          <Form.Field
          control={TextArea}
          label='Comment'
          placeholder='Write your comment...'
        />
          <Button content='Add Review' labelPosition='left' icon='edit' primary />
        </Form>
        </div>
        <div className="comments-container">
        {reviews.map(comment => {
          
          return <Comment
            key={comment.id_comment} name={comment.username} body={comment.title}
            time={comment.created} rating={comment.rating} />
        })}
        </div>
      </div>
    </div>
  )
}

export default Comments
