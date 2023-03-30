"use client"
import {
    Flex,
    Box,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Text
  } from '@chakra-ui/react';
export default function ChatGPT(){
    return (
        <Box>
            <Flex 
                minH={'100vh'}
              align={'center'}
              justify={'center'}>
                 <Text as={'h1'}>
                    Chat GPT Demo
                </Text>
            </Flex>
        </Box>
    )

}