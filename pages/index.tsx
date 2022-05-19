import type { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import classNames from 'classnames';

import { useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Actions from '../components/Actions';
import Sections from '../components/Sections';

import { PageContext } from '../context';
import { setHeaderAction, setItemsAction, shouldCleanList, setStorageStatus, disableBoth } from '../context/actions';
import { emitToast } from '../utils';

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [minHeight, setHeight] = useState('100vh');
  const [sections, setSections] = useState<any>([]);
  const [addingSections, setAdding] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const { dispatch, state: { shouldEnableBoth, contextItems = {}, contextHeaders, shouldDisableBoth, itemsInStorage }}  = useContext(PageContext);
  const footerClasses = classNames(styles.footer, colorMode === 'dark' && styles.footer_light)
  
  useEffect(() => {
    setHeight(`${window.innerHeight - 53}px`)
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
    } else {
      disableBoth(dispatch, true);
    }
  }, []);

  useEffect(() => {
    if (shouldEnableBoth) {
      emitToast({ toast, type: 'warning' })
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
    const removedHeader = contextHeaders[parseInt(id, 10) -1] ?? '';
    const newHeaders = contextHeaders.filter((header: string) => header !== removedHeader)
    const newItems = contextItems;
    delete newItems[removedHeader];
    setHeaderAction(dispatch, newSections);
    setSections(newSections);
    setHeaderAction(dispatch, newHeaders);
    setItemsAction(dispatch, newItems);
    if (!Object.keys(newItems).length) disableBoth(dispatch, true);
  }

  const handleSaveInStorage = () => {
    window.localStorage.setItem('sections', sections.length);
    const itemsString = JSON.stringify(contextItems)
    const headersString = JSON.stringify(contextHeaders)
    window.localStorage.setItem('items', itemsString)
    window.localStorage.setItem('headers', headersString)
    setStorageStatus(dispatch, true)
    emitToast({ toast });
  }
  
  const handleClearStorage = () => {
    window.localStorage.removeItem('sections');
    window.localStorage.removeItem('items');
    window.localStorage.removeItem('headers');
    setStorageStatus(dispatch, false)
    setItemsAction(dispatch, [])
    setHeaderAction(dispatch, [])
    shouldCleanList(dispatch, true);
    emitToast({ toast, type: 'info' })
    disableBoth(dispatch, true);
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
          label="Agregar seccion"
          handleAddSection={handleAddSection}
          addingSections={addingSections}
          handleClearStorage={handleClearStorage}
          handleSaveInStorage={handleSaveInStorage}
          shouldEnableBoth={shouldEnableBoth}
          itemsInStorage={itemsInStorage}
          shouldDisableBoth={shouldDisableBoth}
        />
      </main>
      <footer className={footerClasses}>
        <div className={styles.dev}>
          Powered by <a href='https://franciscodiazpaccot.dev' target="_blank" rel="noreferrer noopener">
          Francisco Diaz Paccot</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
