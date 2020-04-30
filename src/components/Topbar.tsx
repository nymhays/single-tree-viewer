import React, { FC, useEffect } from "react";

// import { setActiveNode, setFilter, resize } from '../Reducers/actions';
import { useDispatchState, ActionType } from "../contred";

import SearchInput from "./SearchInput";

const TopBar: FC = () => {
  const dispatch = useDispatchState();

  useEffect(() => {
    dispatch({ type: ActionType.RESIZE, payload: {} });
  }, []);

  function handleClick() {
    dispatch({ type: ActionType.SET_ACTIVE_NODE, payload: "" });
    dispatch({ type: ActionType.SET_SEARCH_TERM, payload: "" });
  }

  return (
    <div className="topbar">
      <SearchInput />
      <button onClick={handleClick}>Reset</button>
      <span>Last Updated: 29/04/2020 </span>
    </div>
  );
};

export default TopBar;
