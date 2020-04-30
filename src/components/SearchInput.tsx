import React, { FC } from "react";

import { useDispatchState, useState, ActionType } from "../contred";

const SearchInput: FC = () => {
  const { searchTerm } = useState();
  const dispatch = useDispatchState();

  function handleChange(e: any) {
    dispatch({ type: ActionType.SET_SEARCH_TERM, payload: e.target.value });
  }

  return (
    <input
      id="search"
      type="text"
      placeholder="Filter nodes..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
