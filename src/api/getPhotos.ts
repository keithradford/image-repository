import { createApi } from "unsplash-js";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Photos } from "unsplash-js/dist/methods/search/types/response";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string,
});

export const getPhotos = async (
  query: string
): Promise<ApiResponse<Photos> | null> => {
  try {
    const data = await api.search.getPhotos({
      query,
      orientation: "landscape",
      perPage: 50,
    });

    return data;
  } catch (e) {
    return null;
  }
};
