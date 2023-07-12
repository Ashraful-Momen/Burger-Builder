import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./Component/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

