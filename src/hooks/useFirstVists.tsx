import { useCallback } from "react";

import { useLocalStorage } from "./useLocalStorage";

type FirstVisit = {
  changeFirstVisit: () => void;
  firstVisit: boolean;
};

export const useFirstVisit = (): FirstVisit => {
  const [data, setData] = useLocalStorage<boolean>("user:first_visit", true);

  const changeFirstVisit = useCallback(() => {
    setData(!data);
  }, [data, setData]);

  return { firstVisit: data, changeFirstVisit };
};
