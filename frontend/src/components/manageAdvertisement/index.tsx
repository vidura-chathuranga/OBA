import { Group, SimpleGrid } from "@mantine/core";
import FrontLeftAdvertisement from "../frontLeftAd";
import SilverAdvertisement from "../silverAd";
import RegisterRightAdvertisement from "../regRightAd";

const ManageAdvertisement = () => {
  return (
    <SimpleGrid cols={2}>
      <FrontLeftAdvertisement />
      <SilverAdvertisement />
      {/* <RegisterRightAdvertisement /> */}
    </SimpleGrid>
  );
};

export default ManageAdvertisement;
