import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import AdAPI from "../../API/AdvertisementAPI";
import { Image, Skeleton,createStyles, getStylesRef } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

const ShowSilverAdInLandingPage = () => {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const {
    data = [],
    isError,
    isLoading,
    refetch,
  } = useQuery(
    ["silverAdDetails"],
    () => AdAPI.getSilverAd().then((res) => res.data),
    { initialData: [] }
  );

  if (isError) {
    return <Skeleton height={"75vh"} />;
  }

  if (isLoading || data.length === 0) {
    return <Skeleton height={"75vh"} />;
  }

  const slides = data.map((ad: any, index: number) => {
    return (
      <Carousel.Slide key={index} style={{borderRadius : "50%"}}>
        <Image src={ad.image} height={"75vh"} />
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      withIndicators
      loop
      draggable
      controlSize={22}
      classNames={classes}
      height={"75vh"}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      style={{borderRadius : "50%"}}
    >
      {slides}
    </Carousel>
  );
};

export default ShowSilverAdInLandingPage;
