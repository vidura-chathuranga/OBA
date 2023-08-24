import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Modal,
    Grid,
    Select,
    Switch,
} from '@mantine/core';

import {
    IconSelector,
    IconChevronDown,
    IconChevronUp,
    IconSearch,
    IconPlus,
    IconEdit,
    IconTrash,
    IconCheck,
    IconX,
} from "@tabler/icons-react";

import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from '@mantine/notifications';
import { useState } from "react";
import { YearPickerInput } from '@mantine/dates';
import { selectCountryList } from "../../components/Register/coutries";
import UserAPI from '../../API/userAPI/user.api';
import { PromoCard } from '../PromoCodeCard/card';
import ViewPromotionDetails from '../promationCode/viewPromotionDetails';




export const Register = () => {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState<Date | null>(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [isSwitchOn , setSwitchOn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    


    const toggleSwitch = () =>{
        setSwitchOn(!isSwitchOn);
    };
   

    const handleSelectChange = (value: any) => {
        setSelectedRole(value);

        // If "Other" is selected, clear customRole input
        if (value !== 'other') {
            registerForm.setFieldValue("jobRole", value);
        }

    };
    const handleCustomRoleChange = (event: any) => {
        registerForm.setFieldValue("jobRole", event.target.value);


    };

    const jobRoleOptions = [
        { value: 'it', label: 'IT Professional' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'engineer', label: 'Engineer' },
        { value: 'writer', label: 'Writer' },
        { value: 'other', label: 'Other' },
    ];

    //User Register form
    const registerForm = useForm({
        validateInputOnChange: true,

        initialValues: {
            name: "",
            email: "",
            year: "",
            country: "",
            mobile: "",
            company: "",
            jobRole: "",

        },
        validate:{
            name:(value) =>
                value.length < 2 ? "Name must have at least 2 letters": null,
            
            email: (value) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                value
                )
                    ? null
                    : "Invalid email",
        }
    });

    const registerUser = async (values: {
        name: string;
        email: string;
        year: string;
        country: string;
        mobile: string;
        company : string;
        jobRole: string;
    }) => {
        showNotification({
            id: "Add User",
            loading: true,
            title: "Adding User",
            message: "Please wait while we add user record..",
            autoClose: false,

        });

        UserAPI.userRegister(values)
            .then((Response) => {
                updateNotification({
                    id: "Add User",
                    color: "teal",
                    title: "Adding User record",
                    message: "Please wait while we add User record..",
                    icon: <IconCheck />,
                    autoClose: 2500,
                });

                registerForm.reset();
                setOpened(false);


            })
            .catch((error) => {
                updateNotification({
                    id: "Add User",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when adding user",
                    icon: <IconX />,
                    autoClose: 2500,
                });
            });
    };

    const promoCardDetails = {
        "image": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "title": "Plan & save",
        "description": "Save up to 25% at Fifth Season Hotels in Europe, the Middle East, Africa and Asia Pacific",
        "action": {
          "label": "Book now",
          "link": "#"
        }
      }
        
    

    return (
        <>

            {/* <HeaderSchool/> */}
            <div style={{


                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh', // Adjust as needed
            }}>




                <div style={{ paddingTop: "100px" }}>
                    <Container size={500}  >
                        <div style={{ backgroundColor: 'white' }} >
                            <Title
                                align="center"
                                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                            >
                                Add My Details
                            </Title>

                            {/* Add my details form */}
                            <form

                                onSubmit={registerForm.onSubmit((values) => registerUser(values))}
                            >
                                <Paper withBorder shadow="md" p={30} mt={30} radius="md">

                                    <Grid>
                                        <Grid.Col span={6}><TextInput
                                            label="Name"
                                            placeholder="Sunil Perera"
                                            required
                                            {...registerForm.getInputProps("name")}
                                        /></Grid.Col>

                                        <Grid.Col span={6}>
                                            <TextInput
                                                label="Email"
                                                placeholder="sunil@gmail.com"
                                                required
                                                {...registerForm.getInputProps("email")}
                                            />
                                        </Grid.Col>

                                    </Grid>

                                    <YearPickerInput
                                        label="Batch Year"
                                        placeholder="Pick date"
                                        required
                                        // value={value}
                                        // onChange={setValue}
                                        {...registerForm.getInputProps("year")}

                                    />

                                    <h5>By providing us with the following details, 
                                        you'll unlock a special 
                                        <span style={{ color: 'red' }}> promotion code</span> exclusive to you.</h5>
                                    <Switch
                                        label="I agree to add my details"
                                        color="violet"
                                        
                                        radius="sm"
                                        checked = {isSwitchOn}
                                        onChange={toggleSwitch}
                                    />

                                    <br/>



                                {isSwitchOn ?  (
                                    <>
                                    <Select data={selectCountryList} searchable
                                        label="Country Of Residence"
                                        required
                                        placeholder='Sri Lanka'
                                        {...registerForm.getInputProps("country")}

                                    />

                                   

                                    

                                    <TextInput

                                        label="Mobile No"
                                        placeholder='+9471136106'
                                        required
                                        {...registerForm.getInputProps("mobile")}


                                    />
                                   
                                    <TextInput

                                        label="Current Employe Company"
                                        required
                                        placeholder='Sensus Hub'
                                        {...registerForm.getInputProps("company")}
                                    />

                                    <div>

                                        <Select
                                            label="Job Role"
                                            placeholder="Pick one"
                                            required
                                            value={selectedRole}
                                            data={jobRoleOptions}
                                            onChange={(value) => handleSelectChange(value)}

                                        />
                                        {selectedRole === 'other' && (
                                            <input
                                                type="text"
                                                onChange={handleCustomRoleChange}
                                                required
                                                placeholder="Enter your job role"
                                                style={{ marginTop: '10px', width: '407px', height: '40px', borderRadius: '5px', border: ' solid #ccc', padding: '5px' }}
                                            />
                                        )}
                                    </div>
                                    <Button fullWidth mt="xl" type="submit" onClick={openModal}>
                                        Next
                                    </Button>
                                    
                                    </>

                                ):(
                                    <Button fullWidth mt="xl" type="submit">
                                    Submit
                                    </Button>

                                )}

                                   

                                </Paper>
                            </form>
                        </div>

                        {/* <PromoCard/> */}
                        {/* Modal */}
                     


                    </Container>
                </div>
            </div> 
            <Modal opened={isModalOpen} onClose={closeModal} size={1100}>
                <ViewPromotionDetails />
            </Modal>

        </>
    );
}