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
  import {useState,useEffect,useMemo} from 'react'
  import { Icon } from '@chakra-ui/react';
  import { FaReply } from 'react-icons/fa';
  import { MsgObj } from '../../../typing';
import ChatContent from '@/app/components/chatContent';
export default function ChatGPT(){
    const [inputValue,setInputValue] = useState('');
    const [msgs,setMsgs] = useState<MsgObj[]>([]);
    const [isload,setLoad] = useState(false);
    const [isUpdate,setUpdate] = useState(false);

    useEffect(()=>{
        if(isUpdate && msgs.length > 0){
           
            sendMsg();
        }
        
    },[isUpdate,msgs])

    const handleSubmit = async () => {
        let msg:MsgObj = {
            role:'system',
            content:inputValue
        }
        
        setMsgs(msgs => [...msgs,msg]);
        setInputValue('');
        setUpdate(true);
    }
    const sendMsg = async () => {
        // console.log('msgs',msgs);
        setLoad(true);
        try{
            const response = await fetch('/api/openai_chat',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({msgs:msgs})
            })
            
            const res = await response.json();
            if (response.status !== 200) {
                throw res.error || new Error(`Request failed with status ${response.status}`);
            }
            setLoad(false)
            // console.log('res',res);
            const choicesData = res.data.choices[0];
            const choicesMessage:MsgObj = choicesData.message;
            if(choicesData.finish_reason === 'stop'){
                setUpdate(false)
            }
            setMsgs(msgs => [...msgs,choicesMessage]);
        }catch(err){
            setLoad(false)
            console.error(err);
        }
        
    }
    return (
            <Flex 
                minH={'100vh'}
                align={'center'}
                justify={'center'}>
                <Stack spacing={2} mx={'auto'} maxW={'lg'} py={3} px={3}>
                    <ChatContent msgs={msgs} />
                    {
                        isload && <Text color={'black'} textAlign="center">Loading...</Text>
                    }
                    <Box 
                        rounded={'lg'}
                        boxShadow={'lg'}
                        p={8}>
                          
                          <Stack spacing={4} mt={3} direction={['column', 'row']} alignItems={'self-end'}>
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
                             isDisabled={inputValue.length === 0}
                             _hover={{
                                bg:'blue.500'
                             }}>
                                <Icon as={FaReply} color='white' />
                            </Button>
                          </Stack>  
                    </Box>
                </Stack>
                
            </Flex>
    )

}