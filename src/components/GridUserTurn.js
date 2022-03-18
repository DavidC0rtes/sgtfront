import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import {
    Text,
    Grid,
    GridItem,
    Box,
    Button,
    useToast,    
} from '@chakra-ui/react'
import requestTurnService from '../services/request_turn'

const GridUserTurn = (props) => {
    const [state, setState] = useState({codigo:'', caja:''})
    const [turno, setTurno] = useState({tipo_turno:'', codigo:''})
    const toast = useToast()
    //setState({codigo:props.turno, caja:props.caja})
    console.log(props.caja)
    const pedirTurno = async (event) => {
        event.preventDefault()
        console.log(parseInt(state.caja))
        console.log(state.tipo)
        const res = await requestTurnService.requestTurn(props.id_sede_caja, props.caja)
        console.log(res)
        if (res) {
            setTurno({tipo_turno:res.tipo, codigo:res.codigo})//cambiar luego
            console.log(turno)
        } else {
            toast({
                title: 'No se encuentra',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        } 
    }

    return (
        <Grid 
            h='100%'
            w='100%'
            templateColumns='repeat(12,1fr)'
            templateRows='repeat(3,1fr)'
            gap={4}
        >
            <GridItem rowSpan={4} colSpan={5}>
                <Text fontSize='lg' textAlign='center'>Turno actual</Text>
                <Box bg='gray.50' h='80%' borderRadius='md' border='1px solid black' lineHeight='350px' maxH='50vh' maxW='30vw'>
		    
		    <Text fontSize='8vw' align='center' >{`${turno.tipo_turno}${turno.codigo}`}</Text>
                </Box>

            </GridItem>
	    <GridItem colSpan={3}>
		<Button onClick={(event) => pedirTurno(event)} colorScheme='yellow' marginTop='1em' size='lg'>Pedir Turno</Button>
	    </GridItem>

        </Grid>
    )
}

export default GridUserTurn
