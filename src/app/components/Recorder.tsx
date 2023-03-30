'use client';
import { Box, Button,Stack } from '@chakra-ui/react';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';
import React,{useEffect,useState,useRef} from 'react';
interface Props{
    getAudioBlob?:(blobUrl:Blob)=> void,
}

const Recorder =  ({getAudioBlob}:Props) => {
    const recorderRef = useRef<RecordRTC | null>();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isRecord,setRecord] = useState(false);
    async function startRecord(){
       
        if(navigator.mediaDevices){
            try{
                streamRef.current = await navigator.mediaDevices.getUserMedia({
                    audio: true
                })
                recorderRef.current = new RecordRTC(streamRef.current,{type:'audio',numberOfAudioChannels: 2,
            checkForInactiveTracks: true,
            bufferSize: 16384})
                recorderRef.current?.startRecording();
               
                // const Blob = recorderRef.current?.getBlob();
                // console.log('start record',Blob);
                // if(Blob){ 
                //     setAudioUrl(URL.createObjectURL(Blob))
                // }
                setRecord(true);
                if(audioRef.current){
                    audioRef.current.srcObject = streamRef.current;
                    audioRef.current.muted = true;
                    audioRef.current.play();
                }
            }catch(err){
                console.log('error',err)
            }
        }
    }
    function stopRecord(){
        recorderRef.current?.stopRecording(()=>{
            let blob = recorderRef.current?.getBlob();
            // console.log('stream',streamRef.current);
            if(blob){
                //console.log('Url',URL.createObjectURL(blob));
                //setAudioUrl(URL.createObjectURL(blob))
                if(getAudioBlob){
                    getAudioBlob(blob)
                }
                
                // audioRef.current?.play();
                //invokeSaveAsDialog(blob,'record.mp3');
            }
           
        });
        setTimeout(()=>{
            setRecord(false);
            streamRef.current?.getAudioTracks()[0].stop();
        },100)
        //
    }

    return (
        <div>
            <Stack spacing={2} >
                {
                    isRecord?<Button bg={'red.400'} _hover={{bg:'red.600'}} p={3} onClick={stopRecord}>
                    stop record
                </Button>:<Button bg={'blue.400'} _hover={{bg:'blue.600'}}  p={3} onClick={startRecord}>
                    start record
                </Button>
                }
                <Box display={isRecord?'block':'none'}>
                    <audio controls autoPlay ref={audioRef} />
                </Box>
            </Stack>
        </div>
    )
}

export default Recorder;