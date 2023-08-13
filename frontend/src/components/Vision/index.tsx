import { Card, Group, Title, Text } from "@mantine/core";
import { IconTargetArrow } from "@tabler/icons-react";

const Vision = () => {
  return (
    <Card withBorder mr={30} ml={30} mt={20} shadow="lg" mb={20}>
      <Card.Section p={10} withBorder>
        <Group position="center">
          <IconTargetArrow size={50} /> <Title>Vision</Title>
        </Group>
      </Card.Section>
      <Text p={50} align="justify" ff={"sans-serif"} size={"lg"}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
        explicabo, dolorem aut iusto pariatur debitis quas? Nesciunt totam
        similique quibusdam error dolor aliquam beatae adipisci, harum magni!
        Mollitia, corrupti eos!
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
        explicabo, dolorem aut iusto pariatur debitis quas? Nesciunt totam
        similique quibusdam error dolor aliquam beatae adipisci, harum magni!
        Mollitia, corrupti eos!
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa
        explicabo, dolorem aut iusto pariatur debitis quas? Nesciunt totam
        similique quibusdam error dolor aliquam beatae adipisci, harum magni!
        Mollitia, corrupti eos! Mollitia, corrupti eos! Mollitia, corrupti eos! Mollitia, corrupti eos!dssadaas
      </Text>
    </Card>
  );
};

export default Vision;
