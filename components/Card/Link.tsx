import React from 'react';
import classNames from 'classnames';

import {
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { DeleteIcon, StarIcon, EditIcon } from '@chakra-ui/icons'

import { LinkType } from '../../utils/types';

import styles from './styles.module.scss';

interface LinkCardInterface {
  link?: LinkType,
  onRemove: any,
  onEdit: any,
  isOnStorage: boolean,
}

const LinkCard = ({ link, onRemove, onEdit, isOnStorage }: LinkCardInterface) => {
  const { colorMode } = useColorMode()
  const cardClasses = classNames(styles.card, styles.card_links, colorMode === 'light' && styles.card_light)

  return (
  <div className={cardClasses}>
    {isOnStorage && (
      <div className={styles.card_links__status}>
        <StarIcon color="orange" />
      </div>
    )}
    <a href={link?.url} target="_blank">{link?.text}</a>
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
  </div>
)}

export default LinkCard;
