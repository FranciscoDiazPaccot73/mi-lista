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
  Button
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean,
  onClose: any,
  onSubmit: any,
  defaultValues?: any,
}

const ModalComponent = ({ isOpen, onClose, onSubmit, defaultValues = {} }: Props) => {
  const initialRef = useRef(null);
  const [form, setForm] = useState(defaultValues);

  const handleSubmit = () =>{
    let newForm = form;
    if (!form.text) newForm = { ...newForm, text: form.url };
    onSubmit(newForm);
    onClose();
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
