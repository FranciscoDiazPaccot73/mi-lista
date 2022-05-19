import { useEffect, useState } from 'react';
import { ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import Mobile from '../components/icons/Mobile';

import PageProvider from '../context/index';

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();
  const isLinkSelected = router.pathname === "/links";

  useEffect(() => {
    if (window.innerWidth > 820) setIsMobile(false);
  }, []);

  const handleTabChange = (index: number) => {
    const path = index === 0 ? '/' : '/links';
    router.push(path);
  }

  return (
    <ChakraProvider>
      {isMobile ? (
        <PageProvider>
          <Tabs defaultIndex={isLinkSelected ? 1 : 0} colorScheme="telegram" size="lg" isFitted onChange={a => handleTabChange(a)}>
            <TabList>
              <Tab isSelected={!isLinkSelected}>Compras</Tab>
              <Tab isSelected={isLinkSelected}>Links</Tab>
            </TabList>
          </Tabs>
          <Component {...pageProps} />
        </PageProvider>
      ) : (
        <div className='desktop'>
          <strong>Oops!</strong>
          <span>Por el momento, solo tenemos soporte para dispositivos mobiles</span>
          <Mobile />
        </div>
      )}
    </ChakraProvider>
  )
}

export default MyApp
