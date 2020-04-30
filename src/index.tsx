import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import { StateProvider, useDispatchState, ActionType } from "./contred";

import Topbar from "./components/Topbar";
import Pages from "./pages";

import "./App.css";

import data from "./data";

function App() {
  const dispatch = useDispatchState();
  $(window).on("resize", () => {
    dispatch({ type: ActionType.RESIZE, payload: {} });
  });

  return (
    <>
      <Topbar />
      <Pages data={data} />
    </>
  );
}

ReactDOM.render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
  document.getElementById("root")
);
