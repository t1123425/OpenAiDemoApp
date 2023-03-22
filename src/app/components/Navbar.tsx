import {
    Box,
    Flex,
    Text,
    IconButton,
    VStack,
    Collapse,
    Link,
    useColorModeValue,
    HStack,
    useDisclosure
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  interface navItem{
    label:string,
    href:string
  }
  const NavItems:navItem[] = [
    {
      label:'Write Down Speech',
      href:'/'
    },
    {
      label:'Animal Name generate',
      href:'/animalName'
    }
  ]
  export default function NavBar() {
    const { isOpen, onToggle } = useDisclosure();
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
              <Flex
                flex={{ base: 0, md: 'auto' }}
                ml={{ base: -2 }}
                display={{ base: 'flex', md: 'none' }}>
                  <IconButton
                    onClick={onToggle}
                    icon={
                      isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                    }
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'}
                  />
              </Flex>
              <Flex flex={{ base: 1 }} ml={{ base: 2 }} justify={{ base: 'center', md: 'start' }}>
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
                  {
                    NavItems.map((e,i)=> <Link 
                      key={i}
                      px={2}
                      py={1}
                      rounded={'md'}
                      href={e.href}>
                      {e.label}
                    </Link>)
                  }
               </HStack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    )
  }
  const MobileNav = () => {
    return (
      <VStack
      bg={useColorModeValue('white', 'gray.800')}
      p={2}
      spacing={2}
      display={{ md: 'none' }}>
         {
            NavItems.map((e,i)=> {
              return (
                <Box key={i}>
                  <Link 
                    px={2}
                    py={1}
                    rounded={'md'}
                    href={e.href}>
                    {e.label}
                  </Link>
                </Box>
              )
            })
          }
      </VStack>
    )
  }