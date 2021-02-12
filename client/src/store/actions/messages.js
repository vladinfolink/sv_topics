import { apiCall } from "../../services/api";
import { addError } from "./errors";
import {
  LOAD_MESSAGES,
  REMOVE_MESSAGE,
  ADD_COMMIT,
  LOAD_COMMITS,
  DELETE_COMMIT,
} from "../actionTypes";

export const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages,
});

export const remove = (id) => ({
  type: REMOVE_MESSAGE,
  id,
});

export const addCommit = (newCommit) => ({
  type: ADD_COMMIT,
  newCommit,
});

export const decommit = (deletedCommit) => ({
  type: DELETE_COMMIT,
  deletedCommit,
});

export const loadCommits = (commits) => ({
  type: LOAD_COMMITS,
  commits,
});

export const removeMessage = (user_id, message_id) => {
  return (dispatch) => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch((err) => {
        addError(err.message);
      });
  };
};

export const fetchMessages = () => {
  return (dispatch) => {
    return apiCall("GET", "/api/messages")
      .then((fetchMessagesResponse) => {
        dispatch(loadMessages(fetchMessagesResponse));
      })
      .catch((err) => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewMessage = (text, category, deadline) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, { text, category, deadline })
    .then((res) => {
      return res;
    })
    .catch((err) => addError(err.message));
};

export const commitToMessage = (message_id) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;

  return apiCall("post", `/api/users/${id}/messages/${message_id}/commit`)
    .then((commitToMessageResponse) => {
      dispatch(addCommit(commitToMessageResponse));
    })
    .catch((err) => {
      console.error(err);
      addError(err.message);
    });
};

export const decommitFromMessage = (message_id) => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;


  return apiCall("delete", `/api/users/${id}/messages/${message_id}/commit`)
    .then((commitToMessageResponse) => {
      dispatch(decommit(commitToMessageResponse));
    })
    .catch((err) => {
      console.error(err);
      addError(err.message);
    });
};

export const fetchCommits = (messageId) => (dispatch) => {
  return apiCall("get", `/api/commits/${messageId}`)
    .then((fetchCommitsResponse) => {
      dispatch(loadCommits(fetchCommitsResponse));
    })
    .catch((err) => {
      dispatch(addError(err.message));
    });
};
