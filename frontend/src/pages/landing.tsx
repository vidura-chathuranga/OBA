import { Grid, Group, Select, SimpleGrid, Skeleton, Title } from "@mantine/core";
import LandingCarousel from "../components/Carousel";
import DefaultHeader from "../components/defaultHeader";
import Vision from "../components/Vision";
import Mission from "../components/Mission";
import Footer from "../components/footer/footer";
import ShowInLandingPage from "../components/frontLeftAd/showInLanding";
import ShowSilverAdInLandingPage from "../components/silverAd/ShowSilverAdInLandingPage"
import AddNews from "../components/addNews";
import ShowNewsLandingPage from "../components/addNews/showNewsLandingPage";

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
          <ShowSilverAdInLandingPage />
        </Grid.Col>

      </Grid>

      <SimpleGrid cols={2} spacing="xs">
      <Vision />
      <Mission />
      </SimpleGrid>

      <Title style={{marginLeft:25, fontFamily:"Arial",fontSize: "25px" , marginBottom:20 }} >Latest News & Events</Title>


      <SimpleGrid cols={2} spacing="lg" style={{ marginLeft:25 ,marginRight: 25 , marginBottom :30 }}>
        
        
      <ShowNewsLandingPage/>
      <ShowNewsLandingPage/>
      </SimpleGrid>


      <Footer />
    </>
  );
};

export default LandingPage;
