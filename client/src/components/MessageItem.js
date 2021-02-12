import React, { useEffect } from "react";

import { connect } from "react-redux";

import Moment from "react-moment";
import { Link } from "react-router-dom";

import {
  commitToMessage,
  decommitFromMessage,
  fetchCommits,
} from "../store/actions/messages";

import DefaultImg from "../images/default-img.jpeg";

const MessageItem = ({
  messageId,
  date,
  text,
  category,
  deadline,
  username,
  removeMessage,
  isCorrectUser,
  commitToMessage,
  commits,
  currentUserName,
  fetchCommits,
  decommitFromMessage,
}) => {
  const commit = (messageId) => {
    return commitToMessage(messageId);
  };

  const decommit = (messageId) => {
    return decommitFromMessage(messageId);
  };

  const displayCommitBtn = () => {
    // if commits for this message includes current username:
    return !commits[currentUserName];
  };

  const committedUsers = Object.keys(commits).map((user) => (
    <span key={user}>{user}*</span>
  ));

  const commitButton = displayCommitBtn() ? (
    <a className="btn btn-warning" onClick={() => commit(messageId)}>
      commit
    </a>
  ) : (
    <a
      className="btn btn-primary text-light"
      onClick={() => decommit(messageId)}
    >
      Undo
    </a>
  );

  useEffect(() => {
    fetchCommits(messageId);
  }, []);

  return (
    <div className="bg-secondary">
      <li className="list-group-item" style={{ backgroundColor: "#cccccc" }}>
        <img
          src={DefaultImg}
          alt={username}
          height="100"
          width="100"
          className="timeline-image"
        />

        <div className="message-area">
          <Link to="/" className="text-secondary">
            {username} &nbsp;
          </Link>
          <span className="text-muted">
            <Moment className="text-muted" format="MMM Do YYYY">
              {date}
            </Moment>
          </span>
          <p>{text}</p>
          <p>category: {category}</p>
          deadline:{" "}
          <Moment format="MMM Do YYYY">
            <p>deadline: {deadline}</p>
          </Moment>
          <p>volunteers: {committedUsers}</p>
          {commitButton}
          {isCorrectUser && (
            <a className="btn btn-danger" onClick={removeMessage}>
              Delete
            </a>
          )}
        </div>
      </li>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    commits: state.commits[ownProps.messageId] || {},
  };
}

export default connect(mapStateToProps, {
  commitToMessage,
  decommitFromMessage,
  fetchCommits,
})(MessageItem);
