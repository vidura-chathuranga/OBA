import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AdAPI from "../../API/AdvertisementAPI";
import { showNotification } from "@mantine/notifications";
import { Box, Card, Image, LoadingOverlay, Skeleton } from "@mantine/core";
import img1 from "../../assets/carouselImages/2.jpg";

const ShowInLandingPage = () => {
  const {
    data = [],
    isError,
    isLoading,
    refetch,
  } = useQuery(
    ["adDetails"],
    () => AdAPI.getFrontLeftAd().then((res) => res.data),
    { initialData: [] }
  );

  if (isError) {
    return <Skeleton height={"75vh"} />;
  }

  if (isLoading || data.length === 0) {
    return <Skeleton height={"75vh"} />;
  }

  const ads = data.map((ad: any, index: number) => {
    return (
      <Box style={{ border: "1px solid black" }} key={index}>
        <Image src={ad.image} key={index} height={"75vh"} />
      </Box>
    );
  });

  return <div>{data.length > 0 ? ads : null}</div>;
};

export default ShowInLandingPage;
