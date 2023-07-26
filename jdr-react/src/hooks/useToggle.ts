import { useCallback, useState } from "react";

type useToggleReturn = {
  state: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
};
export const useToggle = (initialState = false): useToggleReturn => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the comopnent,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);

  return { state, toggle, setTrue, setFalse };
};
