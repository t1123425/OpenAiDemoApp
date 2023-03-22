import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import React from 'react';
  import { FaGithubSquare } from 'react-icons/fa';

  export default function InfoFooter(){
    return (
      <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
          <Text>© 2023 Built By Tom Yuan with UI framework Chakra</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'GitHub'} href={'https://github.com/t1123425/OpenAiDemoApp'}>
              <FaGithubSquare />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    )
  }

  const SocialButton = ({
    children,
    label,
    href,
  }: {
    children: React.ReactNode;
    label: string;
    href: string;
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };

