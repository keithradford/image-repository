import { useCallback } from "react";

import _ from "lodash";

import { useLocalStorage } from "./useLocalStorage";

type SavedTags = {
  addTag: (tag: string) => void;
  deleteTag: (oldTag: string) => void;
  clearTags: () => void;
  contains: (tag: string) => boolean;
  tags: string[];
};

export const useSavedTags = (): SavedTags => {
  const [data, setData] = useLocalStorage<string[]>("user:saved_tags", []);

  // Checks if a photo is saved
  const contains = useCallback(
    (tagCheck: string): boolean => {
      return data.some((tag) => tag === tagCheck);
    },
    [data]
  );

  const equals = useCallback((a: string, b: string): boolean => {
    return _.isEqual(a, b);
  }, []);

  const addTag = useCallback(
    (tag: string) => {
      // avoid adding a photo if it is saved already.
      if (contains(tag) || tag.length === 10) return;

      setData([...data, tag]);
    },
    [contains, data, setData]
  );

  const deleteTag = (oldTag: string): void => {
    setData(data.filter((tag) => !equals(tag, oldTag)));
  };

  const clearTags = () => {
    setData([]);
  };

  return { tags: data, addTag, deleteTag, clearTags, contains };
};
