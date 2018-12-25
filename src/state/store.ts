import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./reducer";
import {initialize} from "./actions";

export {Provider} from "react-redux";

export const createMyStore = () => {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware()));
  store.dispatch(initialize());
  return store;
};

