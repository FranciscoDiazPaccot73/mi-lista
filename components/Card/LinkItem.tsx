import React from "react";

import {
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon, StarIcon, EditIcon } from '@chakra-ui/icons'

import styles from './styles.module.scss';

const LinkItem = ({ storageLinks, link, onEdit, onRemove }: any) => {
  const isOnStorage = storageLinks.some((l: any) => link?.id && l.id === link.id);

  return (
    <>
      {isOnStorage && (
        <div className={styles.card_links__status}>
          <StarIcon color="orange" />
        </div>
      )}
      <a href={link?.url} target="_blank" rel="noreferrer noopener">{link?.text}</a>
      <span className={styles.card_links__actions}>
        <IconButton
          colorScheme='yellow'
          aria-label='Editar'
          variant="outline"
          size='xs'
          icon={<EditIcon />}
          onClick={() => onEdit(link)}
        />
        <IconButton
          colorScheme='red'
          aria-label='Borrar'
          variant="outline"
          size='xs'
          icon={<DeleteIcon />}
          onClick={() => onRemove(link)}
        />
      </span>
    </>
  )
}

export default LinkItem;
