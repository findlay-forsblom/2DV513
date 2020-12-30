import React from 'react'
import './comment.css'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Rating from '../../Rating/Rating'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const comment = (props) => (
  <Comment.Group>
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{props.name}</Comment.Author>
        <Comment.Metadata>
          <div>{props.time}</div>
        </Comment.Metadata>
        <div className="comment-data">
        <Comment.Text>{props.body}</Comment.Text>
        <Comment.Actions>
          <Rating rating={props.rating} />
        </Comment.Actions>
        </div>
      </Comment.Content>
    </Comment>
  </Comment.Group>
)

export default comment
