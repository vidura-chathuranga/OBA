import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Group,
  Modal,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import image_1 from "../../assets/loginBackground/loginBack.jpg";
import { useState } from "react";
import { useForm } from "@mantine/form";
import AdminAPI from "../../API/adminAPI";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(430),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "50%",
    },
  },
}));

const AdminLoginComp = () => {
  const { classes } = useStyles();

  // login form
  const loginForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (val) => (!/^\S+@\S+$/.test(val) ? "Invalid email" : null),
    },
  });


//   login function
const adminLogin = (values: { email: string; password: string }) =>{
    
    AdminAPI.loginAdmin(values).then((res) =>{

        localStorage.setItem('admin',JSON.stringify(res.data));

        window.location.href = '/admin/manageMember';
    }).catch((err)=>{
        showNotification({
            title : "Login Failed",
            message : "user credentials are wrong",
            color : "red",
            icon : <IconX/>,
            autoClose : true,
        });
    })
}
  return (
    <BackgroundImage src={image_1} style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper className={classes.form} radius={0} p={30} shadow="xl"  withBorder style={{width:420}}>
          <Title order={2} ta="center" mt="md" mb={50}>
            Welcome back Admin
          </Title>

          {/* form */}
          <form
            onSubmit={loginForm.onSubmit(
              (values: { email: string; password: string }) => {
                adminLogin(values);
              }
            )}
          >
            <TextInput
              label="Email"
              placeholder="richmond@gmail.com"
              size="md"
              {...loginForm.getInputProps("email")}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="password"
              mt="md"
              size="md"
              required
              {...loginForm.getInputProps("password")}
            />

            <Button fullWidth mt={30} size="md" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </BackgroundImage>
  );
};

export default AdminLoginComp;
