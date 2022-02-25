import React from 'react'
import { Link } from 'react-router-dom'
import { useTurn } from '../hooks/useTurn'
import { 
    Heading,
    SimpleGrid,
    Button
} from '@chakra-ui/react';
const Inicio = () => {
    const turn = useTurn()
    return (
        <div id='home' style={{opacity: '1', textAlign:'center'}}>
        <Heading size='4xl' margin='1.2em 0'>¡Bienvenido!</Heading>
        <SimpleGrid columns={2} spacing={10}>
            <Button as={Link} to="/employee" colorScheme='teal' size='lg' padding='3em'>
                FUNCIONARIO
            </Button>
            {turn.state && 
                <Button as={Link} to="/client/turn" colorScheme='blue' size='lg' padding='3em'>
                    CLIENTE
                </Button>
            }
            
            {!turn.state && 
                <Button as={Link} to="/client" colorScheme='blue' size='lg' padding='3em'>
                    CLIENTE
                </Button>
            }

        </SimpleGrid>
        </div>
    )
}

export default Inicio
