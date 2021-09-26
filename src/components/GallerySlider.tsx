import { Photo } from "../lib/types";
import Slider from "react-slick";
import { InteractivePhoto } from "./Photo";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { LegacyRef, useCallback, useRef } from "react";
import { Center } from "@chakra-ui/layout";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

type Props = {
  photos: Photo[];
};

export function GallerySlider({ photos }: Props) {
  const sliderRef = useRef<Slider | null>(null);

  const prev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      sliderRef.current.slickPrev();
      sliderRef.current.slickPlay();
    }
  }, []);

  const next = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
      sliderRef.current.slickNext();
      sliderRef.current.slickPlay();
    }
  }, []);

  const settings = {
    swipe: false,
    infinite: true,
    arrows: false,
    speed: 2000,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3500,
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
    <>
      <Slider {...settings} ref={sliderRef as LegacyRef<Slider>}>
        {photos.map((photo: Photo) => (
          <InteractivePhoto key={photo.id} photo={photo} />
        ))}
      </Slider>
      <Center mt="1em">
        <ButtonGroup colorScheme="cyan" variant="ghost" size="sm" isAttached>
          <Button
            leftIcon={<ChevronLeftIcon fontSize="23px" pb=".13em" />}
            onClick={prev}
          >
            PREVIOUS
          </Button>
          <Button
            rightIcon={<ChevronRightIcon fontSize="23px" pb=".13em" />}
            onClick={next}
          >
            NEXT
          </Button>
        </ButtonGroup>
      </Center>
    </>
  );
}
