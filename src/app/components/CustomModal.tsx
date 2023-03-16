'use client'
import React from 'react'
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalHeader,} from '@chakra-ui/react';

interface Props {
    title?:string,
    value?:string | string[],
    onClose:()=> void,
    isOpen:boolean
}
const CustomModal = ({title,value,isOpen,onClose}:Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {title}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        value
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default CustomModal
