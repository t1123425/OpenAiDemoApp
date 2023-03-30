'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './Navbar'
import InfoFooter from './InfoFooter'
export default function ClientRoot({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <CacheProvider>
            <ChakraProvider>
                <NavBar/>
                {children}
                <InfoFooter />
            </ChakraProvider>
        </CacheProvider>
    )
}