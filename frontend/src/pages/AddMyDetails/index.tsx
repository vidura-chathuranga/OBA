import { Grid, Group, Select, SimpleGrid, Skeleton } from "@mantine/core";
import { Register } from "../../components/Register";
import { HeaderSchool } from "../../components/defaultHeader/headerSchool";
import bgimage from "../../assets/bgimage.jpg"


// <Grid.Col span={2} style={{marginTop:40}}><Skeleton height={"80vh"}/></Grid.Col>
// <Grid.Col span={2} style={{marginTop:40}}><Skeleton height={"80vh"}/></Grid.Col>

const AddDetails = () => {


  return (
    <>
      {/* <HeaderSchool /> */}

      <Grid style={{
        

        backgroundImage: `url(${bgimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        
      }}>
        <Grid.Col span={"auto"}>
          <Register />
        </Grid.Col>
      </Grid>
    </>

  )



}
export default AddDetails;