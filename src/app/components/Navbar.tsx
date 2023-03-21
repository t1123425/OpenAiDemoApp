import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    useColorModeValue,
    useBreakpointValue,
    HStack,
  } from '@chakra-ui/react';
  export default function NavBar() {
    
    return (
        <Box>
          <Flex 
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>
              <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                <Link 
                href={'/'}>
                  <Text
                    textAlign={'center'}
                    fontFamily={'heading'}
                    color={useColorModeValue('gray.800', 'white')}>
                    OpenAi Demo
                </Text>
                </Link>
                
               </Flex>
               <HStack
               as={'nav'}
               spacing={4}
               display={{ base: 'none', md: 'flex' }}>
                  <Link 
                  px={2}
                  py={1}
                  rounded={'md'}
                  href={'/'}>
                    Write Down Speech
                  </Link>
                  <Link 
                  px={2}
                  py={1}
                  rounded={'md'}
                  href={'/animalName'}>
                    Animal Name generate
                  </Link>
               </HStack>
            </Flex>
        </Box>
    )
  }