import { useCallback } from "react";

import _ from "lodash";

import { Photo } from "../types";
import { useLocalStorage } from "./useLocalStorage";

type SavedPhotos = {
  addPhoto: (photo: Photo) => void;
  deletePhoto: (oldPhoto: Photo) => void;
  clearPhotos: () => void;
  contains: (id: number) => boolean;
  photos: Photo[];
};

export const useSavedPhotos = (): SavedPhotos => {
  const [data, setData] = useLocalStorage<Photo[]>("user:saved_photos", []);

  // Checks if a photo is saved
  const contains = useCallback(
    (id: number): boolean => {
      return data.some((photo) => photo.id === id);
    },
    [data]
  );

  const equals = useCallback((a: Photo, b: Photo): boolean => {
    return _.isEqual(a, b);
  }, []);

  const addPhoto = useCallback(
    (photo: Photo) => {
      // avoid adding a photo if it is saved already.
      if (contains(photo.id)) return;

      setData([...data, photo]);
    },
    [contains, data, setData]
  );

  const deletePhoto = (oldPhoto: Photo): void => {
    setData(data.filter((photo) => !equals(photo, oldPhoto)));
  };

  const clearPhotos = () => {
    setData([]);
  };

  return { photos: data, addPhoto, deletePhoto, clearPhotos, contains };
};
