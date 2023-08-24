import { Grid } from "@mantine/core";
import NavbarSimple from "../../components/AdminDashboard";
import AddNews from "../../components/addNews";


const AddNewsAdmin = () =>{
    return(
        <div>
        <Grid>
          <Grid.Col span={"content"}>
            <NavbarSimple link_id={3}/>
          </Grid.Col>
  
          <Grid.Col span={"auto"}>
              <AddNews/>
          </Grid.Col>
  
  
          
        </Grid>
  
        
      </div>
    )
}

export default AddNewsAdmin;