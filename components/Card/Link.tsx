import React, { useState } from 'react';
import classNames from 'classnames';

import {
  useColorMode,
  Editable,
  EditablePreview,
  EditableInput
} from '@chakra-ui/react'
import LinkItem from './LinkItem';

import { LinkType } from '../../utils/types';

import styles from './styles.module.scss';

interface LinkCardInterface {
  link?: any,
  onRemove: any,
  onEdit: any,
  onEditCategory?: any,
  storageLinks: Array<LinkType>,
}

const LinkCard = ({ link, onRemove, onEdit, storageLinks, onEditCategory }: LinkCardInterface) => {
  const [isEditing, setEditing] = useState<Boolean>(false);
  const { colorMode } = useColorMode()
  const cardClasses = classNames(styles.card, styles.card_links, colorMode === 'light' && styles.card_light)

  const handleEditCategory = (value: string) => {
    setEditing(false)
    onEditCategory(value, link.category)
  }

  return (
    <div className={cardClasses}>
      {link?.category && link?.links?.length ? (
        <div className={styles.categories}>
          <div key={link.category} className={styles.categories__row}>
            {isEditing ? (
              <Editable
                onSubmit={handleEditCategory}
                submitOnBlur
                startWithEditView
                defaultValue={link.category}
                style={{ marginBottom: "12px" }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            ) : <p onClick={() => setEditing(true)}>{link.category}</p>}
            {link.links.map((l: any) => (
              <div key={l.id} className={styles.categories__item}>
                <LinkItem
                  link={l}
                  storageLinks={storageLinks}
                  onRemove={onRemove}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LinkItem
          link={link}
          storageLinks={storageLinks}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      )}
    </div>
  )
}

export default LinkCard;
