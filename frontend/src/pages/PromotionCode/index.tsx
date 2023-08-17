import PromationCode from "../../components/promationCode";
import NavbarSimple from "../../components/AdminDashboard";
import { Grid } from "@mantine/core";

const PromotionCodeManage = () => {
    return (
      <div>
      <Grid>
        <Grid.Col span={"content"}>
          <NavbarSimple link_id={2}/>
        </Grid.Col>

        <Grid.Col span={"auto"}>
            <PromationCode />
        </Grid.Col>
      </Grid>
    </div>
    );
  };
  
  export default PromotionCodeManage;