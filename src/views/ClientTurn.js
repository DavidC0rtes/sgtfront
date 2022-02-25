import GridClientTurn from '../components/GridClientTurn'
import { 
    Heading,
} from '@chakra-ui/react'


const ClientTurn = () => {
    return(
        <>
        <Heading size='4xl' margin='0.8em auto 1em'>
            Espera tu turno
        </Heading>
        <GridClientTurn/>
        </>
    )
}

export default ClientTurn
