import ManageMembers from "../../components/ManageMembers";
import NavbarSimple from "../../components/AdminDashboard";
import { Grid } from "@mantine/core";

const ManageMembersPage = () => {
    return (
      <div>
      <Grid>
        <Grid.Col span={"content"}>
          <NavbarSimple/>
        </Grid.Col>

        <Grid.Col span={"auto"}>
            <ManageMembers />
        </Grid.Col>


        
      </Grid>

      
    </div>
    );
  };
  
  export default ManageMembersPage;