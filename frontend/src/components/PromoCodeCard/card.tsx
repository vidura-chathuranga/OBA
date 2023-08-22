import { Button, Paper, Text, Group, CloseButton, TextInput } from '@mantine/core';
import UserAPI from '../../API/userAPI/user.api';
import { useQuery } from "@tanstack/react-query";
import { useForm } from '@mantine/form';
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRef, useState } from "react";

import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconX,
  IconCheck,

} from "@tabler/icons-react";


interface Data {

  _id:string;
  shopname: string;
  discount: string;
  count : string;
  details : string;

}

export function PromoCard() {
  const [opened, setOpened] = useState(false);

  // use react query and fetch data
  const { data = [], isLoading, isError, refetch, } = useQuery(["promoData"], () => {
    return UserAPI.getAllCodes().then((res) => res.data);
},
    { initialData: [] }
);

const viewForm = useForm({
  validateInputOnChange:true,
  initialValues:{
            shopname: "",
            discount: "",
            count : "",
            details : "",

  },

});

  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group position="apart" mb="xs">
        <Text fz="md" fw={500}>
          Promo Card 1
        </Text>
        
      </Group>
      <Text c="dimmed" fz="xs">
        <TextInput
          
          label = "Shop Name"
          {...viewForm.getInputProps("shopname")}
        />
         <TextInput
          label = "Discount"
          {...viewForm.getInputProps("discount")}
        />
         <TextInput
          label = "Details"
          {...viewForm.getInputProps("details")}
        />
      
      </Text>
      <Group position="right" mt="md">
       
        <Button variant="outline" size="xs">
          Get Promotion
        </Button>
      </Group>
    </Paper>
  );
}