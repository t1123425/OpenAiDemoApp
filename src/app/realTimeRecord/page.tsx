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
  import dynamic from 'next/dynamic';
  import React,{useState} from 'react';
export default function ReadTimeRecord(){
    const VideoRecordingDialog = dynamic(() => import('@/app/components/Recorder'), { ssr: false });
    const [audioUrl,setAudioUrl] = useState('');
    
    function updateAudio(blob:Blob){
      setAudioUrl(URL.createObjectURL(blob))
    }
    return (
        <Box>
            <Flex 
              minH={'100vh'}
              align={'center'}
              justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <VideoRecordingDialog getAudioBlob={updateAudio} />
                </Stack>
            </Flex>
        </Box>
    )
}