import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Comments.scss';
import './List.scss';
// import defaultAvatar from 'assets/icon/avatar_placeholder.svg';
import Comment from './Comment';

function List({ items }) {
  return (
    <div className="List">
      <h6>{`${(items && items.length) || 0} Comments`}</h6>
      <ul>
        {items &&
          items.map((comment, index) => (
            <li key={index}>
              <img src={comment.profile} alt="avatar" />
              <div>
                <div>
                  <div>{comment.creator}</div>
                  <div>{comment.created_at}</div>
                </div>
                <p>{comment.comment}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array,
};

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Comments">
        <Comment {...this.props} />
        <List {...this.props} />
      </div>
    );
  }
}

Comments.propTypes = {
  items: PropTypes.array,
};

export default Comments;
