'use strict'

import React  from 'react';
import Comment from './comment.js';

const CommentList = (props) => {
  
  const commentNodes = props.data.map(comment =>
        <Comment author={comment.author} key={comment.id}>
        {comment.text}
        </Comment>  
    );

    return (
      <div className="CommentList">
      {commentNodes}
      </div>
      );
  }

export default CommentList;

