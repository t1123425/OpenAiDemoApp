'use client';
import { Box, Stack ,Text} from "@chakra-ui/react";
import { MsgObj } from '../../../typing';
interface ChatBoxProps{
    text?:string,
    roles:string,
}
interface ChatContentProps{
    msgs:MsgObj[]
}
const ChatBox = ({text,roles}:ChatBoxProps) => {
    return (
        <Box w={'full'} textAlign={roles !== 'assistant'?'right':'left'} >
            <Box w={'full'} color={'white'}  p={1} bg={roles !== 'assistant'?'gray.400':'blue.400'} borderRadius={'base'}>
                <Text fontWeight={'bold'} borderBottom={'3px solid #fff'}>
                    {
                        roles !== 'assistant'?'You say':'AI say'
                    }
                </Text>
                <Text >
                    {text}
                </Text>
            </Box>
        </Box>
    )
}
export default function ChatContent({msgs}:ChatContentProps){
    return (
        <Stack spacing={3}>
            {
                msgs.map((e,i) => {
                    return <ChatBox key={i} text={e.content} roles={e.role} />
                })
            }
        </Stack>
    )
}