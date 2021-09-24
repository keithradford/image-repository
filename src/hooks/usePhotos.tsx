import { useEffect, useState } from "react";
import { getPhotos } from "../api/getPhotos";
import { Photo } from "../types";

export type UsePhoto =
  | {
      status: "loading";
    }
  | { status: "loaded"; data: Photo[] }
  | { status: "error" };

export const usePhotos = (query: string): UsePhoto => {
  const [status, setStatus] = useState<UsePhoto>({ status: "loading" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPhotos(query);
      const photos = data?.response?.results as any[];
      if (data) {
        setStatus({ status: "loaded", data: photos });
      } else {
        setStatus({ status: "error" });
      }
    };
    fetchData();
  }, [query]);

  return status;
};
