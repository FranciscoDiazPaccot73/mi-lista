import React, { Fragment, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';

import {
  Divider,
  IconButton,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  useColorMode,
} from '@chakra-ui/react'
import { CheckIcon, DeleteIcon, AddIcon, WarningTwoIcon, StarIcon } from '@chakra-ui/icons'

import { PageContext } from '../../context';
import { setHeaderAction, setItemsAction, shouldCleanList, setStorageStatus } from '../../context/actions';

import styles from './styles.module.scss';

interface Props {
  id: string,
  onSectionAdded: Function,
  removeSection: Function,
  items: Array<string>,
  head: string,
}

const Card = ({ id, onSectionAdded, removeSection, head, items: i }: Props) => {
  const [header, setHeader] = useState<any>(null);
  const [items, setItems] = useState<any>([]);
  const [addingItems, setAdding] = useState(false);
  const [buyedItems, setBuyed] = useState<any>([]);
  const { colorMode } = useColorMode()
  const { dispatch, state: { shouldEnableBoth, itemsInStorage, contextHeaders, contextItems = {}, shouldClean } } = useContext(PageContext);

  const cardClasses = classNames(styles.card, colorMode === 'light' && styles.card_light)

  useEffect(() => {
    if (!header) document.getElementById(`card-${id}`)?.focus();

    if (i) setItems(i);
    if (head) setHeader(head);
  }, [i, head]);

  useEffect(() => {
    if (shouldClean) {
      setItems([])
      setHeader([])
      shouldCleanList(dispatch, false)
    }
  }, [shouldClean])

  const handleSectionChange = (value: string) => {
    setHeader(value);
    const newValues = contextHeaders ? [...contextHeaders, value] : [value];
    setHeaderAction(dispatch, newValues);
    onSectionAdded();
  }

  const handleAddItems = (item: string) => {
    const newItems = [...items, item];
    const newContextItems = contextItems;
    newContextItems[header] = newItems;
    setItems(newItems);
    setItemsAction(dispatch, newContextItems);
    setAdding(false)
    if (itemsInStorage) setStorageStatus(dispatch, false, true);
  }

  const removeItem = (item: string) => {
    const newItems = items.filter((currentItem: string) => currentItem !== item);
    const newContextItems = contextItems;
    newContextItems[header] = newItems;
    setItems(newItems);
    setItemsAction(dispatch, newContextItems);
  }

  const handleOnCart = (item: string) => {
    if (buyedItems.some((cartItem: string) => cartItem === item)) return;

    setBuyed([...buyedItems, item]);
  }

  const removeFromCart = (item: string) => {
    setBuyed(buyedItems.filter((cart: string) => cart !== item));
  }

  const sortItems = () => {
    const newItems = [...new Set([...buyedItems, ...items])]
    setItems(newItems);
  }

  const HeaderIcon = () => {
    if (shouldEnableBoth) return <WarningTwoIcon color="orange" />;
    if (itemsInStorage) return <StarIcon color="orange" />;

    return null;
  }

  return (
  <div className={cardClasses}>
    <div className={styles.card__header}>
      {head ? (
        <div style={{ position: "relative" }}>
          <span style={{ marginRight: "12px" }}>{head}</span>
          <HeaderIcon />
          <div style={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton
              colorScheme='red'
              aria-label='Borrar'
              variant="outline"
              size='xs'
              icon={<DeleteIcon />}
              onClick={() => removeSection(id)}
            />
            {items && items.length ? <span style={{ marginLeft: "32px" }}><Button onClick={sortItems} size="xs" variant="outline">Ordenar</Button></span> : null}
          </div>
        </div>
      ) : (
        <Editable
          onSubmit={handleSectionChange}
          submitOnBlur
          startWithEditView
          defaultValue='Seccion'
        >
          <EditablePreview />
          <EditableInput id={`card-${id}`} />
        </Editable>
      )}
    </div>
    { items && (
      <div>
        {items && items.map((item: string, index: any) => {
          const itemOnCart = buyedItems.some((cartItem: string) => cartItem === item);
          const itemClasses = classNames(
            styles.card__content,
            itemOnCart && styles.card__content_cart,
            itemOnCart && colorMode === "light" && styles.card__content_cart_light
          )

          return (
            <div key={`item-${item}-${index}`} className={itemClasses}>
              <div className={styles.card__item}>
                <span>{item}</span>
                <div className={styles.card__item_actions}>
                  {itemOnCart ? (
                    <Button onClick={() => removeFromCart(item)} variant="ghost" size="xs" colorScheme="linkedin">Quitar</Button>
                  ) : (
                    <Fragment>
                      <IconButton
                        colorScheme='red'
                        aria-label='Borrar'
                        variant="ghost"
                        size='xs'
                        icon={<DeleteIcon />}
                        onClick={() => removeItem(item)}
                      />
                      <IconButton
                        colorScheme='teal'
                        aria-label='Confirmar'
                        size='xs'
                        variant="ghost"
                        icon={<CheckIcon />}
                        onClick={() => handleOnCart(item)}
                      />
                    </Fragment>
                  )}
                </div>
              </div>
              <Divider />
            </div>
          )
        })}
        {addingItems && (
          <div className={styles.card__content}>
            <Editable
              onSubmit={handleAddItems}
              submitOnBlur
              startWithEditView
              defaultValue='Producto'
            >
              <EditablePreview />
              <EditableInput id={`item-${id}`} />
            </Editable>
          </div>
        )}
      </div>
    )}
    <div className={styles.actions}>
      <Button
        colorScheme="blue"
        size="xs"
        variant="ghost"
        leftIcon={<AddIcon />}
        disabled={addingItems}
        onClick={() => setAdding(true)}
      >
        Agregar producto
      </Button>
    </div>
  </div>
)}

export default Card;
