import React, { useState, useEffect } from 'react'
import Comment from './Comment/Comment'
import { Form, Button, Header } from 'semantic-ui-react'

const style = {
  height: '500px',
  overflowY: 'scroll'
}

const Comments = (props) => {
  const [reviews, setComment] = useState([])
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

  return (
    <div style={style}>
      <Header as='h3' dividing>
      Comments
      </Header>

      {reviews.map(comment => {
        return <Comment
          key={comment.id_comment} name={comment.username} body={comment.title}
          time={comment.created} rating={comment.rating} />
      })}
      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </div>
  )
}

export default Comments
