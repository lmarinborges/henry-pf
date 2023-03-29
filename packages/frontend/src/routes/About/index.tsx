import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react"
import pagar from '../../assets/pagar.png'
import crossfit from '../../assets/crossfit.png'
import cohete from '../../assets/cohete.png'

function About() {
    return (
        <Flex flexDirection='column' align='center' >

            <Text fontSize='48px'>¿Porque elegirnos?</Text>
            <Box  w='36' mb='20px'>
                <img src={crossfit}></img>

            </Box>
            <Text w='320px' mb='20px'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia explicabo quos recusandae consectetur. Laboriosam perspiciatis at fugit pariatur sint, ex nihil eius facilis earum modi quod labore, autem minus?</Text>
            <Box  w='32' mb='20px'>
                <img src={cohete}></img>

            </Box>
            <Text w='320px'mb='20px'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia explicabo quos recusandae consectetur. Laboriosam perspiciatis at fugit pariatur sint, ex nihil eius facilis earum modi quod labore, autem minus?</Text>
            <Box  w='32' mb='20px'>
                <img src={pagar}></img>

            </Box>
            <Text w='320px' mb='20px'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod officia explicabo quos recusandae consectetur. Laboriosam perspiciatis at fugit pariatur sint, ex nihil eius facilis earum modi quod labore, autem minus?</Text>
        </Flex>
    );
}

export default About;
