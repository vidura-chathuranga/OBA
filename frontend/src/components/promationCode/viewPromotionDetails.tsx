//user getting promotion code
//Member function part

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

    _id: string;
    shopname: string;
    discount: string;
    count: string;
    details: string;


}

function filterData(data: Data[], search: string) {
    const query = search.toString().toLowerCase().trim();

    return data.filter((item) =>
        keys(data[0]).some((key) =>
            item[key].toString().toLowerCase().includes(query)
        )
    );
}

const ViewPromotionDetails = (values: {
    name: string;
    email: string;
}) => {
    const [search, setSearch] = useState("");
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);
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

    //code add form
    const addForm = useForm({
        validateInputOnChange: true,
        initialValues: {

            shopname: "",
            discount: "",
            count: "",
            details: "",
        },
    });

    const passNameEmail = (_id: string) => {


        UserAPI.passNameEmail(values,_id)
            .then((res) => {
                updateNotification({
                    id: "Send promoCode",
                    color: "teal",
                    title: "Sending Promotion code",
                    message: "Please wait while we Sending Promotion code..",
                    icon: <IconCheck />,
                    autoClose: 2500,
                });
            })

            .catch((error) => {
                updateNotification({
                    id: "Send promoCode",
                    color: "red",
                    title: "Something went wrong!",
                    message: "There is a problem when Sending Promotion code",
                    icon: <IconX />,
                    autoClose: 2500,
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
                    <Text size={15}>{row.details}</Text>
                </td>

                <td>
                    {
                        <>
                            <Group spacing={"xs"}>

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
                    <Text size={15}>{row.details}</Text>
                </td>
                <td>
                    {
                        <>
                            <Group spacing={"xs"}>
                                <Button
                                    onClick={() => passNameEmail(row._id)}
                                    variant="subtle"
                                >
                                    Get Promo Code
                                </Button>



                            </Group>
                        </>
                    }
                </td>
            </tr>
        ));
    }
    //if data is fetching this overalay will be shows to the user
    if (isLoading) {
        return <LoadingOverlay visible={isLoading} overlayBlur={2} />;
    }

    if (isError) {
        showNotification({
            title: "Cannot fetching code Data",
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
                                <th>Details</th>
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

export default ViewPromotionDetails;
