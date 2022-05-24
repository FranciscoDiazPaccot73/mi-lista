import type { NextPage } from 'next'
import { useEffect, useState, useContext, useRef } from 'react';
import Head from 'next/head'

import { useColorMode, IconButton, useToast } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import Actions from '../../components/Actions';
import LinkCard from '../../components/Card/Link';
import ModalComponent from '../../components/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import Filter from '../../components/Filter';
import Footer from '../../components/Footer';

import { PageContext } from '../../context';
import { disableBothLinks, setLinkStorageStatus, setCategories } from '../../context/actions';
import { emitToast, filterItems } from '../../utils';
import { LinkType, FormatedLinkType } from '../../utils/types';

import styles from '../../styles/Home.module.scss'

const Links: NextPage = () => {
  const { dispatch, state: { categories = [], linkItemsInStorage, shouldEnableBothLinks, shouldDisableBothLinks } }  = useContext(PageContext);
  const [minHeight, setHeight] = useState('100vh');
  const [links, setLinks] = useState<Array<LinkType>>([]);
  const [formatedLinks, setFormatedLinks] = useState<Array<FormatedLinkType>>([]);
  const [storageLinks, setStorage] = useState<Array<LinkType>>([]);
  const [adding, setAdding] = useState(false);
  const [confirmModal, setConfirmModal] = useState<any>({ isOpen: false, link: { id: null} });
  const [defaultModalValues, setModalValues] = useState<any>(null);
  const [filterValue, setFilter] = useState<string | undefined>(undefined)
  const isOnStorage = useRef(false);
  const linksToRecalculate = useRef<any>(null);
  const initialCategories = useRef<Array<String> | null>(null);
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    setHeight(`${window.innerHeight - 53}px`)
    const items = window.localStorage.getItem('links');
    const storageCategories = window.localStorage.getItem('categories');

    if (items) {
      setLinkStorageStatus(dispatch, true);
      initialCategories.current = JSON.parse(storageCategories || 'null')
      if (JSON.parse(storageCategories || 'null')) setCategories(dispatch, JSON.parse(storageCategories || 'null'));
      setLinks(JSON.parse(items || 'null'));
      linksToRecalculate.current = JSON.parse(items || 'null');
      setStorage(JSON.parse(items || 'null'));
    } else {
      disableBothLinks(dispatch, true);
    }
  }, []);

  useEffect(() => {
    if (linksToRecalculate.current) {
      let currentLinks = linksToRecalculate.current;
      const categoriesToIterate = categories.length ? categories : (initialCategories.current ?? []);
      const formated = categoriesToIterate.map((c: string) => {
        const l = currentLinks.filter((lk: LinkType) => lk.category === c);
        if (!l.length) return null;

        currentLinks = currentLinks.filter((lk: LinkType) => !lk.category || lk.category !== c);
        return {
          category: c,
          links: l,
        };
      });

      
      const formatedFiltered = formated.filter((form: any) => form !== null);
      if (formatedFiltered.length) {
        setFormatedLinks([...formatedFiltered, ...currentLinks]);
      } else {
        setFormatedLinks([...currentLinks]);
      }
      linksToRecalculate.current = null;
    }
  }, [linksToRecalculate.current, initialCategories])

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
      newLinks[index].category = newLink.category;
    } else {
      const id = links.length ? links.length + 1 : 1;
      newLinks.push({...newLink, id});
    }

    setLinks(newLinks)
    linksToRecalculate.current = newLinks;
    if (linkItemsInStorage) setLinkStorageStatus(dispatch, false, true);
    disableBothLinks(dispatch, false);
  }

  const handleEditCategoryName = (value: string, prevValue: string) => {
    const linksToUpdate = links.filter(l => l.category === prevValue);
    linksToUpdate.forEach(l => {
      const newLink = { ...l, category: value };
      handleAddLink(newLink)
    })
  }

  const handleRemoveItem = (link: any) => {
    const linkToRemove = link.id ? link : confirmModal.link;
    const newLinks = links.filter(link => link.id !== linkToRemove.id);
    setLinks(newLinks)
    linksToRecalculate.current = newLinks;
    setLinkStorageStatus(dispatch, !!newLinks.length)

    if (isOnStorage.current)  {
      const itemsString = JSON.stringify(newLinks)
      window.localStorage.setItem('links', itemsString)
    }

    if (!newLinks.length) disableBothLinks(dispatch, true);
    setConfirmModal({ isOpen: false, link: {} })
  }

  const handleEditItem = (linkToEdit: LinkType) => {
    setModalValues(linkToEdit)
    setAdding(true)
  }

  const handleModalState = async (linkToRemove = { id: null }) => {
    const link = linkToRemove.id ? linkToRemove : null;
    const onStorage = storageLinks.some(l => l.id === linkToRemove.id);
    isOnStorage.current = onStorage;

    if (onStorage) {
      setConfirmModal({ isOpen: true, link })
    } else {
      setConfirmModal({ isOpen: false, link })
      handleRemoveItem(link);
    }
  }

  const handleAddCategory = (category: string, prevCategory: string | null) => {
    let newCategories = [...categories];
    if (prevCategory) {
      newCategories = categories.filter((cat: string) => cat !== prevCategory);
    }

    newCategories = [...newCategories, category];
    const categoriesString = JSON.stringify(newCategories)
    window.localStorage.setItem('categories', categoriesString)
    setCategories(dispatch, newCategories);
  }

  const handleCloseEditModal = () => {
    setModalValues(null)
    setAdding(false)
  }

  const handleFilter = (value: string, reset?: boolean | undefined) => {
    const newLinks = filterItems(value, links, reset);

    linksToRecalculate.current = newLinks;
    const filter = reset ? '' : value;
    setFilter(filter);
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
        <Filter
          className={styles.title__search}
          formatedLinks={formatedLinks}
          handleFilter={handleFilter}
          filterValue={filterValue}
        />
        {formatedLinks ? (
          formatedLinks.map((link: LinkType | FormatedLinkType, index: number) => {
            return (
              <LinkCard
                onRemove={handleModalState}
                onEdit={handleEditItem}
                key={`link-${index}`}
                link={link}
                storageLinks={storageLinks}
                onEditCategory={handleEditCategoryName}
              />
            )
          })
        ) : null}
        {adding &&
          <ModalComponent
            defaultValues={defaultModalValues}
            onSubmit={handleAddLink}
            isOpen={adding}
            onClose={handleCloseEditModal}
            onAddCategory={handleAddCategory}
            categories={categories}
          />
        }
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
      <ConfirmModal
        label="Si confirmas perderas la informacion de este link"
        onConfirm={handleRemoveItem}
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, link: {} })}
      />
      <Footer colorMode={colorMode} />
    </div>
  )
}

export default Links;
