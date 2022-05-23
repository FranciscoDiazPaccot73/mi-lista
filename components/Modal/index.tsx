import React, { useRef, useState } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean,
  onClose: any,
  onSubmit: any,
  defaultValues?: any,
  categories?: Array<string>
  onAddCategory?: any,
}

const ModalComponent = ({ isOpen, onClose, onSubmit, defaultValues = {}, categories, onAddCategory }: Props) => {
  const initialRef = useRef(null);
  const [form, setForm] = useState(defaultValues);
  const [addingCategory, setAdding] = useState(false);

  const handleSubmit = () =>{
    let newForm = form;
    if (!form.text) newForm = { ...newForm, text: form.url };
    onSubmit(newForm);
    onClose();
  }

  const handleAddCategory = (value: string) => {
    if (value && value !== '' && value !== ' ') {
      onAddCategory(value, form?.category);
      setForm({ ...form, category: value })
    }
    setAdding(false);
  }

  const handleChangeCategory = (value: string) => {
    setForm({ ...form, category: value })
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Texto</FormLabel>
            <Input
              onChange={e => setForm({...form, text: e.target.value})}
              ref={initialRef}
              placeholder='Texto'
              value={form?.text || ''}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>URL</FormLabel>
            <Input
              placeholder='https://ejemplo.com'
              onChange={e => setForm({...form, url: e.target.value})}
              value={form?.url || ''}
            />
          </FormControl>
          <FormControl mt={8}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {addingCategory ? (
                <Editable
                  onSubmit={handleAddCategory}
                  submitOnBlur
                  startWithEditView
                  mr={4}
                  style={{ width: "100%" }}
                  defaultValue={form?.category || ''}
                  onCancel={() => setAdding(false)}
                >
                  <EditablePreview />
                  <EditableInput style={{ height: "40px" }} />
                </Editable>
              ) : (
                <Select placeholder='Agregar a una categoria' mr={4} onChange={va => handleChangeCategory(va.target.value)}>
                  {categories && categories.map(category => <option selected={category === form?.category} key={category} value={category}>{category}</option>)}
                </Select>
              )}
              <Button variant="ghost" disabled={addingCategory} size="sm" onClick={() => setAdding(true)}>Nueva</Button>
            </div>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button disabled={!form?.url || form?.url === ''} colorScheme='blue' mr={3} onClick={handleSubmit}>
            Guardar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalComponent;
