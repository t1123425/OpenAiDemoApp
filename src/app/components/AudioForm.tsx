import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue,
    Button,
  } from '@chakra-ui/react';
 import { AudioRecorder,useAudioRecorder} from 'react-audio-voice-recorder';
 import React,{useState} from 'react';

  export default function AudioForm() { 
    const recorderControls = useAudioRecorder();
    const [audioSrc,setAudioSrc] = useState('');
    const addAudioElement = (blob:Blob) => {
        const output = document.getElementById('audio_output')
        const url = URL.createObjectURL(blob);
        console.log('audio url',url);
        // setAudioSrc(url);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        // console.log('audio',audio);
        output?.appendChild(audio);
    };
    return (
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
                    <Stack spacing={4}>
                        <AudioRecorder 
                            onRecordingComplete={(blob) => addAudioElement(blob)}
                            recorderControls={recorderControls} 
                        />
                        <div id="audio_output"></div>
                        <Button onClick={recorderControls.stopRecording}>
                            Stop Recording
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
  }