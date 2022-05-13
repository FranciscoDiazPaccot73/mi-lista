import React, { useContext } from 'react';

import { Button, IconButton } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons'

import { PageContext } from '../../context';

import styles from '../../styles/Home.module.scss';

interface Props {
  handleAddSection: any,
  addingSections: boolean,
  handleClearStorage: any,
  handleSaveInStorage: any,
}

const Actions = ({ handleAddSection, addingSections, handleClearStorage, handleSaveInStorage }: Props) => {
  const { state: { shouldEnableBoth, itemsInStorage }}  = useContext(PageContext);

  return (
    <>
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
          disabled={!itemsInStorage && !shouldEnableBoth}
          />
        <IconButton
          colorScheme='teal'
          aria-label='Guardar Listas'
          size='lg'
          icon={<StarIcon />}
          onClick={handleSaveInStorage}
          disabled={itemsInStorage && !shouldEnableBoth}
        />
      </div>
    </>
  )
}

export default Actions;
