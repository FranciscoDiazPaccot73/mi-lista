import React, { useContext } from 'react';

import { Button, IconButton } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, StarIcon } from '@chakra-ui/icons'

import { PageContext } from '../../context';

import styles from '../../styles/Home.module.scss';

interface Props {
  handleAddSection: any,
  addingSections: boolean,
  handleClearStorage?: any,
  handleSaveInStorage: any,
  label: string,
  shouldEnableBoth?: boolean,
  itemsInStorage?: boolean,
  shouldDisableBoth?: boolean,
  hideRemove?: boolean
}

const Actions = ({
  label,
  handleAddSection,
  addingSections,
  handleClearStorage,
  handleSaveInStorage,
  shouldEnableBoth,
  itemsInStorage,
  shouldDisableBoth,
  hideRemove,
}: Props) => {

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
        {label}
      </Button>
      <div className={styles.actions}>
        {!hideRemove && (
          <IconButton
            colorScheme='red'
            aria-label='Eliminar Listas'
            size='lg'
            icon={<DeleteIcon />}
            onClick={handleClearStorage}
            disabled={shouldDisableBoth || (!itemsInStorage && !shouldEnableBoth)}
          />
        )}
        <IconButton
          colorScheme='teal'
          aria-label='Guardar Listas'
          size='lg'
          icon={<StarIcon />}
          onClick={handleSaveInStorage}
          disabled={shouldDisableBoth || (itemsInStorage && !shouldEnableBoth)}
        />
      </div>
    </>
  )
}

export default Actions;
