import { ADD_COMMIT, DELETE_COMMIT, LOAD_COMMITS } from "../actionTypes";

const initialCommits = {};

const skipKey = (obj, arr) => {
  return Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});
};

const transformCommits = (arr) => {
  let obj = {};

  arr.forEach((commitItem) => {
    obj = {
      ...obj,
      [commitItem.forMessageId]: {
        ...obj[commitItem.forMessageId],
        [commitItem.forUserName]: {
          ...skipKey(commitItem, ["forMessageId", "forUserName"]),
        },
      },
    };
  });

  return { ...obj };
};

const commits = (state = { ...initialCommits }, action) => {
  switch (action.type) {
    case ADD_COMMIT:
      const { newCommit } = action;
      return {
        ...state,
        [newCommit.forMessageId]: {
          ...state[newCommit.forMessageId],
          [newCommit.forUserName]: {
            ...skipKey(newCommit, ["forMessageId", "forUserName"]),
          },
        },
      };
    case LOAD_COMMITS:
      return {
        ...state,
        ...transformCommits(action.commits),
      };

    case DELETE_COMMIT:
      const { deletedCommit } = action;

      return {
        ...state,
        [deletedCommit.forMessageId]: {
          ...skipKey(state[deletedCommit.forMessageId], [
            deletedCommit.forUserName,
          ]),
        },
      };

    default:
      return state;
  }
};

export default commits;
