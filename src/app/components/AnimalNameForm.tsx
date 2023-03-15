'use client'
import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    FormControl,
    FormLabel,
    Input,
    useColorModeValue,
  } from '@chakra-ui/react';
 import {useState} from 'react'
  export default function AnimalNameForm(){
        const [inputValue,setInputValue] = useState('');
        const [isload,setLoading] = useState(false);
        async function handleSubmit(){
            // console.log('inputValue',inputValue);
            setLoading(true);
            try{
                const response = await fetch('/api/openai_generate',{
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ animal: inputValue }),
                })
                const data = await response.json();
                if (response.status !== 200) {
                    throw data.error || new Error(`Request failed with status ${response.status}`);
                }
                console.log('res data',data);
                setLoading(false);
                setInputValue("");
            }catch(err){
                setLoading(false);
                console.error(err);
            }
            

        }
        return (
            <Flex 
            minH={'100vh'}
            align={'center'}
            justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Help you thinks a super animal name</Heading>
                    </Stack>
                    <Box rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl>
                                 <FormLabel id="animalName">
                                    The kind of Animal
                                 </FormLabel>
                                 <Input type="text" value={inputValue} onChange={(e)=>{ setInputValue(e.target.value)}} placeholder='Please enter a kind of animal' />
                            </FormControl>
                            <Button
                                bg={!isload?'blue.400':'gray.400'}
                                color={'white'}
                                _hover={{
                                bg: !isload?'blue.500':'gray.400',
                                }}
                                isDisabled={isload}
                                onClick={handleSubmit}>
                               {
                                 isload?'Loading...':'Submit'
                               }
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        )
  }
