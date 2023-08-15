import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import image1 from "../../assets/carouselImages/1.jpg";
import image2 from "../../assets/carouselImages/2.jpg";
import image3 from "../../assets/carouselImages/3.jpg";

const images = [image1, image2, image3];

const useStyles = createStyles((theme) => ({
  carousel: {
    height:"75vh",
    
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: .5,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },
  },
}));

const LandingCarousel = () => {
  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={"75vh"} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      loop
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
    >
      {slides}
    </Carousel>
  );
};

export default LandingCarousel;
