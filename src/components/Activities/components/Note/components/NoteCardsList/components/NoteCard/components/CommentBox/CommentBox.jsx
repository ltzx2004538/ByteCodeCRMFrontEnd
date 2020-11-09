import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCommentDots } from '@fortawesome/free-solid-svg-icons';

import CommentCard from './components/CommentCard';
import CommentForm from './components/CommentForm';
import './CommentBox.scss';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);

    // TODO: When "Add Comment" is clicked, hide "Add Comment" pannel
    // TODO: When Save button on Comment Form is clicked, hide Comment Form
    // TODO: When Save button on Comment Form is clicked, show Add Comment section
    // TODO: When Cancel button on Comment Form is clicked, show Add Comment section
    const { comments } = this.props;
    this.state = {
      showComments: false,
      showCommentForm: false,
      // showAddCommentPanel: true,
      comments,
    };

    this.handleShowCommentForm = this.handleShowCommentForm.bind(this);
    // this.handleShowAddCommentPanel = this.handleShowAddCommentPanel.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  // handleShowAddCommentPanel() {
  //   this.setState(prevState =>({
  //     showAddCommentPanel: !prevState.showAddCommentPanel
  //   }));
  // }

  addComment(author, content, timestamp) {
    const comment = {
      // id: this.state.comments.length + 1,
      author,
      content,
      timestamp,
    };
    this.setState({ comments: this.state.comments.concat([comment]) });
  }

  //   fetch('http://localhost:8080')
  //   .then(response => response.json())
  //   .then(json => {
  //   this.setState({mystate: this.state.mystate.push.apply(this.state.mystate, json)})
  // })

  deleteComment(index) {
    const { comments } = this.state;
    const arr = comments;
    arr.splice(index, 1);
    this.setState({ comments: arr });
  }

  updateComment(newContent, index) {
    const { comments } = this.state;
    const arr = comments;
    arr[index].content = newContent;
    this.setState({ comments: arr });
  }

  handleClick() {
    const { showComments } = this.state;
    this.setState({
      showComments: !showComments,
    });
  }

  getComments() {
    const { comments } = this.state;
    return comments.map((comment, i) => (
      <CommentCard
        key={i}
        index={i}
          // id={comment.id}
        author={comment.author}
        content={comment.content}
        timestamp={comment.timestamp}
        onDelete={this.deleteComment}
        onUpdate={this.updateComment}
      />
    ));
  }

  getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    }
    return `Comments (${commentCount}) `;
  }

  handleShowCommentForm() {
    this.setState((prevState) => ({
      showCommentForm: !prevState.showCommentForm,
    }));
  }

  render() {
    const commentsForNote = this.props.comments;
    const comments = this.getComments(commentsForNote);
    let commentNodes;
    let buttonText = <FontAwesomeIcon icon={faChevronRight} />;

    if (this.state.showComments) {
      buttonText = <FontAwesomeIcon icon={faChevronDown} />;
      commentNodes = <div className="comment-list">{comments}</div>;
    }

    return (
      <div>
        <div className="comment-box-top">
          <button
            onClick={this.handleClick}
            className="accordion-label"
          >
            {buttonText}
            {' '}
            {this.getCommentsTitle(comments.length)}
          </button>
          {commentNodes}
        </div>
        <div>
          {this.state.showCommentForm
            ? (
              <CommentForm
                addComment={this.addComment}
                handleShowCommentForm={this.handleShowCommentForm.bind(this)}
              />
            )
            : null}
        </div>

        <div
          className="add-comment-container"
          // handleShowAddCommentPanel={this.handleShowAddCommentPanel.bind(this)}
        >
          <div className="add-comment-icon">
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
          <button
            onClick={() => {
              this.handleShowCommentForm();
            // this.handleShowAddCommentPanel();
            }}
            className="add-comment-button"
          >
            Add Comment
          </button>
        </div>
      </div>
    );
  }
}

export default CommentBox;
