import { useCallback, useState } from "react";

export const useForceRerender = () => {
  const [, setForceRerender] = useState(false);
  return useCallback(() => setForceRerender((state) => !state), []);
};
