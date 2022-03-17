import { useState, useEffect } from 'react'
import sedeService from '../services/sedes'
import SedeForm from './forms/SedeForm'
import {
     Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

const ModalSede = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ state, setData ] = useState([1,2,3])

    useEffect(() => {
      async function fetchMyAPI() {
        const response = await sedeService.getAll();
	setData(response)
      }
	fetchMyAPI()
    }, [])

    return(
	<>
	    <Button size='sm' onClick={onOpen}>Selecciona tu sede</Button>
	    
	    <Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay/>
		<ModalContent>
		    <ModalHeader>¿Dónde te encuentras?</ModalHeader>
          	    <ModalCloseButton />
          	    <ModalBody>
          	      <SedeForm sedes={state}/>
          	    </ModalBody>

          	    <ModalFooter>
          	      <Button colorScheme='blue' mr={3} onClick={onClose}>
          	        Listo
          	      </Button>
          	      <Button variant='ghost' onClick={onClose}>Cerrar</Button>
		    </ModalFooter>
		</ModalContent>
	    </Modal>
	</>
    )
}

export default ModalSede
