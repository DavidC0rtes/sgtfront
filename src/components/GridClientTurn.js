import { useState } from 'react'
import { useTurn } from '../hooks/useTurn'
import useInterval from '../hooks/useInterval'
import turnService from '../services/turn'
import cajaService from '../services/caja'
import { useNavigate } from "react-router-dom";
import {
    Text,
    Grid,
    GridItem,
    Box,
    Image,
    Button,
    Spinner
} from '@chakra-ui/react'

const GridClientTurn = () => {
    const turn = useTurn()
    const [state, setState] = useState({turno:'', caja:''})
    const [showSpinner, setSpinner] = useState(true)
    const navigate = useNavigate()

    useInterval(async() => {
        const turns = await turnService.getTurn({tipo: turn.state.tipo})
        const caja = await cajaService.get({tipo: turn.state.tipo})

        const newState = {
            turno: turns.shift(),
            caja: caja.length ? caja[0].numero_caja : 'N/D'
        }
        setState(newState)
	setSpinner(false)
    }, 3000)
    
    const cancelTurn = () => {
	turn.exit()
	setState({turno:'', caja:''})
	navigate("/")
    }

    return (
        <Grid 
            h='100%'
            w='70%'
            mt='-3em'
            templateColumns='repeat(12,1fr)'
            templateRows='repeat(3,1fr)'
            gap={4}
        >
            <GridItem rowSpan={3} colSpan={4} mt='1em'>
                <Image maxH="80%" src='https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' h='90%' borderRadius="md" alt='Pago sin contacto' />
            </GridItem>
            <GridItem rowSpan={2} colSpan={5}>
                <Text fontSize='lg' textAlign='center'>Turno actual</Text>
                <Box bg='gray.50' h='100%' borderRadius='md' border='1px solid black' lineHeight='350px' maxH='50vh' maxW='30vw'>
		    {showSpinner && <Spinner size='xl' />}
		    {!showSpinner && <Text fontSize='8vw' align='center' >{`${state.turno.tipo}${state.turno.codigo}`}</Text>}
                </Box>
            </GridItem>

            <GridItem rowSpan={1} colSpan={2}>
                <Text fontSize='lg' textAlign='center'>Tu turno</Text>
                <Box bg='teal.200' h='100%' borderRadius='md' border='1px solid gray'>
		    {showSpinner && <Spinner size='xl'/>}
		    {!showSpinner && <Text fontSize='6xl' align='center' >{`${turn.state.tipo}${turn.state.codigo}`}</Text>}
                </Box>
            </GridItem>
                
            <GridItem rowSpan={1} colSpan={2} mt='1em'>
                <Text fontSize='md' textAlign='center'>Caja</Text>
                <Box bg='teal.200' h='100%' borderRadius='md' border='1px solid gray'>
		    {showSpinner && <Spinner size='xl'/>}
		    {!showSpinner && <Text fontSize='6xl' align='center' >{state.caja}</Text>}
                </Box>
            </GridItem>

	    <GridItem colSpan={5} mt='5px'>
		<Button w='100%' colorScheme='gray' onClick={cancelTurn}>
		    Cancelar turno
		</Button>
	    </GridItem>

        </Grid>
    )
}

export default GridClientTurn
