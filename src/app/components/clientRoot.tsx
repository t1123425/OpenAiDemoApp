'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './Navbar'
export default function ClientRoot({
    children,
  }: {
    children: React.ReactNode
  }){
    return (
        <>
        <CacheProvider>
            <ChakraProvider>
                <NavBar/>
                {children}
            </ChakraProvider>
        </CacheProvider>
        </>
    )
}