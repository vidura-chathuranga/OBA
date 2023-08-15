
import { useState } from 'react';
import { createStyles, Header, Group, ActionIcon, Container, Burger, rem, Image, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandYoutube, IconBrandFacebook } from '@tabler/icons-react';
import { World } from 'tabler-icons-react';
import LogoRich from "../../assets/LogoRich.png";
import { Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        alignItems: 'center',
        height: rem(60),

        [theme.fn.smallerThan('sm')]: {
            justifyContent: 'flex-start',
        },
    },

    links: {
        width: rem(400),


        [theme.fn.smallerThan('lg')]: {
            display: 'none',
        },
    },

    social: {
        width: rem(500),

        [theme.fn.smallerThan('sm')]: {
            width: 'auto',
            marginLeft: 'auto',
        },
    },

}));

export function HeaderSchool() {
    const { classes, cx } = useStyles();


    return (
        <Header height={100} mb={0} style={{ backgroundColor: '#B7CEEC' }}>
           

           
                <Group position='apart'>

                   
                        <Image width={70} height={70} src={LogoRich} style={{marginLeft:'400px' , paddingTop:'10px'}} />
                  
                  
                        <Title 
                            variant="gradient"
                            gradient={{ from: '#780206', to: '#061161', deg: 45 }}
                            sx={{ fontFamily: 'Georgia, serif' }}
                            ta="center"
                            weight={500}
                            
                            
                        > Richmond College  </Title>
                       
                  
                   

                    <Group spacing={0} className={classes.social} >

                        <a href="https://www.facebook.com/richmondcollege" target='_blank' rel="noopener noreferrer">
                            <ActionIcon size="lg">
                                <IconBrandFacebook size="1.1rem" stroke={1.5} />
                            </ActionIcon>
                        </a>
                        <a href="https://www.youtube.com/@richmondcollege9614" target="_blank" rel="noopener noreferrer">
                            <ActionIcon size="lg">
                                <IconBrandYoutube size="1.1rem" stroke={1.8} />
                            </ActionIcon>
                        </a>
                        <a href="https://www.richmondcollege.lk/" target="_blank" rel="noopener noreferrer">
                            <ActionIcon size="lg">
                                <World size="1.1rem" />
                            </ActionIcon>
                        </a>
                    </Group>

               
                </Group>
                

            
        </Header>
    );
}