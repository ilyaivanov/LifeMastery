import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./reducer";

export {Provider} from "react-redux";

export const createMyStore = () => {
  return createStore(reducer, composeWithDevTools(applyMiddleware()));
};

