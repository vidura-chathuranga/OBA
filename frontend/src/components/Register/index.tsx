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
import { CountryDropdown } from "react-country-region-selector";




export const Register = () => {
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState<Date | null>(null);
    const [country, setCountry] = useState("");
    const [selectedRole, setSelectedRole] = useState('');
    const [customRole, setCustomRole] = useState('');

    const handleSelectChange = (value: any) => {
        setSelectedRole(value);

        // If "Other" is selected, clear customRole input
        if (value !== 'other') {
            setCustomRole('');
        }
    };
    const handleCustomRoleChange = (event: any) => {
        setCustomRole(event.target.value);

        // Set selectedRole to 'other' when inputting custom role
        setSelectedRole('other');
    };

    const jobRoleOptions = [
        { value: 'it', label: 'IT Professional' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'engineer', label: 'Engineer' },
        { value: 'writer', label: 'Writer' },
        { value: 'other', label: 'Other' },
    ];


    return (
        <>
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
                            >
                                <Paper withBorder shadow="md" p={30} mt={30} radius="md">

                                    <Grid>
                                        <Grid.Col span={6}><TextInput
                                            label="Name"
                                            placeholder="Sunil Perera"
                                            required
                                        /></Grid.Col>

                                        <Grid.Col span={6}>
                                            <TextInput
                                                label="Email"
                                                placeholder="sunil@gmail.com"
                                                required
                                            />
                                        </Grid.Col>

                                    </Grid>

                                    <YearPickerInput
                                        label="Batch Year"
                                        placeholder="Pick date"
                                        value={value}
                                        onChange={setValue}


                                    />

                                    <div >
                                        <h5> Country Of Residence</h5>
                                        <CountryDropdown
                                            value={country}
                                            
                                            onChange={(val) => setCountry(val)}
                                            
                                            
                                        />{" "}
                                    </div>

                                    <TextInput

                                        label="Mobile No"
                                        placeholder='+9471136106'


                                    />

                                    <div>
                                        
                                        <Select
                                            label="Job Role"
                                            placeholder="Pick one"
                                            value={selectedRole}
                                            data={jobRoleOptions}
                                            onChange={(value) => handleSelectChange(value)}
                                        />
                                        {selectedRole === 'other' && (
                                            <input
                                                type="text"
                                                value={customRole}
                                                onChange={handleCustomRoleChange}
                                                placeholder="Enter your job role"
                                                style={{ marginTop: '10px', width: '426px', height: '30px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                                            />
                                        )}
                                    </div>




                                  
                                    <Button fullWidth mt="xl" type="submit">
                                       Submit
                                    </Button>

                                </Paper>
                            </form>
                        </div>

                    </Container>
                </div>

            </div>
        </>
    );
}