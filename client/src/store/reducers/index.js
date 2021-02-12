import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages";
import commits from "./commits";



const rootReducer = combineReducers({
  currentUser,
  errors,
  messages,
  commits
});

export default rootReducer;
