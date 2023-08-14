import { Grid, Group, Select, SimpleGrid, Skeleton } from "@mantine/core";
import LandingCarousel from "../components/Carousel";
import DefaultHeader from "../components/defaultHeader";
import Vision from "../components/Vision";
import Mission from "../components/Mission";
import {selectCountryList} from '../components/coutries';
const LandingPage = () => {
  return (
    <>
    <DefaultHeader/>
    <Grid style={{marginLeft : 20,marginRight : 20}}>
      <Grid.Col span={2}><Skeleton height={"75vh"}/></Grid.Col>
      <Grid.Col span={"auto"}><LandingCarousel/></Grid.Col>
      <Grid.Col span={2}><Skeleton height={"75vh"}/></Grid.Col>
    </Grid>
    <Vision/>
    <Mission/>
    <Select data={selectCountryList} searchable/>
    </>
  );
};

export default LandingPage;
