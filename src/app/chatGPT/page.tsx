"use client"
import {
    Flex,
    Box,
    Stack,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text
  } from '@chakra-ui/react';
  import {useState,useEffect} from 'react'
  interface MsgObj{
    role:string,
    content:string
  }
export default function ChatGPT(){
    const [inputValue,setInputValue] = useState('');
    const [msgs,setMsgs] = useState<MsgObj[]>([]);
    useEffect(()=>{
        if(msgs.length > 0){
           
            sendMsg();
        }
        
        
    },[msgs])

    const handleSubmit = async () => {
        let msg:MsgObj = {
            role:'system',
            content:inputValue
        }
        
        setMsgs(msgs => [...msgs,msg]);
        setInputValue('');
    }
    const sendMsg = async () => {
        console.log('msgs',msgs);
        try{
            const response = await fetch('/api/openai_chat',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({msgs:msgs})
            })
            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            console.log('res',data);

        }catch(err){
            console.error(err);
        }
    }
    return (
            <Flex 
                minH={'100vh'}
              align={'center'}
              justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
                    <Text as={'h1'}>
                        Chat GPT Demo
                    </Text>
                    <Box rounded={'lg'}
                        boxShadow={'lg'}
                        p={8}>
                          <Stack spacing={4}>
                            <FormControl>
                                <FormLabel id="animalName">
                                    Ask AI Something
                                </FormLabel>
                                <Input type="text" value={inputValue} onChange={(e)=>{ setInputValue(e.target.value)}} placeholder='Please enter whatever you want to ask' />
                            </FormControl>
                            <Button
                             bg={'blue.400'}
                             color={'white'}
                             onClick={handleSubmit}
                             _hover={{
                                bg:'blue.500'
                             }}>
                                Submit
                            </Button>
                          </Stack>  
                    </Box>
                </Stack>
                
            </Flex>
    )

}