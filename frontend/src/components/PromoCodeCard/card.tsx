import { Button, Paper, Text, Group, CloseButton } from '@mantine/core';

export function PromoCard() {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group position="apart" mb="xs">
        <Text fz="md" fw={500}>
          Promo Card 1
        </Text>
        
      </Group>
      <Text c="dimmed" fz="xs">
        <h3>Shop Name  -</h3>
        <h3>Discount   - </h3>
        <h3>Details    - </h3>
      </Text>
      <Group position="right" mt="md">
       
        <Button variant="outline" size="xs">
          Get Promotion
        </Button>
      </Group>
    </Paper>
  );
}