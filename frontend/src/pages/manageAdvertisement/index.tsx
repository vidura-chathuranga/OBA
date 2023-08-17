import { Grid } from "@mantine/core";
import NavbarSimple from "../../components/AdminDashboard";
import ManageAdvertisement from "../../components/manageAdvertisement";

const ManageAdvertisementPage = () =>{
    return(
        <div>
        <Grid>
          <Grid.Col span={"content"}>
            <NavbarSimple link_id={1}/>
          </Grid.Col>
  
          <Grid.Col span={"auto"}>
              <ManageAdvertisement/>
          </Grid.Col>
  
  
          
        </Grid>
  
        
      </div>
    )
}

export default ManageAdvertisementPage;