import React, {
  Reducer,
  createContext,
  useReducer,
  FC,
  useContext,
  Dispatch,
} from "react";
import $ from "jquery";

export enum ActionType {
  RESIZE = "RESIZE",
  SET_ACTIVE_NODE = "SET_ACTIVE_NODE",
  SET_SEARCH_TERM = "SET_SEARCH_TERM",
}

interface State {
  activeNode: string;
  searchTerm: string;
  height: number;
  width: number;
}

interface Action {
  type: ActionType;
  payload: any;
}

export type DispatchProps = { type: ActionType; payload: any };

export const initialState: State = {
  activeNode: "Colour",
  searchTerm: "",
  height: $(window).height() - 25,
  width: $(window).width(),
};

const StateContext = createContext(initialState);
const DispatchContext = createContext(Object as Dispatch<DispatchProps>);

const stateReducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    case ActionType.RESIZE:
      return { ...state, height: $(window).height() - $(".topbar").height() };
    case ActionType.RESIZE:
      return { ...state, width: $(window).width() };

    // Auto-Complete Search
    case ActionType.SET_SEARCH_TERM:
      return { ...state, searchTerm: payload };

    case ActionType.SET_ACTIVE_NODE:
      return { ...state, activeNode: payload };

    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

export const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useState = () => useContext(StateContext);
export const useDispatchState = () => useContext(DispatchContext);
