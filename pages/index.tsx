import type { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import classNames from 'classnames';

import { useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Actions from '../components/Actions';
import Sections from '../components/Sections';

import { PageContext } from '../context';
import { setHeaderAction, setItemsAction, shouldCleanList, setStorageStatus } from '../context/actions';

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [minHeight, setHeight] = useState('100vh');
  const [sections, setSections] = useState<any>([]);
  const [addingSections, setAdding] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { dispatch, state: { shouldEnableBoth, contextItems = {}, contextHeaders }}  = useContext(PageContext);
  const footerClasses = classNames(styles.footer, colorMode === 'dark' && styles.footer_light)
  
  useEffect(() => {
    setHeight(`${window.innerHeight}px`)
    const sections = window.localStorage.getItem('sections');
    const items = window.localStorage.getItem('items');
    const headers = window.localStorage.getItem('headers');

    if (sections && items && headers) {
      setStorageStatus(dispatch, true);
      const headerParsed = JSON.parse(headers || 'null');
      setItemsAction(dispatch, JSON.parse(items || 'null'));
      setHeaderAction(dispatch, headerParsed)
      const newSections = headerParsed || [];
      const arraySections = Array.from({length: newSections.length}, (_, i) => i + 1)
      setSections(arraySections);
    }
  }, []);

  useEffect(() => {
    if (shouldEnableBoth) {
      toast({
        title: `Cuidado!`,
        status: 'warning',
        description: "La lista que tenes guardada no esta actualizada",
        isClosable: true,
        duration: 4000,
      })
    }
  }, [shouldEnableBoth])

  const handleAddSection = () => {
    const newSections = sections;
    const newValue = sections.length ? sections[sections.length - 1] + 1 : 1;
    newSections.push(newValue);
    setSections(newSections);
    setAdding(true);
  }

  const handleRemoveSection = (id: string) => {
    const newSections = sections.filter((section: string) => section !== id);
    setHeaderAction(dispatch, newSections);
    setSections(newSections);
  }

  const handleSaveInStorage = () => {
    window.localStorage.setItem('sections', sections.length);
    const itemsString = JSON.stringify(contextItems)
    const headersString = JSON.stringify(contextHeaders)
    window.localStorage.setItem('items', itemsString)
    window.localStorage.setItem('headers', headersString)
    setStorageStatus(dispatch, true)
    toast({
      title: `OK!`,
      status: 'success',
      description: "Se guardo tu lista correctamente",
      isClosable: true,
      duration: 4000,
    })
  }
  
  const handleClearStorage = () => {
    window.localStorage.removeItem('sections');
    window.localStorage.removeItem('items');
    window.localStorage.removeItem('headers');
    setStorageStatus(dispatch, false)
    setItemsAction(dispatch, [])
    setHeaderAction(dispatch, [])
    shouldCleanList(dispatch, true);
    toast({
      title: `Listo!`,
      status: 'info',
      description: "Se elimino tu lista correctamente",
      isClosable: true,
      duration: 4000,
    })
  }

  return (
    <div className={styles.container} style={{ minHeight }}>
      <Head>
        <title>Mi Lista</title>
        <meta name="description" content="Lista de compras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          Mi Lista
          <span>
            <IconButton
              colorScheme='linkedin'
              aria-label='Borrar'
              variant="outline"
              size='xs'
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
            />
          </span>
        </div>
        {sections ?
          <Sections sections={sections} handleRemoveSection={handleRemoveSection} setAdding={setAdding} /> : null
        }
        <Actions
          handleAddSection={handleAddSection}
          addingSections={addingSections}
          handleClearStorage={handleClearStorage}
          handleSaveInStorage={handleSaveInStorage}
        />
      </main>
      <footer className={footerClasses}>
        <div className={styles.dev}>
          Powered by <a href='https://franciscodiazpaccot.com' target="_blank" rel="noreferrer noopener">
          Francisco Diaz Paccot</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
