import { Grid,SimpleGrid } from "@mantine/core";
import NavbarSimple from "../../components/AdminDashboard";
import AddNews from "../../components/addNews";
import AddNewsRight from "../../components/addNews/addNewsRight";


const AddNewsAdmin = () =>{
    return(
        <div>
        <Grid>
          <Grid.Col span={"content"}>
            <NavbarSimple link_id={3}/>
          </Grid.Col>
  
          <Grid.Col span={"auto"}>
              <AddNews/>
              <AddNewsRight/>
          </Grid.Col>

          <SimpleGrid cols = {2}>
            
          </SimpleGrid>
        </Grid>
  
        
      </div>
    )
}

export default AddNewsAdmin;