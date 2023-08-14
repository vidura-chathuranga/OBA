import { Card, Group, Text, Title } from "@mantine/core";
import { IconTarget } from "@tabler/icons-react";

const Mission = () => {
  return (
    <Card withBorder mr={30} ml={30} mt={20} shadow="lg" mb={20}>
      <Card.Section p={10} withBorder>
        <Group position="center">
          <IconTarget size={50} /> <Title>Mission</Title>
        </Group>
      </Card.Section>
      <Text p={50} align="justify" ff={"sans-serif"} size={"lg"}>
        Richmond Community College’s mission is to offer educational
        opportunities, cultural enrichment, and workforce development and
        training that will enhance the quality of students’ lives and support
        economic development in Richmond and Scotland counties
      </Text>
    </Card>
  );
};

export default Mission;
