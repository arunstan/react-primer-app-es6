'use strict'

require('whatwg-fetch');

import React from 'react';
import CommentList from './comment-list.js';
import CommentForm from './comment-form.js';


export default class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [] };

    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.loadCommmentsFromServer = this.loadCommmentsFromServer.bind(this);
  }
  
  loadCommmentsFromServer() {

    fetch(this.props.url)
    .then(response => response.json())
    .then(json => this.setState({data: json}))
    .catch(err => console.error(this.props.url,err));

  }

  handleCommentSubmit(comment) {
    const comments = this.state.data;
    comment.id = Date.now();

    const newComments = comments.concat([comment]);
    
    this.setState({data:newComments});

    fetch(this.props.url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    }) 
    .then(response => response.json())
    .then(json => this.setState({data: json}))
    .catch(err => {
      console.error(this.props.url,err);
      self.setState({data:comments});
    });

  }
  
  componentDidMount() {
    this.loadCommmentsFromServer();
    setInterval(this.loadCommmentsFromServer,this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
}

