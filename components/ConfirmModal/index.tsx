import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean,
  onClose: any,
  onConfirm: any,
  label: string,
}

const ConfirmModal = ({ isOpen, onClose, label, onConfirm }: Props) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{label}</ModalHeader>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onConfirm}>
            Confirmar
          </Button>
          <Button onClick={onClose} variant='ghost'>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal;
