'use client'
// export const metadata = {
//   title: 'OpenAiDemoApp',
//   description: 'This is make for fun & practice! enjoy!',
// }
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import NavBar from './components/Navbar'
import InfoFooter from './components/InfoFooter'
// import Head from 'next/head'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
      <CacheProvider>
        <ChakraProvider>
          <NavBar />
          {children}
          <InfoFooter />
        </ChakraProvider>
      </CacheProvider>
      </body>
    </html>
  )
}
