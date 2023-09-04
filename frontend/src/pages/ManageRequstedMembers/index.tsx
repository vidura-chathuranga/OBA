import ManageRequestedMembers from "../../components/RequestedMembers";
import NavbarSimple from "../../components/AdminDashboard";
import { Grid } from "@mantine/core";

const ManageRequestedMembersPage = () => {
    return (
      <div>
      <Grid>
        <Grid.Col span={"content"}>
          <NavbarSimple link_id={0}/>
        </Grid.Col>

        <Grid.Col span={"auto"}>
            <ManageRequestedMembers />
        </Grid.Col>


        
      </Grid>

      
    </div>
    );
  };
  
  export default ManageRequestedMembersPage;