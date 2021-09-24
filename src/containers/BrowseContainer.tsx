import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import { GallerySlider } from "../components/GallerySlider";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY as string,
});

export function BrowseContainer() {
  const [data, setPhotosResponse] = useState<any>(null);

  useEffect(() => {
    api.search
      .getPhotos({ query: "dogs", orientation: "landscape" })
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data.errors) {
    return (
      <div>
        <div>{data.errors[0]}</div>
        <div>PS: Make sure to set your access token!</div>
      </div>
    );
  } else {
    return (
      <Box overflowX="hidden">
        <GallerySlider photos={data.response.results} />
      </Box>
    );
  }
}
