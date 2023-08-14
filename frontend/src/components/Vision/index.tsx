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
        Richmond College is dedicated to shaping the future leaders of society.
        We believe that education is not just about preparing for exams, but
        about preparing for life. Our comprehensive approach to education
        encompasses academic excellence, character development, and practical
        life skills, equipping our students to confidently navigate their paths
        beyond the classroom.
      </Text>
    </Card>
  );
};

export default Vision;
