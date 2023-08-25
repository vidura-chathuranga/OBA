import {
    Button,
    Card,
    Group,
    Image,
    LoadingOverlay,
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
  import { IconCheck, IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
  import { useState } from "react";
import NewsAPI from "../../API/newsAPI";
  
  const AddNewsRight = () => {
    const theme = useMantineTheme();
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [loading, setLoading] = useState(false);
  
    let imageUrl: string;
    const previews = files.map((file, index) => {
      imageUrl = URL.createObjectURL(file);
  
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
  
    const convertBase64 = () => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
  
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = () => {
          reject(fileReader.error);
        };
      });
    };
  
    const storeAdvertisement = async () => {
      try {
        setLoading(true);
        const base64 = await convertBase64();
  
        NewsAPI.addNews(base64, "NEWSBOTTOM").then((res) => {
          setLoading(false);
  
          showNotification({
            title: "Successfully uploaded",
            message: "Your News was successfully uploaded",
            autoClose: 1500,
            color: "teal",
            icon: <IconCheck />,
          });
  
          URL.revokeObjectURL(imageUrl);
          setFiles([]);
        });
      } catch (error) {
        showNotification({
          title: "Error while uploading",
          message: "try again to upload photo",
          autoClose: 1500,
          icon: <IconX />,
          color: "red",
        });
      }
    };
  
    return (
      <>
        <Card withBorder shadow="xl" mt={30}>
          <Card.Section withBorder p={10}>
            <Title order={2} align="center">
              News
            </Title>
          </Card.Section>
          <Card.Section p={20}>
            <LoadingOverlay visible={loading} overlayBlur={2} />
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
                  <Text size="xl" align="center">
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
              <Button color="teal" onClick={storeAdvertisement}>
                Publish News
              </Button>
            </Group>
          </Card.Section>
        </Card>
      </>
    );
  };
  
  export default AddNewsRight;
  