import {
  Button,
  Card,
  Group,
  Image,
  Paper,
  rem,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  DropzoneProps,
  FileWithPath,
} from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";

const FrontLeftAdvertisement = () => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return (
      <Group position="center">
        <Image
          src={imageUrl}
          key={index}
          width={"auto"}
          height={150}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      </Group>
    );
  });

  return (
    <Card withBorder shadow="xl" mt={30}>
      <Card.Section withBorder p={10}>
        <Title order={2} align="center">
          Front Advertisement
        </Title>
      </Card.Section>
      <Card.Section p={20}>
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => setFiles(files)}
          onReject={(files) => {
            showNotification({
              title: "File upload Error",
              message: "try to reupload another file",
              autoClose: 1500,
              icon: <IconX />,
              color: "red",
            });
          }}
          maxSize={3 * 1024 ** 2}
          maxFiles={1}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag image here or click to select files
              </Text>
            </div>
          </Group>
        </Dropzone>
      </Card.Section>
      <Card.Section p={20} withBorder>
        {previews}
      </Card.Section>
      <Card.Section p={10} withBorder>
        <Group grow>
          <Button color="teal">publish advertisement</Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default FrontLeftAdvertisement;
