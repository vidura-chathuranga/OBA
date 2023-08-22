import {
    createStyles,
    Table,
    ScrollArea,
    Group,
    Text,
    TextInput,
    rem,
    ActionIcon,
    Tooltip,
    Button,
    Box,
    Modal,
    LoadingOverlay,
    Select,
    Grid,

} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
    IconSearch,
    IconEdit,
    IconTrash,
    IconX,
    IconCheck,

} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { DateInput, YearPickerInput } from "@mantine/dates";
import UserAPI from "../../API/userAPI/user.api";
import { selectCountryList } from "./coutries";

const buttonStyle = {
    backgroundColor: 'white',   // Change the background color to red
    color: 'blue',           // Change the text color to white
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};
// styles
const useStyles = createStyles((theme) => ({
    th: {
        padding: "0 !important",
    },

    control: {
        width: "100%",
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    icon: {
        width: rem(21),
        height: rem(21),
        borderRadius: rem(21),
    },
    header: {
        position: "sticky",
        zIndex: 100,
        top: 0,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[1],
        transition: "box-shadow 150ms ease",

        "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[2]
                }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

interface Data {
    _id: string;
    name: string;
    email: string;
    year: Date;
    country: string;
    mobile: string;
    company: string;
    jobRole: string;

}
const jobRoleOptions = [
    { value: 'it', label: 'IT Professional' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'writer', label: 'Writer' },
    { value: 'other', label: 'Other' },
];


function filterData(data: Data[], search: string) {
    const query = search.toString().toLowerCase().trim();

    return data.filter((item) =>
        keys(data[0]).some((key) =>
            item[key].toString().toLowerCase().includes(query)
        )
    );
}

const ManageMembers = () => {
    const [search, setSearch] = useState("");
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpened, setEditOpened] = useState(false);
    const [regOpened, setRegOpened] = useState(false);
    const [sortedData, setSortedData] = useState<Data[]>([]);
    const [selectedRole, setSelectedRole] = useState('');

    const handleSelectChange = (value: any) => {
        setSelectedRole(value);

        // If "Other" is selected, clear customRole input
        if (value !== 'other') {
            editForm.setFieldValue("jobRole", value);
            registerForm.setFieldValue("jobRole",value);
        }

    };

    const handleCustomRoleChange = (event: any) => {
        editForm.setFieldValue("jobRole", event.target.value);
        registerForm.setFieldValue("jobRole", event.target.value);


    };

    // use react query and fetch data
    const { data = [], isLoading, isError, refetch, } = useQuery(["memberData"], () => {
        return UserAPI.getAllMembers().then((res) => res.data);
    },
        { initialData: [] }
    );


    // search filter
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(filterData(data, value)); //store filtered data in the search state
        if (sortedData.length === data.length) {
            setSortedData([]);
        }
    };


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
        validate: {
            name: (value) =>
                value.length < 2 ? "Name must have at least 2 letters" : null,

            email: (value) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                )
                    ? null
                    : "Invalid email",
        }
    });

    //declare edit form
    const editForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
            name: "",
            email: "",
            year: new Date(),
            country: "",
            mobile: "",
            company: "",
            jobRole: "",
        },
    });

    // form for deletion
    const deleteForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            _id: "",
        },
    });

    //register memeber function
    const registerUser = async (values: {
        name: string;
        email: string;
        year: string;
        country: string;
        mobile: string;
        company: string;
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
                setRegOpened(false);

                refetch();


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

    //update member details  function
    const updateDetails = async (values: {
        _id: string;
        name: string;
        email: string;
        year: Date;
        country: string;
        mobile: string;
        company: string;
        jobRole: string;
    }) => {
        showNotification({
            id: "update-details",
            loading: true,
            title: "Updating member record",
            message: "Please wait while we update member record..",
            autoClose: false,
        });
        UserAPI.updateMember(values)
            .then((response) => {
                updateNotification({
                    id: "update-details",
                    color: "teal",
                    icon: <IconCheck />,
                    title: "member updated successfully",
                    message: "member details updated successfully.",
                    autoClose: 5000,
                });
                editForm.reset();
                setEditOpened(false);

                //getting updated data from database
                refetch();
            })
            .catch((error) => {
                updateNotification({
                    id: "update-details",
                    color: "red",
                    title: "details updating failed",
                    icon: <IconX />,
                    message: "We were unable to update the details",
                    autoClose: 5000,
                });
            });
    };

    // delete member function
    const deleteMember = (values: {
        _id: string;

    }) => {
        UserAPI.deleteMember(values)
            .then((res) => {
                showNotification({
                    title: `Member was deleted`,
                    message: "Member was deleted successfully",
                    autoClose: 1500,
                    icon: <IconCheck />,
                    color: "teal",
                });

                // after successing the deletion refetch the data from the database
                refetch();

                // clear all the fields
                deleteForm.reset();

                // then close the delete modal
                setDeleteOpen(false);
            })
            .catch((err) => {
                showNotification({
                    title: `Member was not deleted`,
                    message: "Member was not deleted",
                    autoClose: 1500,
                    icon: <IconX />,
                    color: "red",
                });
            });
    };

    //declare the rows variable and based on the filtered data or row data, it will print the table data!
    let rows = [];

    // rows map
    if (sortedData.length > 0) {
        rows = sortedData?.map((row: any) => (
            <tr key={row._id}>
                <td>
                    <Text size={15}>{row.name}</Text>
                </td>
                <td>
                    <Text size={15}>{row.email}</Text>
                </td>
                <td>
                    <Text size={15}>{new Date(row.year).getFullYear()}</Text>
                </td>
                <td>
                    <Text size={15} style={row.country ? {} : { color: 'red' }}>
                        {row.country || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.mobile ? {} : { color: 'red' }}>
                        {row.mobile || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.company ? {} : { color: 'red' }}>
                        {row.company || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.jobRole ? {} : { color: 'red' }}>
                        {row.jobRole || "NaN"}
                    </Text>
                </td>
                <td>
                    {
                        <>
                            <Group spacing={"xs"}>

                                {/* edit button */}
                                <Tooltip label="Edit member">
                                    <ActionIcon
                                        color="teal"
                                        onClick={() => {
                                            editForm.setValues({
                                                _id: row._id,
                                                name: row.name,
                                                email: row.email,
                                                year: row.year,
                                                country: row.country,
                                                mobile: row.mobile,
                                                company: row.company,
                                                jobRole: row.jobRole,
                                            });
                                            setEditOpened(true);
                                        }}
                                    >
                                        <IconEdit />
                                    </ActionIcon>
                                </Tooltip>

                                {/* delete button */}
                                <Tooltip label="Delete member">
                                    <ActionIcon
                                        color="red"
                                        onClick={() => {
                                            deleteForm.setValues({
                                                _id: row._id,
                                            });
                                            setDeleteOpen(true);
                                        }}
                                    >
                                        <IconTrash />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </>
                    }
                </td>
            </tr>
        ));
    } else {
        rows = data?.map((row: any) => (
            <tr key={row._id}>
                <td>
                    <Text size={15}>{row.name}</Text>
                </td>
                <td>
                    <Text size={15}>{row.email}</Text>
                </td>
                <td>
                    <Text size={15}>{new Date(row.year).getFullYear()}</Text>

                </td>
                <td>
                    <Text size={15} style={row.country ? {} : { color: 'red' }}>
                        {row.country || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.mobile ? {} : { color: 'red' }}>
                        {row.mobile || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.company ? {} : { color: 'red' }}>
                        {row.company || "NaN"}
                    </Text>
                </td>
                <td>
                    <Text size={15} style={row.jobRole ? {} : { color: 'red' }}>
                        {row.jobRole || "NaN"}
                    </Text>
                </td>
                <td>
                    {
                        <>
                            <Group spacing={"xs"}>

                                {/* edit button */}
                                <Tooltip label="Edit member">
                                    <ActionIcon
                                        color="teal"
                                        onClick={() => {
                                            const year = new Date(row.year); // Convert to Date object
                                            editForm.setValues({
                                                _id: row._id,
                                                name: row.name,
                                                email: row.email,
                                                year: year,
                                                country: row.country,
                                                mobile: row.mobile,
                                                company: row.company,
                                                jobRole: row.jobRole,
                                            });
                                            setEditOpened(true);
                                        }}
                                    >
                                        <IconEdit />
                                    </ActionIcon>
                                </Tooltip>

                                {/* delete button */}
                                <Tooltip label="Delete member">
                                    <ActionIcon
                                        color="red"
                                        onClick={() => {
                                            deleteForm.setValues({
                                                _id: row._id,
                                            });
                                            setDeleteOpen(true);
                                        }}
                                    >
                                        <IconTrash />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </>
                    }
                </td>
            </tr>
        ));
    }
    // if data is fetching this overalay will be shows to the user
    if (isLoading) {
        return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
    }

    if (isError) {
        showNotification({
            title: "Cannot fetching Stock Data",
            message: "check internet connection",
            color: "red",
            icon: <IconX />,
            autoClose: 1500,
        });
    }



    // table
    return (
        <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            pos="relative"
        >
            {/* delete modal */}
            <Modal
                opened={deleteOpen}
                centered
                onClose={() => {
                    setDeleteOpen(false);
                }}
                title="Delete member"
            >
                <Box>
                    <Text size={"sm"} mb={10}>
                        Are you sure you want to delete this member? This action cannot be
                        undone!
                    </Text>
                    <form
                        onSubmit={deleteForm.onSubmit((values) => {
                            deleteMember(values);
                        })}
                    >
                        <TextInput
                            withAsterisk
                            label="Id"
                            required
                            disabled
                            {...deleteForm.getInputProps("_id")}
                            mb={10}
                        />

                        <Group position="right" spacing={"md"} mt={20}>
                            <Button
                                color="gray"
                                variant="outline"
                                onClick={() => {
                                    deleteForm.reset();
                                    setDeleteOpen(false);
                                }}
                            >
                                No I don't delete it
                            </Button>
                            <Button
                                color="red"
                                type="submit"
                                leftIcon={<IconTrash size={16} />}
                            >
                                Delete it
                            </Button>
                        </Group>
                    </form>
                </Box>
            </Modal>

            {/* member edit model */}
            <Modal
                opened={editOpened}
                onClose={() => {
                    editForm.reset();
                    setEditOpened(false);
                }}
                title="Update member Record"
            >
                <form onSubmit={editForm.onSubmit((values) => updateDetails(values))}>
                    <TextInput
                        withAsterisk
                        label="ID"
                        required
                        disabled
                        {...editForm.getInputProps("_id")}
                    />
                    <TextInput
                        label="Member Name"
                        placeholder="Enter member name"
                        {...editForm.getInputProps("name")}
                        required
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email"
                        {...editForm.getInputProps("email")}
                        required
                    />
                    <YearPickerInput
                        label="Batch Year"
                        placeholder="Pick date"
                        withAsterisk
                        {...editForm.getInputProps("year")}
                    />
                    <Select data={selectCountryList} searchable
                        label="Country Of Residence"
                        placeholder='Sri Lanka'
                        {...editForm.getInputProps("country")}

                    />
                    <TextInput
                        label="Phone number"
                        placeholder="Enter Phone number"
                        {...editForm.getInputProps("mobile")}
                        required
                    />
                    <TextInput
                        label="Company Name"
                        placeholder="Enter Company Name"
                        {...editForm.getInputProps("company")}
                        required
                    />

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

                            onChange={handleCustomRoleChange}
                            placeholder="Enter your job role"
                            style={{ marginTop: '10px', width: '426px', height: '30px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                        />
                    )}

                    <Button
                        color="blue"
                        sx={{ marginTop: "10px", width: "100%" }}
                        type="submit"
                    >
                        Save
                    </Button>
                </form>
            </Modal>

            {/* register model */}
            <Modal
                opened={regOpened}
                onClose={() => {
                    registerForm.reset();
                    setRegOpened(false);
                }}
                title="Add member Record"
            >
                <form

                    onSubmit={registerForm.onSubmit((values) => registerUser(values))}
                >
                    <TextInput
                        label="Member Name"
                        placeholder="Enter member name"
                        {...registerForm.getInputProps("name")}
                        required
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email"
                        {...registerForm.getInputProps("email")}
                        required
                    />
                    <YearPickerInput
                        label="Batch Year"
                        placeholder="Pick date"
                        withAsterisk
                        {...registerForm.getInputProps("year")}
                    />
                    <Select data={selectCountryList} searchable
                        label="Country Of Residence"
                        placeholder='Sri Lanka'
                        {...registerForm.getInputProps("country")}

                    />
                    <TextInput
                        label="Phone number"
                        placeholder="Enter Phone number"
                        {...registerForm.getInputProps("mobile")}
                        required
                    />
                    <TextInput
                        label="Company Name"
                        placeholder="Enter Company Name"
                        {...registerForm.getInputProps("company")}
                        required
                    />

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

                            onChange={handleCustomRoleChange}
                            placeholder="Enter your job role"
                            style={{ marginTop: '10px', width: '426px', height: '30px', borderRadius: '5px', border: '1px solid #ccc', padding: '5px' }}
                        />
                    )}


                    <Button fullWidth mt="xl" type="submit">
                        Submit
                    </Button>
                </form>
            </Modal>
            <div>
                <Group spacing={35} mb={70} mt={30}>
                    {/* search bar */}
                    <TextInput
                        placeholder="Search by any field"
                        icon={<IconSearch size="0.9rem" stroke={1.5} />}
                        value={search}
                        onChange={handleSearchChange}
                        ml={"12%"}
                        w={"60%"}
                    />
                    <Button
                        onClick={() => setRegOpened(true)}
                        color="blue"
                        sx={{ marginTop: "10px", width: "10%" }}
                        type="submit"
                        
                    >
                        Add Member
                    </Button>
                </Group>
                <ScrollArea
                    w={"100mw"}
                    h={600}
                    onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                >
                    <Table
                        highlightOnHover
                        horizontalSpacing={60}
                        verticalSpacing="lg"
                        miw={700}
                        sx={{ tableLayout: "fixed" }}
                    >
                        <thead
                            className={cx(classes.header, { [classes.scrolled]: scrolled })}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Batch Year</th>
                                <th>Country</th>
                                <th>Mobile Number</th>
                                <th>Company Name</th>
                                <th>jobRole</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {rows?.length > 0 ? (
                                rows
                            ) : (
                                <tr>
                                    <td>
                                        <Text weight={500} align="center">
                                            Nothing found
                                        </Text>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </ScrollArea>
            </div>
        </Box>
    );
};

export default ManageMembers;
