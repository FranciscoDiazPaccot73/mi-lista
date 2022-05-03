import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Card from '../components/Card';

import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const [minHeight, setHeight] = useState('100vh');
  const [sections, setSections] = useState<any>([]);
  const [addingSections, setAdding] = useState(false);
  
  useEffect(() => {
    setHeight(`${window.innerHeight}px`)
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
    setSections(newSections);
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
        </div>
        {sections && sections.map((section: string) => (
          <Card
            key={`section-${section}`}
            id={section}
            onSectionAdded={() => setAdding(false)}
            removeSection={handleRemoveSection}
          />
        ))}
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
