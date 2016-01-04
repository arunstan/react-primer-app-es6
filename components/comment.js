'use strict'

import React from 'react';
import marked from 'marked';

const Comment = (props) => {

    const rawMarkupString = marked(props.children.toString(),{sanitize:true});

    return (
      <div className="comment">
      <h2 className="commentAuthor">
      {props.author}
      </h2>
      <span dangerouslySetInnerHTML= {{__html: rawMarkupString}} />
      </div>
      );
  }

export default Comment;