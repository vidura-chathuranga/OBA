import { Grid, Group, Select, SimpleGrid, Skeleton } from "@mantine/core";
import { Register } from "../../components/Register";
import { HeaderSchool } from "../../components/defaultHeader/headerSchool";




const AddDetails = () =>{
  

    return(
      <>
      <HeaderSchool/>
      
    <Grid style={{marginLeft : 20,marginRight : 20 }}>
      <Grid.Col span={2} style={{marginTop:40}}><Skeleton height={"80vh"}/></Grid.Col>
      <Grid.Col span={"auto"}><Register/></Grid.Col>
      <Grid.Col span={2} style={{marginTop:40}}><Skeleton height={"80vh"}/></Grid.Col>
    </Grid>
    </>

    )

    

}
export default AddDetails;