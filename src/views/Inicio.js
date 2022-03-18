import React from 'react'
import { Link } from 'react-router-dom'
import { useTurn } from '../hooks/useTurn'
import { useAuth } from '../hooks/useAuth'
import { 
    Heading,
    SimpleGrid,
    Button,
    Image,
    Grid,
    GridItem
} from '@chakra-ui/react';
const Inicio = () => {
    const turn = useTurn()
    const auth = useAuth()
    return (
	<Grid
	    h='100%'
	    w='70%'
	    templateColumns='repeat(12,1fr)'
	    templateRows='repeat(6,1fr)'
	    gap={4}
	>
	    <GridItem colSpan={3} rowSpan={6}>
	        <Image src='https://www.bancoagrario.gov.co/Noticias/PublishingImages/BannerLandingAlcancias2017.png' />
	    </GridItem>
	    <GridItem colSpan={7} rowSpan={4} textAlign='center'>
	        <Heading size='4xl' margin='1.2em 0'>¡Bienvenido!</Heading>
                <SimpleGrid columns={2} spacing={10}>
		    {!auth.user && <Button as={Link} to="/employee" colorScheme='teal' size='lg' padding='3em'border='1px solid gray'>
                        FUNCIONARIO
                    </Button>
		    }
		    {auth.user && <Button as={Link} to="/employee/dashboard" colorScheme='teal' size='lg' padding='3em'border='1px solid gray'>
                        FUNCIONARIO
                    </Button>
		    }
                    {turn.state && 
                        <Button as={Link} to="/client/turn" colorScheme='blue' size='lg' padding='3em' border='1px solid gray'>
                            CLIENTE
                        </Button>
                    }
                    
                    {!turn.state && 
                        <Button as={Link} to="/client" colorScheme='blue' size='lg' padding='3em'border='1px solid gray'>
                            CLIENTE
                        </Button>
                    }

                </SimpleGrid>
	    </GridItem>
	    <GridItem colSpan={2} rowSpan={6}>
	        <Image src='https://mktefa.ditrendia.es/hs-fs/hubfs/Ejemplos%20publicidad%20banca%20y%20seguros/ditrendia-Ejemplo%20publicidad%20en%20banca%20y%20seguros-banner%20Visa.png?width=300&height=600&name=ditrendia-Ejemplo%20publicidad%20en%20banca%20y%20seguros-banner%20Visa.png'
		fit='fill'
		htmlHeight='100%'
		/>
	    </GridItem>
	</Grid>
    )
}

export default Inicio
