import type { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { Button, useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { AddIcon, MoonIcon, SunIcon, DeleteIcon, ExternalLinkIcon, StarIcon } from '@chakra-ui/icons'
import Card from '../components/Card';

import { PageContext } from '../context';
import { setHeaderAction, setItemsAction, shouldCleanList } from '../context/actions';

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [minHeight, setHeight] = useState('100vh');
  const [sections, setSections] = useState<any>([]);
  const [addingSections, setAdding] = useState(false);
  const [itemsInStorage, setStorageStatus] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { dispatch, state: { contextItems = {}, contextHeaders }}  = useContext(PageContext);
  
  useEffect(() => {
    setHeight(`${window.innerHeight}px`)
    const sections = window.localStorage.getItem('sections');
    const items = window.localStorage.getItem('items');
    const headers = window.localStorage.getItem('headers');

    if (sections && items && headers) {
      setStorageStatus(true);
      const headerParsed = JSON.parse(headers || 'null');
      setItemsAction(dispatch, JSON.parse(items || 'null'));
      setHeaderAction(dispatch, headerParsed)
      const newSections = headerParsed || [];
      const arraySections = Array.from({length: newSections.length}, (_, i) => i + 1)
      setSections(arraySections);
    }
  }, []);

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
    setStorageStatus(true)
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
    setStorageStatus(false)
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
        {sections && sections.map((section: string) => {
          const headKey = contextHeaders ? contextHeaders[parseInt(section)-1] : '';

          return (
            <Card
              key={`section-${section}`}
              id={section}
              onSectionAdded={() => setAdding(false)}
              removeSection={handleRemoveSection}
              head={headKey}
              items={contextItems[headKey]}
            />
          )
        })}
        <Button
          onClick={handleAddSection}
          leftIcon={<AddIcon />}
          isFullWidth
          variant="outline"
          colorScheme="grayAlpha"
          disabled={addingSections}
          size="xs"
        >
          Agregar Seccion
        </Button>
        <div className={styles.actions}>
          <IconButton
            colorScheme='red'
            aria-label='Eliminar Listas'
            size='lg'
            icon={<DeleteIcon />}
            onClick={handleClearStorage}
            disabled={!itemsInStorage}
            />
          <IconButton
            colorScheme='teal'
            aria-label='Guardar Listas'
            size='lg'
            icon={<StarIcon />}
            onClick={handleSaveInStorage}
            disabled={itemsInStorage}
          />
          <IconButton
            colorScheme='yellow'
            aria-label='Compartir'
            size='lg'
            icon={<ExternalLinkIcon />}
            onClick={toggleColorMode}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
