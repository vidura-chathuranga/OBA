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
import UserAPI from "../../API/userAPI/user.api";


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
    
    shopname: string;
    discount : string;
    

}

function filterData(data: Data[], search: string) {
    const query = search.toString().toLowerCase().trim();

    return data.filter((item) =>
        keys(data[0]).some((key) =>
            item[key].toString().toLowerCase().includes(query)
        )
    );
}

const PromationCode = () => {
    const [search, setSearch] = useState("");
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpened, setEditOpened] = useState(false);
    const [sortedData, setSortedData] = useState<Data[]>([]);

   // use react query and fetch data
    const { data = [], isLoading, isError, refetch, } = useQuery(["memberData"], () => {
        return UserAPI.getAllCodes().then((res) => res.data);
    },
        { initialData: [] }
    );


    //search filter
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(filterData(data, value)); //store filtered data in the search state
        if (sortedData.length === data.length) {
            setSortedData([]);
        }
    };
    //declare edit form
    const editForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            
            shopname: "",
            discount: "",
           
            
        },
    });

    // form for deletion
    const deleteForm = useForm({
        validateInputOnChange: true,
        initialValues: {
            shopname: "",
            discount : "",
        },
    });

    //update member details  function
    const updateDetails = async (values: {
       
        shopname: string;
        discount : string;
        
    }) => {
        showNotification({
            id: "update-details",
            loading: true,
            title: "Updating member record",
            message: "Please wait while we update member record..",
            autoClose: false,
        });

        // console.log(values)

        // UserAPI.updateMember(values)
        //     .then((response) => {
        //         updateNotification({
        //             id: "update-details",
        //             color: "teal",
        //             icon: <IconCheck />,
        //             title: "member updated successfully",
        //             message: "member details updated successfully.",
        //             autoClose: 5000,
        //         });
        //         editForm.reset();
        //         setEditOpened(false);

        //         //getting updated data from database
        //         refetch();
        //     })
        //     .catch((error) => {
        //         updateNotification({
        //             id: "update-details",
        //             color: "red",
        //             title: "details updating failed",
        //             icon: <IconX />,
        //             message: "We were unable to update the details",
        //             autoClose: 5000,
        //         });
        //     });
    };

    // delete member function
    const deleteMember = (values: {
        shopname: string;

    }) => {
        UserAPI.deleteCode(values)
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
                    <Text size={15}>{row.shopname}</Text>
                </td>
                <td>
                    <Text size={15}>{row.discount}</Text>
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
                                               
                                                shopname: row.shopname,
                                                discount : row.discount,
                                               
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
                                               shopname: row.shopname,
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
                    <Text size={15}>{row.shopname}</Text>
                </td>
                <td>
                    <Text size={15}>{row.discount}</Text>
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
                                               
                                                shopname: row.shopname,
                                                discount : row.discount,
                                               
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
                                               shopname: row.shopname,
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
    // if (isLoading) {
    //     return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
    // }

    // if (isError) {
    //     showNotification({
    //         title: "Cannot fetching Stock Data",
    //         message: "check internet connection",
    //         color: "red",
    //         icon: <IconX />,
    //         autoClose: 1500,
    //     });
    // }



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
                            {...deleteForm.getInputProps("shopname")}
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
                        {...editForm.getInputProps("shopname")}
                    />
                    <TextInput
                        label="Member Name"
                        placeholder="Enter member name"
                        {...editForm.getInputProps("shopname")}
                        required
                    />
                    <TextInput
                        label="discount"
                        placeholder="Enter email"
                        {...editForm.getInputProps("discount")}
                        required
                    />
                   

                    <Button
                        color="blue"
                        sx={{ marginTop: "10px", width: "100%" }}
                        type="submit"
                    >
                        Save
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
                        // onChange={handleSearchChange}
                        ml={"12%"}
                        w={"60%"}
                    />
                    <Button>Add Code</Button>
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
                                <th>Shop Name</th>
                                <th>Discount</th>
                                
                        
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

export default PromationCode;
