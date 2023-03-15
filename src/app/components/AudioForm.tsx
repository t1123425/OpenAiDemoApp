import {
    Flex,
    Box,
    Stack,
    Heading,
    useColorModeValue,
  } from '@chakra-ui/react';
 import { AudioRecorder } from 'react-audio-voice-recorder';
 const addAudioElement = (blob:any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    console.log('audio',audio);
    // document.body.appendChild(audio);
  };
  export default function AudioForm() {
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
                        <AudioRecorder onRecordingComplete={addAudioElement} />
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
  }