import React from 'react'
import './comment.css'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import Rating from '../../Rating/Rating'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
var lastHidden = null

function showBody(link) {
  link.innerText = "Hide"
  link.previousSibling.style = "display: block"
}

function hideBody(link) {
  link.innerText = "Show comment"
  link.previousSibling.style = "display: none"
}

const comment = (props) => {
  function handleClick(e) {
    // Handles show or hide comment body.
    e.preventDefault();
    if(e.target.innerText != "Hide"){
      showBody(e.target)
      if(lastHidden) {
        hideBody(lastHidden)
      }
      lastHidden = e.target
    } else {
      hideBody(e.target)
      lastHidden = null
    }
  }
  
  return (
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
        <Comment.Text style={{display: "none"}}>{props.comment}</Comment.Text>
        <a href="#" id="The-id" onClick={handleClick}>Show comment</a>
        <Comment.Actions>
          <Rating rating={props.rating} />
        </Comment.Actions>
        </div>
      </Comment.Content>
    </Comment>
  </Comment.Group>
)
  }

export default comment
