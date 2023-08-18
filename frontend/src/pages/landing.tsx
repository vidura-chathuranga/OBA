import { Grid, Group, Select, SimpleGrid, Skeleton } from "@mantine/core";
import LandingCarousel from "../components/Carousel";
import DefaultHeader from "../components/defaultHeader";
import Vision from "../components/Vision";
import Mission from "../components/Mission";
import Footer from "../components/footer/footer";
import ShowInLandingPage from "../components/frontLeftAd/showInLanding";
const LandingPage = () => {
  return (
    <>
      <DefaultHeader />
      <Grid style={{ marginLeft: 20, marginRight: 20 }}>
        <Grid.Col span={2}>
          <ShowInLandingPage />
        </Grid.Col>
        <Grid.Col span={"auto"}>
          <LandingCarousel />
        </Grid.Col>
        <Grid.Col span={2}>
          <Skeleton height={"75vh"} />
        </Grid.Col>
      </Grid>
      <Vision />
      <Mission />
      <Footer />
    </>
  );
};

export default LandingPage;
