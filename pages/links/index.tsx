import type { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react';
import Head from 'next/head'
import classNames from 'classnames';

import { useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Actions from '../../components/Actions';
import LinkCard from '../../components/Card/Link';
import ModalComponent from '../../components/Modal';

import { PageContext } from '../../context';
import { disableBothLinks, setLinkStorageStatus } from '../../context/actions';
import { emitToast } from '../../utils';
import { LinkType } from '../../utils/types';

import styles from '../../styles/Home.module.scss'

const Links: NextPage = () => {
  const { dispatch, state: { linkItemsInStorage, shouldEnableBothLinks, shouldDisableBothLinks } }  = useContext(PageContext);
  const [minHeight, setHeight] = useState('100vh');
  const [links, setLinks] = useState<Array<LinkType>>([]);
  const [storageLinks, setStorage] = useState<Array<LinkType>>([]);
  const [adding, setAdding] = useState(false);
  const [defaultModalValues, setModalValues] = useState<any>(null);
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const footerClasses = classNames(styles.footer, colorMode === 'dark' && styles.footer_light)

  useEffect(() => {
    setHeight(`${window.innerHeight - 53}px`)
    const items = window.localStorage.getItem('links');

    if (items) {
      setLinkStorageStatus(dispatch, true);
      setLinks(JSON.parse(items || 'null'));
      setStorage(JSON.parse(items || 'null'));
    } else {
      disableBothLinks(dispatch, true);
    }
  }, []);

 const handleSaveInStorage = () => {
    const itemsString = JSON.stringify(links)
    window.localStorage.setItem('links', itemsString)
    setStorage(links);
    setLinkStorageStatus(dispatch, true)
    emitToast({ toast });
  }

  const handleAddLink = (newLink: LinkType) => {
    const newLinks = links;
    if (newLink.id) {
      const index = newLinks.findIndex(obj => obj.id === newLink.id);
      newLinks[index].text = newLink.text;
      newLinks[index].url = newLink.url;
    } else {
      const id = links.length ? links.length + 1 : 1;
      newLinks.push({...newLink, id});
    }

    setLinks(newLinks)
    if (linkItemsInStorage) setLinkStorageStatus(dispatch, false, true);
    disableBothLinks(dispatch, false);
  }

  const handleRemoveItem = (linkToRemove: LinkType) => {
    const newLinks = links.filter(link => link.id !== linkToRemove.id);
    setLinks(newLinks)
    setLinkStorageStatus(dispatch, !!newLinks.length)

    const isOnStorage = storageLinks.some(l => l.id === linkToRemove.id);
    if (isOnStorage)  {
      const itemsString = JSON.stringify(newLinks)
      window.localStorage.setItem('links', itemsString)
    }

    if (!newLinks.length) disableBothLinks(dispatch, true);
  }

  const handleEditItem = (linkToEdit: LinkType) => {
    setModalValues(linkToEdit)
    setAdding(true)
  }

  return (
    <div className={styles.container} style={{ minHeight }}>
      <Head>
        <title>Mis Links</title>
        <meta name="description" content="Lista de links" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          Mis Links
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
        {links ? (
          links.map((link: LinkType, index: number) => {
            const isOnStorage = storageLinks.some(l => l.id === link.id);

            return (
              <LinkCard
                onRemove={handleRemoveItem}
                onEdit={handleEditItem}
                key={`${link.url}-${index}`}
                link={link}
                isOnStorage={isOnStorage}
              />
            )
          })
        ) : null}
        {adding && <ModalComponent defaultValues={defaultModalValues} onSubmit={handleAddLink} isOpen={adding} onClose={() => setAdding(false)} />}
        <Actions
          label="Agregar link"
          handleAddSection={() => setAdding(true)}
          addingSections={false}
          hideRemove
          handleSaveInStorage={handleSaveInStorage}
          shouldEnableBoth={shouldEnableBothLinks}
          itemsInStorage={linkItemsInStorage}
          shouldDisableBoth={shouldDisableBothLinks}
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

export default Links;
