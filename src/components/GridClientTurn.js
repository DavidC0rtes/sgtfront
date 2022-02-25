import { useState } from 'react'
import { useTurn } from '../hooks/useTurn'
import useInterval from '../hooks/useInterval'
import turnService from '../services/turn'
import cajaService from '../services/caja'
import {
    Text,
    Grid,
    GridItem,
    Box,
    Image,
} from '@chakra-ui/react'

const GridClientTurn = () => {
    const hook = useTurn()
    const [state, setState] = useState({turno:'', caja:''})

    useInterval(async() => {
        const turns = await turnService.getTurn({tipo: hook.state.tipo})
        const caja = await cajaService.get({tipo: hook.state.tipo})
        const newState = {
            turno: turns.shift(),
            caja: caja[0].numero_caja
        }
        setState(newState)
    }, 4000)

    return (
        <Grid 
            h='100%'
            w='70%'
            mt='-2em'
            templateColumns='repeat(12,1fr)'
            templateRows='repeat(3,1fr)'
            gap={4}
        >
            <GridItem rowSpan={3} colSpan={4} mt='1em'>
                <Image src='https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' h='90%' borderRadius="md" alt='Dan Abramov' />
            </GridItem>
            <GridItem rowSpan={2} colSpan={5}>
                <Text fontSize='lg' textAlign='center'>Turno actual</Text>
                <Box bg='gray.50' h='100%' borderRadius='md' border='1px solid black'>
                    <Text fontSize='calc(100px + 1vw)' align='center' >{state.turno.tipo + state.turno.codigo}</Text>
                </Box>
                
            </GridItem>
            <GridItem rowSpan={1} colSpan={2}>
                <Text fontSize='lg' textAlign='center'>Tu turno</Text>
                <Box bg='teal.200' h='100%' borderRadius='md' border='1px solid gray'>
                    <Text fontSize='6xl' align='center' >{hook.state.tipo + hook.state.codigo}</Text>
                </Box>
                
            </GridItem>
            <GridItem rowSpan={1} colSpan={2} mt='1em'>
                <Text fontSize='md' textAlign='center'>Caja</Text>
                <Box bg='teal.200' h='100%' borderRadius='md' border='1px solid gray'>
                    <Text fontSize='6xl' align='center' >{state.caja}</Text>
                </Box>
                
            </GridItem>
        </Grid>
    )
}

export default GridClientTurn
