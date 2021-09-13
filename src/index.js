import ReactDOM from "react-dom";
import App from "./App";
import reducer from "./reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middleware";

const store = createStore(reducer, middleware);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);
