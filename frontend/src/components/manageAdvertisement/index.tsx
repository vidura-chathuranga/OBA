import { Group, SimpleGrid } from "@mantine/core";
import FrontLeftAdvertisement from "../frontLeftAd";
import RegisterLeftAdvertisement from "../regLeftAd";
import RegisterRightAdvertisement from "../regRightAd";

const ManageAdvertisement = () => {
  return (
    <SimpleGrid cols={3}>
      <FrontLeftAdvertisement />
      <RegisterLeftAdvertisement />
      <RegisterRightAdvertisement />
    </SimpleGrid>
  );
};

export default ManageAdvertisement;
