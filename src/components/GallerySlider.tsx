import { Photo } from "../types";
import Slider from "react-slick";
import { InteractivePhoto } from "./Photo";

type Props = {
  photos: Photo[];
  direction: boolean;
};

export function GallerySlider({ photos, direction }: Props) {
  const settings = {
    swipe: false,
    infinite: true,
    speed: 1000,
    rtl: direction,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    variableWidth: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {photos.map((photo: Photo) => (
        <InteractivePhoto photo={photo} />
      ))}
    </Slider>
  );
}
