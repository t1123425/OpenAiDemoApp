'use client'
import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Select,
    Text
  } from '@chakra-ui/react';
 import { AudioRecorder,useAudioRecorder} from 'react-audio-voice-recorder';
 import CustomModal from './CustomModal';
 import React,{useState} from 'react';

  interface modelData{
    title:string,
    value:string
  }
  export default function AudioForm() { 
    const recorderControls = useAudioRecorder();
    const [text,setText] = useState('');
    const whisperModel:modelData[] = [
        {
            title:'Here is what you say',
            value:'transcriptions'
        },
        {
            title:'Translation what you say',
            value:'translations'
        }];
    const [model,setModel] = useState<modelData>(whisperModel[0]);
    const [isLoad,setLoading] = useState(false);
    const {onOpen,isOpen,onClose} = useDisclosure();

    const SubmitAudio = async (blob:Blob) => {
        // const url = URL.createObjectURL(blob);
        const audioFile = new File([blob], "record.mp3", {type:'audio/mpeg',lastModified: new Date().getTime()});
        const formData = new FormData()
        formData.append('file',audioFile)
        formData.append('model','whisper-1')
        setLoading(true);
        const requestHeaders = {
            'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
        }

        try{
            // const local_url = '/api/openai_whisper'
            const apiUrl =  `${process.env.OPENAI_API_LINK}/${model.value}`
            const response = await fetch(apiUrl,{
                method: "POST",
                headers:requestHeaders,
                body:formData
            })
            const data = await response.json();
            console.log('data',data);
            setText(data.text)
            onOpen();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            setLoading(false)
        }catch(err){
            console.error('error',err);
            setLoading(false)
        }
        
        
    }
    return ( 
        <>
         <CustomModal isOpen={isOpen} onClose={onClose} title={model.title} value={text} />
         <Flex 
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Press Button Record Your Speech</Heading>
                    </Stack> 
                    <Box 
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}>
                        <Stack spacing={4} p={3} align={'center'}>
                            <FormControl>
                                <FormLabel>
                                    Model:
                                </FormLabel>
                                <Select 
                                    variant='outline' 
                                    size='md' 
                                    defaultValue={model.value} 
                                    onChange={(e)=>{ 
                                        whisperModel.forEach((d)=>{
                                            if(d.value === e.target.value){
                                                setModel(d);
                                            }
                                        })
                                    }}>
                                    {
                                        whisperModel.map((e,i) => <option key={i} value={e.value}>{e.value}</option>)
                                    }
                                </Select>
                            </FormControl>
                            <AudioRecorder 
                                onRecordingComplete={(blob) => SubmitAudio(blob)}
                                recorderControls={recorderControls}></AudioRecorder>
                                {
                                    recorderControls.isRecording && <Button  onClick={recorderControls.stopRecording}>
                                            Stop Recording
                                        </Button>
                                }
                                {
                                    isLoad && <Text as='b'>Loading...</Text>
                                }
                        </Stack>
                    </Box>
                </Stack>
         </Flex>
        </>
    )
  }