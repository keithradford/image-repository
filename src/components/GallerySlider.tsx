import { Photo } from "../types";
import Slider from "react-slick";
import { InteractivePhoto } from "./Photo";

type Props = {
  photos: Photo[];
};

export function GallerySlider({ photos }: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
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
        <InteractivePhoto src={photo.urls.small} />
        // <PhotoComp photo={photo} />
      ))}
    </Slider>
  );
}
