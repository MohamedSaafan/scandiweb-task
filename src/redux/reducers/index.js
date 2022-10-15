import { combineReducers } from "redux";

export default combineReducers({
  dummyState: (state = "Mohamed", action) => state,
});
